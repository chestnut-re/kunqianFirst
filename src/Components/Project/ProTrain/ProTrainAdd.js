import React, {Component} from 'react';
import {Form, Input, Select, PageHeader, message, Button} from 'antd';
import ProjectService from "../../../Service/ProjectService";
import "../../../Assets/Styles/common.less";
import Utils from "../../../Utils/Class/Utils";
const { Option } = Select;

class ProTrainAdd extends Component{
    constructor (props) {
        super(props)
        this.ProjectService = new ProjectService();
        this.state = {
            //类型
            modelTypesClass: [],
            //体系
            classList:[],
            //算法
            algrithmClass:[],
            algrighmList:[],
            //语料
            dataList:[],
            //模型id
            itemTypeId:null
        }
    }
    getFormContent() {
        let result;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                result = values;
            }
        })
        return result;
    }
    restForm() {
        this.props.form.resetFields();
    }
    componentDidMount() {
        this.selectClass();
        this.getClassList();
        this.algrithmClass();
        this.getsDataList()
        //this.setModelData()
    }
    // 查询模型类型
    selectClass() {
        this.ProjectService.modelClassList().then((res) => {
            let result = res.data.data;
            console.log(result)
            if (result.code > 0) {
                this.setState({
                    modelTypesClass: result.data
                })
            } else {
                message.error("模型类型查询失败！")
            }
        })
    }

    //查询分类体系
    getClassList() {
        this.ProjectService.classClass().then((res) => {
            let result = res.data;
            console.log(result)
            if (result.code > 0) {
                this.setState({
                    classList: result.data
                })
            } else {
                message.error("无分类体系")
            }
        })
    }

    //查询算法
    algrithmClass(){
        this.ProjectService.modelMath().then((res) => {
            let result = res.data.data;
            console.log(result)
            if (result.code > 0) {
                this.setState({
                    algrithmClass: result.data
                })
                console.log(this.state.algrithmClass)
            } else {
                message.error("模型类型查询失败！")
            }
        })
    }

    //查询语料
    getsDataList() {
        this.ProjectService.modelDataClass().then((res) => {
            let result = res.data;
            console.log(result)
            if (result.code > 0) {
                this.setState({
                    dataList: result.data,
                })
            } else {
                message.error("分类数据查询失败！")
            }
        })
    }

    setModelData() {
        let data = this.getFormContent();
        console.log(data)
        let idArr = data.itemApp.split(',');
        let idAlg = data.itemAlgrithm.split(',')
        data.appId = idArr[0];
        data.appName = idArr[1];
        data.algorithmName = idAlg[0];
        data.algorithmId = idAlg[1]
        this.ProjectService.modelInstall(data).then((res) => {
            let result = res.data;
            console.log(result)
            if(res.data.code > 0){
                this.setState({
                    itemTypeId: result.data
                },()=>{
                    let id = Utils.getQueryParam(this.props.location,"id");
                    console.log(this.state.itemTypeId)
                    this.props.history.push("/project/train_operation?id="+id+"&itemTypeId="+this.state.itemTypeId+"&itemSayId="+data.itemSayId+"&itemClass="+data.itemClass);
                })
                this.restForm();
            }else{
                message.error("模型创建失败！")
            }
        })
    }
    selectModel(value) {
        let name = value.split(',')[1];
        console.log(name)
        console.log(this.state.algrithmClass)
        this.setState({
            algrighmList:this.state.algrithmClass.filter((item)=>{
                return item.typeName === name;
            })
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form style={{padding:'10px'}}>
                <PageHeader title="模型训练-创建模型"/>
                <div style={{padding:'10px',width:'600px'}}>
                    <Form.Item label={"模型名称"} style={{ marginLeft: '40px'}}>
                        {getFieldDecorator("name", {
                            rules: [
                                { required: true, message: '模型名称不能为空' },
                            ]
                        })(<Input style={{ width: '400px' }} placeholder={"请输入模型名称"}/>)}
                    </Form.Item>
                    <Form.Item label={"模型类型"} style={{ marginLeft: '40px' }}>
                        {getFieldDecorator("itemApp", {
                            rules: [
                                { required: true, message: '模型类型不能为空' },
                            ]
                        })(<Select placeholder={"请选择模型类型"} style={{ width: '200px' }} onChange={this.selectModel.bind(this)}>
                            {this.state.modelTypesClass.map(item => {
                                return <Select.Option value={item.appId+','+item.appName} key={item.appId}>{item.appName}</Select.Option>;
                            })}
                        </Select>)}
                    </Form.Item>
                    <Form.Item label={"选择模型类别"} style={{ marginLeft: '24px' }}>
                        {getFieldDecorator('modelType', {})(<Select placeholder={"全部"} style={{ width: '200px' }}>
                            <Option value="统计模型">统计模型</Option>
                            <Option value="深度学习模型">深度学习模型</Option>

                        </Select>)}
                    </Form.Item>
                    <Form.Item label={"分类体系选择"} style={{ marginLeft: '12px' }}>
                        {getFieldDecorator("itemClass", {
                            rules: [
                                { required: true, message: '分类体系不能为空' },
                            ]
                        })(<Select placeholder={"请选择分类体系"} style={{ width: '200px' }}>
                            {this.state.classList.map(item => {
                                return <Select.Option value={item.categoryName} key={item.id}>{item.categoryName}</Select.Option>;
                            })}
                        </Select>)}
                    </Form.Item>
                    <Form.Item label={"算法选择"} style={{ marginLeft: '40px' }}>
                        {getFieldDecorator("itemAlgrithm", {
                            rules: [
                                { required: true, message: '算法不能为空' },
                            ]
                        })(<Select placeholder={"请选择算法"} style={{ width: '200px' }}>
                            {this.state.algrighmList.map(item => {
                                return <Select.Option value={item.algrithm+','+item.typeId} key={item.typeId}>{item.typeId}</Select.Option>;
                            })}
                        </Select>)}
                    </Form.Item>
                    <Form.Item label={"语料选择"} style={{ marginLeft: '40px' }}>
                        {getFieldDecorator("itemSayId", {
                            rules: [
                                { required: true, message: '语料不能为空' },
                            ]
                        })(<Select placeholder={"请选择语料"} style={{ width: '200px' }}>
                            {this.state.dataList.map(item => {
                                return <Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>;
                            })}
                        </Select>)}
                    </Form.Item>
                    <Form.Item label={"描述"} style={{ marginLeft: '78px' }}>
                        {getFieldDecorator("description", {

                        })(<Input.TextArea style={{ width: '400px',height: '200px'}} placeholder={"请输入描述"}/>)}
                    </Form.Item>
                    <div style={{ textAlign: 'center',margin: '50px' }}>
                        <Button  style={{ marginRight: '20px' }}type="primary" onClick={this.setModelData.bind(this)}>确定</Button>
                        <Button type="primary" onClick={() =>{}}>取消</Button>
                    </div>
                </div>
            </Form>
        );
    }
}
export default Form.create("")(ProTrainAdd);