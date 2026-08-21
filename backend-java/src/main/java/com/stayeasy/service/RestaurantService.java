package com.stayeasy.service;

import com.stayeasy.entity.MenuItem;
import com.stayeasy.entity.Restaurant;
import java.util.List;
import java.util.Optional;

public interface RestaurantService {
    List<Restaurant> getAllOpenRestaurants();
    Optional<Restaurant> getRestaurantById(String id);
    List<MenuItem> getMenuItemsByRestaurant(String restaurantId);
    List<MenuItem> getAllMenuItems();
    MenuItem createMenuItem(MenuItem item);
    Restaurant createRestaurant(Restaurant restaurant);
}
