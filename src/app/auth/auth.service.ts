import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCpB5_T_urrhvVp-xjmMM7mHSR-zEkPK6g',
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(responseData);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpB5_T_urrhvVp-xjmMM7mHSR-zEkPK6g',
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(responseData);
        })
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;
    const lodadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (lodadedUser.token) {
      this.user.next(lodadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(data: AuthResponse) {
    const expired = new Date(new Date().getTime() + +data.expiresIn * 1000);
    const user = new User(data.email, data.localId, data.idToken, expired);

    this.user.next(user);
    this.autoLogout(+data.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  handleError(err: HttpErrorResponse) {
    let errmsg = 'unKnow Error occurred!';
    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errmsg = 'Email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errmsg = 'Email not found';
        break;
      case 'INVALID_PASSWORD':
        errmsg = 'Invalid password';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errmsg = 'Password sign-in is disabled ';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errmsg =
          'We have blocked all requests from this device due to unusual activity. Try again later';
        break;
    }
    return throwError(() => new Error(errmsg));
  }
}
