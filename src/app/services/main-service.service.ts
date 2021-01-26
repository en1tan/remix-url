import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  apiUrl = environment.baseApiUrl

  constructor(private http: HttpClient) { }

  getAllSlugs(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/all`).pipe(
      tap((res: any) => {
        console.log("Fetched all slugs");
      }, (err: any) => {
        console.error(err);

      })
    )
  }

  generateSlug(url: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/slug/new`, url).pipe(
      tap((res: any) => {
        console.log("Slug generated successfully");

      }, (err: any) => {
        console.error(err);

      })
    )
  }

  fetchUrl(slug: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${slug}`).pipe(
      tap((res: any) => {
        console.log("Fetched URL");

      }, (err: any) => {
        console.error(err);

      })
    )
  }
}
