package csd230.seeder;

import csd230.entities.BookEntity;
import csd230.entities.ElectronicsEntity;
import csd230.entities.MagazineEntity;
import csd230.entities.UserEntity;
import csd230.repositories.BookRepository;
import csd230.repositories.ElectronicsRepository;
import csd230.repositories.MagazineRepository;
import csd230.repositories.UserEntityRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserEntityRepository userRepository;
    private final BookRepository bookRepository;
    private final MagazineRepository magazineRepository;
    private final ElectronicsRepository electronicsRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserEntityRepository userRepository,
                      BookRepository bookRepository,
                      MagazineRepository magazineRepository,
                      ElectronicsRepository electronicsRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.magazineRepository = magazineRepository;
        this.electronicsRepository = electronicsRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedBooks();
        seedMagazines();
        seedElectronics();
    }

    private void seedUsers() {
        if (userRepository.findByUsername("admin") == null) {
            UserEntity admin = new UserEntity();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("password"));
            admin.setRole("ROLE_ADMIN");
            userRepository.save(admin);
        }

        if (userRepository.findByUsername("user") == null) {
            UserEntity user = new UserEntity();
            user.setUsername("user");
            user.setPassword(passwordEncoder.encode("password"));
            user.setRole("ROLE_USER");
            userRepository.save(user);
        }
    }

    private void seedBooks() {
        if (bookRepository.count() > 0) return;

        BookEntity b1 = new BookEntity();
        b1.setTitle("Clean Code");
        b1.setAuthor("Robert C. Martin");
        b1.setPrice(45.99);
        b1.setCopies(10);

        BookEntity b2 = new BookEntity();
        b2.setTitle("Effective Java");
        b2.setAuthor("Joshua Bloch");
        b2.setPrice(54.99);
        b2.setCopies(8);

        BookEntity b3 = new BookEntity();
        b3.setTitle("Spring in Action");
        b3.setAuthor("Craig Walls");
        b3.setPrice(49.99);
        b3.setCopies(6);

        bookRepository.save(b1);
        bookRepository.save(b2);
        bookRepository.save(b3);
    }

    private void seedMagazines() {
        if (magazineRepository.count() > 0) return;

        MagazineEntity m1 = new MagazineEntity();
        m1.setTitle("Tech Monthly");
        m1.setPrice(9.99);
        m1.setCopies(20);
        m1.setOrderQty(50);
        m1.setCurrentIssue(LocalDateTime.now().minusDays(10));

        MagazineEntity m2 = new MagazineEntity();
        m2.setTitle("Java World");
        m2.setPrice(7.99);
        m2.setCopies(15);
        m2.setOrderQty(40);
        m2.setCurrentIssue(LocalDateTime.now().minusDays(20));

        magazineRepository.save(m1);
        magazineRepository.save(m2);
    }

    private void seedElectronics() {
        if (electronicsRepository.count() > 0) return;

        ElectronicsEntity e1 = new ElectronicsEntity();
        e1.setName("Dell XPS 13");
        e1.setBrand("Dell");
        e1.setCategory("Laptop");
        e1.setPrice(1499.99);
        e1.setStock(5);

        ElectronicsEntity e2 = new ElectronicsEntity();
        e2.setName("iPhone 15");
        e2.setBrand("Apple");
        e2.setCategory("Mobile");
        e2.setPrice(1299.99);
        e2.setStock(7);

        ElectronicsEntity e3 = new ElectronicsEntity();
        e3.setName("ThinkPad X1");
        e3.setBrand("Lenovo");
        e3.setCategory("Laptop");
        e3.setPrice(1399.99);
        e3.setStock(4);

        electronicsRepository.save(e1);
        electronicsRepository.save(e2);
        electronicsRepository.save(e3);
    }
}