import React, {Component} from 'react';
import {Form, Input, PageHeader, Radio, Button, Modal, Icon, Select, message, Row,  InputNumber, DatePicker, AutoComplete, Cascader } from 'antd'
import "../../../../Assets/Styles/common.less";
import Utils from "../../../../Utils/Class/Utils";
import ResourcesAtlasService from "../../../../Service/ResourcesAtlasService";
const { Option } = Select;

class RelationalData extends Component{
    constructor(props) {
        super(props);
        this.ResourcesAtlasService = new ResourcesAtlasService()
        this.state = {

        }
    }
    componentDidMount() {
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {} = this.state;
        return(
            <div>导入关系数据
                <Form.Item label={"导入关系数据"} style={{ marginLeft: '24px' }}>
                    {getFieldDecorator('modelType', {})(<Select placeholder={"请选择关系数据"} style={{ width: '200px' }}>
                        <Option value="统计模型">统计模型</Option>
                        <Option value="深度学习模型">深度学习模型</Option>
                    </Select>)}
                    <h3>关系数据格式示例</h3>
                    <div></div>
                </Form.Item>
            </div>
        )
    }
}
export default Form.create()(RelationalData)