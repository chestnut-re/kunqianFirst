import React,{ Component } from "react"
import AddBig from "./AddBig"
import UpdateBig from "./UpdateBig"
import ProjectService from "../../../Service/ProjectService";
import {Redirect} from "react-router-dom"
import PageComponent from '../../../Utils/Component/PageComponent/PageComponent'
import { Form, Row, Col, Input, Button ,Table, PageHeader, Modal,Pagination, Tag, Select, message} from 'antd';
import "../../../Assets/Styles/common.less";
import Utils from "../../../Utils/Class/Utils";
const { Option } = Select;

class ProClassList extends Component{
    constructor(props) {
        super(props);
        this.ProjectService = new ProjectService();
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
            // 修改回显
            updateData:null,
        }
    }
    componentDidMount() {
        //this.selectClass()
        //this.getClassList()
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
    // // 查询模型类型
    // selectClass() {
    //     this.ProjectService.modelClassBigList().then((res) => {
    //         let result = res.data;
    //         console.log(result)
    //         if (result.code > 0) {
    //             this.setState({
    //                 projectClass: result.data.list
    //             })
    //         } else {
    //             message.error("模型类型查询失败！")
    //         }
    //     })
    // }
    // //查询分类体系
    // getClassList() {
    //     this.ProjectService.classClass().then((res) => {
    //         let result = res.data;
    //         if (result.code > 0) {
    //             this.setState({
    //                 classList: result.data
    //             })
    //         } else {
    //             message.error("无分类体系")
    //         }
    //     })
    // }

    // 新增
    onRef = (name, ref) => {
        switch(name) {
            case "AddBig":
                this.AddBig = ref;
                break;
            case "UpdateBig":
                this.UpdateBig = ref;
                break;
            default:
                break;
        }

    }
    handleOk(flag) {
        if (flag === "ADD"){
            let data = this.AddBig.getFormContent();
            console.log(data)
            this.ProjectService.saveCategory(data).then(res=> {
                console.log(res)
                if (res.data.code > 0) {
                    message.success("增加成功!");
                    this.AddBig.restForm();
                    this.setState({
                        addItemFlag: false
                    })
                    // let Id = Utils.getQueryParam(this.props.location,"id");
                    //this.props.history.push("/project/train_operation?Id="+Id+"&itemSayId="+data.itemSayId);
                } else {
                    message.error("增加失败");
                }
            })
        } else if(flag === "UPDATE"){
            let data = this.UpdateBig.getFormContent();
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
        console.log(this.state.selectedRowKeys)
        this.ProjectService.classDelete(this.state.selectedRowKeys).then(res=>{
            if (res.data.code>0) {
                message.success("删除成功！");
                this.selectAction();
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
    //详情展示
    objectShow(record) {
        let  limit = this.state.selectedRowKeys
        this.props.history.push("/project/class?id="+record.id)
    }

    render() {
        const columns = [
            {
                title:"类目体系名",
                dataIndex:"categoryName"
            },{
                title:"创建时间",
                dataIndex:"createTime"
            },{
                title:"创建者",
                dataIndex:"creator",
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        {/*<Button type={"primary"} size={"small"} onClick={this.openObject.bind(this, record)}>进入项目</Button>*/}
                        <Button type={"primary"} size={"small"} onClick={this.objectShow.bind(this, record)}>查看</Button>
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
                <PageHeader title="类目体系"/>
                <Form style={{marginBottom:20}}>
                    <Row span={24} gutter={40}>
                        <Col span={8}>
                            <Form.Item label={"类目体系名称名称"}>
                                {getFieldDecorator('itemName', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"创建者"}>
                                {getFieldDecorator('itemName2', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"创建时间"}>
                                {getFieldDecorator('itemName3', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Button type={"primary"} onClick={this.selectAction.bind(this)}>查询</Button>
                            <Button style={{ marginLeft: 30 }} onClick={()=>{this.props.form.resetFields()}}  type={"primary"}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <PageHeader title="类目体系列表"/>
                <div className="table-operations" style={{position:'relative',height:'24px'}}>
                    <div style={{position:'absolute',right:'20px'}}>
                        <Button onClick={()=> {this.setState({ addItemFlag: true})}} type={"primary"}>新建创建</Button>
                        <Button onClick={this.deleteItem.bind(this)} type={"primary"} disabled={!hasSelected} style={{marginLeft:'20px'}}>删除</Button>
                    </div>
                </div>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <PageComponent
                    url={this.ProjectService.modelClassBigListUrl}
                    ref={"PageComponent"}
                    dataSource={this.getDataSource.bind(this)}/>
                <Modal title="创建类目体系"
                       visible={this.state.addItemFlag}
                       onOk={this.handleOk.bind(this, "ADD")}
                       onCancel={()=>{this.setState({ addItemFlag: false});}}
                       okText="确定"
                       cancelText="取消">
                    <AddBig  onRef={this.onRef.bind(this)}/>
                </Modal>
                {/*<Modal title="修改模型"*/}
                       {/*visible={this.state.updateItemFlag}*/}
                       {/*onOk={this.handleOk.bind(this, "UPDATE")}*/}
                       {/*onCancel={()=>{this.setState({ updateItemFlag: false});}}*/}
                       {/*okText="保存"*/}
                       {/*cancelText="取消">*/}
                    {/*<UpdateForm dataClass={this.state.projectClass} onRef={this.onRef.bind(this)}/>*/}
                {/*</Modal>*/}
            </div>
        )
    }
}
export default Form.create("ProjectData")(ProClassList);