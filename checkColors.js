/* wenn der TypesJSON (TypesJSON wurde der Variable pokemType zugeweisen) an der Stelle 0 einen von den verschiedenen Pokemon Typen enthält.
 * dann füge die jeweilige Klasse mit der Hintergrundfarbe hinzu.
 */
function colorTypeDivsZero(i) {
    let pokemonType = onePokemon['types'][0]['type']['name'];

    if (pokemonType == 'normal') {
        document.getElementById(`typeDivs${i}`).classList.add('normal'); //types 
        document.getElementById(`imgDiv${i}`).classList.add('normal');   // img background 
        document.getElementById(`pokemonCards${i}`).classList.add('normal1') // die ganze card hover 
    }

    if (pokemonType == 'poison') {
        document.getElementById(`typeDivs${i}`).classList.add('poison');
        document.getElementById(`imgDiv${i}`).classList.add('poison');
        document.getElementById(`pokemonCards${i}`).classList.add('poison1')
    }

    if (pokemonType == 'psychic') {
        document.getElementById(`typeDivs${i}`).classList.add('psychic');
        document.getElementById(`imgDiv${i}`).classList.add('psychic');
        document.getElementById(`pokemonCards${i}`).classList.add('psychic1')
    }

    if (pokemonType == 'grass') {
        document.getElementById(`typeDivs${i}`).classList.add('grass');
        document.getElementById(`imgDiv${i}`).classList.add('grass');
        document.getElementById(`pokemonCards${i}`).classList.add('grass1')
    }

    if (pokemonType == 'ground') {
        document.getElementById(`typeDivs${i}`).classList.add('ground');
        document.getElementById(`imgDiv${i}`).classList.add('ground');
        document.getElementById(`pokemonCards${i}`).classList.add('ground1')
    }

    if (pokemonType == 'ice') {
        document.getElementById(`typeDivs${i}`).classList.add('ice');
        document.getElementById(`imgDiv${i}`).classList.add('ice');
        document.getElementById(`pokemonCards${i}`).classList.add('ice1')
    }

    if (pokemonType == 'fire') {
        document.getElementById(`typeDivs${i}`).classList.add('fire');
        document.getElementById(`imgDiv${i}`).classList.add('fire');
        document.getElementById(`pokemonCards${i}`).classList.add('fire1')
    }

    if (pokemonType == 'rock') {
        document.getElementById(`typeDivs${i}`).classList.add('rock');
        document.getElementById(`imgDiv${i}`).classList.add('rock');
        document.getElementById(`pokemonCards${i}`).classList.add('rock1')
    }

    if (pokemonType == 'dragon') {
        document.getElementById(`typeDivs${i}`).classList.add('dragon');
        document.getElementById(`imgDiv${i}`).classList.add('dragon');
        document.getElementById(`pokemonCards${i}`).classList.add('dragon1')
    }

    if (pokemonType == 'water') {
        document.getElementById(`typeDivs${i}`).classList.add('water');
        document.getElementById(`imgDiv${i}`).classList.add('water');
        document.getElementById(`pokemonCards${i}`).classList.add('water1')
    }

    if (pokemonType == 'bug') {
        document.getElementById(`typeDivs${i}`).classList.add('bug');
        document.getElementById(`imgDiv${i}`).classList.add('bug');
        document.getElementById(`pokemonCards${i}`).classList.add('bug1')
    }

    if (pokemonType == 'dark') {
        document.getElementById(`typeDivs${i}`).classList.add('dark');
        document.getElementById(`imgDiv${i}`).classList.add('dark');
        document.getElementById(`pokemonCards${i}`).classList.add('dark1')
    }

    if (pokemonType == 'fighting') {
        document.getElementById(`typeDivs${i}`).classList.add('fighting');
        document.getElementById(`imgDiv${i}`).classList.add('fighting');
        document.getElementById(`pokemonCards${i}`).classList.add('fighting1')
    }

    if (pokemonType == 'ghost') {
        document.getElementById(`typeDivs${i}`).classList.add('ghost');
        document.getElementById(`imgDiv${i}`).classList.add('ghost');
        document.getElementById(`pokemonCards${i}`).classList.add('ghost1')
    }

    if (pokemonType == 'steel') {
        document.getElementById(`typeDivs${i}`).classList.add('steel');
        document.getElementById(`imgDiv${i}`).classList.add('steel');
        document.getElementById(`pokemonCards${i}`).classList.add('steel1')
    }

    if (pokemonType == 'flying') {
        document.getElementById(`typeDivs${i}`).classList.add('flying');
        document.getElementById(`imgDiv${i}`).classList.add('flying');
        document.getElementById(`pokemonCards${i}`).classList.add('flying1');
        // document.getElementById(`myWeakness${i}`).classList.add('flying');
    }

    if (pokemonType == 'electric') {
        document.getElementById(`typeDivs${i}`).classList.add('electric');
        document.getElementById(`imgDiv${i}`).classList.add('electric');
        document.getElementById(`pokemonCards${i}`).classList.add('electric1')
    }

    if (pokemonType == 'fairy') {
        document.getElementById(`typeDivs${i}`).classList.add('fairy');
        document.getElementById(`imgDiv${i}`).classList.add('fairy');
        document.getElementById(`pokemonCards${i}`).classList.add('fairy1')
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


