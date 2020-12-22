<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { checkPermission } from '@/utils/permission' // Use permission directly
import SwitchRoles from './components/SwitchRoles.vue'

@Component({
  name: 'DirectivePermission',
  components: {
    SwitchRoles
  }
})
export default class extends Vue {
  private key = 1 // 为了能每次切换权限的时候重新初始化指令
  private checkPermission = checkPermission

  private handleRolesChange() {
    this.key++
  }
}
</script>

<style lang="scss" scoped>
.permission-alert {
  width: 320px;
  margin-top: 15px;
  background-color: #f0f9eb;
  color: #67c23a;
  padding: 8px 16px;
  border-radius: 4px;
  display: inline-block;
}

.permission-sourceCode {
  margin-left: 15px;
}

.permission-tag {
  background-color: #ecf5ff;
}
</style>
