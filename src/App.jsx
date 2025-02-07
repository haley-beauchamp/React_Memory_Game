import { useState, useEffect } from "react";
import "./App.css";
import shuffleArray from "./utils/shuffleArray";
import Card from "./components/Card";
import WorldClock from "./components/WorldClock";

function App() {
	const cardCount = 12;
	const [cards, setCards] = useState([]);
	const score = cards.filter((card) => card.clicked).length; // Track score using the number of cards that have been clicked
	const [bestScore, setBestScore] = useState(0);

	// Fetch data from Hyrule Compendium API and create cards based on them
	useEffect(() => {
		fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters")
			.then((res) => res.json())
			.then((data) => {
				const monsters = shuffleArray(data.data).slice(0, cardCount); // Pick random entries from the API
				const selectedMonsters = monsters.map((monster) => ({
					name: monster.name,
					id: monster.id,
					clicked: false,
					image: monster.image,
				}));
				setCards(selectedMonsters);
			});
	}, []);

	function handleCardClick(cardId) {
		const clickedCard = cards.find((card) => card.id === cardId);

		// If a card was previously clicked (repeated click, loss condition)
		if (clickedCard.clicked) {
			if (score > bestScore) {
				setBestScore(score);
			}

			const resetCards = cards.map((card) => ({ ...card, clicked: false })); // Set clicked status of all cards to false to restart the game and reset score
			setCards(shuffleArray(resetCards));
		} else {
			const updatedCards = cards.map((card) => ({
				...card,
				clicked: card.id === cardId ? true : card.clicked, // If card id matches, set clicked to true. Otherwise leave it as it is
			}));
			setCards(shuffleArray(updatedCards));
		}
	}

	return (
		<>
			<div className='align'>
				<h1>Zelda Memory Game</h1>
				<div className='scores'>
					<p>Score: {score}</p>
					<p>Best Score: {bestScore}</p>
				</div>
			</div>
			<p>Click images to get points! Don't click on any image more than once.</p>
			<div className='cards'>
				{cards.map((card) => (
					<Card key={card.id} name={card.name} image={card.image} onClick={() => handleCardClick(card.id)} />
				))}
			</div>
			<WorldClock></WorldClock>
		</>
	);
}

export default App;
