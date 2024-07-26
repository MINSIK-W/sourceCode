document.addEventListener('DOMContentLoaded', function () {
  orderInImageList('.inner');
});

function orderInImageList(sel, opts = {}) {
  const defs = {
    numName: 'num',
    startNum: 1,
  };
  const set = Object.assign({}, defs, opts);
  let om = new Map();
  let sn = set.startNum;

  document.querySelector(sel).addEventListener('click', function (event) {
    if (event.target.closest('.item')) {
      const item = event.target.closest('.item');
      const idx = Array.from(item.parentNode.children).indexOf(item);
      const eo = item.querySelector('.' + set.numName);

      if (eo) {
        const rmNum = parseInt(eo.textContent);
        om.delete(idx);
        eo.remove();
        item.classList.remove('active');
        om.forEach((val, key) => {
          if (val > rmNum) {
            om.set(key, val - 1);
          }
        });
      } else {
        const omsn = om.size + sn;
        om.set(idx, omsn);
        const span = document.createElement('span');
        span.className = set.numName;
        span.textContent = omsn;
        item.appendChild(span);
        item.classList.add('active');
      }
      update();
    }
  });

  function update() {
    let omsn = om.size + sn;
    const se = Array.from(om.entries()).sort((a, b) => a[1] - b[1]);
    se.forEach(([idx, omsn]) => {
      om.set(idx, omsn);
      const item = document.querySelector(sel + ' .item:nth-child(' + (idx + 1) + ')');
      const numSpan = item.querySelector('.' + set.numName);
      if (numSpan) numSpan.textContent = omsn;
      omsn++;
    });
  }
}
