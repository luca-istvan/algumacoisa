const menuButton = document.querySelector('.menu-btn');
const navigation = document.querySelector('nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', isOpen);
    menuButton.textContent = isOpen ? '✕' : '☰';
  });
}

const cells = document.querySelectorAll('[data-celula]');
const status = document.querySelector('.status');
const resetButton = document.getElementById('reset-button');

if (cells.length && status && resetButton) {
  let currentPlayer = 'Malenia';
  let active = true;
  let board = ['', '', '', '', '', '', '', '', ''];

  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function playerImage(player) {
    const image = document.createElement('img');
    image.src = player === 'Malenia' ? 'img/malenia-jogo.jpg' : 'img/radahn-jogo.jpg';
    image.alt = player;
    return image;
  }

  function hasWon(player) {
    return winningLines.some(line =>
      line.every(index => board[index] === player)
    );
  }

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      if (!active || board[index] !== '') return;

      board[index] = currentPlayer;
      cell.appendChild(playerImage(currentPlayer));

      if (hasWon(currentPlayer)) {
        status.textContent = currentPlayer + ' venceu o duelo!';
        active = false;
      } else if (board.every(value => value !== '')) {
        status.textContent = 'O duelo terminou empatado!';
        active = false;
      } else {
        currentPlayer = currentPlayer === 'Malenia' ? 'Radahn' : 'Malenia';
        status.textContent = 'É a vez de ' + currentPlayer;
      }
    });
  });

  resetButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'Malenia';
    active = true;
    cells.forEach(cell => cell.replaceChildren());
    status.textContent = 'É a vez de Malenia';
  });
}

const characterImage = document.getElementById('character-image');
const characterName = document.getElementById('character-name');
const characterDescription = document.getElementById('character-description');
const previousButton = document.getElementById('prev-character');
const nextButton = document.getElementById('next-character');

if (characterImage && characterName && characterDescription && previousButton && nextButton) {
  const characters = [
    {
      name: 'Malenia',
      image: 'img/malenia-carrossel.jpg',
      description: 'A Lâmina de Miquella, uma das guerreiras mais temidas das Terras Intermédias.'
    },
    {
      name: 'Radahn',
      image: 'img/radahn-carrossel.jpg',
      description: 'O Flagelo Estelar, um semideus conhecido por sua força e por dominar a gravidade.'
    }
  ];

  let selected = 0;

  function showCharacter() {
    const character = characters[selected];
    characterImage.src = character.image;
    characterImage.alt = character.name;
    characterName.textContent = character.name;
    characterDescription.textContent = character.description;
  }

  previousButton.addEventListener('click', () => {
    selected = (selected - 1 + characters.length) % characters.length;
    showCharacter();
  });

  nextButton.addEventListener('click', () => {
    selected = (selected + 1) % characters.length;
    showCharacter();
  });
}
