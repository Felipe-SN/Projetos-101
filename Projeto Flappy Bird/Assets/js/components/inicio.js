import { canvas, contexto, sprites } from '../jogo.js';

/// [parametros e funções usadas na tela de inicio do jogo, na mensagem "Get Ready"]
function criaTelaInicio() {
  const getReady = {
    srcX: 134,
    srcY: 0,
    larg: 174,
    alt: 152,
    posX: canvas.width / 2 - 174 / 2,
    posY: 50,

    desenha() {
      contexto.drawImage(
        sprites,
        getReady.srcX,
        getReady.srcY,
        getReady.larg,
        getReady.alt,
        getReady.posX,
        getReady.posY,
        getReady.larg,
        getReady.alt
      );
    },
  };

  return getReady;
}

export default criaTelaInicio;
