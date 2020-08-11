<template>
    <div>
        <div class="new-memo">
            <div class="editor-top">
                <input class="editor-title form-control" type="text" placeholder="标题"
                       v-model="newMemo.title">
                <div class="dropdown">
                    <button class="e-btn" @click="dropdown">
                        <span>{{ categories[newMemo.categoryId] }}</span>
                    </button>
                    <ul class="dropdown-menu" v-show="isDown" @click="retract">
                        <li @click="newMemo.categoryId = 1"><a>工作</a></li>
                        <li @click="newMemo.categoryId = 2"><a>生活</a></li>
                        <li @click="newMemo.categoryId = 3"><a>学习</a></li>
                    </ul>
                </div>
                <ul class="tools">
                    <li class="save" @click="saveNewMemo"></li>
                    <li class="cancel" @click="hideAllEditorLayers('new-layer')"></li>
                </ul>
            </div>
            <textarea class="text-content form-control" placeholder="内容"
                      v-model="newMemo.content">
          </textarea>
        </div>

        <div class="editor-memo">
            <div class="editor-top">
                <input class="editor-title form-control" type="text"
                       v-model="memoToEdit.title">
                <div class="dropdown">
                    <button class="e-btn" @click="dropdown">
                        <span>{{ categories[memoToEdit.categoryId] }}</span>
                    </button>
                    <ul class="dropdown-menu" v-show="isDown" @click="retract">
                        <li @click="memoToEdit.categoryId = 1"><a>工作</a></li>
                        <li @click="memoToEdit.categoryId = 2"><a>生活</a></li>
                        <li @click="memoToEdit.categoryId = 3"><a>学习</a></li>
                    </ul>
                </div>
                <ul class="tools">
                    <li class="save" @click="saveEditorMemo"></li>
                    <li class="cancel" @click="hideAllEditorLayers('editor-layer')"></li>
                </ul>
            </div>
            <textarea class="text-content form-control" placeholder="内容"
                      v-model="memoToEdit.content" >
          </textarea>
        </div>
    </div>
</template>

<script>
import storeUtil from "@/storage/memolist";

let store = storeUtil.memostore;
let Memo = storeUtil.Memo;

    export default {
        props:['memo'],
        data(){
            return {
                isDown: false,
                categories: {
                    1: '工作',
                    2: '生活',
                    3: '学习',
                },
                // 新增的 memo 对象
                newMemo: new Memo({
                    id: store.length-1,
                    categoryId: 3,
                    title: ' ',
                    content: '',
                    timeStamp:''
                }),
                memoToEdit:{
                    title:"",
                    content:"",
                    categoryId:1
                }
            }
        },
        methods: {
            dropdown() {
                this.isDown = !this.isDown;
            },
            saveNewMemo() {
                store.add({
                    id: this.newMemo.id,
                    categoryId: this.newMemo.categoryId,
                    title: this.newMemo.title,
                    content: this.newMemo.content,
                    timeStamp: this.newMemo.timeStamp
                });
                store.saveToLocalStorage();
                this.newMemo.title = this.newMemo.content = "";
                this.hideAllEditorLayers('new-layer');
            },
            hideAllEditorLayers(elemId) {
                let editor = document.getElementById(elemId);
                editor.style.display = "none";
                document.body.style.overflow = 'auto';
            },
            retract() {
                this.isDown = !this.isDown;
            },
            saveEditorMemo() {
                // let agentMemo = new Memo({
                //     categoryId: this.memoToEdit.categoryId,
                //     title: newTitle,
                //     type: 0,
                //     content: newContent,
                //     timeStamp: this.memoToEdit.timeStamp,
                //     isCompleted: this.memoToEdit.isCompleted,
                // });
                // store.update(this.memoToEdit,agentMemo);
                // store.saveToLocalStorage();

                this.hideAllEditorLayers('editor-layer');
            },
            editorMemo() {
                console.log(this.memo);
                console.log(this.memo.title);
                // this.memoToEdit.title = this.memo.title;
                this.$nextTick(() => {
                    this.memoToEdit = this.memo;
                })
            },

        }
    }
</script>


