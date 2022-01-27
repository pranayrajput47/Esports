package com.esports.aem.core.services.impl;

import com.day.cq.commons.mail.MailTemplate;
import com.day.cq.mailer.MessageGateway;
import com.day.cq.mailer.MessageGatewayService;
import javax.mail.MessagingException;
import org.apache.commons.lang.text.StrLookup;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.osgi.framework.Constants;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;
import java.io.IOException;
import java.util.Map;

@Component(
        configurationPolicy = ConfigurationPolicy.OPTIONAL,
        immediate = true,
        service = {EmailService.class},
        enabled = true,
        property = {
                Constants.SERVICE_DESCRIPTION + "=" + "Email Service",
                Constants.SERVICE_VENDOR + "=" + "Stride Esports"
        }
)
public class EmailServiceImpl implements EmailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailServiceImpl.class);

    @Reference
    private MessageGatewayService messageGatewayService;
    private String templatePath;
    private String senderEmail;
    private String recipient;

    @Activate
    public void activate(final ComponentContext context) {
        templatePath = PropertiesUtil.toString(context.getProperties().get("template.path"), "/etc/notification/email/html/en.html");
        senderEmail = PropertiesUtil.toString(context.getProperties().get("sender.email"), "accessibility@k12.com");
    }

    @Override
    public boolean sendMail(ResourceResolver resolver, Map emailParams) {
        boolean sentEmail = false;
        try {
            MailTemplate mailTemplate = MailTemplate.create(templatePath, resolver.adaptTo(Session.class));
            Email email = mailTemplate.getEmail(StrLookup.mapLookup(emailParams), HtmlEmail.class);
            email.addTo(String.valueOf(emailParams.get("senderEmail")));
            email.setFrom(senderEmail);
            MessageGateway messageGateway = messageGatewayService.getGateway(email.getClass());
            messageGateway.send(email);
            sentEmail = true;
        } catch (EmailException | IOException | MessagingException e) {
            LOGGER.error("Error sending email to " + emailParams.get("senderEmail"), e);
        }

        return sentEmail;
    }

}