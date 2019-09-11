import React, {Component} from 'react';
import {Form, Input, Select} from 'antd'
const { Option } = Select;
class TrainAdd extends Component{
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
        this.props.onRef("TrainAdd", this);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form>
                <Form.Item label={"模型名称"}>
                    {getFieldDecorator("name", {
                        rules: [
                            { required: true, message: '模型名称不能为空' },
                         ]
                    })(<Input placeholder={"请输入模型名称"}/>)}
                </Form.Item>
                <Form.Item label={"模型类型"}>
                    {getFieldDecorator("itemApp", {
                        rules: [
                            { required: true, message: '模型类型不能为空' },
                        ]
                    })(<Select placeholder={"请选择模型类型"}>
                        {this.props.modelTypesClass.map(item => {
                            return <Select.Option value={item.appId+','+item.appName} key={item.appId}>{item.appName}</Select.Option>;
                        })}
                    </Select>)}
                </Form.Item>
                <Form.Item label={"描述"}>
                    {getFieldDecorator("description", {

                    })(<Input.TextArea placeholder={"请输入描述"}/>)}
                </Form.Item>
                <Form.Item label={"选择模型类别"}>
                    {getFieldDecorator('modelType', {})(<Select placeholder={"全部"}>
                        <Option value="规则模型">规则模型</Option>
                        <Option value="统计模型">统计模型</Option>
                        <Option value="深度学习模型">深度学习模型</Option>

                    </Select>)}
                </Form.Item>
                <Form.Item label={"分类体系选择"}>
                    {getFieldDecorator("itemClassId", {
                        rules: [
                            { required: true, message: '分类体系不能为空' },
                        ]
                    })(<Select placeholder={"请选择分类体系"}>
                        {this.props.getClassList.map(item => {
                            return <Select.Option value={item.categoryName} key={item.categoryName}>{item.categoryName}</Select.Option>;
                        })}
                    </Select>)}
                </Form.Item>
                <Form.Item label={"算法选择"}>
                    {getFieldDecorator("itemAlgrithm", {
                        rules: [
                            { required: true, message: '算法不能为空' },
                        ]
                    })(<Select placeholder={"请选择算法"}>
                        {this.props.algrithmClass.map(item => {
                            return <Select.Option value={item.algrithm+','+item.typeId} key={item.typeId}>{item.algrithm}</Select.Option>;
                        })}
                    </Select>)}
                </Form.Item>
                <Form.Item label={"语料选择"}>
                    {getFieldDecorator("itemSayId", {
                        rules: [
                            { required: true, message: '语料不能为空' },
                        ]
                    })(<Select placeholder={"请选择语料"}>
                        {this.props.getDataList.map(item => {
                            return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>;
                        })}
                    </Select>)}
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(TrainAdd);