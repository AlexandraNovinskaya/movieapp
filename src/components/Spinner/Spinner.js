import React, { Component } from "react";
import { Alert, Spin } from 'antd';


export default class Spinner extends Component {
    render() {
        return (
            <Spin tip="Loading..." size="large">
                <Alert
                    message="Alert message title"
                    description="Further details about the context of this alert."
                    type="info"
                />
            </Spin>
        )
    }
}
