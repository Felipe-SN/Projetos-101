import {
  canvas,
  contexto,
  sounds,
  globais,
  telaAtiva,
  telas,
} from '../jogo.js';

function criaPlacar() {
  const placar = {
    pontos: 0,

    desenha() {
      const telaGameOver = telaAtiva === telas.gameOver;
      if (!telaGameOver) {
        contexto.font = `35px "VT323"`;
        contexto.textAlign = `right`;
        contexto.fillStyle = 'white';
        contexto.fillText(`${placar.pontos}`, canvas.width - 10, 35);
      } else {
        contexto.clearRect(0, 0, canvas.width, canvas.height);
      }
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
        placar.pontos += 10;
        sounds.pontoSound.play(); 
      }
    },
  };
  return placar;
}
export default criaPlacar;
