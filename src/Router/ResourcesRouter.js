import AsyncComponent from '../Utils/Component/AsyncComponent/AsyncComponent'
export default [
    {
        name:"语料管理",
        path: '/resources/corpus/corpusList/list',
        component: AsyncComponent(() => import('../Components/Resources/Corpus/CorpusList/CorpusList')),
    },{
        name:"语料管理",
        path: '/resources/corpus/checkCorpus/list',
        component: AsyncComponent(() => import('../Components/Resources/Corpus/CheckCorpus/CheckList')),
    },{
        name:"样本管理",
        path: '/resources/sample/list',
        component: AsyncComponent(() => import('../Components/Resources/SampleManagement/SampleList')),
    },{
        name:"规则管理",
        path: '/resources/rule/ruleList/list',
        component: AsyncComponent(() => import('../Components/Resources/Rule/RuleList/RuleList')),
    },{
        name:"分类规则",
        path: '/resources/rule/checkRule/list',
        component: AsyncComponent(() => import('../Components/Resources/Rule/RuleCheck/ClassList')),
    },{
        name: '抽取规则',
        path: '/resources/rule/selectRule/list',
        component: AsyncComponent(() => import('../Components/Resources/Rule/SelectRule/SelectList')),
    },{
        name:"词典管理",
        path: '/resources/dictionary/dictionaryList/list',
        component: AsyncComponent(() => import('../Components/Resources/Dictionary/DictionaryList/DictionaryList')),
    },{
        name:"查看词典",
        path: '/resources/dictionary/detail',
        component: AsyncComponent(() => import('../Components/Resources/Dictionary/DetailList/DetailList')),
    },{
        name:"模型管理",
        path: '/resources/model',
        component: AsyncComponent(() => import('../Components/Resources/ModelList/Model')),
    },{
        name: '模板管理',
        path: '/resources/template/list',
        component: AsyncComponent(() => import('../Components/Resources/TemplateList/Template')),
    }, {
        name: '人工输入',
        path: '/resources/atlas/manualInputAtlas/manualInput',
        component: AsyncComponent(() => import('../Components/Resources/Atlas/manualInputAtlas/ManualInput')),
    },{
        name: '数据导入',
        path: '/resources/atlas/dataImport/dataImport',
        component: AsyncComponent(() => import('../Components/Resources/Atlas/dataimport/DataImport')),
    },{
        name: '导入图谱',
        path: '/resources/put_concept',
        component: AsyncComponent(() => import('../Components/Resources/Atlas/manualInputAtlas/PutConcept')),
    }, {
        name: '图谱管理',
        path: '/resources/atlas',
        component: AsyncComponent(() => import('../Components/Resources/Atlas/AtlasList')),
    },{
        name: '输入实体',
        path: '/resources/put_entity',
        component: AsyncComponent(() => import('../Components/Resources/Atlas/PutEntity')),
    },{
        name: '输入实体关系',
        path: '/resources/put_relationship',
        component: AsyncComponent(() => import('../Components/Resources/Atlas/PutData/PutData')),
    },
]