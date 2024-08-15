import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loading$ = new BehaviorSubject<number>(0);
  constructor() {}

  hideLoaderLayer() {
    this.loading$.next(this.loading$.value - 1);
  }

  showLoaderLayer() {
    this.loading$.next(this.loading$.value + 1);
  }
}
