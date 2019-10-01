<template>
<!-- Navigation -->
<div class="navigation-wrapper">
    <nav class="navbar navbar-expand-lg">
        <div class="top-navigation">
            <a @click="toggleMenu()" class="btn btn-default" id="menu-toggle">
          <i class="fas fa-bars"></i>
        </a>

            <div class="welcome-text">
                <p>
                    Welcome to
                    <strong>Travlize</strong>
                </p>
            </div>
            <!-- <strong>{{activeUser.email}}</strong> -->

            <div class="profile-icon">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a
                class="nav-link dropdown-toggle"
                href="my-profile.html"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"

              >
                <img src="img/user.jpg" alt> Hey, {{activeUser.firstname}}
              </a>

                        <div id="myDropdown" class="dropdown-content">
                            <a class="dropdown-item" href="#" @click.prevent="redirectToProfile">
                  <div class="activity-box">
                    <div class="activity-image">
                      <img src="img/user.jpg" alt>
                    </div>
                    <div class="activity-desc">
                      <p>
                        <strong>{{activeUser.fullname}}</strong>
                      </p>
                      <p>
                        <i class="fas fa-envelope"></i> {{activeUser.email}}
                      </p>
                    </div>
                  </div>
                </a>
                            <a class="dropdown-item" href="my-profile.html" @click.prevent="redirectToProfile">
                  <i class="fas fa-user"></i> Profile
                </a>
                            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#changepassword" @click.prevent="redirectToPassword">
                  <i class="fas fa-key"></i> Change
                  password
                </a>

                            <a class="dropdown-item" href="#" @click="LogoutAction($event)">
                  <i class="fas fa-power-off"></i> Logout
                </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>
<!-- Navigation ends -->
</template>

<script lang="ts">
import {
    Component,
    Vue
} from "vue-property-decorator";
import {
    common
} from "@/Pages/Admin/Modules/Common/Services/Common";
import {
    Cookie
} from "@/Pages/Admin/Modules/Common/Services/CookieService";
import GeneralStore from "@/Pages/Admin/Modules/ManagePackage/Store/General";

@Component({
    name: "TheNavBar",
    components: {}
})
export default class TheNavBar extends Vue {
    private is_toggle: boolean;
    private activeUser: {};
    protected ui: any = {};
    protected errors: any = {};

    constructor() {
        super();
        this.is_toggle = false;
        this.activeUser = {};
    }
    public redirectToProfile() {
        this.$router.push({
            name: 'business-dashboard-manage-profile-tab',
            // query: {
            //   id: this.$route.query.id,
            // },
        });
    }
    public redirectToPassword() {
        this.$router.push({
            name: 'user-profile-change-password',
            // query: {
            //   id: this.$route.query.id,
            // },
        });
    }

    LogoutAction(event: any) {
        event.preventDefault();
        if (Cookie.check("business_auth_token")) {
          localStorage.clear()
            Cookie.delete("business_auth_token");
            this.$router.push({
                name: "business-login"
            });
        }
    }
    toggleMenu() {
        $("#wrapper").dropdown('toggle');
    }
    dropdown(e: any) {
        // e.stopPropagation();
        $('.dropdown-toggle').dropdown('toggle');

    }
    mounted() {
        this.activeUser = common.CurrentLoggedBusinessUser() ?
            common.CurrentLoggedBusinessUser() :
            "";
        // this.GetUserInfromationList();
        console.log("login check", this.activeUser);
    }
    
    

}
</script>
