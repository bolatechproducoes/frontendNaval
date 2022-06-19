// Importa o styled-components para permitir criar estilos de componentes (substitui o css)
import styled from 'styled-components';
// Importa as cores definidas no colors.js
import * as colors from '../../config/colors';

// Exporta o componente estilizado Form
export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;
  }

  .botoes {
    width: 100%;
    display: baseline;
    justify-content: space-between;
    align-items: center;
    direction: rtl;
  }

  div button {
    margin: 10px;
  }
`;

// Exporta o componente estilizado ProfilePicture
export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 20px;

  img {
    width: 500px;
    height: 300px;
    border-radius: 5%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: #fff;
    background: ${colors.primaryColor};
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

// Exporta o componente estilizado Title
export const Title = styled.h1`
  text-align: center;
`;
