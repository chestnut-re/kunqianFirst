import React, {Component} from 'react';
import ProjectService from "../../../../Service/ProjectService";
import {Form, Input, PageHeader, Radio, Button, Modal, Icon, Select, message, Row,  InputNumber, DatePicker, AutoComplete, Cascader } from 'antd'
import "../../../../Assets/Styles/common.less";
import "./ManualInput.less";
import Utils from "../../../../Utils/Class/Utils";
import ResourcesAtlasService from "../../../../Service/ResourcesAtlasService";
const InputGroup = Input.Group;
const { Option } = Select;
let id = 0
class PutRelationship extends Component{
    constructor (props) {
        super(props);
        this.ProjectService = new ProjectService();
        this.ResourcesAtlasService = new ResourcesAtlasService()
        this.state = {
        }
    }

    componentDidMount() {

    }

    add = () => {

        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };
    remove = k => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };
    getFormContent() {
        let result = {};
        this.props.form.validateFields((err, values) => {
            if (!err) {
                result.conceptEdge = values.conceptEdge;
                result.strProp = values.strProp.toString()
                //result = values
            }
        })
        return result;
    }
    restForm() {
        this.props.form.resetFields();
    }
    check(){
        let data = this.getFormContent()
        console.log(data)
        this.ResourcesAtlasService.createGraphEdge(data).then((res) =>{
            let result = res.data
            console.log(result)
        })
        //this.props.history.push('/resources/put_entity')
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            // labelCol: {
            //     xs: { span: 24 },
            //     sm: { span: 4 },
            // },
            // wrapperCol: {
            //     xs: { span: 24, offset: 0 },
            //     sm: { span: 20, offset: 4 },
            // },
        };
        const formItemLayoutWithOutLabel = {
            // labelCol: {
            //     xs: { span: 24 },
            //     sm: { span: 4 },
            // },
            // wrapperCol: {
            //     xs: { span: 24, offset: 0 },
            //     sm: { span: 20, offset: 4 },
            // },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                style={{ marginLeft: 20 }}
                label={'属性'+`${index+1}`}
                required={false}
                key={k}
            >
                {getFieldDecorator(`strProp[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "Please input passenger's name or delete this field.",
                        },
                    ],
                })(<Input placeholder="passenger name" style={{ width: '35%', marginRight: 8 }} />)}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));

        return(
            <Form style={{padding: '10px'}}>
                <Form.Item label={"输入关系类别"}>
                    {getFieldDecorator('conceptEdge', {})(<Input placeholder={"请输入"} style={{ width: '35%' }}/>)}
                </Form.Item>
                <Form.Item onSubmit={this.handleSubmit}>
                    <p>输入关系属性</p>
                    {formItems}
                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" onClick={this.add} style={{ width: '25%',marginLeft: '80px' }}>
                            <Icon type="plus" /> 新增关系属性
                        </Button>
                    </Form.Item>
                    {/*<Form.Item {...formItemLayoutWithOutLabel}>*/}
                        {/*<Button type="primary" htmlType="submit">*/}
                            {/*Submit*/}
                        {/*</Button>*/}
                    {/*</Form.Item>*/}
                </Form.Item>
                <Form.Item style={{margin:20,textAlign:'center'}}>
                    <Button type="primary" style={{margin:50}} onClick={this.check.bind(this)}>
                        确认
                    </Button>
                    <Button type="primary">
                        取消
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(PutRelationship);