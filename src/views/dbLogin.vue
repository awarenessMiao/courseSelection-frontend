<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >立即创建</el-button
      >
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, message: "长度至少为 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async submitForm() {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     return true;
      //   } else {
      //     alert("error submit!!");
      //     return false;
      //   }
      // });
      let response = await this.$axios.get(
        `http://localhost:8000/api/queryLogin?username=${this.ruleForm.name}&password=${this.ruleForm.password}`
      );
      if (response.data.length === 0)
        return alert("wrong password");
      let el_data = response.data[0];
      console.log(el_data);
      this.$router.push({ name: el_data.el_type, params: {id: el_data.el_id}});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>