const validation = {
  init: function () {
    validation.cacheDOM();
    validation.listeners();
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
      field.addEventListener("blur", validation.error);
    });

    // check field after change event
    this.emailField.addEventListener("change", validation.testEmail);
  },

  testEmail: function (event) {
    const regex =
      /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
    if (regex.test(event.target.value)) {
      console.log("pass");
    } else {
      console.log("fail");
    }
  },

  error: function (event) {
    // if field empty and blurred
    if (event.type === "blur" && event.target.value === "") {
      event.target.classList.add("error-highlight");
    }
  },
};

validation.init();
