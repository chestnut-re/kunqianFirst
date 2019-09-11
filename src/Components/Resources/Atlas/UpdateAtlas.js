import React, {Component} from 'react';
import {Form, Input, Select} from 'antd'

class UpdateAtlas extends Component{
    constructor (props) {
        super(props)
        this.state = {}
    }
    getFormContent() {
        let result = [];
        this.props.form.validateFields((err, values) => {
            if (!err) {
                result[0] = values;
            }
        })
        result[1] = this.props.dataUpdate.itemId;
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
                    {getFieldDecorator("itemName",{initialValue: this.props.dataUpdate.itemName},{
                        rules: [
                            { required: true, message: '项目名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入项目名称"}/>)}
                </Form.Item>
               {/* <Form.Item label={"项目类别"}>
                    {getFieldDecorator("itemTypeID",{initialValue: this.props.dataUpdate.typeName}, {
                        rules: [
                            { required: true, message: '项目类别不能为空' },
                        ]
                    })(<Select placeholder={"请选择项目类别"}>
                        {this.props.dataClass.map(item => {
                            return <Select.Option value={item.itemTypeId} key={item.itemTypeId}>{item.typeName}</Select.Option>;
                        })}
                    </Select>)}
                </Form.Item>*/}
                <Form.Item label={"项目描述"}>
                    {getFieldDecorator("itemDescription",{initialValue: this.props.dataUpdate.itemDescription}, {

                    })(<Input.TextArea placeholder={"请输入项目描述"}/>)}
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(UpdateAtlas);