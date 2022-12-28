function setColors(type) {
    let typesAndColors = {
        fire: "rgb(250, 85, 66)",
        grass: "rgb(136, 210, 79)",
        water: "rgb(87, 173, 255)",
        poison: "rgb(164, 91, 159)",
        flying: "rgb(120, 164, 251)",
        normal: "rgb(188, 189, 175)",
        bug: "rgb(195, 210, 31)",
        dark: "rgb(138, 103, 83)",
        dragon: "rgb(132, 115, 254)",
        electric: "rgb(254, 235, 53)",
        fairy: "rgb(251, 173, 255)",
        fighting: "rgb(169, 85, 65)",
        ghost: "rgb(120, 116, 213)",
        ground: "rgb(239, 202, 88)",
        ice: "rgb(149, 241, 255)",
        psychic: "#ff504a",
        rock: "rgb(245, 96, 177)",
        steel: "rgb(195, 194, 217)"
    };
    return (typesAndColors[type]);
}


function cardsHoverEffect(onePokemon, i) {
    let pokemonType = onePokemon['types'][0]['type']['name'];

    const hoverBg = {
        normal: 'normal1',
        poison: 'poison1',
        psychic: 'psychic1',
        grass: 'grass1',
        ground: 'ground1',
        ice: 'ice1',
        fire: 'fire1',
        rock: 'rock1',
        dragon: 'dragon1',
        water: 'water1',
        bug: 'bug1',
        dark: 'dark1',
        fighting: 'fighting1',
        ghost: 'ghost1',
        steel: 'steel1',
        flying: 'flying1',
        electric: 'electric1',
        fairy: 'fairy1'
    };

    const className = hoverBg[pokemonType];
    if (className) {
        document.getElementById(`pokemonCards${i}`).classList.add(className);
    }
}


const CONFI_BG_COLORS = [
    'rgb(170 74 68 / 80%)',
    'rgb(54 162 235 / 80%)',
    'rgb(255 206 86 / 80%)',
    'rgb(124 252 0 / 80%)',
    'rgb(191 64 191 / 80%)',
    'rgb(255 191 0 / 80%)'
];

const CONFIG_BORDER = [
    'rgb(0 0 0)',
    'rgb(0 0 0)',
    'rgb(0 0 0)',
    'rgb(0 0 0)',
    'rgb(0 0 0)',
    'rgb(0 0 0)'
];


const CONFIG_CHART_OPTIONS = {
    scales: {
        y: {
            beginAtZero: true
        },
        x: {
            ticks: {
                font: {
                    size: 12,
                    weight: 100
                },
                color: 'rgb(255, 255, 255)'
            }
        },
        // x: {
        //     ticks: {
        //         color: 'rgb(255, 255, 255)'
        //     }
        // }
    },
    plugins: {
        legend: {
            display: false,
        }
    }
};

