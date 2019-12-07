<template>
  <div id="app">
    <main class="card-wrapper">
      <the-form :form-data="formData" />
    </main>
  </div>
</template>

<script>
import TheForm from '@/components/molecules/form/TheForm.vue';

export default {
  name: 'app',
  components: {
    TheForm,
  },
  data() {
    return {
      formData: {
        cardName: '',
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardCvv: '',
      },
    };
  },
  mounted() {
    this.addAriaToSprite();
  },
  methods: {
    // add aria-hidden attribute on svg sprite
    addAriaToSprite() {
      let svg = this.$el.parentElement.childNodes[0];
      svg.setAttribute('aria-hidden', 'true');
    },
  },
};
</script>

<style lang="scss">
#app {
  padding-top: 20px;
  padding-bottom: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(
    var(--color-white),
    var(--color-blue-light),
    var(--color-blue-medium),
    var(--color-blue)
  );
  background-size: 300% 300%;
  animation: gradientbackground 15s ease infinite;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin: auto;
}

@keyframes gradientbackground {
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 51% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
}
</style>
