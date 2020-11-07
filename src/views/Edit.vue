<template>
    <div id="edit">
      <h2>Edit</h2>
      <div class="container">    
        <ContactForm :model="inputContact"  :validate='this.validate' v-on:validate_event="getValidation" ref="form"/> 
      </div>
      <button type="button" class="btn btn-dark" @click="editPrep()">Save</button>
      <button type="button" class="btn btn-dark" @click="clearInput(), $router.push('/')">Cancel</button>  
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ContactForm from '../components/ContactForm.vue'
import { contactModel } from '../shared/contact-model'

export default {
  name: 'Edit',

  components : {
    ContactForm
  },
  data() {
    return {
      inputContact : {...contactModel},
      validate : false,
      isFormValid : false
    }
  },
  computed : {
      ...mapState(['contacts'])
  },

  methods : {
    ...mapActions(['editContact']),

    getValidation(value){
      this.isFormValid=value;
    },

    editPrep(){
      this.validate=true;
      this.$refs.form.validateForm();

      if (this.isFormValid) {
          this.clearInput();
          this.editContact(this.inputContact);
          this.$router.push('/');
      }

    },

    clearInput(){
      if (this.inputContact.phoneNumbers)
          this.inputContact.phoneNumbers = this.inputContact.phoneNumbers.filter(item => item);

      if (this.inputContact.emails)
          this.inputContact.emails = this.inputContact.emails.filter(item => item);
    }
  },

  mounted() {
      let index = this.contacts.findIndex(x => x.id === Number(this.$route.params.id));
      const contact = this.contacts[index];
      contact ? this.inputContact = contact : this.$router.push('/pagenotfound')
    
      this.inputContact.phoneNumbers.push(''); 
      this.inputContact.emails.push('');
  },
}
</script>

<style scoped>
  .btn {
  margin : 5px 5px;
}
</style>