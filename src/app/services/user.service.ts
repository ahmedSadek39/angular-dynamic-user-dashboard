import { Injectable } from '@angular/core';
import { User, UserDetailsResponse, UserResponse } from '@models/app.model';
import { Observable, of, from, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CacheService } from './cache.service';
import { LoaderService } from './loader.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  private userId$ = new Subject<number | null>();

  constructor(
    private cacheService: CacheService,
    private loaderSerivce: LoaderService,
    private toastService: ToastService
  ) {}

  getUsers(page: number): Observable<UserResponse> {
    this.loaderSerivce.showLoaderLayer();
    const cacheKey = `users-page-${page}`;
    const cachedData = this.cacheService.get<UserResponse>(cacheKey);

    if (cachedData) {
      this.loaderSerivce.hideLoaderLayer();
      return of(cachedData);
    }

    return from(
      fetch(`${this.apiUrl}?page=${page}`).then((response) => {
        if (!response.ok) {
          this.loaderSerivce.hideLoaderLayer();
          throw new Error(
            `Error fetching user details: ${response.statusText}`
          );
        }
        return response.json();
      })
    ).pipe(
      map((response) => this.handleSuccessResponseForUsers(response, cacheKey)),
      catchError((error) => this.handleErrorForUsers(error))
    );
  }

  getUsersById(userId: number): Observable<UserDetailsResponse> {
    this.loaderSerivce.showLoaderLayer();
    const cacheKey = `users-${userId}`;
    const cachedData = this.cacheService.get<UserDetailsResponse>(cacheKey);

    if (cachedData) {
      this.loaderSerivce.hideLoaderLayer();
      return of(cachedData);
    }

    return from(
      fetch(`${this.apiUrl}/${userId}`).then((response) => {
        if (!response.ok) {
          this.loaderSerivce.hideLoaderLayer();
          throw new Error(
            `Error fetching user details: ${response.statusText}`
          );
        }
        return response.json();
      })
    ).pipe(
      map((response) => this.handleSuccessResponseForUser(response, cacheKey)),
      catchError((error) => this.handleErrorForUser(error))
    );
  }

  get getUserId$() {
    return this.userId$.asObservable();
  }

  setUserId(number: number | null) {
    this.userId$.next(number);
  }

  private handleSuccessResponseForUsers(
    response: any,
    cacheKey: string
  ): UserResponse {
    const userResponse: UserResponse = {
      page: response.page || 0,
      per_page: response.per_page || 0,
      total: response.total || 0,
      total_pages: response.total_pages || 0,
      data: response.data || [],
      support: response.support || { url: '', text: '' },
    };
    this.cacheService.set(cacheKey, userResponse);
    this.loaderSerivce.hideLoaderLayer();
    return userResponse;
  }

  private handleSuccessResponseForUser(
    response: any,
    cacheKey: string
  ): UserDetailsResponse {
    const userDetailsResponse: UserDetailsResponse = {
      data: response.data || {},
      support: response.support || { url: '', text: '' },
    };
    this.cacheService.set(cacheKey, userDetailsResponse);
    this.loaderSerivce.hideLoaderLayer();
    return userDetailsResponse;
  }

  private handleErrorForUser(error: any): Observable<UserDetailsResponse> {
    this.toastService.showError(
      error?.message || 'Error fetching user Details'
    );
    console.error('Error fetching user Details:', error);
    return of({
      data: {} as User,
      support: { url: '', text: '' },
    });
  }

  private handleErrorForUsers(error: any): Observable<UserResponse> {
    this.toastService.showError(error?.message || 'Error fetching users');
    console.error('Error fetching users:', error);
    return of({
      page: 0,
      per_page: 0,
      total: 0,
      total_pages: 0,
      data: [],
      support: { url: '', text: '' },
    });
  }
}
