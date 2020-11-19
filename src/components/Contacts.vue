<template>
  <div class="contacts"> 
    <div class="container">  
      <div class="row justify-content-between"> 
        <div class="col-md-4 col-sm-4">
          <Search v-on:search_event="getSearchValue" />
        </div>
        <div class="col-md-5 col-sm-5">
             <button type="button" class="btn btn-dark" @click="$router.push('/add')">+ Add</button>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <table class="table table-hover">
        <thead>
          <tr>
            <th class="pointer" @click="orderByHeader('id')" scope="col">#</th>
            <th class="pointer" @click="orderByHeader('firstName')" scope="col">First Name</th>
            <th class="pointer" @click="orderByHeader('lastName')" scope="col">Last Name</th>
            <th class="pointer" @click="orderByHeader('tagName')" scope="col">Tag</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody v-for="(data, index) in filteredContacts" :key="index">
          <tr>
            <td class="pointer" @click="detailContact(data.id)" scope="row">{{ contacts.findIndex(x => x.id === data.id)+1 }}</td>
            <td class="pointer" @click="detailContact(data.id)">{{data.firstName}} </td>
            <td class="pointer" @click="detailContact(data.id)">{{data.lastName}}</td>
            <td class="tag"><button id="tag-btn" v-if="data.tagName" type="button" class="btn btn-dark btn-sm" @click="filterContacts(data.tagName,true)">#{{data.tagName}}</button></td>
            <td> 
              <button type="button" class="btn btn-dark" @click="editContact(data.id)">Edit</button>
              <button type="button" class="btn btn-dark" @click="deleteContact(data.id)">Delete</button> 
            </td>
          </tr>
        </tbody>
      </table>
    </div> 
      <h3 v-if="!contacts.length && load">Loading...</h3>
      <h3 v-if="!contacts.length && !load">No data</h3> 
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import Search from "../components/Search.vue";

export default {
  name: "Contacts",
  components: {
    Search,
  },

  data() {
    return {
      searchValue: "",
      sortValue: "id",
      sortOrder: "asc",
    };
  },

  computed: {
    ...mapState(["filteredContacts", "contacts", "load"]),
    ...mapGetters(["loadData", "filterContacts", "orderContactsBy"]),
  },

  methods: {
    getSearchValue(value) {
      this.searchValue = value;
      return this.filterContacts(value);
    },

    orderByHeader(header) {
      this.sortValue = header;
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      return this.orderContactsBy(header, this.sortOrder);
    },

    deleteContact(id) {
      this.$router.push("delete/" + id);
    },
    editContact(id) {
      this.$router.push("edit/" + id);
    },
    detailContact(id) {
      this.$router.push("details/" + id);
    },
  },

  mounted() {
    this.loadData;
    this.filterContacts(this.searchValue);
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.btn {
  margin: 5px 5px;
}
.form-control {
  margin: 5px 5px;
}
.pointer {
  cursor: pointer;
}
</style>
