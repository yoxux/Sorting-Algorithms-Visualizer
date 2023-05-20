import SORT_ALGORITHM from "./sorts/sort_algorithms";
import * as display from "./display";

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", appHeight);
appHeight();

const sortSelect = document.getElementById("sort-select");
const btnToggleTheory = document.getElementById("toggle-theory");

for (const [sortName, sortValue] of Object.entries(SORT_ALGORITHM)) {
  sortSelect.innerHTML += `<option value="${sortValue}">${sortName}</option>`;
}

(() => {
  let prevTime;
  function toggle_(time) {
    if (prevTime === undefined) prevTime = time;
    if (time - prevTime > 900) {
      prevTime = time;
      btnToggleTheory.classList.toggle("_");
    }
    window.requestAnimationFrame(toggle_);
  }
  window.requestAnimationFrame(toggle_);
})();

///////////////////////////////////////////////////////////////

const maxLength = Math.floor(window.innerWidth * 0.7);
const lengthInput = document.getElementById("length-count");
const lengthLabel = document.querySelector('label[for="length-count"]');

lengthInput.max = maxLength.toString();
lengthInput.value = Math.floor(maxLength / 10).toString();
lengthLabel.textContent = lengthInput.value;

display.initialize(document.getElementById("display"));
display.show(lengthInput.value);

lengthInput.onmousemove = sliderMove;
lengthInput.onchange = (e) => {
  sliderMove(e);
  display.show(lengthInput.value);
};
function sliderMove(e) {
  lengthLabel.textContent = e.target.value;
}

const btnNewArray = document.getElementById("btn-newArray");
btnNewArray.addEventListener("click", () => {
  display.show(lengthInput.value);
});
