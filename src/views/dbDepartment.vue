<template>
  <el-container>
    <el-header style="padding: 0 0; text-align: right; font-size: 12px">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="onSelect"
      >
        <el-menu-item v-for="item in urlList" :key="item.id" :index="item.component">
          {{item.name}}
        </el-menu-item>
      </el-menu>
    </el-header>
    <br/>
    <el-container>
      <template v-for="item in urlList">
        <component v-if="item.component === activeIndex" :id="id" :key="item.id" :is="item.component"/>
      </template>
    </el-container>
    <!-- <router-view></router-view> -->
  </el-container>
</template>

<script>
import PersonInfo from './departments/dbPersonInfo';
import StudentTable from './departments/dbStudentTable';
import TeacherTable from './departments/dbTeacherTable';
import ClassManage from './departments/dbClassManage';
export default {
  components: {
    PersonInfo, StudentTable, TeacherTable, ClassManage
  },
  mounted() {
    if (this.id === undefined)
      this.$router.replace('/');
  },
  data() {
    return {
      activeIndex: "PersonInfo",
      urlList: [
        { name: '部门信息', component: 'PersonInfo' },
        { name: '学生信息', component: 'StudentTable'},
        { name: '教师信息', component: 'TeacherTable'},
        { name: '课程管理', component: 'ClassManage'}
        // { name: '查询老师', component: 'QueryTeacher' },
        // { name: '查询部门', component: 'QueryDepartment' },
      ]
    };
  },
  props: ['id'],
  methods: {
    async onSelect(key) {
        this.activeIndex = key;
    },
  }
};
</script>