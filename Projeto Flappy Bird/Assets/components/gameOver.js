import { canvas, contexto, globais, sprites, frames } from '../jogo.js';

/// [parametros e funções usadas na tela de fim do jogo, na mensagem "Game Over"]
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
			const intervaloDePontos = 50;
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
			const { srcX, srcY, larg, alt } = gameOver.medalhas[medalhaAtual];

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
		},

		update() {
			const intervaloDeFrames = 20;
			const passouOIntervalo = frames % intervaloDeFrames === 0;

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
