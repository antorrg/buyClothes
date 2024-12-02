import GenericService from '../src/Classes/genericServices.js'
import * as store from './helperTest/testStore.js'
import * as help from './helperTest/02-helpdata.js'
import {Category} from '../src/database.js'


const test = new GenericService(Category)

describe('Unit testing of the GenericService class: CRUD operations.', ()=>{
  describe('The "create" function for creating a service', ()=>{
    it('should create an element with the correct parameters', async() => {
      const element = {name:'Hola'};
      const response = await test.create(element)
      const responseJs = help.createParser(response)
      expect(responseJs).toMatchObject(help.dataCreated) 
    });
    it('should throw an error when trying to create the same service twice', async() => {
      const element = {name:'Hola'};
      try {
          await test.create(element)
      } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe(`This category name already exists`);
          expect(error.status).toBe(400);
      }
       });
  });
  describe('Get functions for retrieving services or a single service ', () => {
    it('Function "getAll": should return an array with the services without parseFunction', async() => {
      const response = await test.getAll();
      const finalRes = response.data.map(help.createParserWithType)
        expect(finalRes).toEqual([help.dataCreatedWithType]);
    });
    it('Function "getAll": should return an array with the services with parseFunction', async() => {
      const response = await test.getAll(help.createParserWithType);
      expect(response.data).toEqual([help.dataCreatedWithType]);
    });
    it('Function "getById": should return an object with the service without parseFunction', async() => {
      const id = 1;
      const response = await test.getById(id);
      const finalRes = help.createParserWithType(response)
        expect(finalRes).toEqual(help.dataCreatedWithType);
    });
    it('Function "getById": should return an object with the service with parseFunction', async() => {
      const id = 1;
      const response = await test.getById(id, help.createParserWithType);
      expect(response).toEqual(help.dataCreatedWithType);
    });
  });
  describe('Function "update', () => { 
    it('should update the element if the parameters are corrects', async() => {
      const id = 1;
      const newData = {id, name: "Hola", enable: false}
      const response = await test.update(id, newData)
      const responseJs = help.createParser(response)
      expect(responseJs).toMatchObject(help.dataUpdated) 
    })
  });
  describe('Delete function (logical and phisical delete).', () => {
    it('should should logically delete an element', async() => {
      const id = 1;
      const response = await test.delete(id, null)
      expect(response).toBe('Category deleted successfully')
    });
    it('should should phisically delete an element', async() => {
      const id = 1;
      const isHard = true
      const response = await test.delete(id, isHard)
      expect(response).toBe('Category deleted successfully')
    })
  })
})
