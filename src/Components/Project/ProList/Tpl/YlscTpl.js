import React, {Component} from 'react';
import {Form, Select, message, Card} from 'antd';
import ResourcesService from "../../../../Service/ResourcesService";
import "../../../../Assets/Styles/common.less";
class YlscTpl extends Component {
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
        this.ResourcesService.corpusClassAllUrl().then((res)=>{
            if (res.data.code > 0) {
                this.setState({
                    optionList: res.data.data
                })
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
                    <Form.Item label={"语料类型选择"}>
                        {getFieldDecorator("lmtx",{})(
                            <Select placeholder={"请选择语料类型"}>
                                {this.state.optionList.map(item=>{
                                    return <Select.Option key={item.appId}>{item.appName}</Select.Option>
                                })}
                            </Select>
                        )}
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default Form.create()(YlscTpl);