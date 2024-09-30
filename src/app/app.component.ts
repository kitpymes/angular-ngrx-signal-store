import { Component} from '@angular/core';
import { CountriesComponent } from './countries/countries.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CountriesComponent],
  template: `<app-countries></app-countries>`,
})
export class AppComponent {
}
