/*
 *  Copyright 2015 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.esports.aem.core.servlets;

import com.esports.aem.core.services.impl.EmailService;
import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

@Component(
        immediate = true,
        service = {Servlet.class},
        property = {
                Constants.SERVICE_DESCRIPTION + "=" + "Send email servlet",
                "sling.servlet.methods=" + HttpConstants.METHOD_POST,
                "sling.servlet.paths=" + "/bin/sendEmail",
                Constants.SERVICE_VENDOR + "=" + "Stride Esports",
        }
)
public class SendEmailServlet extends SlingAllMethodsServlet {

    private static final long serialVersionUID = 1L;

    private static final Logger LOGGER = LoggerFactory.getLogger(SendEmailServlet.class);

    @Reference
    private transient EmailService emailService;

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        ResourceResolver resolver = request.getResourceResolver();
        String firstName = request.getParameter("fname") == null ? StringUtils.EMPTY : request.getParameter("fname");
        String lastName = request.getParameter("lname") == null ? StringUtils.EMPTY : request.getParameter("lname");
        String email = request.getParameter("email") == null ? StringUtils.EMPTY : request.getParameter("email");
        String phone = request.getParameter("phone") == null ? StringUtils.EMPTY : request.getParameter("phone");
        String pcode = request.getParameter("pcode") == null ? StringUtils.EMPTY : request.getParameter("pcode");
        String subject = request.getParameter("subject") == null ? StringUtils.EMPTY : request.getParameter("subject");
        String body = request.getParameter("body") == null ? StringUtils.EMPTY : URLDecoder.decode(request.getParameter("body"), "UTF-8");
        Map emailParams = new HashMap<>();
        emailParams.put("senderFName", firstName);
        emailParams.put("senderLName", lastName);
        emailParams.put("senderEmail", email);
        emailParams.put("senderPhone", phone);
        emailParams.put("senderPostalCode", pcode);
        emailParams.put("emailSubject", subject);
        emailParams.put("emailBody", body);
        String recipientEmail = emailService.sendMail(resolver, emailParams);
        if (StringUtils.isEmpty(recipientEmail)) {
            LOGGER.info("mail not sent");
        } else {
            LOGGER.info("mail sent successfully");
        }
    }
}
