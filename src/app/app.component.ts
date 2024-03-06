import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from './services/api.service'; // Adjust the path based on your project structure
import { SearchComponent } from './components/search.component';
import { SearchService } from './services/search.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { PaginationComponent } from './components/pagination.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userData: any;
  repos: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string = '';

  constructor(private apiService: ApiService, private searchService: SearchService) {}

   search() {
     console.log('Searching for:', this.searchTerm);
     this.searchService.setSearchTerm(this.searchTerm);
   }
   onPageChange(page: number) {
    this.currentPage = page;
    this.loadRepositories();
  }

  loadRepositories() {
    this.searchService.searchTerm$.pipe(
      debounceTime(300),
      switchMap((username) =>
        this.apiService.getRepos(username, this.currentPage, this.itemsPerPage)
      )
    ).subscribe(
      (repos) => {
        this.repos = repos;
        console.log('Repos:', this.repos);
      },
      (error) => {
        console.error('Error fetching repositories:', error);
      }
    );
  }
  ngOnInit() {
    // this.searchService.searchTerm$.subscribe((username) => {
    //   this.apiService.getUser(username).subscribe(
    //     (user) => {
    //       this.userData = user;
    //     },
    //     (error) => {
    //       console.error('Error fetching user information:', error);
    //     }
    //   );

    //   this.apiService.getRepos(username).subscribe(
    //     (repos) => {
    //       this.repos = repos;
    //       console.log('Repos:', this.repos);
    //     },
    //     (error) => {
    //       console.error('Error fetching repositories:', error)
    //     }
    //   );
    this.searchService.searchTerm$.subscribe((username) => {
      this.apiService.getUser(username).subscribe(
        (user) => {
          this.userData = user;
        },
        (error) => {
          console.error('Error fetching user information:', error);
        }
      );

      this.loadRepositories();
    });
  }
}