import React, {Component} from 'react';
import ProjectService from "../../../Service/ProjectService";
import {Form, Input, PageHeader, Radio, Button, Modal, Select, message, Row,  InputNumber, DatePicker, AutoComplete, Cascader } from 'antd'
import "../../../Assets/Styles/common.less";
import Utils from "../../../Utils/Class/Utils";
const InputGroup = Input.Group;
const { Option } = Select;
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
    // check = (record) => {
    //     this.props.form.validateFields(err => {
    //         if (!err) {
    //             console.info('success');
    //         }
    //     });
    //     this.props.history.push('/project/train_operation'+record.itemId)
    // };
    check(){
        this.props.history.push('/resources/put_relationship')
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const  {  itemName,typeName, itemDescription, name, algorithmName,itemClass } = this.state;
        return(
            <Form style={{padding: '10px'}}>
                <PageHeader title="创建实体"/>
                <Form.Item label={"导入实体数据"}>
                    {getFieldDecorator('itemStateId', {})(<Select placeholder={"全部"} style={{width:'400px'}}>
                        <Option value="0">建设中</Option>
                        <Option value="1">未审核</Option>
                        <Option value="2">发布</Option>
                        <Option value="3">失效</Option>
                    </Select>)}
                </Form.Item>
                <Form.Item label={"概念1"}>
                    <InputGroup compact>
                        <Select defaultValue="请选择概念属性">
                            <Option value="Zhejiang">Zhejiang</Option>
                            <Option value="Jiangsu">Jiangsu</Option>
                        </Select>
                        <Input style={{ width: '30%' }} defaultValue="" />
                    </InputGroup>
                    <p>备注：多选</p>
                </Form.Item>
                <Form.Item label={"关系类别"}>
                    <InputGroup compact>
                        <Select defaultValue="请选择关系属性">
                            <Option value="Zhejiang">Zhejiang</Option>
                            <Option value="Jiangsu">Jiangsu</Option>
                        </Select>
                        <Input style={{ width: '30%' }} defaultValue="" />
                    </InputGroup>
                    <p>备注：多选</p>
                </Form.Item>
                <Form.Item style={{margin:20,textAlign:'center'}}>
                    <Button type="primary" style={{margin:50}} onClick={this.check.bind(this)}>
                        确认
                    </Button>
                    <Button type="primary">
                        取消
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(ProTrainOperation);