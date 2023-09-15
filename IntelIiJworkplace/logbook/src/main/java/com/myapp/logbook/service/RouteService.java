package com.myapp.logbook.service;

import com.myapp.logbook.models.Route;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RouteService {
    Route addRoute(Route route);

    List<Route> getAllRoutes();

    List<Route> getAllRoutesByUserId(Long id);

    String updateRoute(Long id, Route route);

    Route findRouteById(Long id);

    String deleteRoute(Long id);

}
