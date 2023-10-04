package com.myapp.logbook.controllers;

import com.myapp.logbook.models.Route;
import com.myapp.logbook.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auth/route")
@CrossOrigin
public class RouteController {

    @Autowired
    private final RouteService routeService;
    @Autowired
    private UserController userController;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }


    @PostMapping("/add")
    public String addRoute(@RequestBody Route route) {
        route.setUserId(userController.getUser().getId());
        route.setRouteCost(route.getDistance() * 3.85);
        route.setUserName(userController.getUser().getFirstname() + " " + userController.getUser().getLastname());
//        TODO: uložení localdate z localdatetime
//        route.setRouteStartDate(route.getRouteStartDateTime().toLocalDate());
//        route.setRouteEndDate(route.getRouteEndDateTime().toLocalDate());
        routeService.addRoute(route);
        return "New route was added";
    }

    @GetMapping("/routes")
    public List<Route> getAllRoutes() {
        return routeService.getAllRoutes();
    }

    @GetMapping("/routesById/{userId}")
    public List<Route> getAllRoutesByUserId(@PathVariable String userId) {
        return routeService.getAllRoutesByUserId(Long.valueOf(userId));
    }

//    TODO: opravit vyhledání podle localdate
//    @GetMapping("/routesByDate/{routeStartDate}")
//    public List<Route> getAllRoutesByDate (@PathVariable String routeStartDate){
//        return routeService.getAllRoutesByDate(LocalDate.parse(routeStartDate));
//    }

    @PutMapping("/update/{routeId}")
    public String updateRoute(@PathVariable Long routeId, @RequestBody Route updateRoute) {
        return routeService.updateRoute(routeId, updateRoute);
    }

    @DeleteMapping("/delete/{routeId}")
    public String deleteRoute(@PathVariable Long routeId) {
        return routeService.deleteRoute(routeId);
    }

}
