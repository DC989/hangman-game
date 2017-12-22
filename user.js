document.querySelector('#btn-add-name--js').addEventListener('click', function() {
    var customNameToLower = document.querySelector('#custom-name--js').value.toLowerCase();
    var customNameToUpper = document.querySelector('#custom-name--js').value.toUpperCase();
    if (!(customNameToUpper === '')) {
        if (localStorage.getItem(customNameToUpper) === null) {
            var player = {
                name: customNameToLower,
                games: [],
                totalScore: 0,
                timePlayed: ''
            };
            var toString = JSON.stringify(player);
            localStorage.setItem(customNameToUpper, toString);
        } else {
            /*
            var retriveData = localStorage.getItem(customNameToUpper);
            var toObject = JSON.parse(retriveData);
    
            if (toArray.indexOf(item) > -1) {
                alert('This word is already in local storage!');
            } else {
                toArray.push(item);
                localStorage.setItem(key, JSON.stringify(toArray));
            }
            */
            alert('Your profile is already in the game!');
        }
    } else {
         alert('You forgot to enter the name!');
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