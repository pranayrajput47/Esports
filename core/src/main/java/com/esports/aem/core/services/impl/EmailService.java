package com.esports.aem.core.services.impl;

import org.apache.sling.api.resource.ResourceResolver;

import java.util.Map;

public interface EmailService {

    boolean sendMail(ResourceResolver resolver, Map emailParams);
}
