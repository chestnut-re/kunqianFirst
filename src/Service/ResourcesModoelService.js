import {service} from '../Utils/Class/Service';
import { PROJECT_WORK } from "./config"

/**
 * 资源管理service  -张瑞
 */
class ResourcesModoelService {
    constructor() {
        /**
         *  模型管理
         */
        /** 通用词列表*/
        this.modelUrl = `${PROJECT_WORK}/itemModel/getPage`;
//      this.commonDictionaryList = `${PROJECT_WORK}/itemDictionary/getPage?pageNum=1&pageSize=4`; //通用词列表
    }
        modelAll(query){
            return service.post(this.modelUrl,query);
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
export default ResourcesModoelService;