<template>
    <div id="add">
      <h2>Add</h2>
      <div class="container">        
          <ContactForm :model="inputContact"  :validate='this.validate' v-on:validate_event="getValidation" ref="form"/>       
          <button type="button" class="btn btn-dark" @click="handleSubmit">Add</button> 
          <button type="button" class="btn btn-dark" @click="$router.push('/')">Cancel</button>
      </div>
    </div>
</template>


<script>
import { mapActions } from 'vuex'
import ContactForm from '../components/ContactForm.vue'

export default {
  name: 'Add',
  components : {
      ContactForm
  },
  data() {
    return {
   
    inputContact : {
        firstName : '',  
        lastName : '', 
        street : '', 
        city : '',
        phoneNumbers : [''], 
        emails : [''], 
        tagName : ''},

      validate : false,
      isFormValid : false
    }
  },


  methods : {
    ...mapActions(['addContact']),

    getValidation(value){
        this.isFormValid = value;
    },

    handleSubmit(){
      this.validate=true;
      this.$refs.form.validateForm();

      if (this.isFormValid) {
      
          if (this.inputContact.phoneNumbers)
              this.inputContact.phoneNumbers = this.inputContact.phoneNumbers.filter(item => item);
       
          let phones = [];
          for (const phone of this.inputContact.phoneNumbers){
              if (phone.length>0)
                phones.push(phone)
          }

        if (this.inputContact.emails)
            this.inputContact.emails = this.inputContact.emails.filter(item => item);

          let emails = [];
          for (const email of this.inputContact.emails){
              if (email.length>0)
                emails.push(email.toLowerCase())
          }
          
            const payload = {
               
                firstName : this.inputContact.firstName,
                lastName : this.inputContact.lastName,
                street : this.inputContact.street,
                city : this.inputContact.city,
                phoneNumbers : phones,
                emails : this.emails,
                tagName : this.inputContact.tagName
            }

          this.addContact(payload)
  
          this.$router.push('/');
      }
    }
  }
}
</script>

<style scoped>
  .btn {
  margin : 5px 5px;
}
</style>
