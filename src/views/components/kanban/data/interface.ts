export interface IKanban {
    createTime: string
    createUserId: number
    createUserName: string
    kanbanId: number
    name: string
    updateTime: string
}

export interface IKanbanColumn {
    title: string
    kanbanColumnId: number
    cardList: ICard[]
}

export interface ICard {
    cardId: number
    detail: string
    desc: string
    member: IMember[]
    status: number,
    commentList: IComment[]
}

export interface IMember {
    memberId: number
    userId: number
    name: string
    cardId: number
}

export interface IComment {
    comment: string
    createTime: string
    commentId: number
    username: string
}

export interface IUser {
    name: string
    userId: number
}

export interface IMember extends IUser {
    memberId: number
    cardId: number
}