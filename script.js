var fetchWordsLocal = localStorage.getItem('gameWords');
var words = JSON.parse(fetchWordsLocal) || ['hangman'];
var randomNumber = Math.floor(Math.random() * words.length);
var randomWord = words[randomNumber];
var attemptsLeft = 6;
var listOfInputs = '';
var gameIsRuning = false;
var hangman = -1;
var numCharacterInWord = 0;
var samoglasnici = ['a', 'e', 'i', 'o', 'u'];
var suglasnici = ['b', 'c', 'č', 'ć', 'd', 'dž', 'đ', 'f', 'g', 'h', 'j', 'k', 'l', 'lj', 'm', 'n', 'nj', 'p', 'r', 's', 'š', 't', 'v', 'z', 'ž'];
var enteredCharacters = [];
var gameScores = {
     score: 0,
     scoreCurrentWord: 0,
     listOfScoresByWords: [],
     completedWords: []
};
var profileNames = [];
var profileNamesObjects = [];

var gamesPlayed = 0;
var customName;

var startTimeCurrentGame;
var endTimeCurrentGame;
var totalTimeCurrentGame;

var completedWords = [];


document.querySelector('#btn-play--js').style.display = 'none';

document.querySelector('.btn-start').addEventListener('click', function() {
     if (gameIsRuning === false) {
          startTimeCurrentGame = new Date().getTime();

          gameIsRuning = true;

          gamesPlayed++;

          document.querySelector('.hangman__hangman-0').style.display = 'none';
          document.querySelector('.hangman__hangman-1').style.display = 'none';
          document.querySelector('.hangman__hangman-2').style.display = 'none';
          document.querySelector('.hangman__hangman-3').style.display = 'none';
          document.querySelector('.hangman__hangman-4').style.display = 'none';
          document.querySelector('.hangman__hangman-5').style.display = 'none';
          document.querySelector('.attemps-left__number').innerHTML = attemptsLeft;
          document.querySelector('.attemps-left__number').style.display = 'block';
          document.querySelector('.main-letter').style.display = 'inline-block';
          document.querySelector('.main-letter-title').style.display = 'inline-block';

          for (var i = 0; i < randomWord.length; i++) {
               listOfInputs += '<input class="letters letter-' + i + '" type="text" disabled/>';
          }

          document.querySelector('.letters-container').innerHTML = listOfInputs;
     }
});

document.querySelector('.main-letter').addEventListener('change', function() {
     if (attemptsLeft > 0) {
          if (words.length > 0) {
               var randomWordLowerCase = randomWord.toLowerCase();
               var characterInRandomWord = randomWordLowerCase.split(this.value.toLowerCase());
               var containsNumber = characterInRandomWord.length - 1;
               var enteredCharacter = this.value.toLowerCase();
               var isEntered = enteredCharacters.indexOf(this.value.toLowerCase()) > -1;

               // Check if player forgot to enter the character
               if (this.value === '') {
                    alert('You forgot to enter a letter!');
                    return;
               }

               // Check if player already entered this character
               if (isEntered) {
                    alert('You already entered this character! Try another one.');
                    return;
               }

               enteredCharacters.push(this.value.toLowerCase());

               if (randomWord.toLowerCase().includes(enteredCharacter)) {

                    for (var i = 0; i < randomWord.length; i++) {
                         if (enteredCharacter === randomWord.charAt(i).toLowerCase()) {
                              document.querySelector('.letter-' + i).value = this.value.toUpperCase();
                         }
                    }

                    // samoglasnici.indexOf(enteredCharacter) > -1
                    if (samoglasnici.indexOf(enteredCharacter) > -1) {
                         gameScores.score += 1;
                         //alert(score);
                    }

                    if (suglasnici.indexOf(enteredCharacter) > -1) {
                         gameScores.score += 2;
                         //alert(score);
                    }

                    document.querySelector('.score__amount').innerHTML = gameScores.score;

                    if (containsNumber === 1) {
                         alert('This word contains ' + this.value.toUpperCase() + ' character once.');
                         numCharacterInWord++;
                    } else {
                         alert('This word contains ' + this.value.toUpperCase() + ' character ' + containsNumber + ' times.');
                         numCharacterInWord += containsNumber;
                    }

                    if (numCharacterInWord === randomWord.length) {
                         numCharacterInWord = 0;
                         enteredCharacters = [];
                         gameScores.completedWords.push(randomWord);

                         if (gameScores.listOfScoresByWords.length === 0) {
                              gameScores.scoreCurrentWord = gameScores.score;
                              gameScores.listOfScoresByWords.push(gameScores.scoreCurrentWord);
                         } else {
                              gameScores.scoreCurrentWord = gameScores.score - gameScores.listOfScoresByWords[gameScores.listOfScoresByWords.length - 1];
                              gameScores.listOfScoresByWords.push(gameScores.scoreCurrentWord);
                         }

                         if (words.length > 2) {
                              alert('Congrats! You completed this word! Proceed to the next round.');
                              completedWords.push(randomWord);
                              newRound();
                         } else if (words.length > 1) {
                              alert('Proceed to the last round!');
                              completedWords.push(randomWord);
                              lastRound();
                         } else {
                              words.splice(randomNumber, 1);
                              endTimeCurrentGame = new Date().getTime();
                              totalTimeCurrentGame = endTimeCurrentGame - startTimeCurrentGame;
                              alert('Congratulations! You guessed all the words. You won the game! Your time for completing the game is ' + timeToMinutes(totalTimeCurrentGame) + '.');
                              completedWords.push(randomWord);
                            updateUserLocalStorage(customName);

                         }
                    }

               } else {
                    alert('Wrong! There is no such letter.');
                    gameScores.score -= 1.5;
                    document.querySelector('.score__amount').innerHTML = gameScores.score;
                    attemptsLeft--;
                    hangman++;
                    document.querySelector('.attemps-left__number').innerHTML = attemptsLeft;
                    document.querySelector('.hangman__hangman-' + hangman).style.display = 'block';
               }
          } else {
               alert('You completed the game. Your time for completing the game is ' + timeToMinutes(totalTimeCurrentGame) + ' .Refresh the page if you want to start a new one.');
          }
     } else {
        endTimeCurrentGame = new Date().getTime();
        totalTimeCurrentGame = endTimeCurrentGame - startTimeCurrentGame;
        alert('You run out of attempts. Game Over!');
        alert('Your score is ' + gameScores.score);
        alert('Your time for completing the game is ' + timeToMinutes(totalTimeCurrentGame) + '.');
        updateUserLocalStorage(customName);
     }
});

document.querySelector('#btn-play--js').addEventListener('click', function() {
     customName = document.querySelector('#custom-name--js').value.toUpperCase();

     if (customName === '') {
          alert('You need to enter your name in order to play the Hangman game.');
          return;
     }

      if (!(words.length < 1)) {
           document.querySelector('.words-wrapper').style.display = 'none';
           document.querySelector('.wrapper').style.display = 'block';
           document.querySelector('.score-wrapper').style.display = 'block';
      } else {
           alert('There are no words in the Hangman Game, add some.');
      }
});

document.querySelector('#btn-add-name--js').addEventListener('click', function() {
    var customNameToLower = document.querySelector('#custom-name--js').value.toLowerCase();
    var customNameToUpper = document.querySelector('#custom-name--js').value.toUpperCase();
    if (!(customNameToUpper === '')) {
        if (localStorage.getItem(customNameToUpper) === null) {
            var player = {
                name: customNameToLower,
                gameCounter: 0,
                games: [],
                totalScore: 0,
                timePlayed: 0
            };
            var toString = JSON.stringify(player);
            localStorage.setItem(customNameToUpper, toString);
            alert('Thank you for adding your profile name!');
            document.querySelector('#btn-play--js').style.display = 'inline-block';
        } else {
            alert('Your profile is already in the game! You will continue from where you left off.');
            document.querySelector('#btn-play--js').style.display = 'inline-block';
        }
    } else {
         alert('You forgot to enter the name!');
    }
});

document.querySelector('#btn-add-word--js').addEventListener('click', function() {
    var customWord = document.querySelector('#custom-words--js').value.toLowerCase();
    if (customWord !== '') {
         // Update words in array of words
         if (!(words.indexOf(customWord) > -1)) {
              words.push(customWord);
              //alert('Awesome! Your word has been added.');
         } else {
              alert('The Hangman Game already contains this word. Try different word.');
         }
         // Update words in localStorage
         //pushWordsToLocal(customWord);
         pushToLocalStorage('gameWords', words, customWord);
    } else {
         alert('You can\'t add empty string! Enter some word.');
    }
});

function pushToLocalStorage(key, arr, item) {
    if (localStorage.getItem(key) === null) {
        var toString = JSON.stringify(arr);
        localStorage.setItem(key, toString);
    } else {
        var retriveData = localStorage.getItem(key);
        var toArray = JSON.parse(retriveData);

        if (toArray.indexOf(item) > -1) {
            alert('This word is already in local storage!');
        } else {
            toArray.push(item);
            localStorage.setItem(key, JSON.stringify(toArray));
        }
    }
}

function updateUserLocalStorage(key) {
    var retriveData = localStorage.getItem(key);
    var toObject = JSON.parse(retriveData);
    var newGame = {};

    newGame.name = 'Game ' + toObject.gameCounter;
    newGame.words = completedWords;
    newGame.score = gameScores.score;
    newGame.time = totalTimeCurrentGame;

    toObject.games.push(newGame);
    toObject.gameCounter++;

    toObject.totalScore += (gameScores.score);
    toObject.timePlayed += totalTimeCurrentGame;
    localStorage.setItem(key, JSON.stringify(toObject));
}

function generateWord() {
     randomNumber = Math.floor(Math.random() * words.length);
     randomWord = words[randomNumber];

     if (words.length != 0) {
          listOfInputs = '';
          document.querySelector('.letters-container').innerHTML = listOfInputs;

          for (var i = 0; i < randomWord.length; i++) {
               listOfInputs += '<input class="letters letter-' + i + '" type="text" disabled/>';
          }

          document.querySelector('.letters-container').innerHTML = listOfInputs;

     } else {
          alert('You run out of words!');
     }
}

function newRound() {
     words.splice(randomNumber, 1);
     generateWord();
}

function lastRound() {
     alert('Welcome to the last round!');
     words.splice(randomNumber, 1);
     generateWord();
}

function createProfileForStorage() {
     var enteredName = document.querySelector('#custom-name--js').value.toLowerCase();
     var player = new Player(enteredName, gamesPlayed, gameScores.score);
}

function timeToMinutes(millis) {
     var minutes = Math.floor(millis / 60000);
     var seconds = ((millis % 60000) / 1000).toFixed(0);
     return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}