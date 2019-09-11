import {service} from '../Utils/Class/Service';
import { PROJECT_WORK,WORKFLOW_WORK } from './config'

/**
 * 项目管理service
 */
class ProjectService {
    constructor() {
        //知识分类
        this.modelUrl = `${PROJECT_WORK}/itemModel/getPage`;
        this.selectModelClassUrl = `${PROJECT_WORK}/itemModel/getList`;
        this.modelRulesUrl = `${PROJECT_WORK}/itemRules/getPage`;
        this.modelMathUrl = `${PROJECT_WORK}/itemModel/getAlgorithmList`;
        this.saveModelUrl = `${PROJECT_WORK}/itemModel/saveModel`;
        this.modelInstallUrl = `${PROJECT_WORK}/itemModel/save`;//分类数据
        this.modelDeleteUrl =  `${PROJECT_WORK}/itemModel/delet/`;
        this.dataClassUrl = `${PROJECT_WORK}/itemCorpus/getList`;//知识分类
        this.getClassifyUrl = `${PROJECT_WORK}/itemModel/getClassify/`;//知识分类-结果展示
        this.showClassifyFromMongoUrl = `${PROJECT_WORK}/itemModel/showClassifyFromMongo/002`;//模型类型列表
        this.modelClassListUrl = `${PROJECT_WORK}/itemModel/getApplicationList`;//模型运算
        this.getModelClassifyUrl = `${PROJECT_WORK}/itemModel/getModelClassify/`;//训练模型
        this.modelTrainUrl = `${PROJECT_WORK}/itemModel/modelTrain/`;
        this.modelTrainBertUrl = `${PROJECT_WORK}/itemModel/modelTrainBert/`;
        // 项目列表
        this.selectUrl = `${PROJECT_WORK}/itemContent/getPage`;
        this.selectClassUrl = `${PROJECT_WORK}/itemContent/getTypeName`;
        this.findUrl = `${PROJECT_WORK}/itemContent/find`;
        this.installUrl = `${PROJECT_WORK}/itemContent/save`;
        this.updateUrl = `${PROJECT_WORK}/itemContent/update/`;
        this.deleteUrl = `${PROJECT_WORK}/itemContent/delete/`;
        this.updateStateUrl = `${PROJECT_WORK}/itemContent/updateState/`;
        this.modelClassBigListUrl = `${PROJECT_WORK}/itemCategory/getPage`;//类目体系总列表
        this.saveCategoryUrl = `${PROJECT_WORK}/itemCategory/saveCategory`;
        this.getListUrl = `${PROJECT_WORK}/itemCategory/getList/`;//创建类目体系
        this.classInstallUrl = `${PROJECT_WORK}/itemCategory/save`;
        // 类目列表
        this.classSelectUrl = `${PROJECT_WORK}/itemCategory/getList`;
        //类目体系级列表
        this.classClassUrl = `${PROJECT_WORK}/itemCategory/getNameList`;
        //修改类目体系
        this.classUpdateUrl = `${PROJECT_WORK}/itemCategory/updateCorpus/`;
        //删除类目体系
        this.classDeleteUrl = `${PROJECT_WORK}/itemCategory/deleteById`;
        //删除类目
        this.listDeleteUrl = `${PROJECT_WORK}/itemCategory/delete`;
        // 查询流程列表
        this.selectFlowUrl = `${WORKFLOW_WORK}/activiti/getActProcessDefineList`;
        // 查询流程节点
        this.selectFlowItemUrl = `${WORKFLOW_WORK}/activiti/getActTaskListByProcessId`;
        // 项目启动
        this.projectPlusUrl = `${PROJECT_WORK}/itemContent/startUpProcess`;
        // 保存流程节点
        this.saveFlowPointUrl = `${WORKFLOW_WORK}/item/task/save`;
    }
    modelAll(query){
        return service.post(this.modelUrl,query);
    }
    selectModelClass(){
        return service.post(this.selectModelClassUrl);
    }
    modelRules(){
        return service.post(this.modelRulesUrl)
    }
    modelClassBigList(){
        return service.post(this.modelClassBigListUrl)
    }
    saveCategory(query){
        return service.post(this.saveCategoryUrl,query)
    }
    getList(id){
        return service.post(this.getListUrl+id)
    }
    modelClassList(){
        return service.post(this.modelClassListUrl)
    }
    modelMath(){
        return service.get(this.modelMathUrl)
    }
    saveModel(id){
        return service.get(this.saveModelUrl+id)
    }
    modelDataClass(){
        return service.post(this.dataClassUrl)
    }
    getClassify(id) {
        return service.get(this.getClassifyUrl+id)
    }
    getModelClassify(id) {
        return service.get(this.getModelClassifyUrl+id)
    }
    modelTrain(id){
        return service.post(this.modelTrainUrl+id)
    }
    modelTrainBert(id){
        return service.post(this.modelTrainBertUrl+id)
    }
    showClassifyFromMongo(query) {
        return service.post(this.showClassifyFromMongoUrl,query)
    }
    modelInstall(query){
        return service.post(this.modelInstallUrl, query);
    }
    modelDelete(id){
        return service.delete(this.modelDeleteUrl+id)
    }
    selectAll(id) {
        return service.post(this.selectUrl+id);
    }
    selectClass() {
        return service.post(this.selectClassUrl);
    }
    find(query){
        return service.get(this.findUrl,query)
    }
    install(query) {
        return service.post(this.installUrl, query);
    }
    update(id,query) {
        return service.put(this.updateUrl+id,query);
    }
    delete(id) {
        return service.delete(this.deleteUrl+id);
    }
    updateState(id) {
        return service.put(this.updateStateUrl+id)
    }
    classSelectAll(query) {
        return service.post(this.classSelectUrl,query);
    }
    classClass() {
        return service.post(this.classClassUrl);
    }
    classInstall(query) {
        return service.post(this.classInstallUrl, query);
    }
    proClassUpdate(query) {
        return service.put(this.classUpdateUrl, query);
    }
    classDelete(query) {
        return service.post(this.classDeleteUrl,query)
    }
    listDelete(query) {
        return service.post(this.listDeleteUrl,query)
    }
    selectFlow(){
        return service.get(this.selectFlowUrl);
    }
    selectFlowItem(query) {
        return service.post(this.selectFlowItemUrl,query);
    }
    projectPlus(query) {
        return service.get(this.projectPlusUrl,{params:query});
    }
    saveFlowPoint(query) {
        return service.post(this.saveFlowPointUrl, query);
    }
}
export default ProjectService;