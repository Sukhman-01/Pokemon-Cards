const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };

const url = "https://pokeapi.co/api/v2/pokemon/";

const card = document.getElementById("card");
const btn = document.getElementById("btn");

let getPokeData = () => {
  //generate a random number bw 1 and 150
  let id = Math.floor(Math.random() * 150) + 1;

  const finalUrl = url + id;
  console.log(finalUrl);

  // fetch generated url
  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
        generateCard(data);
    });
};

//generate card
let generateCard = (data) => {
    // get the necessary data and assign it to variables
    console.log(data);
    const hp = data.stats[0].base_stat;
    console.log("hp "+hp);
    const attack = data.stats[1].base_stat;
    const defence = data.stats[2].base_stat;
    const speed = data.stats[5].base_stat;
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
    // const imgSrc = data.sprites.other["official-artwork"].front_default; 
    const imgSrc = data.sprites.other.dream_world.front_default; 

    //set theme color based on pokemon type
    const themeColor = typeColor[data.types[0].type.name];
    console.log(themeColor);

    card.innerHTML = `
        <p class="hp">
            <span>HP</span> ${hp}
        </p>
        <div id="imgcnt"><img src="${imgSrc}"></div>
        <h2 class="poke-name">${pokeName}</h2>
        <div class="types">
            
        </div>
        <div class="stats">
            <div>
                <h3>${attack}</h3>
                <p>Attack</p>
            </div>
            <div>
                <h3>${defence}</h3>
                <p>Defence</p>
            </div>
            <div>
                <h3>${speed}</h3>
                <p>Speed</p>
            </div>
        </div>
    `;
    appendTypes(data.types); 
    styleCard(themeColor);
};

let appendTypes = (types) => {
    types.forEach((item)=>{
        let span = document.createElement("SPAN");
        span.textContent = item.type.name;
        console.log(span);
        document.querySelector(".types").appendChild(span); 
    });
};

let styleCard = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`
    card.querySelectorAll(".types span").forEach((typeColor) => {
        typeColor.style.background = color;
    });
};

btn.addEventListener("click", getPokeData);
window.addEventListener("load",getPokeData);
