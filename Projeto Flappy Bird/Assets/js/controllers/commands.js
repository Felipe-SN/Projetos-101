import { telaAtiva } from '../jogo.js';

const comandos = (event) => {
  const tecla = (event) => {
    const code = event.code;

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

  const tipoEvento = event.type;
  const tiposAceitos = {
    keydown: (event) => tecla(event),
    click: () => click(),
  };

  tipoEvento[tiposAceitos]();
};

export default comandos;
