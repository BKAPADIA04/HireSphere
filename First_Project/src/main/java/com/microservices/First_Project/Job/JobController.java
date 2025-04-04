package com.microservices.First_Project.Job;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/jobs")
public class JobController {
    
    private JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<List<Job>> findAll() {
        return new ResponseEntity<>(jobService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> count() {
        return new ResponseEntity<>(jobService.count(), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> create(@RequestBody Job job) {
        jobService.create(job);
        return new ResponseEntity<>("Job Successfully Added", HttpStatus.OK);
    }

    @GetMapping("/delete/{id}") 
    public ResponseEntity<Job> findById(@PathVariable Long id) {
        Job job =  jobService.findById(id);
        if(job != null) {
            return new ResponseEntity<>(job, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        boolean deleted = jobService.deleteJobById(id);
        if(!deleted) {
            return new ResponseEntity<>("Job Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Job Successfully Deleted", HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    // @RequestMapping(value = "/jobs/update/{id}", method = RequestMethod.PUT)    
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody Job job) {
        boolean updated = jobService.updateJobById(id, job);
        if(!updated) {
            return new ResponseEntity<>("Job Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Job Successfully Updated", HttpStatus.OK);
    }
}
