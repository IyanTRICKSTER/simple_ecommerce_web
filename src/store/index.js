import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
 state: {
     keranjang: [],
     subtotal: 0,
     totalBiaya: 0,
 },

 getters: {
     getKeranjang(state) {
         return state.keranjang
     }
 },

 mutations: {

    loadProductToKeranjang(state, product) {
        state.keranjang = product;
    },

    deleteItem(state, item) {
        var index = state.keranjang.indexOf(item);
        state.keranjang.splice(index, 1);
      
        const parsed = JSON.stringify(state.keranjang);
        localStorage.setItem('keranjang', parsed);
    },
    setPrice(state, subtotal) {
        state.subtotal = subtotal;
    },

    setTotal(state, total) {
        state.totalBiaya = total;
    }

 },
 actions: {}
});