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

          //document.querySelector().style.display = '';
          //document.querySelector().style.display = '';

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

          if (this.value === '') {
               alert('You forgot to enter a letter!');
               return;
          }

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



document.querySelector('.btn-add-word').addEventListener('click', function() {
     var customWord = document.querySelector('.custom-words').value;
     var arrContainsWord = (words.indexOf(customWord) > -1);
     if (customWord !== '') {
          //check if words array already has entered words
          if (!(arrContainsWord)) {
               words.push(customWord);
               alert('Awesome! Your word is added.');
          } else {
               alert('You already have this word! Enter some other word.');
          }
     } else {
          alert('You can\'t add empty string! Enter some word.');
     }
});



document.querySelector('.btn-play').addEventListener('click', function() {
     document.querySelector('.words-wrapper').style.display = 'none';
     document.querySelector('.wrapper').style.display = 'block';
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
// TO DO
// Napraviti nov screen koji ce se prikazivati pre ovog koji trenutno imas. Na tom screenu ces imati samo jedan input gde ces dodavati nove reci u niz.
// Klikom na Play dugme prelazis na screen koji sada imas i sve funkcionise na isti nacin, samo sa novim recima. Pored broja promasaja, brojaces i poene na sledeci nacin:
// za svaki pogodjeni samoglasnik: + 1 poen
// za svaki pogodjeni suglasnik: + 2 poena
// promasaj: - 0.5p
// Broj poena prikazi gde god, stil nije toliko vazan. Broj poena se odnosi na celu igru, ne samo na odredjenu rec.