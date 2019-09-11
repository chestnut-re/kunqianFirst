import React, {Component} from 'react';
import { Form, Input, Cascader, Select, } from 'antd';
const { Option } = Select;


class UpdateForm extends Component{
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
        result.id = this.props.dataUpdate.id;
        return result;
    }
    restForm() {
        this.props.form.resetFields();
    }
    componentDidMount() {
        this.props.onRef("UpdateForm", this);
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return(
            <Form>
                <Form.Item label={"词语"}>
                     {getFieldDecorator("word", {
                          initialValue:this.props.dataUpdate.word,
                             rules: [
                                 { required: true, message: '词语不能为空' },
                             ]
                          })(<Input placeholder={"请输入词语"}/>)}
                     </Form.Item>
                     <Form.Item label="词性">
                          {getFieldDecorator('pos', {
                              initialValue:this.props.dataUpdate.pos,
                              rules: [
                                  { required: true, message: '词性不能为空' },
                              ]
                           })(<Input placeholder={"请输入词性"}/>)}
                     </Form.Item>
                     <Form.Item label="创建者">
                          {getFieldDecorator('creator', {
                               initialValue:this.props.dataUpdate.creator,
                               rules: [
                                   { required: true, message: '行业不能为空' },
                               ]
                          })(<Input placeholder={"请输入行业"}/>)}
                     </Form.Item>
                     <Form.Item label="状态">
                          {getFieldDecorator('itemStateId', {
                               initialValue:this.props.dataUpdate.itemStateId,
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
export default Form.create()(UpdateForm);