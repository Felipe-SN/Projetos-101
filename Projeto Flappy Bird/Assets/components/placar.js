import { canvas, contexto, frames } from '../jogo.js';

function criaPlacar() {
	const placar = {
		pontos: 0,

		desenha() {
			contexto.font = `35px "VT323"`;
			contexto.textAlign = `right`;
			contexto.fillStyle = `white`;
			contexto.fillText(`${placar.pontos}`, canvas.width - 10, 35);
		},

		update() {
			const intervaloDeFrames = 20;
			const passouOIntervalo = frames % intervaloDeFrames === 0;

			if (passouOIntervalo) {
				placar.pontos += 1;
			}
		},
	};
	return placar;
}
export default criaPlacar;
