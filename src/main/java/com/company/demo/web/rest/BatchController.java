package com.company.demo.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BatchController {

    private static final Logger log = LoggerFactory.getLogger(BatchController.class);

    @Autowired
    JobLauncher jobLauncher;

    @Autowired
    Job interestCalculationJob;

    /**
     * {@code GET  /batch/interest} : Trigger Interest Calculation Batch Job
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)}, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/batch/interest")
    public ResponseEntity<Void> triggerInterestCalculationJob() throws Exception {
        log.debug("REST request to trigger Interest Calculation Batch Job");
        jobLauncher.run(interestCalculationJob, new JobParameters());
        return ResponseEntity.ok().build();
    }
}
