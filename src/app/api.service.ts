import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
	private baseUrl = environment.apiUrl;

  	constructor(private http: HttpClient) { }

	get(slug: string): Observable<any> {
		return this.http.get(this.baseUrl + slug);
	}

	post(slug: string, payload: any): Observable<any> {
		return this.http.post(this.baseUrl + slug, payload);
	}

	patch(slug: string, payload: any): Observable<any> {
		return this.http.patch(this.baseUrl + slug, payload);
	}

	delete(slug: string): Observable<any> {
		return this.http.delete(this.baseUrl + slug);
	}
}
