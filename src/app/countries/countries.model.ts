import { EntityBase } from "../core/base/entity.base";

export interface CountryModel extends EntityBase {
  name: string;
  population: number;
  land_area: number;
  density: number;
  capital: string;
  currency: string;
  flag: string;
};
