<template>
  <div class="app-container">
    <div>全部看板</div>
    <div class="board-container">
      <div
        @click="onClickKanban(kanban.kanbanId)"
        v-for="kanban in kanbanList"
        :key="kanban.id"
        class="kanban"
      >
        <h3 class="kanban-name">{{ kanban.name }}</h3>
        <el-popover placement="right" trigger="click">
          <div class="board-popover">
            <div
              @click="onDeleteKanban(kanban.kanbanId)"
              class="popover-content"
            >
              永久删除
            </div>
            <div class="popover-content">归档</div>
            <div
              @click="onRenameKanban(kanban.name, kanban.kanbanId)"
              class="popover-content"
            >
              重命名
            </div>
          </div>
          <div @click.stop="" slot="reference" class="kanban-more-icon">
            <i class="el-icon-more"></i>
          </div>
        </el-popover>

        <p class="kanban-create-time">创建于 {{ kanban.createTime }}</p>
        <div class="kanban-creater">
          <Avatar class="avatar" :username="kanban.createUserName"> </Avatar>
        </div>
      </div>
      <div v-if="showTmpKanban" class="kanban">
        <h3 class="kanban-name">
          <el-input
            placeholder="请输入看板名称..."
            ref="createInput"
            @blur="onCreateKanban"
            v-model="newKanbanName"
          ></el-input>
        </h3>
      </div>
      <div v-if="!showTmpKanban" @click="onNewKanban" class="kanban-create">
        <i class="el-icon-plus"></i>新建看板
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Avatar from "vue-avatar";
import { Input as ElInput } from "element-ui";
import Vue from "vue";
import { kanbanList, allUserList } from "./data/data";
import { IKanban, IKanbanColumn } from "./data/interface";
@Component({ components: { Avatar } })
export default class extends Vue {
  private kanbanList: IKanban[] = kanbanList;
  private newKanbanName: string = "";
  private showTmpKanban: boolean = false;
  private menuId: number = 4;
  created() {
    this.getKanban();
  }

  getKanban() {}
  transferTime(time: string): string {
    return "";
  }
  onClickKanban(kanbanId: number) {
    this.$router.push(`/components/kanban?id=${kanbanId}`);
  }
  onNewKanban() {
    this.newKanbanName = "";
    this.showTmpKanban = true;
    this.$nextTick(() => {
      (this.$refs.createInput as ElInput).focus();
    });
  }
  onRenameKanban(name: string, id: number) {
    this.$prompt("", "重命名", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      inputPlaceholder: "请输入看板名称",
      confirmButtonClass: "custom-confirm-button",
      inputValue: name,
    })
      .then((value: any) => {
        let name = value?.value;
        this.$message.warning(`kanban id: ${id}, kanban name: ${name}`);
      })
      .catch(() => {});
  }
  onCreateKanban() {
    if (this.newKanbanName) {
      this.$message.warning(`new kanban name: ${this.newKanbanName}`);
    } else {
      this.showTmpKanban = false;
    }
  }
  onDeleteKanban(kanbanId: number) {
    this.$confirm("确认删除？", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      this.$message.warning(`delete: kanban id ${kanbanId}`);
    });
  }
}
</script>
<style lang="scss">
.kanban-name {
  .el-input__inner {
    padding: 0 5px !important;
    border-radius: 16px !important;
    border: 1px solid white !important;
  }
  .el-input__inner:focus {
    border: 1px solid #dcdfe6 !important;
  }
}
.custom-confirm-button {
  background: red !important;
  border-color: red !important;
}
.el-popover {
  padding: 0 !important;
  min-width: 0px !important;
  border-radius: 8px;
  .board-popover {
    width: 100px;
    .popover-content {
      font-weight: 400;
      cursor: pointer;
      display: flex;
      color: rgba(3, 14, 44, 0.85);
      justify-content: flex-start;
      padding-left: 16px;
      padding-right: 16px;
      align-items: center;
      width: 100%;
      min-height: 40px;
      position: relative;
      &:hover {
        background-color: rgba(255, 202, 25, 0.25);
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.board-container {
  display: flex;
  flex-wrap: wrap;
  .kanban {
    margin: 0px 24px 16px 0px;
    cursor: pointer;
    user-select: none;
    position: relative;
    width: 224px;
    height: 114px;
    background: rgb(255, 255, 255);
    box-shadow: rgba(3, 14, 44, 0.09) 0px 2px 6px 0px;
    border-radius: 8px;
    box-sizing: border-box;
    border-left: 8px solid rgb(246, 175, 5);
    padding: 16px 24px;
    transition: transform 0.5s ease-out 0s, box-shadow 0.5s ease-out 0s;
    &:hover {
      transform: translateY(-5px);
      box-shadow: rgba(3, 14, 44, 0.15) 0px 2px 16px 0px;
    }
    .kanban-more-icon {
      position: absolute;
      top: 6px;
      right: 6px;
      // opacity: 0;
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      &:hover {
        background: rgba(3, 14, 44, 0.04);
      }
      i {
        font-weight: 200;
        transform: rotate(90deg);
      }
    }
    .kanban-name {
      font-size: 16px;
      color: rgba(3, 14, 44, 0.85);
      font-weight: 500;
      margin-bottom: 16px;
      max-width: 144px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 0;
    }
    .kanban-name-input {
      width: 100px;
      display: inline;
    }
    .kanban-create-time {
      color: rgba(3, 14, 44, 0.45);
      font-size: 12px;
      margin-bottom: 12px;
      margin-top: 0;
    }
    .kanban-creater {
      width: 24px;
      height: 24px;
      line-height: 24px;
      border-radius: 50%;

      .avatar {
        width: 24px !important;
        height: 24px !important;
        line-height: 24px !important;
        margin: 0px 2px;
        background-color: rgba(128, 128, 128, 0.3) !important;
        color: rgba(128, 128, 128, 1) !important;
        font-size: 10px !important;
      }
    }
  }
  .kanban-create {
    margin-bottom: 16px;
    width: 224px;
    height: 114px;
    border-radius: 8px;
    border: 1px dashed rgba(3, 14, 44, 0.25);
    color: rgba(3, 14, 44, 0.65);
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    cursor: pointer;
    -webkit-box-align: center;
    align-items: center;
    i {
      margin-right: 5px;
    }
  }
}
</style>
