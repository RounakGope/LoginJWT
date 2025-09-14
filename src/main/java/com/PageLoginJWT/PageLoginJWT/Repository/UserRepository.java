package com.PageLoginJWT.PageLoginJWT.Repository;

import com.PageLoginJWT.PageLoginJWT.Entity.UserEntity;
import com.PageLoginJWT.PageLoginJWT.IO.ProfileResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {
    Boolean existsByEmail(String Email);
   Optional<UserEntity> findByEmail(String email);
}

