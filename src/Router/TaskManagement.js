import AsyncComponent from '../Utils/Component/AsyncComponent/AsyncComponent'
export default [
    {
        name: '任务管理',
        path: '/taskCenter/taskManagement/list',
        component: AsyncComponent(() => import('../Components/TaskCenter/TaskManagement/TaskList')),
    }
]
