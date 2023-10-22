import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import store, { moveDown, moveLeft, moveRight, moveUp, restart, undo } from '../store/store';
import { colors } from '../theme';
import { Button } from './Button';

const ButtonContainer = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-between;
`;

const Container = styled.div`
  display: grid;
  grid-template: repeat(4, 25%) / repeat(4, 25%);
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 5px;
  box-shadow: 0px 7px 30px 3px rgba(28, 160, 231, 0.36);

  align-items: center;
  justify-items: center;

  margin-top: 20px;
  margin-bottom: 40px;
`;

const ArrowButtonContainer = styled.div`
  display: flex;
  gap: 25px;
`;

const Tile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85px;
  height: 85px;
`;

const NumberTile = styled(Tile)<{ value: number }>(
  ({ value }) => css`
    background-color: ${colors.buttons[`${value}`]};
  `
);

const EmptyTile = styled(Tile)`
  background-color: #d9d9d9;
`;

const ArrowButton = styled(Button)`
  height: 70px;
  width: 100px;

  &:hover {
    background-color: #cccccc;
    box-shadow: none;
  }

  transition: 0.3s ease-in-out;
`;

const Field: FC = () => {
  const [field, setField] = useState(store.getState().field);

  store.subscribe(() => setField(store.getState().field));

  return (
    <>
      <ButtonContainer>
        <Button style={{ width: 70, height: 40 }} onClick={() => store.dispatch(undo())}>
          ↩
        </Button>
        <Button style={{ width: 70, height: 40 }} onClick={() => store.dispatch(restart())}>
          ↺
        </Button>
        <Button style={{ width: 70, height: 40 }} onClick={() => console.log('rules')}>
          ?
        </Button>
      </ButtonContainer>
      <Container>
        {field.map((line) => {
          return line.map((item, index) =>
            item > 0 ? (
              <NumberTile key={index} value={item}>
                {item}
              </NumberTile>
            ) : (
              <EmptyTile key={index} />
            )
          );
        })}
      </Container>
      Score: {store.getState().score}
      <ArrowButton
        style={{ marginBottom: '25px', marginTop: '40px' }}
        onClick={() => store.dispatch(moveUp())}>
        ↑
      </ArrowButton>
      <ArrowButtonContainer>
        <ArrowButton onClick={() => store.dispatch(moveLeft())}>←</ArrowButton>
        <ArrowButton onClick={() => store.dispatch(moveDown())}>↓</ArrowButton>
        <ArrowButton onClick={() => store.dispatch(moveRight())}>→</ArrowButton>
      </ArrowButtonContainer>
    </>
  );
};

export { Field };
