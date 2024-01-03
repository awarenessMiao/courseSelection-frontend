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
      <el-table-column prop="dept_id" label="部门号"> </el-table-column>
      <el-table-column prop="dept_name" label="名称"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="phone_code" label="电话"> </el-table-column>
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
    async onRender() {
      let semester = await this.$axios.get(
        "http://localhost:8000/api/queryDepartment?dept_id=02"
      );
      this.tableData = semester.data;
      console.log(this.tableData)
    },
  },
};
</script>