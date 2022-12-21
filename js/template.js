function renderCardsHtml(onePokemon, i) {
    return `
        <div id="pokemonCards${i}" class="pokemon-cards" onclick="openOneCard(); showDescription(${i})"> 
    
            <div id="probe${i}">
            </div>
    
            <div class="for-width">
                <div class="name-div">
                    <span class="id-nr">Nr.${addLeadingZeros(onePokemon['id'], 3)}</span>
                </div>
            </div>

            <div class="name">
                ${turnToUpperCase(i)}
            </div>
    
            <div id="typeDivParent${i}" class="types">
            </div>
            
        </div>
    `;
}

function renderOverlayHtml(overlayPokemonId, i, overlayPokemonImg, myDescription, habitat) {
    return`

<div class="overlay-bg">
   
    <div class="overlay-title">   
        <span class="overlay-name">${turnToUpperCase(i)}</span>
        <span class="overlay-id">Nr.${addLeadingZeros(overlayPokemonId, 3)}</span>
    </div>


    <div class="overlay-content-parent">

        <div class="overlay-content">
            <div class="arrows-div" onclick="previousCard(${i})">
                <img src="../img/left.png" class="arrows">
            </div>
        
            <div class="overlay-img-div">                
                    <img class="overlay-img" src= ${overlayPokemonImg}>
            </div>

            <div class="right">
                <div class="description-div">

                    <div class="description">
                        <span> ${myDescription}</span>
                    </div>
                    <hr>
                    <div class="pokemon-data">
                        <div class="height">
                            <span > Height</span>
                            <span id="height" class="height-data"></span>
                        </div>
                    
                        <div class="weight">
                            <span> Weight</span>
                            <span id="weight" class="weight-data"></span>
                        </div>
                    
                        <div class="habitat">
                            <span> Habitat</span>
                            <span class="habitat-data">${habitat}</span>
                        </div>
                    
                        <div class="abilities">
                            <span> Abilities</span>
                            <span id="ability" class="ability-data"></span>
                        </div>
                    
                        <div class="move">
                            <span class="move-span"> Move <img src="../img/lighting.png"></span>
                            <span id="move" class="move-data"></span>
                        </div>
                    </div>

                    
                    </div>    
                    <div id="weakness" class="weakness-div">
                    </div>
            </div>
            
            <div id="overlayArrow" class="arrows-div" onclick="nextCard(${i})">
                    <img src="../img/right-arrow.png" class="arrows" >
            </div>

        </div>
    </div>
</div>
`;
}