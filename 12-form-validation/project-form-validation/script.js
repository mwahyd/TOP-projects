const validation = {
  init: function () {
    this.errors = [];
    this.cacheDOM();
    this.listeners();
  },

  cacheDOM: function () {
    this.form = document.querySelector("#form");
    this.errorDiv = this.form.previousElementSibling;
    this.postFields = this.form.querySelectorAll("[data-id]");

    return [
      (this.emailField = this.form.querySelector("#email")),
      (this.passField = this.form.querySelector("#password")),
      (this.conPassField = this.form.querySelector("#conf-password")),
      (this.countryField = this.form.querySelector("#country")),
    ];
  },

  listeners: function () {
    // if user tabs through and ignores fields
    validation.cacheDOM().forEach((field) => {
      field.addEventListener("blur", this.error.bind(this));
      // remove error highlight when data added
      // field.addEventListener("input", validation.removeError);
    });

    // check field after change event
    this.emailField.addEventListener("change", this.testEmail.bind(this));
  },

  testEmail: function (event) {
    const regex =
      /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
    if (regex.test(event.target.value)) {
      this.removeError(event.target, "email-error");
      // remove specific error message
    } else {
      event.target.classList.add("error-highlight");
      // write error message
    }
  },

  error: function (event) {
    // if field empty and blurred
    if (event.type === "blur" && event.target.value === "") {
      event.target.classList.add("error-highlight");
      // write specific error message
      this.raiseError(event.target, "field is empty");
    }
  },

  removeError: function (target, errorCode) {
    target.classList.remove("error-highlight");
    this.errors.splice(this.errors.indexOf(errorCode), 1);
    Array.from(this.errorDiv.children).forEach((element) => {
      if (element.id === errorCode) this.errorDiv.removeChild(element);
    });
  },

  raiseError: function (target, msg) {
    // if error present in error div ignore
    const p = document.createElement("p");
    p.id = target.id + "-error";
    if (this.errors.includes(p.id)) return;

    this.errors.push(p.id);
    p.textContent = `\u2757${target.id} ${msg};`;
    switch (target.id) {
      case "conf-password":
        p.textContent = "\u2757" + "confirm password is empty";
        break;
    }
    this.errorDiv.appendChild(p);
  },
};

validation.init();
