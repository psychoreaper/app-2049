import React, { FC, useState } from 'react';
import styled from 'styled-components';
import store, { moveDown, moveLeft, moveRight, moveUp } from '../store/store';

const Container = styled.div`
  display: grid;
  grid-template: repeat(4, 25%) / repeat(4, 25%);
  width: 400px;
  height: 400px;
  background-color: teal;

  align-items: center;
  justify-items: center;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto 3fr;
`;

const Field: FC = () => {
  const [field, setField] = useState(store.getState().field);

  store.subscribe(() => setField(store.getState().field));

  return (
    <>
      {store.getState().score}
      <Container>
        {field.map((line) => {
          return line.map((item, index) => <div key={index}>{item}</div>);
        })}
      </Container>
      <ButtonContainer>
        <button onClick={() => store.dispatch(moveUp())}>Up!</button>
        <button onClick={() => store.dispatch(moveLeft())}>Left!</button>
        <button onClick={() => store.dispatch(moveDown())}>Down!</button>
        <button onClick={() => store.dispatch(moveRight())}>Right!</button>
      </ButtonContainer>
    </>
  );
};

export { Field };
