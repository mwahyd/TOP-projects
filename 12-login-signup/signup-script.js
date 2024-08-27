(function formConstraints() {
  // initialise
  const errorMap = {
    // key === id; value === data-attribute
    name: "[name-error]",
    surname: "[surname-error]",
  };
  // cache dom
  const doc = document.querySelector("[section-signup]");
  const nameFields = doc.querySelectorAll("input#name, input#surname");
  const emailField = doc.querySelector("input[type='email']");
  const passField = doc.querySelector("input[type='password']");
  const showPassBtn = doc.querySelector("[show-password]");

  // bind events
  nameFields.forEach((nameField) => {
    nameField.addEventListener("blur", handleFocusBlur);
  });
  emailField.addEventListener("input", emailConstraint);
  showPassBtn.addEventListener("click", showPassword);

  // handler functions

  // * name functions
  function handleFocusBlur(ev) {
    const fieldId = ev.target.id;
    const errorSpanSelector = errorMap[fieldId];
    focusConstraint(ev, errorSpanSelector);
  }

  function focusConstraint(ev, spanName) {
    // focused and blured AND EMPTY flag error!
    const nameField = ev.target;
    const errorSpan = doc.querySelector(spanName);

    if (document.activeElement !== nameField && nameField.value.trim() === "") {
      resetElement(nameField);
      raiseError(errorSpan, "remove", "hidden", " Field cannot be blank");
    } else if (nameField.value.trim().length < 2) {
      resetElement(nameField);
      raiseError(errorSpan, "remove", "hidden", " Must be more than 2 characters");
    } else {
      removeError(errorSpan, "add", "hidden", true);
    }
  }

  // * email functions
  function emailConstraint(ev) {
    const errorSpan = doc.querySelector("[email-error]");
    if (ev.target.value === "") {
      removeError(errorSpan);
    } else if (!verifyEmail(ev.target.value)) {
      const msg = ` Invalid email format [abc@abc.xyz]`;
      raiseError(errorSpan, "remove", "hidden", msg);
    } else {
      removeError(errorSpan, "add", "hidden", true);
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
  function raiseError(element, toggle, className, errorMsg) {
    if (toggle === "add") element.classList.add(className);
    else if (toggle === "remove") element.classList.remove(className);
    element.textContent = errorMsg;
  }

  function removeError(element, toggle, className, text = false) {
    if (text) element.testContent = "";
    if (toggle === "add") element.classList.add(className);
    if (toggle === "remove") element.classList.remove(className);
  }

  function resetElement(element) {
    element.value = "";
  }
})();
