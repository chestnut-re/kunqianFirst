import React,{ Component } from "react";
import ProjectService from "../../../Service/ProjectService";
import Utils from "../../../Utils/Class/Utils"
import { Form, Radio, Tabs, Row, Col, Input, Button ,Table, PageHeader, Modal,Pagination, Select, InputNumber, message} from 'antd';
import "../../../Assets/Styles/common.less";
const { Option } = Select;
const { TabPane } = Tabs;
class ProKnow extends Component {
    constructor(props) {
        super(props);
        this.ProjectService = new ProjectService();
        this.state = {
            modelGz:[],
            modelTj:[],
            modelSd:[],
            dataClass:[],
            updateItemFlag: false,
            updateData:null,
            moXingName:'模型名称',
            moXingType:'模型类型',
        }
    }
    componentDidMount() {
        this.getModelData();
        this.selectClass();
        this.getModelRule()
    }
    check = () => {
        this.props.form.validateFields(err => {
            if (!err) {
                console.info('success');
            }
        });
        this.props.history.push('/project/know_add')
    };
    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    //更新
    updateAction(record) {
        this.setState({
            updateItemFlag: true,
            updateData:record
        })
    }
    //获取表单内容
    getFormContent() {
        let result;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                result = values;
            }
        })
        return result;
    }
    restForm() {
        this.props.form.resetFields();
    }
    handleOk() {

            let data = this.getFormContent();
            console.log(data.typeId)
            let id = Utils.getQueryParam(this.props.location,"id");
            this.restForm();
            this.props.history.push("/project/know_operation?id="+id+"&typeId="+data.typeId+"&typeId2="+data.typeId2);
    }
    //模型使用规则
    getModelRule() {
        this.ProjectService.modelRules().then((res) =>{
            let result = res.data;
            console.log(result)
        })
    }
    getModelData() {
        this.ProjectService.selectModelClass().then((res)=>{
            let result = res.data.data.data;
            console.log(result)
                let modelGzClone = result.filter((value)=>{
                    return value.modelType === "规则模型";
                })
                let modelSdClone = result.filter((value)=>{
                    return value.modelType === "深度学习模型";
                })
                let modelTjClone = result.filter((value)=>{
                    return value.modelType === "统计模型";
                })

                this.setState({
                    modelTj: modelTjClone,
                    modelGz: modelGzClone,
                    modelSd: modelSdClone,
                })
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    // 查询分类
    selectClass() {
        this.ProjectService.modelDataClass().then((res) => {
            let result = res.data;
            console.log(result)
            if (result.code > 0) {
                this.setState({
                    dataClass: result.data,
                })
            } else {
                message.error("分类数据查询失败！")
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
            marginRight:'20px'
        };
        const { moXingName, moXingType } = this.state
        return (
            <Form style={{padding:'10px'}}>
                <PageHeader title="定义模型使用的规则："/>
                    <Form.Item label="标题:" style={{ marginLeft: '40px' }}>
                        {getFieldDecorator('radio-group')(
                            <Radio.Group>
                                <Radio value="a">采用规则方法</Radio>
                                <Radio value="b">采用学习方法</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>
                <Form.Item label="正文：" style={{ marginLeft: '40px' }}>
                    {getFieldDecorator('radio-group2')(
                        <Radio.Group>
                            <Radio value="a">采用规则方法</Radio>
                            <Radio value="b">采用学习方法</Radio>
                        </Radio.Group>,
                    )}
                </Form.Item>
                <Form.Item label="部分正文：" style={{ marginLeft: '40px' }}>
                    <span className="ant-form-text">选择</span>
                    {getFieldDecorator('input-number1', { initialValue: '' })(<InputNumber min={1} max={10} />)}
                    <span className="ant-form-text"> 字符前的正文</span>
                    <span className="ant-form-text">选择</span>
                    <InputNumber min={1} max={10} />
                    <span className="ant-form-text"> 字符后的正文</span>
                    <span className="ant-form-text">选择</span>
                    <InputNumber min={1} max={10} />
                    <span className="ant-form-text">字符到</span>
                    <InputNumber min={1} max={10} />
                    <span className="ant-form-text"> 字符之间的正文</span>
                </Form.Item>
                <PageHeader title="模型选择："/>
                <div  className={'Model selection'} style={{ width: '500px',height:'400px',margin:'auto',marginBottom:'20px'}}>
                    <Tabs   style={{  paddingTop:'20px'}} defaultActiveKey="1" type="card">
                        <TabPane tab="规则模型" key="1">
                            {getFieldDecorator('typeId', {})(<Radio.Group onChange={this.onChange}>
                                <div style={{fontSize:'20px'}}>
                                    <span style={{marginRight:'40px'}}>{moXingName}</span><span>{moXingType}</span>
                                </div>{this.state.modelGz.map(item=>{
                                return  <Radio style={ radioStyle } value= {item.id} key= {item.id}><span style={{marginRight:'80px'}}>{item.name}</span>{item.modelType}</Radio>
                            })}</Radio.Group>)}
                        </TabPane>
                        <TabPane tab="统计模型" key="2">
                            {getFieldDecorator('typeId', {})(<Radio.Group onChange={this.onChange}>
                                <div style={{fontSize:'20px'}}>
                                    <span style={{marginRight:'40px'}}>{moXingName}</span><span>{moXingType}</span>
                                </div>{this.state.modelTj.map(item=>{
                                return <Radio style={ radioStyle } value= {item.id} key= {item.id}><span style={{marginRight:'80px'}}>{item.name}</span>{item.modelType}</Radio>
                            })}</Radio.Group>)}
                        </TabPane>
                        <TabPane tab="深度学习模型" key="3">
                            {getFieldDecorator('typeId', {})(<Radio.Group onChange={this.onChange}>
                                <div style={{fontSize:'20px'}}>
                                    <span style={{marginRight:'40px'}}>{moXingName}</span><span>{moXingType}</span>
                                </div>{this.state.modelSd.map(item=>{
                                return <Radio style={ radioStyle } value={item.id} key= {item.id}><span style={{marginRight:'80px'}}>{item.name}</span>{item.modelType}</Radio>
                            })}</Radio.Group>)}
                        </TabPane>
                    </Tabs>
                </div>
                <div style={{ textAlign: 'right',margin: '20px' }}>
                    <Button  style={{ marginRight: '20px' }}type="primary" onClick={this.check}>创建模型</Button>
                    {/*<Button type="primary" onClick={() =>{}}>上传模型</Button>*/}
                    <Button type="primary" onClick={() =>{}}>上传分类数据</Button>
                    <span style={{ fontSize:  '12px' }}>支持上传txt文本。</span>
                </div>
                <PageHeader title="导入模型："/>
                <Form.Item label={"选择分类数据"} style={{ marginLeft: '40px' }}>
                    {getFieldDecorator('typeId2', {})(<Select style={{ width: '200px' }} placeholder={"请选择分类数据"}>
                        {this.state.dataClass ?this.state.dataClass.map(item=>{
                            return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                        }):null}
                    </Select>)}
                </Form.Item>
                <div style={{ textAlign: 'center',margin: '50px' }}>
                    <Button  style={{ marginRight: '20px' }}type="primary" onClick={this.handleOk.bind(this)}>确定</Button>
                    <Button type="primary" onClick={() =>{}}>取消</Button>
                </div>
            </Form>
        );
    }
}
export default Form.create("ProjectData")(ProKnow);