package com.example.service.service.dto;
import com.example.service.domain.ExpendType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExpendAloneRequest {
    @NotNull
    private String name;
    @NotNull
    private Double price;
    @NotNull
    private String typeName;
    @NotNull
    private String userId;
}
