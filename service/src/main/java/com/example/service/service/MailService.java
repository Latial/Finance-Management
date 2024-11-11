package com.example.service.service;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.util.Locale;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailService {
    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;
    private static final String SENDER = "lucyusbeatsweb@gmail.com";

    public void sendActivationEmail(String to, String firstName, String activationLink) {
        var mimeMessage = javaMailSender.createMimeMessage();
        var isMultipart = false;
        var subject = "Activation Email";

        try {
            var locale = Locale.forLanguageTag("en");
            var context = new Context(locale);
            context.setVariable("firstName", firstName);
            context.setVariable("activationLink", activationLink);
            var content = templateEngine.process("activate-account", context);

            var message = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
            message.setTo(to);
            message.setFrom(SENDER);
            message.setSubject(subject);
            message.setText(content, true);
            javaMailSender.send(mimeMessage);
            log.debug("Sent email to User '{}'", to);
        } catch (MailException | MessagingException e) {
            log.warn("Email could not be sent to user '{}'", to, e);
        }


    }

}