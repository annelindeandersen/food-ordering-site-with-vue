import { createApp, reactive } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router';

// create reactive data store
const store = reactive({
  order: {
    dish: 'some dish',
    addDish(item) {
      store.order.dish = item;
    },
    drinks: [],
    addDrink(item) {
      store.order.drinks.push(item);
    },
    date: 'today',
    addDate(item) {
      store.order.date = item;
    },
    email: 'test@test.com',
    addEmail(item) {
      store.order.email = item;
    },
    amount: '1',
    addAmount(item) {
      store.order.amount = item;
    }
  }
});

let app = createApp(App);
app.use(router);
// make store global
app.provide('$store', store);
app.mount('#app');
