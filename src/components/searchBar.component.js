import React, {Component} from 'react';
import { Input } from 'antd';
const Search = Input.Search;

export class SearchBar extends Component {

    render() {
        let {handleSearch} = this.props

        return (
            <Search
            placeholder="input search text"
            onChange={e => handleSearch(e.target.value)}
            style={{ width: 200 }}
          />
        );
    }
}