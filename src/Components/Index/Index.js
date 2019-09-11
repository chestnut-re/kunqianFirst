import React, { Component } from 'react';
import styles from './Index.module.less';
import {Link} from 'react-router-dom';
//路由
import {Switch} from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '../../Router/Router';
import { Layout, Menu, Icon ,Avatar, Popover,  LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
const { Header, Sider, Content} = Layout;
const { SubMenu } = Menu;
class Index extends Component{
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
        };
        this.toggle = () => {
            this.setState({
                collapsed: !this.state.collapsed,
            });
        };
        this.onCollapse = collapsed => {
            console.log(collapsed);
            this.setState({ collapsed });
        };
    }
    render() {
        return(
            <Layout>
                <Sider trigger={null} collapsible collapsed={ this.state.collapsed } onCollapse={ this.onCollapse }>
                    <div className={styles.logo}></div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <SubMenu key="User" title={<span>
                            <Icon type="user" />
                            <span>用户列表</span>
                        </span>}>
                            <Menu.Item key="1"><Link to="/role/list">角色列表</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/user/list">用户列表</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/power/list">权限列表</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="Project" title={<span>
                            <Icon type="project" />
                            <span>项目列表</span>
                        </span>}>
                            <Menu.Item key="4"><Link to={"/project/list"}>项目列表</Link></Menu.Item>
                            <Menu.Item key="5"><Link to={"/project/knowledge_list"}>知识分类</Link></Menu.Item>
                            <Menu.Item key="6"><Link to={"/project/train_list"}>模型训练</Link></Menu.Item>
                            <Menu.Item key="7"><Link to={"/project/maps"}>图谱列表</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="navThere" title={<span>
                            <Icon type="apartment" />
                            <span>流程管理</span>
                        </span>}>
                            <SubMenu key="navInput" title={<span>
                                <span>表单管理</span>
                            </span>}>
                                <Menu.Item key="8"><Link to={"/flowpath/form/project"}>业务对象定义</Link></Menu.Item>
                                <Menu.Item key="9"><Link to={"/flowpath/form/entity"}>实体列表</Link></Menu.Item>
                                <Menu.Item key="10"><Link to={"/flowpath/form/forminit"}>表单元数据定义</Link></Menu.Item>
                                <Menu.Item key="11"><Link to={"/flowpath/form/business"}>业务表单</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="navT" title={<span>
                                <span>流程管理</span>
                            </span>}>
                                <Menu.Item key="12"><Link to={"/flowpath/list/new"}>流程定义管理</Link></Menu.Item>
                                <Menu.Item key="13"><Link to={"/flowpath/list/entity"}>流程实例管理</Link></Menu.Item>
                                <Menu.Item key="14"><Link to={"/flowpath/list/manage"}>流程任务管理</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="201" title={<span>
                                <span>分类管理</span>
                            </span>}>
                                <Menu.Item key="15"><Link to={"/flowpath/class/entity"}>实体分类</Link></Menu.Item>
                                <Menu.Item key="16"><Link to={"/flowpath/class/form"}>表单分类</Link></Menu.Item>
                                <Menu.Item key="17"><Link to={"/flowpath/class/flow"}>流程分类</Link></Menu.Item>
                                <Menu.Item key="18"><Link to={"/flowpath/class/obj"}>业务对象分类</Link></Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu key="Task" title={<span>
                            <Icon type="user" />
                            <span>任务中心</span>
                        </span>}>
                            <Menu.Item key="1"><Link to="/taskCenter/taskManagement/list">任务管理</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="navFour" title={<span>
                            <Icon type="folder-open" />
                            <span>资料管理</span>
                        </span>}>
                            <SubMenu key="dictionary" title={<span>
                                <span>词典管理</span>
                            </span>}>
                                <Menu.Item key="121"><Link to={"/resources/dictionary/dictionaryList/list"}>词典管理</Link></Menu.Item>
                                <Menu.Item key="61"><Link to={"/resources/dictionary/detail"}>查看词典</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="corpus" title={<span>
                                 <span>语料管理</span>
                            </span>}>
                                <Menu.Item key="244"><Link to={"/resources/corpus/corpusList/list"}>语料管理</Link></Menu.Item>
                                <Menu.Item key="24"><Link to={"/resources/corpus/checkCorpus/list"}>查看</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sample" title={<span>
                                <span>样本管理</span>
                            </span>}>
                                <Menu.Item key="111"><Link to={"/resources/sample/list"}>样本管理</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="rule" title={<span>
                                <span>规则管理</span>
                            </span>}>
                                <Menu.Item key="292"><Link to={"/resources/rule/ruleList/list"}>规则管理</Link></Menu.Item>
                                <Menu.Item key="29"><Link to={"/resources/rule/checkRule/list"}>分类规则</Link></Menu.Item>
                                <Menu.Item key="79"><Link to={"/resources/rule/selectRule/list"}>抽取规则</Link></Menu.Item>
                            </SubMenu>
                            <Menu.Item key="31"><Link to={"/resources/model"}>模型管理</Link></Menu.Item>
                            <Menu.Item key="61"><Link to={"/project/class_list"}>类目列表</Link></Menu.Item>
                            <Menu.Item key="62"><Link to={"/resources/atlas"}>图谱管理</Link></Menu.Item>
                            <Menu.Item key="36"><Link to={"/resources/template/list"}>模板管理</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="System" title={<span>
                            <Icon type="setting" />
                            <span>系统管理</span>
                        </span>}>
                            <Menu.Item key="33">系统配置</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ padding: 0 ,paddingRight:'30px'}}>
                        <Icon
                            className={styles.trigger}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <Popover content={"111"} title={"用户信息"} placement="bottomLeft">
                            <Avatar size={45} icon="user" style={{float:'right',marginTop:"10px"}}/>
                        </Popover>
                    </Header>
                    <Content>
                        <LocaleProvider locale={zh_CN}>
                                <Switch>
                                    {renderRoutes(routes)}
                                </Switch>
                        </LocaleProvider>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
export default Index;