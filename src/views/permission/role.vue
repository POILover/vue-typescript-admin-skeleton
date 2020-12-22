<template>
  <div class="app-container">
    <el-button
      type="primary"
      @click="handleCreateRole"
    >
      新增角色
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'RolePermission'
})
export default class extends Vue {
  private handleCreateRole(){}
}
</script>

<style lang="scss" scoped>

</style>
