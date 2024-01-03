  <template>
  <el-container>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection"> </el-table-column>
      <el-table-column prop="student_id" label="学号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="sex" label="性别"> </el-table-column>
      <el-table-column prop="date_of_birth" label="出生日期"> </el-table-column>
      <el-table-column prop="native_place" label="生源地"> </el-table-column>
      <el-table-column prop="mobile_phone" label="电话号码"> </el-table-column>
    </el-table>
  </el-container>
</template>

  <script>
export default {
  async mounted() {
    await this.updateStudentTable();
  },
  data() {
    return {
      tableData: [],
    };
  },
  props: ["id"],
  methods: {
    async updateStudentTable() {
      let courses = await this.$axios.get(
        `http://localhost:8000/department/queryStudent?id=${this.id}`
      );
      this.tableData = courses.data;
      console.log(this.tableData);
    },
  },
};
</script>