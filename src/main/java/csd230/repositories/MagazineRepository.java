package csd230.repositories;

import csd230.entities.MagazineEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MagazineRepository extends JpaRepository<MagazineEntity, Long> {
}