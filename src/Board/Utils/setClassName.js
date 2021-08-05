export const getCellClassName = (
  cellValue,
  foodCell,
  snakeCells,
  snakeHead,
  snakeTail,
  direction,
  styles,
  activeCountdown
) => {
  const {
    snakeHeadStyle,
    snakeTailStyle,
    snakeBodyStyle,
    snakeHeadStyleUP,
    snakeHeadStyleDOWN,
    snakeHeadStyleLEFT,
    snakeHeadStyleRIGHT,
    cellStyle,
    foodStyle,
  } = styles;

  let className = cellStyle;
  if (cellValue === foodCell) {
    className = `${cellStyle}` + ' ' + `${foodStyle}`;
  }
  if (cellValue === snakeHead) {
    className =
      `${cellStyle}` +
      ' ' +
      `${snakeHeadStyle}` +
      ' ' +
      (!activeCountdown
        ? direction === 'UP'
          ? `${snakeHeadStyleUP}`
          : direction === 'DOWN'
          ? snakeHeadStyleDOWN
          : direction === 'LEFT'
          ? snakeHeadStyleLEFT
          : snakeHeadStyleRIGHT
        : '');
  } else if (cellValue === snakeTail)
    className = `${cellStyle}` + ' ' + `${snakeTailStyle}`;
  else if (snakeCells.has(cellValue))
    className = `${cellStyle}` + ' ' + `${snakeBodyStyle}`;
  return className;
};
