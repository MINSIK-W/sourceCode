document.addEventListener('DOMContentLoaded', function () {
  initializeImageOrder('.inner');
});

function initializeImageOrder(selector, options = {}) {
  const defaultOptions = {
    numberClassName: 'num',
    startNumber: 1,
  };
  const settings = Object.assign({}, defaultOptions, options);
  const orderMap = new Map();
  let currentNumber = settings.startNumber;

  document.querySelector(selector).addEventListener('click', function (event) {
    const clickedItem = event.target.closest('.item');
    if (clickedItem) {
      const itemIndex = Array.from(clickedItem.parentNode.children).indexOf(clickedItem);
      const numberElement = clickedItem.querySelector('.' + settings.numberClassName);

      if (numberElement) {
        removeNumber(itemIndex, numberElement, clickedItem);
      } else {
        addNumber(itemIndex, clickedItem);
      }
      updateNumbers();
    }
  });

  function removeNumber(index, element, item) {
    const removedNumber = parseInt(element.textContent);
    orderMap.delete(index);
    element.remove();
    item.classList.remove('active');

    orderMap.forEach((value, key) => {
      if (value > removedNumber) {
        orderMap.set(key, value - 1);
      }
    });
  }

  function addNumber(index, item) {
    const newNumber = orderMap.size + currentNumber;
    orderMap.set(index, newNumber);

    const span = document.createElement('span');
    span.className = settings.numberClassName;
    span.textContent = newNumber;

    item.appendChild(span);
    item.classList.add('active');
  }

  function updateNumbers() {
    const sortedEntries = Array.from(orderMap.entries()).sort((a, b) => a[1] - b[1]);
    sortedEntries.forEach(([index, number], i) => {
      orderMap.set(index, i + currentNumber);
      const item = document.querySelector(`${selector} .item:nth-child(${index + 1})`);
      const numberSpan = item.querySelector('.' + settings.numberClassName);
      if (numberSpan) numberSpan.textContent = i + currentNumber;
    });
  }
}
