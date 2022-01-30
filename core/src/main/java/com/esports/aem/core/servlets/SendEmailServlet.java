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
import org.json.JSONException;
import org.json.JSONObject;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component(
        immediate = true,
        service = {Servlet.class},
        property = {
                Constants.SERVICE_DESCRIPTION + "=" + "Send email servlet",
                "sling.servlet.methods=" + HttpConstants.METHOD_POST,
                "sling.servlet.resourceTypes=" + "esports/components/contactUsForm",
                "sling.servlet.extensions=service",
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
        try(ResourceResolver resolver = request.getResourceResolver()) {
            String firstName = request.getParameter("fname") == null ? StringUtils.EMPTY : request.getParameter("fname");
            String lastName = request.getParameter("lname") == null ? StringUtils.EMPTY : request.getParameter("lname");
            String email = request.getParameter("email") == null ? StringUtils.EMPTY : request.getParameter("email");
            String phone = request.getParameter("phone") == null ? StringUtils.EMPTY : request.getParameter("phone");
            String pcode = request.getParameter("pcode") == null ? StringUtils.EMPTY : request.getParameter("pcode");
            String state = request.getParameter("state") == null ? StringUtils.EMPTY : request.getParameter("state");
            String description = request.getParameter("description") == null ? StringUtils.EMPTY : request.getParameter("description");
            String interestedGrade = request.getParameter("interested") == null ? StringUtils.EMPTY : request.getParameter("interested");

            Map emailParams = new HashMap<>();
            emailParams.put("senderFName", firstName);
            emailParams.put("senderLName", lastName);
            emailParams.put("senderEmail", email);
            emailParams.put("senderPhone", phone);
            emailParams.put("senderPostalCode", pcode);
            emailParams.put("state", state);
            emailParams.put("description", description);
            emailParams.put("interestedGrade", interestedGrade);

            boolean sentEmail = emailService.sendMail(resolver, emailParams);

            JSONObject jsonObject = new JSONObject();
            if (sentEmail) {
                jsonObject.put("code", 200);
                jsonObject.put("message", "Email sent successfully");
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(jsonObject.toString());
                LOGGER.info("mail sent successfully");
            } else {
                jsonObject.put("message", "Something went wrong");
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(jsonObject.toString());
                LOGGER.info("Error while sending email.");
            }
        } catch (JSONException e) {
            LOGGER.error("Error while creating response json object {}", e);
        }
    }
}