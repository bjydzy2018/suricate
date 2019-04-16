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

package io.suricate.monitoring.service.mapper;

import io.suricate.monitoring.model.dto.api.project.ProjectRequestDto;
import io.suricate.monitoring.model.dto.api.project.ProjectResponseDto;
import io.suricate.monitoring.model.entity.project.Project;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Interface that manage the generation DTO/Model objects for project class
 */
@Component
@Mapper(
        componentModel = "spring",
        uses = {ProjectSlideMapper.class}
)
public abstract class ProjectMapper {

    /* ************************* TO DTO ********************************************** */

    /* ******************************************************* */
    /*                  Simple Mapping                         */
    /* ******************************************************* */

    /**
     * Transform a project into a ProjectResponseDto
     *
     * @param project The project to transform
     * @return The related project DTO
     */
    @Named("toProjectDtoDefault")
    @Mapping(target = "slides", qualifiedByName = "toProjectSlideDtoDefault")
    public abstract ProjectResponseDto toProjectDtoDefault(Project project);

    /* ******************************************************* */
    /*                    List Mapping                         */
    /* ******************************************************* */

    /**
     * Transform a list of projects into a list of projectDtos
     *
     * @param projects The list of project to tranform
     * @return The related list of dto object
     */
    @Named("toProjectDtosDefault")
    @IterableMapping(qualifiedByName = "toProjectDtoDefault")
    public abstract List<ProjectResponseDto> toProjectDtosDefault(List<Project> projects);


    /* ************************* TO MODEL **************************************** */

    /* ******************************************************* */
    /*                  Simple Mapping                         */
    /* ******************************************************* */

    /**
     * Transform a projectRequestDto into a project when we want to add a new dashboard
     *
     * @param projectRequestDto The project to transform
     * @return The related project domain object
     */
    @Named("toNewProject")
    public abstract Project toNewProject(ProjectRequestDto projectRequestDto);
}
