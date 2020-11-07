<template>
  <header class="header">
        <h1>Contacts</h1>
        <div id="nav">
            <router-link @click.native="filterContacts()" to="/">Home</router-link>|
            <router-link to="/about">About</router-link>  
        </div>
   </header>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
        name : "Header",

  computed : {
     ...mapGetters(['filterContacts']),   
  },

}

</script>


<style scoped>
    .header {
        background: #333;
        color: #fff;
        text-align: center;
        padding: 10px;
    }
    .header a {
        color: #fff;
        padding-right: 5px;
        text-decoration: none;
    }
</style>