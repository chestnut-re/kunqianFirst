import React, {Component} from 'react';
import {Form, Select, message, Card} from 'antd';
import ResourcesService from "../../../../Service/ResourcesService";
import "../../../../Assets/Styles/common.less";
class GzjlTpl extends Component {
    constructor(props) {
        super(props)
        this.ResourcesService = new ResourcesService();
        this.state = {
            dataList: [],
            optionList: [],
        }
    }
    componentDidMount() {
        this.setOptionData();
    }
    setOptionData () {
        this.ResourcesService.getRuleListUrl({pageSize:10,pageNum:1}).then((res)=>{
            if (res.data.code > 0) {

            } else {
                message.error(res.data.msg);
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Card style={{marginTop:'10px',background:'#f8f8f8'}} size={"small"} title={this.props.title}>
                <Form>
                    <Form.Item label={"选择规则分类"}>
                        {getFieldDecorator("fc",{
                            rules: [{
                                required: true,
                                message: '请选择算法类型',
                            }]
                        })(<Select></Select>)}
                    </Form.Item>
                    {this.state.optionList.length > 0?<Form.Item label={"选择规则"}>
                            {getFieldDecorator("ics", {
                                rules: [{
                                    required: true,
                                    message: '请选择算法类型',
                                }]
                            })(<Select></Select>)}
                    </Form.Item>:null}
                </Form>
            </Card>
        );
    }
}

export default Form.create()(GzjlTpl);