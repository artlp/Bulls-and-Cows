const playzone = document.querySelector('.playzone');
const btnPlay = document.querySelector('.newgame');
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const hints = document.querySelector('.hints');
const output = document.querySelector('.output');
let gameCombination = [];
let n = 4;
let input = [];
let cows = 0;
let bulls =  0;

function newGame() {
    shuffle(numbers);
    gameCombination = numbers.slice(0, n);
    playzone.innerText = gameCombination.join(' ');
}

btnPlay.onclick = newGame;


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

// Listen on the 'input' event inside the .digits area:
document.querySelector(".digits").addEventListener("input", function (e) {
    // Exclude non-numeric characters from input:
    e.target.value = e.target.value.replace(/[^0-9]/g, '');

    // If the input value is filled and there is a neighbouring element that is input, then focus on that element:
    if (e.target.value !== "" && e.target.nextElementSibling && e.target.nextElementSibling.nodeName === "INPUT") {
        input.push(+e.target.value);
        e.target.nextElementSibling.focus();

    }
    if (e.target.name === "digit4") {
        input.push(+e.target.value);
        e.target.blur();
        document.querySelector(".log").innerText = input.join(' ');
        document.querySelectorAll('input').forEach((e) => {
        e.value = '';
    });
    checkInput();
}

});

function checkInput() {
    console.log(input, gameCombination);
    cows = 0;
    bulls = 0;
    gameCombination.forEach((e,i,arr)=> {

        if (input.includes(e)) {
            if (e === input[i]) {
                console.log("BULL");
                bulls++;
            } else {
                console.log("COW");
                cows++;
            }
        } else {
            console.log("nothing");
        }
    })
    output.innerText += (`${input.join(' ')}, cows: ${cows}; bulls: ${bulls} 
    `);

    input = [];
}