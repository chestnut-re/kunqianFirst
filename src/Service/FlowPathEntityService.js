import {service} from '../Utils/Class/Service';
import {WORKFLOW_WORK} from "./config"
class FlowPathEntityService {
    constructor() {
        this.selectAllUrl = `${WORKFLOW_WORK}/bpm/businessObjectEntity/getPage`;
        this.installUrl = `${WORKFLOW_WORK}/bpm/businessObjectEntity/save`;
        this.selectTreeUrl = `${WORKFLOW_WORK}/bpm/businessObjectEntityCategory/getTreeData.json`;
        this.updateUrl = `${WORKFLOW_WORK}/bpm/businessObjectEntity/update`;
        this.selectByIdUrl = `${WORKFLOW_WORK}/bpm/businessObjectEntity/get/`;
    }
    selectAll(query) {
        return service.post(this.selectAllUrl,query);
    }
    install(query) {
        return service.post(this.installUrl, query);
    }
    selectTree() {
        return service.get(this.selectTreeUrl);
    }
    update(query) {
        return service.post(this.updateUrl, query);
    }
    selectById(id) {
        return service.get(this.selectByIdUrl+id)
    }
}
export default FlowPathEntityService;