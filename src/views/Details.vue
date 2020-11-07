<template>
    <div id="details">
        <h2>Details</h2>    
        <div class="container">    
           <ContactForm :model="inputContact" />    
        </div>
        <button type="button" class="btn btn-dark" @click="$router.push('/')">Back</button>
        <button type="button" class="btn btn-dark" @click="$router.push('../edit/'+$route.params.id)">Edit</button>
    </div>
</template>


<script>
import { mapState } from 'vuex'
import ContactForm from '../components/ContactForm.vue'
import { fdisable } from '../shared/f-disable'
import { contactModel } from '../shared/contact-model'

export default {
  name: 'Details',

  components : {
    ContactForm
  },

  mixins : [fdisable],

  data() {
    return {
     
       inputContact : {...contactModel},
    }
  },
  computed : {
      ...mapState(['contacts']),   
  },

  mounted() {
      let index = this.contacts.findIndex(x => x.id === Number(this.$route.params.id));
      const contact = this.contacts[index];
      contact ? this.inputContact = contact : this.$router.push('/pagenotfound')  
    },
}
</script>

<style scoped>
  .btn {
  margin : 5px 5px;
}
</style>