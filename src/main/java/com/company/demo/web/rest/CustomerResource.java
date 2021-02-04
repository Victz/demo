package com.company.demo.web.rest;

import com.company.demo.domain.Customer;
import com.company.demo.domain.CustomerAccount;
import com.company.demo.model.AccountModel;
import com.company.demo.model.BalanceRequestModel;
import com.company.demo.model.BalanceResponseModel;
import com.company.demo.model.ChartModel;
import com.company.demo.model.CustomerModel;
import com.company.demo.repository.CustomerRepository;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.company.demo.domain.Customer}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CustomerResource {

    private final Logger log = LoggerFactory.getLogger(CustomerResource.class);

    private static final String ENTITY_NAME = "customer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CustomerRepository customerRepository;

    public CustomerResource(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    /**
     * {@code POST  /customers} : Create a new customer.
     *
     * @param customer the customer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new customer, or with status {@code 400 (Bad Request)} if the customer has already an
     * ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/customers")
    public ResponseEntity<Customer> createCustomer(@Valid @RequestBody Customer customer) throws URISyntaxException {
        log.debug("REST request to save Customer : {}", customer);
        if (customer.getId() != null) {
            throw new BadRequestAlertException("A new customer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Customer result = customerRepository.save(customer);
        return ResponseEntity.created(new URI("/api/customers/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /customers} : Updates an existing customer.
     *
     * @param customer the customer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated customer, or with status {@code 400 (Bad Request)} if the customer is not valid, or
     * with status {@code 500 (Internal Server Error)} if the customer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/customers")
    public ResponseEntity<Customer> updateCustomer(@Valid @RequestBody Customer customer) throws URISyntaxException {
        log.debug("REST request to update Customer : {}", customer);
        if (customer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Customer result = customerRepository.save(customer);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, customer.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /customers} : get all the customers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of customers in body.
     */
    @GetMapping("/customers")
    public List<Customer> getAllCustomers() {
        log.debug("REST request to get all Customers");
        return customerRepository.findAll();
    }

    /**
     * {@code GET  /customers/:id} : get the "id" customer.
     *
     * @param id the id of the customer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the customer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/customers/{id}")
    public ResponseEntity<Customer> getCustomer(@PathVariable Long id) {
        log.debug("REST request to get Customer : {}", id);
        Optional<Customer> customer = customerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(customer);
    }

    /**
     * {@code DELETE  /customers/:id} : delete the "id" customer.
     *
     * @param id the id of the customer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/customers/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        log.debug("REST request to delete Customer : {}", id);
        customerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code POST  /customer/balance : get balance from customer Accounts.
     *
     * @param requestModel provide the customer id or account id to retrieve the balance.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of customerAccounts balance.
     */
    @PostMapping("/customer/balance")
    public ResponseEntity<BalanceResponseModel> queryCustomerAccountBalance(@RequestBody BalanceRequestModel requestModel) {
        log.debug("REST request to list balance for BalanceRequestModel: {}", requestModel);
        if (requestModel.getCustomerId() == null) {
            throw new BadRequestAlertException("customerId must not empty", ENTITY_NAME, "missingcustomerid");
        }
        Optional<Customer> customer = null;

        if (requestModel.getAccountId() == null) {
            customer = customerRepository.queryAccountBalance(requestModel.getCustomerId());
        } else {
            customer = customerRepository.queryAccountBalance(requestModel.getCustomerId(), requestModel.getAccountId());
        }

        if (customer == null || customer.isEmpty()) {
            throw new BadRequestAlertException("No record found", ENTITY_NAME, "norecord");
        }

        //Map from domain to model, recommend to use mapstruct
        List<AccountModel> accounts = new ArrayList<>();
        for (CustomerAccount account : customer.get().getCustomerAccounts()) {
            AccountModel accountModel = new AccountModel();
            accountModel.setId(account.getId());
            accountModel.setAccountName(account.getAccountName());
            accountModel.setAccountNumber(account.getAccountNumber());
            accountModel.setCurrency(account.getCurrency());
            accountModel.setBalance(account.getBalance());
            accounts.add(accountModel);
        }

        CustomerModel customerModel = new CustomerModel();
        customerModel.setId(customer.get().getId());
        customerModel.setCifNumber(customer.get().getCifNumber());
        customerModel.setFirstName(customer.get().getFirstName());
        customerModel.setMiddleName(customer.get().getMiddleName());
        customerModel.setLastName(customer.get().getLastName());
        customerModel.setAccountList(accounts);

        BalanceResponseModel responseModel = new BalanceResponseModel();
        responseModel.setCustomer(customerModel);

        // header fields recommend to manage in filter
        return ResponseEntity.ok().header("Applicaiton ", applicationName).body(responseModel);
    }

    /**
     * {@code GET  /customers/chart} : Query Customer DateOfBirth chart
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ChartModel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/customer/chart")
    public List<ChartModel> getChart() {
        log.debug("REST request to query Customer DateOfBirth chart");
        List<ChartModel> chartModels = customerRepository.getChart();
        return customerRepository.getChart();
    }
}
