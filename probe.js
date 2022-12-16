let loadedPokemons = [];
let currentPokemon;
let checkTypes;
let onePokemon;
let nameUpperCase;
let start = 1;
let limit = 31;


async function loadPokemon() {
    for (let i = start; i < limit; i++) {                                     // starte bei eins und höre auf bei 19
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;                  // hole die einzelnen Api-s(durch die i Variable wir die Url jedes mal geändert und dadurch wird ein neues Pokemon geladen)
        // let currentPokemon ='https://pokeapi.co/api/v2/pokemon/${i}'
        let response = await fetch(url);                                      // lade die Api-s herunter
        currentPokemon = await response.json();                               // wandle das ganze in ein neues Array um
        loadedPokemons.push(currentPokemon);                                  // push das ganze in ein neues Array rein(loadedPokemons)
        renderCards();                                                        // redner die Pokemons
    }
    start += 30;                                                              // erhöhe den Wert um 20 wenn die Schleife zum zweiten mal durchläuft 
    limit += 30;                                                              // erhöhe den Wert um 20 wenn die Schleife zum zweiten mal durchläuft
}


async function renderCards() {
    document.getElementById('showPokemons').innerHTML = '';                 // leere den großen Content-Container
    for (let i = 0; i < loadedPokemons.length; i++) {                       // iteriere durch die loadedPokemons Funktion
        onePokemon = loadedPokemons[i];                                     // onePokemon ist loadedPokemons an der stelle i ( die stelle i ist ein JSON von jeweils einem Pokemon)
        checkTypes = onePokemon['types'];
        document.getElementById('showPokemons').innerHTML += renderCardsHtml(i);     // ab hier wird alles gerendert 
        proofTwoTypes(i);
        colorTypeDivsZero(i);
    }
}


function renderCardsHtml(i) {
    return `
        <div id="pokemonCards${i}" class="pokemon-cards" onclick="openOneCard(); showDescription(${i}) "> 
       <div id="imgDiv${i}" class="img-div">
            <img src="${onePokemon['sprites']['other']['official-artwork']['front_default']}">
        </div>

        <div class="name-div">
            <span class="id-nr">Nr.${addLeadingZeros(onePokemon['id'], 3)}</span>
        
            <div class="name">
                ${turnToUpperCase()}
            </div>
        
            <div id="typesDiv${i}" class="types">
                <div id="typeDivs${i}" class="type-div">
                    ${onePokemon['types'][0]['type']['name']}
                </div>
            </div>
        </div>
    </div>
`;
}


// Prüfe ob der Pokemon zwei Typen hat, wenn ja dann füge den Zweiten hinzu
function proofTwoTypes(i) {
    if (checkTypes.length == 2) {
        document.getElementById('typesDiv' + i).innerHTML +=
            `
            <div id="typeDivsOne${i}" class="type-div">${onePokemon['types'][1]['type']['name']}</div>
        `;
        colorTypeDivsOne(i);
    }
}


async function showDescription(i) {
    let desUrl = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}/`;
    let desResponse = await fetch(desUrl);
    let currentDescription = await desResponse.json();
    let myDescription = currentDescription['flavor_text_entries']['11']['flavor_text'];
    loadWeakness(i);
    renderOverlay(myDescription, i);
}


async function renderOverlay(myDescription, i) {
    let content = document.getElementById('overlayContent');
    content.innerHTML = '';
    let overlayPokemonImg = loadedPokemons[i]['sprites']['other']['official-artwork']['front_default'];
    let overlayPokemonName = loadedPokemons[i]['name'];
    let overlayPokemonId = loadedPokemons[i]['id'];

    content.innerHTML += `
        <div>
            <img src= ${overlayPokemonImg}>
            <span>${overlayPokemonId}</span>
            <span>${overlayPokemonName}</span>

            <div>
                <div>${myDescription}</div>
            </div>
            <div id="weakness">
            </div>
        </div>
    `;
}


async function loadWeakness(i) {
    let urlWeakness = loadedPokemons[i]['types'][0]['type']['url'];                        // Api Pfad
    let weaknessRes = await fetch(urlWeakness);                                            // fetch
    let currentWeaknessArray = await weaknessRes.json();                                   // currentWeaknessArray = [pfad1, pfad2, pfad3, usw]
    let currentWeakness = currentWeaknessArray['damage_relations']['double_damage_from'];  // currentWeakness ist das Pfad (z.B pfad1) an der Stelle double_Damagefrom
    let myWeakness;
    for (let d = 0; d < currentWeakness.length; d++) {                                     // iteriere durch das double_damage_from array 
        myWeakness = currentWeakness[d]['name'];                                           // myWeakness = stelle[0]--> (name)flying, stelle[1]-->(name)posion usw
        document.getElementById('weakness').innerHTML += `<div id="myWeakness${i}" class="my-weakness" >${myWeakness}</div>`;
    }

    // console.log(myWeakness)
    // // console.log('CurrentWeakness Array:', currentWeaknessArray);
    // // console.log('CurrentWeakness:', currentWeakness);
}






function openOneCard() {
    document.getElementById(`oneCardBg`).classList.remove('d-none')
}


function closeCards() {
    document.getElementById(`oneCardBg`).classList.add('d-none')
}


/*
 * füge zwei nuller vor der id-nummer, so lange es gebraucht wird
 * Beispiel (001, 020, 100)-> 1, 20, 100  
 */
function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}


/**
 * die chartAt(0) Befehl gibt und nur das Erste Buchstabe von einem Wort zurück.
 * toUpperCase Befehl wandelt diese (bzw. alle) Buchstaben in Großbuchstaben um.
 * slice(1) = gibt uns den Rest des Wortes in kleinBuchstaben zurück (Zb Pokemon = okemon).
 * also dann vom Wort Pokemon = P wurde getrennt , upperCase gamacht und dann wird das mit der okemon string addiert
 */
function turnToUpperCase() {
    nameUpperCase = onePokemon['name'].charAt(0).toUpperCase() + onePokemon['name'].slice(1);
    return nameUpperCase;
}
