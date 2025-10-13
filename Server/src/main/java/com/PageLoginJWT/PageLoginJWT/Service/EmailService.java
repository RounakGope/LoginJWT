package com.PageLoginJWT.PageLoginJWT.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
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
        "\n\nThanks for registering to our platform!\n\n With Regards\n Team Authentify");
        mailSender.send(message);
    }
    public void sendVerifyMail(String toEmail,String name)
    {
        SimpleMailMessage message=new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Account Verification Done");
        message.setText("Hello "+name+
                "\n\nThanks for Verifying your Account to our platform!\n\n With Regards\n Authentify Team");
        mailSender.send(message);
    }

    public void sendResetOtpMail(String email,String OTP)
    {
        SimpleMailMessage mailMessage=new SimpleMailMessage();
        mailMessage.setFrom(fromEmail);
        mailMessage.setTo(email);

        mailMessage.setSubject("Password Reset OTP");
        mailMessage.setText("Your Password Reset OTP is:"+OTP+"\n\n Use it before 15 minutes\n\n Team Authentify");
        mailSender.send(mailMessage);

    }


    public void sendVerifyOtpMail(String email, String OTP) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setFrom(fromEmail);

        // Clear, professional subject line (avoid spam triggers)
        mailMessage.setSubject("Verify Your Authentify Account");

        // Professional, well-formatted content
        String emailBody = String.format(
                "Hello,%n%n" +
                        "Thank you for registering with Authentify!%n%n" +
                        "Your verification code is: %s%n%n" +
                        "This code will expire in 24 hours.%n%n" +
                        "If you did not request this code, please ignore this email.%n%n" +
                        "Best regards,%n" +
                        "The Authentify Team",
                OTP
        );

        mailMessage.setText(emailBody);

        try {
            mailSender.send(mailMessage);
            System.out.println("Verification email sent successfully to: " + email);
        } catch (MailException e) {
            System.err.println("Failed to send verification email: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error sending verification email: " + e.getMessage());
        }
    }

}
