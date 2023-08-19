'use strict';

const billEl = document.getElementById('bill');
const peopleEl = document.getElementById('people');
const btnsTipContainer = document.querySelector('.grid--tip');
const btnsTips = document.querySelectorAll('.tip button');
const customTipEl = document.getElementById('custom');
const tipAmountEl = document.getElementById('tipAmount');
const totalEl = document.getElementById('total');
const btnReset = document.getElementById('btn--reset');

let tip;

const init = function () {
  tip = 0;
  billEl.value = '';
  customTipEl.value = '';
  peopleEl.value = '';
  btnsTips.forEach((btn) => btn.classList.remove('btn--pressed'));
  tipAmountEl.textContent = 0;
  totalEl.textContent = 0;
};
init();

btnsTipContainer.addEventListener('click', function (event) {
  btnsTips.forEach((btn) => btn.classList.remove('btn--pressed'));
  const target = event.target.closest('button');
  if (!target) return;
  target.classList.add('btn--pressed');

  tip = +target.querySelector('#tip--pctg').textContent;
});

const calcTip = function (event) {
  const bill = +billEl.value;
  const people = +peopleEl.value;
  const totalTip = (bill * tip) / 100;
  const tipPerson = Math.round((totalTip / people) * 100) / 100;
  const totalPerson = ((bill / people) * 100) / 100 + tipPerson;

  tipAmountEl.textContent = tipPerson;
  totalEl.textContent = Math.round(totalPerson * 100) / 100;
};

peopleEl.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  if (customTipEl.value) tip = +customTipEl.value;
  calcTip(event);
});

btnReset.addEventListener('click', init);
