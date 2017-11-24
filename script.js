var words = ['Soccer', 'Basketball', 'Computer', 'Science', 'Mouse'];
var attemptsLeft = 6;
var randomNumber = Math.floor(Math.random() * 5);
var randomWord = words[randomNumber];
var listOfInputs = '';
var gameIsRuning = false;
var hangman = -1;

document.querySelector('.start').addEventListener('click', function() {
     if (gameIsRuning === false) {
          //alert(randomWord);
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

          gameIsRuning = true;

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
          if (randomWord.toLocaleLowerCase().includes(this.value.toLocaleLowerCase())) {
               alert('Correct! This word contains this letter.');
               for (var i = 0; i < randomWord.length; i++) {
                    if (this.value.toLowerCase() === randomWord.charAt(i).toLowerCase()) {
                         document.querySelector('.letter-' + i).value = this.value.toUpperCase();
                    }
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