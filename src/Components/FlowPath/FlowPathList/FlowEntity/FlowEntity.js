import React,{ Component } from "react"
import AddForm from "./AddForm"
import UpdateForm from "./UpdateForm"
import FlowPathListService from "../../../../Service/FlowPathListService";
import {
    Form,
    Row,
    Col,
    Input,
    Button,
    Table,
    PageHeader,
    Modal,
    Pagination,
    Tag,
    Select,
    message,
    DatePicker,
    Icon
} from 'antd';
import "../../../../Assets/Styles/common.less";
const { Option } = Select;
const { RangePicker } = DatePicker
class FlowEntity extends Component{
    constructor(props) {
        super(props);
        this.FlowPathListService = new FlowPathListService();
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
            // 分类
            projectClass: [],
            // 修改回显
            updateData:null,
        }
    }
    componentDidMount() {
        this.pageOnChange(this.state.pageNum);
        //this.selectClass();
    }
    // 分页
    pageOnChange(pageNum) {
        this.FlowPathListService.selectEntityAll({pageNum:pageNum, pageSize:this.state.pageSize}).then((res)=> {
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
        this.FlowPathListService.selectEntityAll({pageNum:this.state.pageNum, pageSize:pageSize}).then((res)=> {
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
    // 查询
    selectAction() {
        this.props.form.validateFields((err, values)=>{
            if(!err) {
                this.ProjectService.selectAll({businessObjectEntity:values}).then((res)=> {
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
    // 查询分类
    selectClass() {
        this.ProjectService.selectClass().then((res) => {
            let result = res.data;
            if (result.code > 0) {
                this.setState({
                    projectClass: result.data
                })
            } else {
                message.error("项目分类查询失败！")
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
        this.setState({
            updateItemFlag: true,
            updateData:record
        })
    }
    //删除
    deleteItem() {
        this.ProjectService.delete(this.state.selectedRowKeys).then(res=>{
            if (res.data.code>0) {
                message.success("删除成功！");
                this.pageOnChange(this.state.pageNum);
            } else {
                message.error("删除失败");
            }
        })
    }
    // //  日期
    // function onChange(date, dateString) {
    //     console.log(date, dateString);
    // }
    render() {
        const columns = [
            {
                title:"流程实例标题",
                dataIndex:"subject"
            },{
                title:"流程名称",
                dataIndex:"processDefineName"
            },{
                title:"业务主键",
                dataIndex:"bizKey",
            },{
                title:"实例状态",
                dataIndex:"",
            },{
                title:"是否挂起",
                dataIndex:"suspendState",
                render: (text, record)=>{
                    switch(record){
                        case 0:
                            return <Tag color={"green"}>正常</Tag>
                        case 1:
                            return <Tag color={"red"}>挂起</Tag>
                        default:
                            return "无状态"
                    }
                }
            },{
                title:"实例结束时间",
                dataIndex:"endTime"
            },{
                title:"持续时间",
                dataIndex:"duration"
            }, {
                title: "BPMN流程实例ID",
                dataIndex: "bpmnInstanceId",
             },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        <Button type={"primary"} size={"small"} onClick={this.updateAction.bind(this, record)}>修改</Button>
                        <Button type={"danger"} size={"small"}>
                            明细
                        </Button>
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
                <PageHeader title="项目查询"/>
                <Form style={{marginBottom:20}}>
                    <Row span={24} gutter={40}>
                        <Col span={8}>
                            <Form.Item label={"流程实例标题"}>
                                {getFieldDecorator('itemName', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"流程名称"}>
                                {getFieldDecorator('itemName', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"关联数据"}>
                                {getFieldDecorator('itemName', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"是否挂起"}>
                                {getFieldDecorator('stateName', {})(<Select placeholder={"正常"}>
                                    <Option value="0">失败</Option>
                                    <Option value="1">未审核</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"实例状态"}>
                                {getFieldDecorator('stateName', {})(<Select placeholder={"全部"}>
                                    <Option value="0">建设中</Option>
                                    <Option value="1">未审核</Option>
                                    <Option value="2">发布</Option>
                                    <Option value="3">失效</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"创建人"}>
                                {getFieldDecorator('itemName', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"创建时间至"}>
                                {getFieldDecorator('itemName', {})(< RangePicker />)}
                            </Form.Item>
                        </Col>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Button type={"primary"} onClick={this.selectAction.bind(this)}>查询</Button>
                            <Button style={{ marginLeft: 30 }} onClick={()=>{this.props.form.resetFields()}}  type={"primary"}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <PageHeader title="项目列表"/>
                <div className="table-operations">
                    <Button onClick={this.deleteItem.bind(this)} type={"primary"} disabled={!hasSelected}>删除</Button>
                    <Button onClick={()=> {this.setState({ addItemFlag: true})}} type={"primary"}>新增</Button>
                </div>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <Pagination style={{marginTop:10}} showTotal={this.showTotal.bind(this)}  defaultCurrent={this.state.pageSize} total={this.state.total} showSizeChanger onChange={this.pageOnChange.bind(this)} onShowSizeChange={this.onShowSizeChange.bind(this)}/>
                <Modal
                    title="增加项目"
                    visible={this.state.addItemFlag}
                    onOk={this.handleOk.bind(this, "ADD")}
                    onCancel={()=>{this.setState({ addItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <AddForm dataClass={this.state.projectClass} onRef={this.onRef.bind(this)}/>
                </Modal>
                <Modal
                    title="修改项目"
                    visible={this.state.updateItemFlag}
                    onOk={this.handleOk.bind(this, "UPDATE")}
                    onCancel={()=>{this.setState({ updateItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <UpdateForm dataClass={this.state.projectClass} dataUpdate={this.state.updateData} onRef={this.onRef.bind(this)}/>
                </Modal>
            </div>
        )
    }
}
export default Form.create("ProjectData")(FlowEntity);