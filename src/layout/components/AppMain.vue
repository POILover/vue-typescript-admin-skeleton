<template>
    <section class="app-main">
        <!-- <transition
      name="fade-transform"
      mode="out-in"
    > -->
        <!-- <keep-alive :include="cachedViews"> -->
        <router-view :key="key" />
        <!-- </keep-alive> -->
        <!-- </transition> -->
    </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TagsViewModule } from "@/store/modules/tags-view";

@Component({
    name: "AppMain",
})
export default class extends Vue {
    get cachedViews() {
        return TagsViewModule.cachedViews;
    }

    get key() {
        return this.$route.path;
    }
}
</script>

<style lang="scss" scoped>
.app-main {
    /* 50= navbar  50  */
    height: calc(100vh - #{$topBarHeight} - #{$tagsViewHeight});
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: #f0f2f5;
}

// .fixed-header+.app-main {
//   padding-top: 50px;
//   height: 100vh;
//   overflow: auto;
// }

.hasTagsView {
    .app-main {
        height: calc(100vh - #{$topBarHeight} - #{$tagsViewHeight});
    }

    // .fixed-header+.app-main {
    //   padding-top: 84px;
    // }
}
</style>
