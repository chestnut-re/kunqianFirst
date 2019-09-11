import React,{ Component } from "react"
import AddTemplate from "./AddTemplate";
import UpdateTemplate from "./UpdateTemplate"
import ResourcesService from "../../../Service/ResourcesService";
import { Form, Row, Col, Input,Icon, Button ,Table, PageHeader, Modal,Select,message} from 'antd';
import PageComponent from '../../../Utils/Component/PageComponent/PageComponent'
import "../../../Assets/Styles/common.less";
const { Option } = Select;

class Template extends Component{
    constructor(props) {
        super(props);
         this.ResourcesService = new ResourcesService();
        this.state = {
            // // 弹出框
            addItemFlag: false,
            updateItemFlag: false,
            configureRoleFlag: false,
            // //table分页
            dataSource:[],
            loading:true,
            selectedRowKeys: [],
            // // 修改回显
            updateData:null,

        }
    }
    // 批量操作
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };
    // 查询
    selectAction() {
        this.props.form.validateFields((err, values)=>{
            if(!err) {
                console.log(values)
                this.refs.PageComponent.selectAll(values);
            }
        })
    }

    // 新增
    onRef = (name, ref) => {
        // switch(name) {
        //     case "AddAttribute":
        //         this.AddForm = ref;
        //         break;
        //     case "UpdateAttribute":
        //         this.UpdateForm = ref;
        //         break;
        //     default:
        //         break;
        // }

    }
    handleOk(flag) {
        if (flag === "ADD"){
            // let data = this.AddForm.getFormContent();
            // this.HomeService.adminInstall(data).then(res=> {
            //     if (res.data.code > 0) {
            //         message.success("增加成功!");
            //         this.AddForm.restForm();
            //         this.setState({
            //             addItemFlag: false
            //         })
            //         this.selectAction()
            //     } else {
            //         message.error("增加失败");
            //     }
            // })
        } else if(flag === "UPDATE"){
            // let data = this.UpdateForm.getFormContent();
            // this.HomeService.adminUpdate(data).then(res=> {
            //     if (res.data.code > 0) {
            //         message.success("修改成功!");
            //         this.setState({
            //             updateItemFlag: false
            //         })
            //     } else {
            //         message.error("修改失败");
            //     }
            // })
        }
    }
    //更新
    updateAction(record) {
        // this.setState({
        //     updateItemFlag: true,
        //     updateData:record
        // })
    }
    //删除
    deleteItem() {
        this.ResourcesService.templateDeleteIdUrl(this.state.selectedRowKeys).then(res=>{
            if (res.data.code>0) {
                message.success("删除成功！");
                this.selectAction()
            } else {
                message.error("删除失败");
            }
        })
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
                title:"模板类别",
                dataIndex:"ruleType"
            },{
                title:"模板名称",
                dataIndex:"name",
            },{
                title:"模板描述",
                dataIndex:"description"
            },{
                title:"规则",
                dataIndex:"ruleId"
            },{
                title:"创建时间",
                dataIndex:"createTime"
            },{
                title:"创建者",
                dataIndex:"creator"
            },{
                title:"状态",
                dataIndex:"itemStateId",
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        <Button type="primary" size='small'><Icon type="user" /></Button>
                        <Button type={"primary"} onClick={this.updateAction.bind(this, record)} size='small'><Icon type="edit" /></Button>
                        <Button type={"primary"}  size='small'><Icon type="arrow-down" /></Button>
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
                <PageHeader title="模板管理"/>
                <Form style={{marginBottom:20}}>
                    <Row span={24} gutter={40}>
                        <Col span={8}>
                            <Form.Item label={"模板名称"}>
                                {getFieldDecorator('modelName', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"模板类别"}>
                                {getFieldDecorator('modelType', {})(<Select placeholder={"分类模型"}>
                                    <Option value="1">分类模型</Option>
                                    <Option value="2">实体识别模型</Option>
                                    <Option value="1">属性识别模型</Option>
                                    <Option value="1">预训练模型</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Button type={"primary"} onClick={this.selectAction.bind(this)}>查询</Button>
                            <Button style={{ marginLeft: 30 }} onClick={()=>{this.props.form.resetFields()}}  type={"primary"}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <PageHeader title="模板列表"/>
                <div className="table-operations">
                    <Button onClick={this.deleteItem.bind(this)} type={"primary"} disabled={!hasSelected}>删除</Button>
                </div>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <PageComponent
                url={this.ResourcesService.templateList}
                ref={"PageComponent"}
                dataSource={this.getDataSource.bind(this)}/>
                <Modal
                    title="修改模板"
                    visible={this.state.updateItemFlag}
                    onOk={this.handleOk.bind(this, "UPDATE")}
                    onCancel={()=>{this.setState({ updateItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <UpdateTemplate dataClass={this.state.projectClass} dataUpdate={this.state.updateData} onRef={this.onRef.bind(this)}/>
                </Modal>
            </div>
        )
    }0.
}
export default Form.create("Template")(Template);