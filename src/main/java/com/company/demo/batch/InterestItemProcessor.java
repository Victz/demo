package com.company.demo.batch;

import com.company.demo.config.Constants;
import com.company.demo.domain.CustomerAccount;
import java.math.BigDecimal;
import org.springframework.batch.item.ItemProcessor;

public class InterestItemProcessor implements ItemProcessor<CustomerAccount, CustomerAccount> {

    @Override
    public CustomerAccount process(CustomerAccount account) throws Exception {

        BigDecimal interest = account.getBalance().multiply(Constants.INTEREST_RATE);
        account.setBalance(account.getBalance().add(interest));
        return account;
    }

}
