<template>
<div class="container">
  <form>
    <div class="form-group row">
      <label for="firstName" class="col-sm-2 col-form-label">First name:</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" id="firstName" placeholder="Enter fist name..." v-model="model.firstName">
          <p v-if="!model.firstName && validate" class="error-message">The first name field is required</p>
        </div>
    </div>
    <div class="form-group row">
      <label for="lastName" class="col-sm-2 col-form-label">Last name:</label>
        <div class="col-sm-8">
        <input type="text" class="form-control" id="lastName" placeholder="Enter last name..." v-model="model.lastName">
        <p v-if="!model.lastName && validate" class="error-message">The last name field is required</p>
        </div>
    </div>
    <div  v-if="model.street || showInputInView()" class="form-group row">
      <label for="street" class="col-sm-2 col-form-label">Street:</label>
        <div class="col-sm-8">
        <input type="text" class="form-control" id="street" placeholder="Enter street..." v-model="model.street">
        </div>
    </div>
    <div v-if="model.city || showInputInView()" class="form-group row">
      <label for="city" class="col-sm-2 col-form-label">City:</label>
        <div class="col-sm-8">
        <input type="text" class="form-control" id="city" placeholder="Enter city..." v-model="model.city">
        </div>
    </div>
    <div v-for="(data, index) in model.phoneNumbers" :key="'phone'+index">
      <div class="form-group row">
        <label for="phoneNumber" class="col-sm-2 col-form-label">Phone {{index+1}}:</label>
          <div class="col-sm-8">
            <input v-on:keyup="addNewInput(model.phoneNumbers)" type="text" class="form-control" id="phoneNumber" placeholder="Enter phone number..." v-model="model.phoneNumbers[index]">
            <p v-if="!validatePhoneNumber(model.phoneNumbers[index]) && validate" class="error-message">The phone number is invalid</p>
            <p v-if="data.length<2 && model.emails.length<2 && index===0 && validate" class="error-message">phone number or e-mail is required</p>
          </div>
      </div> 
    </div> 
    <div v-for="(data, index) in model.emails" :key="'email'+index">
      <div class="form-group row">
        <label for="email" class="col-sm-2 col-form-label">E-mail {{index+1}}:</label>
          <div class="col-sm-8">
            <input v-on:keyup="addNewInput(model.emails)" type="text" class="form-control" id="email" placeholder="Enter e-mail..." v-model="model.emails[index]">
            <p v-if="!validateEmail(model.emails[index]) && validate" class="error-message">The e-mail is invalid</p>
            <p v-if="data.length<2 && model.phoneNumbers.length<2 && index===0 && validate" class="error-message"> e-mail or phone number is required</p>
          </div>
      </div> 
    </div> 
    <div v-if="model.tagName || showInputInView()" class="form-group row">
      <label for="tagName" class="col-sm-2 col-form-label">Tag:</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" id="tagName" placeholder="Enter tag..." v-model="model.tagName">
        </div>
    </div>
  </form>
</div>
</template>

<script>
export default {
  name: "ContactForm",
  props: {
    model: {
      firstName: String,
      lastName: String,
      street: String,
      city: String,
      phoneNumbers: Array,
      emails: Array,
      tagName: String,
    },
    validate: Boolean,
  },

  data() {
    return {
      isValid: false,
    };
  },

  methods: {
    addNewInput(inputs) {
      let inputSize = inputs.length,
        i = 0;
      for (const input of inputs) input.length > 0 ? i++ : false;

      i >= inputSize
        ? inputs.push("")
        : inputSize > i + 1
        ? inputs.pop()
        : false;
    },
    showInputInView() {
      if (this.$route.name !== "details" && this.$route.name !== "delete")
        return true;

      return false;
    },

    validatePhoneNumber(phone) {
      if (phone.length > 0) {
        let test = /^(\+{0,})(\d{0,})([(|d{0}]{1}\d{1,3}[)|/]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm.test(
          phone
        );
        this.isValid = test;
        return test;
      }
      return true;
    },

    validateEmail(email) {
      if (email.length > 0) {
        let test = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(
          email
        );
        this.isValid = test;
        return test;
      }
      return true;
    },

    validateForm() {
      if (
        !this.model.firstName ||
        !this.model.lastName ||
        (this.model.phoneNumbers.length < 2 && this.model.emails.length < 2)
      )
        this.isValid = false;

      this.$emit("validate_event", this.isValid);
    },
  },
};
</script>

<style scoped>
.col-form-label {
  font-weight: bold;
}
.error-message {
  color: red;
}
.container {
  width: 70%;
}
</style>
