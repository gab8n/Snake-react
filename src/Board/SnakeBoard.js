import React, { useEffect, useState, useRef } from 'react';
import { randomIntFromInterval, useInterval } from '../lib/utils.js';
import useSound from 'use-sound';

import eatSound from '../Sounds/eatSound.mp3';
import gameOver from '../Sounds/GameOver.mp3';

import styles from '../Board/SnakeBoard.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { playMediumDifficulty } from '../Redux/Ducks/gameDifficulty';
import Countdown from '../Game/Countdown/Countdown';
import { changeDirection } from '../Redux/Ducks/snakeDirection';
import { toggleOpen, toggleClose } from '../Redux/Ducks/settingWindow';
import { getCellClassName } from './Utils/setClassName';
import { getGrowthNodeCoords } from './Utils/getGrowthNodeCoords';
import { isOutOfBounds } from './Utils/isOutOfBounds';
import { getDirectionFromKey } from './Utils/getDirectionFromKey';
import { getCoordsInDirection } from './Utils/getCoordsInDirection';
import { createBoard } from './Utils/createBoard';
import { Direction } from './Utils/Direction';
import { getStartingSnakeLLValue } from './Utils/getStartingSnakeLLValue';
import HearthIconLives from './HeartIconLives/HeartIconLives.jsx';
import GameOver from '../Game/GameOver/GameOver.jsx';
import GameOverAnimation from '../Game/GameOverAnimation/GameOverAnimation.jsx';
import { updateUserScore, updateUserHistory } from '../Services/firebase';
import { setUserData } from '../Redux/Ducks/auth';

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    const node = new LinkedListNode(value);
    this.head = node;
    this.tail = node;
  }
}

const BOARD_SIZE = 12;

const { boardStyle, rowStyle, boardContainer, gameScore, gameTopBar } = styles;

const SnakeBoard = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [board, setBoard] = useState(createBoard(BOARD_SIZE));
  const [snake, setSnake] = useState(
    new LinkedList(getStartingSnakeLLValue(board))
  );
  const [snakeCells, setSnakeCells] = useState(
    new Set([snake.head.value.cell])
  );
  const [foodCell, setFoodCell] = useState(snake.head.value.cell + 5);
  const [activeCountdown, setActiveCountdown] = useState(true);
  const toggleCountdown = () => {
    setActiveCountdown(!activeCountdown);
  };
  const [activeGameOverAnimation, setGameOverAnimation] = useState(false);
  const toggleGameOverAnimation = () => {
    setGameOverAnimation(!activeGameOverAnimation);
  };

  const direction = useSelector((state) => state.snakeDirection);
  const playEffectsVolume = useSelector(
    (state) => state.volumeManager.effectsVolume
  );
  const gameDifficulty = useSelector((state) => state.gameDifficulty);
  const settingWindow = useSelector((state) => state.settingWindow);
  const user = useSelector((state) => state.auth);
  const [isPlaying, setPlaying] = useState(false);
  const togglePlaying = () => {
    setPlaying(!isPlaying);
  };

  const [playEatSound] = useSound(eatSound, {
    volume: playEffectsVolume / 10,
  });
  const [playGameOver] = useSound(gameOver, {
    volume: playEffectsVolume / 10,
  });

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      handleKeydown(e);
    });
  }, []);

  useEffect(() => {
    setLives(3);
    setScore(0);
    const snakeLLStartingValue = getStartingSnakeLLValue(board);
    setSnake(new LinkedList(snakeLLStartingValue));
    setFoodCell(snakeLLStartingValue.cell + 5);
    setSnakeCells(new Set([snakeLLStartingValue.cell]));
  }, [gameDifficulty]);

  const dispatch = useDispatch();

  useInterval(
    () => {
      moveSnake();
    },
    !settingWindow && isPlaying ? gameDifficulty : null
  );

  const handleKeydown = (e) => {
    if (e.key === 'p') {
      dispatch(toggleOpen());
    } else {
      const newDirection = getDirectionFromKey(e.key);

      const isValidDirection = newDirection !== '';
      if (!isValidDirection) return;

      dispatch(changeDirection(newDirection));
    }
  };

  const moveSnake = () => {
    const currentHeadCoords = {
      row: snake.head.value.row,
      col: snake.head.value.col,
    };

    const nextHeadCoords = getCoordsInDirection(currentHeadCoords, direction);
    if (isOutOfBounds(nextHeadCoords, board)) {
      handleSnakeDied();
      return;
    }
    const nextHeadCell = board[nextHeadCoords.row][nextHeadCoords.col];
    if (snakeCells.has(nextHeadCell)) {
      handleSnakeDied();
      return;
    }

    const newHead = new LinkedListNode({
      row: nextHeadCoords.row,
      col: nextHeadCoords.col,
      cell: nextHeadCell,
    });
    const currentHead = snake.head;
    snake.head = newHead;
    currentHead.next = newHead;

    const newSnakeCells = new Set(snakeCells);
    newSnakeCells.delete(snake.tail.value.cell);
    newSnakeCells.add(nextHeadCell);

    snake.tail = snake.tail.next;
    if (snake.tail === null) snake.tail = snake.head;

    const foodConsumed = nextHeadCell === foodCell;
    if (foodConsumed) {
      // This function mutates newSnakeCells.
      playEatSound();
      growSnake(newSnakeCells);
      handleFoodConsumption(newSnakeCells);
    }

    setSnakeCells(newSnakeCells);
  };

  // This function mutates newSnakeCells.
  const growSnake = (newSnakeCells) => {
    const growthNodeCoords = getGrowthNodeCoords(snake.tail, direction);
    if (isOutOfBounds(growthNodeCoords, board)) {
      // Snake is positioned such that it can't grow; don't do anything.
      return;
    }
    const newTailCell = board[growthNodeCoords.row][growthNodeCoords.col];
    const newTail = new LinkedListNode({
      row: growthNodeCoords.row,
      col: growthNodeCoords.col,
      cell: newTailCell,
    });
    const currentTail = snake.tail;
    snake.tail = newTail;
    snake.tail.next = currentTail;

    newSnakeCells.add(newTailCell);
  };

  const handleFoodConsumption = (newSnakeCells) => {
    const maxPossibleCellValue = BOARD_SIZE * BOARD_SIZE;
    let nextFoodCell;

    while (true) {
      nextFoodCell = randomIntFromInterval(1, maxPossibleCellValue);
      if (newSnakeCells.has(nextFoodCell) || foodCell === nextFoodCell)
        continue;
      break;
    }

    setFoodCell(nextFoodCell);
    setScore(score + 1);
  };
  const onCountdownEnd = () => {
    toggleCountdown();
    const snakeLLStartingValue = getStartingSnakeLLValue(board);
    setSnake(new LinkedList(snakeLLStartingValue));
    setFoodCell(snakeLLStartingValue.cell + 5);
    setSnakeCells(new Set([snakeLLStartingValue.cell]));
    dispatch(changeDirection(Direction.RIGHT));
    togglePlaying();
  };
  const childRef = useRef();

  const onReplay = () => {
    setLives(3);
    setScore(0);
    const snakeLLStartingValue = getStartingSnakeLLValue(board);
    setSnake(new LinkedList(snakeLLStartingValue));
    setFoodCell(snakeLLStartingValue.cell + 5);
    setSnakeCells(new Set([snakeLLStartingValue.cell]));

    toggleCountdown();
  };

  const handleGameOver = () => {
    if (user.loggedIn) {
      const difficultyScore =
        gameDifficulty === 175
          ? 'scoreOnEasy'
          : gameDifficulty === 150
          ? 'scoreOnMedium'
          : 'scoreOnHard';
      if (score > user.userData[difficultyScore]) {
        updateUserScore(difficultyScore, user.userData.userId, score, (data) =>
          dispatch(setUserData(data))
        );
        const difficultyScore2 =
          gameDifficulty === 175
            ? 'Easy'
            : gameDifficulty === 150
            ? 'Medium'
            : 'Hard';
        updateUserHistory(
          'Played a game on ' +
            difficultyScore2 +
            ' and made a Highscore of: ' +
            score,
          user.userData.userId
        );
      } else {
        const difficultyScore2 =
          gameDifficulty === 175
            ? 'Easy'
            : gameDifficulty === 150
            ? 'Medium'
            : 'Hard';
        updateUserHistory(
          'Played a game on ' +
            difficultyScore2 +
            ' and made a score of: ' +
            score,
          user.userData.userId
        );
      }
    }
    setLives(0);
    togglePlaying();
    playGameOver();
    toggleGameOverAnimation();
    const timer = setTimeout(() => {
      childRef.current.openModal();
    }, 2100);
    return () => clearTimeout(timer);
  };
  const handleSnakeDied = () => {
    if (lives > 1) {
      setLives(lives - 1);
      togglePlaying();
      toggleCountdown();
    } else {
      handleGameOver();
    }
  };
  return (
    <div className={boardContainer}>
      <div className={gameTopBar}>
        <h2 className={gameScore}>Score: {score}</h2>
        <HearthIconLives {...{ lives }} />
      </div>
      <div className={boardStyle}>
        {board.map((row, rowIdx) => (
          <div key={rowIdx} className={rowStyle}>
            {row.map((cellValue, cellIdx) => {
              const className = getCellClassName(
                cellValue,
                foodCell,
                snakeCells,
                snake.head.value.cell,
                snake.tail.value.cell,
                direction,
                styles,
                activeCountdown
              );
              return <div key={cellIdx} className={className}></div>;
            })}
          </div>
        ))}
      </div>
      {!settingWindow && activeCountdown ? (
        <Countdown onCountdownEnd={onCountdownEnd} />
      ) : (
        ''
      )}
      {activeGameOverAnimation ? (
        <GameOverAnimation onFinishAnimation={toggleGameOverAnimation} />
      ) : (
        ''
      )}

      <GameOver
        {...{ score, onReplay }}
        restartGame={() => dispatch(playMediumDifficulty())}
        ref={childRef}
      />
    </div>
  );
};

export default SnakeBoard;
