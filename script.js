var words = ['Soccer', 'Basketball', 'Computer', 'Science', 'Mouse'];
var attemptsLeft = 5;
var randomNumber = Math.floor(Math.random() * 5);
var randomWord = words[randomNumber];
var listOfInputs = '';
var gameIsRuning = false;

document.querySelector('.start').addEventListener('click', function() {
     if (gameIsRuning === false) {
          alert(randomWord);
          document.querySelector('.hangman__hangman-head').style.display = 'none';
          document.querySelector('.hangman__hangman-left-arm').style.display = 'none';
          document.querySelector('.hangman__hangman-body').style.display = 'none';
          document.querySelector('.hangman__hangman-right-arm').style.display = 'none';
          document.querySelector('.hangman__hangman-left-leg').style.display = 'none';
          document.querySelector('.hangman__hangman-right-leg').style.display = 'none';

          document.querySelector('.attemps-left__number').innerHTML = '5';
          document.querySelector('.attemps-left__number').style.display = 'block';

          for (var i = 0; i < randomWord.length; i++) {
               listOfInputs += '<input class="letters letter-' + i + '" type="text" />';
          }

          document.querySelector('.letters-container').innerHTML = listOfInputs;

          gameIsRuning = true;

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
          }
     }
});