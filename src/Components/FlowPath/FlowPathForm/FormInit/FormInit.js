import React,{ Component } from "react"
import FlowFormInitService from "../../../../Service/FlowFormInitService";
import FlowClassService from "../../../../Service/FlowClassService";
import FlowProjectService from "../../../../Service/FlowProjectService";
import Utils from "../../../../Utils/Class/Utils";
import PageComponent from "../../../../Utils/Component/PageComponent/PageComponent";
import Layer from "react-layui-layer"
import { Form, Row, Col, Input, Button ,Table, PageHeader, Modal,Pagination, Card, Tag, Select, message} from 'antd';
import { Redirect } from 'react-router-dom';
import TreeNav from "../../../../Utils/Component/TreeNav/TreeNav";
import "../../../../Assets/Styles/common.less";
import AddForm from "./AddForm";
import SaveForm from "./SaveForm"
const { Option } = Select;
class FormInit extends Component{
    constructor(props) {
        super(props);
        this.FlowFormInitService = new FlowFormInitService();
        this.FlowClassService = new FlowClassService();
        this.FlowProjectService = new FlowProjectService();
        this.mySaveForm = React.createRef();
        this.state = {
            // 弹出框
            addItemFlag: false,
            saveFlag:true,
            updateItemFlag: false,
            //table分页
            dataSource:[],
            loading:true,
            selectedRowKeys: [],
            // 树结构
            treeData: [],
            classData:[],
        }
    }
    componentDidMount() {
        this.getTreeData();
    }
    showTotal(total) {
        return `总共${total}条`
    }
    // 批量操作
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };
    // 树结构
    getTreeData() {
        this.FlowClassService.selectFormClass().then((res) => {
            let treeData = res.data.data;
            let result = Utils.navTreeStrIteration(treeData,"0", "categoryId","parentId","categoryName");
            this.setState({
                treeData: result,
                classData: result
            })
        })
    }
    // 查询
    selectAction() {
        this.props.form.validateFields((err, values)=>{
            if(!err) {
                this.refs.PageComponent.selectAll(values);
            }
        })
    }
    // 修改
    updateAction(record) {
        return (<Redirect to={"/flowpath/form/entity/update"}/>)
    }
    // 获取
    getDataSource(dataSource) {
        if (dataSource) {
            this.setState({
                loading:false,
                dataSource:dataSource
            })
        } else {
            message.error("加载数据失败！")
        }
    }
    onRef = (name, ref) => {
        switch(name) {
            case "AddForm":
                this.AddForm = ref;
                break;
            case "SelectAddEntity":
                this.SelectAddEntity = ref;
                break;
            default:
                break;
        }
    }
    // 增加
     async handleOk(flag) {
        if(flag === "ADD"){
            let formInitData = await this.AddForm.getFormContent();
            if (formInitData.entityList.length > 0) {
                let temp = [];
                let arr = formInitData.entityList;
                for (let i = 0; i < arr.length; i++) {
                    await this.FlowProjectService.selectById(arr[i].id).then(res=>{
                        if (res.data.code> 0) {
                            temp.push(res.data.data);
                        } else {
                            message.error(res.data.code);
                        }
                    })
                }
                sessionStorage.setItem("formInitData", JSON.stringify(formInitData));
                sessionStorage.setItem("entityList", JSON.stringify(temp));
                this.mySaveForm.selectData();
                this.setState({
                    addItemFlag:false,
                    saveFlag:true
                })
            } else {
                message.error("请选择业务对象！");
            }
        }
    }
    render() {
        const columns = [
            {
                title:"名称",
                dataIndex:"name"
            },{
                title:"别名",
                dataIndex:"depict"
            },{
                title:"业务对象",
                dataIndex:"isCreateTable",
                render: (text) => {
                    return text? <Tag color={"green"}>是</Tag> : <Tag color={"red"}>否</Tag>;
                }
            },{
                title:"分类",
                dataIndex:"isExternal",
                render: (text) => {
                    return text? <Tag color={"green"}>是</Tag> : <Tag color={"red"}>否</Tag>;
                }
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        <Button type={"primary"} onClick={this.updateAction.bind(this, record)}>修改</Button>
                    </Button.Group>
                )
            }
        ]
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: record.id === 'Disabled User',
                name: record.id,
            }),
        };
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={{padding:'10px'}}>
                <Row>
                    <Col span={4}>
                        <Card title={"表单分类"} size={"small"} style={{marginRight:10,height:'100%'}}>
                            <TreeNav dataTree={this.state.treeData}></TreeNav>
                        </Card>
                    </Col>
                    <Col span={20}>
                        <PageHeader title="表单元数据查询"/>
                        <Form style={{marginBottom:20}}>
                            <Row span={24} gutter={40}>
                                <Col span={8}>
                                    <Form.Item label={"名称"}>
                                        {getFieldDecorator('name', {})(<Input placeholder={"请输入名称"}/>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={"别名"}>
                                        {getFieldDecorator('key', {})(<Input placeholder={"请输入别名"}/>)}
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ textAlign: 'center' }}>
                                    <Button type={"primary"} onClick={this.selectAction.bind(this)}>查询</Button>
                                    <Button style={{ marginLeft: 30 }} onClick={()=>{this.props.form.resetFields()}}  type={"primary"}>重置</Button>
                                </Col>
                            </Row>
                        </Form>
                        <PageHeader title="表单无数据列表"/>
                        <div className="table-operations">
                            <Button onClick={this.setAgeSort} type={"primary"}>删除</Button>
                            <Button onClick={() => {this.setState({'addItemFlag':true })}} type={"primary"}>新增</Button>
                        </div>
                        <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                        <PageComponent url={"/bpm/bpmFormDefine/getPage"}
                                       ref={"PageComponent"}
                                       dataSource={this.getDataSource.bind(this)} />
                    </Col>
                </Row>
                <Modal
                    title="增加项目"
                    visible={this.state.addItemFlag}
                    onOk={this.handleOk.bind(this, "ADD")}
                    onCancel={()=>{this.setState({ addItemFlag: false});}}
                    okText="下一步"
                    cancelText="取消"
                    zIndex={98}
                >
                    <AddForm dataClass={this.state.classData} onRef={this.onRef.bind(this)}/>
                </Modal>
                <Layer width={'100%'} height={'100%'} title={"添加表单元数据定义"} onCancel={()=>{this.setState({saveFlag:false})}} visible={this.state.saveFlag}>
                    <SaveForm wrappedComponentRef={(inst)=>this.mySaveForm = inst}></SaveForm>
                </Layer>
            </div>
        )
    }
}
export default Form.create("")(FormInit);