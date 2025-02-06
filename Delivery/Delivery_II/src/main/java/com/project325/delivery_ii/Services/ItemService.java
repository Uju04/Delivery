package com.project325.delivery_ii.Services;

import com.project325.delivery_ii.Entities.Item;

import java.util.List;

public interface ItemService {
    Item createItem(Item item);
    Item getItemById(Long id);
    List<Item> getAllItems();

    void deleteItem(Long id);
}
