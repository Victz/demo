package com.company.demo.web.rest;

import com.company.demo.DemoApp;
import com.company.demo.config.TestSecurityConfiguration;
import com.company.demo.domain.AccountTransaction;
import com.company.demo.repository.AccountTransactionRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AccountTransactionResource} REST controller.
 */
@SpringBootTest(classes = { DemoApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class AccountTransactionResourceIT {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

    private static final LocalDate DEFAULT_TRANSACTION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TRANSACTION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_UPDATE_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATE_BY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_UPDATE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_UPDATE_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private AccountTransactionRepository accountTransactionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAccountTransactionMockMvc;

    private AccountTransaction accountTransaction;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountTransaction createEntity(EntityManager em) {
        AccountTransaction accountTransaction = new AccountTransaction()
            .type(DEFAULT_TYPE)
            .amount(DEFAULT_AMOUNT)
            .transactionDate(DEFAULT_TRANSACTION_DATE)
            .status(DEFAULT_STATUS)
            .createdBy(DEFAULT_CREATED_BY)
            .createDate(DEFAULT_CREATE_DATE)
            .updateBy(DEFAULT_UPDATE_BY)
            .updateDate(DEFAULT_UPDATE_DATE);
        return accountTransaction;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountTransaction createUpdatedEntity(EntityManager em) {
        AccountTransaction accountTransaction = new AccountTransaction()
            .type(UPDATED_TYPE)
            .amount(UPDATED_AMOUNT)
            .transactionDate(UPDATED_TRANSACTION_DATE)
            .status(UPDATED_STATUS)
            .createdBy(UPDATED_CREATED_BY)
            .createDate(UPDATED_CREATE_DATE)
            .updateBy(UPDATED_UPDATE_BY)
            .updateDate(UPDATED_UPDATE_DATE);
        return accountTransaction;
    }

    @BeforeEach
    public void initTest() {
        accountTransaction = createEntity(em);
    }

    @Test
    @Transactional
    public void createAccountTransaction() throws Exception {
        int databaseSizeBeforeCreate = accountTransactionRepository.findAll().size();
        // Create the AccountTransaction
        restAccountTransactionMockMvc.perform(post("/api/account-transactions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accountTransaction)))
            .andExpect(status().isCreated());

        // Validate the AccountTransaction in the database
        List<AccountTransaction> accountTransactionList = accountTransactionRepository.findAll();
        assertThat(accountTransactionList).hasSize(databaseSizeBeforeCreate + 1);
        AccountTransaction testAccountTransaction = accountTransactionList.get(accountTransactionList.size() - 1);
        assertThat(testAccountTransaction.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testAccountTransaction.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testAccountTransaction.getTransactionDate()).isEqualTo(DEFAULT_TRANSACTION_DATE);
        assertThat(testAccountTransaction.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testAccountTransaction.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testAccountTransaction.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testAccountTransaction.getUpdateBy()).isEqualTo(DEFAULT_UPDATE_BY);
        assertThat(testAccountTransaction.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createAccountTransactionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = accountTransactionRepository.findAll().size();

        // Create the AccountTransaction with an existing ID
        accountTransaction.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountTransactionMockMvc.perform(post("/api/account-transactions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accountTransaction)))
            .andExpect(status().isBadRequest());

        // Validate the AccountTransaction in the database
        List<AccountTransaction> accountTransactionList = accountTransactionRepository.findAll();
        assertThat(accountTransactionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = accountTransactionRepository.findAll().size();
        // set the field null
        accountTransaction.setType(null);

        // Create the AccountTransaction, which fails.


        restAccountTransactionMockMvc.perform(post("/api/account-transactions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accountTransaction)))
            .andExpect(status().isBadRequest());

        List<AccountTransaction> accountTransactionList = accountTransactionRepository.findAll();
        assertThat(accountTransactionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = accountTransactionRepository.findAll().size();
        // set the field null
        accountTransaction.setAmount(null);

        // Create the AccountTransaction, which fails.


        restAccountTransactionMockMvc.perform(post("/api/account-transactions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accountTransaction)))
            .andExpect(status().isBadRequest());

        List<AccountTransaction> accountTransactionList = accountTransactionRepository.findAll();
        assertThat(accountTransactionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTransactionDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = accountTransactionRepository.findAll().size();
        // set the field null
        accountTransaction.setTransactionDate(null);

        // Create the AccountTransaction, which fails.


        restAccountTransactionMockMvc.perform(post("/api/account-transactions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accountTransaction)))
            .andExpect(status().isBadRequest());

        List<AccountTransaction> accountTransactionList = accountTransactionRepository.findAll();
        assertThat(accountTransactionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = accountTransactionRepository.findAll().size();
        // set the field null
        accountTransaction.setStatus(null);

        // Create the AccountTransaction, which fails.


        restAccountTransactionMockMvc.perform(post("/api/account-transactions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accountTransaction)))
            .andExpect(status().isBadRequest());

        List<AccountTransaction> accountTransactionList = accountTransactionRepository.findAll();
        assertThat(accountTransactionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAccountTransactions() throws Exception {
        // Initialize the database
        accountTransactionRepository.saveAndFlush(accountTransaction);

        // Get all the accountTransactionList
        restAccountTransactionMockMvc.perform(get("/api/account-transactions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accountTransaction.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].transactionDate").value(hasItem(DEFAULT_TRANSACTION_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY)))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateBy").value(hasItem(DEFAULT_UPDATE_BY)))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getAccountTransaction() throws Exception {
        // Initialize the database
        accountTransactionRepository.saveAndFlush(accountTransaction);

        // Get the accountTransaction
        restAccountTransactionMockMvc.perform(get("/api/account-transactions/{id}", accountTransaction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(accountTransaction.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.transactionDate").value(DEFAULT_TRANSACTION_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.updateBy").value(DEFAULT_UPDATE_BY))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAccountTransaction() throws Exception {
        // Get the accountTransaction
        restAccountTransactionMockMvc.perform(get("/api/account-transactions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAccountTransaction() throws Exception {
        // Initialize the database
        accountTransactionRepository.saveAndFlush(accountTransaction);

        int databaseSizeBeforeUpdate = accountTransactionRepository.findAll().size();

        // Update the accountTransaction
        AccountTransaction updatedAccountTransaction = accountTransactionRepository.findById(accountTransaction.getId()).get();
        // Disconnect from session so that the updates on updatedAccountTransaction are not directly saved in db
        em.detach(updatedAccountTransaction);
        updatedAccountTransaction
            .type(UPDATED_TYPE)
            .amount(UPDATED_AMOUNT)
            .transactionDate(UPDATED_TRANSACTION_DATE)
            .status(UPDATED_STATUS)
            .createdBy(UPDATED_CREATED_BY)
            .createDate(UPDATED_CREATE_DATE)
            .updateBy(UPDATED_UPDATE_BY)
            .updateDate(UPDATED_UPDATE_DATE);

        restAccountTransactionMockMvc.perform(put("/api/account-transactions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAccountTransaction)))
            .andExpect(status().isOk());

        // Validate the AccountTransaction in the database
        List<AccountTransaction> accountTransactionList = accountTransactionRepository.findAll();
        assertThat(accountTransactionList).hasSize(databaseSizeBeforeUpdate);
        AccountTransaction testAccountTransaction = accountTransactionList.get(accountTransactionList.size() - 1);
        assertThat(testAccountTransaction.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testAccountTransaction.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testAccountTransaction.getTransactionDate()).isEqualTo(UPDATED_TRANSACTION_DATE);
        assertThat(testAccountTransaction.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testAccountTransaction.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testAccountTransaction.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testAccountTransaction.getUpdateBy()).isEqualTo(UPDATED_UPDATE_BY);
        assertThat(testAccountTransaction.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingAccountTransaction() throws Exception {
        int databaseSizeBeforeUpdate = accountTransactionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountTransactionMockMvc.perform(put("/api/account-transactions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accountTransaction)))
            .andExpect(status().isBadRequest());

        // Validate the AccountTransaction in the database
        List<AccountTransaction> accountTransactionList = accountTransactionRepository.findAll();
        assertThat(accountTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAccountTransaction() throws Exception {
        // Initialize the database
        accountTransactionRepository.saveAndFlush(accountTransaction);

        int databaseSizeBeforeDelete = accountTransactionRepository.findAll().size();

        // Delete the accountTransaction
        restAccountTransactionMockMvc.perform(delete("/api/account-transactions/{id}", accountTransaction.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AccountTransaction> accountTransactionList = accountTransactionRepository.findAll();
        assertThat(accountTransactionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
