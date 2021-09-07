<template>
  <div class="App">
    <NavBar />
    <router-view :key="route"></router-view>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue';
  import { useRouter } from 'vue-router';

  export default {
    name: 'App',
    components: {
      NavBar
    },
    setup() {
      const route = useRouter().currentRoute.value.path;
      console.log(route);

      return { route };
    }
  };
</script>
