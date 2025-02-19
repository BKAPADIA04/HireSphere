package com.microservices.First_Project.Job;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JobController {
    
    private JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> findAll() {
        return new ResponseEntity<>(jobService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/jobs/count")
    public ResponseEntity<Integer> count() {
        return new ResponseEntity<>(jobService.count(), HttpStatus.OK);
    }

    @PostMapping("/jobs/add")
    public ResponseEntity<String> create(@RequestBody Job job) {
        jobService.create(job);
        return new ResponseEntity<>("Job Successfully Added", HttpStatus.OK);
    }

    @GetMapping("/jobs/{id}") 
    public ResponseEntity<Job> findById(@PathVariable Long id) {
        Job job =  jobService.findById(id);
        if(job != null) {
            return new ResponseEntity<>(job, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
