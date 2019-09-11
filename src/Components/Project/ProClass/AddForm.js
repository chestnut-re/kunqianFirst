import React, {Component} from 'react';
import {Form, Input, TreeSelect} from 'antd'

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
                <Form.Item label={"分类名称"}>
                    {getFieldDecorator("newname", {
                        rules: [
                            { required: true, message: '分类名称不能为空' },
                         //    { pattern: /^[\u4e00-\u9fa5]+(\分)+(\类)+(\体)+(\系)$/, message:'要求：以汉字开头，以“分类体系”结尾，不能输入数字和符号'}
                        ]
                    })(<Input placeholder={"请输入分类名称"}/>)}
                </Form.Item>
                <Form.Item label={"分类父级"}>
                    {getFieldDecorator("speciesId", {
                    })(<TreeSelect placeholder={"请选择分类父级，不选为顶级分类！"} treeData={this.props.dataClass} treeDefaultExpandAll/>)}
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm);