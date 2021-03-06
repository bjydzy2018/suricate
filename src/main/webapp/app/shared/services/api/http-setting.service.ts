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

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Setting} from '../../model/api/setting/Setting';
import {settingsApiEndpoint} from '../../../app.constant';
import {SettingType} from '../../model/enums/SettingType';

/**
 * Manage the setting http calls
 */
@Injectable()
export class HttpSettingService {

  /**
   * Constructor
   *
   * @param httpClient the http client to inject
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get the list of settings
   *
   * @param type Filter the result by type
   */
  getAll(type?: SettingType): Observable<Setting[]> {
    let url = `${settingsApiEndpoint}`;
    if (type) {
      url = url.concat(`?type=${type.toLowerCase()}`);
    }

    return this.httpClient.get<Setting[]>(url);
  }

  /**
   * Get a setting by id
   *
   * @param settingId The setting id to get
   */
  getOneById(settingId: number): Observable<Setting> {
    const url = `${settingsApiEndpoint}/${settingId}`;

    return this.httpClient.get<Setting>(url);
  }
}
