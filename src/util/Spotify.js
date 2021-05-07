let accessToken = null;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken
        } else if (this.regex.every(re => this.searchUrl(re))) {
            accessToken = this.searchUrl(this.regex[0][1]);
            const expiresIn = this.searchUrl(this.regex[1][1]);

            window.setTimeout(() => accessToken = null, expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        }
    },

    regex: [/access_token=([^&]*)/, /expires_in=([^&]*)/],

    searchUrl(re) {
        return window.location.href.match(re)
    }
};

export default Spotify