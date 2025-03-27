package com.microservices.First_Project.Company;

import java.util.List;

public interface CompanyService {
    List<Company> getAllCompanies();
    boolean updateCompany(Company company, Long id); 
    void createCompany(Company company);
}
