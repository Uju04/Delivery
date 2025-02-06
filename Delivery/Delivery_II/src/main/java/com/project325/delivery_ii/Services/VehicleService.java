package com.project325.delivery_ii.Services;

import java.util.List;

import com.project325.delivery_ii.Entities.Vehicle;
import org.springframework.stereotype.Service;

@Service

public interface VehicleService {
    Vehicle createVehicle(Vehicle vehicle);
    Vehicle updatVehicle(Long id, Vehicle vehicle);
    List<Vehicle> getAllVehicles();
    Vehicle getVehicleByPlateNumber(String plateNumber);
    void deleteVehicle(Long id);
}
