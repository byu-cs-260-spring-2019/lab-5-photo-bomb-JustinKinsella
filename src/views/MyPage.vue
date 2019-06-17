<template>
<div>
  <div v-if="user">
    <div class="header">
        <div>
        <h2>{{user.email}}</h2>
        </div>

        <div class="button">
        <p><button @click="logout" class="pure-button pure-button-primary">Logout</button></p>
        </div>
    </div>

    <br>
    <div>
        <FavPics/>
    </div>
    
  </div>
  
  <div v-else>
    <p>You may need to refresh the page if you've already logged in and you're seeing this page!</p>
    <router-link to="/register" class="pure-button">Register</router-link> or
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
</div>


</template>

<script>
import FavPics from '@/components/FavPics.vue'
import firestore from 'firebase/firestore'


export default {
  name: 'mypage',
  components: {
    FavPics
    },
  computed: {
    user() {
      return this.$store.state.user;
    },

  },
  created() {
    this.$store.dispatch("getUser");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>


<style scoped>
.pure-button {
  margin: 0px 20px;
}
.header {
  display: flex;
}
.header .button {
  margin-left: 50px;
  order: 2;
}
</style>