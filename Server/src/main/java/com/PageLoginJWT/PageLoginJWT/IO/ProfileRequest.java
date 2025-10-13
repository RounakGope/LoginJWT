package com.PageLoginJWT.PageLoginJWT.IO;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileRequest {
    @NotBlank(message = "Name should not be empty")
    private String name;
    @NotNull(message = "email should not be blank")
    @Email
    private String email;
    @Size(min=6,message = "password should be minimum 6")
    private String password;
}

