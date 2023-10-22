import styled from 'styled-components';
import { colors } from '../theme';

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${colors.background};
  color: ${colors.text};
  box-shadow: ${colors.shadow};

  cursor: pointer;
`;

export { Button };
