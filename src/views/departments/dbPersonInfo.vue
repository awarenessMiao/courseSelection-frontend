<template>
  <el-container style="justify-content: space-around">
    <el-form
      :model="personalInfo"
      style="width: 70%"
      ref="personalInfo"
      label-width="80px"
    >
      <el-form-item label="名称" prop="dept_name">
        <el-input v-model="personalInfo.dept_name"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="personalInfo.address"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="phone_code">
        <el-input v-model="personalInfo.phone_code"></el-input>
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
          dept_name: '',
          address: '',
          phone_code: ''
      },
    };
  },
  props: ['id'],
  methods: {
    async onRender() {
      let response = await this.$axios.get(
        `http://localhost:8000/api/queryDepartment?dept_id=${this.id}`
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
        `&name=${this.personalInfo.dept_name}` +
        `&addr=${this.personalInfo.address}` +
        `&phone=${this.personalInfo.phone_code}`;
      let response = await this.$axios.get(
        "http://localhost:8000/api/modifyDepartment?" + param
      );
      console.log(response);
    },
  },
};
</script>