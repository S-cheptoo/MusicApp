import React from "react";

import "./Track.css";

class Track extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
             term:""
        };

        this.addTrack=this.addTrack.bind(this);
        this.removeTrack= this.removeTrack.bind(this);
    }

    addTrack(event){
        this.props.onAdd(this.props.track)
    }

    removeTrack(){
        this.props.onRemove(this.state.track)
    }

    //check for the props and the perform action depending on the button clicked.
    renderAction(){
        if(this.props.isRemoval){
           return(
                   //adding a view action method that is going to add a button 
                <button className="Task-action" //binding to the removetrack//
                onClick={this.removeTrack}> - </button>
           );
        }
        return(
            <div>
                <button className="Track-action" onClick={this.addTrack}> + </button>
            </div>
            );
    }

    render(){
        return(
            <div className="Task">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                    //spotify to stream that we are going to connect to
                    <iframe
                        src={"https://open.spotify.com/embed/track" + this.props.track.id}
                        weight ="300"
                        height= "80"
                        frameboard= "0"
                        allowTransparency="true"
                        allow="encrypted-media"
                        title="preview"
                        />
                </div>
                    {this.renderAction()}
            </div>
        );
    }   
    
}
export default Track;