<template>
  <el-container style="justify-content: space-around">
    <el-form
      :model="personalInfo"
      style="width: 70%"
      ref="personalInfo"
      label-width="80px"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="personalInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input v-model="personalInfo.sex"></el-input>
      </el-form-item>
      <el-form-item label="生日" prop="date_of_birth">
        <el-input v-model="personalInfo.date_of_birth"></el-input>
      </el-form-item>
      <el-form-item label="职级" prop="professional_ranks">
        <el-input v-model="personalInfo.professional_ranks" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="薪水" prop="salary">
        <el-input v-model="personalInfo.salary" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('personalInfo')"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  async mounted() {
    await this.onRender();
  },
  data() {
    return {
      personalInfo: {
        name: "",
        sex: "",
        date_of_birth: "",
        professional_ranks: "",
        salary: "",
      },
    };
  },
  props: ['id'],
  methods: {
    async onRender() {
      let response = await this.$axios.get(
        `http://localhost:8000/api/queryTeacher?id=${this.id}`
      );
      this.personalInfo = response.data[0];
      console.log(response.data);
    },
    async submitForm(formName) {
      console.log(this.$route);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      let param =
        `id=${this.id}` +
        `&name=${this.personalInfo.name}` +
        `&sex=${this.personalInfo.sex}` +
        `&date_of_birth=${this.personalInfo.date_of_birth}` +
        `&ranks=${this.personalInfo.professional_ranks}` +
        `&salary=${this.personalInfo.salary}`;
      let response = await this.$axios.get(
        "http://localhost:8000/api/modifyTeacher?" + param
      );
      console.log(response);
    },
  },
};
</script>