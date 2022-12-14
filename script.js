let loadedPokemons = [];

let currentPokemon;
let checkTypes;
let onePokemon;
let nameUpperCase;

let start = 1;
let limit = 20;


async function loadPokemon() {
    for (let i = start; i < limit; i++) {                                     // starte bei eins und höre auf bei 19
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;                  // hole die einzelnen Api-s(durch die i Variable wir die Url jedes mal geändert und dadurch wird ein neues Pokemon geladen)
        let response = await fetch(url);                                      // lade die Api-s herunter
        currentPokemon = await response.json();                               // wandle das ganze in ein neues Array um

        loadedPokemons.push(currentPokemon);                                  // push das ganze in ein neues Array rein(loadedPokemons)
        renderCards(currentPokemon);                                          // redner die Pokemons
    }
    start += 20;                                                              // erhöhe den Wert um 20 wenn die Schleife zum zweiten mal durchläuft 
    limit += 20;                                                              // erhöhe den Wert um 20 wenn die Schleife zum zweiten mal durchläuft
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
    <div class="pokemon-cards"> 
       <div class="img-div">
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


/* wenn der TypesJSON (TypesJSON wurde der Variable pokemType zugeweisen) an der Stelle 0 einen von den verschiedenen Pokemon Typen enthält.
 * dann füge die jeweilige Klasse mit der Hintergrundfarbe hinzu.
 */
function colorTypeDivsZero(i) {
    let pokemonType = onePokemon['types'][0]['type']['name'];

    if (pokemonType == 'normal') {
        document.getElementById(`typeDivs${i}`).classList.add('normal');
    }

    if (pokemonType == 'poison') {
        document.getElementById(`typeDivs${i}`).classList.add('poison');
    }

    if (pokemonType == 'psychic') {
        document.getElementById(`typeDivs${i}`).classList.add('psychic');
    }

    if (pokemonType == 'grass') {
        document.getElementById(`typeDivs${i}`).classList.add('grass');
    }

    if (pokemonType == 'ground') {
        document.getElementById(`typeDivs${i}`).classList.add('ground');
    }

    if (pokemonType == 'ice') {
        document.getElementById(`typeDivs${i}`).classList.add('ice');
    }

    if (pokemonType == 'fire') {
        document.getElementById(`typeDivs${i}`).classList.add('fire');
    }

    if (pokemonType == 'rock') {
        document.getElementById(`typeDivs${i}`).classList.add('rock');
    }

    if (pokemonType == 'dragon') {
        document.getElementById(`typeDivs${i}`).classList.add('dragon');
    }

    if (pokemonType == 'water') {
        document.getElementById(`typeDivs${i}`).classList.add('water');
    }

    if (pokemonType == 'bug') {
        document.getElementById(`typeDivs${i}`).classList.add('bug');
    }

    if (pokemonType == 'dark') {
        document.getElementById(`typeDivs${i}`).classList.add('dark');
    }

    if (pokemonType == 'fighting') {
        document.getElementById(`typeDivs${i}`).classList.add('fighting');
    }

    if (pokemonType == 'ghost') {
        document.getElementById(`typeDivs${i}`).classList.add('ghost');
    }

    if (pokemonType == 'steel') {
        document.getElementById(`typeDivs${i}`).classList.add('steel');
    }

    if (pokemonType == 'flying') {
        document.getElementById(`typeDivs${i}`).classList.add('flying');
    }

    if (pokemonType == 'electric') {
        document.getElementById(`typeDivs${i}`).classList.add('electric');
    }

    if (pokemonType == 'fairy') {
        document.getElementById(`typeDivs${i}`).classList.add('fairy');
    }

    if (pokemonType == 'grass') {
        document.getElementById(`typeDivs${i}`).classList.add('grass');
    }

}


/* wenn der TypesJSON (TypesJSON wurde der Variable pokemType zugeweisen) an der Stelle 1 einen von den verschiedenen Pokemon Typen enthält.
 * dann füge die jeweilige Klasse mit der Hintergrundfarbe hinzu.
 */
function colorTypeDivsOne(i) {
    let pokemonType = onePokemon['types'][1]['type']['name'];

    if (pokemonType == 'normal') {
        document.getElementById(`typeDivsOne${i}`).classList.add('normal');
    }

    if (pokemonType == 'poison') {
        document.getElementById(`typeDivsOne${i}`).classList.add('poison');
    }

    if (pokemonType == 'psychic') {
        document.getElementById(`typeDivsOne${i}`).classList.add('psychic');
    }

    if (pokemonType == 'grass') {
        document.getElementById(`typeDivsOne${i}`).classList.add('grass');
    }

    if (pokemonType == 'ground') {
        document.getElementById(`typeDivsOne${i}`).classList.add('ground');
    }

    if (pokemonType == 'ice') {
        document.getElementById(`typeDivsOne${i}`).classList.add('ice');
    }

    if (pokemonType == 'fire') {
        document.getElementById(`typeDivsOne${i}`).classList.add('fire');
    }

    if (pokemonType == 'rock') {
        document.getElementById(`typeDivsOne${i}`).classList.add('rock');
    }

    if (pokemonType == 'dragon') {
        document.getElementById(`typeDivsOne${i}`).classList.add('dragon');
    }

    if (pokemonType == 'water') {
        document.getElementById(`typeDivsOne${i}`).classList.add('water');
    }

    if (pokemonType == 'bug') {
        document.getElementById(`typeDivsOne${i}`).classList.add('bug');
    }

    if (pokemonType == 'dark') {
        document.getElementById(`typeDivsOne${i}`).classList.add('dark');
    }

    if (pokemonType == 'fighting') {
        document.getElementById(`typeDivsOne${i}`).classList.add('fighting');
    }

    if (pokemonType == 'ghost') {
        document.getElementById(`typeDivsOne${i}`).classList.add('ghost');
    }

    if (pokemonType == 'steel') {
        document.getElementById(`typeDivsOne${i}`).classList.add('steel');
    }

    if (pokemonType == 'flying') {
        document.getElementById(`typeDivsOne${i}`).classList.add('flying');
    }

    if (pokemonType == 'electric') {
        document.getElementById(`typeDivsOne${i}`).classList.add('electric');
    }

    if (pokemonType == 'fairy') {
        document.getElementById(`typeDivsOne${i}`).classList.add('fairy');
    }

    if (pokemonType == 'grass') {
        document.getElementById(`typeDivsOne${i}`).classList.add('grass');
    }
}