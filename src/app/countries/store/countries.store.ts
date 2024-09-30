import { computed, inject } from '@angular/core';
import {
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { StoreBaseState, withStoreComputed, withStoreMethods } from '../../core/store';
import { CountryModel } from '../countries.model';
import { CountriesService } from '../countries.service';

export interface CountriesState extends StoreBaseState<CountryModel> {
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: CountriesState = {
  items: [],
  isloading: false,
  filter: { query: '', order: 'asc' },
};

export const CountriesStore = signalStore({ providedIn: 'root' },
  withState(initialState),
  withStoreComputed<CountryModel>(),
  withStoreMethods<CountryModel>(CountriesService),

  // Opcional/custom
  withComputed(({ items, filter }) => ({
    sorted: computed(() => {
      const direction = filter.order() === 'asc' ? 1 : -1;
      return items().toSorted((a: any, b: any) => direction * a.name.localeCompare(b.name));
    }),
  })),

  // Opcional/custom
  withMethods(((store, countriesService = inject(CountriesService)) => ({
  }))),

  // Opcional/custom
  withHooks({
    onInit({ getItems }) {
      getItems();
    },
    onDestroy() {
      console.log('on destroy');
    },
  })
);
