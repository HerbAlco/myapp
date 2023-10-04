package com.myapp.logbook.repositories;

import com.myapp.logbook.models.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {

    List<Route> findAllByUserId(Long userId);

//    TODO: @Query zhazuje appku
//    @Query("SELECT r FROM Route r WHERE DATE(r.routeStartDateTime) = :routeStartDate")
//    List<Route> findAllByRouteStartDate(@Param("routeStartDate") LocalDate routeStartDate);

    List<Route> findAllByRouteStartDate(LocalDate routeStartDate);

}
