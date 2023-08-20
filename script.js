'use strict';

const billEl = document.getElementById('bill');
const peopleEl = document.getElementById('people');
const btnsTipContainer = document.querySelector('.grid--tip');
const btnsTips = document.querySelectorAll('.tip button');
const customTipEl = document.getElementById('custom');
const tipAmountEl = document.getElementById('tipAmount');
const totalEl = document.getElementById('total');
const btnReset = document.getElementById('btn--reset');
const errorLabel = document.getElementById('error');

const init = function () {
  btnReset.disabled = true;
  billEl.value = '';
  customTipEl.value = '';
  peopleEl.value = '';
  btnsTips.forEach((btn) => btn.classList.remove('btn--pressed'));
  tipAmountEl.textContent = 0;
  totalEl.textContent = 0;
};
init();

const getTip = function () {
  const arr = Array.from(btnsTips);
  const btnTip = arr.find((btn) => btn.classList.contains('btn--pressed'));

  let tip = btnTip ? +btnTip.firstChild.textContent : +customTipEl.value;

  if (!tip) tip = 0;

  return tip;
};

//Add background color to pressed button
btnsTipContainer.addEventListener('click', function (event) {
  btnsTips.forEach((btn) => btn.classList.remove('btn--pressed'));

  const target = event.target.closest('button');
  if (!target) return;
  target.classList.add('btn--pressed');

  getTip();
});

//Calc and render tip and bill amounts
const calcTotal = function () {
  const tip = getTip();
  const bill = +billEl.value;
  const people = +peopleEl.value;

  const totalTip = (bill * tip) / 100;
  const billPerson = +(bill / people).toFixed(2);
  const tipPerson = +(totalTip / people).toFixed(2);
  const totalPerson = +(tipPerson + billPerson).toFixed(2);

  tipAmountEl.textContent = tipPerson;
  totalEl.textContent = totalPerson;
};

const enableResetBtn = function () {
  btnReset.disabled = false;
};

//Show and restore errors
const renderError = function () {
  errorLabel.classList.add('display--error');
  peopleEl.classList.add('error--border');
};

const restoreError = function () {
  errorLabel.classList.remove('display--error');
  peopleEl.classList.remove('error--border');
};

peopleEl.addEventListener('click', restoreError);

//Submit form on Enter
peopleEl.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;

  if (!peopleEl.value) {
    renderError();
    return;
  }

  enableResetBtn();
  calcTotal();
});

//Restore default UI
btnReset.addEventListener('click', init);
