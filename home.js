const msgEl = document.getElementById('msg');


// create a random number 
const randomNum = getRandomNumber()

// Function getRandom Number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}
console.log('Number: ' + randomNum);
// Initialze the speech recognition object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Create A New instance called regognition
let recognition = new window.SpeechRecognition();

recognition.start();

recognition.addEventListener('result', onSpeak);

// captures the input from the users speech
function onSpeak(e) {
    // console.log(e);
    const msg = e.results[0][0].transcript;
    console.log(msg);

    writeMessage(msg);
    checkNumber(msg)
}

// displays what the users speaks
function writeMessage(msg) {
    msgEl.innerHTML = `
<div> You said: </div>
<span class="box">${msg}</span>
`;
}

// check the users guess against the number
function checkNumber(msg) {
    // + coverts msg into a number
    const num = +msg;
    // checks number to see if its valid
    if (Number.isNaN(num)) {
        msgEl.innerHTML += `<div>That is not a valid Number</div>`;
        return;
    }
    // check if the number is in range
    if (num > 100 || num < 1) {
        msgEl.innerHTML += `<div>Number must be between 1 and 100</div>`
        return;
    }
    // check the number
    if (num === randomNum) {
        // let the user know they won
        document.body.innerHTML = `
  <h2>Congrats! You have guessed the number!!<br><br>
  It was ${num}</h2>
 <button class="play-again" id="play-again">Play Again</button>`;
    } else if (num > randomNum) {
        msgEl.innerHTML += `<div> Go Lower</div>`

    } else {
        msgEl.innerHTML += `<div>Go Higher</div>`
    }

}
recognition.addEventListener('end', () => recognition.start());
document.body.addEventListener('click', e => {
    if (e.target.id == 'play-again') {
        window.location.reload();
    }
});

