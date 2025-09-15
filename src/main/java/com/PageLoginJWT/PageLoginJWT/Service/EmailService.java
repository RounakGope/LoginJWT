package com.PageLoginJWT.PageLoginJWT.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    @Value("${spring.mail.properties.mail.smtp.from}")
    String fromEmail;

    public void sendMail(String toEmail,String name)
    {
        SimpleMailMessage message=new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Welcome To The Platform");
        message.setText("Hello "+name+
        "\n\nThanks for registering to our platform!\n\n With Regards\n Authify Team");
        mailSender.send(message);



    }
}
