import {service} from '../Utils/Class/Service';
import {WORKFLOW_WORK} from "./config"
class FlowFormInitService{
    constructor() {
        this.selectFormAllUrl = `${WORKFLOW_WORK}/bpm/bpmFormDefine/getPage`;
        this.selectFormByIdUrl = `${WORKFLOW_WORK}/bpm/bpmFormDefine/get/`;
        this.installFormUrl = `${WORKFLOW_WORK}/bpm/bpmFormDefine/save`;
        this.deleteFormUrl = `${WORKFLOW_WORK}/bpm/bpmFormDefine/delete`;
        this.updateFormUrl = `${WORKFLOW_WORK}/bpm/bpmFormDefine/update`;
    }
    selectFormAll(query) {
        return service.post(this.selectFormAllUrl, query);
    }
    selectFormById(id) {
        return service.get(this.selectFormByIdUrl+id);
    }
    installForm(query) {
        return service.post(this.installFormUrl, query);
    }
    deleteForm (query){
        return service.post(this.deleteFormUrl, query);
    }
    updateForm(query){
        return service.post(this.updateFormUrl, query);
    }
}
export default FlowFormInitService;