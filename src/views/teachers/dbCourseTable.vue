  <template>
  <el-container>
    <el-header style="padding: 0 0; text-align: center; font-size: 12px">
      学期：
      <el-select
        style="width: 70%"
        v-model="semester"
        placeholder="请选择学期"
        @change="onSelectSemester"
      >
        <el-option
          v-for="item in semesters"
          :key="item.index"
          :label="item.semester"
          :value="item.semester"
        >
        </el-option>
      </el-select>
    </el-header>
    <el-container>
      <el-table
        :data="tableData"
        style="width: 100%"
        @row-click="updateScoreTable"
      >
        <el-table-column prop="course_id" label="课号"> </el-table-column>
        <el-table-column prop="course_name" label="课名"> </el-table-column>
        <el-table-column prop="class_time" label="时间"> </el-table-column>
        <el-table-column prop="student_num" label="学生数"> </el-table-column>
        <el-table-column prop="normal_score" label="平时成绩"></el-table-column>
        <el-table-column prop="test_score" label="考试成绩"> </el-table-column>
        <el-table-column prop="total_score" label="总成绩"> </el-table-column>
      </el-table>
    </el-container>
    <br />
    <el-container>
      <el-table :data="scoreData" style="width: 100%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="student_id" label="学号"> </el-table-column>
        <el-table-column prop="normal_score" label="平时成绩">
          <template slot-scope="scope">
            <el-input v-model="scope.row.normal_score" />
          </template>
        </el-table-column>
        <el-table-column prop="test_score" label="考试成绩">
          <template slot-scope="scope">
            <el-input v-model="scope.row.test_score" />
          </template>
        </el-table-column>
        <el-table-column prop="total_score" label="总成绩">
          <template slot-scope="scope">
            <el-input v-model="scope.row.total_score" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >确认</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-container>
  </el-container>
</template>

  <script>
export default {
  async mounted() {
    await this.onRender();
  },
  data() {
    return {
      tableData: [],
      scoreData: [],
      semesters: [],
      semester: "",
    };
  },
  props: ["id"],
  methods: {
    async onRender() {
      await this.updateSemester();
      await this.updateGlobalSemester();
      await this.updateCourseTable();
      await this.updateScoreTable();
    },
    async updateGlobalSemester() {
      let semester = await this.$axios.get(
        "http://localhost:8000/api/queryGlobalSemester"
      );
      this.semester = semester.data;
    },
    async updateSemester() {
      let semesters = await this.$axios.get(
        "http://localhost:8000/api/querySemester"
      );
      this.semesters = semesters.data;
    },
    async onSelectSemester() {
        await this.updateCourseTable();
        this.scoreData = [];
    },
    async updateCourseTable() {
      let courses = await this.$axios.get(
        `http://localhost:8000/teacher/queryCourseTable?id=${this.id}&sem=${this.semester}`
      );
      this.tableData = courses.data;
      console.log(this.tableData);
    },
    async updateScoreTable(row) {
      let score = await this.$axios.get(
        `http://localhost:8000/teacher/queryScore?id=${this.id}&sem=${this.semester}&cid=${row.course_id}`
      );
      this.scoreData = score.data;
      console.log(this.scoreData);
    },
    async handleEdit(index, row) {
      let modify = await this.$axios.get(
        `http://localhost:8000/teacher/modifyScore?staff=${this.id}&sem=${this.semester}&cid=${row.course_id}&stu=${row.student_id}&normal=${row.normal_score}&test=${row.test_score}&total=${row.total_score}`
      );
      console.log(modify);
      this.updateCourseTable();
    },
  },
};
</script>