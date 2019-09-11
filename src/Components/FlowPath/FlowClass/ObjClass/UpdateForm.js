import React, {Component} from 'react';
import {Form, Input} from 'antd'
class UpdateForm extends Component{
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
        result.categoryId= this.props.dataUpdate.categoryId;
        return result;
    }
    componentDidMount() {
        this.props.onRef("UpdateForm", this);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form>
                <Form.Item label={"项目名称"}>
                    {getFieldDecorator("name",{initialValue: this.props.dataUpdate.categoryName},{
                        rules: [
                            { required: true, message: '项目名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入项目名称"}/>)}
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(UpdateForm);