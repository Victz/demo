package com.company.demo.repository;

import com.company.demo.domain.AccountTransaction;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AccountTransaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountTransactionRepository extends JpaRepository<AccountTransaction, Long> {
}
