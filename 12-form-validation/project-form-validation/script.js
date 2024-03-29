const validation = {
  init: function () {
    this.errorCodes = [];
    this.cacheDOM();
    this.listeners();
  },

  cacheDOM: function () {
    this.form = document.querySelector("#form");
    this.errorDiv = this.form.previousElementSibling;
    // this.postFields = this.form.querySelectorAll("[data-id]");

    return [
      (this.emailField = this.form.querySelector("#email")),
      (this.passField = this.form.querySelector("#password")),
      (this.conPassField = this.form.querySelector("#conf-password")),
      (this.countryField = this.form.querySelector("#country")),
      (this.postDiv = this.form.querySelector("[data-post]")),
    ];
  },

  render: function () {
    this.errorDiv.innerHTML = "";
    this.errorCodes.forEach((errorCode) => {
      const p = document.createElement("p");
      p.id = errorCode;
      const [field, code] = errorCode.split(/(?=[A-Z])/);
      if (code === "Length") {
        p.textContent = `\u2757 password shorter than 8 characters`;
        this.errorDiv.appendChild(p);
        return;
      } else if (code === "UpperCase") {
        p.textContent = `\u2757 password must have a capital letter`;
        this.errorDiv.appendChild(p);
        return;
      } else if (code === "Number") {
        p.textContent = `\u2757 password must have a number`;
        this.errorDiv.appendChild(p);
        return;
      } else if (code === "Special") {
        p.textContent = `\u2757 password must have a special character \n\t eg: ! , . # $ ^`;
        this.errorDiv.appendChild(p);
        return;
      } else if (code === "Missmatch") {
        p.textContent = `\u2757 passwords do not match`;
        this.errorDiv.appendChild(p);
        return;
      }

      console.log(code);
      p.textContent = `\u2757${field} field is ${code}`;
      this.errorDiv.appendChild(p);
    });
  },

  listeners: function () {
    // check for blur, input, change event
    validation.cacheDOM().forEach((field) => {
      // raise error if field is empty after focus
      field.addEventListener("blur", this.error.bind(this));
      // remove error if field contains data
      field.addEventListener("blur", this.valid.bind(this));
    });

    // check for change and test field
    this.emailField.addEventListener("change", this.testEmail.bind(this));
    this.passField.addEventListener("change", this.testPassword.bind(this));
    this.conPassField.addEventListener("change", this.testConPass.bind(this));
    this.postDiv.addEventListener("click", this.testPostCode.bind(this));
  },

  error: function (event, errorType) {
    // if field empty and blurred
    if (event.type === "blur" && event.target.value === "") {
      event.target.classList.add("empty-highlight");
      this.raiseError(event.target, "Empty");
    } else if (event.type === "change") {
      switch (errorType) {
        case "emailError":
          event.target.classList.add("error-highlight");
          this.raiseError(event.target, "Invalid");
          break;
        case "passLength":
          event.target.classList.add("error-highlight");
          this.raiseError(event.target, "Length");
          break;
        case "upperCase":
          event.target.classList.add("error-highlight");
          this.raiseError(event.target, "UpperCase");
          break;
        case "number":
          event.target.classList.add("error-highlight");
          this.raiseError(event.target, "Number");
          break;
        case "special":
          event.target.classList.add("error-highlight");
          this.raiseError(event.target, "Special");
          break;
        case "missmatch":
          event.target.classList.add("error-highlight");
          this.raiseError(event.target, "Missmatch");
          break;
      }
    }
  },

  raiseError: function (target, code) {
    const errorCode = target.id + code;
    if (this.errorCodes.includes(errorCode)) return;
    this.errorCodes.push(errorCode);
    console.log(this.errorCodes);
    this.render();
  },

  valid: function (event, errorType) {
    // if field contains data
    if (event.type === "blur" && event.target.value !== "") {
      event.target.classList.remove("empty-highlight");
      this.removeError(event.target, "Empty");
    } else if (event.type === "change") {
      switch (errorType) {
        case "emailError":
          event.target.classList.remove("error-highlight");
          this.removeError(event.target, "Invalid");
          break;
        case "passLength":
          event.target.classList.remove("error-highlight");
          this.removeError(event.target, "Length");
        case "upperCase":
          event.target.classList.remove("error-highlight");
          this.removeError(event.target, "UpperCase");
          break;
        case "number":
          event.target.classList.remove("error-highlight");
          this.removeError(event.target, "Number");
          break;
        case "special":
          event.target.classList.remove("error-highlight");
          this.removeError(event.target, "Special");
          break;
        case "missmatch":
          event.target.classList.remove("error-highlight");
          this.removeError(event.target, "Missmatch");
          break;
      }
    }
  },

  removeError: function (target, code) {
    const errorCode = target.id + code;
    console.log("something was entered", errorCode);
    if (this.errorCodes.includes(errorCode)) {
      this.errorCodes.splice(this.errorCodes.indexOf(errorCode), 1);
    }
    console.log(this.errorCodes);
    this.render();
  },

  testEmail: function (event) {
    const regex =
      /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
    if (regex.test(event.target.value)) {
      this.valid(event, "emailError");
    } else {
      this.error(event, "emailError");
    }
  },

  testPassword: function (event) {
    const uCase = /[A-Z]{1,}/;
    const num = /[0-9]{1,}/;
    const special = /[\W]{1,}/;

    // password length
    event.target.value.length < 8
      ? this.error(event, "passLength")
      : this.valid(event, "passLength");

    // password upper case test
    !uCase.test(event.target.value)
      ? this.error(event, "upperCase")
      : this.valid(event, "upperCase");

    // password number
    !num.test(event.target.value)
      ? this.error(event, "number")
      : this.valid(event, "number");

    // special character
    !special.test(event.target.value)
      ? this.error(event, "special")
      : this.valid(event, "special");
  },

  testConPass: function (event) {
    event.target.value !== this.passField.value
      ? this.error(event, "missmatch")
      : this.valid(event, "missmatch");
  },

  testPostCode: function (event) {
    const input = event.target.matches("input");
    if (!input) return;

    const codes = this.form.querySelectorAll(".code-input");
    codes.forEach((code, index) => {
      code.addEventListener("keyup", (event) => {
        if (event.key === "Backspace" && index > 0) {
          console.log(event.key);
          codes[index - 1].focus();
        }
        if (event.target.value !== "" && index < 4) {
          codes[index + 1].focus();
        }
      });
    });
  },
};

validation.init();
