import React, {Component} from 'react';
import {Form, Select, message, Card} from 'antd';
import ResourcesService from "../../../../Service/ResourcesService";
import "../../../../Assets/Styles/common.less";
class YbgjTpl extends Component {
    constructor(props) {
        super(props)
        this.ResourcesService = new ResourcesService();
        this.state = {
            optionList: [],
        }
    }
    componentDidMount() {
        this.setOptionData();
    }
    setOptionData () {
        this.ResourcesService.sampleSelectAllUrl().then((res)=>{
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
                    <Form.Item label={"选择样本"}>
                        {getFieldDecorator("lmtx",{
                            rules: [{
                                required: true,
                                message: '请选择样本',
                            }]
                        })(
                            <Select placeholder={"请选择类样本"}>
                                {this.state.optionList.map(item=>{
                                    return <Select.Option></Select.Option>
                                })}
                            </Select>
                        )}
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default Form.create()(YbgjTpl);