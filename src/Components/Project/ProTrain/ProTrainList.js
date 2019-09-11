import React,{ Component } from "react"
import TrainAdd from "./TrainAdd"
import UpdateForm from "./ProTrainAdd"
import ProjectService from "../../../Service/ProjectService";
import {Redirect} from "react-router-dom"
import PageComponent from '../../../Utils/Component/PageComponent/PageComponent'
import { Form, Row, Col, Input, Button ,Table, PageHeader, Modal,Pagination, Tag, Select, message} from 'antd';
import "../../../Assets/Styles/common.less";
import Utils from "../../../Utils/Class/Utils";
const { Option } = Select;

class ProTrainList extends Component{
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
            modelTypesClass: [],
            algrithmClass:[],
            classList:[],
            dataList:[],
            //创建模型返回值
            itemId:null,
            // 修改回显
            updateData:null,
        }
    }
    componentDidMount() {
        this.selectClass();
        this.algrithmClass();
        this.getClassList();
        this.getsDataList()
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
    // 查询模型类型
    selectClass() {
        this.ProjectService.modelClassList().then((res) => {
            let result = res.data.data;
            console.log(result)
            if (res.data.code > 0) {
                this.setState({
                    modelTypesClass: result.data
                })
            } else {
                message.error("模型类型查询失败！")
            }
        })
    }
    //查询分类体系
    getClassList() {
        this.ProjectService.classClass().then((res) => {
            let result = res.data;
            console.log(result)
            if (result.code > 0) {
                this.setState({
                    classList: result.data
                })
            } else {
                message.error("无分类体系")
            }
        })
    }

    //查询算法
    algrithmClass(){
        this.ProjectService.modelMath().then((res) => {
            let result = res.data.data;
            console.log(result)
            if (res.data.code > 0) {
                this.setState({
                    algrithmClass: result.data
                })
                console.log(this.state.algrithmClass)
            } else {
                message.error("模型类型查询失败！")
            }
        })
    }

    //查询语料
    getsDataList() {
        this.ProjectService.modelDataClass().then((res) => {
            let result = res.data;
            console.log(result)
            if (result.code > 0) {
                this.setState({
                    dataList: result.data,
                })
            } else {
                message.error("分类数据查询失败！")
            }
        })
    }

    // 新增
    onRef = (name, ref) => {
        switch(name) {
            case "TrainAdd":
                this.TrainAdd = ref;
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
            let data = this.TrainAdd.getFormContent();
            let idArr = data.itemApp.split(',');
            let idAlg = data.itemAlgrithm.split(',')
            data.appId = idArr[0];
            data.appName = idArr[1];
            data.algorithmName = idAlg[0];
            data.algorithmId = idAlg[1]
            this.ProjectService.modelInstall(data).then(res=> {
                console.log(res)
                if (res.data.code > 0) {
                    message.success("增加成功!");
                    this.TrainAdd.restForm();
                    this.setState({
                        itemId: res.data.data,
                        addItemFlag: false

                    })
                    this.props.history.push("/project/train_operation?id="+this.state.itemId+"&itemSayId="+data.itemSayId);
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
        this.props.history.push("/project/knowledge?id="+record.itemId);
    }
    //详情展示
    objectShow() {
        let  limit = this.state.selectedRowKeys
        this.props.history.push("/project/know_show")
    }

    //查询模型列表
    getUpdateState(){
        this.ProjectService.mod(record.itemId).then(res =>{
            let result = res.data
            console.log(result)
        })
    }
    render() {
        const columns = [
            {
                title:"模型名称",
                dataIndex:"name"
            },{
                title:"模型类型",
                dataIndex:"appName"
            },{
                title:"应用场景",
                dataIndex:"useCase",
            },{
                title:"模型描述",
                dataIndex:"description",
            },{
                title:"创建者",
                dataIndex:"creator",
            },{
                title:"创建时间",
                dataIndex:"createTime"
            },{
                title:"任务状态",
                dataIndex:"itemEditTime"
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        {/*<Button type={"primary"} size={"small"} onClick={this.openObject.bind(this, record)}>进入项目</Button>*/}
                        {/*<Button type={"primary"} size={"small"} onClick={this.objectShow.bind(this, record)}>详情展示</Button>*/}
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
                <PageHeader title="模型查询"/>
                <Form style={{marginBottom:20}}>
                    <Row span={24} gutter={40}>
                        <Col span={8}>
                            <Form.Item label={"模型名称"}>
                                {getFieldDecorator('itemName', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"模型类别"}>
                                {getFieldDecorator('appName', {})(<Select placeholder={"全部"}>
                                    {this.state.projectClass ?this.state.projectClass.map(item=>{
                                        return <Select.Option value={item.appId} key={item.appId}>{item.appName}</Select.Option>
                                    }):null}
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"模型状态"}>
                                {getFieldDecorator('stateName', {})(<Select placeholder={"全部"}>
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
                <PageHeader title="模型列表"/>
                <div className="table-operations">
                    <Button onClick={this.deleteItem.bind(this)} type={"primary"} disabled={!hasSelected}>删除</Button>
                    <Button onClick={()=> {this.setState({ addItemFlag: true})}} type={"primary"}>创建模型</Button>

                </div>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <PageComponent
                    url={this.ProjectService.modelUrl}
                    ref={"PageComponent"}
                    dataSource={this.getDataSource.bind(this)}/>
                <Modal title="创建模型"
                    visible={this.state.addItemFlag}
                    onOk={this.handleOk.bind(this, "ADD")}
                    onCancel={()=>{this.setState({ addItemFlag: false});}}
                    okText="确定"
                    cancelText="取消">
                    <TrainAdd modelTypesClass={this.state.modelTypesClass}
                             algrithmClass={this.state.algrithmClass}
                             getClassList= {this.state.classList}
                             getDataList = {this.state.dataList} onRef={this.onRef.bind(this)}/>
                </Modal>
                <Modal title="修改模型"
                    visible={this.state.updateItemFlag}
                    onOk={this.handleOk.bind(this, "UPDATE")}
                    onCancel={()=>{this.setState({ updateItemFlag: false});}}
                    okText="保存"
                    cancelText="取消">
                    <UpdateForm dataClass={this.state.projectClass} onRef={this.onRef.bind(this)}/>
                </Modal>
            </div>
        )
    }
}
export default Form.create("ProjectData")(ProTrainList);