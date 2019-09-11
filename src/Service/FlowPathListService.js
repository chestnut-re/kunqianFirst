import {service} from '../Utils/Class/Service';
import {WORKFLOW_WORK} from "./config"
class FlowPathListService{
    constructor() {
        // 流程定义
        this.selectAllUrl = `${WORKFLOW_WORK}/bpm/bpmDefine/getPage`;
        // 流程实例
        this.selectEntityUrl = `${WORKFLOW_WORK}/bpm/bpmProcessInstance/getPage`;
        // 流程任务
        this.selectManageUrl = `${WORKFLOW_WORK}/bpm/bpmTask/getPage`;
        // 流程发布
        this.releaseFlowUrl = `${WORKFLOW_WORK}/bpm/bpmDefine/deployProcess/`;
    }
    selectAll(query) {
        return service.post(this.selectAllUrl, query);
    }
    selectEntityAll(query) {
        return service.post(this.selectEntityUrl, query);
    }
    releaseFlow(id) {
        return service.get(this.releaseFlowUrl+id);
    }
    installEntity() {

    }
    updateEntity() {

    }
    deleteEntity() {

    }
    selectManage(query) {
        return service.post(this.selectManageUrl, query)
    }
}
export default FlowPathListService;