<template>
  <svg :aria-label="title" :width="width" :height="height" role="presentation" class="icon">
    <title v-if="title" lang="nl">
      {{ title }}
    </title>
    <g>
      <use v-bind="{ 'xlink:href': '#' + icon }" xmlns:xlink="http://www.w3.org/1999/xlink" />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'BaseIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: undefined,
    },
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  background-color: #ff0000;
}
</style>
