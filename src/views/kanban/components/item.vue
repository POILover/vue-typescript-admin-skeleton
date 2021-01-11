<template>
  <div class="kanban-column">
    <div class="kanban-column-header">
      <span v-if="!isModifyHeader" @click="onClickHeader">{{
        headerText
      }}</span>
      <el-input
        ref="headerInput"
        v-if="isModifyHeader"
        @blur="updateBoardHeader"
        class="header-input"
        style="width:50%"
        v-model="headerTextCopy"
      ></el-input>
      <el-popover
        placement="right"
        class="kanban-header-popper"
        trigger="click"
      >
        <div @click="onClickHeader" class="popper-content">
          重命名
        </div>
        <div class="popper-content">添加卡片</div>
        <div class="popper-content">添加列表</div>
        <div class="popper-content">归档列表</div>
        <div @click="deleteBoard" class="popper-content">
          删除列表
        </div>
        <i
          slot="reference"
          style="transform:rotate(90deg);cursor:pointer"
          class="el-icon-more"
        />
      </el-popover>
    </div>
    <div class="card-list-container" id="card">
      <draggable
        :disabled="!parentDragging"
        @start="onDragStart"
        @end="onDragEnd"
        @change="onDragChange"
        :list="list"
        v-bind="dragOptions"
        class="cards-container"
      >
        <transition-group
          class="transition-span"
          type="transition"
          id="drag-transition"
        >
          <!-- card -->
          <div
            v-for="card in list"
            :key="card.cardId"
            class="card-container"
            @click="showDetail(card)"
          >
            <div>
              <div
                v-if="card.member"
                style="display:flex;flex-wrap:wrap;padding-bottom:10px"
                class="member-label"
              >
                <div
                  class="member-list"
                  v-for="member in card.member"
                  :key="member.memberId"
                >
                  {{ member.name }}
                </div>
              </div>
              <span>{{ card.detail }} </span>
              <div
                class="bottom-label"
                style="display:flex;align-items:center;padding-top:5px"
              >
                <div
                  v-if="card.status"
                  class="finished-label"
                  style="color:rgb(58, 163, 97);font-size:14px;margin-right:5px"
                >
                  <svg-icon name="success"></svg-icon>已完成
                </div>
                <svg-icon
                  v-if="card.desc"
                  style="font-size:14px;"
                  name="list-1"
                ></svg-icon>
              </div>
            </div>
          </div>
        </transition-group>
      </draggable>
      <div v-if="showAddCardInput" class="card-add-container">
        <div class="add-input-container">
          <el-input
            class="add-textarea-input"
            :autosize="{ minRows: 3 }"
            v-model="addCardInputContent"
            ref="addCardInput"
            placeholder="请输入..."
            style="width:100%"
            type="textarea"
          ></el-input>
        </div>
        <div class="add-input-button">
          <span @click="onAddCardCancel" class="button plain">取消</span>
          <span
            @click="onAddCardConfirm()"
            :class="addCardInputContent ? '' : 'disabled'"
            class="button red"
            >添加</span
          >
        </div>
      </div>
      <div v-if="!showAddCardInput" @click="onAddCard" class="add-card-button">
        <i class="el-icon-plus" /> 添加卡片
      </div>
    </div>
    <el-dialog
      class="detail-dialog"
      :show-close="false"
      :visible.sync="showCardDetailDialog"
      width="700px"
    >
      <template slot="title" style="width:100%">
        <div class="dialog-title">
          <div class="left-content">
            <el-checkbox
              v-if="status === 1"
              slot="reference"
              class="title-checkbox finished"
              v-model="status"
              @change="onCardDetailChange"
              :true-label="1"
              :false-label="0"
              >已完成</el-checkbox
            >
            <el-popover v-else placement="bottom" trigger="hover">
              <div class="simple-div-popover">完成卡片</div>
              <el-checkbox
                class="title-checkbox unfinished"
                @change="onCardDetailChange"
                slot="reference"
                v-model="status"
                :true-label="1"
                :false-label="0"
              ></el-checkbox>
            </el-popover>

            <el-divider direction="vertical"></el-divider>{{ headerText }}
          </div>
          <div class="right-btn">
            <el-popover placement="bottom" trigger="hover">
              <div class="simple-div-popover">
                删除卡片
              </div>
              <i slot="reference" @click="deleteCard" class="el-icon-delete"
            /></el-popover>

            <i @click="closeDetailDialog" class="el-icon-close" />
          </div>
        </div>
      </template>
      <el-input
        class="dialog-input has-hover detail-input"
        v-model="detailInputContent"
        @change="onCardDetailChange"
        type="textarea"
        :autosize="{ minRows: 1 }"
      >
      </el-input>
      <div
        class="member card-feature"
        style="display:flex;padding:10px 0;align-items:center;"
      >
        <svg-icon
          class="card-feature-icon"
          name="member"
          style="margin-right:10px"
        ></svg-icon>
        <div
          class="member-list dialog-member-list"
          v-for="member in checkedMemberList"
          :key="member.memberId"
        >
          {{ member.name }}
          <i class="el-icon-close" @click="onDeleteMember(member.memberId)"></i>
        </div>
        <el-popover trigger="click" placement="right">
          <div class="add-members">
            <div class="add-members-header">添加成员</div>
            <div class="add-members-content">
              <div class="members-container">
                <div class="members-content">
                  <div
                    v-for="m in allMemberList"
                    :key="m.userId"
                    class="member-container"
                  >
                    <div
                      class="member-content"
                      @click="onToggleCheckMembers(m.userId, m.memberId)"
                    >
                      <i v-if="checkMember(m.userId)" class="el-icon-check"></i>
                      <div class="member-name">
                        {{ m.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <el-popover ref="popover" trigger="hover">
            <div class="simple-div-popover">
              添加成员
            </div>
          </el-popover>
          <i
            v-popover:popover
            slot="reference"
            class="el-icon-plus memeber-list-icon"
          ></i>
        </el-popover>
      </div>
      <div style="display:flex;padding-bottom:10px">
        <svg-icon style="margin-top:10px" name="list-1"></svg-icon
        ><el-input
          @change="onCardDetailChange"
          autosize
          v-model="descInputContent"
          class="dialog-input has-hover desc-input"
          placeholder="添加描述..."
          type="textarea"
        ></el-input>
      </div>
      <div><div class="bottom-tabs">评论</div></div>
      <div class="comments">
        <div class="comment-input" style="">
          <el-input
            v-model="commentInputContent"
            type="textarea"
            :autosize="{ minRows: 3 }"
            class="dialog-input"
            placeholder="添加评论..."
          ></el-input>
          <div
            v-if="commentInputContent"
            class="comment-input-buttons"
            style="position:absolute;bottom:5px;right:10px"
          >
            <span class="button plain" @click="commentInputContent = ''"
              >取消</span
            >
            <span class="button red" @click="onAddComment">评论</span>
          </div>
        </div>
        <div class="comments-container">
          <div
            class="comment-content"
            v-for="comment in commentList"
            :key="comment.id"
          >
            <div class="left">
              <Avatar
                class="avatar"
                width="40px"
                height="40px"
                :username="comment.username"
              ></Avatar>
            </div>
            <div class="right">
              <div class="username">
                {{ comment.username }}
                <span class="delete">删除</span>
              </div>
              <div class="comment">{{ comment.comment }}</div>
              <div class="date">{{ comment.createTime }}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!(commentList && commentList.length != 0)">
        <div class="no-comments">暂无评论</div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Draggable from "vuedraggable";
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { Input as ElInput } from "element-ui";
import { IMember, IComment } from "../data/interface";
import { getCard } from "../data/data";
import Avatar from "vue-avatar";
@Component({
  name: "DraggableKanban",
  components: {
    Draggable,
    Avatar,
  },
})
export default class extends Vue {
  @Prop({ default: () => -1 }) private boardId!: number;
  @Prop({ default: "header" }) private headerText!: string;
  @Prop({ default: () => 0 }) private boardDetailId?: number;
  @Prop({ default: () => [] }) private list!: any[];
  @Prop({ default: () => null }) private options!: object;
  @Prop({ default: () => true }) private parentDragging!: boolean;
  @Prop({ default: () => [] }) private allMemberList!: IMember[];
  private members: any = [];
  private checkedMemberList: IMember[] = [];
  private status: number = 0;
  private addCardInputContent?: string = "";
  private showAddCardInput?: boolean = false;
  private showCardDetailDialog: boolean = false;
  private detailInputContent: string = "";
  private cardId: number = -1;
  private isModifyHeader: boolean = false;
  private headerTextCopy: string = "";
  private descInputContent: string = "";
  private commentInputContent: string = "";
  private commentList: IComment[] = [];
  get dragOptions() {
    return {
      animation: 200,
      group: "description",
      disabled: false,
      ghostClass: "ghost",
    };
  }
  checkMember(userId: number) {
    return (
      this.checkedMemberList.findIndex((item) => item.userId === userId) !== -1
    );
  }
  onToggleCheckMembers(userId: number, memberId: number) {
    let checkIdx = this.checkedMemberList.findIndex(
      (item) => item.userId === userId
    );
    if (checkIdx == -1) {
      this.$message.warning("add member");
    } else {
      this.$message.warning("delete member");
    }
  }
  updateBoardHeader() {
    if (this.headerText === this.headerTextCopy) {
      this.isModifyHeader = false;
    } else {
      //   updateHeader
    }
  }
  onClickHeader() {
    this.isModifyHeader = true;
    this.headerTextCopy = this.headerText;
    this.$nextTick(() => {
      (this.$refs.headerInput as ElInput).focus();
    });
  }
  onDragStart(event: any) {
    // card 拖拽时禁用column拖拽
    this.$emit("childDrag", true);
  }
  onDragEnd(event: any) {
    // card 拖拽结束恢复column拖拽
    this.$emit("childDrag", false);
  }
  onDragChange(event: any) {
    // emit card 拖拽事件
    this.$emit("dragChange", event);
  }
  onAddCard() {
    this.showAddCardInput = true;
    this.$nextTick(() => {
      (this.$refs?.addCardInput as ElInput)?.focus();
    });
  }
  onAddCardCancel() {
    this.showAddCardInput = false;
    this.addCardInputContent = "";
  }
  onAddCardConfirm() {}
  showDetail(element: { cardId: number; detail: string }) {
    this.detailInputContent = element.detail;
    this.cardId = element.cardId;
    this.getCard();
  }
  getCard() {
    const card = getCard(this.cardId);
    if (card) {
      this.detailInputContent = card.detail;
      this.descInputContent = card.desc;
      this.status = card.status;

      this.checkedMemberList = [];
      this.commentList = card.commentList;
      if (card.member) {
        for (let item of card.member) {
          this.checkedMemberList.push({
            name: item.name,
            memberId: item.memberId,
            userId: item.userId,
            cardId: item.cardId,
          });
        }
      }
      this.commentInputContent = "";
      this.showCardDetailDialog = true;
    }
  }
  onCardDetailChange() {}

  closeDetailDialog() {
    this.showCardDetailDialog = false;
  }
  deleteBoard() {
    this.$confirm("确认删除？", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {})
      .catch((err) => {});
  }
  deleteCard() {
    this.$confirm("确认删除？", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {})
      .catch((err) => {});
  }
  onDeleteMember(memberId: number) {}
  onAddComment() {}
}
</script>
<style lang="scss">
.left-content {
  span:first-child {
    .el-checkbox.title-checkbox:focus {
      outline: none !important;
    }
    .el-checkbox__label:focus {
      outline: none !important;
    }
  }
  span:first-child:focus {
    outline: none !important;
  }
}
.ghost {
  opacity: 0 !important;
}

.add-textarea-input.el-textarea {
  padding: 0 !important;
  .el-textarea__inner {
    resize: none;
    padding: 0 !important;
    border: none !important;
  }
}

.detail-dialog {
  user-select: none;
  .el-dialog {
    border-radius: 16px !important;
    .el-dialog__body {
      padding: 0 20px 20px !important;
    }
    box-sizing: border-box;
    .dialog-input {
      padding: 0 !important;

      .el-textarea__inner {
        resize: none;
        border-radius: 16px !important;
        padding: 10px 5px !important;
        border: 1px solid #dcdfe6 !important;
      }
      &.has-hover .el-textarea__inner {
        border: 1px solid white !important;
      }
      &.has-hover .el-textarea__inner:hover {
        border: 1px solid #dcdfe6 !important;
      }
      &.has-hover .el-textarea__inner:focus {
        border: 1px solid #dcdfe6 !important;
      }
    }
    .detail-input {
      .el-textarea__inner {
        font-size: 24px !important;
        font-weight: 500 !important;
      }
    }
    .desc-input {
      margin-left: 5px;
      width: calc(100% - 20px);
      .el-textarea__inner {
        padding: 5px 8px !important;
        min-height: 34px !important;
        // height: auto !important;
      }
    }
    // .dialog-input:focus {
    // }
    // .el-checkbox {
    // .finished {
    .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: rgb(245, 86, 84) !important;
      border-color: rgb(245, 86, 84) !important;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #000000 !important;
    }
    .el-checkbox__inner:hover {
      border-color: rgb(245, 86, 84) !important;
    }
    // }
    // }
  }
}
.kanban-column-header {
  .header-input {
    .el-input__inner {
      border-radius: 10px;
      // background: red !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.no-comments {
  color: rgba(3, 14, 44, 0.45);
  font-size: 14px;
  text-align: center;
  margin-top: 24px;
  margin-bottom: 24px;
}
.bottom-tabs {
  font-size: 16px;
  font-weight: 500;
  color: rgba(3, 14, 44, 0.85);
  line-height: 24px;
  cursor: pointer;
}
.comments {
  padding-top: 10px;
  .comment-input {
    position: relative;
    .comment-input-buttons {
      width: 150px;
      display: flex;
      justify-content: flex-end;
      .button {
        padding-left: 2px;
        cursor: pointer;
        // background: white;
        text-align: center;
        font-size: 14px;
        width: 66px;
        height: 32px;
        line-height: 32px;
        border-radius: 14px;
        margin-left: 8px;
        &.red {
          color: white;
          background: rgb(245, 86, 84);
        }
        &.disabled {
          cursor: not-allowed;
          background: rgba(245, 86, 84, 0.5);
        }
      }
    }
  }
  .comments-container {
    margin-top: 16px;
    width: 100%;
    word-break: normal;
    max-height: 300px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 5px;
      height: 8px;
      z-index: 999;
      position: fixed;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 20px;
      background: rgb(204, 204, 204);
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: rgb(226, 226, 226);
    }
    .comment-content {
      display: flex;
      -webkit-box-pack: start;
      justify-content: flex-start;
      margin-bottom: 16px;
      &:hover {
        .right {
          .username {
            .delete {
              opacity: 1;
              color: rgba(3, 14, 44, 0.65);
              text-decoration: underline;
            }
          }
        }
      }
      .left {
        margin-right: 16px;
        .avatar {
          width: 40px !important;
          height: 40px !important;
          // background-color: #cccccc !important;
          background-color: rgba(128, 128, 128, 0.3) !important;
          color: rgba(128, 128, 128, 1) !important;
        }
      }
      .right {
        width: 91%;
        .username {
          color: rgba(3, 14, 44, 0.85);
          font-size: 14px;
          margin-bottom: 5px;
          .delete {
            margin-left: 5px;
            cursor: pointer;
            opacity: 0;
            color: rgba(3, 14, 44, 0.85);
          }
        }
        .comment {
          margin-bottom: 5px;
          font-size: 14px;
          white-space: pre-wrap;
          font-weight: 500;
          color: rgba(3, 14, 44, 0.85);
          user-select: text;
        }
        .date {
          font-weight: 400;
          color: rgba(3, 14, 44, 0.45);
          font-size: 14px;
        }
      }
    }
  }
}
.member-list {
  background-color: rgb(17, 175, 167);
  min-width: 24px;
  border-radius: 4px;
  height: 20px;
  line-height: 20px;
  font-weight: 400;
  color: rgb(255, 255, 255);
  margin-right: 4px;
  max-width: 208px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  padding: 0px 8px;
  // margin-bottom: 8px;
  position: relative;
  transition: all 0.5s ease 0s !important;
  i {
    color: rgb(255, 255, 255);
    // font-size: 10px;
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    display: none !important;
    transition: all 0.5s ease 0s !important;
  }
  i:hover {
    color: rgba(255, 255, 255, 0.65);
  }
}

.member-list.dialog-member-list:hover {
  padding-right: 24px;
  i {
    display: block !important;
  }
}
.detail-dialog {
  .dialog-title {
    display: flex;
    justify-content: space-between;
    // el-popper 导致的 focus bug
    .left-content {
      .title-checkbox {
        height: 30px;
        line-height: 30px;
        border-radius: 12px;
        &.finished {
          text-align: center;
          background: rgba(3, 14, 44, 0.04);

          width: 80px;
        }
        &.unfinished {
          width: 20px;
          text-align: left;
          padding-left: 6px;
        }
      }
      span:first-child {
        .el-checkbox.checkbox:focus {
          outline: none !important;
        }
        .el-checkbox__label:focus {
          outline: none !important;
        }
      }
      span:first-child:focus {
        outline: none !important;
      }
    }
    .right-btn {
      margin-right: -5px;
      font-size: 24px;
      font-weight: 600;
      color: rgba(3, 14, 44, 0.65);
      span:first-child:focus {
        outline: none !important;
      }
      i {
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        margin-left: 3px;
      }
      i:hover {
        background: rgba(3, 14, 44, 0.04);
      }
    }
  }
  .member {
    .memeber-list-icon {
      //  margin-right: -5px;
      // font-size: 24px;
      // font-weight: 600;
      // color: rgba(3, 14, 44, 0.65);
      // span:first-child:focus {
      //     outline: none !important;
      // }
      // i {
      cursor: pointer;
      padding: 5px;
      border-radius: 50%;
      margin-left: 3px;
      // }
      &:hover {
        background: rgba(3, 14, 44, 0.04);
      }
    }
  }
}
.kanban-column {
  min-width: 300px;
  min-height: 100px;
  height: auto;
  overflow: hidden;
  // background: #f0f0f0;
  border-radius: 16px;
  padding: 5px 15px;
  .kanban-column-header {
    cursor: move;
    height: 36px;
    line-height: 36px;
    overflow: hidden;
    // padding: 0 20px;
    text-align: left;
    color: rgba(3, 14, 44, 0.85);
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      cursor: pointer;
    }
  }
  .card-list-container {
    //   TODO: 自适应高度
    height: calc(100% - 40px);
    width: 266px;
    overflow: auto;
    padding-right: 5px;
    padding-bottom: 5px;
    margin-top: 8px;
    .cards-container {
      height: auto;
      overflow: hidden;
      border: 1px solid transparent;
      // min-height: 60px;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: center;
      width: 100%;
      .transition-span {
        width: 100%;
        .card-container {
          width: 100%;
          height: fit-content;
          min-height: 40px;
          box-sizing: border-box;
          box-shadow: rgba(3, 14, 44, 0.09) 0px 2px 6px 0px;
          border-radius: 8px;
          cursor: pointer;
          margin: 8px 0;
          background-color: #fff;
          text-align: left;
          padding: 10px 10px;
          box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
        }
        .card-container:first-child {
          margin-top: 0px !important;
        }
      }
    }

    .card-add-container {
      height: auto;
      overflow: hidden;
      border: 1px solid transparent;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: center;
      width: 100%;
      .add-input-container {
        width: 100%;
        height: fit-content;
        box-sizing: border-box;
        box-shadow: rgba(3, 14, 44, 0.09) 0px 2px 6px 0px;
        border-radius: 8px;
        margin-bottom: 8px;
        background-color: #fff;
        text-align: left;
        padding: 5px 10px;
        box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
      }
      .add-input-button {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        .button {
          padding-left: 2px;
          cursor: pointer;
          // background: white;
          text-align: center;
          font-size: 14px;
          width: 66px;
          height: 32px;
          line-height: 32px;
          border-radius: 14px;
          margin-left: 8px;
          &.red {
            color: white;
            background: rgb(245, 86, 84);
          }
          &.disabled {
            cursor: not-allowed;
            background: rgba(245, 86, 84, 0.5);
          }
        }
      }
    }
    .add-card-button {
      text-align: center;
      width: 100%;
      line-height: 40px;
      height: 40px;
      background: rgb(255, 255, 255);
      border-radius: 20px;
      margin-bottom: 8px;
      cursor: pointer;
    }
    .add-card-button:hover {
      color: rgba(3, 14, 44, 0.65);
    }
  }
}
.add-members {
  padding: 16px 0px;
  width: 328px;
  .add-members-header {
    padding-bottom: 8px;
    text-align: center;
    border-bottom: 1px solid rgba(3, 14, 44, 0.04);
    color: rgba(3, 14, 44, 0.85);
    font-size: 16px;
    font-weight: 500;
    margin: 0px 24px 16px;
  }
  .add-members-content {
    height: 230px;
    overflow: auto;
    .members-container {
      padding-left: 24px;
      .members-content {
        overflow: auto;
        .member-container {
          display: flex;
          cursor: pointer;
          -webkit-box-align: center;
          align-items: center;
          margin-bottom: 16px;
          .member-content {
            position: relative;
            background-color: rgb(255, 78, 66);
            width: 286px;
            height: 40px;
            border-radius: 10px;
            transition: all 0.3s ease 0s;
            color: rgb(255, 255, 255);
            padding-left: 14px;
            box-sizing: border-box;
            line-height: 40px;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            i {
              position: absolute;
              right: 19px;
              top: 50%;
              transform: translateY(-50%);
            }
            .member-name {
              height: 100%;
              max-width: 95%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
  .add-members-content::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    z-index: 999;
    position: fixed;
  }
  .add-members-content::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: rgb(204, 204, 204);
    width: 6px;
  }
}
// .kanban-column:first-child {
//     // background: rgba(3, 14, 44, 0.04);
// }
.kanban-column:hover {
  background: rgba(3, 14, 44, 0.04) !important;
}
.card-list-container::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  z-index: 999;
  position: fixed;
}
.card-list-container::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: rgb(204, 204, 204);
  width: 6px;
}
</style>
