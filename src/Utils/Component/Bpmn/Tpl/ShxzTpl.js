import React, {Component} from 'react';
import {Form, Select, message, Card, Input, Radio} from 'antd';
import HomeService from "../../../../Service/HomeService";
import "../../../../Assets/Styles/common.less";
class ShxzTpl extends Component {
    constructor(props) {
        super(props)
        this.HomeService = new HomeService();
        this.state = {
            optionList: [],
        }
    }
    componentDidMount() {
        this.setOptionData();
    }
    setOptionData () {
        this.HomeService.adminSelectAllPage().then((res)=>{
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
                    <Form.Item label={"审核对象选择"}>
                        {getFieldDecorator("lb",{
                            rules: [{
                                required: true,
                                message: '请选择算法类型',
                            }]
                        })(
                            <Select placeholder={"请选择审核对象"}>
                                {this.state.optionList.map(item=>{
                                    return <Select.Option key={item.id}>{item.username}</Select.Option>
                                })}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label={"消息推送选择"}>
                        {getFieldDecorator("lbflag",{
                            rules: [{
                                required: true,
                                message: '请选择算法类型',
                            }]
                        })(
                            <Radio.Group>
                                <Radio.Button value={1}>开启</Radio.Button>
                                <Radio.Button value={0}>关闭</Radio.Button>
                            </Radio.Group>
                        )}
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default Form.create()(ShxzTpl);