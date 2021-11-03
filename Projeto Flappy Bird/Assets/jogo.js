console.log('[DevSoutinho] Flappy Bird');
console.log('Inscreva-se no canal :D https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA');

let frames = 0;
let medalhaAtual = 0;

const hitSound = new Audio();
hitSound.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

/// [parametros e funções usadas para criar o cenario]
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
	return planoDeFundo;
}

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
	return chao;
}

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
			if (colisao(flappyBird, globais.chao)) {
				hitSound.play();
				trocarTela(telas.gameOver);
				return;
			}

			flappyBird.velo += flappyBird.grav;
			flappyBird.posY += flappyBird.velo;
		},

		movimentos: [
			{ sX: 0, sY: 0, },  // asa pra cima
			{ sX: 0, sY: 26, }, // asa no meio 
			{ sX: 0, sY: 52, }, // asa pra baixo
		],

		frameAtual: 0,

		atualizaFrameAtual() {
			const intervaloDeFrames = 10;
			const passouOIntervalo = frames % intervaloDeFrames === 0;

			if (passouOIntervalo) {
				const baseDoIncremento = 1;
				const incremento = baseDoIncremento + flappyBird.frameAtual;
				const baseRepeticao = flappyBird.movimentos.length;
				flappyBird.frameAtual = incremento % baseRepeticao;
			}

		},

		desenha() {
			flappyBird.atualizaFrameAtual()
			const { sX, sY } = flappyBird.movimentos[flappyBird.frameAtual];

			contexto.drawImage(
				sprites,
				sX, sY, // Posição x e y do sprite no arquivo fonte
				flappyBird.larg, flappyBird.alt, // Tamanho do recorte na sprite
				flappyBird.posX, flappyBird.posY, // posição no canvas onde o sprite vai ser desenhado
				flappyBird.larg, flappyBird.alt, // Tamanho do sprite desenhado no canvas
			);
		}
	};
	return flappyBird;
}

/// [parametros e funções usadas na criação dinamica de canos na tela]
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
					canos.ceu.sX, canos.ceu.sY,
					canos.larg, canos.alt,
					canoCeuX, canoCeuY,
					canos.larg, canos.alt,
				)

				const canoChaoX = par.x;
				const canoChaoY = canos.alt + espacamentoCanos + yRandom;
				// [Cano do Chão]
				contexto.drawImage(
					sprites,
					canos.chao.sX, canos.chao.sY,
					canos.larg, canos.alt,
					canoChaoX, canoChaoY,
					canos.larg, canos.alt,
				)

				par.canoCeu = {
					x: canoCeuX,
					y: canos.alt + canoCeuY
				}
				par.canoChao = {
					x: canoChaoX,
					y: canoChaoY
				}
			})
		},

		temColisaoComPlayer(par) {
			const cabecaDoFlappy = globais.flappyBird.posY;
			const peDoFlappy = globais.flappyBird.posY + globais.flappyBird.alt;

			if ((globais.flappyBird.posX + globais.flappyBird.larg) >= par.x) {
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
					console.log(`Você Perdeu!`);
					hitSound.play();
					trocarTela(telas.gameOver);
				}

				if (par.x + canos.larg <= 0) {
					canos.pares.shift();
				}
			});
		}
	}
	return canos;
}

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
		}
	}
	return placar;
}

/// [parametros e funções usadas na tela de inicio do jogo, na mensagem "Get Ready"]
const getReady = {
	srcX: 134,
	srcY: 0,
	larg: 174,
	alt: 152,
	posX: (canvas.width / 2) - (174 / 2),
	posY: 50,

	desenha() {
		contexto.drawImage(
			sprites,
			getReady.srcX, getReady.srcY,
			getReady.larg, getReady.alt,
			getReady.posX, getReady.posY,
			getReady.larg, getReady.alt,
		);
	}
};

/// [parametros e funções usadas na tela de fim do jogo, na mensagem "Game Over"]
function criaGameOver() {
	const gameOver = {
		srcX: 134,
		srcY: 153,
		larg: 226,
		alt: 200,
		posX: (canvas.width / 2) - (226 / 2),
		posY: 50,

		medalhas: [
			{
				srcX: 0, srcY: 78,
				larg: 44, alt: 44,
			},
			{
				srcX: 48, srcY: 124,
				larg: 44, alt: 44,
			},
			{
				srcX: 48, srcY: 78,
				larg: 44, alt: 44,
			},
			{
				srcX: 0, srcY: 124,
				larg: 44, alt: 44,
			},
		],

		atualizaMedalha() {
			const intervaloDePontos = 50;
			const passouOIntervalo = globais.placar.pontos % intervaloDePontos === 0 && medalhaAtual < 3 && globais.placar.pontos !== 0;

			if (passouOIntervalo) {
				const baseDoIncremento = 1;
				const incremento = baseDoIncremento + medalhaAtual;
				medalhaAtual = incremento;
			}

		},

		desenha() {
			contexto.drawImage(
				sprites,
				gameOver.srcX, gameOver.srcY,
				gameOver.larg, gameOver.alt,
				gameOver.posX, gameOver.posY,
				gameOver.larg, gameOver.alt,
			)

			const {
				srcX, srcY,
				larg, alt,
			} = gameOver.medalhas[medalhaAtual];

			contexto.drawImage(
				sprites,
				srcX, srcY,
				larg, alt,
				72, canvas.height / 3.5,
				larg, alt,
			)
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
		}
	}
	return gameOver;
}

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
			globais.gameOver = criaGameOver();
			globais.planoDeFundo = criaPlanoDeFundo();
			globais.flappyBird = criaPlayer();
			globais.chao = criaChao();
			globais.canos = criaCanos();
		},

		desenha() {
			globais.planoDeFundo.desenha();
			globais.flappyBird.desenha();
			globais.chao.desenha();
			getReady.desenha();
		},

		click() {
			trocarTela(telas.gamePlay);
		},

		update() {
			globais.chao.update();
			globais.planoDeFundo.update();
		}

	},

	gamePlay: {
		iniciar() {
			globais.placar = criaPlacar();
		},

		desenha() {
			globais.planoDeFundo.desenha();
			globais.flappyBird.desenha();
			globais.canos.desenha();
			globais.chao.desenha();
			globais.placar.desenha();
		},

		click() {
			globais.flappyBird.sobe();
		},

		update() {
			globais.gameOver.update();
			globais.planoDeFundo.update();
			globais.canos.update();
			globais.chao.update();
			globais.flappyBird.update();
			globais.placar.update();
		}
	},

	gameOver: {
		iniciar() {
			globais.gameOver = criaGameOver();
		},

		desenha() {
			globais.gameOver.desenha();
		},

		update() {

		},

		click() {
			trocarTela(telas.inicio);
			globais.gameOver.click();
		}
	}
};

function loop() {
	telaAtiva.desenha();
	telaAtiva.update();

	frames += 1;

	requestAnimationFrame(loop);
}

window.addEventListener(`click`, function () {
	if (telaAtiva.click) {
		telaAtiva.click();
	}
});

trocarTela(telas.inicio);
loop();