import React, {Component} from 'react';
import ProjectService from "../../../Service/ProjectService";
import {Form, Input, PageHeader, Radio, Button, Select, message} from 'antd'
import "../../../Assets/Styles/common.less";

class KnowAdd extends Component{
    constructor (props) {
        super(props)
        this.ProjectService = new ProjectService();
        this.state = {
            modelName: [],
            modelClass: [],

        }
    }
    componentDidMount() {
        this.getModelClassList();
    }
    check = () => {
        this.props.form.validateFields(err => {
            if (!err) {
                console.info('success');
            }
        });
        this.props.history.push('/project/know_definition')
    };
    getId(){
      console.log("1232312")
    };

    getModelClassList(){
        this.ProjectService.modelClassList().then((res) => {
            let result = res.data.data;
            console.log(result)
            if (result.code > 0) {
                this.setState({
                    modelClass: result.data
                })
                console.log(this.state.modelClass)
            } else {
                message.error("模型类型查询失败！")
            }
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
            this.ProjectService.modelInstall(data).then(res=> {

                if (res.data.code > 0) {
                    message.success("增加成功!");
                    this.restForm();
                } else {
                    message.error("增加失败");
                }
            })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={{padding:'10px'}}>
                <PageHeader title="创建模型"/>
                    <Form style={{margin:20}}>
                        <Form.Item label={"模型名称"}>
                            {getFieldDecorator("itemName", {
                                rules: [
                                    { required: true, message: '项目名称不能为空' },
                                ]
                            })(<Input style={{width:'300px'}} placeholder={"请输入项目名称"}/>)}
                        </Form.Item>
                        <Form.Item label={"模型类型"}>
                            {this.state.modelClass ?this.state.modelClass.map((item,index)=>{
                                return <Radio value={index} key={index} onClick={this.getId}>{item.appName}</Radio>
                            }):null}
                        </Form.Item>
                        <Form.Item label={"应用场景"}>
                            {getFieldDecorator("itemDescription", {

                            })(<Input.TextArea style={{width:'300px'}} placeholder={"请输入项目描述"}/>)}
                        </Form.Item>
                    </Form>
                <Form.Item style={{margin:20,textAlign:'center'}}>
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
export default Form.create()(KnowAdd);