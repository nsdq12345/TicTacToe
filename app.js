class TTT {

    constructor() {
        this.gameBoard = [['', '', ''],['','',''],['','','']];
        this.currentTurn = 'X';
        this.gameOver = false;
        this.outcome = '';
        this.ogamesWon = 0;
        this.xgamesWon = 0;
        this.oplayerName = 'O';
        this.xplayerName = 'X';
        this.enableRotate = false;
        this.rotateCount = 0;
        this.lastWinner;
        this.render();

        //Set onclick listeners
        var gameTable = document.getElementById('gametable');
        gameTable.addEventListener('click', (event)=>{this.putPiece(event.target.id)});
        var resetButton = document.getElementById('reset');
        resetButton.addEventListener('click', ()=>{this.reset()});
        var nameButton = document.getElementById('nameButton');
        nameButton.addEventListener('click', () => {this.setName()})
        var hardModeButton = document.getElementById('hardModeButton');
        hardModeButton.addEventListener('click', () => {this.setHardMode()})
    }

    setHardMode() {
        this.enableRotate = !this.enableRotate;
        if (!this.enableRotate) {
            this.rotateCount = 0;
        }

        this.render();
    }

    setName = function() {
        var targetPiece = document.getElementById('choosePiece').value;
        var inputString = document.getElementById('nameInput').value;
        
        if (inputString != '') {
            if (targetPiece === 'X') {
                this.xplayerName = inputString;
            } else {
                this.oplayerName = inputString;
            }
        }

        this.render();
    }


    putPiece(position) {
        if (!this.gameOver) {

            var y = position[0];
            var x = position[1];

            if (this.gameBoard[y][x] === '') {
                this.gameBoard[y][x] = this.currentTurn;
                this.toggleTurn();
            }

            if (this.checkForWin()) {
                this.gameOver = true;
                this.outcome = 'WIN';
                this.toggleTurn();

                if (this.currentTurn === 'O') {
                    this.ogamesWon++;
                } else {
                    this.xgamesWon++;
                }

                this.lastWinner = this.currentTurn;
                console.log(this.currentTurn + ' wins!!!');
            } else if (this.checkForTie()) {
                this.gameOver = true;
                this.outcome = 'TIE';
                this.toggleTurn();
                console.log('TIE, NO WINNERS');
            }

            if (this.enableRotate) {
                if (this.rotateCount === 3) {
                    this.rotateCount = 0;
                } else {
                    this.rotateCount++;
                }
            }

            this.render();
        }
    }

    reset() {
        this.gameBoard = [['', '', ''],['','',''],['','','']];
        this.currentTurn = this.lastWinner || 'X';
        this.gameOver = false;
        this.render();
    }

    toggleTurn() {
        if (this.currentTurn === 'X') {
            this.currentTurn = 'O';
        } else {
            this.currentTurn = 'X';
        }
    }

    getCurrentName() {
        if (this.currentTurn === 'O') {
            return this.oplayerName;
        } else {
            return this.xplayerName;
        }
    }

    checkForWin() {
        //Check horizontal
        for (var y = 0; y < this.gameBoard.length; y++) {
            var set = [];
            for (var x = 0; x < this.gameBoard[y].length; x++) {
                set.push(this.gameBoard[y][x]);
            }
            if (set.every((current) => {return (current === set[0] && current !== '');})) {
                return true;
            }
        }

        //Check vertical
        for (var x = 0; x < this.gameBoard.length; x++) {
            var set = [];
            for (var y = 0; y < this.gameBoard[x].length; y++) {
                set.push(this.gameBoard[y][x]);
            }
            if (set.every((current) => {return (current === set[0] && current !== '');})) {
                return true;
            }
        }

        //Check Major Diagonal
        var set = [];
        for (var x = 0; x < this.gameBoard.length; x++) {
            set.push(this.gameBoard[x][x]);
        }
        if (set.every((current) => {return (current === set[0] && current !== '');})) {
            return true;
        }

        //Check Minor Diagonal
        var set = [];
        for (var x = 0; x < this.gameBoard.length; x++) {
            set.push(this.gameBoard[x][this.gameBoard.length-1-x]);
        }
        if (set.every((current) => {return (current === set[0] && current !== '');})) {
            return true;
        }


        return false;
    }

    checkForTie() {

        for (var y = 0; y < this.gameBoard.length; y++) {
            for (var x = 0; x < this.gameBoard.length; x++) {
                if (this.gameBoard[y][x] === '') {
                    return false;
                }
            }
        }

        return true;
    }

    render = function() {
        //Update Current Turn
        var currentTurnElement = document.getElementById('currentTurn');
        currentTurnElement.innerHTML = this.currentTurn.toString().toUpperCase() + ' (Name: ' + this.getCurrentName() + ')';

        //Update Board
        for (var y = 0; y < this.gameBoard.length; y++) {
            for (var x = 0; x < this.gameBoard[y].length; x++) {
                var location = ''+ y + x;
                var currentElement = document.getElementById(location);
                currentElement.innerHTML = this.gameBoard[y][x];
            }
        }

        //Update Tally
        var currentElement = document.getElementById('tally');
        currentElement.innerHTML = "Current Score<br> O (Name: " + this.oplayerName + "): " + this.ogamesWon + "<br>X (Name: " + this.xplayerName + "): " + this.xgamesWon + "<br>";


        //Print results if needed
        if (this.gameOver) {
            if (this.outcome === 'TIE') {
                var currentElement = document.getElementById('results');
                currentElement.innerHTML = 'GAME OVER, TIE';
            } else {
                var currentElement = document.getElementById('results');
                currentElement.innerHTML = 'GAME OVER, ' + this.currentTurn.toString().toUpperCase() + ' WINS!!!';
            }
        } else {
            var currentElement = document.getElementById('results');
            currentElement.innerHTML = '';
        }

        //Rotate gametable if hardmode
        var currentElement = document.getElementById('gametable');
        currentElement.setAttribute('style', 'transform: rotate(' + (this.rotateCount * 90) + 'deg);');
    }
}

ttt = new TTT();
