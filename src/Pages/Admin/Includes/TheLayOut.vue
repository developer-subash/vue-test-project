<template>
  <div id="wrapper">
    <SideBar/>
    <NavBar/>

    <div id="page-content-wrapper" class="dashboard">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/Pages/Admin/Includes/TheNavBar.vue";
import SideBar from "@/Pages/Admin/Includes/TheSideBar.vue";
import { Cookie } from "@/Pages/Admin/Modules/Common/Services/CookieService";
@Component({
  components: {
    NavBar,
    SideBar
  }
})
export default class TheLayOut extends Vue {
  mounted() {
    if (Cookie.check("business_auth_token")) {
    } else {
      this.$router.push({ name: "business-login" });
      localStorage.clear()
    }
  }
}
</script>
