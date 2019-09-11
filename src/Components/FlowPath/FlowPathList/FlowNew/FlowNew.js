import React,{ Component } from "react"
import FlowPathListService from "../../../../Service/FlowPathListService";
import FlowClassService from "../../../../Service/FlowClassService";
import { Form, Row, Col, Input, Button ,Table, PageHeader, Modal,Pagination, Card, Tag, Select, message,DatePicker} from 'antd';
import { Redirect } from 'react-router-dom';
import TreeNav from "../../../../Utils/Component/TreeNav/TreeNav";
import PageComponent from "../../../../Utils/Component/PageComponent/PageComponent"
import "../../../../Assets/Styles/common.less";
import Utils from "../../../../Utils/Class/Utils";
const { Option } = Select;
const { RangePicker } = DatePicker;
class FlowNew extends Component{
    constructor(props) {
        super(props);
        this.FlowPathListService = new FlowPathListService();
        this.FlowClassServicee = new FlowClassService();
        this.state = {
            // 弹出框
            updateItemFlag: false,
            //table分页
            dataSource:[],
            loading:true,
            selectedRowKeys: [],
            // 树结构
            treeData: [],
        }
    }
    componentDidMount() {
        this.getTreeData();
    }
    setDataSource(dataSource) {
        this.setState({
            dataSource: dataSource,
            loading:false,
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
        this.FlowClassServicee.selectFlowClass().then((res) => {
            if (res.data.code > 0) {
                let result = Utils.navTreeStrIteration(res.data.data,"0","categoryId","parentId","categoryName");
                this.setState({
                    treeData:result,
                })
            } else {
                message.error(res.data.msg);
            }
        })
    }
    // 查询
    selectAction() {
        this.props.form.validateFields((err, values)=>{
            this.refs.PageComponent.selectAll(values);
        })
    }
    // 修改
    updateAction(record) {
        return (<Redirect to={"/flowpath/form/entity/update"}/>)
    }
    // 发布
    releaseAction(record) {
        this.FlowPathListService.releaseFlow(record.defineId).then(res=>{
            let result = res.data;
            if (result.code > 0) {
                this.refs.PageComponent.resetData();
                message.success(result.msg);
            } else {
                message.success(result.msg);
            }
        })
    }
    render() {
        const columns = [
            {
                title:"名称",
                dataIndex:"name"
            },{
                title:"流程key",
                dataIndex:"defineKey"
            },{
                title:"流程描述",
                dataIndex:"depict",
            },{
                title:"状态",
                dataIndex:"status",
                render: (text) => {
                    switch(text) {
                        case 1:
                            return <Tag color={"red"}>草稿</Tag>;
                        case 2:
                            return <Tag color={"green"}>以发布</Tag>;
                        default:
                            return "无状态";
                    }
                }
            },{
                title:"生产状态",
                dataIndex:"testStatus",
            },{
                title:"版本号",
                dataIndex:"version"
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        <Button type={"primary"} size={"small"} onClick={this.releaseAction.bind(this, record)}>发布</Button>
                        <Button type={"primary"} size={"small"} onClick={this.updateAction.bind(this, record)}>修改</Button>
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
                        <Card title={"流程分类"} size={"small"} style={{marginRight:10,height:'100%'}}>
                            <TreeNav dataTree={this.state.treeData}></TreeNav>
                        </Card>
                    </Col>
                    <Col span={20}>
                        <PageHeader title="流程查询"/>
                        <Form style={{marginBottom:20}}>
                            <Row span={24} gutter={40}>
                                <Col span={8}>
                                    <Form.Item label={"流程名称"}>
                                        {getFieldDecorator('name', {})(<Input placeholder={"请输入"}/>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={"流程KEY"}>
                                        {getFieldDecorator('depict', {})(<Input placeholder={"请输入"}/>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={"流程状态"}>
                                        {getFieldDecorator('status', {})(<Select placeholder={"全部"}>
                                            <Option value="0">未激活</Option>
                                            <Option value="1">激活</Option>
                                            <Option value="2">禁用</Option>
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={"创建时间"}>
                                        {getFieldDecorator('tableName', {})(<RangePicker/>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={"生产状态"}>
                                        {getFieldDecorator('isExternal', {})(<Select placeholder={"全部"}>
                                            <Option value="1">是</Option>
                                            <Option value="0">否</Option>
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ textAlign: 'center' }}>
                                    <Button type={"primary"} onClick={this.selectAction.bind(this)}>查询</Button>
                                    <Button style={{ marginLeft: 30 }} onClick={()=>{this.props.form.resetFields()}}  type={"primary"}>重置</Button>
                                </Col>
                            </Row>
                        </Form>
                        <PageHeader title="流程列表"/>
                        <div className="table-operations">
                            <Button onClick={this.setAgeSort} type={"primary"}>删除</Button>
                            <Button href={"#/bpmn"} type={"primary"}>在线流程设计</Button>
                        </div>
                        <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.defineId} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                        <PageComponent
                            url={this.FlowPathListService.selectAllUrl}
                            ref={"PageComponent"}
                            dataSource={this.setDataSource.bind(this)}></PageComponent>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Form.create("FlowNew")(FlowNew);