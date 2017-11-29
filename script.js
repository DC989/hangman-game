var words = ['Soccer', 'Basketball', 'Computer', 'Science', 'Mouse'];
var randomNumber = Math.floor(Math.random() * words.length);
var randomWord = words[randomNumber];
var attemptsLeft = 6;
var listOfInputs = '';
var gameIsRuning = false;
var hangman = -1;
var score = 0;

document.querySelector('.start').addEventListener('click', function() {
     if (gameIsRuning === false) {
          //alert(randomWord);
          gameIsRuning = true;
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

          /*
          for (var e = 0; e < randomWord.length; e++) {
               document.querySelector('.letter-' + e).addEventListener('change', function() {
                    switch (randomWord) {
                         case 'Soccer':
                              for (var z = 0; z < randomWord.length; z++) {
                                   if (randomWord.charAt(z).toLocaleLowerCase() === this.value.toLocaleLowerCase()) {
                                        alert('Correct!');
                                   }
                              }
                              break;
                         case 'Basketball':
                              // code
                              break;
                         case 'Computer':
                              // code
                              break;
                         case 'Science':
                              // code
                              break;
                         case 'Mouse':
                              // code
                              break;
                    }
                    alert('Focus changed!');
               });
          }*/
     }
});

document.querySelector('.main-letter').addEventListener('change', function() {


     if (attemptsLeft > 0) {

          if (randomWord.toLowerCase().includes(this.value.toLocaleLowerCase())) {

               //alert('Correct! This word contains this letter.');

               for (var i = 0; i < randomWord.length; i++) {
                    if (this.value.toLowerCase() === randomWord.charAt(i).toLowerCase()) {
                         document.querySelector('.letter-' + i).value = this.value.toUpperCase();
                    }
               }

               // check how many times randomWord contains entered character
               var ourWord = randomWord.toLowerCase();
               var containsNumber = ourWord.split(this.value).length - 1;

               if (containsNumber === 1) {
                    alert('This word contains ' + this.value.toUpperCase() + ' character once.');
                    score++;
                    alert('Your score is ' + score);
               } else {
                    alert('This word contains ' + this.value.toUpperCase() + ' character ' + containsNumber + ' times.');
                    score += containsNumber;
                    alert('Your score is ' + score);
               }

               if (score === randomWord.length) {
                    alert('Congrats! You won! Proceed to the next round.');
                    score = 0;
                    newRound();
               }

          } else {
               alert('Wrong! There is no such letter.');
               attemptsLeft--;
               hangman++;
               document.querySelector('.attemps-left__number').innerHTML = attemptsLeft;
               document.querySelector('.hangman__hangman-' + hangman).style.display = 'block';
          }

     } else {
          alert('You run out of attempts. Game Over!');
     }
});

function newRound() {

     words.splice(randomNumber, 1);
     randomNumber = Math.floor(Math.random() * words.length);
     randomWord = words[randomNumber];

     if (words.length != 0) {

          listOfInputs = '';
          document.querySelector('.letters-container').innerHTML = listOfInputs;

          /*document.querySelector('.hangman__hangman-0').style.display = 'none';
          document.querySelector('.hangman__hangman-1').style.display = 'none';
          document.querySelector('.hangman__hangman-2').style.display = 'none';
          document.querySelector('.hangman__hangman-3').style.display = 'none';
          document.querySelector('.hangman__hangman-4').style.display = 'none';
          document.querySelector('.hangman__hangman-5').style.display = 'none';

          document.querySelector('.attemps-left__number').innerHTML = attemptsLeft;
          document.querySelector('.attemps-left__number').style.display = 'block';

          document.querySelector('.main-letter').style.display = 'inline-block';
          document.querySelector('.main-letter-title').style.display = 'inline-block';*/

          for (var i = 0; i < randomWord.length; i++) {
               listOfInputs += '<input class="letters letter-' + i + '" type="text" disabled/>';
          }

          document.querySelector('.letters-container').innerHTML = listOfInputs;

     } else {

          alert('You run out of words!');

     }
}