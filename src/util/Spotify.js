let accessToken = null;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken
        } else if (this.regex.every(re => this.searchUrl(re))) {
            accessToken = this.searchUrl(this.regex.accessToken);
            const expiresIn = this.searchUrl(this.regex.expiresIn);

            window.setTimeout(() => accessToken = null, expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        }
    },

    regex: {
        accessToken: '/access_token=([^&]*)/',
        expiresIn: '/expires_in=([^&]*)/',
    },

    searchUrl(re) {
        return window.location.href.match(re)
    }
};

export default Spotify