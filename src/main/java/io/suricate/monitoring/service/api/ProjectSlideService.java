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

package io.suricate.monitoring.service.api;

import io.suricate.monitoring.model.entity.project.ProjectSlide;
import io.suricate.monitoring.repository.ProjectSlideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service used to manage projects slides
 */
@Service
public class ProjectSlideService {

    /**
     * Project slide repository
     */
    private final ProjectSlideRepository projectSlideRepository;


    /**
     * Constructor
     *
     * @param projectSlideRepository The project slide repository to inject
     */
    @Autowired
    public ProjectSlideService(final ProjectSlideRepository projectSlideRepository) {
        this.projectSlideRepository = projectSlideRepository;
    }

    /**
     * Get a project slide by id
     *
     * @param id The id of the project slide to retrieve
     * @return The project slide as Optional
     */
    public Optional<ProjectSlide> getOneById(final Long id) {
        if (projectSlideRepository.existsById(id)) {
            return Optional.of(projectSlideRepository.getOne(id));
        }

        return Optional.empty();
    }
}
