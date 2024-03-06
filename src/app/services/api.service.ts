
import { HttpClient ,HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgZone } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private githubToken = 'secrets.GITHUB_TOKEN';
  constructor(private httpClient: HttpClient) { }

  getUser(githubUsername: string): Observable<any> {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`).pipe(
      tap(data => console.log('User Data:', data)),
      catchError(error => {
        console.error('Error:', error);
        return throwError('Something went wrong');
      })
    );
  }

  // getRepos(githubUsername: string): Observable<any[]> {
  //   const headers = {
  //     Authorization: 'secrets.GITHUB_TOKEN'
  //   };

  //   return this.httpClient.get<any[]>(`https://api.github.com/users/${githubUsername}/repos`, { headers }).pipe(
  //     tap(data => console.log('Repos Data:', data)),
  //     catchError(error => {
  //       console.error('Error:', error);
  //       return throwError('Something went wrong');
  //     })
  getRepos(githubUsername: string, page: number, itemsPerPage: number): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.githubToken}`
    });

    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', itemsPerPage.toString());

    return this.httpClient.get<any[]>(`https://api.github.com/users/${githubUsername}/repos`, { headers, params }).pipe(
      tap(data => console.log('Repos Data:', data)),
      catchError(error => {
        console.error('Error:', error);
        return throwError('Something went wrong');
      })
    );
  }
}
