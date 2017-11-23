var words = ['Soccer', 'Basketball', 'Computer', 'Science', 'Mouse'];
var attemptsLeft = 5;
var randomNumber = Math.floor(Math.random() * 5);
var randomWord = words[randomNumber];
var listOfInputs = '';

document.querySelector('.start').addEventListener("click", function() {
     document.querySelector('.hangman__hangman-head').style.display = 'none';
     document.querySelector('.hangman__hangman-left-arm').style.display = 'none';
     document.querySelector('.hangman__hangman-body').style.display = 'none';
     document.querySelector('.hangman__hangman-right-arm').style.display = 'none';
     document.querySelector('.hangman__hangman-left-leg').style.display = 'none';
     document.querySelector('.hangman__hangman-right-leg').style.display = 'none';

     document.querySelector('.attemps-left__number').innerHTML = '5';
     document.querySelector('.attemps-left__number').style.display = 'block';

     for (var i = 0; i < randomWord.length; i++) {
          listOfInputs += '<input class="letters" type="text" />';
     }

     document.querySelector('.letters-container').innerHTML = listOfInputs;
});