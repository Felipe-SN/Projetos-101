import {
  canvas,
  contexto,
  frames,
  globais,
  sounds,
  sprites,
  telas,
  trocarTela,
} from '../jogo.js';

/// [parâmetros e funções usadas na criação dinâmica de canos na tela]
function criaCanos() {
  const canos = {
    larg: 52,
    alt: 400,
    chao: {
      sX: 0,
      sY: 169,
    },
    ceu: {
      sX: 52,
      sY: 169,
    },
    espaco: 80,
    desenha() {
      canos.pares.forEach(function (par) {
        const yRandom = par.y;
        const espacamentoCanos = 90;

        const canoCeuX = par.x;
        const canoCeuY = yRandom;

        // [Cano do Céu]
        contexto.drawImage(
          sprites,
          canos.ceu.sX,
          canos.ceu.sY,
          canos.larg,
          canos.alt,
          canoCeuX,
          canoCeuY,
          canos.larg,
          canos.alt
        );

        const canoChaoX = par.x;
        const canoChaoY = canos.alt + espacamentoCanos + yRandom;
        // [Cano do Chão]
        contexto.drawImage(
          sprites,
          canos.chao.sX,
          canos.chao.sY,
          canos.larg,
          canos.alt,
          canoChaoX,
          canoChaoY,
          canos.larg,
          canos.alt
        );

        par.canoCeu = {
          x: canoCeuX,
          y: canos.alt + canoCeuY,
        };
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY,
        };
      });
    },

    temColisaoComPlayer(par) {
      const cabecaDoFlappy = globais.flappyBird.posY;
      const peDoFlappy = globais.flappyBird.posY + globais.flappyBird.alt;
      const bicoDoFlappy = globais.flappyBird.posX + globais.flappyBird.larg;

      if (bicoDoFlappy >= par.x) {
        if (cabecaDoFlappy <= par.canoCeu.y) {
          return true;
        }

        if (peDoFlappy >= par.canoChao.y) {
          return true;
        }
      }
      return false;
    },

    pares: [],
    update() {
      const passou100Frames = frames % 100 === 0;
      if (passou100Frames) {
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      }

      canos.pares.forEach(function (par) {
        par.x = par.x - 2;

        if (canos.temColisaoComPlayer(par)) {
          sounds.hitSound.play();
          trocarTela(telas.gameOver);
        }

        if (par.x + canos.larg <= 0) {
          canos.pares.shift();
        }
      });
    },
  };
  return canos;
}

export default criaCanos;
