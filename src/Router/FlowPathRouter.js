import AsyncComponent from '../Utils/Component/AsyncComponent/AsyncComponent'
export default [
    {
        name:"实体增加",
        path: '/flowpath/form/entity/add',
        component: AsyncComponent(() => import('../Components/FlowPath/FlowPathForm/Entity/AddEntityForm')),
    },{
        name:"实体修改",
        path: '/flowpath/form/entity/update',
        component: AsyncComponent(() => import('../Components/FlowPath/FlowPathForm/Entity/AddEntityForm')),
    },{
        name: '实体列表',
        path: '/flowpath/form/entity',
        component: AsyncComponent(() => import('../Components/FlowPath/FlowPathForm/Entity/EntityList')),
    },{
        name: '业务对象定义',
        path: '/flowpath/form/project',
        component: AsyncComponent(() => import('../Components/FlowPath/FlowPathForm/Project/FlowProject')),
    },{
        name: '表单元数据定义',
        path: '/flowpath/form/forminit',
        component: AsyncComponent(() => import('../Components/FlowPath/FlowPathForm/FormInit/FormInit')),
    },{
        name: '业务表单',
        path: '/flowpath/form/business',
        component: AsyncComponent(() => import('../Components/FlowPath/FlowPathForm/Business/Business')),
    },{
        name: '流程定义管理',
        path: '/flowpath/list/entity',
        component: AsyncComponent(() => import('../Components/FlowPath/FlowPathList/FlowEntity/FlowEntity')),
    },{
        name: '流程实例管理',
        path: '/flowpath/list/manage',
        component: AsyncComponent(() => import('../Components/FlowPath/FlowPathList/FlowManage/FlowManage')),
    },{
        name: '流程任务管理',
        path: '/flowpath/list/new',
        component: AsyncComponent(() => import('../Components/FlowPath/FlowPathList/FlowNew/FlowNew')),
    },{
        name: '实体分类',
        path: '/flowpath/class/entity',
        component: AsyncComponent(() => import('../Components/FlowPath/FlowClass/EntityClass/EntityClass')),
    },{
        name: '表单分类',
        path: '/flowpath/class/form',
        component: AsyncComponent(() => import('../Components/FlowPath/FlowClass/FormClass/FormClass')),
    },{
        name: '流程分类',
        path: '/flowpath/class/flow',
        component: AsyncComponent(() => import('../Components/FlowPath/FlowClass/FlowClass/FlowClass')),
    },{
        name: '业务对象分类',
        path: '/flowpath/class/obj',
        component: AsyncComponent(() => import('../Components/FlowPath/FlowClass/ObjClass/ObjClass')),
    },
]