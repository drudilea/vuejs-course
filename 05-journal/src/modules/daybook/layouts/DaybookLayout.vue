<template>
  <Navbar />
  <div class="d-flex">
    <div class="col-4"><EntryList /></div>
    <div class="col">
      <router-view />
    </div>
  </div>
</template>
<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    Navbar: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "daybook-navbar" */
        "../components/Navbar.vue"
      )
    ),
    EntryList: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "daybook-entry-list" */
        "../components/EntryList.vue"
      )
    ),
  },
};
</script>