const accessToken = null;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken
        } else if (window.location.href.match([
            /access_token=([^&]*)/,
            /expires_in=([^&]*)/
        ])) {

        }


    },
};

export default Spotify