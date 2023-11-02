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
      switch (code) {
        case "Empty":
          p.id = errorCode;
          p.textContent = `\u2757${field} is ${code}`;
          break;
      }
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
  },

  error: function (event) {
    // if field empty and blurred
    if (event.type === "blur" && event.target.value === "") {
      event.target.classList.add("error-highlight");
      this.raiseError(event.target, "Empty");
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
      event.target.classList.remove("error-highlight");
      this.removeError(event.target, "Empty");
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
};

validation.init();
