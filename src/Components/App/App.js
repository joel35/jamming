import React, {useState} from "react";
import './App.css';

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import PlayList from "../PlayList/PlayList";

function App() {
    const [searchResults, setSearchResults] = useState(
        [{
            name: 'sample search name',
            artist: 'sample search artist',
            album: 'sample search album',
            id: 0,
        }]
    );

    const [playlistName, setPlaylistName] = useState('sample playlist');

    const [playlistTracks, setPlaylistTracks] = useState(
        [{
            name: 'sample playlist name',
            artist: 'sample playlist artist',
            album: 'sample playlist album',
            id: 12345,
        }]
    );

    const addTrack = (track) => {
        if (!playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            setPlaylistTracks(prev => [...prev, track]);
        }
    };

    const removeTrack = (track) => {
        setPlaylistTracks(prev => prev.filter(savedTrack => savedTrack.id !== track.id));
    };

    const updatePlaylistName = (name) => {
        setPlaylistName(name);
    };

    const savePlaylist = () => {
        const trackURIs = playlistTracks.map((track) => track.id);
    }

    const search = (searchTerm) => {
        console.log(searchTerm);
    }

    return (
        <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar onSearch={search}/>
                <div className="App-playlist">
                    <SearchResults searchResults={searchResults} onAdd={addTrack}/>
                    <PlayList
                        playlistName={playlistName}
                        playlistTracks={playlistTracks}
                        onRemove={removeTrack}
                        onNameChange={updatePlaylistName}
                        onSave={savePlaylist}
                    />
                </div>
            </div>
        </div>
    );
}

export default App