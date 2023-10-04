package com.myapp.logbook.repositories;

import com.myapp.logbook.models.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {

    List<Route> findAllByUserId(Long userId);
//    TODO: dotaz na JPA repository tady to padá
//    List<Route> findAllByDate(LocalDate routeStartDate);

//    @Query("SELECT r FROM Route r WHERE r.routeStartDateTime = :routeStartDateTime")
//    List<Route> findAllByDate(@Param("routeStartDateTime") LocalDate routeStartDateTime);

}
