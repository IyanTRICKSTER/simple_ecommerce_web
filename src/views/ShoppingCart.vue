<template>
  <div class="home">
    <HeaderSection />
    <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-left">
            <div class="breadcrumb-text product-more">
              <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
              <span>Shopping Cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Shopping Cart Section Begin -->
    <section class="shopping-cart spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="row">
              <div class="col-lg-12">
                <div class="cart-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th class="p-name text-center">Product Name</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody v-if="this.$store.state.keranjang.length > 0">
                      <tr v-for="item in this.$store.state.keranjang" :key="item.dd">
                        <td class="cart-pic first-row">
                          <img :src="item.image" />
                        </td>
                        <td class="cart-title first-row">
                          <center><h5 style="word-wrap: break-word; width: 210px;">{{ item.name }}</h5></center>
                        </td>
                        <td class="p-price first-row">{{ item.price | currency('Rp',2, { thousandsSeparator: '.' , decimalSeparator: ',' }) }}</td>
                        <td class="delete-item">
                          <div
                            class="si-close"
                            @click="deleteItemKeranjang(item)"
                          >
                            <i class="ti-close"></i>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td class="">Belum ada barang yang di pesan nih!</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-lg-8 text-left">
                <h4 class="mb-4">Informasi Pembeli:</h4>
                <div class="user-checkout">
                  <form>
                    <div class="form-group">
                      <label for="namaLengkap">Nama lengkap</label>
                      <input
                        type="text"
                        class="form-control"
                        id="namaLengkap"
                        aria-describedby="namaHelp"
                        placeholder="Masukan Nama"
                      />
                    </div>
                    <div class="form-group">
                      <label for="namaLengkap">Email Address</label>
                      <input
                        type="email"
                        class="form-control"
                        id="emailAddress"
                        aria-describedby="emailHelp"
                        placeholder="Masukan Email"
                      />
                    </div>
                    <div class="form-group">
                      <label for="namaLengkap">No. HP</label>
                      <input
                        type="text"
                        class="form-control"
                        id="noHP"
                        aria-describedby="noHPHelp"
                        placeholder="Masukan No. HP"
                      />
                    </div>
                    <div class="form-group">
                      <label for="alamatLengkap">Alamat Lengkap</label>
                      <textarea
                        class="form-control"
                        id="alamatLengkap"
                        rows="3"
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-12">
                <div class="proceed-checkout text-left">
                  <ul>
                    <li class="subtotal">
                      ID Transaction <span>#{{ transactionId }}</span>
                    </li>
                    <li class="subtotal mt-3">
                      Subtotal <span>{{ this.$store.state.subtotal | currency('rp',2, { thousandsSeparator: '.' , decimalSeparator: ',' }) }}</span>
                    </li>
                    <li class="subtotal mt-3">
                      Pajak <span>{{ pajak }}%</span>
                    </li>
                    <li class="subtotal mt-3">
                      Total Biaya <span>{{ this.$store.state.totalBiaya | currency('rp',2, { thousandsSeparator: '.' , decimalSeparator: ',' }) }}</span>
                    </li>
                    <li class="subtotal mt-3">
                      Bank Transfer <span>{{ bank.nama }}</span>
                    </li>
                    <li class="subtotal mt-3">
                      No. Rekening <span>{{ bank.rek }}</span>
                    </li>
                    <li class="subtotal mt-3">
                      Nama Penerima <span>{{ bank.reciever }}</span>
                    </li>
                  </ul>
                  <router-link to="/success" class="proceed-btn"
                    >I ALREADY PAID</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Shopping Cart Section End -->
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderSection from "@/components/HeaderSection.vue";

export default {
  name: "ShoppingCart",
  components: {
    HeaderSection,
  },

  data() {
    return {

      transactionId: "IYN" + this.getRandomInt(10000, 99999),
      subtotal: 0,
      pajak: 10,
      totalBiaya: 0,
      bank: { 
        nama: 'Mandiri',
        rek: '2208 1996 1403',
        reciever: 'IYAN'
      },
      buyer: {
        name: null,
        email: null,
        number: null,
        address: null,
      }
    };
  },

  mounted() {
    
  },

  methods: {
    deleteItemKeranjang(item) {
      this.$store.commit("deleteItem", item);
    },

    getRandomInt(min, max) { //Fungsi random integer
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    },
  },

  watch: {
    '$store.state.keranjang': { // WATCH GLOBAL STATE KERANJANG
      handler: function () {
        // SET STATE HARGA MENJADI 0
        this.subtotal = 0; this.totalBiaya = 0;
        this.$store.commit("setPrice", this.subtotal);
        this.$store.commit("setTotal", this.totalBiaya);

        // LOOP UNTUK MENGHITUNG ULANG TOTAL & PAJAK SETELAH ADA
        // PERUBAHAN PADA STATE KERANJANG
        let keranjang = this.$store.state.keranjang
        if (keranjang.length > 0) {
          for (let x in keranjang) {
            // Hitung subtotal
            this.subtotal += keranjang[x].price;
            // Hitung pajak
            this.totalBiaya += keranjang[x].price + (keranjang[x].price * this.pajak) / 100;
          }
          // HASIL KALKULASI DARI LOOP KEMBALI DITARUH DI GLOBAL STATE
          this.$store.commit("setPrice", this.subtotal) 
          this.$store.commit("setTotal", this.totalBiaya);
          console.log(this.totalBiaya);
        }
        else {
          this.$store.commit("setPrice", 0, 0)
          this.transactionId = "";
        }
      },
      deep: true,
    },
  },
};
</script>
