let currentPokemon;
let loadedPokemons = [];
let start = 1;
let limit = 20;

async function loadPokemon() {
    for (let i = start; i < limit; i++) {                                     // starte bei eins und höre auf bei 19
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;                  // hole die einzelnen Api-s(durch die i Variable wir die Url jedes mal geändert und dadurch wird ein neues Pokemon geladen)
        let response = await fetch(url);                                      // lade die Api-s herunter
        currentPokemon = await response.json();                               // wandle das ganze in ein neues Array um

        loadedPokemons.push(currentPokemon);                                  // push das ganze in ein neues Array rein(loadedPokemons)
        renderPokemon(currentPokemon);                                        // redner die Pokemons

        console.log('Current Pokemon', currentPokemon);
    }
    start += 20;                                                              // erhöhe den Wert um 20 wenn die Schleife zum zweiten mal durchläuft 
    limit += 20;                                                              // erhöhe den Wert um 20 wenn die Schleife zum zweiten mal durchläuft
}


async function renderPokemon() {
    document.getElementById('showPokemons').innerHTML = '';                 // leere den großen Content-Container
    for (let i = 0; i < loadedPokemons.length; i++) {                       // iteriere durch die loadedPokemons Funktion
        const currentArray = loadedPokemons[i];                             // currentArray ist loadedPokemons an der stelle i ( die stelle i ist ein JSON von jeweils einem Pokemon)

        document.getElementById('showPokemons').innerHTML +=                // ab hier wird alles gerendert 
            `
            <div class="pokemon-cards"> 
            <img src="${currentArray['sprites']['other']['official-artwork']['front_default']}">
            <p>Nr.${addLeadingZeros(currentArray['id'], 3)}<p>
                ${currentArray['name']}
                <div>
                    <div>${currentArray['types'][0]['type']['name']}</div>
                </div>
                </div>
        `;
    }
}












// function to add two zeros before the number, as long as its needed
function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}