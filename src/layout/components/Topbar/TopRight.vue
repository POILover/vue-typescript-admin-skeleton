<template>
    <div class="right-menu">
        <el-dropdown
            class="avatar-container right-menu-item hover-effect"
            trigger="click"
        >
            <div class="avatar-wrapper">
                <img
                    :src="avatar + '?imageView2/1/w/80/h/80'"
                    class="user-avatar"
                />
                <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
                <router-link to="/profile/">
                    <el-dropdown-item>
                        用户信息
                    </el-dropdown-item>
                </router-link>
                <el-dropdown-item divided @click.native="logout">
                    <span style="display:block;">
                        退出登录
                    </span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user";
@Component({ name: "TopRight" })
export default class extends Vue {
    get avatar() {
        return (
            UserModule.avatar ||
            `https://avatars2.githubusercontent.com/u/14835249?s=460&u=b24e27195707cce2f8d8ad75705b01b14e5f4231&v=4`
        );
    }

    private async logout() {
        await UserModule.LogOut();
        this.$router
            .push(`/login?redirect=${this.$route.fullPath}`)
            .catch((err) => {
                console.warn(err);
            });
    }
}
</script>

<style lang="scss" scoped>
.right-menu {
    float: right;
    height: 100%;
    &:focus {
        outline: none;
    }

    .right-menu-item {
        display: inline-block;
        padding: 4px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
            cursor: pointer;
            transition: background 0.3s;

            &:hover {
                background: rgba(0, 0, 0, 0.025);
            }
        }
    }

    .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
            margin-top: 5px;
            position: relative;

            .user-avatar {
                cursor: pointer;
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }

            .el-icon-caret-bottom {
                cursor: pointer;
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }
}
</style>
