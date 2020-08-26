import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.directive('phone', {
	bind(el) {
		el.oninput = function (e) {
			if (!e.isTrusted) {
				return;
			}

			let x = this.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
			this.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] + '-' + x[4] : '');
			el.dispatchEvent(new Event('input'));
		}
	}
});

Vue.use(Vuelidate)
new Vue({
	store,
	render: h => h(App)
}).$mount('#app')
