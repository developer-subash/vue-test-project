<template>
  <!-- Sidebar -->
  <div id="sidebar-wrapper" class="custom-scroll">
    <div class="sidebar-overlay"></div>
    <ul class="sidebar-nav">
      <li class="sidebar-brand">
        <router-link :to="{ name:'business-dashboard'}">Travlize</router-link>
      </li>
      <div class="sidebar-nav-item">
          <li>
          <a class="toggle-parent">
            <span class="nav-header-primary">
             <i class="fas fa-tree"></i>Trek
              <span class="pull-right">
                <b class="caret"></b>
              </span>
            </span>
          </a>
          </li>
          <ul class="collapse toggle-content pl-0">
            <li>
              <router-link :to="{ name:'business-package-trek'}" class="active">
                <i class="fas fa-building"></i> Manage Trek
              </router-link>
            </li>
            <li>
              <router-link :to="{ name:'business-manage-booking'}" class="active">
                <i class="fas fa-calendar"></i> Manage Bookings
              </router-link>
            </li>
            <li>
              <router-link :to="{ name:'business-manage-departure-trek-list'}" class="active">
                <i class="fas fa-plane-departure"></i> Manage Departure
              </router-link>
            </li>
          </ul>
          <li>
          <a href="#"><i class="fas fa-hotel"></i> hotels</a>
          </li>
      </div>
   
    </ul>
  </div>
  <!-- /#sidebar-wrapper -->
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class TheSideBar extends Vue {}
</script>
