<template>
  <div class="home">
    <HeaderSection/>
    <HeroSection/>
    <WomenBannerSection/>
    <InstagramSection/>
    <PartnerLogoSection/>
    <FooterSection/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HeaderSection from '@/components/HeaderSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import WomenBannerSection from '@/components/WomenBannerSection.vue'
import HeroSection from '@/components/HeroSection.vue'
import InstagramSection from '@/components/InstagramSection.vue'
import PartnerLogoSection from '@/components/PartnerLogoSection.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
    HeaderSection,
    FooterSection,
    WomenBannerSection,
    HeroSection,
    InstagramSection,
    PartnerLogoSection
  }
}
</script>
