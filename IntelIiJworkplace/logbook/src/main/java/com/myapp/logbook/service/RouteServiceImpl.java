package com.myapp.logbook.service;

import com.myapp.logbook.models.Route;
import com.myapp.logbook.models.User;
import com.myapp.logbook.repositories.RouteRepository;
import com.myapp.logbook.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteServiceImpl implements RouteService{

    @Autowired
    private final RouteRepository routeRepository;
    @Autowired
    private final UserRepository userRepository;

    public RouteServiceImpl(RouteRepository routeRepository, UserRepository userRepository) {
        this.routeRepository = routeRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Route addRoute(Route route) {
        return routeRepository.save(route);
    }

    @Override
    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    @Override
    public List<Route> getAllRoutesByUserId(Long id) {
        return routeRepository.findByUserId(id);
    }

    @Override
    public String updateRoute(Long routeId, Route updateRoute) {
        Route existingRoute = findRouteById(routeId);

        if (existingRoute == null) {
            return "Route does not found";
        }
        if (updateRoute.getUserId() != 0) {
            existingRoute.setUserId(updateRoute.getUserId());
        }
        if (updateRoute.getRouteStartDate() != null) {
            existingRoute.setRouteStartDate(updateRoute.getRouteStartDate());
        }
        if (updateRoute.getRouteEndDate() != null) {
            existingRoute.setRouteEndDate(updateRoute.getRouteEndDate());
        }
        if (updateRoute.getDistance() != existingRoute.getDistance()){
            existingRoute.setDistance(updateRoute.getDistance());
        }
        if (updateRoute.getStartLocation() != null){
            existingRoute.setStartLocation(updateRoute.getStartLocation());
        }
        if (updateRoute.getEndLocation() != null) {
            existingRoute.setEndLocation(updateRoute.getEndLocation());
        }
        if (updateRoute.getPurpose() != null){
            existingRoute.setPurpose(updateRoute.getPurpose());
        }

        routeRepository.save(existingRoute);

        return "Route was updated";
    }

    @Override
    public Route findRouteById(Long id) {
        return routeRepository.findById(id).orElse(null);
    }

    @Override
    public String deleteRoute(Long id) {
        routeRepository.deleteById(id);
        return "Route with id: " + id + ", was deleted";
    }
}
