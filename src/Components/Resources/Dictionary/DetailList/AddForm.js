import React, {Component} from 'react';
import { Form, Input, Cascader, Select, } from 'antd';
const { Option } = Select;
class AddForm extends Component{
    constructor (props) {
        super(props)
        this.state = {
            checkNick: false
        }
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
                <Form.Item label={"词语"}>
                     {getFieldDecorator("word", {
                         rules: [
                             { required: true, message: '词语不能为空' },
                         ]
                     })(<Input placeholder={"请输入词语"}/>)}
                </Form.Item>
                <Form.Item label="词性">
                     {getFieldDecorator('pos', {
                          rules: [
                               { required: true, message: '词性不能为空' },
                          ]
                     })(<Input placeholder={"请输入词性"}/>)}
                </Form.Item>
                <Form.Item label="创建者">
                     {getFieldDecorator('creator', {
                          rules: [
                              { required: true, message: '创建者不能为空' },
                          ]
                     })(<Input placeholder={"请输入创建者"}/>)}
                </Form.Item>
                <Form.Item label="状态">
                     {getFieldDecorator('itemStateId', {
                           rules: [
                               { required: false, message: '请选择!' }
                           ],
                     })(
                         <Select placeholder={"激活"}>
                              <Option value="0">1</Option>
                              <Option value="1">0</Option>
                         </Select>,
                      )}
                </Form.Item>

            </Form>
        )
    }
}
export default Form.create()(AddForm);