<template>
    <div :style="`background-color:${variables.menuBg};display:flex;width:100%;justify-content:space-between`">
        <div class='top-left'>1</div>
        <el-menu
            :default-active="activeMenu"
            :background-color="variables.menuBg"
            :text-color="variables.menuText"
            :active-text-color="menuActiveTextColor" 
            :unique-opened="false"
            :collapse-transition="false"
            mode="horizontal"
            :router="true"
        >
            <template v-for="route in routes" >
            <el-menu-item  v-if="route.meta&&route.meta.title" :index="route.path"  :key="route.path">{{ route.meta.title }}
            </el-menu-item>
            </template>
        </el-menu>
        <div class='top-right'><top-right></top-right></div>
    </div>
    
</template>

<script lang="ts">
import variables from '@/styles/_variables.scss'
import { Component, Vue } from 'vue-property-decorator'
import { PermissionModule } from '@/store/modules/permission'
import TopRight from './TopRight.vue'
@Component({name:"Topbar",components:{TopRight}})
export default class extends Vue{
    get variables() {
        return variables
    }
    get activeMenu(){
        return this.$route.matched[0].path
    }
    get routes() {
        return PermissionModule.routes
    }
    get menuActiveTextColor() {
        return variables.menuActiveText
    }
}
</script>