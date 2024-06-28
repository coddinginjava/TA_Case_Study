package com.tiger.analytics.retail_shop_app.service;


import com.tiger.analytics.retail_shop_app.entity.PricingRecord;
import com.tiger.analytics.retail_shop_app.repository.PricingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PricingService {


    private PricingRepository pricingRepository;

    public List<PricingRecord> uploadPricingFeed(MultipartFile file) {
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
            List<PricingRecord> records = reader.lines().skip(1).map(line -> {
                String[] fields = line.split(",");
                return new PricingRecord(Long.parseLong(fields[0]), fields[1], fields[2], Double.parseDouble(fields[3]), fields[4]);
            }).collect(Collectors.toList());
            return pricingRepository.saveAll(records);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse CSV file: " + e.getMessage());
        }
    }

    public PricingRecord updatePricingRecord(Long id, PricingRecord pricingRecord) {
        PricingRecord existingRecord = pricingRepository.findById(id).orElseThrow(() -> new RuntimeException("Record not found"));
        existingRecord.setSku(pricingRecord.getSku());
        existingRecord.setProductName(pricingRecord.getProductName());
        existingRecord.setPrice(pricingRecord.getPrice());
        existingRecord.setDate(pricingRecord.getDate());
        return pricingRepository.save(existingRecord);
    }


    public List<PricingRecord> searchPricingRecords(String search) {
        if (search == null || search.isEmpty()) {
            return pricingRepository.findAll();
        }
        return pricingRepository.findBySkuContainingIgnoreCaseOrProductNameContainingIgnoreCase(search, search);
    }
}
