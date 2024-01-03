  <template>
  <el-container>
    <el-header style="padding: 0 0; text-align: center; font-size: 12px">
      学期：
      <el-select
        style="width: 70%"
        v-model="semester"
        placeholder="请选择学期"
        @change="selectSemester"
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
    <p>
      总GPA为：{{ totalGPA
      }}{{ semesterGPA !== "" ? ", 本学期GPA为：" + semesterGPA : "" }}
    </p>
    <p>
      总GPA为：{{ totalGPA
      }}{{ semesterGPA !== "" ? "，本学期GPA为：" + semesterGPA : "" }}
    </p>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="course_id" label="课号"> </el-table-column>
      <el-table-column prop="course_name" label="课名"> </el-table-column>
      <el-table-column prop="normal_score" label="平时成绩"></el-table-column>
      <el-table-column prop="test_score" label="考试成绩"> </el-table-column>
      <el-table-column prop="total_score" label="总成绩"> </el-table-column>
    </el-table>
  </el-container>
</template>

  <script>
export default {
  async mounted() {
    await this.updateSemester();
    await this.updateGlobalSemester();
    await this.updateGPA();
  },
  data() {
    return {
      tableData: [],
      semesters: [],
      semester: "",
      semesterGPA: "",
      totalGPA: "",
    };
  },
  props: ["id"],
  methods: {
    async updateGlobalSemester() {
      let semester = await this.$axios.get(
        "http://localhost:8000/api/queryGlobalSemester"
      );
      // global_semester='2012-2013冬季'
      this.semester = semester.data;
    },
    async updateSemester() {
      let semesters = await this.$axios.get(
        "http://localhost:8000/api/querySemester"
      );
      this.semesters = semesters.data;
      let totalGPA = await this.$axios.get(
        `http://localhost:8080/api/queryTotalGPA?stu_id=${this.id}`
      );
      if (totalGPA.data.length > 0) this.totalGPA = totalGPA.data[0].averageGPA;
    },
    async selectSemester() {
      await this.updateGPA();
      let semesterGPA = await this.$axios.get(
        `http://localhost:8000/api/querySemesterGPA?stu_id=${this.id}`+
         (this.semester.length > 0 ? `&sem=${this.semester}` : "")
      );
      if (semesterGPA.data.length > 0)
        this.semesterGPA = semesterGPA.data[0].averageGPA;
    },
    async updateGPA() {
      let GPA = await this.$axios.get(
        `http://localhost:8000/api/queryCourseGPA?sid=${this.id}` +
          (this.semester.length > 0 ? `&sem=${this.semester}` : "")
      );
      this.tableData = GPA.data;
      console.log(this.tableData);
    },
  },
};
</script>