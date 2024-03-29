import { DataServiceInstance } from "./utils";
import * as requests from './request'
import * as storage from './storage'

describe("DataService", () => {
  test('getData', async()=>{
    const mockRequest = jest.spyOn(requests, 'fetchData').mockImplementation(() => Promise.resolve({data: 'tomtato'}));

    const mockStorage = jest.spyOn(storage, 'storeData').mockImplementation(jest.fn());

    await DataServiceInstance.getData(1);

    expect(mockRequest).toBeCalledWith(1);
    expect(mockStorage).toBeCalledWith('TOMTATO');

  })
})