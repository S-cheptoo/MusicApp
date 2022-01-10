import React from "react";
import './App.css';

// Importing components
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../util/Spotify";

class App extends React.Component{
  constructor(props) {
    // using super keyword so that all properties are initialized in the constructor
    super(props);
  // Initialize a variable that will manage the state
    this.state = {
       SearchResults: [],
       playlistName: "New Playlist",
       playlistTracks: []
    };
    //declaring all function declarations in the constructor
    //binding 
    //creating a search variable
    this.search=this.search.bind(this);
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.removeTrackSearch=this.removeTrackSearch.bind(this);
    this.doThese=this.doThese.bind(this);
  }
  // providing function definitions
  //define the search function 
  search(term){
    Spotify.search(term).then(SearchResults => {
      //once a value is returned, it is going to call this callback function
      //set the state of search results to whatever is going to be passed by the system
      //search results are returned as a call back and that is what will be stored as an updated state 
        this.setState({SearchResults: SearchResults});
    });
  }

  addTrack(track){
    //declare a temporary variable tracks
      let tracks = this.state.playlistTracks;
      //check if the track is in the playlist by tracking the id  
      if(tracks.find(savedtrack => savedtrack.id === track.id)){
        return;
      }
      //add to the track array and then update the state
      tracks.push(track);
      this.setState({playlistTracks: tracks});
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    let trackSearch = this.state.SearchResults;
    //filter is a Js function that allows you to remove a certain value
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    //unshift get rids of the track in the array
    trackSearch.unshift(track)
    this.setState({playlistTracks: tracks});
  }

  removeTrackSearch(track){
    let tracks = this.state.SearchResults;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({SearchResults: tracks});
  }

  doThese(track){
    this.addTrack(track);
    this.removeTrackSearch(track);
  }

  updatePlaylistName(name){
    this.setState({updatePlaylistName: name});
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map( track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then( () => {
      //if it is successful, callback anonymous function
      this.setState({
        updatePlaylistName: "New Playlist",
        playlistTracks:[]
      });
    });
  }
}


function App() {
  return (
    <div>
      <h1>
        <a href="http://localhost:3000">S.O. Music</a>
      </h1>
        <div className="App">
          //onSearch is a custome event
          <searchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults SearchResults={this.state.SearchResults} onAdd={this.doThese}/>
            <Playlist playlistTracks={this.state.playlistTracks} onChangeName={this.updatePlaylistName} onRemove={this.removeTrack} onSave={this.savePlaylist}/>
          </div>
        </div>
    </div>
  );
}

export default App;
