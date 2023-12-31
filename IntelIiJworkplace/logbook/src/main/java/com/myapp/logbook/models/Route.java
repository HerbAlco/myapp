package com.myapp.logbook.models;

import com.myapp.logbook.enumerations.PurpouseRoute;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "_route")
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long routeId;
    private long userId;
    private LocalDateTime routeStartDate;
    private LocalDateTime routeEndDate;
    private double distance;
    private String startLocation;
    private String endLocation;
    private PurpouseRoute purpose;
    private double routeCost;

}
