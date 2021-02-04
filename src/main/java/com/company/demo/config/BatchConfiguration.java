package com.company.demo.config;

import com.company.demo.batch.JobCompletionNotificationListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;

@Configuration
@EnableBatchProcessing
public class BatchConfiguration {

    private static final Logger log = LoggerFactory.getLogger(BatchConfiguration.class);

    @Autowired
    public JobBuilderFactory jobBuilderFactory;

    @Autowired
    public StepBuilderFactory stepBuilderFactory;

//    @Autowired
//    private CustomerAccountRepository customerAccountRepository;
    @Bean
    public Job interestCalculationJob(JobCompletionNotificationListener listener) {
        return jobBuilderFactory.get("interestCalculationJob")
                .listener(listener).start(taskletStep()).build();
    }

    @Bean
    public Step taskletStep() {
        return stepBuilderFactory.get("taskletStep")
                .tasklet(tasklet())
                .build();
    }

    @Bean
    public Tasklet tasklet() {
        return (contribution, chunkContext) -> {
            log.debug("InterestTasklet is running");

            System.out.println("1111");

//            List<CustomerAccount> accountList = customerAccountRepository.findAll();
//            accountList.forEach(account -> {
//                log.debug(account.getBalance().toString());
//            });
            //        BigDecimal interest = account.getBalance().multiply(Constants.INTEREST_RATE);
//        account.setBalance(account.getBalance().add(interest));
            return RepeatStatus.FINISHED;
        };
    }

//    @Bean
//    public JpaPagingItemReader itemReader() {
//        return new JpaPagingItemReaderBuilder<CustomerAccount>().
//            .name("creditReader")
//            .entityManagerFactory()
//            .entityManagerFactory(entityManagerFactory())
//            .queryString("select c from CustomerCredit c")
//            .pageSize(1000)
//            .build();
//    }


//    @Bean
//    public InterestItemProcessor processor() {
//        return new InterestItemProcessor();
//    }

//	@Bean
//	public JdbcBatchItemWriter<CustomerAccount> writer(DataSource dataSource) {
//		return new JdbcBatchItemWriterBuilder<CustomerAccount>()
//			.itemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>())
//			.sql("INSERT INTO people (first_name, last_name) VALUES (:firstName, :lastName)")
//			.dataSource(dataSource)
//			.build();
//	}

//	@Bean
//	public Step step1(JdbcBatchItemWriter<CustomerAccount> writer) {
//		return stepBuilderFactory.get("step1")
//			.<CustomerAccount, CustomerAccount> chunk(10)
//			.reader(reader())
//			.processor(processor())
//			.writer(writer)
//			.build();
//	}
    // end::jobstep[]
}
