const playzone = document.querySelector('.playzone');
const btnPlay = document.querySelector('.newgame');
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const output = document.querySelector('.output');
const digitsDiv = document.querySelector('.digits');
const btnsettings = document.querySelector('svg');
const settings = document.querySelector('.hidewrapper');
const settingInp = document.querySelector('#inpsetting');
const logWrap = document.querySelector('.logwrapper');
let gameCombination = [];
let n = +settingInp.value;
let input = [];
let cows = 0;
let bulls = 0;
let inpNum = null;

function newGame() {
    generateInput(n);
    inpNum.forEach;
    output.innerHTML = '';
    logWrap.classList.remove("hidden");
    shuffle(numbers);
    btnPlay.innerText = 'RESTART'
    gameCombination = numbers.slice(0, n);
    console.log(gameCombination.join(' '));
}

btnPlay.onclick = newGame;

btnsettings.addEventListener('click', () => {
    settings.classList.toggle("hidden");
    settingInp.disabled = false;
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

        // swap elements array[i] and array[j]
        // we use "destructuring assignment" syntax to achieve that
        // you'll find more details about that syntax in later chapters
        // same can be written as:
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [array[i], array[j]] = [array[j], array[i]];
    }
}
document.querySelector('.settingsapply').addEventListener('click', () => {
    n = +settingInp.value;
    settings.classList.add("hidden");
    newGame();

});


function generateInput(n) { 
    digitsDiv.innerHTML = '';
for (i = 1; i <= n; i++) {
    inpNum = document.createElement("input");
    inpNum.setAttribute("maxlength", `1`);
    inpNum.setAttribute("name", `digit${i}`);
    inpNum.setAttribute("type", `number`);
    digitsDiv.appendChild(inpNum);
}
}

// Listen on the 'input' event inside the .digits area:
document.querySelector(".digits").addEventListener("input", function (e) {
    // Exclude non-numeric characters from input:
    e.target.value = e.target.value.replace(/[^0-9]/g, '');

    // If the input value is filled and there is a neighbouring element that is input, then focus on that element:
    if (e.target.value !== "" && e.target.nextElementSibling && e.target.nextElementSibling.nodeName === "INPUT") {
        input.push(+e.target.value);
        e.target.nextElementSibling.focus();

    }
    if (e.target.name === `digit${n}`) {
        input.push(+e.target.value);
        e.target.blur();
        // document.querySelector(".log").innerText = input.join(' ');
        document.querySelectorAll('input').forEach((e) => {
            e.value = '';
        });
        checkInput();
    }

});

function checkInput() {
    cows = 0;
    bulls = 0;
    gameCombination.forEach((e, i, arr) => {

        if (input.includes(e)) {
            if (e === input[i]) {
                bulls++;
            } else {
                cows++;
            }
        } else {}
    });
    output.innerText += (`${input.join(' ')} - cows: ${cows}, bulls: ${bulls}.
    `);
    if (bulls === n) {
        document.querySelectorAll('h1')[0].innerText = "WINNER";
        document.querySelectorAll('h1')[1].innerText = "WINNER";
        output.innerHTML += `<div class="win">YOU GUESSED THE NUMBER</div>`
        document.querySelectorAll('input').forEach((e) => {
            e.disabled = true;
        });
    }
    // console.log(input);
    input = [];
}