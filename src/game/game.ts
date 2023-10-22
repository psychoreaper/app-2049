import { FieldType } from '../types';

const createNewField = (): FieldType => new Array(4).fill(null).map(() => new Array(4).fill(0));

const hasValue = (field: FieldType, value: number): boolean => {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === value) {
        return true;
      }
    }
  }
  return false;
};

const hasDiff = (field, newBoard): boolean => {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field.length; j++) {
      if (field[i][j] !== newBoard[i][j]) {
        return true;
      }
    }
  }
  return false;
};

const randomPosition = (): [number, number] => {
  const row = Math.floor(Math.random() * 4);
  const col = Math.floor(Math.random() * 4);
  return [row, col];
};

const generateRandom = (field: FieldType): FieldType => {
  if (!hasValue(field, 0)) return field;

  let [row, col] = randomPosition();
  while (field[row][col] !== 0) {
    [row, col] = randomPosition();
  }

  field[row][col] = Math.random() >= 0.9 ? 4 : 2;
  return field;
};

const compress = (field): FieldType => {
  const newField = createNewField();
  for (let i = 0; i < 4; i++) {
    let col = 0;
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] !== 0) {
        newField[i][col] = field[i][j];
        col++;
      }
    }
  }
  return newField;
};

const merge = (field: FieldType): [FieldType, number] => {
  let score = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] > 0 && field[i][j] === field[i][j + 1]) {
        score += field[i][j] * 2;
        field[i][j] = field[i][j] * 2;
        field[i][j + 1] = 0;
      }
    }
  }
  return [field, score];
};

const reverse = (field: FieldType): FieldType => {
  const newField = createNewField();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < field[i].length; j++) {
      newField[i][j] = field[i][field.length - 1 - j];
    }
  }
  return newField;
};

const rotateLeft = (field: FieldType): FieldType => {
  const newField = createNewField();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < field[i].length; j++) {
      newField[i][j] = field[j][field.length - 1 - i];
    }
  }
  return newField;
};

const rotateRight = (field: FieldType): FieldType => {
  const newField = createNewField();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < field[i].length; j++) {
      newField[i][j] = field[field.length - 1 - j][i];
    }
  }
  return newField;
};

const moveToLeft = (field): [FieldType, number] => {
  const nField1 = compress(field);
  const [nField2, score] = merge(nField1);
  const nField3 = compress(nField2);
  return [nField3, score];
};

const moveToRight = (field): [FieldType, number] =>
  moveFunction(field, reverse, moveToLeft, reverse);
const moveToUp = (field): [FieldType, number] =>
  moveFunction(field, rotateLeft, moveToLeft, rotateRight);
const moveToDown = (field): [FieldType, number] =>
  moveFunction(field, rotateRight, moveToLeft, rotateLeft);

const moveFunction = (
  field: FieldType,
  main: (arg0: FieldType) => FieldType,
  process: (arg0: FieldType) => [FieldType, number],
  result: (arg0: FieldType) => FieldType
): [FieldType, number] => {
  const nField1 = main(field);
  const [nField2, score] = process(nField1);
  const resField = result(nField2);
  return [resField, score];
};

const isGameWon = (field): boolean => hasValue(field, 2048);

const isGameLost = (field): boolean =>
  !(
    hasDiff(field, moveToLeft(field)[0]) ||
    hasDiff(field, moveToRight(field)[0]) ||
    hasDiff(field, moveToUp(field)[0]) ||
    hasDiff(field, moveToDown(field)[0])
  );

const isGameOver = (field): [boolean, string] => {
  let over = false;
  let reason = '';
  if (isGameWon(field)) {
    over = true;
    reason = 'win';
  }
  if (isGameLost(field)) {
    over = true;
    reason = 'lose';
  }
  return [over, reason];
};

export {
  createNewField,
  generateRandom,
  compress,
  merge,
  reverse,
  rotateLeft,
  rotateRight,
  moveToLeft,
  moveToRight,
  moveToUp,
  moveToDown,
  moveFunction,
  isGameOver
};
