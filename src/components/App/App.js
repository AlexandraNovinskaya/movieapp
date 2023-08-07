import React, { Component } from 'react';
import { Space, Spin } from 'antd';
import { Pagination, Alert } from 'antd';
import { Tabs } from 'antd';
import SearchTab from '../SearchTab/SearchTab';
import RatedTab from '../RatedTab/RatedTab';
// import TabPane from 'antd/es/tabs/TabPane';

import CardsItems from '../CardsItems/CardsItems';
import { RatingProvider } from '../RatingContext/RatingContext';

const { TabPane } = Tabs;

export default class App extends Component {

    render() {
        console.log("Yo")
        return (
            <div>
                <RatingProvider>
                    <Tabs defaultActiveKey="search" >
                        <TabPane tab="Search" key="search">
                            <SearchTab />
                        </TabPane>
                        <TabPane tab="Rated" key="rated">

                            <RatedTab />

                        </TabPane>

                    </Tabs>
                </RatingProvider>

            </div >
        )
    }
}
