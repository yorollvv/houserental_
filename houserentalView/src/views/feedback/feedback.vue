<template>
  <div class="app-container">
    <div class="filter-container">
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        border
        fit
        class="my_table">
        <el-table-column
          label="序号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column  property="uNickname" label="留言人" > </el-table-column>
        <el-table-column property="fdTime"label="留言时间"/>
        <el-table-column property="fdDetail" label="留言内容" />
        <el-table-column
          property="fdResult"
          label="是否回复" >
             <template slot-scope="{row}">
                   <el-tag v-if="row.fdResult != '' " type="info">已回复</el-tag>
                   <el-tag v-if="row.fdResult === '' " type="danger">未回复</el-tag>
              </template>
        </el-table-column>

        <el-table-column  property="fdResult"  label="回复内容" > </el-table-column>
        <el-table-column
          property="handleTime"
          label="回复时间" >
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button size="mini" v-if="row.fdResult ==='' "  @click="showCheckView(row)">回复</el-button>
              <el-button size="mini" v-if="row.fdResult !='' "  disabled>已回复 </el-button>
          </template>
        </el-table-column>

      </el-table>

      <!--分页-->
      <el-pagination
        :current-page="currentPage"
        :page-sizes="page_sizes"
        :page-size="page_size"
        @current-change="handleCurrentChange"
        layout="prev, pager, next, jumper"
        background
        :total="total"
        class="page_css">
      </el-pagination>
    </div>


     <!--弹出层-->
      <el-dialog title="信息反馈" :visible.sync="outerVisible">
           <el-form label-position="left" label-width="80px" :model="feedbackInfo">
             <el-form-item label="反馈人">
               <el-input v-model="feedbackInfo.uNickname" disabled></el-input>
             </el-form-item>
             <el-form-item label="反馈内容">
               <el-input v-model="feedbackInfo.fdDetail" disabled></el-input>
             </el-form-item>
             <el-form-item label="回复内容">
               <el-input v-model="feedbackInfo.fdResult"></el-input>
             </el-form-item>
           </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="outerVisible = false">关闭</el-button>
             <el-button type="primary" @click="feedbackPuhsCheck">确认提交</el-button>
          </div>
      </el-dialog>

  </div>
</template>

<script>
  /* eslint-disable */
   import { getToken} from '@/utils/auth'
  import {
    list,
    pushCheck
  } from '@/api/feedback' // eslint-disable-line no-unused-vars
  export default {
    name: 'feedbackList',
    data() {
      return {
        outerVisible:false,
        form: {
         page:1,
         pageSize:20,
         addTime: ''
        },
        tableData: [],
        //总条目数
        total:0,
        //当前页数
        currentPage: 1,
        //每页显示个数选择器的选项设置
        page_sizes: [20],
        //每页显示条目个数
        page_size: 20,
        feedbackInfo:{}

      }
    },
    methods: {
      showCheckView(data){
          this.feedbackInfo=data;
          //赋值管理员"
           this.feedbackInfo.aID=getToken();
          this.outerVisible=true;
      },
      feedbackPuhsCheck(){
        let that=this;
           console.log("打印审核结果【"+JSON.stringify(this.feedbackInfo)+"】")
            pushCheck(this.feedbackInfo).then(res=>{
                 if(res.code != 0){
                  this.$message(res.msg);
                   return;
                 }
                   this.$message("提交成功");
                    this.outerVisible=false;
                   that.loadData();

            }).catch(error => {
                this.$message(error);
          });

      },
      onSearch() {
      },
      loadData(){
         list(this.form).then(res=>{
             var resData = res.data;
             console.log("feed数据===》"+JSON.stringify(resData));
             this.tableData = resData.list;
             this.count = resData.count;
         }).catch(error => {
          reject(error)
        })

      },
      //当前页码改变时
      handleCurrentChange(val) {
           this.form.page=val;
          this.loadData();
      }
    },
     mounted: function() {
        this.loadData();
     }
  }
</script>

<style>

</style>
