import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard/SingleCard";

const images = [
	{ src: "https://i.imgur.com/GkW1bOv.png", matched: false },
	{ src: "https://i.imgur.com/5GMxbtN.png", matched: false },
	{ src: "https://i.imgur.com/X3UjLXF.png", matched: false },
	{ src: "https://i.imgur.com/UByo2YX.png", matched: false },
	{ src: "https://i.imgur.com/f2phfBN.png", matched: false },
	{ src: "https://i.imgur.com/AkHBnT3.png", matched: false },
];

function App() {
	const [cards, setCards] = useState();
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);

	// Shuffle cards on first load
	useEffect(() => {
		shuffleCards();
	}, []);

	// Shuffle cards
	const shuffleCards = () => {
		const shuffledCards = [...images, ...images]
			.sort(() => Math.random() - 0.5)
			.map((card, index) => ({ ...card, id: index }));
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns(0);
		setTimeout(() => {
			setCards(shuffledCards);
		}, 300);
	};

	// Handle a choice
	const handleChoice = card => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	// Compare cards and match them
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			if (choiceOne.src === choiceTwo.src) {
				setCards(prevCards => {
					return prevCards.map(card => {
						if (card.src === choiceOne.src) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});
			}
			setTimeout(() => resetTurn(), 1000);
		}
	}, [choiceOne, choiceTwo]);

	// Reset turn
	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns(prevTurns => prevTurns + 1);
		setDisabled(false);
	};

	return (
		<>
			<header>
				<h1>Magic Match</h1>
				<p>Turns: {turns}</p>
				<button onClick={shuffleCards}>New Game</button>
			</header>
			<main>
				{cards &&
					cards.map(card => (
						<SingleCard
							card={card}
							key={card.id}
							handleChoice={handleChoice}
							flipped={card === choiceOne || card === choiceTwo || card.matched}
							disabled={disabled}
						/>
					))}
			</main>
		</>
	);
}

export default App;
