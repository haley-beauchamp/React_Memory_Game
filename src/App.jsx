import { useState, useEffect } from "react";
import "./App.css";
import shuffleArray from "./utils/shuffleArray";
import Card from "./components/Card";

function App() {
	const cardCount = 12;
	const [cards, setCards] = useState([]);
	const score = cards.filter((card) => card.clicked).length;
	const [bestScore, setBestScore] = useState(0);

	useEffect(() => {
		fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters")
			.then((res) => res.json())
			.then((data) => {
				const monsters = shuffleArray(data.data).slice(0, cardCount);
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
		setCards((previousCardState) => {
			const updatedCards = previousCardState.map((card) => {
				if (card.id === cardId) {
					if (card.clicked) {
						if (score > bestScore) {
							setBestScore(score);
						}

						setCards((prevState) => prevState.map((card) => ({ ...card, clicked: false })));
						return { ...card, clicked: false };
					}

					return { ...card, clicked: true };
				}

				return card;
			});

			return shuffleArray(updatedCards);
		});
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
		</>
	);
}

export default App;
