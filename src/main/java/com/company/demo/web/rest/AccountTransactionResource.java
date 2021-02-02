package com.company.demo.web.rest;

import com.company.demo.domain.AccountTransaction;
import com.company.demo.repository.AccountTransactionRepository;
import com.company.demo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.company.demo.domain.AccountTransaction}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AccountTransactionResource {

    private final Logger log = LoggerFactory.getLogger(AccountTransactionResource.class);

    private static final String ENTITY_NAME = "accountTransaction";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AccountTransactionRepository accountTransactionRepository;

    public AccountTransactionResource(AccountTransactionRepository accountTransactionRepository) {
        this.accountTransactionRepository = accountTransactionRepository;
    }

    /**
     * {@code POST  /account-transactions} : Create a new accountTransaction.
     *
     * @param accountTransaction the accountTransaction to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new accountTransaction, or with status {@code 400 (Bad Request)} if the accountTransaction has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/account-transactions")
    public ResponseEntity<AccountTransaction> createAccountTransaction(@Valid @RequestBody AccountTransaction accountTransaction) throws URISyntaxException {
        log.debug("REST request to save AccountTransaction : {}", accountTransaction);
        if (accountTransaction.getId() != null) {
            throw new BadRequestAlertException("A new accountTransaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AccountTransaction result = accountTransactionRepository.save(accountTransaction);
        return ResponseEntity.created(new URI("/api/account-transactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /account-transactions} : Updates an existing accountTransaction.
     *
     * @param accountTransaction the accountTransaction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated accountTransaction,
     * or with status {@code 400 (Bad Request)} if the accountTransaction is not valid,
     * or with status {@code 500 (Internal Server Error)} if the accountTransaction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/account-transactions")
    public ResponseEntity<AccountTransaction> updateAccountTransaction(@Valid @RequestBody AccountTransaction accountTransaction) throws URISyntaxException {
        log.debug("REST request to update AccountTransaction : {}", accountTransaction);
        if (accountTransaction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AccountTransaction result = accountTransactionRepository.save(accountTransaction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, accountTransaction.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /account-transactions} : get all the accountTransactions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of accountTransactions in body.
     */
    @GetMapping("/account-transactions")
    public List<AccountTransaction> getAllAccountTransactions() {
        log.debug("REST request to get all AccountTransactions");
        return accountTransactionRepository.findAll();
    }

    /**
     * {@code GET  /account-transactions/:id} : get the "id" accountTransaction.
     *
     * @param id the id of the accountTransaction to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the accountTransaction, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/account-transactions/{id}")
    public ResponseEntity<AccountTransaction> getAccountTransaction(@PathVariable Long id) {
        log.debug("REST request to get AccountTransaction : {}", id);
        Optional<AccountTransaction> accountTransaction = accountTransactionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(accountTransaction);
    }

    /**
     * {@code DELETE  /account-transactions/:id} : delete the "id" accountTransaction.
     *
     * @param id the id of the accountTransaction to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/account-transactions/{id}")
    public ResponseEntity<Void> deleteAccountTransaction(@PathVariable Long id) {
        log.debug("REST request to delete AccountTransaction : {}", id);
        accountTransactionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
