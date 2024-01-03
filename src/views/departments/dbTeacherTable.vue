  <template>
  <el-container>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection"> </el-table-column>
      <el-table-column prop="staff_id" label="工号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="sex" label="性别"> </el-table-column>
      <el-table-column prop="date_of_birth" label="出生日期"> </el-table-column>
      <el-table-column prop="professional_ranks" label="职级">
        <template slot-scope="scope">
          <el-input v-model="scope.row.professional_ranks" />
        </template>
      </el-table-column>
      <el-table-column prop="salary" label="薪水">
        <template slot-scope="scope">
          <el-input v-model="scope.row.salary" />
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
        `http://localhost:8000/department/queryTeacher?id=${this.id}`
      );
      this.tableData = courses.data;
      console.log(this.tableData);
    },
    async handleEdit(index, row) {
      let param =
        `id=${row.staff_id}` +
        `&name=${row.name}` +
        `&sex=${row.sex}` +
        `&date_of_birth=${row.date_of_birth}` +
        `&ranks=${row.professional_ranks}` +
        `&salary=${row.salary}`;
      let response = await this.$axios.get(
        "http://localhost:8000/api/modifyTeacher?" + param
      );
      console.log(response);
    },
  },
};
</script>