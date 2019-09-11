import {service} from '../Utils/Class/Service';
import {WORKFLOW_WORK} from "./config"
class FlowClassService{
    constructor() {
        // 流程分类
        this.selectFlowClassUrl = `${WORKFLOW_WORK}/bpm/bpmDefineCategory/getAll`;
        this.installFlowClassUrl = `${WORKFLOW_WORK}/bpm/bpmDefineCategory/save`;
        this.updateFlowClassUrl = `${WORKFLOW_WORK}/bpm/bpmDefineCategory/update`;
        this.deleteFlowClassUrl = `${WORKFLOW_WORK}/bpm/bpmDefineCategory/delete`;
        // 实体分类
        this.selectEnitytClassUrl = `${WORKFLOW_WORK}/bpm/businessObjectEntityCategory/getTreeData.json`;
        this.installEntityClassUrl = `${WORKFLOW_WORK}/bpm/businessObjectEntityCategory/save`;
        this.updateEntityClassUrl = `${WORKFLOW_WORK}/bpm/businessObjectEntityCategory/update`;
        this.deleteEntityClassUrl = `${WORKFLOW_WORK}/bpm/businessObjectEntityCategory/remove`;
        // 表单分类
        this.selectFormClassUrl = `${WORKFLOW_WORK}/bpm/bpmFormCategory/getAll`;
        this.installFormClassUrl = `${WORKFLOW_WORK}/bpm/bpmFormCategory/save`;
        this.updateFormClassUrl = `${WORKFLOW_WORK}/bpm/bpmFormCategory/update`;
        this.deleteFormClassUrl = `${WORKFLOW_WORK}/bpm/bpmFormCategory/delete`;
        // 业务对象分类
        this.selectObjClassUrl = `${WORKFLOW_WORK}/bpm/businessObjectCategory/getAll`;
        this.installObjClassUrl = `${WORKFLOW_WORK}/bpm/businessObjectCategoryinsert/save`;
        this.updateObjClassUrl = `${WORKFLOW_WORK}/bpm/businessObjectCategoryinsert/update`;
        this.deleteObjClassUrl = `${WORKFLOW_WORK}/bpm/businessObjectCategoryinsert/delete`;
    }
    selectFlowClass() {
        return service.get(this.selectFlowClassUrl);
    }
    installFlowClass(query) {
        return service.post(this.installFlowClassUrl, query);
    }
    updateFlowClass(query) {
        return service.put(this.updateFlowClassUrl, query);
    }
    deleteFlowClass(query) {
        return service.delete(this.deleteFlowClassUrl, query);
    }
    selectEnitytClass() {
        return service.get(this.selectEnitytClassUrl);
    }
    installEntityClass(query){
        return service.post(this.installEntityClassUrl, query);
    }
    updateEntityClass(query) {
        return service.put(this.updateEntityClassUrl, query);
    }
    deleteEntityClass(query) {
        return service.delete(this.deleteEntityClassUrl, query);
    }
    selectFormClass() {
        return service.get(this.selectFormClassUrl);
    }
    installFormClass(query) {
        return service.post(this.installFormClassUrl, query);
    }
    updateFormClass(query) {
        return service.put(this.updateFormClassUrl, query);
    }
    deleteFormClass(query) {
        return service.delete(this.deleteFormClassUrl, query);
    }
    selectObjClass() {
        return service.get(this.selectObjClassUrl);
    }
    installObjClass(query) {
        return service.post(this.installObjClassUrl, query)
    }
    updateObjClass(query) {
        return service.put(this.updateObjClassUrl, query)
    }
    deleteObjClass(query) {
        return service.delete(this.deleteObjClassUrl, query)
    }
}
export default FlowClassService;