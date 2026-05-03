let clickCount = 0;
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');

const WIN_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

function handleCellClick(event) {
    const clickedCell = event.currentTarget;

    // Ignore click if cell already has an image
    if (clickedCell.querySelector('img')) {
        return;
    }

    // Stop checking/clicking if there's already a winner (optional but good practice)
    const winnerMsg = document.getElementById('winnerMsg');
    if (winnerMsg && winnerMsg.textContent !== '') {
        return;
    }

    clickCount += 1;
    const img = document.createElement('img');

    if (clickCount % 2 !== 0) { // ODD -> X
        img.src = 'images/circle-xmark-regular-full.svg';
    } else { // EVEN -> O
        img.src = 'images/circle-solid-full.svg';
    }

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
            if (img0.src.includes('xmark')) {
                message = 'X wins!';
            } else {
                message = 'O wins!';
            }

            announceWinner(message);
            return;
        }
    }

    if (clickCount === 9) {
        announceWinner('It\'s a draw!');
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

function resetGame() {
    clickCount = 0;

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
