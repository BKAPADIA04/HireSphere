package com.microservices.First_Project.Job;

public class Job {
    private Long id;
    private String title;
    private String description;
    private String location;
    private Double minSalary;
    private Double maxSalary;

    public Job(Long id,String title,String description,String location,Double minSalary,Double maxSalary) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.minSalary = minSalary;
        this.maxSalary = maxSalary;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getLocation() {
        return location;
    }

    public Double getMinSalary() {
        return minSalary;
    }

    public Double getMaxSalary() {
        return maxSalary;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setMinSalary(Double minSalary) {
        this.minSalary = minSalary;
    }

    public void setMaxSalary(Double maxSalary) {
        this.maxSalary = maxSalary;
    }
}
