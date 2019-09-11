import React, {Component} from 'react';
import ProjectService from "../../../Service/ProjectService";
import {Form, Input, PageHeader, Radio, Button, Modal, Select, message} from 'antd'
import "../../../Assets/Styles/common.less";
import Utils from "../../../Utils/Class/Utils";
class KnowOperation extends Component{
    constructor (props) {
        super(props);
        this.ProjectService = new ProjectService();
        this.state = {
            //弹出框
            addItemFlag : false,
            ModalText: '正在运行，模型运行中请您稍后',
            confirmLoading: false,
            itemName:'',
            typeName:'',
            itemDescription:'',
            name:'',
            appName:'',
            algorithmName:'',
            path:'',
            savePath:'',
            type:'classify'
        }
    }

    componentDidMount() {
        this.getOperationData();
        //this.getClassifyS()
    }

    //获取数据
    getOperationData() {
        let id = Utils.getQueryParam(this.props.location,"id"),
            typeId = Utils.getQueryParam(this.props.location,"typeId"),
            typeId2 = Utils.getQueryParam(this.props.location,"typeId2");
        debugger;
        this.ProjectService.getModelClassify(`${id},${typeId},${typeId2}`).then((res) => {
            let result = res.data.data;
            console.log(result)
            if (res.data.code > 0) {
               console.log("修改成功!");
                this.setState({
                    itemName:result.itemName,
                    typeName:result.typeName,
                    itemDescription:result.itemDescription,
                    name:result.name,
                    appName:result.appName,
                    algorithmName:result.algorithmName,
                    path:result.path,
                    savePath:result.savePath
                })
            } else {
                message.error("修改失败");
            }
        })
    }
    showModal = () => {
        let idMX = Utils.getQueryParam(this.props.location,"typeId");
        let idSJ = Utils.getQueryParam(this.props.location,"typeId2");
        debugger;
        this.ProjectService.getClassify(`${idMX},${idSJ}`).then((res) => {
            let result = res
            if(res.data.code > 0){
                console.log(result)
                setTimeout(() => {
                    this.props.history.push('/project/list')
                }, 2000);
            }else{
                message.error("模型运算失败，请重试！");
            }
        })
    };
    check = (record) => {
        this.props.form.validateFields(err => {
            if (!err) {
                console.info('success');
            }
        });
        this.props.history.push('/project/know_operation'+record.itemId)
    };
    render() {
        const  {  itemName,typeName, itemDescription, name, appName, algorithmName, confirmLoading, ModalText} = this.state;
        return(
            <Form style={{padding: '10px'}}>
                <PageHeader title="模型运算"/>
                <div style={{fontSize:'20px'}}>
                    <p>项目名称：{itemName}</p>
                    <p>项目类型：{typeName}</p>
                    <p>项目描述：{itemDescription}</p>
                    <p>模型名称：{name}</p>
                    <p>模型类别：{appName}</p>
                    <p>算法：{algorithmName}</p>
                    <ul>
                        模型使用规则：
                        <li>标题：</li>
                        <li>正文：</li>
                    </ul>
                </div>
                <Form.Item style={{margin:20,textAlign:'center'}}>
                    <Button type="primary" onClick={this.showModal} style={{margin:50}}>
                        确认
                    </Button>
                    <Button type="primary" onClick={this.check}>
                        取消
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(KnowOperation);