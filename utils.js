import { fetchData } from "./request";
import { storeData } from "./storage";

class DataService {
  getData(id) {
    fetchData(id).then(res => {
      storeData(this.parseData(res.data) );
    });
  }
  
  parseData(data) {
    return data.toUpperCase();
  }
}

export const DataServiceInstance = new DataService();
