<template>
  <div class="meal-wrapper">
    <div class="" v-for="dish in dishes" :key="dish">
      <router-link exact :to="`/dishes?id='${dish.idMeal}'`" class="meal-container">
        <h2 class="meal-name">{{ dish.strMeal }}</h2>
        <img className="meal-img" :src="dish.strMealThumb" alt="img" />
      </router-link>
    </div>
  </div>
</template>

<script>
  import { onMounted, inject, ref } from 'vue';
  import axios from 'axios';

  export default {
    name: 'Home',
    setup() {
      const $store = inject('$store');

      const dishes = ref([]);

      const getApi = async () => {
        await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=s').then((result) => {
          console.log(result);
          dishes.value = result.data.meals.splice(7, 12);
        });
      };

      console.log(dishes.value);

      onMounted(() => {
        getApi();
        console.log($store.order.dish);
      });

      return { dishes, getApi, store: $store };
    }
  };
</script>

<style scoped>
  .meal-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .meal-container {
    position: relative;
    display: flex;
  }
  .meal-img {
    height: 100%;
    width: 100%;
    opacity: 0.8;
  }
  .meal-name {
    max-width: 400px;
    color: hsla(0, 0%, 0%, 0.9);
    font: normal 50px Varela Round, sans-serif;
    height: 50px;
    left: 70;
    top: 400px;
    letter-spacing: 5px;
    margin: -80px 0 0 0;
    position: absolute;
    text-align: center;
    text-transform: uppercase;
    top: 50%;
    width: 100%;
    animation: move linear 2000ms infinite;
    z-index: 10;
  }

  @keyframes move {
    0% {
      text-shadow: 4px -4px 0 hsla(0, 100%, 50%, 1), 3px -3px 0 hsla(0, 100%, 50%, 1), 2px -2px 0 hsla(0, 100%, 50%, 1), 1px -1px 0 hsla(0, 100%, 50%, 1), -4px 4px 0 hsla(180, 100%, 50%, 1), -3px 3px 0 hsla(180, 100%, 50%, 1), -2px 2px 0 hsla(180, 100%, 50%, 1), -1px 1px 0 hsla(180, 100%, 50%, 1);
    }
    25% {
      text-shadow: -4px -4px 0 hsla(180, 100%, 50%, 1), -3px -3px 0 hsla(180, 100%, 50%, 1), -2px -2px 0 hsla(180, 100%, 50%, 1), -1px -1px 0 hsla(180, 100%, 50%, 1), 4px 4px 0 hsla(0, 100%, 50%, 1), 3px 3px 0 hsla(0, 100%, 50%, 1), 2px 2px 0 hsla(0, 100%, 50%, 1), 1px 1px 0 hsla(0, 100%, 50%, 1);
    }
    50% {
      text-shadow: -4px 4px 0 hsla(0, 100%, 50%, 1), -3px 3px 0 hsla(0, 100%, 50%, 1), -2px 2px 0 hsla(0, 100%, 50%, 1), -1px 1px 0 hsla(0, 100%, 50%, 1), 4px -4px 0 hsla(180, 100%, 50%, 1), 3px -3px 0 hsla(180, 100%, 50%, 1), 2px -2px 0 hsla(180, 100%, 50%, 1), 1px -1px 0 hsla(180, 100%, 50%, 1);
    }
    75% {
      text-shadow: 4px 4px 0 hsla(180, 100%, 50%, 1), 3px 3px 0 hsla(180, 100%, 50%, 1), 2px 2px 0 hsla(180, 100%, 50%, 1), 1px 1px 0 hsla(180, 100%, 50%, 1), -4px -4px 0 hsla(0, 100%, 50%, 1), -3px -3px 0 hsla(0, 100%, 50%, 1), -2px -2px 0 hsla(0, 100%, 50%, 1), -1px -1px 0 hsla(0, 100%, 50%, 1);
    }
    100% {
      text-shadow: 4px -4px 0 hsla(0, 100%, 50%, 1), 3px -3px 0 hsla(0, 100%, 50%, 1), 2px -2px 0 hsla(0, 100%, 50%, 1), 1px -1px 0 hsla(0, 100%, 50%, 1), -4px 4px 0 hsla(180, 100%, 50%, 1), -3px 3px 0 hsla(180, 100%, 50%, 1), -2px 2px 0 hsla(180, 100%, 50%, 1), -1px 1px 0 hsla(180, 100%, 50%, 1);
    }
  }
</style>
