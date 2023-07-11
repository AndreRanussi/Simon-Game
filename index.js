const countValue = document.querySelector(".counter");
const colorPart = document.querySelectorAll(".color-part");
const container = document.querySelector(".start");
const startButton = document.querySelector("#start");
const result = document.querySelector("#result");
const wrapper = document.querySelector(".container");

const colors = {
  color1: {
    current: "#008000",
    new: "#093f09",
  },
  color2: {
    current: "#ff0000",
    new: "#8a2121",
  },
  color3: {
    current: "#ffff00",
    new: "#8f8f21",
  },
  color4: {
    current: "#0000ff",
    new: "#11113f",
  },
};

let randomColors = [];
let isPathGeneratorActive = false;
let count, clickCount = 0;

startButton.addEventListener("click", () => {
  count = 0;
  clickCount = 0;
  randomColors = [];
  isPathGeneratorActive = false;
  wrapper.classList.remove("hide");
  container.classList.add("hide")
  pathGenerate();
});

const pathGenerate = () => {
  randomColors.push(generateRandomValue(colors));
  count = randomColors.length;
  isPathGeneratorActive = true;
  pathDecide(count);
};

const generateRandomValue = (obj) => {
  const arr = Object.keys(obj);
  return arr[Math.floor(Math.random() * arr.length)];
};

const pathDecide = async (count) => {
  countValue.innerText = count;
  for (const color of randomColors) {
    const currentColor = document.querySelector(`.${color}`);
    await delay(500);
    currentColor.style.backgroundColor = colors[color].new;
    await delay(500);
    currentColor.style.backgroundColor = colors[color].current;
    await delay(100);
  }
  isPathGeneratorActive = false;
};

async function delay(time) {
  return await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

//when users click on the button
colorPart.forEach((Element) => {
  Element.addEventListener("click", async (e) => {
    if (isPathGeneratorActive) {
      return false;
    }
    if (e.target.classList[0] === randomColors[clickCount]) {
      e.target.style.backgroundColor = colors[randomColors[clickCount]]["new"];
      await delay(400);
      e.target.style.backgroundColor = colors[randomColors[clickCount]]["current"];
      clickCount += 1;
      if (clickCount == count) {
        clickCount = 0;
        pathGenerate();
      }
    } else {
      lose();
    }
  });
});

const lose = () => {
  result.innerHTML =`<span>Your Score:</span>${count}`;
  result.classList.remove("hide");
  container.classList.remove("hide")
  wrapper.classList.add("hide")
  startButton.innerText = "Play Again";
  startButton.classList.remove("hide")
};
