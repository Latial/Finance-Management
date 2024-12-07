package com.example.service.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HistoryResponse {

    private Long id;
    private Date date;
    private String expendName;
    private String expendPrice;
    private ExpendTypeResponse type;
}
