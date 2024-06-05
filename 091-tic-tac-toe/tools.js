export default (function Tools() {
  function addClassList(element, ...args) {
    for (const arg of args) {
      element.classList.add(arg);
    }
  }
  function removeClassList(element, ...args) {
    for (const arg of args) {
      element.classList.remove(arg);
    }
  }
  function saveToLocalStorage(obj) {
    localStorage.setItem("playersInfo", JSON.stringify(obj));
  }
  function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  function removeListeners() {}
  function redirect(URL, timer) {
    timer <= 0
      ? (window.location.href = URL)
      : setTimeout(() => {
          window.location.href = URL;
        }, timer);
  }
  return {
    addClassList,
    removeClassList,
    saveToLocalStorage,
    getFromLocalStorage,
    removeListeners,
    redirect,
  };
})();
