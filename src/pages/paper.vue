<template>
  <div class="paper">
    <p style="font-size: 40px">试卷列表</p>
    <div class="paper-table">
      <el-button
        type="primary"
        style="margin-bottom: 15px; margin-left: 91%"
        @click="toCreatePaper()"
        >创建试卷</el-button
      >
      <el-table
        class="paper-el-table"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column prop="epName" label="试卷名称" width="250">
        </el-table-column>
        <el-table-column prop="epTime" label="考试时间" width="500">
        </el-table-column>
        <el-table-column prop="epKsSum" label="考生人数" width="80">
        </el-table-column>
        <el-table-column prop="epState" label="状态" width="80">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group v-if="scope.row.epState == '未发布'">
              <el-button type="primary" size="mini">修改</el-button>
              <el-button type="success" size="mini" @click="issue(scope.row)"
                >发布</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="deletePaper(scope.row.epId)"
                >删除</el-button
              >
            </el-button-group>
            <el-button
              v-else-if="scope.row.epState == '已结束'"
              type="success"
              size="mini"
              @click="toGrade(scope.row.epId)"
              >查看成绩</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 发布Dialog -->
      <el-dialog title="发布试卷" :visible.sync="dialogPoint">
        <el-form :model="paperData">
          <el-form-item label="试卷标题:" label-width="120px" class="issueForm">
            {{ paperData.epName }}</el-form-item
          >
        </el-form>
        <el-form :model="paperData">
          <el-form-item label="考生名单:" label-width="120px" class="issueForm">
            <el-input v-model="selectKs" style="width: 30%">
              <i
                slot="suffix"
                class="el-input__icon el-icon-search"
                @click="selectKsByNameOrNumber()"
              ></i>
            </el-input>
            <el-table
              ref="ksMessage"
              :data="ksData"
              border
              style="width: 100%; margin-top: 3%"
            >
              <el-table-column type="selection" align="left"> </el-table-column>
              <el-table-column label="名称" prop="ksName" align="center">
              </el-table-column>
              <el-table-column label="账号" prop="ksNumber" align="center">
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
        <el-form :model="paperData">
          <el-form-item label="考生名单:" label-width="120px" class="issueForm">
            <div class="block" style="display: flex; width: 440px">
              <el-date-picker
                v-model="paperData.epStart"
                type="datetime"
                placeholder="考试开始时间"
                style="flex: 195"
              >
              </el-date-picker>
              <span style="flex: 50; text-align: center">至</span>
              <el-date-picker
                v-model="paperData.epEnd"
                type="datetime"
                placeholder="考试截至时间"
                style="flex: 195"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </el-form>
        <el-button @click="handle"></el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      tableData: [
        {
          epId: 1,
          epName: "软件工程期末考试",
          epTime: "2023-03-03 12:00:00 ~ 2023-03-03 14:00:00",
          epKsSum: "58",
          epState: "已发布",
        },
        {
          epId: 1,
          epName: "软件工程期末考试",
          epTime: "2023-03-03 12:00:00 ~ 2023-03-03 14:00:00",
          epKsSum: "0",
          epState: "未发布",
        },
        {
          epId: 1,
          epName: "软件工程期末考试",
          epTime: "2023-03-03 12:00:00 ~ 2023-03-03 14:00:00",
          epKsSum: "58",
          epState: "已结束",
        },
      ],

      ksData: [
        {
          isuse: false,
          ksId: "1",
          ksName: "刘焕",
          ksNumber: "1801123075",
        },
        {
          isuse: true,
          ksId: "2",
          ksName: "3",
          ksNumber: "4",
        },
      ],
      dialogPoint: false,
      paperData: {
        epId: -1,
        epName: "",
        epTime: "",
        epKsSum: "",
        epState: "",
        epStart: new Date(),
        epEnd: new Date(),
      },
      selectKs: "",
    };
  },
  created: function () {
    this.getTableDate();
  },
  methods: {
    // 修改试卷状态
    // updateStateToIsUsed(tableData){
    //     console.log(tableData)
    //     this.$axios.post('/kg/isused',tableData).then(resp=>{
    //       if(resp.data.type = 200){
    //         this.$message.success("发布成功！")
    //         this.getTableDate()
    //       }else{
    //         this.$message.success("发布失败")
    //       }
    //     })
    // },
    //删除试卷
    deletePaper(epId) {
      this.$axios.post(`/kg/deleteep?epId=${epId}`).then((resp) => {
        if ((resp.data.type = 200)) {
          this.$message.success("删除成功");
          this.getTableDate();
        } else {
          this.$message.success("删除失败");
        }
      });
    },
    // 获取试卷列表
    getTableDate() {
      this.$axios.get("/kg/gettabledata").then((resp) => {
        this.tableData = resp.data.data;
      });
    },
    // 跳转至某个试卷的成绩列表中
    toGrade(epId) {
      sessionStorage.setItem("epId", epId);
      this.$router.replace("/grade");
    },
    toCreatePaper() {
      this.$router.replace("/createpaper");
    },
    //发布按钮 传入当前行试卷数据、打开dialog
    issue(paperData) {
      this.dialogPoint = true;
      this.paperData = paperData;
    },
    //根据输入的信息搜索考生
    selectKsByNameOrNumber() {
      this.$axios.get(" ")
    },
    handle() {
      console.log(this.$refs.ksMessage.selection);
      let formatTime = moment(this.paperData.epStart).format("YYYY-MM-DD HH:mm:ss")
      console.log(formatTime)
    },
  },
};
</script>
<style scoped>
.paper {
  text-align: center;
}

.paper-table {
  margin-left: 20%;
  width: 60%;
  height: 60%;
}
/* .issueForm{
  font-size: 25px;
  font-weight: bolder;
  text-align: left;
} */
::v-deep .el-form-item__label {
  font-size: 20px;
  font-weight: bolder;
  text-align: left;
}
::v-deep .el-form-item__content {
  text-align: left;
  font-size: 20px;
}
::v-deep .el-dialog__title {
  font-size: 25px;
  text-align: left;
  font-weight: bolder;
}
::v-deep .block.el-input__inner {
  width: 2px;
}
</style>