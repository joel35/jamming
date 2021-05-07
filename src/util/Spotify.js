const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = "http://localhost:3000/";
let accessToken = '';
const regex = [/access_token=([^&]*)/, /expires_in=([^&]*)/];
const parseUrl = re => window.location.href.match(re)[1];

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;

        if (regex.every(re => parseUrl(re))) {
            accessToken = parseUrl(regex[0]);
            const expiresIn = parseUrl(regex[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        };

        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
    },

    search(searchTerm) {
        fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            jsonResponse.artists && jsonResponse.map(track => ({
                ID: track.id,
                Name: track.name,
                Artist: track.artist[0].name,
                Album: track.album.name,
                URI: track.uri
            }));
        })
    },

    savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs) return;

        const accessToken = accessToken;
        const headers = { Authorization: `Bearer ${accessToken}` }
        const userId = ''
        const playlistID = ''

        fetch("https://api.spotify.com/v1/me", {headers: headers})
        .then(response => response.json())
        .then(jsonResponse => {
                userId = jsonResponse.id;
        });

        fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: "POST",
            headers: headers,
            body: playlistName
        })
        .then(response => response.json())
        .then(jsonResponse => {
            playlistID = jsonResponse.id;
        });

        fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
            method: "POST",
            headers: headers,
            body: trackURIs
        })
        .then(response => response.json())
        .then(jsonResponse => {
            playlistID = jsonResponse.id;
        });

    },
};

export default Spotify