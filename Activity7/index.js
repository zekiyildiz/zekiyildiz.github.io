var levelCounter = 1;
var time = 500;
var clickCount = 0;
var timerId = null;
var gameActive = true;

var button = document.getElementById("button");

button.onmouseover = () => {
    if (!gameActive || timerId !== null) return;


    timerId = setTimeout(() => {
        alert("You lose!!!");
        gameActive = false;
        button.disabled = true;
    }, time);
};


button.onclick = () => {
    if (!gameActive) return;

    clearTimeout(timerId);
    timerId = null;

    clickCount++;
    moveButtonRandom();

    if (clickCount >= 3) {
        levelCounter++;
        clickCount = 0;

        if (levelCounter === 6) {
            gameActive = false;
            button.disabled = true;
            return;
        }

        time -= 100;

        alert(`You won!. Now level ${levelCounter} begins now.`);

        setTimeout(() => {
            timerId = setTimeout(() => {
                alert("You lose!!!");
                gameActive = false;
                button.disabled = true;
            }, time);

        }, 1000);
    }
};

function moveButtonRandom() {
    const randTop = Math.random() * 640 + "px";
    const randLeft = Math.random() * 860 + "px";

    button.style.marginTop = randTop;
    button.style.marginLeft = randLeft;
}