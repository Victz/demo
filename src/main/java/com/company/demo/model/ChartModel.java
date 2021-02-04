package com.company.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"category", "data"})
public class ChartModel {

    @JsonProperty("category")
    private Long category;

    @JsonProperty("data")
    private Long data;

    public ChartModel(Long category, Long data) {
        this.category = category;
        this.data=data;
    }

    public Long getCategory() {
        return category;
    }

    public void setCategory(Long category) {
        this.category = category;
    }

    public Long getData() {
        return data;
    }

    public void setData(Long data) {
        this.data = data;
    }
}
