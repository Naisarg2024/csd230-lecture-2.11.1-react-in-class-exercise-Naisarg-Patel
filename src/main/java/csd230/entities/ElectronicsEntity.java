package csd230.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("ELECTRONICS")
public class ElectronicsEntity extends ProductEntity {

    private String name;
    private double price;
    private int stock;
    private String brand;
    private String category; // Laptop or Mobile

    public ElectronicsEntity() {}

    public ElectronicsEntity(String name, double price, int stock, String brand, String category) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.brand = brand;
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public void sellItem() {
        if (stock > 0) {
            stock--;
        }
    }
}