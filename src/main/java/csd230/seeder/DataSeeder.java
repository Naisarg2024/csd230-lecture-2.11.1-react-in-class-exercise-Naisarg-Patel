package csd230.seeder;

import csd230.entities.*;
import csd230.repositories.BookRepository;
import csd230.repositories.MagazineRepository;
import csd230.repositories.ElectronicsRepository;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.concurrent.TimeUnit;

@Component
public class DataSeeder implements CommandLineRunner {

    private final BookRepository bookRepository;
    private final MagazineRepository magazineRepository;
    private final ElectronicsRepository electronicsRepository;
    private final Faker faker;

    public DataSeeder(BookRepository bookRepository, MagazineRepository magazineRepository, ElectronicsRepository electronicsRepository) {
        this.bookRepository = bookRepository;
        this.magazineRepository = magazineRepository;
        this.electronicsRepository = electronicsRepository;
        this.faker = new Faker();
    }

    @Override
    public void run(String... args) throws Exception {
        // Only seed if the database is empty
        if (bookRepository.count() == 0) {
            seedBooks();
            seedMagazines();
            seedElectronics();
        }
    }

    private void seedBooks() {
        System.out.println("Seeding Books...");
        for (int i = 0; i < 10; i++) {
            BookEntity book = new BookEntity(
                    faker.book().title(),                // Title
                    faker.number().randomDouble(2, 10, 100), // Price
                    faker.number().numberBetween(1, 50), // Copies
                    faker.book().author()                // Author
            );
            bookRepository.save(book);
        }
    }

    private void seedMagazines() {
        System.out.println("Seeding Magazines...");
        for (int i = 0; i < 5; i++) {
            // Convert Faker Date to LocalDateTime
            LocalDateTime issueDate = faker.date().past(365, TimeUnit.DAYS)
                    .toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

            MagazineEntity mag = new MagazineEntity(
                    faker.book().publisher() + " Weekly", // Using publisher as magazine title
                    faker.number().randomDouble(2, 5, 20),
                    faker.number().numberBetween(10, 100),
                    faker.number().numberBetween(100, 500), // Order Qty
                    issueDate
            );
            magazineRepository.save(mag);
        }
    }
    // to generate mock data for my niche product : Electronics (laptop/mobile)
    private void seedElectronics() {
        System.out.println("Seeding Electronics...");

        String[] brands = {"Apple", "Samsung", "Dell", "HP", "Lenovo", "Asus"};
        String[] categories = {"Laptop", "Mobile"};

        for (int i = 0; i < 8; i++) {
            String brand = faker.options().option(brands);
            String category = faker.options().option(categories);

            String name;
            if (category.equals("Laptop")) {
                name = brand + " " + faker.lorem().word() + " Laptop";
            } else {
                name = brand + " " + faker.lorem().word() + " Phone";
            }

            ElectronicsEntity electronic = new ElectronicsEntity(
                    name,
                    faker.number().randomDouble(2, 300, 2500),
                    faker.number().numberBetween(1, 40),
                    brand,
                    category
            );

            electronicsRepository.save(electronic);
        }
    }
}