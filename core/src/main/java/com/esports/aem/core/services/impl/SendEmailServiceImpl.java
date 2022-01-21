package com.esports.aem.core.services.impl;


import com.day.cq.mcm.emailprovider.EmailService;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;

public class SendEmailServiceImpl implements SendEmailService {

    @Reference
    EmailService emailService;



    private String[] recipients;

    private String templatePath;

    String senderEmailAddress;

    String webleadEndpoint;

    String pardotProspectEndpoint;

    @Activate
    private void activate ( ) {
    }

    @Deactivate
    private void deactive () {
    }

//    @Override
//    String submitEmailForm(Map<String, String> formData) throws IllegalArgumentException,  {
//        try {
//
//            String templatePath = "/etc/notification/email/default/emailTemplate.html"
//            Map<String, String> emailParams = new HashMap<String,String>()
//            String message;
//            StringBuilder sb = new StringBuilder();
//            formData.each { String key, String value ->
//                if (value) {
//                    sb.append(key).append('  ---------->  ').append('<b>').append(value).append('</b><br>')
//                }
//            }
//            emailParams.put("body",sb.toString())
//
//            emailParams.put('senderEmailAddress', 'accessiblity@k12.com')
//            emailParams.put('senderName','K12.com Accessiblity')
//            List<String> emailList= userService.getUserList("ada-email-group")
//
//            // Array of email recipients
//            String[] recipients = emailList as String[]
//
//            List<String> failureList = emailService.sendEmail(templatePath, emailParams, recipients)
//
//            message = failureList.isEmpty() ? 'Email sent successfully to the recipients' : 'Email sent failed'
//
//            message
//        } catch (Exception e) {
//            log.error('Error submitting Email form: message', e)
//            }
//    }
}
