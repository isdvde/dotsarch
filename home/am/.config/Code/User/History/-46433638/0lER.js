export class Validator {
  constructor(node) {
    this.$node = node;
    this.validity = node.validity;

    this.result = {
      validate: false,
      message: "",
    };

    this.msgs = {
      valueMissing: 

    }
  }

  validate() {
    if (this.validity.valid) {
      this.result.validate = true;
      return this.result;
    }

    for (let attr in this.validity) {
      if (this.validity[attr]) {
        this.result.message = this.$node.validationMessage;
        this.result.validate = false;
        return this.result;
      }
    }
  }

  isValid() {

    // If field is required and empty
    if (this.validity.valueMissing) return "Debe completar este campo";

    // If not the right type
    if (this.validity.typeMismatch) {
      // Email
      if (field.type === "email") return "Please enter an email address.";

      // URL
      if (field.type === "url") return "Please enter a URL.";
    }

    // If too short
    if (this.validity.tooShort)
      return (
        "Please lengthen this text to " +
        field.getAttribute("minLength") +
        " characters or more. You are currently using " +
        field.value.length +
        " characters."
      );

    // If too long
    if (this.validity.tooLong)
      return (
        "Please shorten this text to no more than " +
        field.getAttribute("maxLength") +
        " characters. You are currently using " +
        field.value.length +
        " characters."
      );

    // If number input isn't a number
    if (this.validity.badInput) return "Please enter a number.";

    // If a number value doesn't match the step interval
    if (this.validity.stepMismatch) return "Please select a valid value.";

    // If a number field is over the max
    if (this.validity.rangeOverflow)
      return (
        "Please select a value that is no more than " +
        field.getAttribute("max") +
        "."
      );

    // If a number field is below the min
    if (this.validity.rangeUnderflow)
      return (
        "Please select a value that is no less than " +
        field.getAttribute("min") +
        "."
      );

    // If pattern doesn't match
    if (this.validity.patternMismatch) {
      // If pattern info is included, return custom error
      if (field.hasAttribute("title")) return field.getAttribute("title");

      // Otherwise, generic error
      return "Please match the requested format.";
    }

    // If all else fails, return a generic catchall error
    return "The value you entered for this field is invalid.";
  }
  // constructor(value, opts) {
  //   this.value = value;
  //   this.result = {
  //     validate: false,
  //     message: "",
  //   };
  //   if (typeof opts === "string") {
  //     this.opts = opts.split(",");
  //   } else {
  //     this.opts = opts;
  //   }
  // }

  // paser_opt(opt) {
  //   opt = opt.split(":");
  //   return {
  //     opt: opt[0],
  //     param: opt[1] || "",
  //   };
  // }

  // validate() {
  //   for (let opt of this.opts) {
  //     let ob = this.paser_opt(opt);
  //     let op = ob.opt;
  //     if (!this[op]({ ...ob, value: this.value })) {
  //       return this.result;
  //     }
  //   }
  //   this.result.validate = true;
  //   return this.result;
  // }

  // lenght(ob) {
  //   if (ob.value.length > parseInt(ob.param)) {
  //     this.result.message = "Tamaño excedido";
  //     return false;
  //   }
  //   return this;
  // }

  // string(ob) {
  //   if (typeof ob.value !== "string") {
  //     this.result.message = "No es un string";
  //     return false;
  //   }
  //   return this;
  // }

  // notnull(ob) {
  //   if(ob.value.length === 0) {
  //     this.result.message = "El elemento no puede estar vacio";
  //     return false;
  //   }
  //   return this;
  // }
}