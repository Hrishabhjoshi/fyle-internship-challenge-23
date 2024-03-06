// search.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTermSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchTerm$: Observable<string> = this.searchTermSubject.asObservable();
  currentSearchTerm: string='';

  setSearchTerm(searchTerm: string) {
    this.currentSearchTerm=searchTerm;
    this.searchTermSubject.next(searchTerm);
  }
}
