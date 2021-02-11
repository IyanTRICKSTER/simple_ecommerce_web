<template>
  <!-- Header Section Begin -->
  <header class="header-section">
    <div class="header-top">
      <div class="container">
        <div class="ht-left">
          <div class="mail-service">
            <i class="fa fa-envelope"></i> babangtamvan@gmail.com
          </div>
          <div class="phone-service">
            <i class="fa fa-phone"></i> +62 0123321
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="inner-header">
        <div class="row">
          <div class="col-lg-2 col-md-2">
            <div class="logo">
              <router-link to="/">
                <img src="/img/logo_website_shayna.png" alt="" />
              </router-link>
            </div>
          </div>
          <div class="col-lg-7 col-md-7"></div>
          <div class="col-lg-3 text-right col-md-3">
            <ul class="nav-right">
              <li class="cart-icon">
                Keranjang Belanja &nbsp;
                <a href="#">
                  <i class="icon_bag_alt"></i>
                  <span>{{ this.$store.state.keranjang.length }}</span>
                </a>
                <div class="cart-hover">
                  <div class="select-items">
                    <table>
                      <tbody v-if="this.$store.state.keranjang.length > 0">
                        <tr v-for="item in this.$store.state.keranjang" :key="item.dd">
                          <td class="si-pic">
                            <img :src="item.image" alt="" />
                          </td>
                          <td class="si-text">
                            <div class="product-selected">
                              <p>{{ item.price | currency('Rp',2, { thousandsSeparator: '.' , decimalSeparator: ',' }) }}</p>
                              <h6>{{ item.name }}</h6>
                            </div>
                          </td>
                          <td @click="deleteItemKeranjang(item)" class="si-close">
                            <i class="ti-close"></i>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td><center>Keranjang Kosong!</center></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="select-total">
                    <span>total:</span>
                    <h5>{{ subtotal | currency('Rp',2, { thousandsSeparator: '.' , decimalSeparator: ',' }) }}</h5>
                  </div>
                  <div class="select-button">
                    <div v-if="this.$route.path != '/cart'">
                      <div v-if="this.$store.state.keranjang.length > 0">
                        <router-link to="/cart" class="primary-btn view-card disable">VIEW CARD</router-link>
                      </div>
                      <div v-else>
                        <a style="background: gray;" class="primary-btn view-card disable">VIEW CARD</a>
                      </div>
                    </div>
                    <div v-else></div>
                    <a href="" class="primary-btn checkout-btn">CHECK OUT</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Header End -->
</template>

<script>
export default {
  name: "HeaderSection",

  data() {
    return {
      subtotal: 0,
    };
  },

  methods: {
    deleteItemKeranjang(item) {
      // Delete item from global keranjang
      this.$store.commit('deleteItem', item)
      this.subtotal = 0
    },
  },

  mounted() {
    
    if (localStorage.getItem("keranjang")) {
      try {
        // Vuex - Load from localstorage to global array keranjang
        this.$store.commit('loadProductToKeranjang', JSON.parse(localStorage.getItem("keranjang")))
      } catch (e) {
        localStorage.removeItem("keranjang");
      }
    }
  },

  watch: {
    '$store.state.keranjang': {

      handler: function() {

        this.subtotal = 0
        let keranjang = this.$store.state.keranjang
        for(let x in keranjang) {
          this.subtotal = this.subtotal + keranjang[x].price
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped>
table .si-pic img {
  width: 120px;
  height: 80px;
}
</style>