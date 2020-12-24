import axios from "axios";
var params = new URLSearchParams();



export default function () {
    return {
        ProxyGetCityBraainData() {
            params.append('params', "");
            params.append('code', "100023038");
            params.append('systype', "1");
            // params.append('data', JSON.stringify(this.rank));
            return axios.post('http://10.36.198.17:9000/statistics/ProxyGetCityBraainData', params)

        }
    }

}