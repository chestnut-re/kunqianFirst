import React, {Component} from 'react';
import {Form, Input} from 'antd'

class AddBig extends Component{
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
        this.props.onRef("AddBig", this);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form>
                <Form.Item label={"类目名称"}>
                    {getFieldDecorator("categoryName", {
                        rules: [
                            { required: true, message: '类目名称不能为空' },
                            //{ pattern: /^[\u4e00-\u9fa5]+(\类)+(\目)+(\体)+(\系)$/, message:'要求：以汉字开头，以“分类体系”结尾，不能输入数字和符号'}
                        ]
                    })(<Input placeholder={"请输入类目名称"}/>)}
                </Form.Item>
                <Form.Item label={"创作者"}>
                    {getFieldDecorator("creatorName", {
                        rules: [
                            { required: true, message: '创作者不能为空' },
                        ]
                    })(<Input placeholder={"请输入创作者名字"}/>)}
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(AddBig);