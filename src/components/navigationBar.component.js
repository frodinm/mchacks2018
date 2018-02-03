import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class NavigationBar extends Component {
    render(){
        return(
            <div className="navbar">
                <div className="navbar__title">CryptoIsLove</div>
                <Link to = "/news" className="navbar__tabs">News</Link>
                <Link to = "/" className="navbar__tabs">Compare</Link>
            </div>
        )
    }
}    