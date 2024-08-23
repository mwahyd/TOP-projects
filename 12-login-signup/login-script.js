(function formConstraints() {
  // initialise
  // cache dom
  const doc = document.querySelector("[section-login]");
  const emailField = doc.querySelector("input[type='email']");
  const passField = doc.querySelector("input[type='password']");
  const showPassBtn = doc.querySelector("[show-password]");

  // bind events
  emailField.addEventListener("input", emailConstraint);
  showPassBtn.addEventListener("click", showPassword);

  // handler functions

  // * email functions
  function emailConstraint(ev) {
    const errorSpan = doc.querySelector("[email-error]");
    if (ev.target.value === "") {
      removeError(errorSpan);
    } else if (!verifyEmail(ev.target.value)) {
      const msg = ` Invalid email format [abc@abc.xyz]`;
      raiseError(errorSpan, msg);
    } else {
      removeError(errorSpan);
    }
  }

  function verifyEmail(email) {
    const emailRegex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    return emailRegex.test(email);
  }

  // * password functions
  function showPassword(ev) {
    ev.target.classList.toggle("warning");

    passField.type === "password"
      ? (passField.type = "text")
      : (passField.type = "password");
  }

  // * error functions
  function raiseError(errorSpan, errorMsg) {
    errorSpan.classList.remove("hidden");
    errorSpan.textContent = errorMsg;
  }

  function removeError(errorSpan) {
    errorSpan.testContent = "";
    errorSpan.classList.add("hidden");
  }
})();
