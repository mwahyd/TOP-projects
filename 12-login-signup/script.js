(function formConstraints() {
  // initialise
  // cache dom
  const doc = document.querySelector("[section-login]");
  const passField = doc.querySelector("input[type='password']");
  const showPassBtn = doc.querySelector("[show-password]");

  // bind events
  showPassBtn.addEventListener("click", showPassword);
  // render?

  // handler functions

  // * password functions
  function showPassword(ev) {
    ev.target.classList.toggle("warning");

    passField.type === "password"
      ? (passField.type = "text")
      : (passField.type = "password");
  }
})();
