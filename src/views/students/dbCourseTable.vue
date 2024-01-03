  <template>
  <el-container>
    <el-header style="padding: 0 0; text-align: center; font-size: 12px">
      学期：
      <el-select
        style="width: 70%"
        v-model="semester"
        placeholder="请选择学期"
        @change="updateCourseTable"
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
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="course_id" label="课号"> </el-table-column>
      <el-table-column prop="class_time" label="时间"> </el-table-column>
      <el-table-column prop="course_name" label="课名"> </el-table-column>
      <el-table-column prop="credit" label="学分"> </el-table-column>
      <el-table-column prop="name" label="教师"> </el-table-column>
      <el-table-column prop="credit_hours" label="学时"> </el-table-column>
    </el-table>
  </el-container>
</template>

  <script>
export default {
  async mounted() {
    await this.updateSemester();
    await this.updateGlobalSemester();
    await this.updateCourseTable();
  },
  data() {
    return {
      tableData: [],
      semesters: [],
      semester: "",
    };
  },
  props: ['id'],
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
    },
    async updateCourseTable() {
      let courses = await this.$axios.get(
        `http://localhost:8000/api/queryCourseTable?stu_id=${this.id}` +
          (this.semester.length > 0 ? `&semester=${this.semester}` : "")
      );
      this.tableData = courses.data;
      console.log(this.tableData);
    },
  },
};
</script>