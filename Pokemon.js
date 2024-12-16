const userInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const image = document.getElementById("img-container");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

//Create async function
const fetchPokemon = async () =>
{
	try
	{
		const pokemonNameOrId = userInput.value.toLowerCase();
		const response = await fetch(
		`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`);
		const data = await response.json();

		//Set Pokémon information
		pokemonName.textContent = `${data.name.toUpperCase()}`;
		pokemonId.textContent = `#${data.id}`;
		weight.textContent = `Weight: ${data.weight}`;
		height.textContent = `Height: ${data.height}`;
		image.innerHTML = `<img id="sprite" src="${data.sprites.front_default}"
							alt="${data.name} front default sprite">`;

		//Set stats
		hp.textContent = data.stats[0].base_stat;
		attack.textContent = data.stats[1].base_stat;
		defense.textContent = data.stats[2].base_stat;
		specialAttack.textContent = data.stats[3].base_stat;
		specialDefense.textContent = data.stats[4].base_stat;
		speed.textContent = data.stats[5].base_stat; 

		//Set types
		types.innerHTML = data.types.map(obj =>
		`<span class="type ${obj.type.name}">${obj.type.name}</span>`).join('');
	}

	catch (err)
	{
		resetDisplay();
		alert("Pokémon not found");
		console.log(`Pokémon not found: ${err}`);
	}
}

const resetDisplay = () =>
{
	const sprite = document.getElementById("sprite");
	if (sprite) sprite.remove();
	  pokemonName.textContent = '';
	  pokemonId.textContent = '';
	  types.innerHTML = '';
	  height.textContent = '';
	  weight.textContent = '';
	  hp.textContent = '';
	  attack.textContent = '';
	  defense.textContent = '';
	  specialAttack.textContent = '';
	  specialDefense.textContent = '';
	  speed.textContent = '';
}

searchBtn.addEventListener("click", () =>
{
	fetchPokemon();
});

userInput.addEventListener("keydown", e =>
{
	if (e.key === "Enter")
	{
		fetchPokemon();
	}	
});