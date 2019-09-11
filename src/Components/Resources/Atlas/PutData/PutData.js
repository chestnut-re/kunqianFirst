import React, {Component} from 'react';
import EntityOne from "./entityOne";
import EntityTwo from "./entityTwo";
import EntityRelational from "./entityRelational"
import ProjectService from "../../../../Service/ProjectService";
import ResourcesAtlasService from "../../../../Service/ResourcesAtlasService";
import {Form, Input, PageHeader, Radio, Button, Modal, Select, message, Row, Card, Col,} from 'antd'
import "../../../../Assets/Styles/common.less";
import Utils from "../../../../Utils/Class/Utils";
const InputGroup = Input.Group;
const { Option } = Select;
class PutData extends Component{
    constructor (props) {
        super(props);
        this.ProjectService = new ProjectService();
        this.ResourcesAtlasService = new ResourcesAtlasService()
        this.entityOne = React.createRef();
        this.entityTwo = React.createRef();
        this.entityRelational = React.createRef()
        this.state = {
            //弹出框
            addItemFlag : false,
            confirmLoading: false,
            path:'',
            savePath:'',
            type:'classify',
            itemClass:'',
            entityClass:[],
            RelationshipClass:[],
            entityAttributeClassOne:[],
            entityAttributeClassTwo:[],
            relationalAttributeClass:[],

        }
    }

    componentDidMount() {
        this.getEntityClass()
        this.getRelationshipClass()
    }
    //实体
    getRelationshipClass(){
        this.ResourcesAtlasService.entityClass(0).then((res) => {
            let result = res.data
            console.log(result)
            if (res.data.code > 0) {
                this.setState({
                    entityClass: result.data
                })
            }else{
                message.error(result.msg);
            }
        })
    }
    //关系
    getEntityClass(){
        this.ResourcesAtlasService.entityClass(1).then((res) => {
            let result = res.data
            console.log(result)
            if (res.data.code > 0) {
                this.setState({
                    RelationshipClass: result.data
                })
            }else{
                message.error(result.msg);
            }
        })
    }
    getAttributeOne(value){
        let val = value.replace(/\`/g,``)
        console.log(val)
        this.ResourcesAtlasService.attribute(`?name=${val}`).then((res) => {
            let result = res.data
            console.log(result)
            if (res.data.code > 0) {
                this.setState({
                    entityAttributeClassOne: result.data
                })
            }else{
                message.error(result.msg);
            }
        })

    }
    getAttributeTwo(value){
        let val = value.replace(/\`/g,``)
        console.log(val)
        this.ResourcesAtlasService.attribute(`?name=${val}`).then((res) => {
            let result = res.data
            console.log(result)
            if (res.data.code > 0) {
                this.setState({
                    entityAttributeClassTwo: result.data
                })
            }else{
                message.error(result.msg);
            }
        })

    }

    getRelationalAttribute(value){
        let val = value.replace(/\`/g,``)
        console.log(val)
        this.ResourcesAtlasService.relationalAttribute(`?name=${val}`).then((res) => {
            let result = res.data
            console.log(result)
            if (res.data.code > 0) {
                this.setState({
                    relationalAttributeClass: result.data
                })
            }else{
                message.error(result.msg);
            }
        })
    }

    // getFormContent() {
    //     let result;
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             result = values;
    //         }
    //     })
    //     return result;
    // }
    // restForm() {
    //     this.props.form.resetFields();
    // }

    check(){
        let data = this.entityOne.getFormContent();
        let data2 = this.entityTwo.getFormContent();
        let data3 = this.entityRelational.getFormContent();

        let add = {
            type : "add",
            entity : [
                data,
                data2
            ],
            relation : {
                name: [data3.name],
            }
        }
        console.log(add)
        this.ResourcesAtlasService.graphQuery(add).then((res) => {
            let result = res.data;
            console.log(result);
            if(res.data.code > 0) {
                message.success(result.msg)
            }else{
                message.error(result.msg)
            }
        })
        //this.props.history.push('/resources/atlas')
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form style={{padding: '10px'}}>
                <PageHeader title="创建关系"/>
                <div style={{padding: '30px' }}>
                    {/*<div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>*/}
                        {/*<Form.Item label={"输入实体数据"}>*/}
                            {/*{getFieldDecorator('itemOne', {})(<Select placeholder={"请选择实体类型"} style={{width:'200px'}} onChange={this.getAttributeOne.bind(this)}>*/}
                                {/*{this.state.entityClass ?this.state.entityClass.map((item,index)=>{*/}
                                    {/*return <Select.Option value={item} key={index}>{item}</Select.Option>*/}
                                {/*}):null}*/}
                            {/*</Select>)}*/}
                        {/*</Form.Item>*/}
                        {/*<Form.Item label={"输入实体数据"}>*/}
                            {/*{getFieldDecorator('itemTwo', {})(<Select placeholder={"请选择实体类型"} style={{width:'200px'}} onChange={this.getAttributeTwo.bind(this)}>*/}
                                {/*{this.state.entityClass ?this.state.entityClass.map((item,index)=>{*/}
                                    {/*return <Select.Option value={item} key={index}>{item}</Select.Option>*/}
                                {/*}):null}*/}
                            {/*</Select>)}*/}
                        {/*</Form.Item>*/}
                        {/*<Form.Item label={"输入关系数据"}>*/}
                            {/*{getFieldDecorator('itemRelationship', {})(<Select placeholder={"请选择实体关系"} style={{width:'200px'}} onChange={this.getRelationalAttribute.bind(this)}>*/}
                                {/*{this.state.RelationshipClass ?this.state.RelationshipClass.map((item,index)=>{*/}
                                    {/*return <Select.Option value={item} key={index}>{item}</Select.Option>*/}
                                {/*}):null}*/}
                            {/*</Select>)}*/}
                        {/*</Form.Item>*/}
                    {/*</div>*/}
                    <Row gutter={16}>
                        <Col span={8}>

                            <EntityOne entityClassOne={this.state.entityClass} wrappedComponentRef={(form)=>this.entityOne=form}/>
                        </Col>
                        <Col span={8}>

                            <EntityTwo entityClassTwo={this.state.entityClass} wrappedComponentRef={(form)=>this.entityTwo=form}/>
                        </Col>
                        <Col span={8}>
                            {/*<Form.Item label={"输入关系数据"}>*/}
                                {/*{getFieldDecorator('itemRelationship', {})(<Select placeholder={"请选择实体关系"} style={{width:'200px'}} onChange={this.getRelationalAttribute.bind(this)}>*/}
                                    {/*{this.state.RelationshipClass ?this.state.RelationshipClass.map((item,index)=>{*/}
                                        {/*return <Select.Option value={item} key={index}>{item}</Select.Option>*/}
                                    {/*}):null}*/}
                                {/*</Select>)}*/}
                            {/*</Form.Item>*/}
                            {/*<Card title="关系" bordered={false}>*/}
                                {/*{getFieldDecorator('itemRelationshipData', {})( <Form.Item>{this.state.relationalAttributeClass ?this.state.relationalAttributeClass.map((item,index)=>{*/}
                                    {/*if(item.length > 0){*/}
                                        {/*return <Form.Item label={item}>{getFieldDecorator(`${item}`, {*/}
                                            {/*rules: [*/}
                                                {/*{ required: true, message: '不能为空' },*/}
                                            {/*]*/}
                                        {/*})(<Input placeholder={"请输入"}/>)}*/}
                                        {/*</Form.Item>*/}
                                    {/*}else{*/}
                                        {/*message.error("没有数据");*/}
                                    {/*}*/}
                                {/*}):null}*/}
                                {/*</Form.Item>)}*/}
                            {/*</Card>*/}
                            <EntityRelational RelationshipClass={this.state.RelationshipClass} wrappedComponentRef={(form)=>this.entityRelational=form}/>
                        </Col>
                    </Row>
                </div>
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
export default Form.create()(PutData);