import {
  contexto,
  globais,
  sounds,
  sprites,
  trocarTela,
  telas,
  frames,
  telaAtiva,
} from '../jogo.js';

/// [parâmetros e funções usadas no Flappy-Bird]
function colisao(flappyBird, chao) {
  if (flappyBird.posY >= chao.posY - flappyBird.alt) {
    return true;
  } else {
    return false;
  }
}

function criaPlayer() {
  const flappyBird = {
    srcX: 0,
    srcY: 0,
    larg: 33,
    alt: 24,
    posX: 10,
    posY: 50,
    grav: 0.25,
    velo: 0,
    subir: 4.6,

    sobe() {
      sounds.puloSound.play();
      flappyBird.velo = -flappyBird.subir;
    },

    update() {
      if (colisao(flappyBird, globais.chao)) {
        sounds.hitSound.play();
        trocarTela(telas.gameOver);
        return;
      }

      flappyBird.velo += flappyBird.grav;
      flappyBird.posY += flappyBird.velo;

      const caindo = Math.sqrt(flappyBird.posY) > 13.5;

      if (caindo) {
        sounds.caiuSound.play();
      }
    },

    movimentos: [
      { sX: 0, sY: 0 }, // asa pra cima
      { sX: 0, sY: 26 }, // asa no meio
      { sX: 0, sY: 52 }, // asa pra baixo
    ],

    frameAtual: 0,

    atualizaFrameAtual() {
      const telaGameOver = telaAtiva === telas.gameOver;
      if (!telaGameOver) {
        const intervaloDeFrames = 10;
        const passouOIntervalo = frames % intervaloDeFrames === 0;

        if (passouOIntervalo) {
          const baseDoIncremento = 1;
          const incremento = baseDoIncremento + flappyBird.frameAtual;
          const baseRepeticao = flappyBird.movimentos.length;
          flappyBird.frameAtual = incremento % baseRepeticao;
        }
      }
    },

    desenha() {
      flappyBird.atualizaFrameAtual();
      const { sX, sY } = flappyBird.movimentos[flappyBird.frameAtual];

      contexto.drawImage(
        sprites,
        sX,
        sY, // Posição x e y do sprite no arquivo fonte
        flappyBird.larg,
        flappyBird.alt, // Tamanho do recorte na sprite
        flappyBird.posX,
        flappyBird.posY, // posição no canvas onde o sprite vai ser desenhado
        flappyBird.larg,
        flappyBird.alt // Tamanho do sprite desenhado no canvas
      );
    },
  };
  return flappyBird;
}

export default criaPlayer;
