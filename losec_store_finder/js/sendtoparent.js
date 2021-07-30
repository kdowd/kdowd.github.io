function debounce(func, timeout = 250) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
function updateParent() {
  let bcr = document.body.getBoundingClientRect();
  let o = { width: bcr.width, height: bcr.height };

  if (window.parent == window.top) {
      window.parent.postMessage(o);
      console.log(" iframe = ", o);
  }

  
}

const debouncer = debounce(() => updateParent());

window.addEventListener("resize", debouncer);
