import React, { Component } from 'react';
import Styles from './login.module.less';
import {Link} from 'react-router-dom';
import {Row, Col, Form, Input, Checkbox, Button,message} from 'antd';
import LoginService from '../../Service/LoginService';
import { connect } from 'react-redux';
class Login extends Component{
    constructor(props) {
        super()
        this.LoginService = new LoginService();
    }
    loginAction() {
        this.props.form.validateFields((err,values)=>{
            if (!err) {
                this.LoginService.loginAction(values).then(res=>{
                    if (res.data.code>0) {
                        console.log(res.data.data)
                        sessionStorage.setItem("AdminData", JSON.stringify(res.data.data));
                        sessionStorage.setItem("token", res.data.data.token);
                        this.props.history.push('/')
                    } else {
                        message.error(res.data.msg);
                    }
                })
            }
        })
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return(
            <div className={Styles.login_content}>
                <div className={Styles.login_con}>
                    <Row>
                        <Col span={24}>
                            <Form className={Styles.login_form}>
                                <h1 style={{letterSpacing:10,textAlign:'center',paddingBottom:30}}>智能语义智能系统</h1>
                                <Form.Item label={"用户名"}>
                                    {getFieldDecorator("username", {
                                        rules: [
                                            { required: true, message: '用户名不能为空' },
                                        ]
                                    })(<Input placeholder={"请输入用户名"}/>)}
                                </Form.Item>
                                <Form.Item label={"密码"}>
                                    {getFieldDecorator("password", {
                                        rules: [
                                            { required: true, message: '密码不能为空' },
                                        ]
                                    })(<Input.Password placeholder={"请输入密码"}/>)}
                                </Form.Item>
                                <Checkbox onChange={this.onSaveChange}>记住登录</Checkbox>
                                <Form.Item style={{textAlign:'center',padding:'20px 0'}}>
                                    <Button type={"primary"} style={{marginRight:'40px'}} onClick={this.loginAction.bind(this)}>登录</Button>
                                    <Button>重置</Button>
                                </Form.Item>
                                <p><Link to={""}>忘记密码?</Link></p>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
    componentDidMount() {
        console.log(this.props);
    }
}
const mapStateToProps = (state) => {
    return state;
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(Login))