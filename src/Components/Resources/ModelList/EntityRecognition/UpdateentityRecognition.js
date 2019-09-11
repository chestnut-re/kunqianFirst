import { Form, Input} from 'antd';
import React, {Component} from "react";


class UpdateentityRecognition extends Component{
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
        result.id = this.props.dataUpdate.id;
        return result;
    }
    componentDidMount() {
        this.props.onRef("UpdateentityRecognition", this);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form>
                <Form.Item label={"词语"}>
                    {getFieldDecorator("words", {
                        rules: [
                            { required: true, message: '词语不能为空' },
                        ]
                    })(<Input placeholder={"请输入词语"}/>)}
                </Form.Item>
                <Form.Item label="词性">
                    {getFieldDecorator('character', {
                        rules: [
                            { required: true, message: '词性不能为空' },
                        ]
                    })(<Input placeholder={"请输入词性"}/>)}
                </Form.Item>
                <Form.Item label="行业">
                    {getFieldDecorator('industry', {
                        rules: [
                            { required: true, message: '行业不能为空' },
                        ]
                    })(<Input placeholder={"请输入行业"}/>)}
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(UpdateentityRecognition);