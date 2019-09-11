import React,{ Component } from "react"
import AddForm from "./AddAtlas"
import UpdateForm from "./UpdateAtlas"
import ProjectService from "../../../Service/ProjectService";
import ResourcesAtlasService from "../../../Service/ResourcesAtlasService";
import {Redirect} from "react-router-dom"
import PageComponent from '../../../Utils/Component/PageComponent/PageComponent'
import { Form, Row, Col, Input, Button ,Table, PageHeader, Modal,Pagination, Tag, Select, message} from 'antd';
import "../../../Assets/Styles/common.less";
const { Option } = Select;


class ProList extends Component{
    constructor(props) {
        super(props);
        this.ProjectService = new ProjectService();
        this.ResourcesAtlasService = new ResourcesAtlasService()
        this.state = {
            // 弹出框
            addItemFlag: false,
            updateItemFlag: false,
            //table分页
            dataSource:[],
            loading:true,
            selectedRowKeys: [],
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
                message.error("图谱分类查询失败！")
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
            this.ResourcesAtlasService.atlasInstall(data).then(res=> {
                console.log(res)
                if (res.data.code > 0) {
                    message.success("增加成功!");
                    this.AddForm.restForm();
                    this.setState({
                        addItemFlag: false
                    })
                } else {
                    message.error("增加失败");
                }
            })
            if(data.source === "1"){
                this.props.history.push("/resources/put_relationship")
            }

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
        console.log(record)
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
                title:"图谱名称",
                dataIndex:"name"
            },{
                title:"图谱类型",
                dataIndex:"type"
            },{
                title:"状态",
                dataIndex:"itemStateId",
            },{
                title:"创建时间",
                dataIndex:"createTime"
            },{
                title:"创建人",
                dataIndex:"creator",
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        <Button type={"primary"} size={"small"} onClick={this.openObject.bind(this, record)}>进入项目</Button>
                        <Button type={"primary"} size={"small"} onClick={this.objectShow.bind(this, record)}>详情展示</Button>
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
                <PageHeader title="图谱查询"/>
                <Form style={{marginBottom:20}}>
                    <Row span={24} gutter={40}>
                        <Col span={8}>
                            <Form.Item label={"图谱名称"}>
                                {getFieldDecorator('itemName', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"图谱类型"}>
                                {getFieldDecorator('itemTypeId', {})(<Select placeholder={"全部"}>
                                    {this.state.projectClass ?this.state.projectClass.map(item=>{
                                        return <Select.Option value={item.itemTypeId} key={item.itemTypeId}>{item.typeName}</Select.Option>
                                    }):null}
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"状态"}>
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
                <PageHeader title="图谱列表"/>
                <div className="table-operations">
                    <Button onClick={this.deleteItem.bind(this)} type={"primary"} disabled={!hasSelected}>删除</Button>
                    <Button onClick={()=> {this.setState({ addItemFlag: true})}} type={"primary"}>新增</Button>
                </div>
                <Table size={"small"}
                       rowSelection={rowSelection}
                       rowKey={record => record.id}
                       loading={this.state.loading}
                       columns={columns}
                       dataSource={this.state.dataSource}
                       pagination={ false }/>
                <PageComponent
                    url={this.ResourcesAtlasService.atlasListUrl}
                    ref={"PageComponent"}
                    dataSource={this.getDataSource.bind(this)}/>
                <Modal title="增加图谱"
                    visible={this.state.addItemFlag}
                    onOk={this.handleOk.bind(this, "ADD")}
                    onCancel={()=>{this.setState({ addItemFlag: false});}}
                    okText="保存"
                    cancelText="取消">
                    <AddForm dataClass={this.state.projectClass} flowClass={this.state.flowClass} onRef={this.onRef.bind(this)}/>
                </Modal>
                <Modal title="修改图谱"
                    visible={this.state.updateItemFlag}
                    onOk={this.handleOk.bind(this, "UPDATE")}
                    onCancel={()=>{this.setState({ updateItemFlag: false});}}
                    okText="保存"
                    cancelText="取消">
                    <UpdateForm dataClass={this.state.projectClass} dataUpdate={this.state.updateData} onRef={this.onRef.bind(this)}/>
                </Modal>
            </div>
        )
    }
}
export default Form.create("ProjectData")(ProList);