package csd230.repositories;

import csd230.entities.ElectronicsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ElectronicsRepository extends JpaRepository<ElectronicsEntity, Long> {
}