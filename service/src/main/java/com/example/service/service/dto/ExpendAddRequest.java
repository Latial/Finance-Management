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
public class ExpendAddRequest {
    @NotNull
    private Long user_id;
    private Long expend_id;
}
