let loadedPokemons = [];
let fetchedPokemons = [];

let start = 1;
let limit = 21;

let myChart;
let filterFunction = false;


async function loadPokemon() {
    for (let i = start; i < limit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        fetchedPokemons.push(currentPokemon);
    }
    start += 20;
    limit += 20;
    loadedPokemons = fetchedPokemons;
    renderCards();
}


function renderCards() {
    document.getElementById('showPokemons').innerHTML = '';
    for (let i = 0; i < loadedPokemons.length; i++) {
        let onePokemon = loadedPokemons[i];
        document.getElementById('showPokemons').innerHTML += renderCardsHtml(onePokemon, i);
        cardsHoverEffect(onePokemon, i);
        renderTypes(i);
        renderImgDivBg(onePokemon, i);
    }
}


function renderImgDivBg(onePokemon, i) {
    let myPicture = `<img src="${onePokemon['sprites']['other']['official-artwork']['front_default']}" class="pkimg">`;
    let myTypes = loadedPokemons[i]['types'][0]['type']['name'];
    document.getElementById(`imgParent${i}`).innerHTML += ` <div id="imgDiv${i}" class="img-div">${myPicture}</div>`;
    document.getElementById(`imgDiv${i}`).style.backgroundColor = setColors(myTypes);
}


function renderTypes(i) {
    let typesLength = loadedPokemons[i]['types'];
    for (w = 0; w < typesLength.length; w++) {
        let myTypes = typesLength[w]['type']['name'];
        document.getElementById(`typeDivParent${i}`).innerHTML += `<div id="typeDivChild${i}-${w}" class="type-div"> ${myTypes}</div>`;
        document.getElementById(`typeDivChild${i}-${w}`).style.backgroundColor = setColors(myTypes);
    }
}


async function showDescription(i) {
    let desUrl = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}/`;
    let desResponse = await fetch(desUrl);
    let currentDescription = await desResponse.json();
    let myDescription = currentDescription['flavor_text_entries']['11']['flavor_text'];
    let habitat = currentDescription['habitat']['name'].charAt(0).toUpperCase() + currentDescription['habitat']['name'].slice(1);
    renderOverlay(myDescription, i, habitat);
    getPokemonCharacteristics(i);
}


async function renderOverlay(myDescription, i, habitat) {
    let content = document.getElementById('overlayContent');
    content.innerHTML = '';
    let overlayPokemonImg = loadedPokemons[i]['sprites']['other']['official-artwork']['front_default'];
    let overlayPokemonId = loadedPokemons[i]['id'];
    content.innerHTML = renderOverlayHtml(overlayPokemonId, i, overlayPokemonImg, myDescription, habitat);
    drawPokemonChart(i);
    displayLeftArrow(i);

}


function drawPokemonChart(i) {
    let statsPower = [];
    let names = ['H-Points', 'Attack', 'Defense', 'Sp-Attack', 'Sp-Defense', 'Speed'];

    let stats = loadedPokemons[i]['stats'];
    for (let s = 0; s < stats.length; s++) {
        const myStats = stats[s];
        statsPower.push(myStats['base_stat']);
    }
    drawMyChart(statsPower, names);
}


function drawMyChart(statsPower, names) {
    const ctx = document.getElementById(`chart`).getContext('2d');

    myChart = new Chart(ctx, {
        type: 'bar',

        data: {
            labels: names,
            datasets: [{
                label: 'Amount Of Power',
                data: statsPower,
                backgroundColor: CONFI_BG_COLORS,
                borderColor: CONFIG_BORDER,
                borderWidth: 1
            }]
        },
        options: CONFIG_CHART_OPTIONS
    });
}


function nextCard(i) {
    if (filterFunction) {
        nextFilteredPokemon(i);
    } else {
        nextPokemon(i);
    }
}


function nextFilteredPokemon(i) {
    if (i == loadedPokemons.length - 1) {
        return;
    } else {
        i++;
        showDescription(i);
    }
}


function nextPokemon(i) {
    if (i == loadedPokemons.length - 1) {
        loadPokemon();
        showDescription(i);
        i++;
    } else {
        i++
        showDescription(i)
    }
}


function previousCard(i) {
    if (i > 0) {
        i--;
        showDescription(i);
    }
}


function searchPokemon() {
    let searchInput = document.getElementById('searchInput').value;
    searchInput = searchInput.toLowerCase().replace(/\s/g, '');

    loadedPokemons = fetchedPokemons.filter(pokemon => pokemon.name.includes(searchInput));
    if (searchInput.length > 0) {
        renderCards();
        filterFunction = true;
        console.log(loadedPokemons);
    } else {
        resetPokemons();
    }
}


function openOneCard() {
    document.getElementById(`oneCardBg`).classList.remove('d-none');
    document.getElementById('showPokemons').classList.add('d-none');
    document.getElementById('btn').classList.add('d-none');
}


function closeCards() {
    document.getElementById(`oneCardBg`).classList.add('d-none');
    document.getElementById('showPokemons').classList.remove('d-none');
    document.getElementById('btn').classList.remove('d-none');
}


function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}


function turnToUpperCase(i) {
    let nameUpperCase = loadedPokemons[i]['name'].charAt(0).toUpperCase() + loadedPokemons[i]['name'].slice(1);
    let overlayNameUpperCase = loadedPokemons[i]['name'].charAt(0).toUpperCase() + loadedPokemons[i]['name'].slice(1);
    return nameUpperCase, overlayNameUpperCase;
}


function resetPokemons() {
    if (filterFunction) {
        renderCards();
    }
}


function disableButton() {
    let btn = document.getElementById("myButton");
    btn.disabled = true;
    setTimeout(function () {
        btn.disabled = false;
        rightArrow.disabled = false;
    }, 2000);
}


function displayLeftArrow(i) {
    if (i >= 1) {
        document.getElementById('arrowDiv').classList.remove('d-none');
    }
}