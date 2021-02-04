# demo

This application was generated using JHipster 6.10.5, you can find documentation and help at [https://www.jhipster.tech/documentation-archive/v6.10.5](https://www.jhipster.tech/documentation-archive/v6.10.5).

## Objective

UI (Angular/React)
===
- Customer Entity
  Columns: Firstname, middle name, lastname, phone number, email and date of birth
  Add validations on create customer screen
- [x] First name, middle name, lastname should only be alphabets
- [x] Phone number should be a valid singapore phone number
- [x] Email should be a valid email
- [x] Date of birth should only allow past values. Present or future should not be allowed

- Customer Account Entity
- [x] Design entity and validations based on your experience
- [x] One customer may have more than 1 accout

* Account transactions entity
- [x] Design entity and validations based on your experience
- [x] Allow adding deposits and submit withdrawls

- [x] Integrate with keycloak using OAuth2 for login authentication

* Provide Open APIs for
- [x] Input Customer ID; able to retreive account balances for all accounts for that customer
- [x] Input customer ID, Account able to retreive account balances for that account

- [x] Home screen to have a bar chart to show chart for last 50 years
    * X-Axis - year of birth
    * Y-Axis - count of customers with having the year of birth

Batch jobs
- [ ] Create a batch job to calculate interest;

## Run-book

Congratulations! You've selected an excellent way to secure your JHipster application. If you're not sure what OAuth and OpenID Connect (OIDC) are, please see [What the Heck is OAuth?](https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth)

To log in to your app, you'll need to have [Keycloak](https://keycloak.org) up and running. The JHipster Team has created a Docker container for you that has the default users and roles. Start Keycloak using the following command.

```
CREATE SCHEMA `demo` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;

mkdir demo & cd demo

jhipster
? Which *type* of application would you like to create? Monolithic application (recommended for simple projects)
? [Beta] Do you want to make it reactive with Spring WebFlux? No
? What is the base name of your application? demo
? What is your default Java package name? com.company.demo
? Do you want to use the JHipster Registry to configure, monitor and scale your application? No
? Which *type* of authentication would you like to use? OAuth 2.0 / OIDC Authentication (stateful, works with Keycloak and Okta)
? Which *type* of database would you like to use? SQL (H2, MySQL, MariaDB, PostgreSQL, Oracle, MSSQL)
? Which *production* database would you like to use? MySQL
? Which *development* database would you like to use? MySQL
? Do you want to use the Spring cache abstraction? No - Warning, when using an SQL database, this will disable the Hibernate 2nd level cache!
? Would you like to use Maven or Gradle for building the backend? Maven
? Which other technologies would you like to use? 
? Which *Framework* would you like to use for the client? React
? Would you like to use a Bootswatch theme (https://bootswatch.com/)? Cosmo
? Choose a Bootswatch variant navbar theme (https://bootswatch.com/)? Primary
? Would you like to enable internationalization support? Yes
? Please choose the native language of the application English
? Please choose additional languages to install Chinese (Simplified)
? Besides JUnit and Jest, which testing frameworks would you like to use? 
? Would you like to install other generators from the JHipster Marketplace? Yes
? Which other modules would you like to use?

docker-compose -f src/main/docker/keycloak.yml up

```

Update MySQL password in application-dev.yml

Start application
```
./mvnw
```

### Create and import JDL

```
jhipster import-jdl jhipster-jdl.jdl

```

### Frontend Debug

```
npm start

```
