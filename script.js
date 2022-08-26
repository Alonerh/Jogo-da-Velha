// Initial data

let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: 'o', c3: '',
};

let player = '';
let warning = '';
let playing = false;

reset()

// Events


document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach(item => { // Coloca evento de click em todos
    item.addEventListener('click', itemClick)
})




// Functions
function itemClick(event) {
    let item = event.target.getAttribute('data-item') // Pegando o atributo do item que apertei

    if (playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        tooglePlayer();
    }

    for (let i in square) {

    }
}
    function reset() {
        warning = '';

        let random = Math.floor(Math.random() * 2) // Gera um número aleatório entre 0 e 1
        player = (random === 0) ? 'x' : 'o';

        for (let i in square) { // Zera a tabela
            square[i] = '';
        }

        playing = true; // Inicia o jogo

        renderSquare();
        renderInfo();
    }

function renderSquare() {
    for (let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`)
        item.innerHTML = square[i]; // Se tiver vazio, fica vazio | Preenchido, fica preenchido
    }

    checkGame()

}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

    function tooglePlayer() {
        player = (player === 'x') ? 'o' : 'x';
        renderInfo();
    }

    function checkGame() {
        if (checkWinnerFor('x')) {
            warning = 'O "x" venceu!';
            playing = false;
        } else if (checkWinnerFor('o')) {
            warning = 'O "o" venceu!';
            playing = false;
        } else if (isFull()) {
            warning = 'Empate!';
            playing = false;
        }
    }
        function checkWinnerFor(player) {
            let possibilities = [
                'a1,a2,a3',
                'b1,b2,b3',
                'c1,c2,c3',

                'a1,b1,c1',
                'a2,b2,c2',
                'a3,b3,c3',

                'a1,b2,c3',
                'a3,b2,c1'
            ];

            for (let w in possibilities) {
                let pArray = possibilities[w].split(','); // Array com a1, a2, a3...
                let hasWon = pArray.every(option=>square[option] === player);

                if (hasWon) {
                    return true;
                }
            }

            return false;

        }
        function isFull() {
            for (let i in square) {
                if (square[i] === '') {
                    return false;
                }
            }
            return true;
        }

/*
        - (.every(()=>{})) Cria uma condição e verifica se foi satisfeita em todos os itens do Array;
*/