import React, {Component} from 'react';

import { Collapse } from 'antd';
const { Panel } = Collapse;
class list extends Component{
    render() {
        return (
            <Collapse accordion>
                <Panel header="导航1" key="1">
                    <p>{}</p>
                </Panel>
                <Panel header="This is panel header 2" key="2">
                    <p>{}</p>
                </Panel>
                <Panel header="This is panel header 3" key="3" >
                    <p>{}</p>
                </Panel>
            </Collapse>
        )
    }
}
export default list;