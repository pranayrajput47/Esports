package com.esports.aem.core.models;

import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Getter
@Model(adaptables = Resource.class,defaultInjectionStrategy = DefaultInjectionStrategy.REQUIRED)
public class EmployeeModel {
    @ValueMapValue
    private String firstname;

    @ValueMapValue
    private String lastname;

    @ValueMapValue
    private String designation;

    @ValueMapValue
    private String email;
}
