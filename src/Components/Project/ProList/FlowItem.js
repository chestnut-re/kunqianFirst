import React, {Component} from 'react';
import {Tabs, Form, Input, Select, message, TreeSelect} from 'antd';
import {service} from "../../../Utils/Class/Service";
import Utils from "../../../Utils/Class/Utils";

const { TabPane } = Tabs;
class FlowItem extends Component {
    constructor() {
        super()
        this.state = {
            optionDataList:null,
            resultData:null,
            value:null,
        }
    }
    getTaskItemData() {
        return this.state.value;
    }
     async componentDidMount() {
        let result = this.props.flowTasks;
        let urlList = this.getSelectData(result);
        let dataArr = await this.getUrlData(urlList);
        dataArr[0]().then(res=>{
            if (res.data.code > 0) {
                this.setState({
                    optionDataList:res.data.data,
                },()=>{
                    let resultData = this.generteElement(result);
                    this.setState({
                        resultData:resultData,
                    });
                })
            } else {
                message.error(res.data.msg);
            }
        })

        /*dataArr.then((res)=>{
            console.log(res);
            this.setState({
                resultData:res,
            })
            let resultData = this.generteElement(result);
            this.setState({
                resultData:resultData,
            });
         })*/
    }
    getSelectData(result) {
        let urlList = [];
        for(let i = 0; i < result.length;i++) {
            let taks = result[i]['taksAllFields'];
            for (let j = 0; j < taks.length; j++){
                if (taks[j].valueUrl) {
                    let item = {};
                    item[taks[j].id] = taks[j].valueUrl+"2";
                    urlList.push(item);
                }
            }
        }
        return urlList;
    }
    getUrlData(urlList) {
        let dataArr = [];
        urlList.map(item=>{
           for(let index in item){
                 let ajaxThen = async ()=>{ let ajaxItem = await service.post(item[index]);return ajaxItem}
                 dataArr.push(ajaxThen);
            }
        })
        return dataArr;
    }
    generteElement(data) {
        const { getFieldDecorator } = this.props.form;
        return <Tabs>
            {data.map((item,index)=>{
                return <TabPane tab={item.taskName} key={index}>
                    {item.taksAllFields.map((itemOne,index)=>{
                        if (itemOne.isPublic > 0) {
                            return <Form.Item label={itemOne['depict']} key={index}>{getFieldDecorator(itemOne['name'],{
                                initialValue:itemOne['fieldValue'],
                                rules: [
                                    { required: true, message: '类目体系不能为空' },
                                ]
                            })(
                                <Input disabled={true}/>
                            )}</Form.Item>
                        } else {
                            let dataSource = Utils.navTreeIteration(this.state.optionDataList,0,"speciesId","parentId","name");
                            return <Form.Item label={itemOne['depict']} key={index}>{getFieldDecorator(itemOne["name"],{
                                rules: [
                                    { required: true, message: '类目不能为空' },
                                ]
                            })(
                                <TreeSelect treeData={dataSource} onChange={this.onChange.bind(this)} value={this.state.value}></TreeSelect>
                            )}</Form.Item>
                        }
                    })}
                </TabPane>
            })}
        </Tabs>
    }
    onChange = value => {
        console.log('onChange ', value);
        this.setState({ value });
    };
    render() {
        return (
            <div>
                <Form>
                    {this.state.resultData}
                </Form>
            </div>
        );
    }
}

export default Form.create()(FlowItem);