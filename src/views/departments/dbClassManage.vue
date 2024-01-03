<template>
  <el-container>
    <p>当前学期：{{ globalSemester }}</p>
    <el-header style="padding: 0 0; text-align: left; font-size: 12px">
      <el-button @click="addCourse">添加课程</el-button>
    </el-header>
    <!-- <el-container> -->
    <el-container>
      <el-table
        :data="courseSelection"
        style="width: 100%"
        @row-click="updateScoreTable"
      >
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
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-container>
    <br />
    <el-container>
      <el-table :data="courseTable" style="width: 100%">
        <el-table-column prop="semester" label="学期"> </el-table-column>
        <el-table-column prop="name" label="教师名"> </el-table-column>
        <el-table-column prop="class_time" label="时间">
          <template slot-scope="scope">
            <el-input v-model="scope.row.class_time" :disabled="scope.row.semester !== globalSemester" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.semester !== globalSemester"
              size="mini"
              type="primary"
              @click="handleSelect(scope.$index, scope.row)"
              >确认</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-container>
    <!-- </el-container> -->
  </el-container>
</template>

<script>
export default {
  async mounted() {
    await this.onRender();
  },
  data() {
    return {
      courseSelection: [],
      courseTable: [],
      globalSemester: "",
    };
  },
  props: ["id"],
  methods: {
    async onRender() {
      let semester = await this.$axios.get(
        "http://localhost:8000/api/queryGlobalSemester"
      );
      this.globalSemester = semester.data;
      let response = await this.$axios.get(
        `http://localhost:8000/department/queryClass?id=${this.id}`
      );
      console.log(response);
      this.courseSelection = response.data;
    },
    async updateScoreTable(row) {
      let score = await this.$axios.get(
        `http://localhost:8000/department/queryCourseTable?cid=${row.course_id}&sem=${this.globalSemester}`
      );
      this.courseTable = score.data;
      console.log(this.courseTable);
    },
    async handleSelect(index, row) {
        console.log(index, row)
      try {
        let response = await this.$axios.get(
          `http://localhost:8000/department/modifyClass?staff_id=${row.staff_id}&sem=${row.semester}&cid=${row.course_id}&time=${row.class_time}`
        );
        console.log(response);
        await this.onRender();
        await this.updateScoreTable(row);
      } catch (err) {
        alert(err.response.data);
      }
    },
  },
};
</script>