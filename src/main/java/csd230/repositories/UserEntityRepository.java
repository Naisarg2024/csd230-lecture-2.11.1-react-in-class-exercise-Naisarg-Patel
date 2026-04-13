package csd230.repositories;
import csd230.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);
}

