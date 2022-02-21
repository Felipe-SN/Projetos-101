import { telaAtiva } from '../jogo.js';

const comandos = (event) => {
  const tipoEvento = event.type;
  const code = event.code;
  const eventosAceitos = {
    keydown: () => tecla(event, code),
    click: () => click(),
  };

  eventosAceitos[tipoEvento]();
};

const tecla = (event, code) => {
  event.preventDefault();
  
  const teclasAceitas = {
    Space() {
      telaAtiva.click();
    },
    ArrowUp() {
      telaAtiva.click();
    },
  };

  const fazMover = teclasAceitas[code];

  if (fazMover) {
    fazMover();
  }
};

const click = () => {
  if (telaAtiva.click) {
    telaAtiva.click();
  }
};

export default comandos;
