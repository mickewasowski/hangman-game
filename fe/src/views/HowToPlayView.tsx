import { GuideCard } from "../components/GuideCard";

const HowToPlayView = () => {

  const rules = [
    {
      index: 1,
      title: 'Choose a category',
      content: 'First, choose a word category, like animals or movies. The computer then randomly selects a secret word from that topic and shows you blanks for each letter of the word.'
    },
    {
      index: 2,
      title: 'Guess letters',
      content: 'Take turns guessing letters. The computer fills in the relevant blank spaces if your guess is correct. If it’s wrong, you lose some health, which empties after eight incorrect guesses.'
    },
    {
      index: 3,
      title: 'Win or lose',
      content: 'You win by guessing all the letters in the word before your health runs out. If the health bar empties before you guess the word, you lose.'
    },
  ];

  return (
  <div className="HowToPlayView">
      <header className="HowToPlayView__header">
        <button></button>
        <h1>How to Play</h1>
      </header>
    </div>
  )
}

export default HowToPlayView;

