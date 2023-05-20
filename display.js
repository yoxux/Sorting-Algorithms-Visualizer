import * as sortingAlgorithms from "./sorts/index";
import SORT_ALGORITHM from "./sorts/sort_algorithms";

var display = null;
var array = [];

function initialize(_display) {
  display = _display;
}

function show(len) {
  display.innerHTML = "";
  len = parseInt(len);
  array.length = len;
  const itemLength = 100 / len;
  for (let i = 0, left = 0; i < len; ++i, left += itemLength) {
    array[i] = Math.floor(Math.random() * 991) + 10;
    const div = document.createElement("div");
    div.style.height = `${array[i] / 10}%`;
    div.style.width = `${itemLength}%`;
    div.style.left = `${left}%`;
    if (len < 30) div.classList.add("border");
    display.append(div);
  }
}

function getAnimations(algorithm) {
  switch (algorithm) {
    case SORT_ALGORITHM.Bubblesort:
      return sortingAlgorithms.bubblesort(array);
    case SORT_ALGORITHM.Selectionsort:
      return sortingAlgorithms.selectionsort(array);
    case SORT_ALGORITHM.Mergesort:
      return sortingAlgorithms.mergesort(array);
    case SORT_ALGORITHM.Quicksort:
      return sortingAlgorithms.quicksort(array);
    case SORT_ALGORITHM.Countingsort:
      return sortingAlgorithms.countingsort(array);
    case SORT_ALGORITHM.Radixsort:
      return sortingAlgorithms.radixsort(array);
    case SORT_ALGORITHM.Heapsort:
      return sortingAlgorithms.heapsort(array);
    default:
      return [];
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function sort(algorithm) {
  const animations = getAnimations(algorithm);

  const domArray = display.querySelectorAll("div");
  const alt = Array.from(Array(domArray.length).keys());

  const delayTime = 5000 / (alt.length ** 2 / 3);
  document.documentElement.style.setProperty(
    "--item-transition",
    `${Math.floor(delayTime)}ms`
  );

  for (const [action, ...items] of animations) {
    switch (action) {
      case "compare": {
        const [i, j] = items;
        domArray[alt[i]].style.background = "var(--compare1)";
        domArray[alt[j]].style.background = "var(--compare2)";
        await delay(delayTime);
        domArray[alt[i]].style.background = "var(--black)";
        domArray[alt[j]].style.background = "var(--black)";
        break;
      }
      case "swap": {
        const [i, j] = items;
        const tempLeft = domArray[alt[i]].style.left;
        domArray[alt[i]].style.left = domArray[alt[j]].style.left;
        domArray[alt[j]].style.left = tempLeft;
        [alt[i], alt[j]] = [alt[j], alt[i]];
        domArray[alt[i]].style.background = "var(--swap)";
        domArray[alt[j]].style.background = "var(--swap)";
        await delay(delayTime);
        domArray[alt[i]].style.background = "var(--black)";
        domArray[alt[j]].style.background = "var(--black)";
        break;
      }
      case "color": {
        const [i] = items;
        domArray[alt[i]].style.background = "var(--success)";
        await delay(delayTime);
        break;
      }
    }
  }
}

export { initialize, show, sort };