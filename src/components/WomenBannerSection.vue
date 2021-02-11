<template>
  <!-- Women Banner Section Begin -->
  <section class="women-banner spad">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 mt-5">
          <!-- This is carousel -->
          <div v-if="products.length > 0">
            <carousel
              class="product-slider"
              :margin="30"
              :nav="false"
              :dots="false"
              :autoplay="true"
              :loop="true"
            >
              <div class="product-item" v-for="product in products" :key="product.id">
                <div class="pi-pic">
                  <img v-bind:src="product.galleries[0].photo" alt="" />
                  <ul>
                    <li class="w-icon active" @click="addItemToKeranjang(product.id, product.name, product.price, product.galleries[0].photo)">
                      <a><i class="icon_bag_alt"></i></a>
                    </li>
                    <li class="quick-view">
                      <router-link :to="'/product/'+product.id">+ Quick View</router-link>
                    </li>
                  </ul>
                </div>
                <div class="pi-text">
                  <div class="catagory-name">{{ product.type }}</div>
                  <a href="">
                    <h5>{{ product.name }}</h5>
                  </a>
                  <div class="product-price">
                    {{ product.price | currency('Rp',2, { thousandsSeparator: '.' , decimalSeparator: ',' }) }}
                    <span>$35.00</span>
                  </div>
                </div>
              </div>
            </carousel>
          </div>
          <!-- if there's no product -->
          <div v-else>
            <p class="col-lg-12">Product terbaru saat ini belum tersedia.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Women Banner Section End -->
</template>

<script>
import carousel from "vue-owl-carousel";
import axios from "axios";

export default {
  name: "WomenBannerSection",
  components: { carousel },
  data() {
    return {
      products: [],
      keranjang: [],
    };
  },

  methods: {
    // Add Item to Keranjang
    addItemToKeranjang: function(productId, productName, productPrice, productImage) {

      var item = {
        "id" : productId,
        "name": productName,
        "price": productPrice,
        "image": productImage,

      }

      // Push item to global array keranjang
      this.$store.state.keranjang.push(item);
      this.saveKeranjang();
      
    },

    saveKeranjang: function() {
      const parsed = JSON.stringify(this.$store.state.keranjang);
      localStorage.setItem('keranjang', parsed);
      this.item = ''

    }
  },

  mounted() {

    if (localStorage.getItem("keranjang")) {
    try {
      // this.$store.state.keranjang = JSON.parse(localStorage.getItem("keranjang"));
      this.$store.commit('loadProductToKeranjang', JSON.parse(localStorage.getItem("keranjang")))
    } catch (e) {
      localStorage.removeItem("keranjang");
    }}
   
    axios.get(this.$api_url+"/products")
      .then((res) => (this.products = res.data.data.data))
      .catch((err) => console.log(err));

  },

  computed: {
    
  }
  
};
</script>

<style scoped>
.pi-pic img {
  width: 150px;
  height: 400px;
  border-radius: 5px;
}
</style>