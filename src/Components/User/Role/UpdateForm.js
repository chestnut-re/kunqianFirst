import React, {Component} from 'react';
import {Form, Input, Radio} from 'antd'

class UpdateForm extends Component{
    constructor (props) {
        super(props)
        this.state = {}
    }
    getFormContent() {
        let result = [];
        this.props.form.validateFields((err, values) => {
            if (!err) {
                result = values;
            }
        })
        result.roleId = this.props.dataUpdate.roleId;
        return result;
    }
    componentDidMount() {
        this.props.onRef("UpdateForm", this);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form>
                <Form.Item label={"角色名称"}>
                    {getFieldDecorator("roleName", {
                        initialValue:this.props.dataUpdate.roleName,
                        rules: [
                            { required: true, message: '角色名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入角色名称"}/>)}
                </Form.Item>
                <Form.Item label={"角色描述"}>
                    {getFieldDecorator("depict", {
                        initialValue:this.props.dataUpdate.depict,
                        rules: [
                            { required: true, message: '角色描述不能为空' },
                        ]
                    })(<Input placeholder={"请输入角色"}/>)}
                </Form.Item>
                <Form.Item label={"排列顺序"}>
                    {getFieldDecorator("priority", {
                        initialValue:this.props.dataUpdate.priority,
                        rules:[
                            { required:false, pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入正确的数字' }
                        ],
                        getValueFromEvent: (event) => {
                            return event.target.value.replace(/\D/g,'')
                        }
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
export default Form.create()(UpdateForm);