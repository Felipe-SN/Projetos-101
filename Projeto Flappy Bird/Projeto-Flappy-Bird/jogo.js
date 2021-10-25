console.log('[DevSoutinho] Flappy Bird');
console.log('Inscreva-se no canal :D https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA');

const hitSound = new Audio();
hitSound.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

/// [parametros e funções usadas para criar o plano de fundo do cenario]
const planoDeFundo = {
	srcX: 390,
	srcY: 0,
	larg: 275,
	alt: 204,
	posX: 0,
	posY: canvas.height - 204,

	desenha() {

		contexto.fillStyle = `#70c5ce`;
		contexto.fillRect(0, 0, canvas.width, canvas.height);

		contexto.drawImage(
			sprites,
			planoDeFundo.srcX, planoDeFundo.srcY, // Posição x e y do sprite no arquivo fonte
			planoDeFundo.larg, planoDeFundo.alt, // Tamanho do recorte na sprite
			planoDeFundo.posX, planoDeFundo.posY, // posição no canvas onde o sprite vai ser desenhado
			planoDeFundo.larg, planoDeFundo.alt, // Tamanho do sprite desenhado no canvas
		);

		contexto.drawImage(
			sprites,
			planoDeFundo.srcX, planoDeFundo.srcY, // Posição x e y do sprite no arquivo fonte
			planoDeFundo.larg, planoDeFundo.alt, // Tamanho do recorte na sprite
			(planoDeFundo.posX + planoDeFundo.larg), planoDeFundo.posY, // posição no canvas onde o sprite vai ser desenhado
			planoDeFundo.larg, planoDeFundo.alt, // Tamanho do sprite desenhado no canvas
		);
	},

};

/// [parametros e funções usadas para criar o chão do cenario]
const chao = {
	srcX: 0,
	srcY: 610,
	larg: 224,
	alt: 112,
	posX: 0,
	posY: canvas.height - 112,

	desenha() {

		contexto.drawImage(
			sprites,
			chao.srcX, chao.srcY, // Posição x e y do sprite no arquivo fonte
			chao.larg, chao.alt, // Tamanho do recorte na sprite
			chao.posX, chao.posY, // posição no canvas onde o sprite vai ser desenhado
			chao.larg, chao.alt, // Tamanho do sprite desenhado no canvas
		);

		contexto.drawImage(
			sprites,
			chao.srcX, chao.srcY, // Posição x e y do sprite no arquivo fonte
			chao.larg, chao.alt, // Tamanho do recorte na sprite
			(chao.posX + chao.larg), chao.posY, // posição no canvas onde o sprite vai ser desenhado
			chao.larg, chao.alt, // Tamanho do sprite desenhado no canvas
		);
	},

};

/// [parametros e funções usadas no Flappy-Bird]

function colisao(flappyBird, chao) {
	if (flappyBird.posY >= chao.posY - flappyBird.alt) {
		return true
	} else {
		return false
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
			flappyBird.velo = - flappyBird.subir;
		},

		update() {
			if (colisao(flappyBird, chao)) {
				hitSound.play();
				setTimeout(() => {
					trocarTela(telas.inicio);
				}, 500);
				
				return;
			}

			flappyBird.velo += flappyBird.grav;
			flappyBird.posY += flappyBird.velo;
		},

		desenha() {

			contexto.drawImage(
				sprites,
				flappyBird.srcX, flappyBird.srcY, // Posição x e y do sprite no arquivo fonte
				flappyBird.larg, flappyBird.alt, // Tamanho do recorte na sprite
				flappyBird.posX, flappyBird.posY, // posição no canvas onde o sprite vai ser desenhado
				flappyBird.larg, flappyBird.alt, // Tamanho do sprite desenhado no canvas
			);
		}
	};

	return flappyBird;
}

/// [parametros e funções usadas na tela de inicio do jogo, na mensagem "Get Ready"]
const telaInicial = {
	srcX: 134,
	srcY: 0,
	larg: 174,
	alt: 152,
	posX: (canvas.width / 2) - (174 / 2),
	posY: 50,

	desenha() {
		contexto.drawImage(
			sprites,
			telaInicial.srcX, telaInicial.srcY,
			telaInicial.larg, telaInicial.alt,
			telaInicial.posX, telaInicial.posY,
			telaInicial.larg, telaInicial.alt,
		);
	}
};

//
// [Telas]
//

const globais = {};
let telaAtiva = {};
function trocarTela(novaTela) {
	telaAtiva = novaTela;

	if (telaAtiva.iniciar) {
		telaAtiva.iniciar();
	}
}

const telas = {
	inicio: {
		iniciar() {
			globais.flappyBird = criaPlayer();
		},

		desenha() {
			planoDeFundo.desenha();
			chao.desenha();
			globais.flappyBird.desenha();
			telaInicial.desenha();
		},

		click() {
			trocarTela(telas.gamePlay);
		},

		update() {

		}

	},

	gamePlay: {
		desenha() {
			planoDeFundo.desenha();
			chao.desenha();
			globais.flappyBird.desenha();
		},

		click() {
			globais.flappyBird.sobe();
		},

		update() {
			globais.flappyBird.update();
		}
	}
};

function loop() {
	telaAtiva.desenha();
	telaAtiva.update();

	requestAnimationFrame(loop);
}

window.addEventListener(`click`, function () {
	if (telaAtiva.click) {
		telaAtiva.click();
	}
});

trocarTela(telas.inicio);
loop();