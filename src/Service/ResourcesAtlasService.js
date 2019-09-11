import {service} from '../Utils/Class/Service';
import { PROJECT_WORK } from "./config"

/**
 * 图谱管理service  -张瑞
 */
class ResourcesAtlasService {
    constructor() {
        /**
         *  图谱管理
         */
        /** 图谱列表*/
        this.atlasListUrl = `${PROJECT_WORK}/itemGraph/getPage`;
        this.atlasInstallUrl = `${PROJECT_WORK}/itemGraph/save`;
        this.entityClassUrl = `${PROJECT_WORK}/itemGraph/getConceptList/`;
        this.attributeUrl = `${PROJECT_WORK}/itemGraph/queryKeyByLabel`;
        this.relationalAttributeUrl =  `${PROJECT_WORK}/itemGraph/queryKeyByGraphEdge`;
        this.pullDataUrl =  `${PROJECT_WORK}/itemGraph/createQuery`;
        this.createGraphConceptUrl = `${PROJECT_WORK}/itemGraph/createGraphConcept`;
        this.createGraphEdgeUrl = `${PROJECT_WORK}/itemGraph/createGraphEdge`;
        this.graphQueryUrl = `${PROJECT_WORK}/itemGraph/graphQuery`;
//      this.commonDictionaryList = `${PROJECT_WORK}/itemDictionary/getPage?pageNum=1&pageSize=4`; //通用词列表
    }
        atlasInstall(query){
        return service.post(this.atlasInstallUrl,query)
        }
        modelAll(query){
            return service.post(this.modelUrl,query);
        }
        entityClass(id){
            return service.get(this.entityClassUrl+id)
        }
        attribute(query){
            return service.get(this.attributeUrl+query)
        }
        relationalAttribute(query){
            return service.get(this.relationalAttributeUrl+query)
        }
        pullData(query){
            return service.get(this.pullDataUrl,query)
        }
        createGraphConcept(query){
            return service.post(this.createGraphConceptUrl,query)
        }
        createGraphEdge(query){
            return service.post(this.createGraphEdgeUrl,query)
        }
        graphQuery(query){
            return service.post(this.graphQueryUrl,query)
        }
//     /** 词典管理*/
//
//     /** 通用词词典*/
//     commonDictionaryListUrl (query) {
//         return service.post(this.commonDictionaryList, query)
//     }
//     /** 规则管理*/
//     getRuleListUrl () {
//         return service.post(this.getRuleList)
//     }
//     ruleDeleteUrl (query) {
//         return service.post(this.ruleDelete,query)
//     }

}
export default ResourcesAtlasService;