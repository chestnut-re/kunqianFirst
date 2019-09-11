import {service} from '../Utils/Class/Service';
import {WORKFLOW_WORK} from "./config"
class BpmnService{
    constructor(){
        this.installBpmnUrl = `${WORKFLOW_WORK}/bpm/bpmDefine/save`;
        this.selectAllBpmnUrl = `${WORKFLOW_WORK}/bpm/bpmDefineControllerR/getList/`;
        this.selectByIdBpmnUrl= `${WORKFLOW_WORK}/bpm/bpmDefineControllerR/selectOne`;
        this.selectByIdObj = `${WORKFLOW_WORK}/bpm/bpmDefineControllerR/getById/a102d551-8fd7-4da1-9375-db201536b0cf`;
        this.selectList = `${WORKFLOW_WORK}/bpm/bpmDefineControllerR/startupProcess/`;
        // 获取结构
        this.selectFormUrl = `/workflow/bpm/businessObjectAttribute/getListByEntityId`;
    }
    // 保存bpmn
    installBpmn(query) {
        return service.post(this.installBpmnUrl, query);
    }
    selectAllBpmn() {

    }
    selectByIdBpmn(query) {
        return service.get(this.selectByIdObj);
    }
    selectForm(id) {
        return service.get(this.selectFormUrl,{params:{"entityId":id}});
    }
}
export default BpmnService;