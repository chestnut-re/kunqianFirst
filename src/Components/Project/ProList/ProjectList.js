import React,{ Component } from "react"
import AddForm from "./AddForm"
import UpdateForm from "./UpdateForm"
import ProjectService from "../../../Service/ProjectService";
import PageComponent from '../../../Utils/Component/PageComponent/PageComponent'
import { Form, Row, Col, Input, Button ,Table, PageHeader, Modal,Pagination, Tag, Select, message} from 'antd';
import Layer from 'react-layui-layer'
import FlowCommon from './Tpl/FlowCommon'
import "../../../Assets/Styles/common.less";
const { Option } = Select;


class ProList extends Component{
    constructor(props) {
        super(props);
        this.ProjectService = new ProjectService();
        this.state = {
            // 弹出框
            addItemFlag: false,
            updateItemFlag: false,
            flowItemFlag: false,
            //table分页
            dataSource:[],
            loading:true,
            selectedRowKeys: [],
            flowData: {},
            // 分类
            projectClass: [],
            flowClass: [],
            // 修改回显
            updateData:null,
        }
    }
    componentDidMount() {
        this.selectClass();
        //this.getUpdateState()
    }

    // 批量操作
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };
    // 查询
    selectAction() {
        this.props.form.validateFields((err, values)=>{
            if(!err) {
                this.refs.PageComponent.selectAll(values);
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
        this.ProjectService.selectFlow().then(res=>{
            let result = res.data;
            if (result.code > 0) {
                this.setState({
                    flowClass:result.data,
                })
            } else {
                message.error(result.msg);
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
            console.log(data)
            this.ProjectService.install(data).then(res=> {
                if (res.data.code > 0) {
                    message.success("增加成功!");
                    this.AddForm.restForm();
                    this.setState({
                        addItemFlag: false,
                        flowItemFlag: true,
                        flowData:res.data.data,
                    },()=>{
                        this.refs.flowCommon.updateStepData();
                    })
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
    getDataSource(dataSource) {
        if (dataSource) {
            this.setState({
                dataSource: dataSource,
                loading:false
            })
        }
    }
    // 进入项目
    openObject(record) {
        if(record.typeName === "知识分类"){
            this.props.history.push("/project/knowledge?id="+record.itemId);
        }else{
            this.props.history.push("/project/train_add?id="+record.itemId);
        }
    }
    //详情展示
    objectShow() {
        let  limit = this.state.selectedRowKeys
        this.props.history.push("/project/know_show")
    }
    // 项目启动
    objectPlus(record) {
        this.ProjectService.projectPlus({itemId:record.itemId}).then(res=>{
            if (res.data.code > 0) {
                message.error(res.data.msg);
            } else {
                message.error(res.data.msg);
            }
        })
    }
    closeFlowBox(){
        this.setState({
            flowItemFlag: false,
        })
    }
    //状态变更
    // getUpdateState(record){
    //     this.ProjectService.updateState(record.itemId).then(res =>{
    //         let result = res.data
    //         console.log(result)
    //     })
    // }
    render() {
        const columns = [
            {
                title:"项目名称",
                dataIndex:"itemName"
            },{
                title:"项目类别",
                dataIndex:"typeName"
            },{
                title:"项目描述",
                dataIndex:"itemDescription",
            },{
                title:"创建者",
                dataIndex:"itemCreator",
            },{
                title:"项目状态",
                dataIndex:"stateName",
            },{
                title:"创建时间",
                dataIndex:"itemCreateTime"
            },{
                title:"更新时间",
                dataIndex:"itemEditTime"
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        <Button type={"primary"} size={"small"} onClick={this.openObject.bind(this, record)}>进入项目</Button>
                        <Button type={"primary"} size={"small"} onClick={this.objectShow.bind(this, record)}>详情展示</Button>
                        <Button type={"primary"} size={"small"} onClick={this.objectPlus.bind(this, record)}>项目启动</Button>
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
                <PageHeader title="项目查询"/>
                <Form style={{marginBottom:20}}>
                    <Row span={24} gutter={40}>
                        <Col span={8}>
                            <Form.Item label={"项目名称"}>
                                {getFieldDecorator('itemName', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"项目类别"}>
                                {getFieldDecorator('itemTypeId', {})(<Select placeholder={"全部"}>
                                    {this.state.projectClass ?this.state.projectClass.map(item=>{
                                        return <Select.Option value={item.itemTypeId} key={item.itemTypeId}>{item.typeName}</Select.Option>
                                    }):null}
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"项目状态"}>
                                {getFieldDecorator('itemStateId', {})(<Select placeholder={"全部"}>
                                    <Option value="0">建设中</Option>
                                    <Option value="1">未审核</Option>
                                    <Option value="2">发布</Option>
                                    <Option value="3">失效</Option>
                                </Select>)}
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
                <Table size={"small"}
                       rowSelection={rowSelection}
                       rowKey={record => record.itemId}
                       loading={this.state.loading}
                       columns={columns}
                       dataSource={this.state.dataSource}
                       pagination={ false }/>
                <PageComponent
                    url={this.ProjectService.selectUrl}
                    ref={"PageComponent"}
                    dataSource={this.getDataSource.bind(this)}/>
                <Modal title="增加项目"
                    visible={this.state.addItemFlag}
                    onOk={this.handleOk.bind(this, "ADD")}
                    onCancel={()=>{this.setState({ addItemFlag: false});}}
                    okText="保存"
                    cancelText="取消">
                    <AddForm dataClass={this.state.projectClass} flowClass={this.state.flowClass} onRef={this.onRef.bind(this)}/>
                </Modal>
                <Modal title="修改项目"
                    visible={this.state.updateItemFlag}
                    onOk={this.handleOk.bind(this, "UPDATE")}
                    onCancel={()=>{this.setState({ updateItemFlag: false});}}
                    okText="保存"
                    cancelText="取消">
                    <UpdateForm dataClass={this.state.projectClass} dataUpdate={this.state.updateData} onRef={this.onRef.bind(this)}/>
                </Modal>
                <Layer visible={this.state.flowItemFlag} title={"流程信息"} width={"100%"} height={"100%"} onCancel={()=>{this.setState({flowItemFlag:false})}}>
                    <FlowCommon closeAction={this.closeFlowBox.bind(this)} flowData={this.state.flowData} ref={"flowCommon"}/>
                </Layer>
            </div>
        )
    }
}
export default Form.create("ProjectData")(ProList);