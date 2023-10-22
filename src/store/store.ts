import { configureStore, createSlice } from '@reduxjs/toolkit';
import {
  createNewField,
  generateRandom,
  moveToLeft,
  moveToUp,
  moveToRight,
  moveToDown
} from '../game/game';

const gameStore = createSlice({
  name: 'game',
  initialState: {
    field: generateRandom(createNewField()),
    score: 0
  },
  reducers: {
    moveLeft: (state) => {
      const [field, score] = moveToLeft(state.field);
      state.field = generateRandom(field);
      state.score += score;
    },
    moveRight: (state) => {
      const [field, score] = moveToRight(state.field);
      state.field = generateRandom(field);
      state.score += score;
    },
    moveUp: (state) => {
      const [field, score] = moveToUp(state.field);
      state.field = generateRandom(field);
      state.score += score;
    },
    moveDown: (state) => {
      const [field, score] = moveToDown(state.field);
      state.field = generateRandom(field);
      state.score += score;
    }
  }
});

export const { moveUp, moveRight, moveLeft, moveDown } = gameStore.actions;

const store = configureStore({ reducer: gameStore.reducer });

export default store;
