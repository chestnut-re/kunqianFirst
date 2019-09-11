import AsyncComponent from '../Utils/Component/AsyncComponent/AsyncComponent'
export default [
    {
        name: '项目列表',
        path: '/project/list',
        component: AsyncComponent(() => import('../Components/Project/ProList/ProjectList')),
    }, {
        name: '知识分类列表',
        path: '/project/knowledge_list',
        component: AsyncComponent(() => import('../Components/Project/ProKnow/ProKnowList')),
    },{
        name: '知识分类',
        path: '/project/knowledge',
        component: AsyncComponent(() => import('../Components/Project/ProKnow/ProKnow')),
    },{
        name: '创建模型',
        path: '/project/know_add',
        component: AsyncComponent(() => import('../Components/Project/ProKnow/KnowAdd')),
    },{
        name: '模型定义',
        path: '/project/know_definition',
        component: AsyncComponent(() => import('../Components/Project/ProKnow/KnowDefinition')),
    },{
        name: '模型计算',
        path: '/project/know_operation',
        component: AsyncComponent(() => import('../Components/Project/ProKnow/KnowOperation')),
    },{
        name: '分类结果展示',
        path: '/project/know_show',
        component: AsyncComponent(() => import('../Components/Project/ProKnow/KnowShow')),
    }, {
        name: '模型训练列表',
        path: '/project/train_list',
        component: AsyncComponent(() => import('../Components/Project/ProTrain/ProTrainList')),
    }, {
        name: '模型训练创建',
        path: '/project/train_add',
        component: AsyncComponent(() => import('../Components/Project/ProTrain/ProTrainAdd')),
    }, {
        name: '训练模型',
        path: '/project/train_operation',
        component: AsyncComponent(() => import('../Components/Project/ProTrain/ProTrainOperation')),
    }, {
        name: '类目列表',
        path: '/project/class_list',
        component: AsyncComponent(() => import('../Components/Project/ProClass/ProClassList')),
    },{
        name: '查看类目',
        path: '/project/class',
        component: AsyncComponent(() => import('../Components/Project/ProClass/ProClass')),
    },{
        name: '图谱列表',
        path: '/project/maps',
        component: AsyncComponent(() => import('../Components/Project/ProMaps/ProMaps')),
    }
]