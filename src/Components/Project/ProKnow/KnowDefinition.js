import React, {Component} from 'react';
import {Form, Input, PageHeader, Radio, Button, Select} from 'antd';
import ProjectService from "../../../Service/ProjectService";
import "../../../Assets/Styles/common.less";
const { Option } = Select;
class KnowDefinition extends Component{
    constructor (props) {
        super(props);
        this.ProjectService = new ProjectService();
        this.state = {
            // 分类
            classList: [],
            //算法
            mathList: [],
            //语料
            sayClass: []
        }
    }
    componentDidMount() {
        this.selectClass();
        this.seeMath()
    }
    // 查询分类
    selectClass() {
        this.ProjectService.classClass().then((res) => {
            let result = res.data;
            if (result.code > 0) {
                this.setState({
                    classList: result.data
                })
            } else {
                message.error("无分类体系")
            }
        })
    }
    //算法
    seeMath(){
        this.ProjectService.modelMath().then((res) => {
            let result = res.data.data;
            // console.log(result)
            if (result.code > 0) {
                this.setState({
                    mathList: result.data
                })
                console.log(this.state.mathList)
            } else {
                message.error("无分类体系")
            }
        })
    }
    check = () => {
        this.props.form.validateFields(err => {
            if (!err) {
                console.info('success');
            }
        });
        this.props.history.push('/project/know_operation')
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={{padding:'10px'}}>
                <PageHeader title="模型定义"/>
                <Form.Item style={{margin:20}}>
                    <Form.Item label={"选择模型类别"}>
                        {getFieldDecorator('typeName', {})(
                            <Radio.Group>
                                <Radio value="c">分类</Radio>
                            </Radio.Group>,
                        )}
                </Form.Item>
                <Form.Item label={"分类体系选择"}>
                        <div >
                            {getFieldDecorator('name', {})(<Select style={{minWidth:'200px',marginRight:20}} placeholder={"请选择分类体系"}>
                                {this.state.classList ?this.state.classList.map((item,index)=>{
                                    return <Select.Option value={index} key={index}>{item.name}</Select.Option>
                                }):null}
                            </Select>)}
                            <Button type="primary" onClick={this.check} style={{height:20,fontSize:14,marginTop:20, marginRight:20}}>上传分类体系</Button>
                            <Button type="primary" onClick={this.check} style={{height:20,fontSize:14,marginRight:10}}>创建分类体系</Button>
                            <small>支持上传txt文本。</small>
                        </div>
                </Form.Item>
                    <Form.Item label={"算法选择"}>
                        <div>{this.state.mathList ?this.state.mathList.map((item,index)=>{
                            return <div value={index} key={index}>{item.algrithm}</div>
                        }):null}</div>
                    </Form.Item>
                    <Form.Item label={"语料选择"}>
                        <div >
                            {getFieldDecorator('name', {})(<Select style={{minWidth:'200px',marginRight:20}} placeholder={"请选择训练语料"}>
                                {this.state.classList ?this.state.classList.map((item,index)=>{
                                    return <Select.Option value={index} key={index}>{item.name}</Select.Option>
                                }):null}
                            </Select>)}
                            <Button type="primary" onClick={this.check} style={{height:20,fontSize:14,marginTop:20, marginRight:20}}>本地语料上传</Button>
                            <Button type="primary" onClick={this.check} style={{height:20,fontSize:14,marginRight:10}}>本地未标注语料上传</Button>
                            <small>支持上传txt文本。</small>
                        </div>
                    </Form.Item>
                    <Button type="primary" onClick={this.check} style={{margin:50}}>
                        确认
                    </Button>
                    <Button type="primary" onClick={this.check}>
                        取消
                    </Button>
                </Form.Item>
            </div>
        )
    }
}
export default Form.create()(KnowDefinition);