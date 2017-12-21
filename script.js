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



var gamesPlayed = 0;
var startTimeCurrentGame;
var endTimeCurrentGame;
var totalTimeCurrentGame;

/*
var player = [{
    name: '',
    games: [],
    totalScore: 0,
    timePlayed: 0
}];
*/

function Player(name, games, totalScore, timePlayed) {
     this.name = name;
     this.games = games;
     this.totalScore = totalScore;
     this.timePlayed = timePlayed;
}

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
                              newRound();
                         } else if (words.length > 1) {
                              alert('Proceed to the last round!');
                              lastRound();
                         } else {
                              words.splice(randomNumber, 1);
                              endTimeCurrentGame = new Date().getTime();
                              totalTimeCurrentGame = endTimeCurrentGame - startTimeCurrentGame;
                              alert('Congratulations! You guessed all the words. You won the game!');
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
               alert('You completed the game. Refresh the page if you want to start a new one.');
          }
     } else {
          alert('You run out of attempts. Game Over!');
          alert('Your score is ' + gameScores.score);
     }
});



document.querySelector('#btn-play--js').addEventListener('click', function() {
     var customName = document.querySelector('#custom-name--js').value;
     var fetchNamesLocal = localStorage.getItem('gameProfileNames');
     var fetchNamesObject = JSON.parse(fetchNamesLocal);

     if (customName === '') {
          /*if (!(fetchNamesObject.indexOf(customName.toUpperCase()) > -1)) {
              customName = 'HEY!';
          } else {
              alert('Your name is already added to local storage!');
          }*/
          alert('You need to enter your name in order to play the Hangman game.');
          return;
     }

     /*
      if (!(words.length < 1)) {
           document.querySelector('.words-wrapper').style.display = 'none';
           document.querySelector('.wrapper').style.display = 'block';
           document.querySelector('.score-wrapper').style.display = 'block';
      } else {
           alert('There are no words in the Hangman Game, add some.');
      }
      */
});









document.querySelector('#btn-add-name--js').addEventListener('click', function() {
     var customName = document.querySelector('#custom-name--js').value.toUpperCase();
     if (!(customName === '')) {
          // Update names in array of names
          if (!(profileNames.indexOf(customName) > -1)) {
               profileNames.push(customName);
               //alert('Hi ' + customName + ', your name has been added to the game!');
          } else {
               alert('You already added this name!');
          }
          // Update names in localStorage
          pushProfileNamesToLocal(customName);
     } else {
          alert('You forgot to enter the name!');
     }
});

function pushProfileNamesToLocal(name) {
     if (localStorage.getItem('gameProfileNames') === null) {
          var profileNamesToString = JSON.stringify(profileNames);
          localStorage.setItem('gameProfileNames', profileNamesToString);
     } else {
          var retriveProfileNames = localStorage.getItem('gameProfileNames');
          var profileNamesToArray = JSON.parse(retriveProfileNames);

          if (profileNamesToArray.indexOf(name) > -1) {
               alert('This name is already in the local storage!');
          } else {
               profileNamesToArray.push(name);
               localStorage.setItem('gameProfileNames', JSON.stringify(profileNamesToArray));
          }
     }
}

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
          pushWordsToLocal(customWord);
     } else {
          alert('You can\'t add empty string! Enter some word.');
     }
});

function pushWordsToLocal(word) {
     if (localStorage.getItem('gameWords') === null) {
          var wordsToString = JSON.stringify(words);
          localStorage.setItem('gameWords', wordsToString);
     } else {
          var retriveWords = localStorage.getItem('gameWords');
          var wordsToArray = JSON.parse(retriveWords);

          if (wordsToArray.indexOf(word) > -1) {
               alert('This word is already in local storage!');
          } else {
               wordsToArray.push(word);
               localStorage.setItem('gameWords', JSON.stringify(wordsToArray));
          }
     }
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

function millisToMinutesAndSeconds(millis) {
     var minutes = Math.floor(millis / 60000);
     var seconds = ((millis % 60000) / 1000).toFixed(0);
     return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}




// ---------------TO DO---------------
// napraviti da se kreira profil igraca---DONE
// sacuvati unete reci u local storage-u---DONE
// sacuvati profile u local storage-u---DONE
// pamtiti score na odredjenoj reci koju je pogadjao---DONE
// pamtiti ukupan score dok se nije obesio ili kompletirao sve reci---DONE
// pamtiti vreme za koje koje je user zavrsio igru---DONE