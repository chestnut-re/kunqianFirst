import React, {Component} from 'react';
import {Form, Input, Button, Row, Col, Select, Cascader, message} from 'antd'
import { Redirect } from 'react-router';
import FlowPathEntityService from "../../../../Service/FlowPathEntityService";
import "../../../../Assets/Styles/common.less"
import Utils from "../../../../Utils/Class/Utils";
class AddEntityForm extends Component{
    constructor(props){
        super(props);
        this.FlowPathEntityService = new FlowPathEntityService()
        this.state = {
            dataSource: [],
            itemKey:0,
            treeData:[],
        }
    }
    componentDidMount() {
        this.getTreeData();
    }

    // 树结构
    getTreeData() {
        this.FlowPathEntityService.selectTree().then((res) => {
            let treeData = res.data.data;
            let result = Utils.navTreeIteration(treeData,0, "categoryId","parentId","categoryName");
            this.setState({
                treeData: result,
            })
        })
    }
    setTableData(obj) {
        this.setState({
            dataSource:[obj,...this.state.dataSource],
            itemKey:this.state.itemKey+1
        })
    }
    getTableDate(id, getFieldDecorator) {
        return {
            id:id,
            sm:() => { return <Form.Item label={""}>{getFieldDecorator("sm|"+id,{
                rules: [
                    {required: true,message: '注释不能为空！',}
                ]
            })(<Input/>)}</Form.Item>},
            name: ()=>{ return <Form.Item label={""}>{getFieldDecorator("name|"+id,{
                rules: [
                    {required: true,message: '名称不能为空！',}
                ]
            })(<Input/>)}</Form.Item>},
            isReq:() => {return <Form.Item label={""}>{getFieldDecorator("isReq|"+id, {
                rules: [
                    {required: true,message: '选择是否必填！',}
                ]
            })(
                <Select style={{width:'100%'}}>
                    <Select.Option value={0}>否</Select.Option>
                    <Select.Option value={1}>是</Select.Option>
                </Select>
            )}</Form.Item>},
            dataType:()=>{ return <Form.Item label={""}>{getFieldDecorator("dataType|"+id, {
                rules: [
                    {required: true,message: '请选择类型！',}
                ]
            })(
                <Select style={{width:'100%'}}>
                    <Select.Option value={"VARCHAR"}>字符串</Select.Option>
                    <Select.Option value={"DECIMAL"}>数字型</Select.Option>
                    <Select.Option value={"DATETIME"}>日期型</Select.Option>
                    <Select.Option value={"TEXT"}>大文本</Select.Option>
                </Select>
            )}</Form.Item>},
            dataLen:() => { return <Form.Item label={""}>{getFieldDecorator("dataLen|"+id,{
                rules: [
                    {required: true,message: '数据长度不能为空！',}
                ]
            })(<Input/>)}</Form.Item>},
            dataNull:() => { return <Form.Item label={""}>{getFieldDecorator("dataNull|"+id,{
            })(<Input/>)}</Form.Item>},
        }
    }
    tableDelete(record) {
        let id = record.id;
        let result = this.state.dataSource.filter(item => {
            return item.id !==id;
        })
        this.setState({
            dataSource: result
        })
    }
    tableSave() {
        this.props.form.validateFields((err,values) => {
            if (!err) {
                console.log(values);
                let result = {};
                result.packageId = values.packageId[values.packageId.length-1];
                result.name = values.entityName;
                result.depict = values.depict;
                result.businessObjectAttributes = [];
                let item = {};
                let data = this.state.dataSource;
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    item.name = values['name|'+ data[i].id];
                    item.depict = values['sm|'+data[i].id];
                    item.isRequired = values["isReq|"+data[i].id];
                    item.attributeLength = values["dataLen|"+data[i].id];
                    item.dataType = values["dataType|"+data[i].id];
                    if (values["dataNull|"+data[i].id]) {
                        item.defaultValue = values["dataNull|"+data[i].id];
                    }
                    result.businessObjectAttributes.push(item);
                    item = {};
                }
                this.FlowPathEntityService.install(result).then((res)=> {
                    let result = res.data;
                    if (result.code > 0) {
                        message.success("添加成功!");
                        return (<Redirect to="/flowpath/form/entity" />);
                    } else {
                        message.error("添加失败！");
                    }
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={{padding:10}}>
                <Button.Group style={{marginBottom:20}}>
                    <Button type={"primary"} onClick={this.tableSave.bind(this)}>保存</Button>
                    <Button href={"/flowpath/form/entity"}>返回</Button>
                </Button.Group>
                <Form>
                    <Row gutter={50} type={"flex"}>
                        <Col span={8}>
                            <Form.Item label={"实体分类"}>
                                {getFieldDecorator("packageId", {
                                    rules: [
                                        {required: true,message: '实体分类不能为空！',}
                                    ]
                                })(<Cascader options={ this.state.treeData } placeholder={"请选择实体分类"} />)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"实体描述"}>
                                {getFieldDecorator("depict", {
                                    rules: [
                                        {required: true,message: '实体描述不能为空！',}
                                    ]
                                })(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"实体名称"}>
                                {getFieldDecorator("entityName", {
                                    rules: [
                                        {required: true,message: '实体名称不能为空！',}
                                    ]
                                })(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button type={"primary"} onClick={this.setTableData.bind(this,this.getTableDate(this.state.itemKey, getFieldDecorator))} style={{marginBottom:20}}>增加</Button>
                    <Row style={{width:'100%',height:'40px',background:'#fff',lineHeight:'40px',textAlign:'center'}}>
                        <Col span={4}>注释</Col>
                        <Col span={4}>名称</Col>
                        <Col span={3}>必填</Col>
                        <Col span={3}>数据类型</Col>
                        <Col span={4}>属性长度</Col>
                        <Col span={4}>默认值</Col>
                        <Col span={2}>操作</Col>
                    </Row>
                    {this.state.dataSource.map(item=> {
                        return <Row key={item.id} style={{textAlign: 'center',padding:10}} gutter={10}>
                            <Col span={4}>{item.sm()}</Col>
                            <Col span={4}>{item.name()}</Col>
                            <Col span={3}>{item.isReq()}</Col>
                            <Col span={3}>{item.dataType()}</Col>
                            <Col span={4}>{item.dataLen()}</Col>
                            <Col span={4}>{item.dataNull()}</Col>
                            <Col span={2}><Button type={"primary"} onClick={this.tableDelete.bind(this, item)}>删除</Button></Col>
                        </Row>
                    })}
                </Form>
            </div>
        )
    }
}
export default Form.create()(AddEntityForm);