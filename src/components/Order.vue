<template>
  <div id="">
    <h2>Order details</h2>
    <div id="orderWrapper">
      <div id="date">
        <div id="dateSelect">
          <h4 class="mono-font">1. Pick date</h4>
          <br />
          <div id="dates">
            <!-- <select :value="monthsInYear[month - 1]" @change="(e) => (month.value = e.target.value)" v-model="selectedMonth" id="month"> -->
            <select :value="monthsInYear[month - 1]" @change="(e) => (month = e.target.value)" id="month">
              <option
                v-for="monthInYear in monthsInYear"
                :key="monthInYear"
                :value="monthInYear"
                :disabled="
                  moment()
                    .months(monthInYear)
                    .format('M') < month && year === year
                "
              >
                {{ monthInYear }}
              </option>
            </select>
            <!-- <select :value="day" @change="(e) => (day.value = e.target.value)" v-model="selectedDay" id="day"> -->
            <select :value="day" @change="(e) => (day = e.target.value)" id="day">
              <option v-for="days in dayRows" :key="days.value" :value="days.value" :disabled="days.date === 6 || days.date === 0"> {{ days.value }} - {{ days.text }} </option>
            </select>
            <!-- <select :value="year" @change="(e) => (year.value = e.target.value)" v-model="selectedYear" id="year"> -->
            <select :value="year" @change="(e) => (year = e.target.value)" id="year">
              <option v-for="year in yearRows" :key="year.year" :value="year.year">
                {{ year.year }}
              </option>
            </select>
          </div>
          <br />
          <div id="timeSelect">
            <div>
              <h4 class="mono-font">2. Pick time</h4>
              <br />
              <select @change="(e) => (time = e.target.value)" :value="time" id="time">
                <option value="16">4:00 PM</option>
                <option value="17">5:00 PM</option>
                <option value="18">6:00 PM</option>
                <option value="19">7:00 PM</option>
                <option value="20">8:00 PM</option>
                <option value="21">9:00 PM</option>
                <option value="22">10:00 PM</option>
                <option value="23">11:00 PM</option>
              </select>
            </div>
            <div>
              <h4 class="mono-font">3. Select amount of people</h4>
              <br />
              <div id="amount">
                <img @click="minusPeople" class="amountImg lessPeople" :class="{ hidden: amount === 1 || amount < 1 || isNaN(amount), visible: amount > 1 }" src="../assets/less.png" alt="less" />
                <input type="number" min="1" max="10" maxLength="2" :value="amount" @change="amountOnChange" />
                <img @click="addPeople" class="amountImg addPeople" :class="{ hidden: amount === 10 || amount > 10, visible: amount < 10 }" src="../assets/more.png" alt="more" />
                <!-- ,{"hidden": amount === 10 || amount > 10, "visible": amount < 10 })}  -->
              </div>
              <!-- <div class="errorBoxMargin">
                <p id="errorAmount">{{ errorAmount }}</p>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div id="emailWrapper">
        <div id="selection">
          <h4 class="mono-font">Selected date & time:</h4>
          <br />
          <p>{{ dateSelected }}</p>
          <br />
          <h4 class="mono-font">Selected amount:</h4>
          <br />
          <p v-text="amount >= 1 && amount <= 10 ? amount + ' people' : 'Choose people'"></p>
        </div>
        <div id="email">
          <h4 class="mono-font">4. Enter your email</h4>
          <br />
          <input placeholder="Enter email" id="emailInput" name="email" type="email" @change="(e) => (email = e.target.value)" />
          <div class="errorBoxMargin">
            <!-- <p id="error">{{ errorEmail }}</p> -->
          </div>
          <router-link exact to="/receipt">
            <button @click="store.order.addDate(dateSelected), store.order.addEmail(email), store.order.addAmount(amount)" class="button">Order now</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { onBeforeMount, onMounted, ref, inject } from 'vue';
  import moment from 'moment';

  export default {
    name: 'Order',
    setup() {
      const $store = inject('$store');

      const month = ref(new Date().getMonth() + 1);
      const year = ref(moment().year());
      const day = ref('');
      const amount = ref(1);
      const dateSelected = ref('');
      const email = ref(null);

      console.log(email.value);
      // const orderButton = ref('Order');
      // const errorAmount = ref('');
      const time = ref(16);
      const today = new Date();

      const monthsInYear = ref(moment.months());
      const daysInMonth = ref(moment(`${year.value}-${month.value}`).daysInMonth());

      let dayRows = ref([]);
      for (let i = 1; i < daysInMonth.value + 1; i++) {
        const date = moment(`${year.value}-${month.value}-${i}`).weekday();
        const dateText = moment.weekdays(date);
        dayRows.value.push({ date: date, text: dateText, value: i });
      }

      let yearRows = ref([]);
      let startYear = year.value;
      const endYear = year.value + 4;
      for (startYear; startYear <= endYear; startYear++) {
        yearRows.value.push({ year: startYear });
      }

      const addPeople = () => {
        amount.value += 1;
        if (amount.value >= 1 && amount.value <= 10) {
          // errorAmount.value = '';
        }
        if (isNaN(amount.value) === true) {
          amount.value = 1;
        } else if (amount.value > 10) {
          amount.value -= 1;
          console.log(amount.value);
        }
      };

      const minusPeople = () => {
        amount.value -= 1;
        if (amount.value >= 1 && amount.value <= 10) {
          // errorAmount.value = '';
        }
        if (amount.value < 0 || amount.value === 0) {
          amount.value += 1;
          console.log(amount.value);
        }
      };

      const amountOnChange = (event) => {
        let amountValue = parseInt(event.target.value);
        console.log(amountValue);
        // let wrongAmount = 'Sorry, amount has to be between 1 and 10';
        // let noAmount = 'Add a number or use arrows';
        // amount.value = amountValue;
        // $store.order.addAmount(amountValue);
        // console.log(amount.value, errorAmount);
        // if (amountValue < 1) {
        //   errorAmount.value = wrongAmount;
        // } else if (amountValue > 10) {
        //   errorAmount.value = wrongAmount;
        // } else if (isNaN(amountValue) === true) {
        //   errorAmount.value = noAmount;
        // } else {
        //   errorAmount.value = '';
        // }
      };

      const orderNow = () => {
        dateSelected.value = moment(new Date(year.value, month.value - 1, day.value, time.value)).format('LLLL');
        $store.order.addAmount(amount.value);
        $store.order.addEmail(email.value);
        $store.order.addDate(dateSelected.value);
      };

      onBeforeMount(() => {
        day.value = moment(today).date();
        dateSelected.value = moment(new Date(year.value, month.value - 1, day.value, time.value)).format('LLLL');
      });

      onMounted(() => {
        console.log(day.value, month.value, year.value, time.value);
      });

      return { store: $store, orderNow, addPeople, minusPeople, amountOnChange, amount, dateSelected, year, month, day, email, time, monthsInYear, moment, dayRows, yearRows };
    }
  };
</script>

<style>
  #orderWrapper {
    padding-left: 10%;
    padding-right: 10%;
  }
  .mono-font {
    font-family: monospace;
    text-transform: uppercase;
    color: #333;
    margin-bottom: 10px;
    font-size: 20px;
  }
  #orderWrapper input,
  #orderWrapper select {
    border-radius: 0px;
    border: 3px solid rgb(116, 116, 116);
    background: none;
    box-shadow: none;
  }
</style>
