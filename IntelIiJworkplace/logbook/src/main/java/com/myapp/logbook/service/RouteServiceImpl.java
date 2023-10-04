package com.myapp.logbook.service;

import com.myapp.logbook.models.Route;
import com.myapp.logbook.repositories.RouteRepository;
import com.myapp.logbook.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RouteServiceImpl implements RouteService{

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final RouteRepository routeRepository;
    public RouteServiceImpl(UserRepository userRepository, RouteRepository routeRepository) {
        this.userRepository = userRepository;
        this.routeRepository = routeRepository;
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
    public String updateRoute(Long routeId, Route updateRoute) {
        Route existingRoute = findRouteById(routeId);

        if (existingRoute == null) {
            return "Route does not found";
        }
        if (updateRoute.getUserId() != 0) {
            existingRoute.setUserId(updateRoute.getUserId());
        }
        if (updateRoute.getRouteStartDateTime() != null) {
            existingRoute.setRouteStartDateTime(updateRoute.getRouteStartDateTime());
        }
        if (updateRoute.getRouteEndDateTime() != null) {
            existingRoute.setRouteEndDateTime(updateRoute.getRouteEndDateTime());
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

//    TODO: opravit vyhledání podle localdate
//    @Override
//    public List<Route> getAllRoutesByDate(LocalDate routeStartDate) {
//        return routeRepository.findAllByDate(routeStartDate);
//    }

    @Override
    public List<Route> getAllRoutesByUserId(Long userId) {
        return routeRepository.findAllByUserId(userId);
    }


}
