<template>
    <div class="memo-container">
        <div class="memo">
            <div class="memo-heading">
                <h4>{{memo.title}}</h4>
                <div class="memo-heading-b">
                    <button class="b-modify" @click="editorMemo" ></button>
                    <button class="b-delete" @click="deleteMemo"></button>
                </div>
            </div>
            <div class="memo-info">
                <span class="memo-info-time">{{memo.timeStamp}}</span>
                <span class="memo-info-cat">分类：{{categories[memo.categoryId]}}</span>
            </div>
            <div class="memo-content" v-html="memo.content">
                {{memo.content}}
            </div>
        </div>
        <memo-editor id="editor-layer"  ref="child"  :memo="memo"
                     style="display: none"
                     ></memo-editor>
    </div>
    
</template>

<script>
import storeUtil from '../storage/memolist';
import MemoEditor from "@/components/memoEditor";

    let store = storeUtil.memostore;

    export default {
        components: {MemoEditor},
        props: ['memo'],
        data () {
            return {
                categories: {
                    1: '工作',
                    2: '生活',
                    3: '学习',
                },
                someShow:false
            };
        },
        methods:{
            deleteMemo () {
                if (confirm(`确定删除「${this.memo.title}」吗？`)) {
                    store.remove(this.memo);
                    store.saveToLocalStorage();
                }
            },
            editorMemo(){
                window.scrollTo(0,0);
                document.body.style.overflow ='hidden';

                let editor = document.getElementById('editor-layer');
                editor.style.display = 'block';
                editor.childNodes[0].style.display = 'none';
                editor.childNodes[1].style.display = 'block';

                // console.log(this.memo.title);
                this.$refs.child.editorMemo();
            }
        }
    }
</script>

