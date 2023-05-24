import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>('');

  setSearchValue(value: string) {
    this.searchSubject.next(value);
  }

  getSearchValue() {
    return this.searchSubject.asObservable();
  }
}
