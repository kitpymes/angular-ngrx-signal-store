import { inject, Type } from '@angular/core';
import { patchState, signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { debounceTime, distinctUntilChanged, interval, mergeMap, pipe, switchMap, tap, timer } from 'rxjs';

import { ServiceBase } from '../base/service.base';
import { EntityBase } from '../base/entity.base';
import { StoreBaseState } from './store.base.state';

export const withStoreMethods = <TEntity extends EntityBase>(
  dataServiceType: Type<ServiceBase<TEntity>>,
) => signalStoreFeature({ state: type<StoreBaseState<TEntity>>() },
  withMethods((store, service = inject(dataServiceType)) => ({

    getItems: rxMethod<void>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isloading: true })),
        switchMap(() => {
          return service.getItems().pipe(
            tapResponse({
              next: (items) => patchState(store, { items }),
              error: console.error,
              finalize: () => patchState(store, { isloading: false }),
            })
          );
        })
      )
    ),

    addItem: rxMethod<TEntity>(
      switchMap((value) => {
        patchState(store, { isloading: true });

        return service.addItem(value).pipe(
          tapResponse({
            next: (addedItem) => {
              patchState(store, {
                items: [...store.items(), addedItem],
              });
            },
            error: console.error,
            finalize: () => patchState(store, { isloading: false }),
          }),
        );
      }),
    ),

    updateItem: rxMethod<TEntity>(
      switchMap((item) => {
        patchState(store, { isloading: true });

        return service.updateItem(item).pipe(
          tapResponse({
            next: (updatedItem) => {
              const allItems = [...store.items()];
              const index = allItems.findIndex((x) => x.id === item.id);
              allItems[index] = updatedItem;
              patchState(store, { items: allItems });
            },
            error: console.error,
            finalize: () => patchState(store, { isloading: false }),
          }),
        );
      }),
    ),

    deleteItem: rxMethod<TEntity>(
      switchMap((item) => {
        patchState(store, { isloading: true });

        return service.deleteItem(item).pipe(
          tapResponse({
            next: () => {
              patchState(store, {
                items: [...store.items().filter((x) => x.id !== item.id)],
              });
            },
            error: console.error,
            finalize: () => patchState(store, { isloading: false }),
          }),
        );
      }),
    ),

  })),
);
