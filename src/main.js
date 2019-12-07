import Vue from 'vue';
import App from '@/App.vue';

Vue.config.productionTip = false;

// css
import '@/css/base.css';

// Global icons
import '@/assets/icons/icons';

// Import all base components
const requireComponent = require.context('@/components', true, /Base[A-Z]/);
requireComponent.keys().forEach((fileName) => {
  let baseComponentConfig = requireComponent(fileName);
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig;
  const baseComponentName =
    baseComponentConfig.name || fileName.replace(/^.+\//, '').replace(/\.\w+$/, '');
  Vue.component(baseComponentName, baseComponentConfig);
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
