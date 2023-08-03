import React, { Component } from 'react';
import { Space, Spin } from 'antd';

import CardsItems from '../CardsItems/CardsItems';


export default class App extends Component {

    render() {
        console.log("Yo")
        return (
            <div>
                <h1>Movie List</h1>
                {/* <Search /> */}
                <CardsItems />
                {/* <Space size="middle">
                    <Spin size="small" />
                    <Spin />
                    <Spin size="large" />
                </Space> */}

            </div>
        )
    }
}
