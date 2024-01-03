import VueRouter from 'vue-router';
import Login from './views/dbLogin';
import Student from './views/dbStudent';
import Teacher from './views/dbTeacher';
import Department from './views/dbDepartment';

const router = new VueRouter({
    routes: [
        { path: '/', component: Login },
        {
            name: 'student',
            path: '/student',
            component: Student,
            props($route) {
                return {
                    id: $route.params.id
                }
            }
        },
        {
            name: 'teacher',
            path: '/teacher',
            component: Teacher,
            props($route) {
                return {
                    id: $route.params.id
                }
            }
        },
        {
            name: 'department',
            path: '/department',
            component: Department,
            props($route) {
                return {
                    id: $route.params.id
                }
            }
        },
    ]
});

export default router;