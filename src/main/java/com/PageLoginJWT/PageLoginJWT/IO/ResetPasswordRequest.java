package com.PageLoginJWT.PageLoginJWT.IO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor

public class ResetPasswordRequest {

    @NotBlank(message = "ThePassword cannot be blank")
    String newPassword;
    @NotBlank(message = "Otp cannot be blank")
    String otp;
    @NotBlank(message = "Email cannot be blank")
    String email;
}
