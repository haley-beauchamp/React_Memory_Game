import { useState, useEffect } from "react";
import "./App.css";
import shuffleArray from "./utils/shuffleArray";
import Card from "./components/Card";

function App() {
	const cardCount = 12;
	const [cards, setCards] = useState([]);
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);

	useEffect(() => {
		fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters")
			.then((res) => res.json())
			.then((data) => {
				const monters = shuffleArray(data.data).slice(0, cardCount);
				const selectedMonsters = monters.map((monster) => ({
					name: monster.name,
					id: monster.id,
					clicked: false,
					image: monster.image,
				}));
				setCards(selectedMonsters);
			});
	}, []);

	function handleCardClick() {
		
	}

	return (
		<>
			<h1>Zelda Memory Game</h1>
			<div class='cards'>
				{cards.map((card) => (
					<Card key={card.id} name={card.name} image={card.image} onClick={() => handleCardClick(card.id)} />
				))}
			</div>
		</>
	);
}

export default App;
