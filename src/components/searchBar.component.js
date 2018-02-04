import React, {Component} from 'react';
import { Input } from 'antd';
const Search = Input.Search;

export class SearchBar extends Component {

    render() {
        return (
            <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        );
    }
}