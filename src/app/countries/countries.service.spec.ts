import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { provideMock } from '../core/mock/auto-mock';
import { CountriesService } from './countries.service';

describe('CountriesService', () => {
  let countriesService: CountriesService;

  const MOCK = {
    data: <any>[
      { "id": '1', "name": "Afghanistan", "population": 38928346, "land_area": 652230, "density": 59.6, "capital": "Kabul", "currency": "Afghan afghani", "flag": "https://fakeimg.pl/500x300/ff6600" },
      { "id": '2', "name": "Albania", "population": 2877797, "land_area": 28748, "density": 100.1, "capital": "Tirana", "currency": "Albanian lek", "flag": "https://fakeimg.pl/500x300/ff9900" },
      { "id": '3', "name": "Algeria", "population": 43851043, "land_area": 2381741, "density": 18.4, "capital": "Algiers", "currency": "Algerian dinar", "flag": "https://fakeimg.pl/500x300/ffcc00" },
      { "id": '4', "name": "Andorra", "population": 77265, "land_area": 468, "density": 164.8, "capital": "Andorra la Vella", "currency": "Euro", "flag": "https://fakeimg.pl/500x300/ffff00" },
      { "id": '5', "name": "Angola", "population": 32866272, "land_area": 1246700, "density": 26.4, "capital": "Luanda", "currency": "Angolan kwanza", "flag": "https://fakeimg.pl/500x300/00ff00" }
    ],
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideMock(CountriesService)],
    }).compileComponents().then(() => {
      countriesService = TestBed.inject(CountriesService);
    });
  }));

  it('should getItems', waitForAsync(() => {
    // arrange
    const spy = spyOn(countriesService, 'getItems').and.returnValue(of(MOCK.data))

    // act
    countriesService.getItems().subscribe((result) => {
      // assert
      expect(jasmine.arrayContaining(result)).toEqual(MOCK.data);
      expect(spy).toHaveBeenCalled();
    });
  }));

  it('should add item', waitForAsync(() => {
    // arrange
    const item = {
      id: "19585",
      name: "United Arab Emirates",
      population: 9890402,
      land_area: 83600,
      density: 118,
      capital: "Abu Dhabi",
      currency: "United Arab Emirates dirham",
      flag: "https://fakeimg.pl/500x300/ff9933"
    };

    const spy = spyOn(countriesService, 'addItem').and.returnValue(of(item))

    // act
    countriesService.addItem(item).subscribe((result) => {
      // assert
      expect(spy).toHaveBeenCalled();
      expect(result).toEqual(item);
    });
  }));

  it('should update item', waitForAsync(() => {
    // config
    const item = {
      id: "19585",
      name: "United Arab Emirates",
      population: 9890402,
      land_area: 83600,
      density: 118,
      capital: "Abu Dhabi",
      currency: "United Arab Emirates dirham",
      flag: "https://fakeimg.pl/500x300/ff9933"
    };
    spyOn(countriesService, 'addItem').and.returnValue(of(item))
    countriesService.addItem(item);

    // arrange
    const updateItem = {
      id: "19585",
      name: "Barcelona",
      population: 9890402,
      land_area: 83600,
      density: 118,
      capital: "Abu Dhabi",
      currency: "United Arab Emirates dirham",
      flag: "https://fakeimg.pl/500x300/ff9933"
    };

    const spy = spyOn(countriesService, 'updateItem').and.returnValue(of(updateItem))

    // act
    countriesService.updateItem(updateItem).subscribe((result) => {
      // assert
      expect(spy).toHaveBeenCalled();
      expect(result).toEqual(updateItem);
    });
  }));

  it('should delete item', waitForAsync(() => {
    // config
    const item = {
      id: "19585",
      name: "United Arab Emirates",
      population: 9890402,
      land_area: 83600,
      density: 118,
      capital: "Abu Dhabi",
      currency: "United Arab Emirates dirham",
      flag: "https://fakeimg.pl/500x300/ff9933"
    };
    spyOn(countriesService, 'addItem').and.returnValue(of(item))
    countriesService.addItem(item);


    // arrange
    const spy = spyOn(countriesService, 'deleteItem').and.returnValue(of(true));

    // act
    countriesService.deleteItem(item).subscribe((result) => {
      // assert
      expect(spy).toHaveBeenCalled();
      expect(result).toEqual(true);
    });
  }));

});
