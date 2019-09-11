import React,{ Component } from 'react';
import {Button, Form, Input} from 'antd'
import "../../../../Assets/Styles/common.less";
class FormProp extends Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <Form.Item label={"表单标题"}>
                    {getFieldDecorator("title",{

                    })(<Input/>)}
                </Form.Item>
                <Form.Item label={"表单Key"}>
                    {getFieldDecorator("title",{

                    })(<Input/>)}
                </Form.Item>
                <Form.Item label={"表单说明"}>
                    {getFieldDecorator("title",{

                    })(<Input/>)}
                </Form.Item>
                <Form.Item label={"表单联动"}>
                    <Button type={"primary"}>添加关联</Button>
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(FormProp)