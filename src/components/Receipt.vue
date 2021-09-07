<template>
  <div id="receiptContainer">
    <div class="receipt-box" v-if="store.order">
      <h1>Receipt</h1>
      <br />
      <div className="info">
        <h2 className="mono-font">Your foods & drinks</h2>
        <br />
        <p><b>Dish:</b></p>
        <div id="dishWrap">
          <img className="smallImg" :src="store.order.dish.strMealThumb" alt="img" />
          <h4>{{ store.order.dish.strMeal }}</h4>
        </div>
        <p><b>Drinks:</b></p>
        <div v-for="drink in store.order.drinks" :key="drink" className="receiptDrink">
          <!-- <div className="imgBg"><img className="smallImg" alt="img" :src="drink.image_url" /></div> -->
          <h4>{{ drink }}</h4>
        </div>
        <br /><br />
        <h2 className="mono-font">Your other info</h2>
        <br />
        <p><b>Amount of people:</b> {{ store.order.amount }}</p>
        <p><b>Date:</b> {{ store.order.date }}</p>
        <p><b>Email:</b> {{ store.order.email }}</p>
      </div>
    </div>
    <router-link exact to="/">
      <button className="button">Back to home</button>
    </router-link>
  </div>
</template>

<script>
  import { onMounted, inject } from 'vue';

  export default {
    name: 'Receipt',
    setup() {
      const $store = inject('$store');

      onMounted(() => {
        console.log($store.order);
      });

      return { store: $store };
    }
  };
</script>

<style>
  .receipt-box {
    border: 3px solid rgb(116, 116, 116);
    padding: 80px;
    padding-top: 40px;
  }
</style>
