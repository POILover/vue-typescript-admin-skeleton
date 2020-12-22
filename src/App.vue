<template>
  <div id="app">
    <router-view />
    <!-- <service-worker-update-popup /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'App',
  components: {
  }
})
export default class extends Vue {}
</script>
