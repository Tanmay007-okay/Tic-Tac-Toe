let clickCount = 0;
let xWins = 0;
let oWins = 0;
let currentPlayer = 'X';
let startingPlayer = 'X';
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');

// Initialize Web Audio API context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function playSound(type) {
    if (!audioCtx) return;

    // Resume audio context if suspended (required by some browsers)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'x') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.1);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        oscillator.start(now);
        oscillator.stop(now + 0.1);
    } else if (type === 'o') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, now);
        oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.1);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        oscillator.start(now);
        oscillator.stop(now + 0.1);
    } else if (type === 'win') {
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(440, now); // A4
        oscillator.frequency.setValueAtTime(554.37, now + 0.1); // C#5
        oscillator.frequency.setValueAtTime(659.25, now + 0.2); // E5
        oscillator.frequency.setValueAtTime(880, now + 0.3); // A5
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.setValueAtTime(0.3, now + 0.3);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        oscillator.start(now);
        oscillator.stop(now + 0.8);
    } else if (type === 'draw') {
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(300, now);
        oscillator.frequency.linearRampToValueAtTime(100, now + 0.6);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        oscillator.start(now);
        oscillator.stop(now + 0.6);
    } else if (type === 'reset') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(200, now);
        oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.2);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        oscillator.start(now);
        oscillator.stop(now + 0.2);
    }
}

const WIN_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

function handleCellClick(event) {
    const clickedCell = event.currentTarget;

    if (clickedCell.querySelector('img')) { //Ignores clicks on cells that already have an image
        return;
    }

    const winnerMsg = document.getElementById('winnerMsg');
    if (winnerMsg && winnerMsg.textContent !== '') { // Ignores clicks if there's already a winner
        return;
    }

    clickCount += 1;
    const img = document.createElement('img');

    if (currentPlayer === 'X') {
        img.src = 'images/circle-xmark-regular-full.svg';
        playSound('x');
        currentPlayer = 'O';
    } else {
        img.src = 'images/circle-solid-full.svg';
        playSound('o');
        currentPlayer = 'X';
    }
    
    updateScoreboardGlow(currentPlayer);

    img.style.width = '70px';
    img.style.height = '70px';
    img.style.objectFit = 'contain';
    img.classList.add('pop-in');

    clickedCell.appendChild(img);
    checkWinner();
}

function checkWinner() {
    for (let i = 0; i < WIN_PATTERNS.length; i++) {
        const pattern = WIN_PATTERNS[i];
        const cell0 = cells[pattern[0]];
        const cell1 = cells[pattern[1]];
        const cell2 = cells[pattern[2]];

        const img0 = cell0.querySelector('img');
        const img1 = cell1.querySelector('img');
        const img2 = cell2.querySelector('img');

        if (img0 && img1 && img2 && img0.src === img1.src && img1.src === img2.src) {
            cell0.classList.add('win');
            cell1.classList.add('win');
            cell2.classList.add('win');

            let message = '';
            
            // Count moves to be safe depending on who started
            let xMoves = 0;
            let oMoves = 0;
            cells.forEach(c => {
                const i = c.querySelector('img');
                if (i) {
                    if (i.src.includes('xmark')) xMoves++;
                    else oMoves++;
                }
            });

            if (img0.src.includes('xmark')) {
                xWins++;
                document.getElementById('scoreX').textContent = xWins;
                message = `X wins in ${xMoves} moves!`;
                startingPlayer = 'X'; // Winner goes first next game
            } else {
                oWins++;
                document.getElementById('scoreO').textContent = oWins;
                message = `O wins in ${oMoves} moves!`;
                startingPlayer = 'O'; // Winner goes first next game
            }

            playSound('win');
            announceWinner(message);
            updateScoreboardGlow('none'); // Turn off glow when game over
            return;
        }
    }

    if (clickCount === 9) {
        playSound('draw');
        announceWinner('It\'s a draw!');
        updateScoreboardGlow('none'); // Turn off glow when game over
    }
}

function announceWinner(message) {
    let winnerMsg = document.getElementById('winnerMsg');
    if (!winnerMsg) {
        winnerMsg = document.createElement('p');
        winnerMsg.id = 'winnerMsg';
        const board = document.getElementById('board');
        board.parentNode.insertBefore(winnerMsg, board.nextSibling);
    }
    winnerMsg.textContent = message;
}

function updateScoreboardGlow(player) {
    const boxX = document.getElementById('scoreBoxX');
    const boxO = document.getElementById('scoreBoxO');
    
    if (player === 'X') {
        boxX.classList.add('active-player');
        boxO.classList.remove('active-player');
    } else if (player === 'O') {
        boxO.classList.add('active-player');
        boxX.classList.remove('active-player');
    } else {
        boxX.classList.remove('active-player');
        boxO.classList.remove('active-player');
    }
}

function resetGame() {
    playSound('reset');
    clickCount = 0;
    currentPlayer = startingPlayer;
    updateScoreboardGlow(currentPlayer);

    cells.forEach(cell => {
        const img = cell.querySelector('img');
        if (img) {
            cell.removeChild(img);
        }
        cell.classList.remove('win');
    });

    const winnerMsg = document.getElementById('winnerMsg');
    if (winnerMsg) {
        winnerMsg.textContent = '';
    }
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

// Initialize glow effect on page load
updateScoreboardGlow(currentPlayer);
