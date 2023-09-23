package com.dev.productapi;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequestMapping("api/status")
@RestController
public class StatusController {


    @GetMapping
    public ResponseEntity<?> getStatus() {
        Map<String, String> response = Map.of("service", "product-api", "status", "UP");
        return ResponseEntity.ok(response);
    }

}
