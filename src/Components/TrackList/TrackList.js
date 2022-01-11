import { render } from "@testing-library/react";
import React from "react";

import "./TrackList.css";

class TrackList extends React.Component{
        render() {
            return (
                <div className="TrackList">
                {this.props.tracks.map(track => {
                    return (
                        //returns the Track component
                        <track
                        track={track}
                        key={track.id}
                        onAdd={this.props.onAdd}
                        isRemoval={this.props.isRemoval}
                        onRemove={this.props.onRemove}
                        />
                    );
                })}
                </div>
            );
        }
}
export default TrackList;