package com.stayeasy.config;

import com.stayeasy.security.JwtAuthenticationEntryPoint;
import com.stayeasy.security.JwtAuthenticationFilter;
import com.stayeasy.security.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
            .headers(headers -> headers.frameOptions(frame -> frame.disable())) // For H2 Console
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // 1. Public Auth & Onboarding Endpoints
                .requestMatchers("/api/v1/auth/**").permitAll()
                
                // 2. Public Browsing (Rooms, GPS Nearby, Cloud Kitchens, Menus, Offers)
                .requestMatchers(HttpMethod.GET, "/api/v1/listings/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/restaurants/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/offers/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/v1/offers/validate").permitAll()
                
                // 3. System, Swagger API Docs & Console
                .requestMatchers("/h2-console/**", "/ws/**", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                
                // 4. Host Listing & Promo Management (Role Protected)
                .requestMatchers(HttpMethod.POST, "/api/v1/listings/**").hasAnyRole("HOST", "ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/v1/listings/**").hasAnyRole("HOST", "ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/v1/listings/**").hasAnyRole("HOST", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/v1/offers/**").hasAnyRole("HOST", "ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/v1/offers/**").hasAnyRole("HOST", "ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/v1/offers/**").hasAnyRole("HOST", "ADMIN")

                // 5. Bookings, Orders, Payments (Requires Authenticated User)
                .requestMatchers("/api/v1/bookings/**").authenticated()
                .requestMatchers("/api/v1/orders/**").authenticated()
                .requestMatchers("/api/v1/payments/**").authenticated()
                
                .anyRequest().authenticated()
            );

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With", "Accept"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
