import React from "react";

import "./SearchBar.css";

class SearchBar extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
             term:""
        };
        this.handleTermChange=this.handleTermChange.bind(this);
        //function that will do search for us
        this.seach= this.search.bind(this);
        this.handleEnter= this.handleEnter.bind(this);
    }
    
}
