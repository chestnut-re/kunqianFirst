import React, {Component} from 'react';
import {Form, Select, message, Card} from 'antd';
import ProjectService from "../../../../Service/ProjectService";
import "../../../../Assets/Styles/common.less";
class ClassTpl extends Component {
    constructor(props) {
        super(props)
        this.ProjectService = new ProjectService();
        this.state = {
            optionList: [],
        }
    }
    componentDidMount() {
        this.setOptionData();
    }
    setOptionData () {
        this.ProjectService.modelClassBigList().then((res)=>{
            if (res.data.code > 0) {

            } else {
                message.error(res.data.msg);
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
                <Form>
                    <Form.Item label={"选择类目体系"}>
                        {getFieldDecorator("lmtx",{
                            rules: [{
                                required: true,
                                message: '请选择算法类型',
                            }]
                        })(
                            <Select placeholder={"请选择类目体系名称"}>
                                {this.state.optionList.map(item=>{
                                    return <Select.Option></Select.Option>
                                })}
                            </Select>
                        )}
                    </Form.Item>
                </Form>
        );
    }
}

export default Form.create()(ClassTpl);