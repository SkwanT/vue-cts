<template>
    <div class="input-group input-group-sm">
        <input v-model="searchValue" type="text" @keyup.enter="performSearch()" class="form-control" placeholder="Search..." aria-label="Search" aria-describedby="button-addon2">
        <span class="input-group-btn">
            <button class="btn btn-dark btn-sm" @click="performSearch()" type="submit">Search</button>
        </span>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Search",

  data() {
    return {
      searchValue: "",
    };
  },

  computed: {
    ...mapGetters(["filterContacts"]),
  },
  methods: {
    performSearch() {
      this.$emit("search_event", this.searchValue);
    },
  },
};
</script>
