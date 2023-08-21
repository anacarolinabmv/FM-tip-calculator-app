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

let tip;

const init = function () {
  tip = 0;
  btnReset.disabled = true;
  billEl.value = '';
  customTipEl.value = '';
  peopleEl.value = '';
  btnsTips.forEach((btn) => btn.classList.remove('btn--pressed'));
  tipAmountEl.textContent = 0;
  totalEl.textContent = 0;
};
init();

//Add background color to pressed button
btnsTipContainer.addEventListener('click', function (event) {
  btnsTips.forEach((btn) => btn.classList.remove('btn--pressed'));

  const target = event.target.closest('button');
  if (!target) return;
  target.classList.add('btn--pressed');

  tip = +target.firstChild.textContent;

  if (!billEl.value || !peopleEl.value) return;
  calcTotal();
});

//Calculate and render tip and bill amounts
const calcTotal = function () {
  const bill = +billEl.value;
  const people = +peopleEl.value;

  const totalTip = (bill * tip) / 100;
  const billPerson = +(bill / people).toFixed(2);
  const tipPerson = +(totalTip / people).toFixed(2);
  const totalPerson = +(tipPerson + billPerson).toFixed(2);

  tipAmountEl.textContent = tipPerson;
  totalEl.textContent = totalPerson;

  enableResetBtn();
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

//****Event listeners****

//Calculate tip on submit/change
document.addEventListener('keydown', (event) => {
  if (!event.key === 'Enter') return;
  if (!billEl.value || !peopleEl.value || !tip) return;
  calcTotal();
});

billEl.addEventListener('change', function () {
  if (!tip || !peopleEl.value) return;
  calcTotal();
});

peopleEl.addEventListener('change', function () {
  if (!peopleEl.value || peopleEl.value == 0) {
    renderError();
    return;
  }
  if (!tip || !billEl.value) return;
  calcTotal();
});

//Restore input error
peopleEl.addEventListener('focus', restoreError);
peopleEl.addEventListener('click', restoreError);

customTipEl.addEventListener('change', function () {
  tip = +customTipEl.value;
  if (!billEl.value || !peopleEl.value) return;
  calcTotal();
});

//Reset initial UI
btnReset.addEventListener('click', init);
