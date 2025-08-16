// importa todas as imagens da pasta ../../img
const imagens = require.context('../../img/pokemons', false, /\.(png|jpe?g|svg)$/);

// transforma em um array de objetos { nome, src }
export const itens = imagens.keys().map((caminho, index) => {
  return {
    id: index + 1,
    nome: caminho.replace('./', ''), // remove o ./ do nome
    src: imagens(caminho)
  };
});
