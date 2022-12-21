let loadedPokemons = [];
let start = 1;
let limit = 21;


let filterFunction = false;

//fetch the Pokedex Api
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


//render all pokemons (starting with 20)
async function renderCards() {
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
    let myPicture = `<img src="${onePokemon['sprites']['other']['official-artwork']['front_default']}">`;
    let myTypes = loadedPokemons[i]['types'][0]['type']['name'];
    document.getElementById(`probe${i}`).innerHTML += ` <div id="imgDiv${i}" class="img-div">${myPicture}</div>`;
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
}



//show next Pokemon in the normal Array
function nextCard(i) {
    if (filterFunction) {                        // WENN die searchPokemon funktion aufgerufen wurde, wurde ein neues gefiltertes Array erstellt
        if (i == loadedPokemons.length - 1) {    // wenn ich am ende von diesem neuen gefilterten array gelange 
            return;                              // gib return zurück
        } else {                                 // ansonsten
            i++;                                 // iteriere durch das neue gefilterte Array
            showDescription(i);                  // und zeige jeweils die overlaycards
        }
    } else {                                     // ANSONSTEN wenn die searchpokemon nicht aufgerufen wurde, somit auch kein neues Array erstellt wurde
        if (i == loadedPokemons.length - 1) {    // wenn ich am ende von dem normalen Array wo alle pokemons drin sind 
            loadPokemon();                       // lade 20 weitere Pokemons herunter 
            i++;                                 // iteriere weiter durch das normale array 
            showDescription(i);                  // zeige das ganze an
        } else {                                 // ansonsten 
            i++                                  // iteriere einfach weiter
            showDescription(i)                   // zeige das ganze an 
        }
    }
}


// show previous POkemon
function previousCard(i) {
    if (i > 0) {
        i--;
        showDescription(i);
    }
}


// call the Searchpokemon Function through enterclick
function searchButtonClicked() {
    let searchInput = document.getElementById('searchInput').value;
    if (searchInput !== '') {
        searchPokemon();
    }
}


// filterfunction
function searchPokemon() {
    let searchInput = document.getElementById('searchInput').value;
    searchInput = searchInput.toLowerCase().replace(/\s/g, '');

    let searchedPokemons = loadedPokemons.filter(pokemon => pokemon.name.includes(searchInput));
    if (searchInput) {
        loadedPokemons = searchedPokemons;
        document.getElementById("showPokemons").innerHTML = "";
        renderCards();
        filterFunction = true;
    } else{
        loadedPokemons = searchedPokemons;
        document.getElementById("showPokemons").innerHTML = "";
        renderCards();
        filterFunction = true;
    }
    
}


// show next Pokemon only within the filtered array 
function nextCardFilter(i) {
    if (i == loadedPokemons.length - 1) {
        return;
    } else {
        i++;
        showDescription(i);
    }
}


// Pokemon Characteristics
function getPokemonCharacteristics(i) {
    loadWeakness(i);
    getPokemonHeight(i);
    getPokemonWeight(i);
    getPokemonAbility(i);
    getPOkemonMove(i);
}


//render weakness of each Pokemon, only on overlay
async function loadWeakness(i) {
    let urlWeakness = loadedPokemons[i]['types'][0]['type']['url'];                                                             // Api Pfad
    let weaknessRes = await fetch(urlWeakness);                                                                                 // fetch
    let currentWeaknessArray = await weaknessRes.json();                                                                        // currentWeaknessArray = [pfad1, pfad2, pfad3, usw]
    let currentWeakness = currentWeaknessArray['damage_relations']['double_damage_from'];                                       // currentWeakness ist das Pfad (z.B pfad1) an der Stelle double_Damagefrom
    loadWeaknessBgColors(currentWeakness);
}


// give each weakness an Bg-Color, depending on its type
function loadWeaknessBgColors(currentWeakness) {
    for (let d = 0; d < currentWeakness.length; d++) {                                                                          // iteriere durch das double_damage_from array 
        myWeakness = currentWeakness[d]['name'];                                                                                // myWeakness = stelle[0]--> (name)flying, stelle[1]-->(name)posion usw
        document.getElementById('weakness').innerHTML += `<div id="myWeakness${d}" class="my-weakness" >${myWeakness}</div>`;
        document.getElementById(`myWeakness${d}`).style.backgroundColor = setColors(myWeakness);
    }
}


//render height of each pokemon
function getPokemonHeight(i) {
    let heightFeet = loadedPokemons[i]['height'];
    let height = heightFeet * 0.3048;
    let heightMeter = height.toFixed(1);
    document.getElementById('height').innerHTML = heightMeter + ' Meter';
}


// render weight of each pokemon
function getPokemonWeight(i) {
    let weightLbs = loadedPokemons[i]['weight'];
    let weight = weightLbs / 2.205;
    let weightKg = weight.toFixed(1);
    document.getElementById('weight').innerHTML += weightKg + ' kg';
}


//render the ability of each Pokemon
function getPokemonAbility(i) {
    let ability = loadedPokemons[i]['abilities'][0]['ability']['name'];
    let abilitytoUpperCase = ability.charAt(0).toUpperCase() + ability.slice(1);
    document.getElementById('ability').innerHTML += abilitytoUpperCase;
}


//render the special move of each Pokemon
function getPOkemonMove(i) {
    let move = loadedPokemons[i]['moves'];
    let randomMove = Math.floor(Math.random() * move.length);
    let endMove = loadedPokemons[i]['moves'][`${randomMove}`]['move']['name'];

    let endMoveToUpperCase = endMove.toUpperCase();
    document.getElementById('move').innerHTML += endMoveToUpperCase;
}


//open the Overlay 
function openOneCard() {
    document.getElementById(`oneCardBg`).classList.remove('d-none');
}


// close the Overlay
function closeCards() {
    document.getElementById(`oneCardBg`).classList.add('d-none');
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