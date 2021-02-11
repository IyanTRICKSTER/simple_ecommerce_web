<template>
  <div class="product">
    <HeaderSection />
    <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb-text product-more text-left">
              <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
              <span>Detail</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Product Shop Section Begin -->
    <section class="product-shop spad page-details">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-4">
                <div class="product-pic-zoom">
                  <img class="product-big-img" :src="selected_pic" />
                </div>
                <div class="product-thumbs">
                  <!-- Carousel  -->
                  <div v-if="pics.length > 0">
                    <carousel
                      class="product-thumbs-track ps-slider"
                      :margin="10"
                      :autoplay="true"
                      :items="3"
                      :nav="false"
                      :dots="false"
                    >
                      <!-- Looping Gambar Produk -->
                      <div
                        v-for="(pic, index) in pics"
                        :key="pic"
                        class="pt"
                        @click="set_active_img(pics[index])"
                        :class="pics[index] == selected_pic ? 'active' : ''"
                      >
                        <img :src="pic" />
                      </div>
                    </carousel>
                  </div>
                </div>
              </div>
              <div class="col-lg-8">
                <div class="product-details text-left">
                  <div class="pd-title">
                    <span>{{ productDetails.type }}</span>
                    <h3>{{ productDetails.name }}</h3>
                  </div>
                  <div class="pd-desc">
                    <p v-html="productDetails.description"></p>
                    <h4>Rp {{ productDetails.price }}</h4>
                  </div>
                  <div class="quantity">
                    <div to="/cart">
                      <a  @click="addItemToKeranjang(
                        productDetails.id,
                        productDetails.name,
                        productDetails.price,
                        productDetails.galleries[0].photo)" class="primary-btn pd-cart">Add To Cart</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Product Shop Section End -->

    <RelatedSection />

    <FooterSection />
  </div>
</template>

<script>
// // @ is an alias to /src
// import VueScript2 from 'vue-script2'
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/FooterSection.vue";
import RelatedSection from "@/components/RelatedSection.vue";
import carousel from "vue-owl-carousel";
// import ZoomOnHover from "vue-zoom-on-hover";
import axios from "axios";

export default {
  name: "Product",
  components: {
    HeaderSection,
    FooterSection,
    RelatedSection,
    carousel,
    // ZoomOnHover
  },
  data() {
    return {
      selected_pic: "",
      productDetails: [],
      pics: [],
      // keranjang: [],
    };
  },

  methods: {
    set_active_img: function (url) {
      this.selected_pic = url;
    },
    // Mengelola data hasil dari API
    product: function (data) {
      this.productDetails = data; // Berisi Objek Produk details
      this.selected_pic = data.galleries[0].photo; // Gambar dengan ID 0 akan di set sebagai default image
      for (let i = 0; i < data.galleries.length; i++) {
        // Mengambil URL image produk
        this.pics.push(data.galleries[i].photo);
      }
    },

    // Add Item to Keranjang
    addItemToKeranjang: function(productId, productName, productPrice, productImage) {

      var item = {
        "id" : productId,
        "name": productName,
        "price": productPrice,
        "image": productImage

      };

      // Menambahkan item ke global array keranjang
      this.$store.state.keranjang.push(item);
      const parsed = JSON.stringify(this.$store.state.keranjang);
      localStorage.setItem('keranjang', parsed);
      
    },
  },

  mounted() {
    // Load Keranjang Array
    if (localStorage.getItem("keranjang")) {
      try {
        // this.$store.state.keranjang = JSON.parse(localStorage.getItem("keranjang"));
        this.$store.commit('loadProductToKeranjang', JSON.parse(localStorage.getItem("keranjang")))
      } catch (e) {
        localStorage.removeItem("keranjang");
      }
    }
  
    // Get Product by its id
    axios(this.$api_url+"/products", {
      params: {
        id: this.$route.params.id,
      },
    })
      .then((res) => this.product(res.data.data))
      .catch((error) => console.log(error));

  },

  computed: {},
};
</script>

<style scoped>
.product-shop {
  margin-left: 14%;
  margin-right: 14%;
}

.product-pic-zoom {
  margin-bottom: -94px;
  height: 410px;
  /* width: 400px */
  object-fit: cover;
  overflow: hidden;
}

.product-pic-zoom img {
  max-width: 100%;
  max-height: 75%;
  overflow: hidden;
  border-radius: 3px
}

</style>