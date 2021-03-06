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

import {AsyncValidatorFn, ValidatorFn} from '@angular/forms';

import {DataType} from '../../enums/DataType';
import {FormOption} from './FormOption';

/**
 * Describe a field used to manage the form
 */
export interface FormField {
  /**
   * The key of the field
   */
  key: string;
  /**
   * The value displayed by the form
   */
  label: string;
  /**
   * The placeholder to display if needed
   */
  placeholder?: string;
  /**
   * The type of the data to insert
   */
  type: DataType;
  /**
   * The value to display
   */
  value: any;
  /**
   * If the type contains a list of values to display insert them in this attribute
   */
  options?: FormOption[];
  /**
   * The mat-icon name that should be used as prefix
   */
  matIconPrefix?: string;
  /**
   * The mat-icon nam that should be used as suffix
   */
  matIconSuffix?: string;
  /**
   * Hint to display to the user
   */
  hint?: string;
  /**
   * True if the field should be disabled
   */
  disabled?: boolean;
  /**
   * True if the field should be readonly
   */
  readOnly?: boolean;
  /**
   * The list of validators for this field
   */
  validators?: ValidatorFn | ValidatorFn[] | null;
  /**
   * Async validators (require an http call)
   */
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null;
}
