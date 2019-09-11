import React, {Component} from 'react';
import {Form, Input, Button, Select, Row, Col, Table, TreeSelect, Checkbox, message, Modal} from 'antd'
import SelectEntity from "./SelectEntity"
import FlowClassService from "../../../../Service/FlowClassService";
import FlowProjectService from "../../../../Service/FlowProjectService"
import Utils from "../../../../Utils/Class/Utils";
import SelectAddEntity from "./SelectAddEntity";
const { Option } = Select;
class AddForm extends Component{
    constructor (props) {
        super(props)
        this.FlowClassService = new FlowClassService();
        this.FlowProjectService = new FlowProjectService();
        this.state = {
            selectFlag: false,
            selectAddFlag:false,
            // 分类
            classData: [],
            entityData:null,
            // 实体列表
            entityList:[],
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
        this.getClassData();
    }
    // 查询分类
    getClassData() {
        this.FlowClassService.selectEnitytClass().then(res=>{
            if(res.data.code>0) {
                let classData = Utils.navTreeStrIteration(res.data.data,"0","categoryId","parentId","categoryName");
                this.setState({
                    classData:classData
                })
            } else {
                message.error(res.data.msg);
            }
        })
    }
    // 新增
    onRef = (name, ref) => {
        switch(name) {
            case "SelectEntity":
                this.SelectEntity = ref;
                break;
            case "SelectAddEntity":
                this.SelectAddEntity = ref;
                break;
            default:
                break;
        }

    }
    // 查询实体列表
    handleOk(flag) {
        if (flag === "SelectEntity") {
            let SelectEntity = this.SelectEntity.getContentData()[0];
            if (SelectEntity) {
                this.setState({
                    entityData:SelectEntity,
                    selectFlag: false,
                })
                this.props.form.setFieldsValue({referenceEntityName:SelectEntity.name})
            } else {
                message.error("请选择实例！");
            }
        } else if(flag === "SelectAddEntity"){
            let SelectEntityList = this.SelectAddEntity.getContentData();
            if (SelectEntityList) {
                for (let i = 0; i < SelectEntityList.length;i++) {
                    if (SelectEntityList[i].id === this.state.entityData.id){
                        message.error(`实例${SelectEntityList[i].name}已经选择为主实例，请重新选择!`);
                        return 0;
                    }
                }
                this.setState({
                    entityList:SelectEntityList,
                    selectAddFlag: false,
                })
            } else {
                message.error("请选择实例！");
            }
        }
    }
    // 批量操作
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    }
    // 增加
    addEntity() {
        if (this.state.entityData) {
            this.setState({selectAddFlag: true});
        } else {
            message.error("请先选择主实例!");
        }
    }
    // 删除
    deleteEntity(record) {
        let result = this.state.entityList.filter((item)=>{
            return item.id !== record.id
        })
        this.setState({
            entityList: result,
        })
    }
    // 保存
    saveObj() {
        this.props.form.validateFields((err, values)=>{
            if (!err) {
                console.log(values);
                let result = {};
                let temp = [];
                let entityList = this.state.entityList;
                let entityData = this.state.entityData;
                if (entityList.length === 0) {
                    message.error("请添加实体再保存！");
                } else {
                    result.depict = values.depict;
                    result.alias = values.alias;
                    result.categoryId = values.categoryId;
                    result.supportDb = values.supportDb? 1 : 0;
                    for (let i = 0; i < entityList.length; i++) {
                        let item = {};
                        item.entityId = entityList[i].id;
                        if (values["type|"+entityList[i].id]) {
                            item.type = values["type|"+entityList[i].id];
                        }
                        item.parentId = entityData.id;
                        temp.push(item);
                    }
                    let perItem = {};
                    perItem.entityId = entityData.id;
                    perItem.parentId= 0;
                    perItem.type = "main"
                    temp.push(perItem);
                    result.businessObjectEntityRelations = temp;
                    this.FlowProjectService.installPro(result).then(res=>{
                        if(res.data.code> 0) {
                            this.props.onRef();
                            message.success("添加成功");
                        } else {
                            message.error(res.data.msg);
                        }
                    })
                }
            }
        })
    }
    //重置
    restObj() {
        this.props.form.resetFields();
        this.setState({
            entityData: null,
            entityList:[],
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
                title:"类型",
                dataIndex:"id",
                render:(record)=>{
                    return getFieldDecorator("type|"+record,{
                        rules: [
                            { required: true, message: '类型不能为空' },
                        ]
                    })(<Select>
                        <Option value={"onetoone"}>一对一</Option>
                        <Option value={"onetomany"}>一对多</Option>
                        <Option value={"manytomany"}>多对多</Option>
                    </Select>)
                }
            },{
                title:"描述",
                dataIndex:"depict",
            },{
                title:"名称",
                dataIndex:"name",
            },{
                title:"操作",
                render:(record)=>(
                    <Button size={"small"} onClick={this.deleteEntity.bind(this,record)}>删除</Button>
                )
            },
        ]
        return(
            <Form style={{padding:'10px'}}>
                <div style={{paddingBottom:'10px'}}><Button type={"primary"} onClick={this.saveObj.bind(this)}>保存</Button> <Button type={"primary"} onClick={this.restObj.bind(this)}>重置</Button></div>
                <Row gutter={40}>
                    <Col span={4}>
                        <Form.Item label={"描述"}>
                            {getFieldDecorator("depict",{
                                rules: [
                                    { required: true, message: '描述不能为空' },
                                ]
                            })(<Input/>)}
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item label={"别名"}>
                            {getFieldDecorator("alias",{
                                rules: [
                                    { required: true, message: '别名不能为空' },
                                ]
                            })(<Input/>)}
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Col span={20}>
                            <Form.Item label={"主实例"}>
                                {getFieldDecorator("referenceEntityName",{
                                    rules: [
                                        { required: true, message: '主实例不能为空' },
                                    ]
                                })(<Input placeholder={"请选择主实例"} disabled={true}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={4} style={{padding:0}}>
                            <Button type={"primary"} onClick={()=>{this.setState({selectFlag:true})}}>选择</Button>
                        </Col>
                    </Col>
                    <Col span={5}>
                        <Form.Item label={"分类"}>
                            {getFieldDecorator("categoryId",{
                                rules: [
                                    { required: true, message: '分类不能为空' },
                                ]
                            })(<TreeSelect treeData={this.state.classData}>
                            </TreeSelect>)}
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                    <Form.Item label={"支持数据库"}>
                            {getFieldDecorator("supportDb",{})(<Checkbox/>)}
                    </Form.Item>
                    </Col>
                    <Col span={24}><Button onClick={this.addEntity.bind(this)} type={"primary"}>添加</Button></Col>
                    <Col span={24}>
                        <Table rowKey={record => record.id} dataSource={this.state.entityList} columns={columns}/>
                    </Col>
                </Row>
                <Modal
                    title="选择实体"
                    visible={this.state.selectFlag}
                    onOk={this.handleOk.bind(this, "SelectEntity")}
                    onCancel={()=>{this.setState({ selectFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                    zIndex={99}
                >
                    <SelectEntity onRef={this.onRef.bind(this)}/>
                </Modal>
                <Modal
                    title="选择实体"
                    visible={this.state.selectAddFlag}
                    onOk={this.handleOk.bind(this, "SelectAddEntity")}
                    onCancel={()=>{this.setState({ selectAddFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                    zIndex={99}
                >
                    <SelectAddEntity onRef={this.onRef.bind(this)}/>
                </Modal>
            </Form>
        )
    }
}
export default Form.create()(AddForm);