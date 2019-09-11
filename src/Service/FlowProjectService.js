import {service} from '../Utils/Class/Service';
import {WORKFLOW_WORK} from "./config"
/**
 * 流程-业务对象
 */
class FlowProjectService{
    constructor() {
        this.selectProUrl=`${WORKFLOW_WORK}/bpm/businessObjectDefine/getPage`;
        this.installProUrl = `${WORKFLOW_WORK}/bpm/businessObjectDefine/save`;
        this.updateProUrl = `${WORKFLOW_WORK}/bpm/businessObjectDefine/update`;
        this.deleteProUrl = `${WORKFLOW_WORK}/bpm/businessObjectDefine/delete/`;
        this.selectByIdUrl = `${WORKFLOW_WORK}/bpm/businessObjectDefine/get/`;
    }
    selectPro(query) {
        return service.post(this.selectProUrl, query);
    }
    installPro(query) {
        return service.post(this.installProUrl, query);
    }
    updatePro(query) {
        return service.put(this.updateProUrl, query);
    }
    deletePro(query) {
        return service.post(this.deleteProUrl, query);
    }
    selectById(id) {
        return service.get(this.selectByIdUrl+id);
    }
}
export default FlowProjectService;