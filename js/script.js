let loadedPokemons = [];
let start = 1;
let limit = 21;


async function loadPokemon() {
    for (let i = start; i < limit; i++) {                                     // starte bei eins und höre auf bei 19
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;                  // hole die einzelnen Api-s(durch die i Variable wir die Url jedes mal geändert und dadurch wird ein neues Pokemon geladen)
        let response = await fetch(url);                                      // lade die Api-s herunter
        let currentPokemon = await response.json();                               // wandle das ganze in ein neues Array um
        loadedPokemons.push(currentPokemon);                                  // push das ganze in ein neues Array rein(loadedPokemons)
    }
    renderCards();                                                            // redner die Pokemons
    start += 20;                                                              // erhöhe den Wert um 20 wenn die Schleife zum zweiten mal durchläuft 
    limit += 20;                                                              // erhöhe den Wert um 20 wenn die Schleife zum zweiten mal durchläuft
}


async function renderCards() {
    document.getElementById('showPokemons').innerHTML = '';                          // leere den großen Content-Container
    for (let i = 0; i < loadedPokemons.length; i++) {                                // iteriere durch die loadedPokemons Funktion
        let onePokemon = loadedPokemons[i];                                              // onePokemon ist loadedPokemons an der stelle i ( die stelle i ist ein JSON von jeweils einem Pokemon)
        document.getElementById('showPokemons').innerHTML += renderCardsHtml(onePokemon, i);     // ab hier wird alles gerendert 
        cardsHoverEffect(onePokemon, i);
        renderTypes(i);
        renderImgDivBg(onePokemon, i);
    }
}


function renderImgDivBg(onePokemon, i) {
    let myPicture = `<img src="${onePokemon['sprites']['other']['official-artwork']['front_default']}">`;
    let myTypes = loadedPokemons[i]['types'][0]['type']['name']
    document.getElementById(`probe${i}`).innerHTML += ` <div id="imgDiv${i}" class="img-div">${myPicture}</div>`;
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

    loadWeakness(i);
    renderOverlay(myDescription, i, habitat);
    getPokemonHeight(i);
    getPokemonWeight(i);
    getPokemonAbility(i);
    getPOkemonMove(i);
}


async function renderOverlay(myDescription, i, habitat) {
    let content = document.getElementById('overlayContent');
    content.innerHTML = '';
    let overlayPokemonImg = loadedPokemons[i]['sprites']['other']['official-artwork']['front_default'];
    let overlayPokemonId = loadedPokemons[i]['id'];
    content.innerHTML = renderOverlayHtml(overlayPokemonId, i, overlayPokemonImg, myDescription, habitat);
}


async function loadWeakness(i) {
    let urlWeakness = loadedPokemons[i]['types'][0]['type']['url'];                                                             // Api Pfad
    let weaknessRes = await fetch(urlWeakness);                                                                                 // fetch
    let currentWeaknessArray = await weaknessRes.json();                                                                        // currentWeaknessArray = [pfad1, pfad2, pfad3, usw]
    let currentWeakness = currentWeaknessArray['damage_relations']['double_damage_from'];                                       // currentWeakness ist das Pfad (z.B pfad1) an der Stelle double_Damagefrom
    for (let d = 0; d < currentWeakness.length; d++) {                                                                          // iteriere durch das double_damage_from array 
        myWeakness = currentWeakness[d]['name'];                                                                                // myWeakness = stelle[0]--> (name)flying, stelle[1]-->(name)posion usw
        document.getElementById('weakness').innerHTML += `<div id="myWeakness${d}" class="my-weakness" >${myWeakness}</div>`;
        document.getElementById(`myWeakness${d}`).style.backgroundColor = setColors(myWeakness);
    }
}


function nextCard(i) {
    i++;
    showDescription(i);
}


function previousCard(i) {
    if (i > 0) {
        i--;
        showDescription(i);
    }
}


function getPokemonHeight(i) {
    let heightFeet = loadedPokemons[i]['height'];
    let height = heightFeet * 0.3048;
    let heightMeter = height.toFixed(1);
    document.getElementById('height').innerHTML = heightMeter + ' Meter';
}


function getPokemonWeight(i) {
    let weightLbs = loadedPokemons[i]['weight'];
    let weight = weightLbs / 2.205;
    let weightKg = weight.toFixed(1);
    document.getElementById('weight').innerHTML += weightKg + ' kg';
}


function getPokemonAbility(i) {
    let ability = loadedPokemons[i]['abilities'][0]['ability']['name'];
    let abilitytoUpperCase = ability.charAt(0).toUpperCase() + ability.slice(1);
    document.getElementById('ability').innerHTML += abilitytoUpperCase;
}

function getPOkemonMove(i) {
    let move = loadedPokemons[i]['moves'];
    let randomMove = Math.floor(Math.random() * move.length);
    let endMove = loadedPokemons[i]['moves'][`${randomMove}`]['move']['name'];

    let endMoveToUpperCase = endMove.toUpperCase();
    document.getElementById('move').innerHTML += endMoveToUpperCase;
}


function openOneCard() {
    document.getElementById(`oneCardBg`).classList.remove('d-none');
}


function closeCards() {
    document.getElementById(`oneCardBg`).classList.add('d-none');
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
function turnToUpperCase(i) {
    let nameUpperCase = loadedPokemons[i]['name'].charAt(0).toUpperCase() + loadedPokemons[i]['name'].slice(1);
    let overlayNameUpperCase = loadedPokemons[i]['name'].charAt(0).toUpperCase() + loadedPokemons[i]['name'].slice(1);
    return nameUpperCase, overlayNameUpperCase;
}


