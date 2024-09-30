import { computed } from '@angular/core';
import { signalStoreFeature, type, withComputed } from '@ngrx/signals';

import { EntityBase } from '../base/entity.base';
import { StoreBaseState } from './store.base.state';

export const withStoreComputed = <TEntity extends EntityBase>() =>
  signalStoreFeature({ state: type<StoreBaseState<TEntity>>() },
  withComputed(({ items }) => ({
    count: computed(() => items().length),
  })),
);
