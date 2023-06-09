import axios from 'axios'

const API_URL = 'https://toolstest.nikken.com';

class encryptionService {
    async decrypt(string) {
        let decryptedString = null
        await axios.get(API_URL + `/data_return/${string}`).then(response => {
            decryptedString = response.data;
        }).catch(error => {
            console.log(error);
            return null;
        });
        return decryptedString;
    }
}

export default new encryptionService();