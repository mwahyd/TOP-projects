(function formConstraints() {
  // initialise
  // cache dom
  const doc = document.querySelector("[section-signup]");
  const nameFields = doc.querySelectorAll("input#name, input#surname");
  const emailField = doc.querySelector("input[type='email']");
  const passField = doc.querySelector("input[type='password']");
  const showPassBtn = doc.querySelector("[show-password]");
  const form = doc.querySelector("[signup-form]");

  // bind events
  nameFields.forEach((nameField) => {
    nameField.addEventListener("blur", handleNameFocusBlur);
  });
  emailField.addEventListener("blur", emailConstraint);
  emailField.addEventListener("input", emailConstraint);
  showPassBtn.addEventListener("click", showPassword);
  passField.addEventListener("blur", handlePassBlur);
  passField.addEventListener("input", handlePassInput);
  form.addEventListener("submit", verifyForm);

  // handler functions

  // * name functions
  function handleNameFocusBlur(ev) {
    const errorMap = {
      // key === id; value === data-attribute
      name: "[name-error]",
      surname: "[surname-error]",
    };
    const fieldId = ev.target.id;
    const errorSpanSelector = errorMap[fieldId];
    nameConstraint(ev, errorSpanSelector);
  }

  function nameConstraint(ev, spanName) {
    // focused and blured AND EMPTY flag error!
    const nameField = ev.target || ev;
    // const errorSpan = doc.querySelector(spanName);
    const errorSpan =
      typeof spanName === "string" ? document.querySelector(spanName) : spanName;

    if (document.activeElement !== nameField && nameField.value.trim() === "") {
      resetElement(nameField);
      raiseError(errorSpan, "remove", "hidden", " Field cannot be blank");
    } else if (nameField.value.trim().length < 2) {
      // resetElement(nameField);
      raiseError(errorSpan, "remove", "hidden", " Must be more than 2 characters");
    } else {
      removeError(errorSpan, "add", "hidden", true);
    }
  }

  // * email functions
  function emailConstraint(ev, spanName) {
    const emailField = ev.target || ev;
    const errorSpan = doc.querySelector("[email-error]") || spanName;

    if (document.activeElement !== emailField && emailField.value.trim() === "") {
      resetElement(emailField);
      raiseError(errorSpan, "remove", "hidden", " Field cannot be blank");
    } else if (!verifyEmail(emailField.value)) {
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

  // handle blur event (when user leaves password field)
  function handlePassBlur(ev) {
    const passField = ev.target ? ev.target.value : ev.value;
    const passReqsSpans = getPassRequirements();
    if (passField.trim() === "") {
      highlightRequirementSpans(passReqsSpans, true);
    }
  }

  // handle input event (when user types in password field)
  function handlePassInput(ev) {
    const passResults = verifyPassword(ev.target.value);
    validatePassword(passResults);
  }

  // Retrieve all password requirements elements
  function getPassRequirements() {
    return Array.from(doc.querySelectorAll("[pass-req]"));
  }

  // Highlight requirements based on validity
  function highlightRequirementSpans(reqSpans, isInvalid) {
    reqSpans.forEach((span) => {
      if (isInvalid) {
        raiseError(span, "add", "invalid");
      }
    });
  }

  // Retrieve a single password requirement element by key
  function getPassReqSpanUsingKey(key) {
    key = key.slice(3).toLowerCase();
    return doc.querySelector(`[class*=${key}]`);
  }

  // test password against the requirements using regex
  function verifyPassword(password) {
    return {
      hasLetter: /[a-zA-Z]/.test(password),
      hasNum: /\d/.test(password),
      hasChar: /[!@#$%^&*_\-=+]/.test(password),
      hasLength: password.trim().length >= 8,
    };
  }

  function validatePassword(testedPassObj) {
    Object.entries(testedPassObj).forEach(([key, isValid]) => {
      const reqSpan = getPassReqSpanUsingKey(key);
      updateReqSpanIcon(reqSpan, isValid);
    });
  }

  // Update the icon of a specific requirement based on validity
  function updateReqSpanIcon(reqSpan, isValid) {
    const icon = reqSpan.querySelector(".req__icon");
    icon.textContent = isValid ? "\u26AB\uFE0E" : "\u25CB\uFE0E"; // Filled or open circle
    isValid ? icon.setAttribute("valid", "") : icon.removeAttribute("valid");
    if (isValid) {
      removeError(reqSpan, "remove", "invalid"); // remove red colour from span text
    } else {
      raiseError(reqSpan, "add", "invalid"); // add red colour to span text
    }
  }

  // * form submission functions
  function verifyForm(ev) {
    ev.preventDefault();
    const [nameField, famField] = nameFields;
    const [nameSpan, famSpan, emailSpan] = doc.querySelectorAll(".error > span");

    // consolidate fields and error handling
    const fields = [
      { field: nameField, errorFunc: () => nameConstraint(nameField, nameSpan) },
      { field: famField, errorFunc: () => nameConstraint(famField, famSpan) },
      { field: emailField, errorFunc: () => emailConstraint(emailField, emailSpan) },
      { field: passField, errorFunc: () => handlePassBlur(passField) },
    ];

    // loop through fileds, check validity, handle error, focus on the first invalid field
    const invalidField = fields.find(({ field }) => !field.checkValidity());

    if (invalidField) {
      const { field, errorFunc } = invalidField;
      field.focus();
      errorFunc();
    } else {
      alert("Submitting form");
      form.submit();
    }
  }

  // * error functions
  function raiseError(element, toggle, className, errorMsg = false) {
    if (errorMsg) element.textContent = errorMsg;
    if (toggle === "add") element.classList.add(className);
    else if (toggle === "remove") element.classList.remove(className);
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
