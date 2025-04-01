export const PLAYER = 'O';
export const OPPONENT = 'X';
export const EMPTY = '_';

export function evaluate(board) {
    for (let row = 0; row < 3; row++) {
        if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            if (board[row][0] === PLAYER) return +10;
            if (board[row][0] === OPPONENT) return -10;
        }
    }

    for (let col = 0; col < 3; col++) {
        if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            if (board[0][col] === PLAYER) return +10;
            if (board[0][col] === OPPONENT) return -10;
        }
    }

    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        if (board[0][0] === PLAYER) return +10;
        if (board[0][0] === OPPONENT) return -10;
    }

    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        if (board[0][2] === PLAYER) return +10;
        if (board[0][2] === OPPONENT) return -10;
    }

    return 0;
}

export function minimax(board, depth, isMax, alpha, beta, moves) {
    const score = evaluate(board, moves);
    
    if (score === 10) return score - depth;
    if (score === -10) return score + depth;
    if (moves === 9) return 0;
    
    if (isMax) {
        let best = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === EMPTY) {
                    board[i][j] = PLAYER;
                    best = Math.max(best, minimax(board, depth + 1, !isMax, alpha, beta, moves + 1));
                    board[i][j] = EMPTY;
                    alpha = Math.max(alpha, best);
                    if (beta <= alpha) return best;
                }
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === EMPTY) {
                    board[i][j] = OPPONENT;
                    best = Math.min(best, minimax(board, depth + 1, !isMax, alpha, beta, moves + 1));
                    board[i][j] = EMPTY;
                    beta = Math.min(beta, best);
                    if (beta <= alpha) return best;
                }
            }
        }
        return best;
    }
}

export function findBestMove(board, moves) {
    let bestVal = -Infinity;
    let bestMove = { row: -1, col: -1 };
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === EMPTY) {
                board[i][j] = PLAYER;
                const moveVal = minimax(board, 0, false, -Infinity, Infinity, moves + 1);
                board[i][j] = EMPTY;
                
                if (moveVal > bestVal) {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    }
    
    return bestMove;
}

export function createBoardFromXorO(XorO) {
    const board = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]
    ];
    
    for (let i = 0; i < 9; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        if (XorO[i] === 'X') board[row][col] = OPPONENT;
        else if (XorO[i] === 'O') board[row][col] = PLAYER;
    }
    
    return board;
}