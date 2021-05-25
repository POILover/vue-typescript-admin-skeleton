import { isValidURL } from '@/utils/validate'
import { IKanban, IKanbanColumn, ICard, IMember, IUser } from './interface'

export const kanbanList: IKanban[] = [
    {
        createTime: "2021-01-05 08:37:13",
        createUserId: 1,
        createUserName: "Admin",
        kanbanId: 1,
        name: "看板1",
        updateTime: "2021-01-08 15:35:53",
    },
    {
        createTime: "2021-01-05 16:33:26",
        createUserId: 1,
        createUserName: "admin",
        kanbanId: 2,
        name: "看板2",
        updateTime: "2021-01-05 16:33:26",
    }
]

const cardList: ICard[][] = [
    [{
        cardId: 1,
        detail: '看板-列1-卡1 | 滚滚长江东逝水，浪花淘尽英雄。是非成败转头空。青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢。古今多少事，都付笑谈中。',
        desc: 'desc',
        status: 1,
        member: [{
            memberId: 1,
            userId: 1,
            name: 'Admin',
            cardId: 1
        }, {
            memberId: 2,
            userId: 2,
            name: 'cy',
            cardId: 1
        }, {
            memberId: 3,
            userId: 3,
            name: 'zz',
            cardId: 1
        }, {
            memberId: 4,
            userId: 4,
            name: 'gw',
            cardId: 1
        }],
        commentList: [{
            comment: '很好',
            createTime: '2021-01-08 13:57:25',
            commentId: 1,
            username: 'Admin'
        },
        {
            comment: '非常好',
            createTime: '2021-01-08 11:36:47',
            commentId: 2,
            username: 'cy'
        },
        {
            comment: '滚滚长江东逝水，浪花淘尽英雄。是非成败转头空。青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢。古今多少事，都付笑谈中。',
            createTime: '2021-01-08 11:32:48',
            commentId: 3,
            username: 'zz'
        },
        {
            comment: '大江东去，浪淘尽，千古风流人物。故垒西边，人道是，三国周郎赤壁。乱石穿空，惊涛拍岸，卷起千堆雪。江山如画，一时多少豪杰。遥想公瑾当年，小乔初嫁了，雄姿英发。羽扇纶巾，谈笑间，樯橹灰飞烟灭。故国神游，多情应笑我，早生华发。',
            createTime: '2021-01-08 11:32:48',
            commentId: 5,
            username: 'gw'
        }]
    },
    {
        cardId: 2,
        detail: '看板-列1-卡2',
        desc: '',
        status: 0,
        member: [{
            memberId: 5,
            userId: 1,
            name: 'Admin',
            cardId: 2
        }, {
            memberId: 6,
            userId: 2,
            name: 'cy',
            cardId: 2
        }],
        commentList: [{
            comment: '很好',
            createTime: '2021-01-08 13:57:25',
            commentId: 1,
            username: 'Admin'
        },
        ]
    },
    {
        cardId: 3,
        detail: '看板-列1-卡3',
        desc: '',
        status: 0,
        member: [{
            memberId: 7,
            userId: 1,
            name: 'Admin',
            cardId: 3
        }, {
            memberId: 8,
            userId: 4,
            name: 'gw',
            cardId: 3
        }],
        commentList: []
    }, {
        cardId: 4,
        detail: `看板-列1-卡4 | 滚滚长江东逝水，浪花淘尽英雄。是非成败转头空。青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢。古今多少事，都付笑谈中。`,
        desc: '',
        status: 0,
        member: [],
        commentList: []
    }, {
        cardId: 5,
        detail: `看板-列1-卡5 | 滚滚长江东逝水，浪花淘尽英雄。是非成败转头空。青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢。古今多少事，都付笑谈中。`,
        desc: '',
        status: 0,
        member: [],
        commentList: []
    }, {
        cardId: 6,
        detail: `看板-列1-卡6 | 滚滚长江东逝水，浪花淘尽英雄。是非成败转头空。青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢。古今多少事，都付笑谈中。`,
        desc: '',
        status: 0,
        member: [],
        commentList: []
    }, {
        cardId: 7,
        detail: `看板-列1-卡7 | 滚滚长江东逝水，浪花淘尽英雄。是非成败转头空。青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢。古今多少事，都付笑谈中。`,
        desc: '',
        status: 0,
        member: [],
        commentList: []
    }, {
        cardId: 8,
        detail: `看板-列1-卡8 | 滚滚长江东逝水，浪花淘尽英雄。是非成败转头空。青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢。古今多少事，都付笑谈中。`,
        desc: '',
        status: 0,
        member: [],
        commentList: []
    }],
    [{
        cardId: 9,
        detail: '看板-列2-卡1',
        desc: '',
        status: 0,
        member: [{
            memberId: 9,
            userId: 1,
            name: 'Admin',
            cardId: 9
        }, {
            memberId: 10,
            userId: 2,
            name: 'cy',
            cardId: 9
        }, {
            memberId: 11,
            userId: 3,
            name: 'zz',
            cardId: 9
        }, {
            memberId: 12,
            userId: 4,
            name: 'gw',
            cardId: 9
        }],
        commentList: [{
            comment: '很好',
            createTime: '2021-01-08 13:57:25',
            commentId: 1,
            username: 'Admin'
        },
        {
            comment: '非常好',
            createTime: '2021-01-08 11:36:47',
            commentId: 2,
            username: 'Admin'
        },
        {
            comment: '大江东去浪淘尽',
            createTime: '2021-01-08 11:32:48',
            commentId: 3,
            username: 'Admin'
        }]
    },
    {
        cardId: 10,
        detail: '看板-列2-卡2',
        desc: '',
        status: 0,
        member: [{
            memberId: 13,
            userId: 1,
            name: 'Admin',
            cardId: 10
        }, {
            memberId: 14,
            userId: 2,
            name: 'cy',
            cardId: 10
        }],
        commentList: [{
            comment: '很好',
            createTime: '2021-01-08 13:57:25',
            commentId: 1,
            username: 'Admin'
        },
        ]
    },
    {
        cardId: 11,
        detail: '看板-列2-卡3',
        desc: '',
        status: 0,
        member: [{
            memberId: 15,
            userId: 1,
            name: 'Admin',
            cardId: 11
        }, {
            memberId: 16,
            userId: 4,
            name: 'gw',
            cardId: 11
        }],
        commentList: []
    }, {
        cardId: 12,
        detail: '看板-列2-卡4',
        desc: '',
        status: 0,
        member: [],
        commentList: []
    }, {
        cardId: 13,
        detail: '看板-列2-卡5',
        desc: '',
        status: 0,
        member: [],
        commentList: []
    }, {
        cardId: 14,
        detail: '看板-列2-卡6',
        desc: '',
        status: 0,
        member: [],
        commentList: []
    }, {
        cardId: 15,
        detail: '看板-列2-卡7',
        desc: '',
        status: 0,
        member: [],
        commentList: []
    }],
    [],
    [],
    [],
    [],
    [],
    [],
    []
]
export const kanbanColumnList: IKanbanColumn[] =
    cardList.map((_, key) => {
        return {
            kanbanColumnId: key + 1,
            title: `看板-列${key + 1}`,
            cardList: cardList[key]
        }
    })


export const allUserList: IUser[] =
    [
        {
            name: 'Admin', userId: 1
        },
        {
            name: 'cy', userId: 2
        },
        {
            name: 'zz', userId: 3
        },
        {
            name: 'gw', userId: 4
        }
    ]

export function getCard(cardId: number): ICard | null {
    let ret = null
    for (let cardListItem of cardList) {
        if (cardListItem.length) {
            for (let card of cardListItem) {
                console.log(card.cardId)
                if (card.cardId === cardId) {
                    ret = card
                    break;
                }
            }
        }
    }
    return ret

}

