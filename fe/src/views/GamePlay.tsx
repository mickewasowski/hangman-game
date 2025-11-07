import { InGameModal } from "../types/Types.ts";
import "./GamePlay.scss";
import {
  LooseModal,
  PauseModal,
  WinModal,
} from "../components/modals/InGameModals.tsx";
import { MenuTitleButton } from "../components/MenuTitleButton.tsx";
import { HealthBar } from "../components/HealthBar.tsx";
import { useGameContext } from "../contexts/GameContext.tsx";
import { GuessingLetters } from "../components/GuessingLetters.tsx";

const GamePlay = () => {
  const { modal, toggleModal, updateHealth, resetLetterStates } =
    useGameContext();

  const resetStates = () => {
    resetLetterStates();
    updateHealth(100);
    toggleModal(null);
  };

  const renderModal = () => {
    switch (modal.type) {
      case InGameModal.Pause: {
        return <PauseModal handleCloseModal={() => toggleModal(null)} />;
      }
      case InGameModal.Win: {
        return <WinModal playAgain={resetStates} />;
      }
      case InGameModal.Loose: {
        return <LooseModal playAgain={resetStates} />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <>
      <div className="GamePlay">
        <header className="GamePlay__header">
          <MenuTitleButton
            clickHandler={() => toggleModal(InGameModal.Pause)}
          />
          <HealthBar />
        </header>
        <main className="GamePlay__main">
          <GuessingLetters />
        </main>
      </div>
      <>{renderModal()}</>
    </>
  );
};

export default GamePlay;
