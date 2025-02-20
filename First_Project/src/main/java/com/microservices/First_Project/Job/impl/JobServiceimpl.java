package com.microservices.First_Project.Job.impl;
import com.microservices.First_Project.Job.*;

import java.security.cert.PKIXRevocationChecker.Option;
import java.util.List;

import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class JobServiceimpl implements JobService {
    // private List<Job> jobs;
    
    // public JobServiceimpl(List<Job> jobs) {
    //     this.jobs = jobs;
    // }

    JobRepository jobRepository;
    public JobServiceimpl(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @Override
    public List<Job> findAll() {
        return jobRepository.findAll();
    }

    @Override
    public int count() {
        return jobRepository.findAll().size();
    }

    @Override
    public String create(Job job) {
        jobRepository.save(job);
        return "Job Successfully Added";
    }

    @Override
    public Job findById(Long id) {
        return jobRepository.findById(id).orElse(null);
    }

    @Override
    public boolean deleteJobById(Long id) {
        try {
            jobRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateJobById(Long id, Job job) {
        Optional<Job> jobOptional = jobRepository.findById(id);
        for (Job j : jobs) {
            if (j.getId() == id) {
                j.setTitle(job.getTitle());
                j.setDescription(job.getDescription());
                j.setLocation(job.getLocation());
                j.setMinSalary(job.getMinSalary());
                j.setMaxSalary(job.getMaxSalary());
                return true;
            }
        }
        return false;
    }
}
