<template>
  <div id="app">
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="text" disabled="true">文字按钮</el-button>

    <br>
    <div class="cm">
    <el-button type="text" @click="dialogVisible = true">购物车Dialog</el-button>

    <el-dialog title="清空购物车" v-model="dialogVisible" @open="open" size="small">
      <span>确定要清空购物车吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    </div>

    <br>
    
    <el-button type="warning" @click="loading">点击加载</el-button>
    <el-button type="primary" icon="search" size="mini">搜索</el-button>
    <el-button type="primary" disabled="true" size="large">设置<i class="el-icon-setting el-icon--right"></i></el-button>
    
    <el-button-group>
    <el-button type="primary" icon="edit"></el-button>
    <el-button type="primary" icon="share"></el-button>
    <el-button type="primary" icon="delete"></el-button>
    </el-button-group>
    <el-button type="primary" loading="true" v-show="isLoad">加载中</el-button>

    <br>

    <div class="cm">
    <el-input v-model="inputName" placeholder="请输入用户名" maxlength="6" minlength="3" autofocus="true" style="width:200px"></el-input><br><br>
    <el-input v-model="inputPas" placeholder="请输入密码" maxlength="6" minlength="3" style="width:200px"></el-input><br><br>
    <el-button type="primary" @click="submit">提交</el-button>
    <el-button type="primary" @click="reset">重置</el-button>
    </div>

    <br>

    <div class="cm">
      <el-table :data="tableData" style="width: 60%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      <br>
      <el-button type="primary" @click="add" size="mini" style="margin-left:50%">新增<i class="el-icon-edit el-icon--right"></i></el-button>
      <el-button type="primary" @click="del" size="mini" style="margin-left:1%">删除<i class="el-icon-delete el-icon--right"></i></el-button>

      <el-dialog title="新增用户" v-model="dialogFormVisible">
        <el-form :model="form">

          <el-form-item label="日期" label-width="60px">
            <el-date-picker v-model="form.timeValue" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
          </el-date-picker>
          </el-form-item>

          <el-form-item label="姓名" label-width="60px">
            <el-input v-model="form.name" auto-complete="true"></el-input>
          </el-form-item>

          <el-form-item label="地址" label-width="60px">
            <el-input v-model="form.region" auto-complete="true"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <br>

    <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">处理中心</el-menu-item>
  <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
  </el-submenu>
  <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
</el-menu>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  },
  data(){
  return {
      dialogVisible: false,
      isLoad:false,
      inputName:"",
      inputPas:"",
      tableData: [{
            date: '2016-05-02',
            name: '王路',
            address: '江苏省盱眙县',
      }],
      dialogFormVisible:false,
      form: {
          name: '',
          region: '',
          timeValue:'',
      },
      pickerOptions0:{
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
    };
  },
  methods:{
    open:function(){
      console.log(11);
    },
    loading:function(){
      this.isLoad=!this.isLoad;
    },
    submit:function(){
      if(this.inputName===""){
        this.$message({
          message:'用户名不能为空',
          type:'warning'
        });
      }
      else if(this.inputPas===""){
        this.$message({
          message:'密码不能为空',
          type:'warning'
        });
      }
      else{
        this.$message(this.inputName+":"+this.inputPas);
      } 
    },
    reset:function(){
      this.inputName="";
      this.inputPas="";
      this.$message({
        message:'恭喜你，重置成功！',
        type:'success'
      });
    },
    add:function(){
      this.dialogFormVisible=true;
    },
    del:function(){
      
    },
    addUser:function(){
        var newUser={
          date: this.form.timeValue.getFullYear()+'-'+(this.form.timeValue.getMonth()+1)+'-'+this.form.timeValue.getDate(),
          name: this.form.name,
          address:this.form.region,
        };
        this.tableData.push(newUser);
        this.form.timeValue='';
        this.form.name='';
        this.form.region='';
        this.dialogFormVisible = false;
    },
    handleSelect:function(){

    },
  }
}
</script>

<style>
  .cm{
    margin-top:20px;
  }
</style>
