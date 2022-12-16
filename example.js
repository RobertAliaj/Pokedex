// <div class="label">Normal</div>

//getTypeColor('normal') = #123456
//getTypeColor('grass') = #11FF00

function renderPokemonStats() {
    // ...
  
    let type = "Normal";
    let color = getTypeColor("Normal");
    let html = `<div class="label" style="background-color: ${color}">${type}</div>`;
  }
  
  function getTypeColor(type) {
    if (type == "normal") {
      return "#123abc";
    }
    if (type == "grass") {
      return "#123abc";
    }
    if (type == "fire") {
      return "#123abc";
    }
    if (type == "stone") {
      return "#123abc";
    }
  }
  
  function getTypeColor(type) {
    switch (type) {
      case "normal":
        return "#abc123";
      case "fire":
        return "#abc123";
      case "stone":
        return "#abc123";
    }
  }
  
  
  function getTypeColor(type) { // type = 'normal'
    let typesAndColors = {
      'normal': '#abc123',
      'fire': '#abc123',
      'stone': '#abc123',
    };
  
    return typesAndColors[type];
  }











  // setPokemonListCardsBgr('normal')
function setPokemonListCardsBgr(type) {
    return (
      {
        fire: "#ff8200",
        grass: "#1d8b15",
        water: "#0372d5",
        poison: "#7d00a1",
        flying: "#588ef5",
        normal: "#565656",
        bug: "#9ddd01",
        dark: "#8173bb",
        dragon: "#0a72dd",
        electric: "#ffe100",
        fairy: "#ffbbf9",
        fighting: "#ff0a3c",
        ghost: "#19214e",
        ground: "#ed002f",
        ice: "#02ffd5",
        psychic: "#ff504a",
        rock: "#dfd19f",
        steel: "#5695A3",
      }[type.toLowerCase()] || "white"
    );
  }