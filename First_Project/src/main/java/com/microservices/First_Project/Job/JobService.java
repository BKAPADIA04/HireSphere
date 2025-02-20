package com.microservices.First_Project.Job;

import java.util.List;

public interface JobService {
    List<Job> findAll();
    int count();
    String create(Job job);
    Job findById(Long id);
    boolean deleteJobById(Long id);
    boolean updateJobById(Long id, Job job);
}