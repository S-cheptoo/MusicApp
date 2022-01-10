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
        this.search= this.search.bind(this);
        this.handleEnter= this.handleEnter.bind(this);
    }

    handleTermChange(event){
        //get the value in the search box changes or the search criteria changes
        this.setState({term: event.target.value});
    }

    search(){
        //update the local property
        this.props.onSearch(this.state.term);
    }
    handleEnter(event){
        if(event.keyCode === 13){
            this.search();
        }
    }

    render(){
        return(
            <div className="SearchBar">
                <input placeholder="Enter song title or artist" onChange={this.handleTermChange} onKeyUp={this.handleEnter}/>
                <button className="SearchButton" onClick={this.search}>
                    SEARCH
                </button>
            </div>
        );
    }
}

export default SearchBar;
