import React, { Component } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import debounce from "lodash/debounce";

const { Search } = Input;

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
        };

        this.debouncedSearch = debounce(this.performSearch, 500);
    }

    handleSearch = (query) => {
        this.setState({ searchQuery: query }, () => {
            this.debouncedSearch(query);
        });
    };

    performSearch = (query) => {
        this.props.onSearch(query);
    };

    render() {
        return (
            <Search
                placeholder="Search movies..."
                allowClear
                onSearch={this.handleSearch}
                onChange={(e) => this.handleSearch(e.target.value)}
                value={this.state.searchQuery}
                style={{ marginBottom: 16 }}
                enterButton={<SearchOutlined />}
            />
        );
    }
}

export default SearchComponent;