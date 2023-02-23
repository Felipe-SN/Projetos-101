import criaCanos from './components/canos.js';
import criaChao from './components/chao.js';
import criaGameOver from './components/gameOver.js';
import criaPlacar from './components/placar.js';
import criaPlanoDeFundo from './components/planoDeFundo.js';
import criaPlayer from './components/player.js';
import criaTelaInicio from './components/inicio.js';
import comandos from './controllers/commands.js';

let frames = 0;

const sounds = {
  caiuSound: new Audio('./assets/sounds/caiu.wav'),

  hitSound: new Audio('./assets/sounds/hit.wav'),

  pontoSound: new Audio('./assets/sounds/ponto.wav'),

  puloSound: new Audio('./assets/sounds/pulo.wav'),
};

const sprites = new Image();
sprites.src = './assets/images/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

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
      globais.getReady = criaTelaInicio();
    },

    desenha() {
      globais.planoDeFundo.desenha();
      globais.flappyBird.desenha();
      globais.chao.desenha();
      globais.getReady.desenha();
    },

    click() {
      trocarTela(telas.gamePlay);
    },

    update() {
      globais.chao.update();
      globais.planoDeFundo.update();
    },
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
    },
  },

  gameOver: {
    iniciar() {
      globais.gameOver = criaGameOver();
    },

    desenha() {
      globais.placar.desenha();
      globais.planoDeFundo.desenha();
      globais.flappyBird.desenha();
      globais.canos.desenha();
      globais.chao.desenha();
      globais.gameOver.desenha();
    },

    update() {},

    click() {
      trocarTela(telas.inicio);
      globais.gameOver.click();
    },
  },
};

function loop() {
  telaAtiva.desenha();
  telaAtiva.update();

  frames += 1;

  requestAnimationFrame(loop);
}

window.addEventListener(`click`, comandos);

window.addEventListener('keydown', comandos);

trocarTela(telas.inicio);
loop();

export {
  canvas,
  contexto,
  globais,
  sounds,
  sprites,
  trocarTela,
  telas,
  frames,
  telaAtiva,
};
