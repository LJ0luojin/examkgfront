<template>
<div class='grade'>
    <p style="font-size: 40px;"> 成绩列表</p>
    <div class="grade-table"> 
      <el-button type="success" 
      style="margin-bottom: 15px;margin-left:88%;"
      @click="topaper()"
      >返回试卷列表</el-button>
      <el-table class="grade-el-table"
    :data="tableData"
    stripe
    border
    style="width: 100%">
    <el-table-column
      prop="ksNumber"
      label="学号"
      width="440">
    </el-table-column>
    <el-table-column
      prop="ksName"
      label="姓名"
      width="221">
    </el-table-column>
    <el-table-column
      prop="examState"
      label="状态"
      width="223">
    </el-table-column>
    <el-table-column
      prop="examScore"
      label="分数"
      width="223">
    </el-table-column>
  </el-table>
    </div>
</div>
</template>

<script>

export default {
    data() {
      return {
        tableData: [
          { ksNumber: '001', ksName: '张三', examState: '已提交', examScore: 90 },
          { ksNumber: '002', ksName: '李四', examState: '缺考', examScore: '-' },
          { ksNumber: '003', ksName: '王五', examState: '缺考', examScore: '-' },
          
        ],
      };
    },created: function(){
      this.getGradeList()
    },
    methods:{
      topaper(){
        this.$router.replace('/paper')
      },
      getGradeList(){
        let epId = sessionStorage.getItem('epId')
        this.$axios.get(`/kg/getgradelist?epId=${epId}`).then(resp=>{
            // console.log(resp.data.data)
            if(resp.data.code == 200){
              this.tableData = resp.data.data
              this.$message.success('查询成功')
            }
            if(resp.data.code == 500){
              this.$message.error('查询失败或暂无考生参加该考试')
            }
        })
      }
    }
  };
</script>
<style scoped>
.grade{
  text-align: center;
}

.grade-table{
  margin-left: 20%;
  width: 60%;
  height: 60%;
}
</style>