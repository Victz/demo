package com.company.demo.repository;

import com.company.demo.domain.Customer;
import com.company.demo.domain.CustomerAccount;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the CustomerAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerAccountRepository extends JpaRepository<CustomerAccount, Long> {

    @Query("SELECT a FROM CustomerAccount a WHERE a.customer = ?1")
    List<CustomerAccount> findAccountByCustomer(Customer customer);
}
