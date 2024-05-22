import { SCSInput } from "./scs-input";
import { Validator } from "../libs/validator.js";

export class SCSInputPrice extends SCSInput {
    constructor(opts) {
        super(opts);
        this.$input.oninput = function (e) {
            let val = e.target.value;
            e.target.value = this.format_price(val);
        }.bind(this);
    }

    format_price(val) {
        let value = val.replace(/[^\d]+/g, "");

        let whole_part = value.slice(0, -2);
        let decimal_part = value.slice(-2);

        let formattedValue = whole_part
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            .replace(/(0)(?=\d+)/g, "");

        formattedValue += `,${decimal_part}`;
        return "VED " + formattedValue;
    }

    validate() {
        if (!this.$select.value) {
            this.validation = {
                validate: false,
                message: "Debe elegir una opcion",
            };
        } else {
            this.validation = {
                validate: true,
                message: "",
            };
        }

        this.show_validation_error();
        return this.validation;
    }

    show_validation_error() {
        if (!this.validation.validate) {
            this.$invalid.textContent = this.validation.message || "";
            this.$invalid.style.display = "block";
            return this;
        }
        this.$invalid.style.display = "none";
        return this;
    }
}

customElements.define('scs-input-price', SCSInputPrice);