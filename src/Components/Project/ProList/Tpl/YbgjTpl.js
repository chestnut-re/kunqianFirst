import React, {Component} from 'react';
import {Form, Select, message} from 'antd';
import ResourcesService from "../../../../Service/ResourcesService";
import Preson from './Preson'
import "../../../../Assets/Styles/common.less";
class YbgjTpl extends Component {
    constructor(props) {
        super(props)
        this.ResourcesService = new ResourcesService();
        this.presonRef = React.createRef();
        this.state = {
            dataList:[],
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
        this.ResourcesService.selectSampClassUrl().then((res)=>{
            if (res.data.code > 0) {
                this.setState({
                    optionList:res.data.data
                })
            } else {
                message.error(res.data.msg);
            }
        })
    }
    selectClassList (value) {
        this.ResourcesService.selectSampClassByIdUrl({id:value}).then((res)=>{
            if (res.data.code > 0) {
                this.setState({
                    dataList:res.data.data.list
                })
            } else {
                message.error(res.data.msg)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
                <Form>
                    <Form.Item label={"选择样本分类"}>
                        {getFieldDecorator("lmtx",{
                            rules: [{
                                required: true,
                                message: '请选择样本分类',
                            }]
                        })(
                            <Select placeholder={"请选择样本分类"} onChange={this.selectClassList.bind(this)}>
                                {this.state.optionList.map(item=>{
                                    return <Select.Option key={item.id}>{item.name}</Select.Option>
                                })}
                            </Select>
                        )}
                    </Form.Item>
                    {this.state.dataList.length > 0? <Form.Item label={"选择样本"}>
                        {getFieldDecorator("sourceId",{
                            rules: [{
                                required: true,
                                message: '请选择样本',
                            }]
                        })(
                            <Select placeholder={"请选择样本"}>
                                {this.state.dataList.map(item=>{
                                    return <Select.Option key={item.id}>{item.name}</Select.Option>
                                })}
                            </Select>
                        )}
                    </Form.Item>:""}
                    <Preson wrappedComponentRef={(form)=>this.presonRef=form}/>
                </Form>
        );
    }
}

export default Form.create()(YbgjTpl);