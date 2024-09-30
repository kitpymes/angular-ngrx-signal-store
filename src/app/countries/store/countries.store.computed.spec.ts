import { TestBed, waitForAsync } from '@angular/core/testing';
import { signalStore, withComputed, withState } from '@ngrx/signals';

import { CountryModel } from '../countries.model';
import { withStoreComputed } from '../../core/store';
import { computed } from '@angular/core';

describe('CountrieswithStoreComputed', () => {
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
      filter: { query: '', order: 'asc' },
    }),
    withStoreComputed<CountryModel>(),
    withComputed(({ items, filter }) => ({
      sorted: computed(() => {
        const direction = filter.order() === 'asc' ? 1 : -1;
        return items().toSorted((a: any, b: any) => direction * a.name.localeCompare(b.name));
      }),
    })),
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [testStore],
    });
  });

  it('should return correct number of items', waitForAsync(() => {
    // arrange
    const store = TestBed.inject(testStore);

    // act
    const count = store.count();

    // assert
    expect(count).toEqual(MOCK.data.length);
  }));

  it('should return correct number of items', waitForAsync(() => {
    // arrange
    const store = TestBed.inject(testStore);

    // act
    const result = store.sorted();

    // assert
    expect(store.items()).toEqual(result);
  }));

});
