import React, {Component} from 'react';
import {Form, Select, message, Card, Input} from 'antd';
import ResourcesService from "../../../../Service/ResourcesService";
import "../../../../Assets/Styles/common.less";
class MxysTpl extends Component {
    constructor(props) {
        super(props)
        this.ResourcesService = new ResourcesService();
        this.state = {
            optionList: [],
            modelList:[],
            optionAlgaList:[],
        }
    }
    componentDidMount() {
        this.setOptionData();
    }
    setOptionData () {
        this.ResourcesService.modelClassListUrl().then((res)=>{
            if (res.data.code > 0) {
                this.setState({
                    optionList: res.data.data.data,
                })
            } else {
                message.error(res.data.msg);
            }
        })
        this.ResourcesService.modelAlgorithmListUrl().then(res=>{
            if (res.data.code > 0) {
                this.setState({
                    optionAlgaList: res.data.data.data,
                })
            } else {
                message.error(res.data.msg);
            }
        })
    }
    selectModel(value) {
        this.ResourcesService.modelSelectOneUrl({appId:value}).then(res=>{
            if (res.data.code > 0) {
                this.setState({
                    modelList: res.data.data
                })
            } else {
                message.error(res.data.msg)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Card style={{marginTop:'10px',background:'#f8f8f8'}} size={"small"} title={this.props.title}>
                <Form>
                    <Form.Item label={"模型类型选择"}>
                        {getFieldDecorator("mx",{
                            rules: [{
                                required: true,
                                message: '请输选择模型类型',
                            }]
                        })(
                            <Select placeholder={"请选择模型类型名称"} onChange={this.selectModel.bind(this)}>
                                {this.state.optionList.map(item=>{
                                    return <Select.Option key={item.appId}>{item.appName}</Select.Option>
                                })}
                            </Select>
                        )}
                    </Form.Item>
                    {this.state.modelList.length>0?<Form.Item label={"模型选择"}>
                        {getFieldDecorator("lb",{
                            rules: [{
                                required: true,
                                message: '请选择模型',
                            }]
                        })(
                            <Select placeholder={"请选择模型"}>
                                {this.state.modelList.map(item=>{
                                    return <Select.Option key={item.id}>{item.name}</Select.Option>
                                })}
                            </Select>
                        )}
                    </Form.Item>:null}
                    <Form.Item label={"算法类型选择"}>
                        {getFieldDecorator("sf",{
                            rules: [{
                                required: true,
                                message: '请选择算法类型',
                            }]
                        })(
                            <Select placeholder={"请选择算法类型"}>
                                {this.state.optionAlgaList.map(item=>{
                                    return <Select.Option key={item.typeId}>{item.typeName}</Select.Option>
                                })}
                            </Select>
                        )}
                    </Form.Item>

                </Form>
            </Card>
        );
    }
}

export default Form.create()(MxysTpl);