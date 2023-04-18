///// variaveis e contstante geral
const mario = document.querySelector('.mario');
const lixo = document.querySelector('.lixo');
const tiro = document.querySelector('.tiro');
// sons
//const audioMusic = document.querySelector('#audio_game');
const sonPulo = document.querySelector('#son_pulo');
const sonExplosao = document.querySelector('#son_explosao');
const sonAndar = document.querySelector('#son_andar');
const sonBatida = document.querySelector('#son_batida');
const sonGameOver = document.querySelector('#son_gameover');

var marioAnda = 20;
var placar = document.querySelector('.pontos');
var posicao = false;
var tecla_anterior = null;
var pontos = 0;
var vidas = 3;
var nrTiros = 0;
var gameOver = false;
//var musica = false;
///imagens do mario
const img_mario = {
  img: ['./imagens/mario05.gif', './imagens/mario05.gif'],
};
// vetor imagens obstacula - nudar aleatorio
const obstaculos = {
  img: [
    './imagens/sapato-02.png',
    './imagens/lixo2.png',
    './imagens/sapato-01.png',
    './imagens/carro.png',
    './imagens/constucao.png',
    './imagens/livros.png',
    './imagens/tijolo.png',
    './imagens/caminhao.png',
  ],
  atualiza: function () {
    var i = [Math.floor(8 * Math.random())];
    return this.img[i];
  },
};
var game = document.querySelector('.game-board');
var botao = document.createElement('button');
var loop_jogo = '';

//////// funcao executanto interla em intela de tempo
clearInterval(loop_jogo);
var loop_jogo = setInterval(function () {
  start_jogo();
}, 200);

///// funcao jogos
function start_jogo() {
  var lixoPosition = lixo.offsetLeft;
  var marioPosition = mario.offsetLeft;
  var marioAltura = +window.getComputedStyle(mario).bottom.replace('px', '');
  var tiroPosition = tiro.offsetLeft;

  if (tiroPosition >= lixoPosition && lixoPosition > 120) {
    explosao(lixoPosition);
  } else {
    // atualiza imagem lixo quando atinge final tela a esquerda
    if (lixoPosition < 5) {
      atualizaLixo();
      lixo.style.width = '100px';
    }

    if (
      lixoPosition < marioPosition &&
      lixoPosition + 50 > marioPosition &&
      marioAltura < 80
    ) {
      vidas--;
      // verificar se tem vidas
      if (vidas == 0) {
        // fim de jogo
        fimjogo(2, marioPosition, lixoPosition);
      } else {
        placarVidas(vidas);
        fimjogo(1, marioPosition, lixoPosition);
        startJogo(3000);
      }
    } else {
      if (lixoPosition < marioPosition && lixoPosition + 50 > marioPosition) {
        pontos++;
      }
    }
  }
}

// aminacao explosão
function explosao(lixoPosition) {
  //usa img e classe do lixo e coloca gif da explosao
  lixo.style.animation = 'nome';
  lixo.style.left = '' + lixoPosition + 'px';
  lixo.style.width = '300px';
  lixo.style.height = '300px';
  lixo.src = './imagens/nuclear.gif';
  sonExplosao.play();
  //reestabelece aniamacao e volta ao jogos
  setTimeout(() => {
    // img classe lixo ao padrão original
    lixo.style.width = '80px';
    lixo.style.height = '80px';
    lixo.src = './imagens/sapato-02.png';
    //voltaAminacao();
    startJogo(0);
  }, 2500);
}

// reconfigura mario e lixo para inicio de paritda e chama funcao man
function startJogo(time) {
  setTimeout(() => {
    voltaAminacao();
  }, time);
}

// start novamente o jogo
function startJogo2() {
  gameOver = false;
  botao.remove();
  //placar de pontos
  pontos = 0;
  placar.textContent = pontos;
  //placar vidas tudo vermelho
  vidas = 3;
  nrvida1 = document.querySelector('#v1');
  nrvida1.style.color = 'red';
  nrvida2 = document.querySelector('#v2');
  nrvida2.style.color = 'red';
  nrvida3 = document.querySelector('#v3');
  nrvida3.style.color = 'red';
  // placar tiro tudo verde
  nrTiros = 0;
  nrtiro1 = document.querySelector('#t1');
  nrtiro1.style.color = 'green';
  nrtiro2 = document.querySelector('#t2');
  nrtiro2.style.color = 'green';
  nrtiro3 = document.querySelector('#t3');
  nrtiro3.style.color = 'green';
  nrtiro4 = document.querySelector('#t4');
  nrtiro4.style.color = 'green';
  nrtiro5 = document.querySelector('#t5');
  nrtiro5.style.color = 'green';

  console.log(nrTiros);
  console.log(vidas);

  voltaAminacao();
  ///man();
}

// funcao atualizar o lixo e  alterar randomicamente as imagens
// pensar em colcodar dentro obstaculos.atualiza()
function atualizaLixo() {
  lixo.src = obstaculos.atualiza();
  lixo.style.width = '80px';
  lixo.style.height = '80px';
}

// atualiza a tela numero de vidas
function placarVidas(npar) {
  if (npar == 2) {
    nrvida1 = document.querySelector('#v1');
    nrvida1.style.color = 'black';
  } else if (npar == 1) {
    nrvida2 = document.querySelector('#v2');
    nrvida2.style.color = 'black';
  } else if (npar == 0) {
    nrvida3 = document.querySelector('#v3');
    nrvida3.style.color = 'black';
  }
}

// atualiza a tela do numero de tiros/bombas disponvieis
function placarTiro(npar) {
  if (npar == 1) {
    nrtiro1 = document.querySelector('#t1');
    nrtiro1.style.color = 'black';
  } else if (npar == 2) {
    nrtiro2 = document.querySelector('#t2');
    nrtiro2.style.color = 'black';
  } else if (npar == 3) {
    nrtiro3 = document.querySelector('#t3');
    nrtiro3.style.color = 'black';
  } else if (npar == 4) {
    nrtiro4 = document.querySelector('#t4');
    nrtiro4.style.color = 'black';
  } else if (npar == 5) {
    nrtiro5 = document.querySelector('#t5');
    nrtiro5.style.color = 'black';
  }
}

// termina jogo sendo 1 para acerto lixo e 2 para finalizaçao mesmo
function fimjogo(npar, lixoPosition, marioPosition) {
  // para as animacao
  paraAnimacao(lixoPosition, marioPosition);
  if (npar == 1) {
    sonBatida.play();
  }
  // se for final de jogo gameover
  if (npar == 2) {
    sonGameOver.play();
    mario.style.width = '130px';
    //////clearInterval(loop_jogo);
    ///// como temo poder reinicializar o jogo no limpa tempo
    //// do setInverval
    botaoInit();
    // colocar botas restart do jogo
    gameOver = true;
  }
}

// butao inicializar jogo
function botaoInit() {
  botao.style.width = '250px';
  botao.style.height = '250px';
  botao.style.background = 'red';
  botao.style.color = 'white';
  botao.style.border = '1px solid black';
  botao.style.borderRadius = '50%';
  botao.style.left = '40%';
  botao.style.top = '30%';
  botao.style.position = 'absolute';
  botao.style.padding = '15px';
  botao.style.fontSize = '40px';
  botao.style.fontWeight = '800';
  botao.style.cursor = 'pointer';
  botao.style.textShadow = 'black 0.1em 0.1em 0.2em';

  botao.style.boxShadow = '15px 15px 10px gray';
  botao.textContent = 'Start Game';
  game.appendChild(botao);

  botao.onclick = startJogo2;
}

// para animaçao do mario e lixo colocando mario abatido (gif)
function paraAnimacao(lixoPosition, marioPosition) {
  lixo.style.animation = 'nome';
  lixo.style.left = '' + lixoPosition + 'px';
  mario.style.left = '' + (marioPosition - 30) + 'px';
  mario.src = './imagens/mario-fim.gif';
  mario.style.width = '90px';
}

// volta aminacao elementos posicionamentos
function voltaAminacao() {
  lixo.style.removeProperty('left');
  lixo.style.animation = 'lixo-animation 5.5s infinite linear';
  mario.src = img_mario.img[0];
  mario.style.width = '85px';
}

////// funcoes das teclas //////////////////////////////////////////
// mario pula
const jump = () => {
  mario.classList.add('jump');
  sonPulo.play();
  setTimeout(() => {
    mario.classList.remove('jump');
  }, 900);
};

// mario tiro
function addTiro() {
  tiro.classList.add('dispara_tiro');
  setTimeout(() => {
    tiro.classList.remove('dispara_tiro');
  }, 1000);
}

// mario movimenta
function marioMovimenta(nPar) {
  // muda rotacao mario
  if (nPar == 1) {
    mario.style.transform = 'rotateY(180deg)';
  } else {
    mario.style.transform = 'rotateY(0deg)';
  }
  //  nPar igual 0 movto direita igual 1 movto esquerda
  var indice_mario = nPar;
  soma = 5;
  //posicao = false;
  // verifica direita ou esqueda posicao da tela
  if (nPar == 0) {
    if (marioAnda > innerWidth - 160) {
      soma = 0;
      posicao = true;
    }
  } else {
    soma = -5;
    if (marioAnda < 30) {
      soma = 0;
      posicao = true;
    }
  }
  if (posicao) {
    mario.src = img_mario.img[indice_mario];
    mario.style.width = img_mario.width;
    mario.style.bottom = img_mario.bottom;
  }
  marioAnda = marioAnda + soma;
  mario.style.left = '' + marioAnda + 'px';
}

// funcoes telcas
function teclasJogo(tecla) {
  var soma = 0;
  // guarda a tecla anterior e atual
  if (tecla == tecla_anterior) {
    posicao = false;
  } else {
    posicao = true;
    tecla_anterior = tecla;
  }
  if (!gameOver) {
    placar.textContent = pontos;

    switch (tecla) {
      // tecla seta para cima - pular
      case 38:
        jump();
        break;

      // barra de espacao atira
      case 32:
        if (nrTiros < 5) {
          addTiro();
          nrTiros++;
          placarTiro(nrTiros);
        }
        break;

      //mario anda direita
      case 39:
        sonAndar.play();
        marioMovimenta(0);
        break;

      //mario anda esquerda
      case 37:
        sonAndar.play();
        marioMovimenta(1);
        break;
    }
  }
}

// captura evento teclas
function man() {
  document.addEventListener('keydown', function (e) {
    e = e || window.event;
    var code = e.keyCode;
    //var code = e.which || e.keyCode;
    if (tecla_anterior == null) {
      tecla_anterior = code;
    }
    teclasJogo(code);
  });
}

/*  inicio do programa  */
//
man();
////////////////////////////
