const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
// const redirectUri = "http://localhost:3000/";
const redirectUri = "http://jammming-with-react.surge.sh";
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = expiresInMatch[1];

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        }
    },

    search(searchTerm) {
        const accessToken = Spotify.getAccessToken()

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse)
            if (!jsonResponse.tracks) return [];

            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        })
    },

    savePlaylist(playlistName, trackURIs) {
        // console.log(playlistName, trackURIs);

        if (!playlistName || !trackURIs.length) return;

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` }
        let userId;

        return fetch("https://api.spotify.com/v1/me", {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({name: playlistName})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                const uris = trackURIs.map(uri => (`spotify:track:${uri}`))
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    method: "POST",
                    headers: {...headers, 'Content-Type': 'application/json'},
                    body: JSON.stringify({uris: uris})
                });
            });
        });
    },
};

export default Spotify;