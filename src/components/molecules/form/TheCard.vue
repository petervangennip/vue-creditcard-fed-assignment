<template>
  <div
    :class="[{ 'is-active': cvvFocus }, { 'is-active': isActive }]"
    class="card"
    aria-hidden="true"
  >
    <div class="p-4 card-content card__front">
      <BaseIcon width="540" height="170" icon="visa" class="bg-icon" />
      <div :class="{ 'is-active': isActive }" class="d-flex card-top">
        <div class="card__chip">
          <BaseIcon width="52" height="52" icon="sim-chip" />
        </div>
        <div class="card__brand">
          <BaseIcon width="100" icon="visa" />
        </div>
      </div>

      <div class="card-middle">
        <div :ref="fields.cardNumber" class="card__number">
          <template>
            <span v-for="(n, $index) in currentPlaceholder" :key="$index + 1">
              <transition name="slide-fade-up">
                <div
                  :key="currentPlaceholder"
                  v-if="labels.cardNumber.length > $index"
                  class="card-item__numberItem x"
                >
                  {{ labels.cardNumber[$index] }}
                </div>
                <div :key="currentPlaceholder + 1" v-else class="card-item__numberItem y">
                  {{ n }}
                </div>
              </transition>
            </span>
          </template>
        </div>
      </div>

      <div class="card-bottom d-flex">
        <div class="p-2 flex-grow-1">
          <div :ref="fields.cardName" class="card-item__info">
            <div class="card-item--text-shadow">Card Holder</div>
            <transition name="slide-fade-up">
              <div key="1" v-if="labels.cardName.length">
                <transition-group name="slide-fade-right">
                  <span
                    v-for="(n, $index) in labels.cardName.replace(/\s\s+/g, ' ')"
                    :key="$index + 1"
                    class="card-item--text-shadow"
                    >{{ n }}</span
                  >
                </transition-group>
              </div>
              <div key="2" v-else class="card-item--text-shadow">Full Name</div>
            </transition>
          </div>
        </div>
        <div ref="card-date" class="p-2">
          <div class="card-item--text-shadow">Expires</div>
          <div class="d-flex">
            <div class="mr-2">
              <transition name="slide-fade-up">
                <span
                  v-if="labels.cardMonth"
                  :key="labels.cardMonth"
                  class="card-item--text-shadow"
                  >{{ labels.cardMonth }}</span
                >
                <span key="2" v-else class="card-item--text-shadow">MM</span>
              </transition>
            </div>
            /
            <div class="ml-2">
              <transition name="slide-fade-up">
                <span
                  v-if="labels.cardYear"
                  :key="labels.cardYear"
                  class="card-item--text-shadow"
                  >{{ labels.cardYear }}</span
                >
                <span key="2" v-else class="card-item--text-shadow">YY</span>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 card-content card__back">
      <div class="card-item__strip mb-4"></div>
      <div>
        <div class="card-item--text-shadow text-right mb-1 mr-1">CVV</div>
        <div class="card-item__cvv text-right">
          <span v-for="(n, $index) in labels.cardCvv" :key="$index">{{ n }}</span>
        </div>
      </div>
      <div class="card__brand text-right mt-5">
        <BaseIcon width="100" icon="visa" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheCard',
  props: {
    labels: {
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
    fields: {
      type: Object,
      default: () => {
        return {
          cardNumber: 'card-number',
          cardName: 'card-name',
          cardMonth: 'card-month',
          cardYear: 'card-year',
          cardCvv: 'card-cvv',
        };
      },
    },
    isActive: Boolean,
    cvvFocus: Boolean,
  },
  data() {
    return {
      currentPlaceholder: '****************',
    };
  },
};
</script>

<style lang="scss" scoped>
$card: '.card';

#{$card} {
  position: relative;
  max-width: 520px;
  width: 100%;
  margin: 0 auto;
  font-family: var(--font-family);
  color: var(--color-white);
  margin-bottom: 20px;
  border: none;
  background-color: transparent;

  &-content {
    transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
    transform: perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg);
    transform-style: preserve-3d;
    box-shadow: 0 0 7px 7px rgba(0, 0, 0, 0.1);
    backface-visibility: hidden;
    border-radius: 12px;
    overflow: hidden;
    background: radial-gradient(
        ellipse farthest-corner at right bottom,
        #fedb37 0%,
        #fdb931 8%,
        #9f7928 30%,
        #8a6e2f 40%,
        transparent 80%
      ),
      radial-gradient(
        ellipse farthest-corner at left top,
        #ffffff 0%,
        #ffffac 8%,
        #d1b464 25%,
        #5d4a1f 62.5%,
        #5d4a1f 100%
      );
    border: solid 1px var(--border-color-light);
  }

  &__front {
    z-index: 1;

    #{$card}-top,
    #{$card}-middle,
    #{$card}-bottom {
      position: relative;
      z-index: 1;
    }
  }

  &__back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg);
    z-index: -1;
    padding: 0;
    height: 100%;
  }

  &.is-active {
    .card-content {
      transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotateZ(0deg);
    }

    .card__back {
      transform: perspective(1000px) rotateY(0) rotateX(0deg) rotateZ(0deg);
      z-index: 2;
    }
  }

  &__number {
    display: flex;
    width: 100%;
    font-size: 2.5rem;
    letter-spacing: 3px;
    color: var(--color-white);
    text-align: center;
    margin-bottom: 20px;
    margin-top: 20px;
    text-shadow: var(--shadow-card-text);
    justify-content: center;

    > span:nth-child(4n) {
      margin-right: 15px;
    }

    > span:last-child {
      margin-right: 0;
    }
  }

  &__chip {
    flex-grow: 1;

    .icon {
      transform: translateY(-8px);
    }
  }

  &__brand {
    .icon {
      color: var(--color-white);
      fill: var(--color-white);
    }
  }

  &__info {
    text-transform: uppercase;
  }

  &-item__strip {
    background-color: var(--color-black);
    height: 40px;
    border-radius: 0px;
    margin-left: -1.5rem;
    margin-right: -1.5rem;
  }

  &-item__cvv {
    background-color: var(--color-white);
    border-radius: 4px;
    color: var(--color-black);
    padding: 10px;
    min-height: 44px;
  }

  &-item--text-shadow {
    text-shadow: var(--shadow-card-text-light);
  }
}

.bg-icon {
  position: absolute;
  left: -60px;
  bottom: 0;
  opacity: 0.1;
  z-index: 0;
}

.slide-fade-up-enter-active {
  transition: all 0.25s ease-in-out;
  transition-delay: 0.1s;
  position: relative;
}
.slide-fade-up-leave-active {
  transition: all 0.25s ease-in-out;
  position: absolute;
}
.slide-fade-up-enter {
  opacity: 0;
  transform: translateY(15px);
  pointer-events: none;
}
.slide-fade-up-leave-to {
  opacity: 0;
  transform: translateY(-15px);
  pointer-events: none;
}

.slide-fade-right-enter-active {
  transition: all 0.25s ease-in-out;
  transition-delay: 0.1s;
  position: relative;
}
.slide-fade-right-leave-active {
  transition: all 0.25s ease-in-out;
  position: absolute;
}
.slide-fade-right-enter {
  opacity: 0;
  transform: translateX(10px) rotate(45deg);
  pointer-events: none;
}
.slide-fade-right-leave-to {
  opacity: 0;
  transform: translateX(-10px) rotate(45deg);
  pointer-events: none;
}
</style>
