let loadedPokemons = [];
let fetchedPokemons = [];

let start = 1;
let limit = 21;

let myChart;
let filterFunction = false;

//fetch the Pokedex Api
async function loadPokemon() {
    for (let i = start; i < limit; i++) {                                     // starte bei eins und höre auf bei 19
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;                  // hole die einzelnen Api-s(durch die i Variable wir die Url jedes mal geändert und dadurch wird ein neues Pokemon geladen)
        let response = await fetch(url);                                      // lade die Api-s herunter
        let currentPokemon = await response.json();                           // wandle das ganze in ein neues Array um
        fetchedPokemons.push(currentPokemon);                                  // push das ganze in ein neues Array rein(loadedPokemons)
    }
    start += 20;                                                              // erhöhe den Wert um 20 wenn die Schleife zum zweiten mal durchläuft 
    limit += 20;                                                              // erhöhe den Wert um 20 wenn die Schleife zum zweiten mal durchläuft
    loadedPokemons = fetchedPokemons;
    renderCards();                                                            // redner die Pokemons
}


//render all pokemons (starting with 20)
function renderCards() {
    document.getElementById('showPokemons').innerHTML = '';                                      // leere den großen Content-Container
    for (let i = 0; i < loadedPokemons.length; i++) {                                            // iteriere durch die loadedPokemons Funktion
        let onePokemon = loadedPokemons[i];                                                      // onePokemon ist loadedPokemons an der stelle i ( die stelle i ist ein JSON von jeweils einem Pokemon)
        document.getElementById('showPokemons').innerHTML += renderCardsHtml(onePokemon, i);     // ab hier wird alles gerendert 
        cardsHoverEffect(onePokemon, i);
        renderTypes(i);
        renderImgDivBg(onePokemon, i);
    }


}


//add a different bg-color depending on what type the pokemon is
function renderImgDivBg(onePokemon, i) {
    let myPicture = `<img src="${onePokemon['sprites']['other']['official-artwork']['front_default']}" class="pkimg">`;
    let myTypes = loadedPokemons[i]['types'][0]['type']['name'];
    document.getElementById(`imgParent${i}`).innerHTML += ` <div id="imgDiv${i}" class="img-div">${myPicture}</div>`;
    document.getElementById(`imgDiv${i}`).style.backgroundColor = setColors(myTypes);
}


//render the different types of each Pokemon
function renderTypes(i) {
    let typesLength = loadedPokemons[i]['types'];
    for (w = 0; w < typesLength.length; w++) {
        let myTypes = typesLength[w]['type']['name'];
        document.getElementById(`typeDivParent${i}`).innerHTML += `<div id="typeDivChild${i}-${w}" class="type-div"> ${myTypes}</div>`;
        document.getElementById(`typeDivChild${i}-${w}`).style.backgroundColor = setColors(myTypes);
    }
}


// show description of each Pokemon and call the overlay Function
async function showDescription(i) {
    let desUrl = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}/`;
    let desResponse = await fetch(desUrl);
    let currentDescription = await desResponse.json();
    let myDescription = currentDescription['flavor_text_entries']['11']['flavor_text'];
    let habitat = currentDescription['habitat']['name'].charAt(0).toUpperCase() + currentDescription['habitat']['name'].slice(1);
    renderOverlay(myDescription, i, habitat);
    getPokemonCharacteristics(i);
}


//render the Overlay Cards with details
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
    let statsName = [];
    let statsPower = [];

    let stats = loadedPokemons[i]['stats'];
    for (let s = 0; s < stats.length; s++) {
        const myStats = stats[s];
        statsName.push(myStats['stat']['name'].toUpperCase());
        statsPower.push(myStats['base_stat']);
    }

    let names = ['H-Points', 'Attack', 'Defense', 'Sp-Attack', 'Sp-Defense', 'Speed'];
    drawMyChart(statsName, statsPower, names);
}


function drawMyChart(statsName, statsPower, names) {
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


//show next Pokemon in the normal Array
function nextCard(i) {
    if (filterFunction) {                        // WENN die searchPokemon funktion aufgerufen wurde, wurde ein neues gefiltertes Array erstellt
        nextFilteredPokemon(i);
    } else {                                     // ANSONSTEN wenn die searchpokemon nicht aufgerufen wurde, somit auch kein neues Array erstellt wurde
        nextPokemon(i);
    }
}


function nextFilteredPokemon(i) {
    if (i == loadedPokemons.length - 1) {    // wenn ich am ende von diesem neuen gefilterten array gelange 
        return;                              // gib return zurück
    } else {                                 // ansonsten
        i++;                                 // iteriere durch das neue gefilterte Array
        showDescription(i);                  // und zeige jeweils die overlaycards
    }
}


function nextPokemon(i) {
    if (i == loadedPokemons.length - 1) {    // wenn ich am ende von dem normalen Array wo alle pokemons drin sind
        loadPokemon();                       // lade 20 weitere Pokemons herunter 
        showDescription(i);                  // zeige das ganze an
        i++;                                 // iteriere weiter durch das normale array 
    } else {                                 // ansonsten 
        i++                                  // iteriere einfach weiter
        showDescription(i)                   // zeige das ganze an 
    }
}


// show previous POkemon
function previousCard(i) {
    if (i > 0) {
        i--;
        showDescription(i);
    }
}


// filterfunction
function searchPokemon() {
    let searchInput = document.getElementById('searchInput').value;  //hol den input value 
    searchInput = searchInput.toLowerCase().replace(/\s/g, '');      // tolowerCase + entferne leerzeichen

    loadedPokemons = fetchedPokemons.filter(pokemon => pokemon.name.includes(searchInput)); // callback funktion, searchedPokemons ist jetzt neues Array mit all den Elmenten die man in das inputfeld eintippt
    if (searchInput.length > 0) {                                                                // wenn inputfeld mind. eine Buchstabe enthält
        renderCards();
        filterFunction = true;
        console.log(loadedPokemons);
    } else {
        resetPokemons();
    }
}


//open the Overlay 
function openOneCard() {
    document.getElementById(`oneCardBg`).classList.remove('d-none');
    document.getElementById('showPokemons').classList.add('d-none');
    document.getElementById('btn').classList.add('d-none');
}


// close the Overlay
function closeCards() {
    document.getElementById(`oneCardBg`).classList.add('d-none');
    document.getElementById('showPokemons').classList.remove('d-none');
    document.getElementById('btn').classList.remove('d-none');
}


//add two zeros infront of the id number
function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}


//turn the First Char of different name to Uppercase
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


// Disable den Button für 2 sekunden nach dem es geklickt wurde, verhindere das er mehrmals geklickt wird
function disableButton() {
    let btn = document.getElementById("myButton");
    btn.disabled = true;
    setTimeout(function () {
        btn.disabled = false;
        rightArrow.disabled = false;
    }, 2000);
}


//show left arrow if i = second Pokemon or higher
function displayLeftArrow(i) {
    if (i >= 1) {
        document.getElementById('arrowDiv').classList.remove('d-none');
    }
}