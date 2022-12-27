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