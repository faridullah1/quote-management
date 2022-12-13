import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import jwt_decode  from 'jwt-decode';
import { User } from '../user/user.types';


@Injectable()
export class AuthService
{
	private baseUrl = environment.apiUrl;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    { }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
	get accessToken(): string
	{
		return localStorage.getItem('accessToken') ?? '';
	}

    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string; type: 'Admin' }): Observable<any>
    {
		const response = {
			// eslint-disable-next-line max-len, @typescript-eslint/naming-convention
			access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOjEsIm5hbWUiOiJGYXJpZCB1bGxoYSIsImVtYWlsIjoiZmFyaWR1bGxhaDk5NkBnbWFpbC5jb20iLCJleHAiOjE3MDM5MzUxNTh9.FmgayvzwhVMabOhLHJCsiK3-ANEYqXf7I14gvESWppc',
			user: { id: 1, name: 'Farid ullah', email: 'faridullah996@gmail.com' }
		};

		// eslint-disable-next-line max-len
		this.accessToken = response.access_token;
		const { email, name, id} = jwt_decode(this.accessToken) as User;

		// Store the user on the user service
		this._userService.user = { id, email, name };

		// Return a new observable with the response
		return of(response);

        // return this._httpClient.post(this.baseUrl + 'auth/adminLogin', credentials).pipe(
        //     switchMap((response: any) => {
        //         // Store the access token in the local storage
        //         this.accessToken = response.access_token;

		// 		const { email, name, id} = jwt_decode(this.accessToken) as User;

        //         // Store the user on the user service
        //         this._userService.user = { id, name, email };

        //         // Return a new observable with the response
        //         return of(response);
        //     })
        // );
    }

	/**
	 * Sign in
	 *
	 * @param credentials
	 */
    register(credentials: { email: string; password: string; company: false }): Observable<any>
    {
		const response = {
			// eslint-disable-next-line max-len, @typescript-eslint/naming-convention
			access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOjEsIm5hbWUiOiJGYXJpZCB1bGxoYSIsImVtYWlsIjoiZmFyaWR1bGxhaDk5NkBnbWFpbC5jb20iLCJleHAiOjE3MDM5MzUxNTh9.FmgayvzwhVMabOhLHJCsiK3-ANEYqXf7I14gvESWppc',
			user: { id: 1, name: 'Farid ullah', email: 'faridullah996@gmail.com' }
		};

		// eslint-disable-next-line max-len
		this.accessToken = response.access_token;
		const { email, name, id} = jwt_decode(this.accessToken) as User;

		// Store the user on the user service
		this._userService.user = { id, email, name };

		// Return a new observable with the response
		return of(response);

        // return this._httpClient.post(this.baseUrl + 'auth/adminLogin', credentials).pipe(
        //     switchMap((response: any) => {
        //         // Store the access token in the local storage
        //         this.accessToken = response.access_token;

		// 		const { email, name, id} = jwt_decode(this.accessToken) as User;

        //         // Store the user on the user service
        //         this._userService.user = { id, name, email };

        //         // Return a new observable with the response
        //         return of(response);
        //     })
        // );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Return the observable
        return of(true);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

		const { email, name, id} = jwt_decode(this.accessToken) as User;
		this._userService.user = { name, email, id };

		return of(true);
    }
}
