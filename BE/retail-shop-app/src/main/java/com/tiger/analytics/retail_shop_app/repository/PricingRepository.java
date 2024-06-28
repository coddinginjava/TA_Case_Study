package com.tiger.analytics.retail_shop_app.repository;

import com.tiger.analytics.retail_shop_app.entity.PricingRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PricingRepository extends JpaRepository<PricingRecord, Long> {

    List<PricingRecord> findBySkuContainingIgnoreCaseOrProductNameContainingIgnoreCase(String sku, String productName);
}