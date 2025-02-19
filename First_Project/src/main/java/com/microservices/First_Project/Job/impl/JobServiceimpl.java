package com.microservices.First_Project.Job.impl;
import com.microservices.First_Project.Job.*;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class JobServiceimpl implements JobService {
    private List<Job> jobs;
    private Long nextId = 1L;

    public JobServiceimpl(List<Job> jobs) {
        this.jobs = jobs;
    }

    @Override
    public List<Job> findAll() {
        return jobs;
    }

    @Override
    public int count() {
        return jobs.size();
    }

    @Override
    public String create(Job job) {
        job.setId(nextId++);
        jobs.add(job);
        return "Job Successfully Added";
    }

    @Override
    public Job findById(Long id) {
        for (Job job : jobs) {
            if (job.getId() == id) {
                return job;
            }
        }
        return null;
    }
}
