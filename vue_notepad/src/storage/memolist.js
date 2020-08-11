const toReadableDate = (timeStamp) => {
    let dateObj = new Date(timeStamp);
    const toTwoDigits = (str) => {
        if (str.valueOf() < 10) {
            return '0' + str;
        }
        return str;
    }
    return `${toTwoDigits(dateObj.getMonth() + 1)}-${toTwoDigits(dateObj.getDate())}, ${toTwoDigits(dateObj.getHours())}:${toTwoDigits(dateObj.getMinutes())}`;
};

class Memo{
    constructor(obj) {
        this.id = obj.id;
        // 笔记分类  1工作 2生活 3学习
        this.categoryId = obj.categoryId;
        // 20字符内的字符串
        this.title = obj.title;
        //内容
        this.content = obj.content;
        // 创建时的时间戳（#为了以 json 保存，转换为字符串）
        // eslint-disable-next-line no-undef
        this.timeStamp = toReadableDate(Date.parse(new Date()));

    }
}

class VueMemoStore {
    constructor() {
        this.memos = [];
    }
    //这两个函数重要
    loadFromLocalStorage(){
        this.memos = JSON.parse(localStorage.getItem('store')).memos;
    }
    saveToLocalStorage () {
        let allModificationDoneFlag = setInterval(() => {
                clearInterval(allModificationDoneFlag);
                localStorage.setItem('store', JSON.stringify(this));

        }, 10);
    }
    add(memo){
        this.memos.push(memo);
    }
    remove(memo){
        this.memos.splice(this.memos.indexOf(memo),1);
    }
    update(memo,newMemo){
        this.memos.splice(this.memos.indexOf(memo), 1, newMemo);
    }

    init(){
        let m1=new Memo({
            id:1,
            categoryId:3,
            title:'1. 样式引用',
            content:`这个应用使用了[Bootstrap](https://www.getbootstrap.com)的导航栏样式和栅格系统，主体部分的背景来自[V2EX](https://www.v2ex.com)。`,
        })
        // eslint-disable-next-line no-undef
        m1.timeStamp = toReadableDate(new Date(Date.parse('Oct 8, 2016')));
        this.add(m1);

        let m2 = new Memo({
            id:2,
            categoryId: 3,
            title: '2. 原来vue 2.0不向下兼容',
            content: `一开始就傻乎乎的对照着1.0优美的中文文档写，发现各种无法解决的问题，后来才发现2是不向下兼容的：\n\n a. 周期钩子命名改变\n\n b. 使用\`v-html\`特性代替三大括号的html文本插值\n\n c. 弃用\`filterBy\`、\`orderBy\`等过滤器，提倡使用\`computed\`对象\n\n d. \`$dispatch\`、\`$broadcast\`、\`events\`居然都废弃了…这时我忍不了了，果断改用1.0`
        });
        // eslint-disable-next-line no-undef
        m2.timeStamp = toReadableDate(new Date(Date.parse('Oct 1, 2016')));
        this.add(m2);

        let m3 = new Memo({
            id:3,
            categoryId: 1,
            title: '3. Khal Drogo - Quote',
            content: `> **「至于卓戈之子雷戈，骑着世界的骏马，我也要送他一件礼物。我要送他那张他母亲的父亲坐过的铁椅子，我要送他七大王国。我，卓戈，卡奥，要做这件事。」他的音量渐高，举起拳头对天呼喊，「我要带着我的卡拉萨向西走到世界尽头，骑着木马横渡黑色咸水，做出古往今来其他卡奥都从来没有做过的事。我要杀死穿铁衣服的人，拆了他们的石头房子。我要强奸他们的女人，抓他们的小孩来做奴隶，把他们无用的神像带回维斯·多斯拉克，向圣母山行礼。我，拔尔勃之子卓戈在此发誓，在圣母山前发誓，以天上群星为证。」**`,
        });
        // eslint-disable-next-line no-undef
        m3.timeStamp = toReadableDate(new Date(Date.parse('Oct 6, 2016')));
        this.add(m3);

        let m4 = new Memo({
            id:4,
            categoryId: 2,
            title: '4. 购物',
            content: `* 蓝月亮袋装洗衣液\n\n * 乐事薯片飘香麻辣锅味\n\n * **Marlboro Double Burst** \n\nType-C 连接线`,
        });
        // eslint-disable-next-line no-undef
        m4.timeStamp = toReadableDate(new Date(Date.parse('Oct 7, 2016')));
        this.add(m4);

        let m5 = new Memo({
            id:5,
            categoryId: 1,
            title: '5. Westworld - Quote',
            content: `> By most mechanical and dirty hand,\n\n> I shall have such revenges on you both.\n\n> The things I will do,\n\n> what they are yet I know not,\n\n> but they will be the terrors of the earth.`,
        });
        // eslint-disable-next-line no-undef
        m5.timeStamp = toReadableDate(new Date(Date.parse('Oct 4, 2016')));
        this.add(m5);

        this.saveToLocalStorage();

    }


}
let store = new VueMemoStore();

if (localStorage.getItem('store') !== null) {
    store.loadFromLocalStorage();
} else {
    store.init();
}

let storeUtil = {
    memostore: store,
    Memo
}

export default storeUtil;



