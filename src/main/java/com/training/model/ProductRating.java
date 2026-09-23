package com.training.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.math.BigDecimal;

@Embeddable  //ye anotation btata h ki ye class dusre clas me as object use higa like HSA a relationship 
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRating {

    @Column(
            name = "rating_rate",
            precision = 3,
            scale = 2
    )
    private BigDecimal rate;

    @Column(name = "rating_count")
    private Integer count;
}