package com.project325.delivery_ii.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project325.delivery_ii.Entities.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

}
