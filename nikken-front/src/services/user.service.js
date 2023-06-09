import axios from 'axios'

const env = import.meta.env;
const API_URL = env.VITE_BACKEND_URL || 'http://localhost:3000'

class UserService {
    async logUser(nikkenId) {
        let success  = null;
        await axios.post(API_URL + `/users/login/${nikkenId}`, {}, { withCredentials: true }).then(response => {
            success = response.data;
        }).catch(error => {
            console.log(error);
            return null;
        });
        return success;
    }
    async getUser(nikkenId) {
        var user = null;
        await axios.get(API_URL + `/users/${nikkenId}`,).then(response => {
            user = response.data[0];
        }).catch(error => {
            return null;
        });
        if (typeof user === 'string' || user instanceof String) {
            return {};
        }
        return user;
    }
    async createUser(nikkenId, name, language) {
        let result = false;
        await axios.post(API_URL + '/users', {
            "nikken_id": nikkenId,
            "name": name,
            "language": language
        }).then(response => {
            result = true;
        }).catch(error => {
            console.log(error);
        });
        return result;
    }
    async updateUser(nikkenId, name, language) {
        await axios.patch(API_URL + `/users/${nikkenId}`, {
            "name": name,
            "language": language
        }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }
    async getUserProgress(nikkenId) {
        var progress = null;
        await axios.get(API_URL + `/users-progress/${nikkenId}`, { withCredentials: true }).then(response => {
            progress = response.data[0];
        }).catch(error => {
            console.log(error);
            return null;
        });
        return progress;
    }
    async updateUserProgress(nikkenId, videoWatched, contentRead) {
        let result = false;
        await axios.patch(API_URL + `/users-progress/${nikkenId}`, {
            "is_video_watched": videoWatched,
            "is_content_read": contentRead
        }, { withCredentials: true }).then(response => {
            result = true;
        }).catch(error => {
            console.log(error);
        });
        return result;
    }
}

export default new UserService();
