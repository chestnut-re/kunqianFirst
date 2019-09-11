import React,{ Component } from "react"
//import TaskService from "../../../Service/TaskService";
import {Form, Row, Col, Input, Button, Table, PageHeader, Modal, Checkbox, Select, message, Tag} from 'antd';
import PageComponent from '../../../Utils/Component/PageComponent/PageComponent'
import "../../../Assets/Styles/common.less";
const { Option } = Select;

class TaskList extends Component{
    constructor(props) {
        super(props);
        //this.TaskService = new TaskService();
        this.state = {
            okFlag:false,
            //table分页
            dataSource:[],
            loading:true,
            selectedRowKeys: [],
        }
    }
    // 查询
    selectAction() {
        this.props.form.validateFields((err, values)=>{
            if(!err) {
                console.log(values)
                this.refs.PageComponent.selectAll(values);
            }
        })
    }
    componentDidMount() {
        let id = JSON.parse(sessionStorage.getItem("AdminData"))['id'];
        this.refs.PageComponent.selectAll({userId:id});
    }
    yesAction(record) {

    }
    okFlowAction() {

    }
    getDataSource(dataSource){
         if (dataSource) {
             this.setState({
                 dataSource:dataSource,
                 loading:false,
             })
         }
    }
    render() {
        const columns = [
            {
                title:"序号",
                dataIndex:"num"
            },{
                title:"任务类型",
                dataIndex:"taskType"
            },{
                title:"任务名称",
                dataIndex:"taskName",
            },{
                title:"流程名称",
                dataIndex:"stateName",
            },{
                title:"流程版本",
                dataIndex:"state"
            },{
                title:"任务描述",
                dataIndex:"taskDescription",
            },{
                title:"创建者",
                dataIndex:"creator",
            },{
                title:"创建时间",
                dataIndex:"createTime"
            },{
                title:"启用时间",
                dataIndex:"startTime",
            },{
                title:"任务状态",
                dataIndex:"taskState"
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        <Button type={"primary"} onClick={this.yesAction.bind(this, record)} size='small'>审批</Button>
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
                <PageHeader title="数据筛查"/>
                <Form style={{marginBottom:20}}>
                    <Row span={24} gutter={40}>
                        <Col span={8}>
                            <Form.Item label={"任务名称"}>
                                {getFieldDecorator('username', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"任务类型"}>
                                {getFieldDecorator('stateName', {})(<Select placeholder={"全部"}>
                                    <Option value="0">任务分类</Option>
                                    <Option value="1">标注</Option>
                                    <Option value="2">全部</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"流程名称"}>
                                {getFieldDecorator('status', {})(<Select placeholder={"全部"}>
                                    <Option value="0">全部</Option>
                                    <Option value="1">模型名称</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"任务状态"}>
                                {getFieldDecorator('stateName', {})(<Select placeholder={"全部"}>
                                    <Option value="0">完成</Option>
                                    <Option value="1">未运行</Option>
                                    <Option value="2">运行中</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Button type={"primary"} onClick={this.selectAction.bind(this)}>查询</Button>
                            <Button style={{ marginLeft: 30 }} onClick={()=>{this.props.form.resetFields()}}  type={"primary"}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <PageHeader title="数据列表"/>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <PageComponent
                    url={this.TaskService.taskUserActionUrl}
                    ref={"PageComponent"}
                    dataSource={this.getDataSource.bind(this)}/>
                <Modal
                    title="配置角色"
                    visible={this.state.okFlag}
                    onOk={this.okFlowAction.bind(this)}
                    onCancel={()=>{this.setState({ configureRoleFlag: false});}}
                    okText="保存"
                    cancelText="取消">

                </Modal>
            </div>
        )
    }
}
export default Form.create("TaskList")(TaskList);