import { render } from "@testing-library/react";
import React from "react";

import "./Playlist.css";

import TrackList from "../TrackList/TrackList";

class Playlist extends React.Component{
        constructor(props) {
            super(props);
        //create a function
            this.handleNameChange = this.handleNameChangebind(this);
        }
        
        //get the updated playlist name
            handleNameChange(event){
                this.props.onNameChange(event.target.value);
            }



        render() {
            return (
                <div className="Playlist">
                    //if name is not provided we pick the provided default
                    <input onChange={this.handleNameChange} defaultValue={"New Playlist"}/>
                    <TrackList track = {this.props.PlaylistTracks}
                        isRemoval="true"
                        onRemove={this.props.onRemove}/>
                    <button className="Playlist-save" onClick={this.props.onSave}>Save to Spotify </button>
                </div>
            );
        }
}
export default Playlist;