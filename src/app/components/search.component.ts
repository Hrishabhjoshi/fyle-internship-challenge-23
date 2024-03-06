// search.component.ts

import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
@Component({
  selector: 'app-search',
  template: `
    <div>
      <h2>Search Component</h2>
      <p>Received search term: {{ searchTerm }}</p>
    </div>
  `,
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.searchTerm$.subscribe((term) => {
      this.searchTerm = term;
    });
  }
}
