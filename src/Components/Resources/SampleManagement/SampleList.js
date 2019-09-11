import React,{ Component } from "react"
import AddForm from "./AddForm"
import ResourcesService from '../../../Service/ResourcesService';
import {Form, Row, Col, Input, Button, Table, PageHeader, Modal, Icon, Select, message,} from 'antd';
import "../../../Assets/Styles/common.less";
import PageComponent from "../../../Utils/Component/PageComponent/PageComponent";
import  {uploadAction} from '../../../Utils/Class/UploadUtil';
const { Option } = Select;


class SampleList extends Component{
    constructor(props) {
        super(props);
        this.ResourcesService = new ResourcesService();
        this.state = {
            // 审核弹出框
            visible: false,
            // // 弹出框
            addItemFlag: false,
            // //table分页
            dataSource:[],
            loading:true,
            selectedRowKeys: [],
            itemId:null

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
        switch(name) {
            case "AddForm":
                this.AddForm = ref;
                break;
            default:
                break;
        }

    }
    addHandle() {
        let data = this.AddForm.getFormContent();
        /**this.ResourcesService.sampleInsertListUrl(data).then(res=> {
            console.log(data)
            if (res.data.code > 0) {
                message.success("增加成功!");
                this.AddForm.restForm();
                this.setState({
                    addItemFlag: false
                })
                this.selectAction()
            } else {
                message.error("增加失败");
            }
        })*/
        console.log(data);
        let list = {
            name: data.name,
            description: data.description,
            userCase:data.userCase,
            creator:data.creator,
            itemStateId:data.itemStateId
        }
         uploadAction(data.multipartFile.fileList,"multipartFile",this.ResourcesService.sampleInsertListUrl,list)
    }

    getDataSource(dataSource){
        console.log(dataSource,'123')
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
                title:"名称",
                dataIndex:"name",
            },{
                title:"样本类型",
                dataIndex:"appId"
            },{
                title:"样本状态",
                dataIndex:"itemStateId",
            },{
                title:"样本保存路径",
                dataIndex:"savePath"
            },{
                title:"应用场景",

                dataIndex:"userCase"
            },{
                title:"样本描述",
                dataIndex:"description"
            },{
                title:"创建者",
                dataIndex:"creator"
            },{
                title:"创建者编号",
                dataIndex:"creatorId"
            },{
                title:"创建时间",
                dataIndex:"createDate"
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
                <PageHeader title="样本管理"/>
                <Form style={{marginBottom:20}}>
                    <Row span={24} gutter={40}>
                        <Col span={8}>
                            <Form.Item label={"样本名称"}>
                                {getFieldDecorator('name', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Button type={"primary"} onClick={this.selectAction.bind(this)}>查询</Button>
                            <Button style={{ marginLeft: 30 }} onClick={()=>{this.props.form.resetFields()}}  type={"primary"}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <PageHeader title="样本列表"/>
                <div className="table-operations">
                    <Button onClick={()=> {this.setState({ addItemFlag: true})}} type={"primary"}>新增</Button>
                </div>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <PageComponent
                    url={this.ResourcesService.sampleAll}
                    ref={"PageComponent"}
                    dataSource={this.getDataSource.bind(this)}/>
                <Modal
                    title="增加样本"
                    visible={this.state.addItemFlag}
                    onOk={this.addHandle.bind(this)}
                    onCancel={()=>{this.setState({ addItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <AddForm dataClass={this.state.projectClass} onRef={this.onRef.bind(this)}/>
                </Modal>

            </div>
        )
    }
}
export default Form.create("Sample")(SampleList);