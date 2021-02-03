package com.company.demo.repository;

import com.company.demo.domain.Customer;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data  repository for the Customer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query("SELECT c FROM Customer c left join fetch c.customerAccounts a WHERE c.id = ?1")
    Optional<Customer> queryAccountBalance(Long customerId);

    @Query("SELECT c FROM Customer c left join fetch c.customerAccounts a WHERE c.id = ?1 and a.id = ?2")
    Optional<Customer> queryAccountBalance(Long customerId, Long accountId);
}
