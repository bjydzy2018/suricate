/*
 * Copyright 2012-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.suricate.monitoring.model.dto.setting;

import io.suricate.monitoring.model.dto.AbstractDto;
import lombok.*;

/**
 * The Allowed setting value DTO used for REST communication
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
@ToString
public class AllowedSettingValueDto extends AbstractDto {

    /**
     * The setting id
     */
    private Long id;

    /**
     * The title to display for the user
     */
    private String title;

    /**
     * The value of the entry (used in the code)
     */
    private String value;

    /**
     * True if this setting is the default setting
     */
    private boolean isDefault;

    /**
     * The related setting
     */
    private SettingDto setting;
}