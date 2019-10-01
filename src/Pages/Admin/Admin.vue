<template>
  <div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";

@Component({
  name: "Admin",
  components: {},
  filters: {
    filterName(value: any) {
      return value;
    }
  }
})
export default class Admin extends Vue {}
</script>

