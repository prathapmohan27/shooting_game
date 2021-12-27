const shoot = (function () {
  const start = document.querySelector('.submit');
  const main = document.querySelector('.main');
  const form = document.querySelector('.formContainer');

  function getPower() {
    const powers = [5, 15, 10, 20, 40, 50];
    let power = powers[Math.floor(Math.random() * powers.length)];
    return power;
  }

  let playerOneName;
  let playerTwoName;

  function getPlayerName() {
    playerOneName = document.getElementById('playerOneName').value;
    playerTwoName = document.getElementById('playerTwoName').value;
    if (!playerOneName || !playerTwoName) {
      alert('Would Please Fill Names');
      return;
    }
    main.classList.remove('unActive');
    // main.classList.add('active');
    form.classList.add('unActive');
    changeName(playerOneName, playerTwoName);
  }

  let i = 1;

  function changeName(p1, p2) {
    const playerOne = document.querySelector('.p1Name');
    const playerTwo = document.querySelector('.p2Name');
    playerOne.textContent = p1;
    playerTwo.textContent = p2;
    letsPlay(i);
  }

  let p1Power;
  let p2Power;
  let isP1 = true;
  let playerOneWon = 0;
  let playerTwoWon = 0;
  const status = document.querySelector('.status');
  const person1 = document.querySelector('.person1');
  const person2 = document.querySelector('.person2');
  const p1Health = document.querySelector('.p1Health');
  const p2Health = document.querySelector('.p2Health');
  const p1Score = document.querySelector('.p1Score');
  const p2Score = document.querySelector('.p2Score');

  function letsPlay(i) {
    let personOneHealth = 100;
    let personTwoHealth = 100;
    status.textContent = `Round ${i}`;

    person1.addEventListener('click', () => {
      if (isP1) {
        if (personTwoHealth > 0 && personOneHealth > 0) {
          p1Power = getPower();
          isP1 = false;
          personTwoHealth -= p1Power;
          status.textContent = `${playerTwoName} turn!`;
          if (personTwoHealth <= 0) {
            personTwoHealth = 0;
            playerOneWon += 1;
            p1Score.textContent = playerOneWon;
            status.textContent = `${playerTwoName} turn!`;
            checkWinner(playerOneWon, playerTwoWon);
          }
          p2Health.textContent = personTwoHealth;
        }
      }
    });
    person2.addEventListener('click', () => {
      if (!isP1) {
        if (personOneHealth > 0 && personTwoHealth > 0) {
          p2Power = getPower();
          isP1 = true;
          personOneHealth -= p2Power;
          status.textContent = `${playerOneName} turn!`;
          if (personOneHealth <= 0) {
            personOneHealth = 0;
            playerTwoWon += 1;
            p2Score.textContent = playerTwoWon;
            p1Health.textContent = personOneHealth;
            status.textContent = `${playerOneName} turn!`;
            checkWinner(playerOneWon, playerTwoWon);
          }
          p1Health.textContent = personOneHealth;
        }
      }
    });
  }

  function checkWinner(p1, p2) {
    p1Health.textContent = '100';
    p2Health.textContent = '100';
    if (p1 >= 3) {
      status.textContent = `${playerOneName} is won ${p1}`;
      return;
    }
    if (p2 >= 3) {
      status.textContent = `${playerTwoName} is won ${p2}`;
      return;
    }
    i += 1;
    letsPlay(i);
  }

  const restartButton = document.querySelector('#restart');

  function restart() {
    i = 1;
    isP1 = true;
    p1Health.textContent = '100';
    p2Health.textContent = '100';
    playerOneWon = 0;
    playerTwoWon = 0;
    p2Score.textContent = '0';
    p1Score.textContent = '0';
    letsPlay(i);
  }

  restartButton.addEventListener('click', restart);

  start.addEventListener('click', (e) => {
    e.preventDefault();
    getPlayerName();
  });
})();
