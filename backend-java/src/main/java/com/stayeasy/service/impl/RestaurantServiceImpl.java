package com.stayeasy.service.impl;

import com.stayeasy.entity.MenuItem;
import com.stayeasy.entity.Restaurant;
import com.stayeasy.repository.MenuItemRepository;
import com.stayeasy.repository.RestaurantRepository;
import com.stayeasy.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Override
    public List<Restaurant> getAllOpenRestaurants() {
        return restaurantRepository.findAll().stream()
                .filter(Restaurant::isOpen)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Restaurant> getRestaurantById(String id) {
        return restaurantRepository.findById(id);
    }

    @Override
    public List<MenuItem> getMenuItemsByRestaurant(String restaurantId) {
        return menuItemRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    @Override
    public MenuItem createMenuItem(MenuItem item) {
        if (item.getId() == null) item.setId("food_" + System.currentTimeMillis());
        if (item.getCreatedAt() == null) item.setCreatedAt(new Date().toString());
        item.setAvailable(true);
        return menuItemRepository.save(item);
    }

    @Override
    public Restaurant createRestaurant(Restaurant restaurant) {
        if (restaurant.getId() == null) restaurant.setId("rest_" + System.currentTimeMillis());
        if (restaurant.getCreatedAt() == null) restaurant.setCreatedAt(new Date().toString());
        restaurant.setOpen(true);
        return restaurantRepository.save(restaurant);
    }
}
