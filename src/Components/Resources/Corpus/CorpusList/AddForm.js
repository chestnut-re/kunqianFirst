import { Form, Input, Upload,Button, Icon, message} from 'antd';
import React, {Component} from "react";

class AddForm extends Component{
    constructor (props) {
        super(props)
        this.state = {
            checkNick: false
        }
    }
    getFormContent() {
        let result = [];
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
    componentDidMount() {
        this.props.onRef("AddForm", this);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form encType={'multipart/form-data'}>
                <Form.Item label={"语料名称"}>
                    {getFieldDecorator("name", {
                        rules: [
                            { required: true, message: '预料名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入语料名称"}/>)}
                </Form.Item>
                <Form.Item labelCol={{span:5}} wrapperCol={{span:15}} label='文件上传'>
                    {/*{getFieldDecorator(form,settings,formName,'name',values)(*/}
                    {/*    <Upload action='路径' beforUpload={this.beforeUploadHandle} onChange={this.fileChange} onRemove={this.fileRemove} fileList={this.state.fileData}>*/}
                    {/*        <Button><Icon type='upload' />上传文件</Button>*/}
                    {/*    </Upload>*/}
                    {/*)}*/}
                </Form.Item>
                <Form.Item label={"应用场景"}>
                    {getFieldDecorator("userCase", {
                        rules: [
                            { required: true, message: '应用场景名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入语料名称"}/>)}
                </Form.Item>
                <Form.Item label={"所属项目id"}>
                    {getFieldDecorator("itemId", {
                        rules: [
                            { required: false, message: '预料名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入语料名称"}/>)}
                </Form.Item>
                <Form.Item label={"语料描述"}>
                    {getFieldDecorator("description", {
                        rules: [
                            { required: false, message: '预料名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入语料名称"}/>)}
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm);