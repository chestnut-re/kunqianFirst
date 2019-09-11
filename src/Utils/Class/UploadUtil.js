/**
 * 文件上传
 * @param file 文件名
 * @param url 地址
 * @param option json表单参数
 * @return {*} axios对象
 */
export function uploadAction(file, url, option){
    let formData = new FormData();
    formData.append("file", file);
    for (let i in option) {
        formData.append(i,option[i]);
    }
    return axios.post(url,{formData});
}