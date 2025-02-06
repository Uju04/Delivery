package com.project325.delivery_ii.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private String plateNumber;
    private String status;
    private String type;
    private float fuelCapacity;
    private float carryingWeight;
    private float totalWeight;

    @OneToMany
    private java.util.List<Item> items;

    public Vehicle() {}

    public Vehicle(Long id, String name, String plateNumber, String status, String type,
                  float fuelCapacity, float carryingWeight, float totalWeight, java.util.List<Item> items) {
        this.id = id;
        this.name = name;
        this.plateNumber = plateNumber;
        this.status = status;
        this.type = type;
        this.fuelCapacity = fuelCapacity;
        this.carryingWeight = carryingWeight;
        //this.totalWeight = totalWeight;
        this.items = items;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public float getFuelCapacity() {
        return fuelCapacity;
    }

    public void setFuelCapacity(float fuelCapacity) {
        this.fuelCapacity = fuelCapacity;
    }

    public float getCarryingWeight() {
        return carryingWeight;
    }

    public void setCarryingWeight(float carryingWeight) {
        this.carryingWeight = carryingWeight;
    }

    public float getTotalWeight() {
        return totalWeight;
    }

    public void setTotalWeight(float totalWeight) {
        this.totalWeight = totalWeight;
    }

    public java.util.List<Item> getItems() {
        return items;
    }

    public void setItems(java.util.List<Item> items) {
        this.items = items;
    }
}
