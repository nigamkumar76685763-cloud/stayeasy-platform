package com.stayeasy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StayEasyApplication {
    public static void main(String[] args) {
        SpringApplication.run(StayEasyApplication.class, args);
        System.out.println("🏨 StayEasy Spring Boot 3 Full-Stack Backend Active on Port 5000!");
    }
}
