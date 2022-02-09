import { canvas, contexto, sprites } from '../jogo.js';

// [Chão do cenario]
function criaChao() {
	const chao = {
		srcX: 0,
		srcY: 610,
		larg: 224,
		alt: 112,
		posX: 0,
		posY: canvas.height - 112,

		update() {
			const movimentoChao = 1;
			const repetirEm = chao.larg / 2;
			const movimentar = chao.posX - movimentoChao;
			chao.posX = movimentar % repetirEm;
		},

		desenha() {
			contexto.drawImage(
				sprites,
				chao.srcX,
				chao.srcY, // Posição x e y do sprite no arquivo fonte
				chao.larg,
				chao.alt, // Tamanho do recorte na sprite
				chao.posX,
				chao.posY, // posição no canvas onde o sprite vai ser desenhado
				chao.larg,
				chao.alt // Tamanho do sprite desenhado no canvas
			);

			contexto.drawImage(
				sprites,
				chao.srcX,
				chao.srcY, // Posição x e y do sprite no arquivo fonte
				chao.larg,
				chao.alt, // Tamanho do recorte na sprite
				chao.posX + chao.larg,
				chao.posY, // posição no canvas onde o sprite vai ser desenhado
				chao.larg,
				chao.alt // Tamanho do sprite desenhado no canvas
			);
		},
	};
	return chao;
}

export default criaChao;
