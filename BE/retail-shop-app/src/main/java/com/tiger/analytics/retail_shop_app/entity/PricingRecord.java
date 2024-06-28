package com.tiger.analytics.retail_shop_app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PricingRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long storeId;
    private String sku;
    private String productName;
    private Double price;
    private String date;

    public PricingRecord(long storeId, String sku, String productName, double price, String date) {
        this.storeId = storeId;
        this.sku = sku;
        this.productName = productName;
        this.price = price;
        this.date = date;
    }
}