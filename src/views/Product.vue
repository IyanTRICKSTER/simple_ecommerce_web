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
                  <carousel class="product-thumbs-track ps-slider" :margin="10" :autoplay="true" :items="3" :nav="false" :dots="false">                   
                    <div class="pt" @click="set_active_img(pic[0])" :class="pic[0]==selected_pic ? 'active' : ''">
                      <img src="img/mickey1.jpg" alt="" />
                    </div>

                    <div class="pt"  @click="set_active_img(pic[1])" :class="pic[1]==selected_pic ? 'active' : ''">
                      <img src="img/mickey2.jpg" alt="" />
                    </div>

                    <div class="pt"  @click="set_active_img(pic[2])" :class="pic[2]==selected_pic ? 'active' : ''">
                      <img src="img/mickey3.jpg" alt="" />
                    </div>

                    <div class="pt"  @click="set_active_img(pic[3])" :class="pic[3]==selected_pic ? 'active' : ''">
                      <img src="img/mickey4.jpg" alt="" />
                    </div>
                  </carousel>
                </div>
              </div>
              <div class="col-lg-8">
                <div class="product-details text-left">
                  <div class="pd-title">
                    <span>oranges</span>
                    <h3>Pure Pineapple</h3>
                  </div>
                  <div class="pd-desc">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corporis, error officia. Rem aperiam laborum voluptatum
                      vel, pariatur modi hic provident eum iure natus quos non a
                      sequi, id accusantium! Autem.
                    </p>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quam possimus quisquam animi, commodi, nihil voluptate
                      nostrum neque architecto illo officiis doloremque et
                      corrupti cupiditate voluptatibus error illum. Commodi
                      expedita animi nulla aspernatur. Id asperiores blanditiis,
                      omnis repudiandae iste inventore cum, quam sint molestiae
                      accusamus voluptates ex tempora illum sit perspiciatis.
                      Nostrum dolor tenetur amet, illo natus magni veniam quia
                      sit nihil dolores. Commodi ratione distinctio harum
                      voluptatum velit facilis voluptas animi non laudantium, id
                      dolorem atque perferendis enim ducimus? A exercitationem
                      recusandae aliquam quod. Itaque inventore obcaecati, unde
                      quam impedit praesentium veritatis quis beatae ea atque
                      perferendis voluptates velit architecto?
                    </p>
                    <h4>$495.00</h4>
                  </div>
                  <div class="quantity">
                    <router-link to="/cart" class="primary-btn pd-cart"
                      >Add To Cart</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Product Shop Section End -->
    
    <RelatedSection/>

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
          selected_pic: "img/mickey1.jpg",
          pic: [
              "img/mickey1.jpg",
              "img/mickey2.jpg",
              "img/mickey3.jpg",
              "img/mickey4.jpg"
          ]
    }
  },
  
  methods: {
      set_active_img: function(url) {
          this.selected_pic = url
      }
  }
  
}
</script>

<style scoped>

.product-shop {
    margin-left: 14%;
    margin-right: 14%;
}

.product-thumbs {

}

.product-pic-zoom {
    height: 410px;
    /* width: 400px */
    object-fit: cover;
    overflow: hidden;

}

.product-pic-zoom img {
    max-width: 100%;
    max-height: 100%;
    overflow:hidden;
    border-radius: 3px;
}

</style>