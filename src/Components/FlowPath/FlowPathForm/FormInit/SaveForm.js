import React,{ Component } from 'react'
import "../../../../Assets/Styles/common.less";
import {Button, Collapse, Card, Col, Row, Form, Input, Tree, message, Checkbox, Select, Tag} from "antd";
import FormProp from "./FormProp"
import { LineText } from "./config"
const { Panel } = Collapse;
const { TreeNode } = Tree;
const { ButtonGroup } = Button;
class SaveForm extends Component{
    constructor() {
        super()
        this.selectData = this.selectData.bind(this)
        this.state = {
            formInitData:{},
            entityList:[],
            elementList:[],
            elementTree:[],
        }
    }
    componentDidMount() {
        this.selectData();
    }

    // 查询值
    selectData(){
        let formInitData = JSON.parse(sessionStorage.getItem("formInitData"));
        let entityList = JSON.parse(sessionStorage.getItem("entityList"));
        this.setState({
            formInitData: formInitData,
            entityList: entityList,
        },()=>{
            if (this.state.formInitData && this.state.entityList > 0) {
                let elementTree = this.elementTree(this.state.entityList);
                let elementList = this.elementData(this.state.entityList);
                this.setState({
                    elementTree:elementTree,
                    elementList:elementList,
                })
            }
        })
    }
    // 生成element
    elementData(list) {
        let temp = [];
        const {getFieldDecorator} = this.props.form;
        for(let j = 0; j < list.length; j++) {
            let data = list[j].businessObjectEntities;
            for (let i = 0; i < data.length; i++) {
                let item = <Panel
                    header={<Form.Item>{getFieldDecorator("name|" + data[i].id, {initialValue: data[i].name})(<Input
                        style={{width: '65%', marginRight: '20px'}}/>)}<Button onClick={(e) => {
                        e.stopPropagation()
                    }}>移除字段</Button><Button>移除实例</Button></Form.Item>}>
                    {data[i].businessObjectAttributes.map(val => {
                        return <Row style={{textAlign: 'center', lineHeight: '40px'}}>
                            <Col span={1}><Checkbox/></Col>
                            <Col span={5}>{getFieldDecorator("name|" + data[i].id, {initialValue: val.depict})(
                                <Input/>)}</Col>
                            <Col span={4}>{getFieldDecorator("type|" + data[i].id, {})(<Select></Select>)}</Col>
                            <Col span={3}><Tag>类型</Tag></Col>
                            <Col span={4}></Col>
                            <Col span={5}></Col>
                        </Row>
                    })}
                </Panel>
                temp.push(item);
            }
        }
        return temp;
    }
    // 生成左侧列表
    elementTree(data) {
        let temp = [];
        for (let i = 0; i < data.length; i++) {
            let item = <TreeNode title={data[i].alias} key={data[i].id}>
                {data[i].businessObjectEntities.map(val=>{
                    return <TreeNode title={val.name} key={val.id}>
                        {val.businessObjectAttributes.length > 0? val.businessObjectAttributes.map(text=>{
                            return <TreeNode title={text.name} key={text.dataType}></TreeNode>
                        }):""}
                    </TreeNode>
                })}
            </TreeNode>;
            console.log(item);
            temp.push(item);
        }
        return temp;
    }
    onSelect(key) {
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{padding:'10px'}}>
                <Row>
                    <Col span={24} style={{padding:'10px'}}>
                        <Button type={"primary"} style={{marginRight:'10px'}}>保存</Button>
                        <Button>关闭</Button>
                    </Col>
                    <Col span={4}>
                        <Card size={"small"} title={"BO属性列表"}>
                            <Tree onSelect={this.onSelect.bind(this)} showLine>
                                <TreeNode title={"BO对象属性"}>
                                    {this.state.elementTree.map(item=>{
                                        return item;
                                    })}
                                </TreeNode>
                            </Tree>
                        </Card>
                    </Col>
                    <Col span={20}>
                        <Row gutter={40}>
                            <Col span={12}>
                                <Card size={"small"} title={"字段列表"}>
                                    <Row style={{textAlign:'center',lineHeight:'40px'}}>
                                        <Col span={5}>字段描述</Col>
                                        <Col span={4}>控件类型</Col>
                                        <Col span={3}>字段类型</Col>
                                        <Col span={4}>分组</Col>
                                        <Col span={5}>操作</Col>
                                    </Row>
                                    <Collapse expandIconPosition={"right"}>
                                        {this.state.elementList.map(item => {
                                            return item;
                                        })}
                                    </Collapse>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Collapse expandIconPosition={"right"}>
                                    <Panel header={"表单属性"}>
                                        <FormProp/>
                                    </Panel>
                                </Collapse>
                                <Card size={"small"} style={{marginTop:'10px'}} title={"字段属性()"}>
                                    <LineText/>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Form.create("SaveForm")(SaveForm);