let accessToken = null;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken
        } else if (this.checkUrl(/access_token=([^&]*)/) && this.checkUrl(/expires_in=([^&]*)/)) {

            accessToken = this.checkUrl(/access_token=([^&]*)/);
            const expiresIn = this.checkUrl(/expires_in=([^&]*)/);
            window.setTimeout(() => accessToken = null, expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        }


    },
    checkUrl(regex) {
        return window.location.href.match(regex)
    }
};

export default Spotify