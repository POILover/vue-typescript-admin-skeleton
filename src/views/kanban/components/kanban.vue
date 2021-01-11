<template>
  <draggable
    @start="parentDragging = false"
    @end="parentDragging = true"
    :disabled="childDragging"
    v-bind="dragOptions"
    :list="kanbanColumnList"
    handle=".kanban-column-header"
    @change="sortBoard"
    class="kanban-column-container"
  >
    <draggable-kanban
      ref="kanban"
      class="kanban"
      :parentDragging="parentDragging"
      :headerText="kanbanColumn.title"
      @listChanged="listChanged"
      @detailChanged="detailChanged"
      @listDeleted="listDeleted"
      @dragChange="dragChange"
      @getBoard="getBoard"
      @childDrag="childDrag"
      :allMemberList="allMemberList"
      :boardId="boardId"
      v-for="kanbanColumn in kanbanColumnList"
      :key="kanbanColumn.kanbanColumnId"
      :list="kanbanColumn.cardList"
      :boardDetailId="kanbanColumn.kanbanColumnId"
    >
    </draggable-kanban>
    <div class="kanban-column-add-container">
      <div v-if="isAdd" class="add-input-container">
        <div class="add-input">
          <el-input
            v-model="addColumnInputContent"
            :autosize="{ minRows: 3 }"
            ref="addColumnInput"
            class="add-textarea-input"
            placeholder="请输入..."
            style="width:100%"
            type="textarea"
          ></el-input>
        </div>
        <div class="add-input-button">
          <span @click="addColumnCancel" class="button plain">取消</span>
          <span
            @click="addColumnConfirm"
            :class="addColumnInputContent ? '' : 'disabled'"
            class="button red"
            >添加</span
          >
        </div>
      </div>
      <div v-if="!isAdd" @click="addColumn" class="add-button">
        <i class="el-icon-plus" /> 添加列表
      </div>
    </div>
  </draggable>
</template>

<script lang="ts">
import Draggable from "vuedraggable";
import { Component, Vue } from "vue-property-decorator";
import DraggableKanban from "./item.vue";
import { Input as ElInput } from "element-ui";
import { IMember, IUser } from "../data/interface";
import { allUserList, kanbanColumnList } from "../data/data";
declare module "vue/types/vue" {
  interface Vue {
    [key: string]: any;
  }
}

@Component({
  name: "DraggableKanbanDemo",
  components: {
    DraggableKanban,
    Draggable,
  },
})
export default class extends Vue {
  private childDragging: boolean = false;
  private group = "mission";
  private kanbanColumnList: any[] = [];
  private allMemberList: IUser[] = [];
  private boardId: number = -1;
  private parentDragging: boolean = true;
  private isAdd: boolean = false;
  private addColumnInputContent: string = "";
  get dragOptions() {
    return {
      animation: 200,
      group: "description",
      disabled: false,
      ghostClass: "ghost",
    };
  }
  mounted() {
    this.boardId = Number(this.$route.query.id);
    this.getBoard();
    this.getMembers();
    this.addHorizonDrag();
  }
  addHorizonDrag() {
    // 添加横向滚动条事件，当board横向超过满屏时，拖拽 .board层 实现横向滚动条滚动
    const main = document.querySelector(".kanban-column-container");
    let isMove = false;
    let initX = 0;
    let moveX = 0;
    let dis = 0;
    let initScrollLeft = 0;
    // 给 main 添加mousedown事件要采用捕捉方式获取最下面一层的div
    main?.addEventListener(
      "mousedown",
      function(e: any) {
        console.log(e.target);
        let target = e.target as HTMLElement;
        if (target.id === "card") {
          initScrollLeft = main.scrollLeft;
          isMove = true;
          initX = e.pageX;
        } else {
          isMove = false;
        }
      },
      true
    );
    main?.addEventListener("mousemove", function(e: any) {
      if (isMove) {
        moveX = e.pageX;
        dis = -moveX + initX;
        main.scrollLeft = dis + initScrollLeft;
      }
    });
    // 要给全局 window 添加mouseup事件
    window.addEventListener("mouseup", function() {
      isMove = false;
    });
  }
  getMembers() {
    this.allMemberList = allUserList;
  }
  childDrag(bool: boolean) {
    this.childDragging = bool;
  }
  dragChange(event: any) {
    let currCardId = (event.moved || event.removed || event.added).element
      .cardId;
    let nextCardId: number;
    let currKanbanColumnId: number;
    let allCardList: { kanbanColumnId: number; cardId: number }[] = [];
    this.kanbanColumnList.forEach((item) => {
      if (item.cardList) {
        for (let card of item.cardList) {
          allCardList.push({
            kanbanColumnId: item.kanbanColumnId,
            cardId: card.cardId,
          });
        }
      }
    });
    let currIdx = allCardList.findIndex((item) => item.cardId === currCardId);
    currKanbanColumnId = allCardList[currIdx].kanbanColumnId;
    if (currIdx === allCardList.length - 1) {
      nextCardId = -1;
    } else {
      let nextItem = allCardList[currIdx + 1];
      if (nextItem.kanbanColumnId === currKanbanColumnId) {
        nextCardId = nextItem.cardId;
      } else {
        nextCardId = -1;
      }
    }
    console.log(currCardId, nextCardId, currKanbanColumnId);
  }
  getBoard() {
    this.kanbanColumnList = kanbanColumnList;
    // NOTE：接口调试的一些坑
    // this.$nextTick(() => {
    //   let kanbanColumnList: any = this.$refs.kanban;
    //   kanbanColumnList.forEach((item: any) => {
    //     item.isModifyHeader = false;
    //     item.showAdd = false;
    //     item.addColumnInputContent = "";
    //   });
    //   this.isAdd = false;
    //   this.addColumnInputContent = "";
    // });
  }
  listChanged(data: { item: string; boardDetailId: number }) {}
  detailChanged(data: {
    name: string;
    id: number;
    desc: string;
    status: number;
    members: string;
  }) {}
  listDeleted() {}
  sortBoard(event: any) {
    let currId = (event.moved || event.removed || event.added).element.id;
    let lastId: number;
    let boardId = this.boardId;

    let allBoardList: number[] = [];
    this.kanbanColumnList.forEach((item) => {
      allBoardList.push(item.id);
    });
    let currIdx = allBoardList.indexOf(currId);
    let currBoardId = allBoardList[currIdx];
    if (currIdx === allBoardList.length - 1) {
      lastId = -1;
    } else {
      lastId = allBoardList[currIdx + 1];
    }
    console.log(boardId, currId, lastId);
  }
  addColumn() {
    this.isAdd = true;
    this.$nextTick(() => {
      (this.$refs.addColumnInput as ElInput).focus();
    });
  }
  addColumnConfirm() {
    if (!this.addColumnInputContent) {
      return;
    }
  }
  addColumnCancel() {
    this.isAdd = false;
    this.addColumnInputContent = "";
  }
}
</script>

<style lang="scss">
.el-popover__reference-wrapper:focus {
  outline: none !important;
}
.el-popover__reference-wrapper {
  &:focus {
    outline: none !important;
  }
}
.el-popper {
  min-width: 0px !important;
  padding: 0 !important;
  .simple-div-popover {
    padding: 6px;
  }
  .popper-content {
    width: 110px;
    padding: 8px 14px;
    cursor: pointer;
    height: 40px;
    line-height: 22px;
  }
  .popper-content:hover {
    background-color: rgba(245, 86, 84, 0.09);
    color: rgb(245, 86, 84) !important;
  }
  .popper-content:first-child {
    margin-top: 0px;
  }
}
</style>

<style lang="scss" scoped>
.kanban-column-container {
  user-select: none;
  height: calc(100%);
  padding: 10px 0 0 0 !important;
  margin: 0 !important;
  width: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: row;
}
.kanban-column-add-container {
  min-width: 266px;
  .add-button {
    color: rgb(245, 86, 84);
    width: 100%;
    line-height: 40px;
    height: 40px;
    cursor: pointer;
  }
  .add-input-container {
    height: auto;
    overflow: hidden;
    border: 1px solid transparent;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .add-input {
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
}
.flip-list-move {
  transition: transform 0.5s;
}
</style>
