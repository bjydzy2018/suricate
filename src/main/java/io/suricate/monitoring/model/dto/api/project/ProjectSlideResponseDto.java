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

package io.suricate.monitoring.model.dto.api.project;

import io.suricate.monitoring.model.dto.api.AbstractDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * Define a slide in a dashboard
 */
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
@ApiModel(value = "ProjectSlideResponse", description = "Describe a slide of a project/dashboard")
public class ProjectSlideResponseDto extends AbstractDto {

    /**
     * The slide id
     */
    @ApiModelProperty(value = "The project slide id", required = true)
    private Long id;
    /**
     * the grid properties for a dashboard
     */
    @ApiModelProperty(value = "The grid properties of the slide")
    private ProjectSlideGridResponseDto gridProperties;
    /**
     * A representation by an image of the dashboard
     */
    @ApiModelProperty(value = "A representation by an image of the slide")
    private String screenshotToken;
    /**
     * The librairies related
     */
    @ApiModelProperty(value = "The list of the related JS libraries used for the execution of the widgets", dataType = "java.util.List")
    private List<String> librariesToken = new ArrayList<>();

    /**
     * The parent project token
     */
    @ApiModelProperty(value = "The parent project token")
    private String projectToken;
}