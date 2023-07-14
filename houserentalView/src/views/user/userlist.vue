<template>
  <div class="app-container">
    <div class="filter-container">
      <el-table ref="singleTable" :data="tableData" highlight-current-row border fit class="my_table">
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column label="ID" property="uID" width="50" />
        <el-table-column property="uNickname" label="用户昵称" />
        <el-table-column property="uTel" label="用户电话" />
        <el-table-column property="uRealname" label="真实姓名" />
        <el-table-column property="uNumber" label="身份证号" />
        <el-table-column property="uSex" label="性别" />
        <el-table-column property="isIdent" label="是否认证" >
             <template  slot-scope="{row}">
               <el-tag v-if="row.isIdent === 0"  type="info">未认证</el-tag>
                <el-tag v-if="row.isIdent === 1"  type="success">已认证</el-tag>
                 <el-tag v-if="row.isIdent === 2"  type="danger">审核不通过</el-tag>
             </template>
        </el-table-column>
        <el-table-column property="openid" label="OPENID" />
        <el-table-column property="addtime" label="添加时间" />

        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button size="mini" v-if="row.isIdent === 0" type="primary" @click="showCheckView(row)">审核</el-button>
             <el-button size="mini" v-if="row.isIdent === 2" type="warning" @click="showCheckView(row)">重新审核</el-button>
            <el-button  size="mini" v-if="row.isIdent === 1" disabled>已审核</el-button>
          </template>
        </el-table-column>

      </el-table>
<!--   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000">
    </el-pagination> -->
      <!--分页-->
     <el-pagination :current-page="currentPage" :page-sizes="page_sizes" :page-size="page_size"
        layout="prev, pager, next, jumper" background :total="total" class="page_css"
        @current-change="handleCurrentChange" />
    </div>
     <!--弹出层-->
      <el-dialog title="用户信息审核" :visible.sync="outerVisible">
           <el-form label-position="left" label-width="80px" :model="userInfo">
             <el-form-item label="真实姓名">
               <el-input v-model="userInfo.uRealname" disabled></el-input>
             </el-form-item>
             <el-form-item label="身份证号">
               <el-input v-model="userInfo.uNumber" disabled></el-input>
             </el-form-item>
             <el-form-item label="电话">
               <el-input v-model="userInfo.uTel" disabled></el-input>
             </el-form-item>
             <el-form-item label="性别">
               <el-input v-model="userInfo.uSex" disabled></el-input>
             </el-form-item>
             <el-form-item label="审核结果">
                <el-radio-group v-model="userInfo.isUEpass" size="medium">
                      <el-radio border label="1" change="true">通过</el-radio>
                      <el-radio border label="2">不通过</el-radio>
                </el-radio-group>
             </el-form-item>
             <el-form-item label="审核意见">
                   <el-input v-model="userInfo.ueReason"></el-input>
             </el-form-item>
           </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="outerVisible = false">关闭</el-button>
             <el-button type="primary" @click="userPuhsCheck">确认提交</el-button>
          </div>
      </el-dialog>

  </div>
</template>

<script>
  import {
    userlist,
    pushCheck
  } from '@/api/user' // eslint-disable-line no-unused-vars
//导入一个qs库
  import { getToken} from '@/utils/auth'
  export default {
    name: 'UserList',
    data() {
      return {
        outerVisible:false,
        form: {
          page: 1,
          pageSize: 20
        },
        userInfo:{},
        tableData: [],
        // 总条目数
        total: 0,
        // 当前页数
        currentPage: 1,
        // 每页显示个数选择器的选项设置
        page_sizes: [20],
        // 每页显示条目个数
        page_size: 20

      }
    },
    mounted: function() {
      this.loadData();
    },
    methods: {
      showCheckView(data){
          this.userInfo=data;
          this.userInfo.aid=getToken();
          this.outerVisible=true;
      },
      userPuhsCheck(){
        let that=this;
           console.log("打印审核结果【"+JSON.stringify(this.userInfo)+"】")
            pushCheck(this.userInfo).then(res=>{
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
      // 查询
      onSearch() {},
      loadData() {
        const that = this
        userlist(this.form).then(res => {
          var resData = res.data;
          console.log("数据===》"+JSON.stringify(resData));
          //获取后台的数据
          this.tableData = resData.list;
          this.count = resData.count;
        }).catch(error => {
          reject(error)
        })
      },
      // 当前页码改变时
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style>

</style>
