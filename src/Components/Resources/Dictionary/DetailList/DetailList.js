import React,{ Component } from "react"
import ResourcesService from '../../../../Service/ResourcesService';
import {Form, Button, Table, PageHeader, Modal, Icon, Select, message, Row, Col, Input} from 'antd';
import PageComponent from '../../../../Utils/Component/PageComponent/PageComponent';
import "../../../../Assets/Styles/common.less";
import Utils from '../../../../Utils/Class/Utils';
import AddForm from "./AddForm"
import UpdateForm from "./UpdateForm"
const { Option } = Select;


class DetailList extends Component{
    constructor(props) {
        super(props);
        this.ResourcesService = new ResourcesService();
        this.state = {
            // 审核弹出框
            visible: false,
            // // 弹出框
            addItemFlag: false,
            updateItemFlag: false,
            configureRoleFlag: false,
            // //table分页
            dataSource:[],
            loading:true,
            selectedRowKeys: [],
            // // 分类
            // projectClass: [],
            // // 修改回显
            updateData:null,
            itemId:null,
            type:null
        }
    }
    componentDidMount() {
        this.refs.PageComponent.selectAll({type:Utils.getQueryParam(this.props.location,'id')})
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
//审核弹框
    showModal = (record) => {
        this.setState({
            visible: true,
            itemId: record.id,
        });
    };
    handlesOk = e => {
        this.ResourcesService.DictionaryByIdUrl({id:this.state.itemId,itemStateId: 1}).then(res=>{
            if (res.data.code>0) {
                message.success("审核成功！");
                this.setState({
                    visible: false,
                });
            } else {
                message.error("审核失败");
            }
        })
    };
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };




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
            let dataId = Utils.getQueryParam(this.props.location,'id')
            this.ResourcesService.addDictionaryUrl({...data,type:dataId}).then(res=> {
                if (res.data.code > 0) {
                    message.success("增加成功!");
                    this.setState({
                        addItemFlag: false
                    })
                    this.selectAction()
                } else {
                    message.error("增加失败");
                }
            })
        } else if(flag === "UPDATE"){
            let data = this.UpdateForm.getFormContent();
            this.ResourcesService.updateDictionaryUrl(data).then(res=> {
                if (res.data.code > 0) {
                    message.success("修改成功!");
                    this.setState({
                        updateItemFlag: false
                    })
                    this.selectAction()
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
        this.ResourcesService.deleteDictionaryUrl({ids:this.state.selectedRowKeys}).then(res=>{
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
                title:"序号",
                dataIndex:"id",
            },{
                title:"词语",
                dataIndex:"word",
            },{
                title:"词性",
                dataIndex:"pos"
            },{
                title:"词性",
                dataIndex:"sameWord"
            },{
                title:"状态",
                dataIndex:"endLine",
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
                        <Button type="primary" size='small' onClick={this.updateAction.bind(this, record)}><Icon type="edit" /></Button>
                        <Button type="primary" size='small' onClick={this.showModal.bind(this,record)} ><Icon type="user" /></Button>
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
                <PageHeader title="词典查询"/>
                <Form style={{marginBottom:20}}>
                    <Row span={24} gutter={40}>
                        <Col span={8}>
                            <Form.Item label={"属性名称"}>
                                {getFieldDecorator('propName', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"属性体系"}>
                                {getFieldDecorator('propertySystem', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Button type={"primary"} onClick={this.selectAction.bind(this)}>查询</Button>
                            <Button style={{ marginLeft: 30 }} onClick={()=>{this.props.form.resetFields()}}  type={"primary"}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <PageHeader title="词典列表"/>
                <div className="table-operations">
                    <Button onClick={this.deleteItem.bind(this)} type={"primary"} disabled={!hasSelected}>删除</Button>
                    <Button onClick={()=> {this.setState({ addItemFlag: true})}} type={"primary"}>新增</Button>
                </div>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <PageComponent
                    url={this.ResourcesService.getDictionaryList}
                    ref={"PageComponent"}
                    dataSource={this.getDataSource.bind(this)}/>
                <Modal
                    title="增加词语"
                    visible={this.state.addItemFlag}
                    onOk={this.handleOk.bind(this, "ADD")}
                    onCancel={()=>{this.setState({ addItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <AddForm dataClass={this.state.projectClass} onRef={this.onRef.bind(this)}/>
                </Modal>
                <Modal
                    title="修改词语"
                    visible={this.state.updateItemFlag}
                    onOk={this.handleOk.bind(this, "UPDATE")}
                    onCancel={()=>{this.setState({ updateItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <UpdateForm dataClass={this.state.projectClass} dataUpdate={this.state.updateData} onRef={this.onRef.bind(this)}/>
                </Modal>
                <Modal
                    title="审核"
                    visible={this.state.visible}
                    onOk={this.handlesOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            不通过
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handlesOk}>
                            通过
                        </Button>,
                    ]}
                >
                    <p>请确认是否通过资源的的审核</p>
                </Modal>
            </div>
        )
    }
}
export default Form.create("rule")(DetailList);