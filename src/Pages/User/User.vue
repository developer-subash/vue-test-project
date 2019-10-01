<template>
  <div>
    <h2>Hello from User Page</h2>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
@Component({
  name: 'User',
  components: {},
  filters: {
    filterName(value: any) {
      return value;
    },
  },
})
export default class User extends Vue {}
</script>


