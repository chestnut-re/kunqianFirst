import React, {Component} from "react";
import { Form, Input, Upload,Button, Icon, message,DatePicker,Select} from 'antd';
import ResourcesService from '../../../Service/ResourcesService';
const { Option } = Select;


class AddForm extends Component{

    constructor (props) {
        super(props)
        this.ResourcesService = new ResourcesService()
        this.state = {
            checkNick: false,
            mode: 'time',
            fileData: null,
            percent:null
        }
    }
    fileChange=(params)=>{
        const {file,fileList}=params;
        if(file.status==='uploading'){
            setTimeout(()=>{
                this.setState({
                    percent:fileList.percent
                })
            },1000)
        }
    }

    getFormContent() {
        let result = [];
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
        this.props.onRef("AddForm", this);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form encType={'multipart/form-data'}>
                <Form.Item label={"样本名称"}>
                    {getFieldDecorator("name", {
                        rules: [
                            { required: true, message: '样本名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入样本名称"}/>)}
                </Form.Item>
                <Form.Item label={"应用场景"}>
                    {getFieldDecorator("userCase", {
                        rules: [
                            { required: true, message: '应用场景名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入语料名称"}/>)}
                </Form.Item>
                <Form.Item labelCol={{span:5}} wrapperCol={{span:15}} label='文件上传'>
                    {getFieldDecorator('multipartFile',{
                         rules: [
                             { required: true, message: '应用场景名称不能为空' },
                         ]
                    })(<Upload>
                         <Button>
                              <Icon type="upload" />上传文件
                          </Button>
                       </Upload>
                    )}
                </Form.Item>
                <Form.Item label={"样本描述"}>
                    {getFieldDecorator("description", {
                        rules: [
                            { required: false, message: '样本不能为空' },
                        ]
                    })(<Input placeholder={"请输入样本"}/>)}
                </Form.Item>
                <Form.Item label={"创建者"}>
                     {getFieldDecorator("creator", {
                          rules: [
                              { required: false, message: '创建者不能为空' },
                          ]
                     })(<Input placeholder={"请输入创建者"}/>)}
                </Form.Item>
                <Form.Item label={"样本状态"}>
                     {getFieldDecorator('itemStateId', {
                           rules: [
                               { required: true, message: '请选择!' }
                                    ],
                     })(<Select placeholder={"审核"}>
                           <Option value="1">未审核</Option>
                           <Option value="2">审核</Option>
                     </Select>,
                     )}
                </Form.Item>

            </Form>
        )
    }
}
export default Form.create()(AddForm);