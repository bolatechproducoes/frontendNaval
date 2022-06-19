// Importa o styled-components para permitir criar estilos de componentes (substitui o css)
import styled from 'styled-components';
// Importa as cores do arquivo colors.js
import * as colors from '../../config/colors';

// Exporta o componente estilizado Title
export const Title = styled.h1`
  text-align: center;
`;

// Exporta o componente estilizado Form
export const Form = styled.form`
  label {
    width: 1000px;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    border: 5px dashed ${colors.primaryColor};
    margin: 30px auto;
    cursor: pointer;
    border-radius: 5%;
    overflow: hidden;

    img {
      width: 1000px;
      height: 600px;
    }
  }

  input {
    display: none;
  }
`;
