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
import PersonInfo from './teachers/dbPersonInfo';
import ClassManage from './teachers/dbClassManage';
import CourseTable from './teachers/dbCourseTable';
export default {
  components: {
    PersonInfo, ClassManage, CourseTable
  },
  mounted() {
    if (this.id === undefined)
      this.$router.replace('/');
  },
  data() {
    return {
      activeIndex: "PersonInfo",
      urlList: [
        { name: '个人信息', component: 'PersonInfo' },
        { name: '开课管理', component: 'ClassManage'},
        { name: '班级管理', component: 'CourseTable'}
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