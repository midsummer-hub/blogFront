<template>
  <div class="col-md-9">
    <div class="data">
      <div class="data-title">
        <img src="@/assets/show_icon.png">
        <span>博客信息</span>
      </div>
      <div>
        <div class="blog-title">{{blog.title}}</div>
        <div class="blog-info">
          发布时间：『 {{blog.add_time}} 』  博客类别：{{blog.type_name}}   阅读({{blog.click_hit}}) 评论({{blog.replay_hit}})
        </div>
        <div class="blog-content" v-html="blog.content"></div>
      </div>
      <div class="blog-page">
        <p v-if="last">上一篇： <router-link :to="{name: 'ShowBlog', params: {id: last.id}}">{{last.title}}</router-link></p>
        <p v-else>上一篇： 没有了</p>
        <p v-if="next">下一篇： <router-link :to="{name: 'ShowBlog', params: {id: next.id}}">{{next.title}}</router-link></p>
        <p v-else>下一篇： 没有了</p>
      </div>
    </div>
    <div class="data">
      <div class="data-title">
        <img src="@/assets/comment_icon.png">
        <span>评论信息</span>
      </div>
      <div v-if="comments && comments.length > 0" class="comment">
        <p v-for="(item, index) in comments" :key="index">
          <label>{{index+1}}楼:&nbsp;&nbsp;&nbsp;&nbsp;{{item.ip}}:&nbsp;&nbsp;&nbsp;&nbsp;</label>{{item.content}}&nbsp;&nbsp;&nbsp;&nbsp;[&nbsp;{{item.add_time}}&nbsp;]
        </p>
      </div>
      <div v-else class="comment"><p>无评论</p></div>
    </div>
    <div class="data">
      <div class="data-title">
        <img src="@/assets/publish_comment_icon.png">
        <span>发表评论</span>
      </div>
      <div class="publish-comment">
        <b-form-textarea rows="3" :placeholder="placeholder" v-model="content" :state="state"></b-form-textarea>
        <b-button variant="primary" @click="comment">吐嘈一下</b-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {getBlog, comment} from "@/api/api";

  export default {
    name: "ShowBlog",
    data() {
      return {
        id: 1,
        blog: {},
        last: {},
        next: {},
        content: '',
        placeholder: '随便吐嘈',
        state: null,
        comments: [],
      }
    },
    watch: {
      '$route' (to, from) {
        if(to.params.id != from.query.id && to.params.id != 0){  //pid不为空才请求数据
          this.id = to.params.id;
          this.loadData();
        }
      }
    },
    mounted() {
      this.id = this.$route.params.id == undefined ? 1 : parseInt(this.$route.params.id);
      this.loadData();
    },
    methods: {
      comment(){
        if(this.content.length > 10 == false) {
          this.state = false;
          this.placeholder = "请填写至少10个字符以上";
          return;
        }
        let data = {blog_id: this.blog.id, content: this.content};
        comment(data).then( res => {
          if(res.data.code == 0) {
            this.$bvToast.toast("评论提交成功", {
              title: '提示',
              autoHideDelay: 2000,
              appendToast: true,
              variant: 'success'
            })
          } else {
            this.$bvToast.toast(res.data.msg, {
              title: '警告',
              autoHideDelay: 2000,
              appendToast: true,
              variant: 'danger'
            })
          }
        }).catch( e => {
          console.log(e)
        })
        this.content = '';
      },
      loadData(){
        getBlog({id: this.id}).then( res => {
          if(res.data.code == 0) {
            this.blog = res.data.data.blog;
            this.last = res.data.data.last;
            this.next = res.data.data.next;
            this.comments = res.data.data.comments;
          } else {
            console.log(res.data)
          }
        }).catch( e => {
          console.log(e)
        })
      }
    }
  }
</script>

<style>
  .data{
    border: 0.1rem #d5d5d5 solid;
    margin-top: 1rem;
  }
  .data-title {
    text-align: left;
    padding: 0.6rem;
    border-bottom: 0.1rem #d5d5d5 solid;
    margin: 0.6rem;
  }
  .data-title span {
    color: #333;
    font-size: 1rem;
    font-weight: bold;
    margin-left: 0.4rem;
    position: relative;
    top: 0.1rem;
  }
  .blog-title{
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
    margin: 1rem 0;
  }
  .blog-info{
    text-align: center;
    font-size: 0.8rem;
    color: #333;
    margin: 1rem 0;
  }
  .blog-content {
    margin: 1rem;
    text-align: left;
    font-size: 1rem;
    border-bottom: 0.1rem #d5d5d5 solid;
  }
  .blog-page{
    margin: 1rem;
    text-align: left;
    font-size: 0.8rem;
  }
  .blog-page p{
    margin-bottom: 0.6rem;
  }
  .comment{
    font-size: 0.8rem;
    margin: 1rem;
    /*padding-bottom: 0.6rem;*/
  }
  .comment p{
    border-bottom: 0.1rem #d5d5d5 solid;
    padding-bottom: 0.2rem;
  }
  .comment label{
    font-weight: bold;
  }
  .publish-comment{
    margin: 1rem 1rem 0.6rem 1rem;
  }
  .publish-comment textarea{
    width: 100%;
    padding: 0.6rem;
  }
  .publish-comment button{
    position: relative;
    left: calc(100% - 5.5rem);
    margin: 0.6rem 0;
  }
</style>
