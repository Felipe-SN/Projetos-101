import { canvas, contexto, globais, sprites } from '../jogo.js';

/// [parâmetros e funções usadas na tela de fim do jogo, na mensagem "Game Over"]
let medalhaAtual = 0;
function criaGameOver() {
  const gameOver = {
    srcX: 134,
    srcY: 153,
    larg: 226,
    alt: 200,
    posX: canvas.width / 2 - 226 / 2,
    posY: 50,

    medalhas: [
      {
        srcX: 0,
        srcY: 78,
        larg: 44,
        alt: 44,
      },
      {
        srcX: 48,
        srcY: 124,
        larg: 44,
        alt: 44,
      },
      {
        srcX: 48,
        srcY: 78,
        larg: 44,
        alt: 44,
      },
      {
        srcX: 0,
        srcY: 124,
        larg: 44,
        alt: 44,
      },
    ],

    atualizaMedalha() {
      const intervaloDePontos = 300;
      const passouOIntervalo =
        globais.placar.pontos % intervaloDePontos === 0 &&
        medalhaAtual < gameOver.medalhas.length - 1 &&
        globais.placar.pontos !== 0;

      if (passouOIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + medalhaAtual;
        medalhaAtual = incremento;
      }
    },

    desenha() {
      contexto.fillStyle = `rgba(0, 0, 0, 0.3)`;
      contexto.fillRect(0, 0, canvas.width, canvas.height);

      const { srcX, srcY, larg, alt } = gameOver.medalhas[medalhaAtual];
      //desenha moldura do placar da tela de game over
      contexto.drawImage(
        sprites,
        gameOver.srcX,
        gameOver.srcY,
        gameOver.larg,
        gameOver.alt,
        gameOver.posX,
        gameOver.posY,
        gameOver.larg,
        gameOver.alt
      );
      //desenha medalhas na tela de game over
      contexto.drawImage(
        sprites,
        srcX,
        srcY,
        larg,
        alt,
        72,
        canvas.height / 3.5,
        larg,
        alt
      );
      //desenha texto com a pontuação atual do jogador
      contexto.font = `35px "VT323"`;
      contexto.textAlign = `right`;
      contexto.shadowOffsetY = 2;
      contexto.shadowColor = '#f4eea5';
      contexto.fillStyle = `#d7a84c`;
      contexto.fillText(
        `${globais.placar.pontos}`,
        canvas.width - 65,
        canvas.height - 333
      );
    },

    update() {
      const bicoDoFlappy = globais.flappyBird.posX + globais.flappyBird.larg;
      const canoOculto = globais.canos.pares.length == 0;
      let passouOIntervalo = false;

      if (!canoOculto) {
        passouOIntervalo =
          bicoDoFlappy >= globais.canos.pares[0].x &&
          globais.canos.pares[0].x == 0;
      }

      if (passouOIntervalo) {
        gameOver.atualizaMedalha();
      }
    },

    click() {
      medalhaAtual = 0;
    },
  };
  return gameOver;
}

export default criaGameOver;
