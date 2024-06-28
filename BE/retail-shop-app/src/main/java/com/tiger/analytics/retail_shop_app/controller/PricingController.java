package com.tiger.analytics.retail_shop_app.controller;

import com.tiger.analytics.retail_shop_app.entity.PricingRecord;
import com.tiger.analytics.retail_shop_app.service.PricingService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/retail-shop")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PricingController {

    private PricingService pricingService;

    @PostMapping("/upload")
    public List<PricingRecord> uploadPricingFeed(@RequestParam("file") MultipartFile file) {
        return pricingService.uploadPricingFeed(file);
    }

    @PutMapping("/pricing/{id}")
    public PricingRecord updatePricingRecord(@PathVariable Long id, @RequestBody PricingRecord pricingRecord) {
        return pricingService.updatePricingRecord(id, pricingRecord);
    }

    @GetMapping("/pricing")
    public List<PricingRecord> searchPricingRecords(@RequestParam(required = false) String search) {
        return pricingService.searchPricingRecords(search);
    }
}
