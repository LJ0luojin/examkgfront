
<template>
  <div class="createpaper">
    <el-container>
        <!-- 侧边 -->
      <el-aside class="cp-aside">
        <!-- 题量和总分部分 -->
        <div style="height: 40px;border-bottom: 1px solid #ccc;text-align: center;" >
          <p>题量：{{ questionSum }} &nbsp;&nbsp; 总分：{{ questionSumScoure }}</p>
        </div>
        <!-- 3个表格 单选、多选、判断 -->
        <p>1-单选题</p>
        <ol>
          <li v-for="(item,index) in this.Data" :key="index" v-show="item.questionType==1"
           >
            <span v-html="item.questionContent" @click="toUpdateQuestion(item,index)" style="display: flex;"></span> 
            <el-button type="danger" size="mini" @click="deleteQuestion(index)" style="margin-left: 60%;">删除</el-button>
          </li>
        </ol>
        <br>
        <p>2-多选题</p>
        <ol>
          <li v-for="(item,index) in this.Data" :key="index" v-show="item.questionType==2"
          >
          <span v-html="item.questionContent" @click="toUpdateQuestion(item,index)" style="display: flex;"></span> 
            <el-button type="danger" size="mini" @click="deleteQuestion(index)" style="margin-left: 60%;">删除</el-button>
          </li>
        </ol>
        <br>
        <p>3-判断题</p>
        <ol>
          <li v-for="(item,index) in this.Data" :key="index" v-show="item.questionType==3"
          >
          <span v-html="item.questionContent" @click="toUpdateQuestion(item,index)" style="display: flex;"></span> 
            <el-button type="danger" size="mini" @click="deleteQuestion(index)" style="margin-left: 60%;">删除</el-button>
          </li>
        </ol>
      </el-aside>
      <!-- 出题相关 -->
      <el-main class="cp-main">
        <el-form :model="paperData" label-width="80px">
          <el-form-item label="试卷名称">
            <el-input
              v-model="epName"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <hr class="hr-solid" />
          <el-form-item label="题型">
            <!-- 1-单选题 2-多选题 3-判断题 -->
            <el-button @click="setQuestionType(1)">单选题</el-button>
            <el-button @click="setQuestionType(2)">多选题</el-button>
            <el-button @click="setQuestionType(3)">判断题</el-button>
          </el-form-item>
          <hr class="hr-solid" />
          <!-- 单选题出题 -->
          <div v-if="this.paperData.questionType == 1" style="">
            <el-form-item label="题干：">
              <quill-editor
                style="margin-top: 5%"
                v-model="paperData.questionContent"
              />
            </el-form-item>
            <hr class="hr-solid" />
            <el-form-item label="选项：" style="display: flex;flex-direction: column;">
              <div v-for="(item,index) in this.paperData.questionOptions" :key="index" style="display: flex;">
                  <el-radio v-model="paperData.questionAnswers" :label="item.label" style="margin-top: 25px;"
                  >{{ item.label }}</el-radio
                >
                <el-input style="margin-top: 10px;width: 650px;" v-model="item.content"/>
              </div>
              <el-button-group style="margin-left: 50%;margin-top: 2%;">
                <el-button plain type="warning" @click="addOption()">  
                添加选项
              </el-button>
              <el-button plain  @click="deleteOption()" type="info"> 删除选项</el-button>
              </el-button-group>
            </el-form-item>
            <hr class="hr-solid" />
          </div>
           <!-- 多选题出题 -->
           <div v-if="this.paperData.questionType == 2" style="">
            <el-form-item label="题干：">
              <quill-editor
                style="margin-top: 5%"
                v-model="paperData.questionContent"
              />
            </el-form-item>
            <hr class="hr-solid" />
            <el-form-item label="选项：" style="display: flex;flex-direction: column;">
                <el-checkbox-group v-for="(item,index) in this.paperData.questionOptions" 
                :key="index" v-model="paperData.questionAnswers" style="display: flex;">
                  <!-- <div v-for="(item,index) in this.paperData.questionOptions" :key="index" style="display: flex;"> -->
                    <el-checkbox  :label="item.label" style="margin-top: 12px;">{{ item.label }}</el-checkbox>
                    <el-input style="margin-top: 10px;width: 600px;margin-left: 30px;" v-model="item.content"/>
                  <!-- </div> -->
                </el-checkbox-group>
              <el-button-group style="margin-left: 50%;margin-top: 2%;">
                <el-button plain type="warning" @click="addOption()">  
                添加选项
              </el-button>
              <el-button plain  @click="deleteOption()" type="info"> 删除选项</el-button>
              </el-button-group>
            </el-form-item>
            <hr class="hr-solid" />
          </div>
          <!-- 判断题出题 -->
          <div v-if="this.paperData.questionType == 3" style="">
            <el-form-item label="题干：">
              <quill-editor
                style="margin-top: 5%"
                v-model="paperData.questionContent"
              />
            </el-form-item>
            <hr class="hr-solid" />
            <el-form-item label="选项：" style="display: flex;flex-direction: column;">
                <el-checkbox-group v-model="paperData.questionAnswers" style="display: flex;">
                    <el-checkbox  label="A" style="margin-top: 12px;">对</el-checkbox>
                    <el-checkbox  label="B" style="margin-top: 12px;">错</el-checkbox>
                </el-checkbox-group>
              <el-button-group style="margin-left: 50%;margin-top: 2%;">
                <el-button plain type="warning" @click="addOption()">  
                添加选项
              </el-button>
              <el-button plain  @click="deleteOption()" type="info"> 删除选项</el-button>
              </el-button-group>
            </el-form-item>
            <hr class="hr-solid" />
          </div>
          <el-form-item label="分值">
            <el-input-number
              v-model="paperData.questionPoint"
              controls-position="right"
              :min="1"
            />
          </el-form-item>
          <hr class="hr-solid" />
        </el-form>
        <el-button-group style="margin-left: 35%;margin-top: 5%;">
          <el-button v-if="!this.point" type="success" @click="saveQuestion(paperData)">保存题目</el-button>
          <el-button v-else type="success" @click="updateQuestion(paperData)">修改题目</el-button>
          <el-button @click="resetPaperData()">重置</el-button>
          <el-button type="primary" @click="commitPaper()">完成试卷</el-button>
        </el-button-group>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Data:[],
      point:false,
      tempIndex:-1,
      epName: "",
      epStart: "",
      epEnd: "",
      paperData: {
        questionContent: "",
        questionAnswers: [],
        questionOptions: [
          {
            label:"A",
            content:"",
          },
          {
            label:"B",
            content:""
          },
          {
            label:"C",
            content:""
          },
          {
            label:"D",
            content:""
          }
      ],
        questionPoint: 0,
        questionType: 0,
      },
      questionSum:0,
      questionSumScoure:0,
    };
  },
  methods: {
    setQuestionType(type) {
      this.paperData.questionType = type;
    },
    resetPaperData(){
      this.point = false;
      this.tempIndex = -1;
      this.paperData.questionContent="",
      this.paperData.questionAnswers=[],
      this.paperData.questionOptions=[
          {
            label:"A",
            content:"",
          },
          {
            label:"B",
            content:""
          },
          {
            label:"C",
            content:""
          },
          {
            label:"D",
            content:""
          }
      ],
      this.paperData.questionPoint=""
    },
    // 点击保存题目，将当前paperData保存到一个数组中，并将题量+1，总分加上当前保存题目的分值
    saveQuestion(paperData){
      let tempdata = {
        questionContent:paperData.questionContent,
        questionAnswers:paperData.questionAnswers,
        questionOptions:paperData.questionOptions,
        questionPoint:paperData.questionPoint,
        questionType:paperData.questionType
      }
      this.questionSum = this.questionSum+1;
      this.questionSumScoure=this.questionSumScoure+paperData.questionPoint
      this.Data.push(tempdata);
      console.log(this.Data)
      //保存后把页面中题目内容清空
      this.resetPaperData()
    },
    toUpdateQuestion(item,index){
      //跳转到修改题目
      //1、先把point改为true,把要修改的题目坐标保存到tempIndex中
      this.point = true;
      this.tempIndex = index;
      //2、把展示用的对象数据修改为要修改题目的内容
      this.paperData.questionAnswers = item.questionAnswers;
      this.paperData.questionContent   = item.questionContent;
      this.paperData.questionOptions= item.questionOptions;
      this.paperData.questionPoint  = item.questionPoint;
      this.paperData.questionType   = item.questionType;
    },
    updateQuestion(paperData){
      //修改对应的题目
      this.Data[this.tempIndex].questionAnswers  = paperData.questionAnswers;
      this.Data[this.tempIndex].questionContent    = paperData.questionContent;
      this.Data[this.tempIndex].questionOptions = paperData.questionOptions;
      this.Data[this.tempIndex].questionPoint   = paperData.questionPoint;
      this.Data[this.tempIndex].questionType    = paperData.questionType;
      //重置
      this.resetPaperData()
    },
    // 删除选项
    deleteOption(index){
      this.paperData.questionOptions.pop()
    },
    // 添加选项
    addOption(){
      let length = this.paperData.questionOptions.length;
      let temp = String.fromCharCode(65+length);
      let Option ={
        label:temp,
        content:""
      }
      this.paperData.questionOptions.push(Option)
    },
    //删除题目
    deleteQuestion(index){
      this.Data.splice(index,1)
      console.log(this.Data)
    },
    //完成试卷
    commitPaper(){
      this.Data.forEach(element => {
          if(element.questionType==1){
            let temp = element.questionAnswers;
            element.questionAnswers = Array.of(temp);
          }
        });
      this.$axios.post(`/kg/commitpaper?epName=${this.epName}`,this.Data).then(resp=>{
          if(resp.data.code==200){
            this.$message.success("创建成功！")
            this.$router.replace('/paper')
          }
      })
    }
  },
};
</script>
<style scoped>
.createpaper {
  position: relative;
}
.cp-main {
  border: 1px solid #ccc;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 50%;
  overflow: auto;
  margin-right: 15%;
}
.cp-aside {
  border: 1px solid #ccc;
  padding: 10px;
  min-height: 1080px;
  width: 600px;
  margin-left: 15%;
}
.hr-solid {
  border: 0;
  border-top: 1px solid #d0d0d5;
}
</style>