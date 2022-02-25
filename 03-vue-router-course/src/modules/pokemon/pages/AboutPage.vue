<template>
  <h1>About Page</h1>
  <hr />
  <h4>{{ name }}</h4>
  <button @click="onChangeName">Change name</button>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      name: 'About Page',
    };
  },
  methods: {
    onChangeName() {
      this.name = 'About Page Changed';
    },
  },
  beforeCreate() {
    console.log('AboutPage.beforeCreate()');
  },
  created() {
    console.log('AboutPage.created()');
    // HTTP request
  },
  mounted() {
    console.log('AboutPage.mounted()');
  },
  beforeUpdate() {
    console.log('AboutPage.beforeUpdate()');
  },
  updated() {
    console.log('AboutPage.updated()');
  },
  activated() {
    console.log('AboutPage.activated()');
  },
  deactivated() {
    console.log('AboutPage.deactivated()');
  },
  beforeUnmount() {
    console.log('AboutPage.beforeUnmount()');
  },
  unmounted() {
    console.log('AboutPage.unmounted()');
  },
  errorCaptured() {
    console.log('AboutPage.errorCaptured()');
  },
  renderTracked() {
    console.log('AboutPage.renderTracked()');
  },
  renderTriggered() {
    console.log('AboutPage.renderTriggered()');
  },
};
</script>
