import { canvas, contexto, frames, telaAtiva, telas } from '../jogo.js';

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
			const intervaloDeFrames = 20;
			const passouOIntervalo = frames % intervaloDeFrames === 0;

			if (passouOIntervalo) {
				placar.pontos++;
			}
		},
	};
	return placar;
}
export default criaPlacar;
