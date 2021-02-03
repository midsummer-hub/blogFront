<template>
  <div>
    <div class="row title">
      <div class="col-md-4">
        <h2>开源博客<span>专注移动开发</span></h2>
      </div>
      <div class="col-md-8">
        <iframe width="420" height="60" frameborder="0" scrolling="no" hspace="0"
                src="https://i.tianqi.com/?c=code&a=getcode&id=12&num=3&icon=1"></iframe>
      </div>
    </div>
    <div class="row title-bar">
      <div class="col-md-12">
        <nav class="navbar navbar-expand-lg navbar-light">
          <router-link class="navbar-brand" :to="{name: 'IndexList'}">首页</router-link>
          <div class="collapse navbar-collapse">
            <div class="navbar-nav">
              <router-link class="nav-item nav-link active" :to="{name: 'AboutInfo'}">关于博主</router-link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "IndexTitle",
    methods: {
      // makeToast() {
      //   this.$bvToast.toast('this is toast number', {
      //     title: 'BootstrapVue Toast',
      //     autoHideDelay: 2000,
      //     appendToast: true,
      //     variant: 'danger',
      //     toaster: 'b-toaster-top-right'
      //   });
      //   console.log("aaa")
      // }
    }
  }
</script>

<style scoped>
  .title h2 {
    color: #ea6f5a;
    padding: 0.8rem 0;
  }

  .title span {
    margin-left: 0.6rem;
    font-size: 1rem;
    color: #999;
  }

  .title-bar {
    border: 0.1rem #d5d5d5 solid;
    border-radius: 0.3rem;
    margin-left: 0;
  }
  .navbar-brand{
    font-weight: bold;
  }
</style>
