import React, { useEffect, useState } from 'react'; 
import styled, { keyframes } from "styled-components"; 

const FrameCard = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: row;
justify-content: center; 
align-items: center; 
margin: 0 auto; 
border-radius: 10px; 
background: linear-gradient(-45deg, #e3f5fd, #c9e9fa, #e3f5fd); 
width: 100%; 
`;
 
const PokemonCard = styled.div`
background: linear-gradient(-55deg, #008000, #337a33, #800080); 
display: flex; 
flex-direction: row; 
justify-content: center; 
align-items: center; 
min-width: 600px; 
padding: 10px; 
margin: 5px; 
border-radius: 10px; 
box-shadow: 0 2px 6px rgba(0,0,0,0.1); 
`;
 
const FrameText = styled.div`
display: flex; 
flex-direction: column; 
justify-content: center; 
align-items: center; 
`; 

const PokemonImage = styled.img`
height: 200px; 
width: 200px; 
`; 

const PokeNumber = styled.p`
font-size: 30px; 
font-family: 'Montserrat','Helvetica Neue',Arial,sans-serif; 
font-weight: 700; 
line-height: 1.5; 
letter-spacing: 0.5px; 
color: #fff; 
`; 

const PokeName = styled.p`
font-size: 30px; 
font-family: 'Montserrat','Helvetica Neue',Arial,sans-serif; 
font-weight: 700; 
line-height: 1.5; 
letter-spacing: 0.5px; 
color: #fff; 
`; 

const PokemonImageTypeFrame = styled.div`
display: flex; 
flex-direction: row; 
justify-content: center; 
align-items: center; 
flex-wrap: wrap; 
gap: 6px; 
padding: 15px; 
margin: 5px; 
`; 

const PokemonImageType = styled.img`
display: flex; 
flex-direction: row; 
justify-content: center; 
align-items: center; 
width: 30px; 
height: 30px; 
`; 

const PokemonEvoGrid = styled.div`
display: flex; 
flex-direction: row; 
align-itens: center; 
align-items: center; 
flex-wrap: wrap; 
`; 
const EvolveCard = styled.div`
display: flex; 
flex-direction: row;
justify-content: space-around;
align-items: center;
padding: 10px;
heigth: 50px;
width: 100px;
`; 

const PokeImgEvo = styled.img`
width: 40px; 
height: 40px;
`; 

const spin = keyframes`
0% { transform: rotate(0deg); } 
100% { transform: rotate(360deg); }
 `; 
 
 const Spinner = styled.div`
border: 6px solid #f3f3f3;
border-top: 6px solid #3498db;
border-radius: 50%;
width: 60px;
height: 60px;
animation: ${spin} 1s linear infinite; margin: 50px auto;
`; 

function normalizeNumber(num) {
	if (!num) return ""; 
	return String(num).padStart(3, "0"); 
} 

function pokeKeyFromHome(pokemon) 	{
	return normalizeNumber(pokemon?.id ?? pokemon?.number ?? ""); 
	}

function imageIdForSrc(pokemon) { 
	if (typeof pokemon === "object")
	{
		return normalizeNumber(pokemon?.id ?? pokemon?.number ?? "");
	} 
	return normalizeNumber(pokemon);
} 

function HomePokemons() { 
	const [pokemons, setPokemons] = useState([]); 
	const [evolves, setEvolves] = useState([]);
	const [pokemonstype, setPokemonsType] = useState([]);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => { 
		async function fetchData() 	{ 
				try { 
						const [resPokemons, resTypes, resEvolves] = await Promise.all([ 
							fetch("http://localhost:8000/home"), 
							fetch("http://localhost:8000/types"), 
							fetch("http://localhost:8000/evolves"), 
						]); 
						
						if (!resPokemons.ok) throw new Error("Erro ao buscar pokemons"); 
						if (!resTypes.ok) throw new Error("Erro ao buscar types"); 
						if (!resEvolves.ok) throw new Error("Erro ao buscar evoluções"); 
						
						const pokemonsData = await resPokemons.json(); 
						const typesData = await resTypes.json(); 
						const evolvesData = await resEvolves.json(); 
						
						setPokemons(pokemonsData || []); 
						setPokemonsType(typesData || []); 
						setEvolves(evolvesData || []); 
					} catch (err) { 
						console.error("Falha no fetch:", err.message); 
						setPokemons([]); 
						setPokemonsType([]); 
						setEvolves([]); 
					} finally { 
						setLoading(false);
					}
				} 
				fetchData();
	}, []); 
			
	if (loading) return <Spinner />; 
	if (!pokemons?.length) return <Spinner />; 
	if (!pokemonstype?.length) return <Spinner />; 
	if (!evolves?.length) return <Spinner />;
	
	const evoGroups = []; 
	
	for (const chain of (evolves || [])) { 
		const fullLine = [ { number: chain?.pokemon?.number, name: chain?.pokemon?.name }, ...((chain?.evolve) || []), ].filter(x => x && x.number); 
		const group = fullLine .map(ev => pokemons.find(p => pokeKeyFromHome(p) === normalizeNumber(ev.number))) .filter(Boolean); 
	
		if (group.length > 0) { 
			evoGroups.push(group); 
		} 
	} 
	
	const covered = new Set( 
		evoGroups.flat().map(p => pokeKeyFromHome(p)).filter(Boolean)
	); 
	
	const singles = pokemons.filter(p => { 
		const key = pokeKeyFromHome(p); 
		return key && !covered.has(key); 
	}); 
	
	
	for (const single of singles) { 
		evoGroups.push([single]); 
	} 
	
	return (
		<FrameCard> 
		{pokemons.map((pokemon) => { 
		const evoGroup = evoGroups.find(group => group.some(p => pokeKeyFromHome(p) === pokeKeyFromHome(pokemon)) ); 
			return ( 
			<PokemonCard key={pokemon.id ?? pokemon.number}> 
			<PokemonImage 
				src={ pokemon.image || `http://localhost:8000/home/${imageIdForSrc(pokemon)}/img`} 
				alt={pokemon.name} 
			/> 
			
			<FrameText> 
			<PokeNumber>#{pokemon.id ?? (pokemon.number || "")}</PokeNumber> 
			<PokeName>{pokemon.name && pokemon.name.toUpperCase()}</PokeName> 
			<PokemonImageTypeFrame> 
				{(Array.isArray(pokemon.type) ? pokemon.type.slice(0, 2) : [pokemon.type]) .filter(Boolean) .map((type) => ( 
					<PokemonImageType 
						key={type} 
						src={`http://localhost:8000/types/${encodeURIComponent(type)}.png`} 
						alt={String(type)} 
					/> 
				))} 
				</PokemonImageTypeFrame> 
				{evoGroup && ( 
					<PokemonEvoGrid> 
						{evoGroup.map((ev) => ( 
							<EvolveCard key={ev.id ?? ev.number}> 
								<PokeImgEvo 
									src={ ev.image || `http://localhost:8000/home/${imageIdForSrc(ev)}/img`} 
									alt={ev.name} 
								/> 
							</EvolveCard>
						))} 
					</PokemonEvoGrid> 
				)} 
				</FrameText> 
				</PokemonCard> 
		); 
		})} 
</FrameCard> 
	); 
}
	
export default HomePokemons;
