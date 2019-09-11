import React,{ Component } from "react"
import AddForm from "./AddForm"
import UpdateForm from "./UpdateForm"
import FlowClassService from "../../../../Service/FlowClassService";
import FlowProjectService from "../../../../Service/FlowProjectService";
import {Form, Row, Col, Input, Button, Table, PageHeader, Modal, Pagination, Tag, Select, message, Card} from 'antd';
import Layer from 'react-layui-layer';
import "../../../../Assets/Styles/common.less";
import TreeNav from "../../../../Utils/Component/TreeNav/TreeNav";
import Utils from "../../../../Utils/Class/Utils";
const { Option } = Select;

class FlowProject extends Component{
    constructor(props) {
        super(props);
        this.FlowClassService = new FlowClassService();
        this.FlowProjectService = new FlowProjectService();
        this.state = {
            // 弹出框
            addItemFlag: false,
            updateItemFlag: false,
            //table分页
            dataSource:[],
            pageSize: 10,
            pageNum: 1,
            total:1,
            loading:true,
            selectedRowKeys: [],
            // 树结构
            treeData: [],
            updateData:{},
        }
    }
    componentDidMount() {
        this.pageOnChange(this.state.pageNum);
        this.getTreeData();
    }
    // 分页
    pageOnChange(pageNum) {
        this.FlowProjectService.selectPro({pageNum:pageNum, pageSize:this.state.pageSize}).then((res)=> {
            let result = res.data.data;
            if (res.data.code > 0) {
                this.setState({
                    loading:false,
                    pageNum: pageNum,
                    total:result.total,
                    dataSource:result.list,
                })
            } else {
                message.error(res.data.msg)
            }
        })
    }
    onShowSizeChange(current, pageSize) {
        this.FlowProjectService.selectPro({pageNum:this.state.pageNum, pageSize:pageSize}).then((res)=> {
            let result = res.data.data;
            if (res.data.code> 0) {
                this.setState({
                    loading:false,
                    pageSize: pageSize,
                    total:result.total,
                    dataSource:result.list,
                })
            } else {
                message.error(res.data.msg)
            }
        })
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
        this.FlowClassService.selectObjClass().then((res) => {
            let treeData = res.data.data;
            let result = Utils.navTreeStrIteration(treeData,"0", "categoryId","parentId","categoryName");
            this.setState({
                treeData: result,
            })
        })
    }
    // 查询
    selectAction() {
        this.props.form.validateFields((err, values)=>{
            if(!err) {
                this.setState({
                    pageNum:1,
                    pageSize:10,
                })
                values.pageNum = this.state.pageNum;
                values.pageSize = this.state.pageSize;
                this.FlowProjectService.selectPro(values).then((res)=> {
                    let result = res.data;
                    if (result.code > 0) {
                        this.setState({
                            total:result.data.size,
                            dataSource:result.data.list,
                        })
                    } else {
                        message.error("查询失败");
                    }
                })
            }
        })
    }
    // 新增
    onRef = (name, ref) => {
        switch(name) {
            case "AddForm":
                this.AddForm = ref;
                break;
            case "UpdateForm":
                this.UpdateForm = ref;
                break;
            default:
                break;
        }

    }
    handleOk(flag) {
        if (flag === "ADD"){
            let data = this.AddForm.getFormContent();
            this.ProjectService.install(data).then(res=> {
                if (res.data.code > 0) {
                    message.success("增加成功!");
                    this.AddForm.restForm();
                    this.setState({
                        addItemFlag: false
                    })
                    this.pageOnChange(this.state.pageNum);
                } else {
                    message.error("增加失败");
                }
            })
        } else if(flag === "UPDATE"){
            let data = this.UpdateForm.getFormContent();
            this.ProjectService.update(data[1], data[0]).then(res=> {
                if (res.data.code > 0) {
                    message.success("修改成功!");
                    this.setState({
                        updateItemFlag: false
                    })
                    this.pageOnChange(this.state.pageNum);
                } else {
                    message.error("修改失败");
                }
            })
        }
    }
    //更新
    updateAction(record) {
        this.FlowProjectService.selectById(record.id).then(res=>{
            if (res.data.code > 0) {
                this.setState({
                    updateItemFlag: true,
                    updateData:res.data.data,
                })
            } else {
                message.error("查询回显失败！");
            }
        })
    }
    //删除
    deleteItem() {
        this.FlowProjectService.deletePro(this.state.selectedRowKeys).then(res=>{
            if (res.data.code>0) {
                message.success("删除成功！");
                this.pageOnChange(this.state.pageNum);
                this.setState({
                    selectedRowKeys: []
                })
            } else {
                message.error("删除失败");
            }
        })
    }
    // 增加
    addEntity() {
        this.setState({
            addItemFlag: false,
        })
        this.pageOnChange(this.state.pageNum);
    }
    render() {
        const columns = [
            {
                title:"描述",
                dataIndex:"depict"
            },{
                title:"别名",
                dataIndex:"alias"
            },{
                title:"是否以发布",
                dataIndex:"isDeployed",
                render: (record) => {
                    return record? <Tag color={"green"}>是</Tag> :<Tag color={"red"}>否</Tag>;
                }
            },{
                title:"状态",
                dataIndex:"status",
                render:(text) => {
                    switch(parseInt(text)) {
                        case 1:
                            return <Tag color={"green"}>正常</Tag>
                        case 0:
                            return <Tag color={"red"}>禁用</Tag>
                        default:
                            return "无状态";
                    }
                }
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        <Button type={"primary"} size={"small"} onClick={this.updateAction.bind(this, record)}>修改</Button>
                    </Button.Group>
                )
            }
        ]
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const { getFieldDecorator } = this.props.form;
        const hasSelected = this.state.selectedRowKeys.length > 0;
        return(
            <div style={{padding:'10px'}}>
                <Row>
                    <Col span={4}>
                        <Card title={"业务对象分类"} size={"small"} style={{marginRight:10,height:'100%'}}>
                            <TreeNav dataTree={this.state.treeData}></TreeNav>
                        </Card>
                    </Col>
                    <Col span={20}>
                        <PageHeader title="业务对象查询"/>
                        <Form style={{marginBottom:20}}>
                            <Row span={24} gutter={40}>
                                <Col span={8}>
                                    <Form.Item label={"别名"}>
                                        {getFieldDecorator('alias', {})(<Input placeholder={"请输入"}/>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={"描述"}>
                                        {getFieldDecorator('depict', {})(<Input placeholder={"请输入"}/>)}
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ textAlign: 'center' }}>
                                    <Button type={"primary"} onClick={this.selectAction.bind(this)}>查询</Button>
                                    <Button style={{ marginLeft: 30 }} onClick={()=>{this.props.form.resetFields()}}  type={"primary"}>重置</Button>
                                </Col>
                            </Row>
                        </Form>
                        <PageHeader title="业务对象列表"/>
                        <div className="table-operations">
                            <Button onClick={this.deleteItem.bind(this)} type={"primary"}>删除</Button>
                            <Button onClick={()=>{this.setState({addItemFlag: true})}} type={"primary"}>新增</Button>
                        </div>
                        <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                        <Pagination style={{marginTop:10}} showTotal={this.showTotal.bind(this)}  defaultCurrent={1} total={this.state.total} showSizeChanger onChange={this.pageOnChange.bind(this)} onShowSizeChange={this.onShowSizeChange.bind(this)}/>
                    </Col>
                </Row>
                <Layer width={"100%"} height={"100%"} visible={this.state.addItemFlag} onCancel={()=>{this.setState({addItemFlag: false})}}><AddForm onRef={this.addEntity.bind(this)}/></Layer>
                <Layer width={"100%"} height={"100%"} visible={this.state.updateItemFlag} onCancel={()=>{this.setState({updateItemFlag: false})}}><UpdateForm updateData={this.state.updateData}/></Layer>
            </div>
        )
    }
}
export default Form.create("FlowProject")(FlowProject);