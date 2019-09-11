import React, {Component} from 'react';
import {Form, Select, message, Input} from 'antd';
import Preson from './Preson'
import ResourcesService from "../../../../Service/ResourcesService";
import "../../../../Assets/Styles/common.less";
const { Option } = Select;
class GzjlTpl extends Component {
    constructor(props) {
        super(props)
        this.ResourcesService = new ResourcesService();
        this.presonRef = React.createRef();
        this.state = {
            dataList: [],
            optionList: [],
        }
    }
    componentDidMount() {
        this.setOptionData();
    }
    getContent() {
        let adminId = this.presonRef.getContent();
        if (adminId['assiangee']) {
            let result = {...adminId};
            this.props.form.validateFields((err,value)=>{
                if (!err) {
                    result.sourceId = value.sourceId;
                }
            })
            return result;
        } else {
            return false;
            message.error("请选择审核人");
        }
    }
    setOptionData () {
        this.ResourcesService.getRuleClassUrl().then((res)=>{
            if (res.data.code > 0) {
                this.setState({
                    optionList:res.data.data
                })
            } else {
                message.error(res.data.msg);
            }
        })
    }
    selectRuleClass(value) {
        this.ResourcesService.ruleSelectByIdUrl({id:value}).then(res=>{
            if (res.data.code) {
                this.setState({
                    dataList:res.data.data
                })
            } else {
                message.error(res.data.msg);
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
                <Form>
                    <Form.Item label={"选择规则分类"}>
                        {getFieldDecorator("source_id",{
                            rules: [{
                                required: true,
                                message: '请选择规则分类',
                            }]
                        })(<Select placeholder={"请选择规则分类"} onChange={this.selectRuleClass.bind(this)}>
                            {this.state.optionList.map((item)=>{
                                return <Option key={item.id}>{item.rulesName}</Option>
                            })}
                        </Select>)}
                    </Form.Item>
                    {this.state.dataList.length > 0?<Form.Item label={"选择规则"}>
                            {getFieldDecorator("sourceId", {
                                rules: [{
                                    required: true,
                                    message: '选择规则',
                                }]
                            })(<Select placeholder={"请选择规则"}>
                                {this.state.dataList.map((item)=>{
                                    return <Option key={item.id}>{item.ruleContent}</Option>
                                })}
                            </Select>)}
                    </Form.Item>:null}
                    <Preson wrappedComponentRef={(form)=>this.presonRef=form}/>
                </Form>
        );
    }
}

export default Form.create()(GzjlTpl);