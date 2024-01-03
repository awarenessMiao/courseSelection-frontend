<template>
  <el-container>
    <el-header style="padding: 0 0; text-align: center; font-size: 12px">
      <h1>当前学期：{{ globalSemester }}</h1>
    </el-header>
    <el-container>
      <el-table :data="courseSelection" style="width: 100%">
        <el-table-column prop="course_id" label="课号"> </el-table-column>
        <el-table-column prop="course_name" label="课名"> </el-table-column>
        <el-table-column prop="credit" label="学分"> </el-table-column>
        <el-table-column prop="credit_hours" label="学时"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.selected == 0"
              size="mini"
              type="primary"
              @click="handleSelect(scope.$index, scope.row)"
              >开课</el-button
            >
            <el-button
              v-else
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >退课</el-button
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
      globalSemester: "",
      courseSelection: [],
    };
  },
  props: ['id'],
  methods: {
    async onRender() {
      let semester = await this.$axios.get(
        "http://localhost:8000/api/queryGlobalSemester"
      );
      this.globalSemester = semester.data;
      let response = await this.$axios.get(
        `http://localhost:8000/teacher/queryClass?id=${this.id}`
      );
      console.log(response);
      this.courseSelection = response.data;
    },
    async handleSelect(index, row) {
      let res = await this.$prompt('请输入开课时间', '提示');
      try {
        let response = await this.$axios.get(
          `http://localhost:8000/teacher/insertClass?id=${this.id}&sem=${this.globalSemester}&cid=${row.course_id}&time=${res.value}`
        );
        console.log(response);
        await this.onRender();
      } catch (err) {
        alert(err.response.data);
      }
    },
    async handleDelete(index, row) {
      try {
        let response = await this.$axios.get(
          `http://localhost:8000/teacher/deleteClass?id=${this.id}&sem=${this.globalSemester}&cid=${row.course_id}`
        );
        console.log(response);
        await this.onRender();
      } catch (err) {
        alert(err.response.data);
      }
    },
  },
};
</script>