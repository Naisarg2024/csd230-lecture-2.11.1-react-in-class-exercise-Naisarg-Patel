package csd230.controllers;

import csd230.entities.ElectronicsEntity;
import csd230.repositories.ElectronicsRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/electronics")
@CrossOrigin(origins = "http://localhost:5173")
public class ElectronicsController {

    private final ElectronicsRepository electronicsRepository;

    public ElectronicsController(ElectronicsRepository electronicsRepository) {
        this.electronicsRepository = electronicsRepository;
    }

    @GetMapping
    public List<ElectronicsEntity> getAll() {
        return electronicsRepository.findAll();
    }

    @PostMapping
    public ElectronicsEntity create(@RequestBody ElectronicsEntity e) {
        return electronicsRepository.save(e);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ElectronicsEntity> update(@PathVariable Long id, @RequestBody ElectronicsEntity data) {
        return electronicsRepository.findById(id).map(e -> {
            e.setName(data.getName());
            e.setPrice(data.getPrice());
            e.setStock(data.getStock());
            e.setBrand(data.getBrand());
            e.setCategory(data.getCategory());
            return ResponseEntity.ok(electronicsRepository.save(e));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (electronicsRepository.existsById(id)) {
            electronicsRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}