import { configureStore, createSlice } from '@reduxjs/toolkit';
import {
  createNewField,
  generateRandom,
  moveToLeft,
  moveToUp,
  moveToRight,
  moveToDown
} from '../game/game';

const initialStateValues = {
  field: generateRandom(createNewField()),
  score: 0,
  previousField: createNewField(),
  previousScore: 0
};

const gameStore = createSlice({
  name: 'game',
  initialState: initialStateValues,
  reducers: {
    moveLeft: (state) => {
      const [field, score] = moveToLeft(state.field);
      state.previousField = state.field;
      state.previousScore = state.score;
      state.field = generateRandom(field);
      state.score += score;
    },
    moveRight: (state) => {
      const [field, score] = moveToRight(state.field);
      state.previousField = state.field;
      state.previousScore = state.score;
      state.field = generateRandom(field);
      state.score += score;
    },
    moveUp: (state) => {
      const [field, score] = moveToUp(state.field);
      state.previousField = state.field;
      state.previousScore = state.score;
      state.field = generateRandom(field);
      state.score += score;
    },
    moveDown: (state) => {
      const [field, score] = moveToDown(state.field);
      state.previousField = state.field;
      state.previousScore = state.score;
      state.field = generateRandom(field);
      state.score += score;
    },
    undo: (state) => {
      state.field = state.previousField;
      state.score = state.previousScore;
      state.previousScore = 0;
    },
    restart: (state) => {
      state.field = generateRandom(createNewField());
      state.score = 0;
      state.previousField = createNewField();
      state.previousScore = 0;
    }
  }
});

export const { moveUp, moveRight, moveLeft, moveDown, undo, restart } = gameStore.actions;

const store = configureStore({ reducer: gameStore.reducer });

export default store;
