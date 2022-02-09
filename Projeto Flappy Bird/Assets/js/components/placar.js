import { canvas, contexto, frames, telaAtiva, telas } from '../jogo.js';

function criaPlacar() {
	const placar = {
		pontos: 0,

		desenha() {
			const telaGameOver = telaAtiva === telas.gameOver;
			let corTexto = 'white';
			if (telaGameOver) {
				corTexto = '#70c5ce00';
			}
			contexto.font = `35px "VT323"`;
			contexto.textAlign = `right`;
			contexto.fillStyle = corTexto;
			contexto.shadowColor = corTexto;
			contexto.fillText(`${placar.pontos}`, canvas.width - 10, 35);
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
