<template>
  <div>
    <!-- <sidebar-logo
      v-if="showLogo"
      :collapse="isCollapse"
    /> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.subMenuBg"
        :text-color="variables.menuText"
        :active-text-color="menuActiveTextColor"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="basePath"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PermissionModule } from '@/store/modules/permission'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/_variables.scss'

@Component({
  name: 'SideBar',
  components: {
    SidebarItem,
  }
})
export default class extends Vue {
  private basePath:string = ''

  get routes() {
    let idx:number = PermissionModule.routes.findIndex(item=>item.path===this.$route.matched[0].path)
    this.basePath = PermissionModule.routes[idx].path
    return PermissionModule.routes[idx].children
  }


  get menuActiveTextColor() {
    return variables.menuActiveText
  }

  get variables() {
    return variables
  }

  get activeMenu() {
    const route = this.$route
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  }

  get isCollapse() {
    return false
  }
}
</script>

<style lang="scss">
.sidebar-container {
  height: calc(100% - #{$topBarHeight});
  margin-top: 0px;
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  // margin-top: 60px;
  height: calc(100% - #{$topBarHeight})
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
