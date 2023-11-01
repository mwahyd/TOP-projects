const validation = {
  init: function () {
    validation.cacheDOM();
    validation.listeners();
  },

  cacheDOM: function () {
    return [
      (this.form = document.querySelector("#form")),
      (this.errorDiv = this.form.previousElementSibling),
      (this.emailField = this.form.querySelector("#email")),
      (this.passField = this.form.querySelector("#password")),
      (this.conPassField = this.form.querySelector("#conf-password")),
      (this.countryField = this.form.querySelector("#country")),
      (this.postFields = this.form.querySelectorAll("[data-id]")),
    ];
  },

  listeners: function () {
    // check field after change event
    this.emailField.addEventListener("change", validation.testEmail);
  },

  testEmail: function (event) {
    console.log("hello");
  },
};

validation.init();
