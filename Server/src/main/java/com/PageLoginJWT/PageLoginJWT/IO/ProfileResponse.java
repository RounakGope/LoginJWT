package com.PageLoginJWT.PageLoginJWT.IO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileResponse {
    private String userId;
    private String email;
    private String name;
    private Boolean isAccountVerified;

}
