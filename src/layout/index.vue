<template>
  <div
    class="app-wrapper"
  >
    <topbar />
    <sidebar class="sidebar-container" />
    <div
      class="main-container hasTagsView"
    >
      
      <div>
        <tags-view />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { AppMain, Sidebar, TagsView, Topbar } from './components'

@Component({
  name: 'Layout',
  components: {
    AppMain,
    Sidebar,
    TagsView,
    Topbar,
  }
})
export default class extends Vue {
  get fixedHeader() {
    return false
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.main-container {
  min-height: calc(100vh - #{$topBarHeight} - #{$tagsViewHeight});
  transition: margin-left .28s;
  margin-left: $sideBarWidth;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: calc(100% - #{$topBarHeight});
  float: left;
  // position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

// .fixed-header {
//   position: fixed;
//   top: 0;
//   right: 0;
//   z-index: 9;
//   width: calc(100% - #{$sideBarWidth});
//   transition: width 0.28s;
// }

// .hideSidebar {
//   .main-container {
//     margin-left: 54px;
//   }

//   .sidebar-container {
//     width: 54px !important;
//   }

//   .fixed-header {
//     width: calc(100% - 54px)
//   }
// }

/* for mobile response 适配移动端 */
// .mobile {
//   .main-container {
//     margin-left: 0px;
//   }

//   .sidebar-container {
//     transition: transform .28s;
//     width: $sideBarWidth !important;
//   }

//   &.openSidebar {
//     position: fixed;
//     top: 0;
//   }

//   &.hideSidebar {
//     .sidebar-container {
//       pointer-events: none;
//       transition-duration: 0.3s;
//       transform: translate3d(-$sideBarWidth, 0, 0);
//     }
//   }

//   .fixed-header {
//     width: 100%;
//   }
// }

// .withoutAnimation {
//   .main-container,
//   .sidebar-container {
//     transition: none;
//   }
// }
</style>
