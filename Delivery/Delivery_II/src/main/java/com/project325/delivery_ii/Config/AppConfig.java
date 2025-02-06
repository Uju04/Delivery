//package com.project325.delivery_ii.Config;
//
//import com.project325.delivery_ii.Entities.Vehicle;
//import com.project325.delivery_ii.Services.VehicleService;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.List;
//
//@Configuration
//
//public class AppConfig {
//    @Bean
//    public VehicleService vehicleService(){
//        return new VehicleService() {
//            @Override
//            public Vehicle createVehicle(Vehicle vehicle) {
//                return null;
//            }
//
//            @Override
//            public Vehicle updatVehicle(Long id, Vehicle vehicle) {
//                return null;
//            }
//
//            @Override
//            public List<Vehicle> getAllVehicles() {
//                return List.of();
//            }
//
//            @Override
//            public Vehicle getVehicleByPlateNumber(String plateNumber) {
//                return null;
//            }
//
//            @Override
//            public void deleteVehicle(Long id) {
//
//            }
//        };
//    }
//}
