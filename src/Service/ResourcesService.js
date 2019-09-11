import {service} from '../Utils/Class/Service';
import { PROJECT_WORK } from "./config";
import { REST_API } from './config';

/**
 * 资源管理service  --梁艳
 */
class ResourcesService {
    constructor() {
        /**
         *  词典管理
         */
        this.AllDictionaryList = `${REST_API}/itemWords/getDictInfoList`; //获取词典管理列表
        this.getDictionaryList = `${REST_API}/itemWords/getDictionaryList`; //获取词典列表
        this.deleteDictionary = `${REST_API}/itemWords/deleteDictionary`; //删除词语
        this.addDictionary = `${REST_API}/itemWords/addDictionary`; //新增词语
        this.updateDictionary = `${REST_API}/itemWords/updateDictionaryById`;//修改词语
        this.updateDictionaryById = `${REST_API}/itemWords/updateDictionaryById`;//审核词语
        this.download = `${REST_API}/itemWords/downloadCommonPage`;//下载词典


        /** 语料分类 */
        this.corpusClassAll = `${PROJECT_WORK}/itemModelApplication/getList`; // 获取语料分类
        this.corpusInsertList = `${PROJECT_WORK}/restapi/itemCorpus/insert`; //新增语料
        this.corpusSelectAllList =`${PROJECT_WORK}/itemCorpus/getPage`; // 获取语料列表
        this.corpusDeleteUrl = `${PROJECT_WORK}/itemCorpus/delete`; // 删除语料
        this.corpusIdGet = `${PROJECT_WORK}/itemCorpus/get`; // 根据ID获取语料
        this.corpusCheck = `${PROJECT_WORK}/itemCorpus/update`; // 语料审核
        this.corpusContent = `${PROJECT_WORK}/itemCorpus/content`; // 语料内容

        /** 样本管理 */
        this.sampleAll = `${PROJECT_WORK}/itemSample/getPage`; // 查询全部
        this.sampleInsertList = `${REST_API}/itemSample/insert`; //新增样本
        this.selectSampClass = `${PROJECT_WORK}/itemSample/getAll`; // 分类获取样本列表
        this.selectSampClassById = `${PROJECT_WORK}/itemSample/queryByAppId`; //获取样本分类列表

        /**规则管理 */
        this.ruleDelete = `${PROJECT_WORK}/itemRules/delete`; //删除规则集合
        this.ruleDleteCheck = `${PROJECT_WORK}/itemRules/deleteClassify`; //删除分类规则
        this.ruleDeleteSelect = `${PROJECT_WORK}/itemRules/deleteExtraction`; //删除抽取规则
        this.RuleConsultId = `${PROJECT_WORK}/itemRules/getByIdPage`; // 根据规则ID查看规则详情
        this.RuleSelectId = `${PROJECT_WORK}/itemRules/getExtractionPage`; // 根据抽取规则ID查看规则详情
        this.ClassRuleList =  `${PROJECT_WORK}/itemRules/saveClassify`; //创建分类规则
        this.AddSelectList =  `${PROJECT_WORK}/itemRules/saveExtraction`; //创建抽取规则
        this.getRuleList = `${PROJECT_WORK}/itemRules/getPage`; //获取规则列表
        this.getRuleClassList = `${PROJECT_WORK}/itemRules/getList`; //查询规则分类
        this.ruleCheck=`${PROJECT_WORK}/itemRules/update`; //审核规则集合
        this.ruleChecklist= `${PROJECT_WORK}/itemRules/updateClassify`; //审核分类规则
        this.ruleCheckSelect= `${PROJECT_WORK}/itemRules/updateExtraction`; //审核抽取规则
        this.UpdateSelectRule =  `${PROJECT_WORK}/itemRules/updateExtractionAll`;// 编辑抽取规则
        this.UpdateClassRule =  `${PROJECT_WORK}/itemRules/updateRules`;// 编辑分类规则
        this.ruleSelectById = `${PROJECT_WORK}/itemRules/getByIdList`; // 按ID查询规则


        /** 模型管理*/
        this.modelDeleteId = `${PROJECT_WORK}/itemModel/delete/{id}`; //根据模型id删除
        this.addModel = `${PROJECT_WORK}/itemModel/save`; //创建模型
        this.modelList = `${PROJECT_WORK}/itemModel/getPage?pageNum=1&pageSize=4`; //模型列表
        this.modelDetail =  `${PROJECT_WORK}/itemModel/getById/{id}`; //模型详细信息
        this.modelClassList =  `${PROJECT_WORK}/itemModel/getApplicationList`; //模型应用类型列表
        this.modelAlgorithmList =  `${PROJECT_WORK}/itemModel/getAlgorithmList`; //模型应用算法列表
        this.modelFileUpload =  `${PROJECT_WORK}/itemModel/fileUpload`; //模型应用算法列表
        this.modelStateList =  `${PROJECT_WORK}/itemModel/getStateList`; //模型状态列表
        this.modelSelectOne = `${PROJECT_WORK}/itemModel/getList`;// 根据类型查询模型
    }



    /** 词典管理*/
    AllDictionaryListUrl (query) {
        return service.post(this.AllDictionaryList,query)
    }
    getDictionaryListUrl (query) {
        return service.post(this.getDictionaryList,query)
    }
    downloadUrl () {
        return service.get(this.download)
    }
    deleteDictionaryUrl (query) {
        return service.post(this.deleteDictionary,query)
    }
    addDictionaryUrl (query) {
        return service.post(this.addDictionary,query)
    }
    updateDictionaryUrl (query) {
        return service.post(this.updateDictionary,query)
    }
    DictionaryByIdUrl (query) {
        return service.post(this.updateDictionaryById,query)
    }

    /** 语料管理*/
    corpusClassAllUrl () {
        return service.post(this.corpusClassAll)
    }
    corpusInsert (query) {
        return service.post(this.corpusInsertList,query)
    }
    corpusDelete (query) {
        return service.post(this.corpusDeleteUrl,query)
    }
    corpusList(query) {
        return service.post(this.corpusSelectAllList,query)
    }
    corpusIdGetUrl(query) {
        return service.post(this.corpusIdGet,query)
    }
    corpusCheckUrl(query) {
        return service.post(this.corpusCheck,query)
    }
    corpusContentUrl(query) {
        return service.post(this.corpusContent,query)
    }

    /** 样本管理 */
    sampleAllUrl() {
        return service.get(this.sampleAll)
    }
    sampleInsertListUrl(query) {
        return service.post(this.sampleInsertList,query)
    }
    selectSampClassUrl() {
        return service.post(this.selectSampClass);
    }
    selectSampClassByIdUrl(query) {
        return service.post(this.selectSampClassById,query);
    }

    /** 规则管理*/
    getRuleListUrl () {
        return service.post(this.getRuleList)
    }
    getRuleClassUrl() {
        return service.post(this.getRuleClassList)
    }
    ruleDeleteUrl (query) {
        return service.post(this.ruleDelete,query)
    }
    ruleDeleteCheckUrl (query) {
        return service.post(this.ruleDleteCheck,query)
    }
    ruleDeleteSelectUrl (query) {
        return service.post(this.ruleDeleteSelect,query)
    }
    RuleConsultIdUrl () {
        return service.post(this.RuleConsultId)
    }
    RuleSelectIdUrl () {
        return service.post(this.RuleSelectId)
    }
    ClassRuleListUrl (query) {
        return service.post(this.ClassRuleList,query)
    }
    AddSelectListUrl (query) {
        return service.post(this.AddSelectList,query)
    }
    ruleCheckUrl (query) {
        return service.post(this.ruleCheck,query)
    }
    ruleChecklistUrl (query) {
        return service.post(this.ruleChecklist,query)
    }
    ruleCheckSelectUrl (query) {
        return service.post(this.ruleCheckSelect,query)
    }
    UpdateClassRuleUrl (query) {
        return service.post(this.UpdateClassRule,query)
    }
    UpdateSelectRuleUrl (query) {
        return service.post(this.UpdateSelectRule,query)
    }
    ruleSelectByIdUrl(query) {
        return service.get(this.ruleSelectById, {params:query})
    }
    /** 模型管理*/
    modelDeleteIdUrl (query) {
        return service.delete(this.modelDeleteId, query)
    }
    addModelUrl (query) {
        return service.post(this.addModel, query)
    }
    modelListUrl (query) {
        return service.post(this.modelList, query)
    }
    modelDetailUrl (query) {
        return service.get(this.modelDetail, query)
    }
    modelClassListUrl () {
        return service.post(this.modelClassList)
    }
    modelAlgorithmListUrl () {
        return service.get(this.modelAlgorithmList)
    }
    modelFileUploadUrl () {
        return service.post(this.modelFileUpload)
    }
    modelStateListUrl () {
        return service.post(this.modelStateList)
    }
    modelSelectOneUrl(value) {
        return service.get(this.modelSelectOne,{params:value})
    }

    // 样本
    sampleSelectAllUrl() {
        return service.get(this.sampleSelectAll)
    }




















}
export default ResourcesService;