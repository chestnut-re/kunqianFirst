import React,{ Component } from 'react';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import {Switch, HashRouter, Route} from 'react-router-dom';
import Index from './Components/Index/Index';
import Login from './Components/Login/Login';
import test from './Components/test';
import Bpmn from './Utils/Component/Bpmn/bpmn';
class App extends Component{
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route path={"/bpmn"} component={Bpmn}/>
                        <Route path={"/login"} component={Login}/>
                        <Route path={"/test"} component={test}/>
                        <Route path={"/"} component={Index}/>
                    </Switch>
                </HashRouter>
            </Provider>
        );
    }
    componentDidMount() {

    }
}

export default App;
