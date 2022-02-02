package com.esports.aem.core.services.impl;

import com.day.cq.commons.mail.MailTemplate;
import com.day.cq.mailer.MailingException;
import com.day.cq.mailer.MessageGateway;
import com.day.cq.mailer.MessageGatewayService;
import javax.mail.MessagingException;
import org.apache.commons.lang.text.StrLookup;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;
import java.io.IOException;
import java.util.Map;

@Designate(ocd = EmailServiceImpl.Config.class)
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
    private String userTemplatePath;
    private String senderEmail;
    private String[] recipients;

    @Activate
    public void activate(final Config config) {
        this.templatePath = config.templatePath();
        this.userTemplatePath = config.userTemplatePath();
        this.senderEmail = config.email_from();
        this.recipients = config.recipients();
    }

    @Override
    public boolean sendMail(ResourceResolver resolver, Map emailParams) {
        boolean sentEmail = false;
        try {
            MailTemplate mailTemplate = MailTemplate.create(templatePath, resolver.adaptTo(Session.class));
            Email email = mailTemplate.getEmail(StrLookup.mapLookup(emailParams), HtmlEmail.class);
            email.addTo(recipients);
            email.setFrom(senderEmail);
            MessageGateway messageGateway = messageGatewayService.getGateway(email.getClass());
            messageGateway.send(email);
            sentEmail = true;
        } catch (EmailException | IOException | MessagingException | MailingException e) {
            LOGGER.error("Error sending email to " + recipients, e);
        }

        return sentEmail;
    }

    @Override
    public boolean sendMailToUser(ResourceResolver resolver, Map emailParams) {
        boolean sentEmail = false;
        try {
            MailTemplate mailTemplate = MailTemplate.create(userTemplatePath, resolver.adaptTo(Session.class));
            Email email = mailTemplate.getEmail(StrLookup.mapLookup(emailParams), HtmlEmail.class);
            email.addTo(String.valueOf(emailParams.get("senderEmail")));
            email.setFrom(senderEmail);
            MessageGateway messageGateway = messageGatewayService.getGateway(email.getClass());
            messageGateway.send(email);
            sentEmail = true;
        } catch (EmailException | IOException | MessagingException | MailingException e) {
            LOGGER.error("Error sending email to " + emailParams.get("senderEmail"), e);
        }

        return sentEmail;
    }

    @ObjectClassDefinition(name = "Email Configuration")
    public @interface Config {

        @AttributeDefinition(name = "List Email Recipients Address", description = "List Email Recipients Address")
        String[] recipients ();

        @AttributeDefinition(name = "Sender Email Address", description = "Sender Email Address")
        String email_from () default "strideesport@k12.com";

        @AttributeDefinition(name="Email Template Path", description="Email Template Path")
        String templatePath() default "/etc/notification/email/html/esportsTemplate.html";

        @AttributeDefinition(name="Email Template Path", description="Email Template Path")
        String userTemplatePath() default "/etc/notification/email/html/userEmailTemplate.html";

    }

}