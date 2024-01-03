<template>
  <el-container>
    <el-header style="padding: 0 0; text-align: center; font-size: 12px">
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入教师姓名"
        @select="handleSelect"
      ></el-autocomplete>
    </el-header>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="staff_id" label="职工号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="professional_ranks" label="职称"> </el-table-column>
      <el-table-column prop="dept_id" label="部门号"> </el-table-column>
    </el-table>
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
      options: [],
      value: "",
    };
  },
  methods: {
    async querySearchAsync(){

    },
    async onRender() {
      let semester = await this.$axios.get(
        "http://localhost:8000/api/queryTeacher?staff_id=0101"
      );
      this.tableData = semester.data;
      console.log(this.tableData)
    },
  },
};
</script>