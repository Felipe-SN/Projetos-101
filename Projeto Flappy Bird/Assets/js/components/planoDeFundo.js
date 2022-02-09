import { canvas, contexto, sprites } from '../jogo.js';

// [Plano de fundo do cenario]
function criaPlanoDeFundo() {
	const planoDeFundo = {
		srcX: 390,
		srcY: 0,
		larg: 275,
		alt: 204,
		posX: 0,
		posY: canvas.height - 204,

		update() {
			const movimentoBG = 1;
			const repetirEm = planoDeFundo.larg / 2;
			const movimentar = planoDeFundo.posX - movimentoBG;
			planoDeFundo.posX = movimentar % repetirEm;
		},

		desenha() {
			contexto.fillStyle = `#70c5ce`;
			contexto.fillRect(0, 0, canvas.width, canvas.height);

			contexto.drawImage(
				sprites,
				planoDeFundo.srcX,
				planoDeFundo.srcY, // Posição x e y do sprite no arquivo fonte
				planoDeFundo.larg,
				planoDeFundo.alt, // Tamanho do recorte na sprite
				planoDeFundo.posX,
				planoDeFundo.posY, // posição no canvas onde o sprite vai ser desenhado
				planoDeFundo.larg,
				planoDeFundo.alt // Tamanho do sprite desenhado no canvas
			);

			contexto.drawImage(
				sprites,
				planoDeFundo.srcX,
				planoDeFundo.srcY, // Posição x e y do sprite no arquivo fonte
				planoDeFundo.larg,
				planoDeFundo.alt, // Tamanho do recorte na sprite
				planoDeFundo.posX + planoDeFundo.larg,
				planoDeFundo.posY, // posição no canvas onde o sprite vai ser desenhado
				planoDeFundo.larg,
				planoDeFundo.alt // Tamanho do sprite desenhado no canvas
			);
		},
	};
	return planoDeFundo;
}

export default criaPlanoDeFundo;
