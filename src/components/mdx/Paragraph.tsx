import styled from 'styled-components';

export default styled.p`
  font-size: 16px;
  line-height: 1.66;
  margin: 2em 0;
  ${p => p.theme.m} {
    font-size: 19px;
  }
  ${p => p.theme.l} {
    font-size: 20px;
  }
`;
