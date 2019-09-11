import React,{ Component } from "react"
import AddCommon from "./AddentityRecognition"
import UpdateCommon from "./UpdateentityRecognition"
import HomeService from "../../../../Service/HomeService";
import { Form, Row, Col, Input, Button ,Table, PageHeader, Modal, Icon, Select, message} from 'antd';
//import PageComponent from '../../../../Utils/Component/PageComponent/PageComponent'
import "../../../../Assets/Styles/common.less";
const { Option } = Select;

class EntityRecognition extends Component{
    constructor(props) {
        super(props);
        // this.HomeService = new HomeService();
        this.state = {
            // // 弹出框
            // addItemFlag: false,
            // updateItemFlag: false,
            // configureRoleFlag: false,
            // //table分页
            // dataSource:[],
            // loading:true,
            selectedRowKeys: [],
            // // 分类
            // projectClass: [],
            // // 修改回显
            // updateData:null,
            // //配置角色
            // configroles: [],
            // itemConfigRoles:[],
            // checkedValues:[],
            // configRoleId: ''
        }
    }
    // 批量操作
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };
    // 查询
    selectAction() {
        // this.props.form.validateFields((err, values)=>{
        //     if(!err) {
        //         console.log(values)
        //         this.refs.PageComponent.selectAll(values);
        //     }
        // })
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
        // this.HomeService.adminDelete(this.state.selectedRowKeys).then(res=>{
        //     if (res.data.code>0) {
        //         message.success("删除成功！");
        //         this.selectAction()
        //     } else {
        //         message.error("删除失败");
        //     }
        // })
    }
    // getDataSource(dataSource){
    //     if (dataSource) {
    //         this.setState({
    //             dataSource:dataSource,
    //             loading:false,
    //         })
    //     }
    // }
    render() {
        const columns = [
            {
                title:"序号",
                dataIndex:"num"
            },{
                title:"词语",
                dataIndex:"words",
            },{
                title:"词性",
                dataIndex:"character"
            },{
                title:"行业",
                dataIndex:"industry"
            },{
                title:"状态",
                dataIndex:"status",
            },{
                title:"创建者",
                dataIndex:"creator"
            },{
                title:"创建时间",
                dataIndex:"createTime"
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        <Icon type="download" />
                        <Button type="primary" size='small'  >审核</Button>
                        <Button type={"primary"} onClick={this.updateAction.bind(this, record)} size='small'>修改</Button>
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
                <PageHeader title="词典管理-通用词典"/>
                <Form style={{marginBottom:20}}>
                    <Row span={24} gutter={40}>
                        <Col span={8}>
                            <Form.Item label={"词语"}>
                                {getFieldDecorator('words', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"行业"}>
                                {getFieldDecorator('industry', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"状态"}>
                                {getFieldDecorator('status', {})(<Select placeholder={"发布"}>
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
                <PageHeader title="通用词典列表"/>
                <div className="table-operations">
                    <Button onClick={this.deleteItem.bind(this)} type={"primary"} disabled={!hasSelected}>删除</Button>
                    <Button onClick={()=> {this.setState({ addItemFlag: true})}} type={"primary"}>新增</Button>
                </div>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                {/*<PageComponent*/}
                {/*url={""}*/}
                {/*ref={"PageComponent"}*/}
                {/*dataSource={this.getDataSource.bind(this)}/>*/}
                <Modal
                    title="增加用户"
                    visible={this.state.addItemFlag}
                    onOk={this.handleOk.bind(this, "ADD")}
                    onCancel={()=>{this.setState({ addItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <AddCommon dataClass={this.state.projectClass} onRef={this.onRef.bind(this)}/>
                </Modal>
                <Modal
                    title="修改用户"
                    visible={this.state.updateItemFlag}
                    onOk={this.handleOk.bind(this, "UPDATE")}
                    onCancel={()=>{this.setState({ updateItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <UpdateCommon dataClass={this.state.projectClass} dataUpdate={this.state.updateData} onRef={this.onRef.bind(this)}/>
                </Modal>
            </div>
        )
    }0.
}
export default Form.create("Corpus")(EntityRecognition);