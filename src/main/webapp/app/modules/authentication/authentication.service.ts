/*
 *  /*
 *  * Copyright 2012-2018 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {UserService} from '../security/user/user.service';
import {authenticationApiEndpoint, usersApiEndpoint} from '../../app.constant';
import {TokenService} from '../../shared/auth/token.service';
import {Credentials} from '../../shared/model/api/user/Credentials';
import {AuthenticationResponse} from '../../shared/model/api/authentication/AuthenticationResponse';
import {User} from '../../shared/model/api/user/User';
import {UserRequest} from '../../shared/model/api/user/UserRequest';
import {HttpUserService} from "../../shared/services/api/http-user.service";


/**
 * The authentication service
 */
@Injectable()
export class AuthenticationService {
  /**
   * LoggedIn Subject (Hold if the user is logged in or not)
   * @type {BehaviorSubject<boolean>}
   * @private
   */
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.tokenService.hasToken());

  /**
   * Constructor
   *
   * @param {HttpClient} httpClient The HttpClient service
   * @param {TokenService} tokenService The token service
   * @param {UserService} userService The user service
   * @param {HttpUserService} httpUserService The httpUserService
   */
  constructor(private httpClient: HttpClient,
              private tokenService: TokenService,
              private userService: UserService,
              private httpUserService: HttpUserService) {
  }

  /* ******************************************************************* */
  /*                      Subject Management Part                        */

  /* ******************************************************************* */

  /**
   * Tell if the user is log or not
   *
   * @returns {Observable<boolean>}
   */
  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  /**
   * True if a user is connected false otherwise
   */
  get isLoggedIn(): boolean {
    return this.loggedInSubject.getValue();
  }

  /**
   * Set and send if the user is logged in or not
   * @param {boolean} isLoggedIn
   */
  set isLoggedIn(isLoggedIn: boolean) {
    this.loggedInSubject.next(isLoggedIn);
  }

  /* ******************************************************************* */
  /*                 Authentication HTTP Management                      */

  /* ******************************************************************* */

  /**
   * Authenticate the user throw OAuth2 Password grant
   *
   * @param {Credentials} credentials The user credentials
   * @returns {Observable<AuthenticationResponse>} The response as Observable
   */
  authenticate(credentials: Credentials): Observable<AuthenticationResponse> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Authorization', `Basic ${btoa('suricateAngular:suricateAngularSecret')}`);

    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', credentials.username);
    params.append('password', credentials.password);

    const url = `${authenticationApiEndpoint}`;

    return this.httpClient
      .post<AuthenticationResponse>(url, params.toString(), {headers: headers})
      .pipe(
        map(authenticationResponse => {
          if (authenticationResponse && authenticationResponse.access_token) {
            this.tokenService.token = authenticationResponse.access_token;
            this.httpUserService.getConnectedUser().subscribe(connectedUser => {
              this.userService.connectedUser = connectedUser;
            });
            this.isLoggedIn = this.tokenService.hasToken();

            return authenticationResponse;
          }
        })
      );
  }

  /**
   * Register a new user
   *
   * @param userRequest The user Request
   * @returns {Observable<User>} The user registered
   */
  register(userRequest: UserRequest): Observable<User> {
    const url = `${usersApiEndpoint}/register`;

    return this.httpClient.post<User>(url, userRequest);
  }

  /**
   * Logout the user
   */
  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.userService.connectedUser = null;
  }
}
