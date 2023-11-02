const validation = {
  init: function () {
    this.errorCodes = [];
    this.cacheDOM();
    this.listeners();
  },

  cacheDOM: function () {
    this.form = document.querySelector("#form");
    this.errorDiv = this.form.previousElementSibling;
    this.postFields = this.form.querySelector("[data-id]");

    return [
      (this.emailField = this.form.querySelector("#email")),
      (this.passField = this.form.querySelector("#password")),
      (this.conPassField = this.form.querySelector("#conf-password")),
      (this.countryField = this.form.querySelector("#country")),
    ];
  },

  render: function () {
    this.errorDiv.innerHTML = "";
    this.errorCodes.forEach((errorCode) => {
      const [field, code] = errorCode.split(/(?=[A-Z])/);
      const p = document.createElement("p");
      p.id = errorCode;
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
  },

  error: function (event) {
    // if field empty and blurred
    if (event.type === "blur" && event.target.value === "") {
      event.target.classList.add("empty-highlight");
      this.raiseError(event.target, "Empty");
    } else if (event.type === "change") {
      event.target.classList.add("error-highlight");
      this.raiseError(event.target, "Invalid");
    }
  },

  raiseError: function (target, code) {
    const errorCode = target.id + code;
    if (this.errorCodes.includes(errorCode)) return;
    this.errorCodes.push(errorCode);
    console.log(this.errorCodes);
    this.render();
  },

  valid: function (event) {
    // if field contains data
    if (event.type === "blur" && event.target.value !== "") {
      // - creates bug which does not let error highlight to be added when change event
      event.target.classList.remove("empty-highlight");
      this.removeError(event.target, "Empty");
    } else if (event.type === "change") {
      event.target.classList.remove("error-highlight");
      this.removeError(event.target, "Invalid");
      console.log(event.target);
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
      this.valid(event);
    } else {
      this.error(event);
    }
  },
};

validation.init();
