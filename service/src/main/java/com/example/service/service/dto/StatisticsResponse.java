package com.example.service.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StatisticsResponse {
    private Long id;
    private Double biggestExpend;
    private Double smallestExpend;
    private Double monthlyExpend;
    private Double fixedCostsCount;
    private Double bigPurchasesCount;
    private Double flexibleCostsCount;
    private Double fixedCostsCountMonth;
    private Double flexibleCostsCountMonth;
    private Double bigPurchasesCountMonth;
    private Double smallestMonthlyPurchase;
}
