import AsyncComponent from '../Utils/Component/AsyncComponent/AsyncComponent'
export default [
    {
        name: '用户列表',
        path: '/user/list',
        component: AsyncComponent(() => import('../Components/User/Admin/AdminList')),
    },{
        name: '角色列表',
        path: '/role/list',
        component: AsyncComponent(() => import('../Components/User/Role/RoleList')),
    },{
        name: '权限列表',
        path: '/power/list',
        component: AsyncComponent(() => import('../Components/User/Power/PowerList')),
    },
]

