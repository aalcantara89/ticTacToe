const Play = (() => {
    let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

    const O_TEXT = "O";
    const X_TEXT = "X";
    let currentPlayer = X_TEXT;
    let restartBtn = document.getElementById('restartBtn');
    let playerText = document.getElementById('playerText');    
    let boxes = Array.from(document.getElementsByClassName('box'));
    let spaces = Array(9).fill(null);
    let nameSubmit = document.getElementById('nameSubmit');
    const nameArea = document.getElementById('playerDisplay');
    const playerNames = document.getElementById('playerNames');
    const inputs = document.querySelectorAll('input[type=text]');
    restartBtn.addEventListener('click', restart);
    boxes.forEach(box => box.addEventListener('click', boxClicked));

    
    const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    ]
    function clearInputs() {
        var allInputs = document.querySelectorAll('input[type=text]');
        allInputs.forEach(singleInput => singleInput.value = '');
    }
    function resetNames() {
        nameArea.innerHTML = '';
    }
    function displayNameNode() {
        if (playerNames.style.display = "none") {
            playerNames.style.display = "block";
        } else {
            playerNames.style.display = "none";
        }
    }
    function removeNameNode() {
        if (playerNames.style.display = "block") {
            playerNames.style.display = "none";
          } else {
            playerNames.style.display === "block"
          }
        return 
    }

    function displayNames() {
        let xName = getPlayerX();
        let oName = getPlayerO();
        let namesMessage = `${xName} VS ${oName}`;               
        return namesMessage
    }

    function getPlayerX() {
        let xName = document.getElementById('x').value;
        return xName
    }

    function getPlayerO() {
        let oName = document.getElementById('o').value;
        return oName
    }

    function playerHasWon() {
        for (const condition of winningCombos) {
            let [a, b, c] = condition

            if(spaces[a] && (spaces[a] == spaces[b]) && (spaces[a] == spaces[c])) {
                return [a, b, c]
            }
        }
        return false
    }
    
    function restart() {
        spaces.fill(null)

        boxes.forEach(box => {
            box.innerText = ''
            box.style.backgroundColor = ''
        })

        playerText = 'Tic Tac Toe'

        currentPlayer = X_TEXT
        resetNames();
        displayNameNode();
        clearInputs();
    }
    function boxClicked(e) {
        const id = e.target.id
        if (!spaces[id]) {
            spaces[id] = currentPlayer
            e.target.innerText = currentPlayer
    
            if (playerHasWon() !==false){
                if (currentPlayer == 'X') {
                    currentPlayer = getPlayerX();
                } else {
                    currentPlayer = getPlayerO();
                }
                playerText = `${currentPlayer} has won!`
                let winningBlocks = playerHasWon()
                winningBlocks.map(box => boxes[box].style.backgroundColor=winnerIndicator);

                alert(playerText);
                return
            } 
            if (playerHasWon() ==false && !spaces.includes(null)) {
               let x =  alert(`It's a tie!!!`);
               return x
            }
            currentPlayer = currentPlayer == X_TEXT ? O_TEXT: X_TEXT
        }
    }
    document.getElementById('nameSubmit').addEventListener("click", function(event){
        event.preventDefault()
    });

    nameSubmit.addEventListener('click', () => {
        resetNames();
        const nameArea = document.getElementById('playerDisplay');
        const vs = document.createElement('p');
        vs.textContent = displayNames();
        nameArea.appendChild(vs);
        removeNameNode();
        
    })
    return {
        boxClicked, restart, playerHasWon, winningCombos
    }
})();


