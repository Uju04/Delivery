package com.project325.delivery_ii.Controller;

import com.project325.delivery_ii.Services.ItemService;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project325.delivery_ii.Entities.Vehicle;
import com.project325.delivery_ii.Services.VehicleService;

@RestController
@RequestMapping("/api/v1/vehicle")
public class VehicleController {

    private final ItemService itemService;
    private final VehicleService vehicleService;

    public VehicleController(ItemService itemService,VehicleService vehicleService) {
        this.itemService = itemService;
        this.vehicleService = vehicleService;
    }

    @PostMapping("/create-vehicle")
    ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
        vehicleService.createVehicle(vehicle);
        return ResponseEntity.ok().body(vehicle);
    }
   @GetMapping("/get-vehicle/{plateNumber}")
    ResponseEntity<Vehicle> getVehicleByPlateNumber(@PathVariable String plateNumber) {
        Vehicle vehicle = vehicleService.getVehicleByPlateNumber(plateNumber);
        return ResponseEntity.ok(vehicle);
   }

}
