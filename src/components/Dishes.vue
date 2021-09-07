<template>
  <h1>YOU PICKED THIS DISH, NOW EAT IT</h1>
  <div id="dishesContainer" v-if="dish.data">
    <div className="dish-container">
      <div v-for="(key, index) in dish.data.meals" :key="index">
        <img className="dish-image" :src="key.strMealThumb" alt="img" />
        <h3 className="dish-title">{{ key.strMeal }}</h3>
        <p className="dish-desc">{{ key.strCategory }} // {{ key.strArea }}</p>
      </div>
      <button @click="getNewApi" className="button">Generate new</button>
    </div>
    <div class="next-box">
      <h3>Pick drinks next</h3>
      <br />
      <div class="current-choice">
        <i>Your current dish choice:</i>
        <p>
          {{ dish.data.meals[0].strMeal }}
        </p>
      </div>
      <br />
      <router-link exact to="/order">
        <button @click="store.order.addDish(dish.data.meals[0])" className="button">Next</button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { onMounted, ref, inject } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';

  export default {
    name: 'Dishes',
    setup() {
      const dishId = useRouter().currentRoute.value.query.id;
      const $store = inject('$store');

      const dish = ref([]);

      const getApi = async () => {
        await axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + dishId.replace(/['"]+/g, '')).then((result) => {
          dish.value = result;
        });
      };

      const getNewApi = async () => {
        await axios.get('https://www.themealdb.com/api/json/v1/1/random.php?').then((result) => {
          dish.value = result;
        });
      };

      console.log(dishId.replace(/['"]+/g, ''));

      onMounted(() => {
        getApi();
      });

      return { dish, getApi, getNewApi, store: $store };
    }
  };
</script>

<style>
  .dish-container,
  .next-box {
    margin-top: 50px;
  }
  .next-box {
    border: 3px solid rgb(116, 116, 116);
    padding: 30px;
    padding-top: 40px;
    height: 250px;
  }
  .dish-desc {
    font-family: monospace;
    text-transform: uppercase;
    color: #333;
    margin-bottom: 50px;
  }
  .current-choice i,
  .current-choice p {
    font-family: monospace;
    text-transform: uppercase;
    color: #333;
  }
  .dish-title {
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
