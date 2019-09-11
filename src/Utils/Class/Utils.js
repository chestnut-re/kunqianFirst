export default class Utils{
    /**
     * 数组冒泡排序
     * @param Arr Array
     * @return Array
     */
    static bubbleSort(Arr) {
        let temp;
        for (let i = 0; i < Arr.length-1; i++) {
            for (let j = 0; j < Arr.length-i-1; j++) {
                if (Arr[j] > Arr[j+1]) {
                    temp = Arr[j+1];
                    Arr[j+1] = Arr[j];
                    Arr[j] = temp;
                }
            }
        }
        return Arr;
    }

    /**
     * 树结构遍历
     * @param Arr Array
     * @param pid 父节点id
     * @param idName id名称
     * @param pidName 父id名称
     * @param Arr节点name名称
     * @return Array
     */
    static navTreeIteration(Arr,pid,idName,pidName,name) {
        let result = [];
        let temp = [];
        for (let i = 0; i < Arr.length; i++) {
            if (parseInt(Arr[i][pidName]) === parseInt(pid)) {
                const obj = { 'label': Arr[i][name], 'value': Arr[i][idName], 'title': Arr[i][name],'key':Arr[i][idName]}
                temp = Utils.navTreeIteration(Arr, Arr[i][idName],idName,pidName,name);
                if (temp.length > 0) {
                    obj.children = temp
                }
                result.push(obj)
            }
        }
        return result;
    }
    /**
     * 树结构遍历
     * @param Arr Array
     * @param pid 父节点id
     * @param idName id名称
     * @param pidName 父id名称
     * @param Arr节点name名称
     * @return Array
     */
    static navTreeStrIteration(Arr,pid,idName,pidName,name) {
        let result = [];
        let temp = [];
        for (let i = 0; i < Arr.length; i++) {
            if (Arr[i][pidName] === pid) {
                const obj = { 'label': Arr[i][name], 'value': Arr[i][idName], 'title': Arr[i][name],'key':Arr[i][idName]}
                temp = Utils.navTreeStrIteration(Arr, Arr[i][idName],idName,pidName,name);
                if (temp.length > 0) {
                    obj.children = temp
                }
                result.push(obj)
            }
        }
        return result;
    }
    /**
     *
     * @param Arr Arr
     * @param options 配置
     */
    static tableTreeIteration(Arr,options) {
        let result = [];
        let temp = [];
        for (let i = 0; i < Arr.length; i++) {
            let itemId = Arr[i][options.parentName];
            if (parseInt(itemId) === parseInt(options.parentId)) {
                const obj = Arr[i];
                temp = Utils.tableTreeIteration(Arr, {parentId:Arr[i][options.idName], parentName:options.parentName, idName: options.idName});
                if (temp.length > 0) {
                    obj.children = temp
                }
                result.push(obj)
            }
        }
        return result;
    }
    /**
     *
     * @param Arr Arr
     * @param options 配置
     */
    static tableStrTreeIteration(Arr,options) {
        let result = [];
        let temp = [];
        for (let i = 0; i < Arr.length; i++) {
            let itemId = Arr[i][options.parentName];
            if (itemId === options.parentId) {
                const obj = Arr[i];
                temp = Utils.tableStrTreeIteration(Arr, {parentId:Arr[i][options.idName], parentName:options.parentName, idName: options.idName});
                if (temp.length > 0) {
                    obj.children = temp
                }
                result.push(obj)
            }
        }
        return result;
    }

    /**
     *  获取Url参数
     *  @local react Localtion对象
     *  @param variable 名称
     */
    static getQueryParam(local, variable){
        let query = local.search.substring(1);
        let vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if(pair[0] === variable){return pair[1];}
        }
        return(false);
    }

    /**
     * 去除json空值
     * @param object
     */
    static deleteEmptyProperty(object){
        let result = {};
        if (object.pageSize && object.pageNum){
            for(let key in object) {
                if (object[key] !== null && object[key] !== "" && object[key] !== undefined) {
                    result[key] = object[key]
                }
            }
        }
        return result;
    }
}