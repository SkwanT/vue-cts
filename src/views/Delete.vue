<template>
    <div id="delete">
       <h2>Delete</h2>
       <div class="container">    
          <ContactForm :model="inputContact" />    
        </div>
        <h4><strong>Are You sure you want to Delete this entry?</strong></h4>
        <button type="button" class="btn btn-dark" @click="deleteContact(inputContact.id), $router.push('/')">Delete</button>
        <button type="button" class="btn btn-dark" @click="$router.push('/')">Cancel</button>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ContactForm from "../components/ContactForm.vue";
import { fdisable } from "../shared/f-disable";
import { contactModel } from "../shared/contact-model";

export default {
  name: "Delete",

  components: {
    ContactForm,
  },

  mixins: [fdisable],

  data() {
    return {
      inputContact: { ...contactModel },
    };
  },
  computed: {
    ...mapState(["contacts"]),
  },

  methods: {
    ...mapActions(["deleteContact"]),
  },

  mounted() {
    let index = this.contacts.findIndex(
      (x) => x.id === Number(this.$route.params.id)
    );
    const contact = this.contacts[index];
    contact
      ? (this.inputContact = contact)
      : this.$router.push("/pagenotfound");
  },
};
</script>

<style scoped>
.btn {
  margin: 5px 5px;
}
</style>
