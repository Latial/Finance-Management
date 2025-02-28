package com.example.service.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExpendResponse {
    private Long id;
    private String name;
    private String price;
    private Date date;

    private ExpendTypeResponse type;
}
