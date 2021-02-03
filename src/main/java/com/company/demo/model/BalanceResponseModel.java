package com.company.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BalanceResponseModel {

    @JsonProperty("customer")
    private CustomerModel customer;

    public CustomerModel getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerModel customer) {
        this.customer = customer;
    }
}
