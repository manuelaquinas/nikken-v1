import axios from 'axios'

const env = import.meta.env;
const API_URL = env.VITE_BACKEND_URL || 'http://localhost:3000';

class StagesService {
    async getStages() {
        var stages = null;
        await axios.get(API_URL + '/stages').then(response => {
            stages = response.data;
        }).catch(error => {
            console.log(error);
            return null;
        });
        return stages;
    }
    async getStageLevels(stageCode) {
        var levels = null;
        await axios.get(API_URL + `/stages/${String(stageCode)}/levels`).then(response => {
            levels = response.data;
        }).catch(error => {
            console.log(error);
            return null;
        });
        return levels;
    }
}

export default new StagesService();
