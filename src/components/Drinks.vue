<template>
  <h1>TIME TO SELECT BOOZE</h1>
  <div v-if="drinks" id="drinksContainer">
    <div v-if="drinks && drinks[0].data" class="drinks-box">
      <div v-for="(drink, index) in drinks[0].data" :key="index" @click="toggleDrink({ drink })" class="drink-box">
        <div v-if="selectedDrinkIds" :class="{ 'selected-drink': selectedDrinkIds.indexOf(drink.name) >= 0 }"></div>
        <img class="drinkImg" :src="drink.image_url" alt="img" />
        <h4 class="drink-title">{{ drink.name }}</h4>
      </div>
    </div>
    <div class="next-box">
      <h3>Pick date and amount next</h3>
      <br />
      <i>Your current drinks choice:</i>
      <br />
      <div class="selectedDrink" v-for="drink in selectedDrinks" :key="drink">
        <div>
          <div class="imgBg"><img class="smallImg" :src="drink.image_url" alt="img" /></div>
          <b>{{ drink.name }}</b>
        </div>
        <div class="unSelect" @click="toggleDrink({ drink })">X</div>
      </div>
      <br />
      <span v-if="selectedDrinkIds.length > 0">
        <router-link exact to="/order">
          <button @click="setDrinkOrError" class="button">Next</button>
        </router-link>
      </span>
      <button v-else @click="setDrinkOrError" class="button">Next</button>
      <b id="drinksError">{{ message }}</b>
    </div>
  </div>
</template>

<script>
  import { onBeforeMount, ref, inject } from 'vue';
  import axios from 'axios';

  export default {
    name: 'Drinks',
    setup() {
      const $store = inject('$store');

      let drinks = ref([]);
      let selectedDrinkIds = ref([]);
      let selectedDrinks = ref([]);
      let message = ref('');

      const getApi = async () => {
        await axios.get('https://api.punkapi.com/v2/beers').then((result) => {
          drinks.value.push(result);
        });
      };

      // toggle drink choices - if already clicked, remove it
      const toggleDrink = ({ drink }) => {
        const drinksArr = [...selectedDrinkIds.value];
        if (!drink) {
          return;
        }
        if (drink.name) {
          const selectedDrink = drinksArr.indexOf(drink.name);
          if (selectedDrink >= 0) {
            drinksArr.splice(selectedDrink, 1);
            // remove from store?
          } else {
            drinksArr.push(drink.name);
            $store.order.addDrink(drink.name);
          }
          selectedDrinkIds.value = drinksArr;
          selectedDrinks.value = drinks.value[0].data.filter((drink) => selectedDrinkIds.value.indexOf(drink.name) >= 0);
        }
        console.log(selectedDrinkIds.value, selectedDrinks.value, drinks.value);
      };

      // if drinks are selected set them or throw error
      const setDrinkOrError = () => {
        // setSaveDrinks(selectedDrinks);
        // console.log(saveDrinks);
        message.value = '';
        if (selectedDrinks.value.length === 0) {
          console.log('no saved drinks');
          message.value = 'Please select your drink!';
        }
      };

      onBeforeMount(() => {
        getApi();
      });

      return { store: $store, drinks, toggleDrink, selectedDrinkIds, selectedDrinks, setDrinkOrError, message };
    }
  };
</script>

<style scoped>
  #drinksContainer .next-box {
    height: 80vh;
  }
  .selected-drink {
    background: rgba(255, 0, 255, 0.13);
    height: 65%;
    width: 65%;
    position: absolute;
  }
  .drinks-box {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    margin-top: 50px;
  }
  .drink-box {
    background: rgb(116, 116, 116);
    padding: 20px;
    padding-left: 70px;
    padding-right: 70px;
    position: relative;
  }
  .drink-title {
    max-width: 400px;
    color: hsla(0, 0%, 0%, 0.9);
    font: normal 25px Varela Round, sans-serif;
    height: 50px;
    left: -70px;
    /* top: 70px; */
    letter-spacing: 5px;
    /* margin: -80px 0 0 0; */
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
