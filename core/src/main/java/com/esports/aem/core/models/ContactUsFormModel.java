package com.esports.aem.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.PostConstruct;


@Model(adaptables = SlingHttpServletRequest.class,defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ContactUsFormModel {

    @Self
    private SlingHttpServletRequest request;

    private String resourcePath;

    @PostConstruct
    protected void init() {

        resourcePath = request.getResource().getPath();
    }

    public String getResourcePath() {
        return resourcePath;
    }

}
