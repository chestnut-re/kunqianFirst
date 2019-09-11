import React, {Component} from 'react';
import {Form, Input, Radio } from 'antd'

class AddForm extends Component{
    constructor (props) {
        super(props)
        this.state = {}
    }
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
    componentDidMount() {
        this.props.onRef("AddForm", this);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form>
                <Form.Item label={"角色名称"}>
                    {getFieldDecorator("roleName", {
                        rules: [
                            { required: true, message: '角色名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入角色名称"}/>)}
                </Form.Item>
                <Form.Item label={"角色描述"}>
                    {getFieldDecorator("depict", {
                        rules: [
                            { required: true, message: '角色描述不能为空' },
                        ]
                    })(<Input placeholder={"请输入角色"}/>)}
                </Form.Item>
                <Form.Item label={"排列顺序"}>
                    {getFieldDecorator("priority", {
                        rules:[
                            { required:false, pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入正确的数字' }
                        ],
                        getValueFromEvent: (event) => {
                            return event.target.value.replace(/\D/g,'')
                        },
                        initialValue:''
                    })(<Input placeholder={"请输入排列数字"}/>)}
                </Form.Item>
                <Form.Item label={"是否支持"}>
                {getFieldDecorator('isSuper')(
                    <Radio.Group>
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                    </Radio.Group>,
                )}
                </Form.Item>
                <Form.Item label={"系统默认"}>
                    {getFieldDecorator('system_default')(
                        <Radio.Group>
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </Radio.Group>,
                    )}
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm);