import React,{ Component } from "react"
import FlowPathEntityService from "../../../../Service/FlowPathEntityService";
import Utils from "../../../../Utils/Class/Utils";
import { Form, Row, Col, Input, Button ,Table, PageHeader, Modal,Pagination, Card, Tag, Select, message} from 'antd';
import { Redirect } from 'react-router-dom';
import TreeNav from "../../../../Utils/Component/TreeNav/TreeNav";
import "../../../../Assets/Styles/common.less";
const { Option } = Select;
class EntityList extends Component{
    constructor(props) {
        super(props);
        this.FlowPathEntityService = new FlowPathEntityService();
        this.state = {
            // 弹出框
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
        }
    }
    componentDidMount() {
        this.pageOnChange(this.state.pageNum);
        this.getTreeData();
    }
    // 分页
    pageOnChange(pageNum) {
        this.FlowPathEntityService.selectAll({pageNum:pageNum, pageSize:this.state.pageSize}).then((res)=> {
            let result = res.data.data;
            if (res.data.code > 0) {
                this.setState({
                    loading:false,
                    pageNum: pageNum,
                    total:result.size,
                    dataSource:result.list,
                })
            } else {
                message.error(res.data.msg);
            }
        })
    }
    onShowSizeChange(current, pageSize) {
        this.FlowPathEntityService.selectAll({pageNum:this.state.pageNum, pageSize:pageSize}).then((res)=> {
            let result = res.data.data;
            if (res.data.code > 0) {
                this.setState({
                    loading: false,
                    pageSize: pageSize,
                    total: result.size,
                    dataSource: result.list,
                })
            } else {
                message.error(res.data.msg);
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
        this.FlowPathEntityService.selectTree().then((res) => {
            console.log(res)
            let treeData = res.data.data;
            let result = Utils.navTreeStrIteration(treeData,0, "categoryId","parentId","categoryName");
            this.setState({
                treeData: result,
            })
        })
    }
    // 查询
    selectAction() {
        this.props.form.validateFields((err, values)=>{
            if(!err) {
                this.FlowPathEntityService.selectAll({businessObjectEntity:values}).then((res)=> {
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
    // 修改
    updateAction(record) {
        return (<Redirect to={"#/flowpath/form/entity/update"}/>)
    }
    render() {
        const columns = [
            {
                title:"实体名称",
                dataIndex:"name"
            },{
                title:"实体描述",
                dataIndex:"depict"
            },{
                title:"是否生成表",
                dataIndex:"isCreateTable",
                render: (text) => {
                    return text? <Tag color={"green"}>是</Tag> : <Tag color={"red"}>否</Tag>;
                }
            },{
                title:"是否外部表",
                dataIndex:"isExternal",
                render: (text) => {
                    return text? <Tag color={"green"}>是</Tag> : <Tag color={"red"}>否</Tag>;
                }
            },{
                title:"状态",
                dataIndex:"status",
                render: (text) => {
                    switch(parseInt(text)) {
                        case 0:
                            return <Tag color={"red"}>未激活</Tag>
                        case 1:
                            return <Tag color={"green"}>以激活</Tag>
                        case 2:
                            return <Tag color={"yellow"}>禁用</Tag>
                        default:
                            return <Tag color={"red"}>状态无效</Tag>
                    }
                }
            },{
                title:"数据源",
                dataIndex:"dataSourceName"
            },{
                title:"表名",
                dataIndex:"tableName"
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
                        <Card title={"业务实例分类"} size={"small"} style={{marginRight:10,height:'100%'}}>
                            <TreeNav dataTree={this.state.treeData}></TreeNav>
                        </Card>
                    </Col>
                    <Col span={20}>
                        <PageHeader title="实体查询"/>
                        <Form style={{marginBottom:20}}>
                            <Row span={24} gutter={40}>
                                <Col span={8}>
                                    <Form.Item label={"实体名称"}>
                                        {getFieldDecorator('name', {})(<Input placeholder={"请输入"}/>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={"实体描述"}>
                                        {getFieldDecorator('depict', {})(<Input placeholder={"请输入"}/>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={"可用"}>
                                        {getFieldDecorator('status', {})(<Select placeholder={"全部"}>
                                            <Option value="0">未激活</Option>
                                            <Option value="1">激活</Option>
                                            <Option value="2">禁用</Option>
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={"生成表"}>
                                        {getFieldDecorator('tableName', {})(<Select placeholder={"全部"}>
                                            <Option value="1">是</Option>
                                            <Option value="0">否</Option>
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={"外部表"}>
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
                        <PageHeader title="实体列表"/>
                        <div className="table-operations">
                            <Button onClick={this.setAgeSort} type={"primary"}>删除</Button>
                            <Button href={"#/flowpath/form/entity/add"} type={"primary"}>新增</Button>
                        </div>
                        <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                        <Pagination style={{marginTop:10}} showTotal={this.showTotal.bind(this)}  defaultCurrent={1} total={this.state.total} showSizeChanger onChange={this.pageOnChange.bind(this)} onShowSizeChange={this.onShowSizeChange.bind(this)}/>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Form.create("")(EntityList);