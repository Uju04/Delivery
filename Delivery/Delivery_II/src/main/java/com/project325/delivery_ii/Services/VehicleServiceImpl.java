package com.project325.delivery_ii.Services;

import com.project325.delivery_ii.Entities.Vehicle;
import com.project325.delivery_ii.Repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class VehicleServiceImpl implements VehicleService{

    private final VehicleRepository vehicleRepository;

    public VehicleServiceImpl(VehicleRepository vehicleRepository){
        this.vehicleRepository = vehicleRepository;
    }
    @Override
    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    @Override
    public Vehicle updatVehicle(Long id, Vehicle vehicle) {
        Optional<Vehicle> optionalVehicle = this.vehicleRepository.findById(id);
        if(optionalVehicle.isPresent()) {
            Vehicle newVehicle = optionalVehicle.get();
            newVehicle.setName(vehicle.getName());
            newVehicle.setItems(vehicle.getItems());


            vehicleRepository.save(newVehicle);
            return newVehicle;
        }else{
            throw new RuntimeException("Vehicle not found");
        }
    }

    @Override
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    @Override
    public Vehicle getVehicleByPlateNumber(String plateNumber) {
        return (Vehicle) vehicleRepository.getVehicleByPlateNumber(plateNumber);
    }

    @Override
    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);

    }
}
