import React, {Component} from 'react';
import ProjectService from "../../../Service/ProjectService";
import {Form, Input, PageHeader, Radio, Button, Modal, Select, message} from 'antd'
import "../../../Assets/Styles/common.less";
import Utils from "../../../Utils/Class/Utils";
class ProTrainOperation extends Component{
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
            type:'classify',
            itemClass:''
        }
    }

    componentDidMount() {
        this.getOperationData();
    }

    //获取数据
    getOperationData() {
        let id = Utils.getQueryParam(this.props.location,"id"),
            itemTypeId = Utils.getQueryParam(this.props.location,"itemTypeId"),
            itemSayId = Utils.getQueryParam(this.props.location,"itemSayId"),
            itemClass = Utils.getQueryParam(this.props.location,"itemClass")
            this.setState({
                itemClass:itemClass
            })
        debugger;
        this.ProjectService.getModelClassify(`${id},${itemSayId}`).then((res) => {
            let result = res.data.data;
            console.log(result)
            if (res.data.code > 0) {
                console.log("模型训练成功!");
                this.setState({
                    itemName:result.itemName,
                    typeName:result.typeName,
                    //itemDescription:result.itemDescription,
                    name:result.name,
                    //appName:result.appName,
                    algorithmName:result.algorithmName,
                    path:result.path,
                    savePath:result.savePath
                })
            } else {
                message.error("模型训练出现错误，请重试！");
            }
        })
    }
    showModal = () => {
        let itemTypeId = Utils.getQueryParam(this.props.location,"itemTypeId"),
            itemSayId = Utils.getQueryParam(this.props.location,"itemSayId")
        this.ProjectService.modelTrain(`${itemTypeId},${itemSayId}`).then((res) => {
            let result = res
            if(res.data.code > 0){
                console.log(result)
                this.props.history.push('/project/list')
            }else{
                message.error("修改失败");
            }
        })
    };
    check = (record) => {
        this.props.form.validateFields(err => {
            if (!err) {
                console.info('success');
            }
        });
        this.props.history.push('/project/train_operation'+record.itemId)
    };
    render() {
        const  {  itemName,typeName, itemDescription, name, algorithmName,itemClass } = this.state;
        return(
            <Form style={{padding: '10px'}}>
                <PageHeader title="模型运算"/>
                <div style={{fontSize:'20px',width:'300px',margin:'20px auto',paddingTop:'24px'}}>
                    <p>项目名称：{itemName}</p>
                    <p>项目类型：{typeName}</p>
                    <p>模型类别：{itemDescription}</p>
                    <p>分类体系：{itemClass}</p>
                    <p>算法：{algorithmName}</p>
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
export default Form.create()(ProTrainOperation);