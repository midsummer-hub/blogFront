<template>
  <div id="pagenation" class="row justify-content-center">
    <div class="col-md-12">
      <ul class="pagination ">
        <li class="page-item">
          <a href="javascript:void(0);" @click="startPage" class="page-link">首页</a>
        </li>
        <li v-for="i in displayPage"
            :key="'pagenation_'+i" :class="pagenationItemActive(i)">
          <a href="javascript:void(0)" @click="selectPage(i)" class="page-link">{{i}}</a>
        </li>
        <li class="page-item ">
          <a href="javascript:void(0);" @click="endPage" class="page-link">尾页</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Pagenation",
    data() {
      return {
        jumpPageNum: '',
        jumpPageNumPlaceholder: '跳转到...'
      }
    },
    props: {
      pagenation: Object,
      // pagenation: {
      //     total: 22,
      //     pageSize: 10,
      //     pageNum: 1,
      // },
    },
    computed: {
      displayPage() {
        let totalPage = parseInt(Math.ceil(this.pagenation.total / this.pagenation.pageSize));
        let pageNum = this.pagenation.pageNum;
        if (totalPage < 10) {
          return totalPage;
        } else {
          let arr = []
          if (pageNum < 5) {
            for (let i = 1; i <= 10; i++) {
              arr.push(i)
            }
          } else if (pageNum >= totalPage - 5) {
            for (let i = totalPage - 9; i <= totalPage; i++) {
              arr.push(i)
            }
          } else {
            for (let i = pageNum - 4; i <= pageNum + 5 && i < totalPage; i++) {
              arr.push(i)
            }
          }
          return arr
        }
      }
    },
    watch: {
      'pagenation.pageNum'(newValue, oldValue) {
        this.$emit("pageChange", newValue)
      },
    },
    methods: {
      pagenationItemActive(i) {
        if (i == this.pagenation.pageNum) {
          return 'page-item active'
        } else {
          return 'page-item'
        }
      },
      selectPage(pageNum) {
        if(this.pagenation.pageNum != pageNum) {
          this.pagenation.pageNum = pageNum
        }
      },
      startPage() {
        if (this.pagenation.pageNum !== 1) {
          this.pagenation.pageNum = 1
        }
      },
      endPage() {
        let totalPage = this.pagenation.total % this.pagenation.pageSize === 0 ? (parseInt(this.pagenation.total / this.pagenation.pageSize)) : (parseInt(this.pagenation.total / this.pagenation.pageSize) + 1)
        if (this.pagenation.pageNum !== totalPage) {
          this.pagenation.pageNum = totalPage
        }
      }
    }
  }
</script>

<style scoped>

</style>
