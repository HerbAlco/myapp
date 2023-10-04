package com.myapp.logbook.service;

import com.myapp.logbook.models.Route;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface RouteService {

    Route addRoute(Route route);

    List<Route> getAllRoutes();

//    List<Route> getAllRoutesByDate(LocalDate routeStartDate);

    List<Route> getAllRoutesByUserId(Long userId);

    String updateRoute(Long id, Route route);

    Route findRouteById(Long id);

    String deleteRoute(Long id);

}
