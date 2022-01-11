import SearchBar from "../SearchBar/SearchBar";

//define client id variable that equates to the client id we generate on spotify
//spotify generated id associated withfor the developer to connect to the spotify api
const clientId= "666dec88b3164319a911177558755be1";
const redirectUri = "http://localhost/3000";
let accessToken;


//work as a fuction expression
const Spotify={
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }

        //give a regex expression to do a apattern match so we can go to the url and access token info
        const accessTokenMatch= window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch= window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch){
            accessToken= accessTokenMatch[1];
            //we do a typecast to number
            const expiresIn= Number(expiresInMatch[1]);
            window.setTimeout(() => (accessToken=""),expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        }else {
            const accessUrl="https://accounts.spotify.com/authorize?client_id=${clientid}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}";
            window.location=accessUrl;
        }
    },
//insert a search criteria function that accepts a term to search on
    search(term){
        const accessTokenMatch=Spotify.getAccessToken();
        return fetch ("https://api.spotify.com/v1/search?type=track&g=${term}",{
            headers:{
                Authorization: 'Bearer ${accessToken}'
            }
        })
        //successful? get a response of the data 
        .then(response =>{
            return response.json();
        })
        //iterate over the jsonResponse and get a list of tracks out of it then do a mapping of the object to the track id, name,e.t.c. 
        .then(jsonResponse =>{
            if(!jsonResponse.tracks){
                return[];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },
    
    savePlaylist(name, trackUris){
        if(!name || trackUris.length){
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers ={Authorization: 'Bearer ${accessToken}'};
        let userId;

        return fetch("https://api.spotify.com/v1/me", {headers: headers})
            .then(response => response.json())
            .then(jsonResponse => {
                userId= jsonResponse.id;
                return fetch("https://api.spotify.com/v1/users/{userId}/playlists",{
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({name:name})
                })
                .then(response => response.json())
                .then(jsonResponse => {
                    const playlistId= jsonResponse.id;
                    return fetch(
                        "https://api/spotify.com.v1/users/{userId}/playlists/{playlistId}/tracks",
                        {
                            headers: headers,
                            method: "POST",
                            body: JSON.stringify({trackUris: trackUris})
                        }
                    );
                });
            });
    }
};
export default Spotify;