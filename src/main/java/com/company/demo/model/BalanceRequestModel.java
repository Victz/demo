package com.company.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BalanceRequestModel {

    @JsonProperty("customerId")
    private Long customerId;

    @JsonProperty("accountId")
    private Long accountId;

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }
}
