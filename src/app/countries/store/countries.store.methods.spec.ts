import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { signalStore, withState } from '@ngrx/signals';

import { provideMock } from '../../core/mock/auto-mock';
import { withStoreMethods } from '../../core/store/store.base.methods';
import { CountryModel } from '../countries.model';
import { CountriesService } from '../countries.service';

describe('CountriesWithStoreMethods', () => {
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

  const testStore = signalStore(
    withState({
      items: MOCK.data,
      isloading: false,
    }),
    withStoreMethods<CountryModel>(CountriesService),
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [testStore, provideMock(CountriesService)],
    });

    countriesService = TestBed.inject(CountriesService);
  });

  it('should getItems', waitForAsync(() => {
    // arrange
    const store = TestBed.inject(testStore);
    spyOn(countriesService, 'getItems').and.returnValue(of(MOCK.data))

    // act
    store.getItems();

    // assert
    expect(jasmine.arrayContaining(store.items())).toEqual(MOCK.data);
    expect(store.isloading()).toEqual(false);
  }));


  it('should add an item to the store', waitForAsync(() => {
    // arrange
    const store = TestBed.inject(testStore);

    const addItem = {
      id: "19585",
      name: "United Arab Emirates",
      population: 9890402,
      land_area: 83600,
      density: 118,
      capital: "Abu Dhabi",
      currency: "United Arab Emirates dirham",
      flag: "https://fakeimg.pl/500x300/ff9933"
    };

    spyOn(countriesService, 'addItem').and.returnValue(of(addItem));

    // act
    store.addItem(addItem);

    // assert
    expect(store.items().filter((x: any) => x.id === addItem.id)).toEqual([addItem]);
    expect(store.isloading()).toEqual(false);
  }));

  it('should update item', waitForAsync(() => {
    // config
    const store = TestBed.inject(testStore);

    const addItem = {
      id: "678",
      name: "United Arab Emirates",
      population: 9890402,
      land_area: 83600,
      density: 118,
      capital: "Abu Dhabi",
      currency: "United Arab Emirates dirham",
      flag: "https://fakeimg.pl/500x300/ff9933"
    };
    spyOn(countriesService, 'addItem').and.returnValue(of(addItem));
    store.addItem(addItem);

    // arrange
    const updateItem = {
      id: "678",
      name: "Barcelona",
      population: 9890402,
      land_area: 83600,
      density: 118,
      capital: "Abu Dhabi",
      currency: "United Arab Emirates dirham",
      flag: "https://fakeimg.pl/500x300/ff9933"
    };

    spyOn(countriesService, 'updateItem').and.returnValue(of(updateItem));

    // act
    store.updateItem(updateItem);

     // assert
     expect(store.items().filter((x: any) => x.name === updateItem.name)).toEqual([updateItem]);
     expect(store.isloading()).toEqual(false);
  }));

  it('should delete item', waitForAsync(() => {
    // config
    const store = TestBed.inject(testStore);

    const item = {
      id: "678",
      name: "United Arab Emirates",
      population: 9890402,
      land_area: 83600,
      density: 118,
      capital: "Abu Dhabi",
      currency: "United Arab Emirates dirham",
      flag: "https://fakeimg.pl/500x300/ff9933"
    };
    spyOn(countriesService, 'addItem').and.returnValue(of(item));
    store.addItem(item);

    expect(store.items().filter((x: any) => x.id === item.id)).toEqual([item]);

    // arrange
    spyOn(countriesService, 'deleteItem').and.returnValue(of(true));

    // act
    store.deleteItem(item);

     // assert
     expect(store.items().filter((x: any) => x.id === item.id)).toEqual([]);
     expect(store.isloading()).toEqual(false);
  }));


});
