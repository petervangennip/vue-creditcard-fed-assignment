<template>
  <div class="card-form p-5">
    <form class="form-group mb-5" autocomplete="off">
      <label :for="fields.cardName" class="form-control-label">
        <input
          :id="fields.cardName"
          :value="formData.cardName"
          :maxlength="cardNumberMaxLength"
          @input="changeName"
          @focus="handleFocus"
          @blur="handleBlur"
          type="text"
          class="form-control"
          required
          data-tag="card-name"
        />
        <span>Card holder name</span>
      </label>
    </form>
    <form class="form-group mb-5" autocomplete="off">
      <label :for="fields.cardNumber" class="form-control-label">
        <input
          :id="fields.cardNumber"
          :value="formData.cardNumber"
          @input="changeNumber"
          :maxlength="cardNumberMaxLength"
          class="form-control"
          required
        />
        <span>Card number</span>
      </label>
    </form>
    <div class="form-group mb-5">
      <div class="form-row">
        <div class="col">
          <label :for="fields.cardMonth" class="form-control-label">
            <input
              :id="fields.cardMonth"
              :value="formData.cardMonth"
              :maxlength="cardMonthYearMaxLength"
              @input="changeMonth"
              class="form-control"
              required
            />
            <span>month</span>
          </label>
        </div>
        <div class="col">
          <label :for="fields.cardYear" class="form-control-label">
            <input
              :id="fields.cardYear"
              :value="formData.cardYear"
              :maxlength="cardMonthYearMaxLength"
              @input="changeYear"
              class="form-control"
              required
            />
            <span>year</span>
          </label>
        </div>
        <div class="col">
          <label :for="fields.cardCvv" class="form-control-label">
            <input
              :id="fields.cardCvv"
              :value="formData.cardCvv"
              :maxlength="cardCvvMaxLength"
              @input="changeCvv"
              @focus="handleCvvFocus"
              @blur="handleCvvBlur"
              class="form-control"
              required
            />
            <span>cvv</span>
          </label>
        </div>
      </div>
    </div>
    <the-card :fields="fields" :labels="formData" :cvvFocus="cvvFocus" :cvvBlur="cvvBlur" />
  </div>
</template>

<script>
import TheCard from '@/components/molecules/form/TheCard.vue';

export default {
  name: 'TheForm',
  components: {
    TheCard,
  },
  props: {
    formData: {
      type: Object,
      default: () => {
        return {
          cardName: '',
          cardNumber: '',
          cardMonth: '',
          cardYear: '',
          cardCvv: '',
        };
      },
    },
  },
  data() {
    return {
      fields: {
        cardNumber: 'card-number',
        cardName: 'card-name',
        cardMonth: 'card-month',
        cardYear: 'card-year',
        cardCvv: 'card-cvv',
      },
      minCardYear: new Date().getFullYear(),
      mainCardNumber: this.cardNumber,
      cardNumberMaxLength: 16,
      cardMonthYearMaxLength: 2,
      cardCvvMaxLength: 3,
      cvvFocus: false,
      cvvBlur: false,
    };
  },
  computed: {},
  methods: {
    changeName(e) {
      this.formData.cardName = e.target.value;
    },
    changeNumber(e) {
      this.formData.cardNumber = e.target.value;
      let value = this.formData.cardNumber.replace(/\D/g, '');
      this.formData.cardNumber = value;
      this.cardNumberMaxLength = 16;
    },
    changeMonth(e) {
      this.formData.cardMonth = e.target.value;
    },
    changeYear(e) {
      this.formData.cardYear = e.target.value;
    },
    changeCvv(e) {
      this.formData.cardCvv = e.target.value;
    },
    handleCvvFocus() {
      this.cvvFocus = !this.cvvFocus;
    },
    handleCvvBlur() {
      if (this.cvvFocus === true) {
        this.cvvFocus = false;
      }
    },
    handleFocus(e) {
      console.log(e);
    },
    handleBlur(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-form {
  background-color: rgba(255, 255, 255, 0.75);
  max-width: 540px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 0 120px rgba(0, 0, 0, 0.5);
  font-family: 'Barlow Condensed', monospace;
  font-weight: 500;
}

.form-control-label {
  position: relative;
  transition: all 200ms;
  width: 100%;

  > span {
    position: absolute;
    top: 0;
    padding: 0.375rem 0.75rem;
    transition: all 200ms;
    text-transform: uppercase;
    font-size: 1.1rem;
  }
}

.form-control {
  font-size: 1.1rem;
  color: var(-color-gray-900);

  &:focus + span,
  &:valid + span {
    font-size: 90%;
    transform: translate3d(0, -100%, 0);
    opacity: 1;
  }
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: textfield;
  margin: 0;
}
</style>
