package com.project325.delivery_ii.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project325.delivery_ii.Entities.Vehicle;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    @Query("SELECT vehicle FROM Vehicle vehicle WHERE vehicle.status = 'maintenance'")
    List<Vehicle> getVehiclesStatus();//@Param("status") String status);

    List<Vehicle> getVechiclesByCarryingWeightGreaterThan(float weight);

    //List<Vehicle> getVehicleByPlateNumber(String plateNumber);
    Vehicle getVehicleByPlateNumber(String plateNumber);
}
