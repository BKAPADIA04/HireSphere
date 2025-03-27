package com.microservices.First_Project.Company;

import java.util.List;

public interface CompanyService {
    List<Company> getAllCompanies();
    boolean updateCompany(Company company, Long id); 
    void createCompany(Company company);
    boolean deleteCompanyById(Long id); // Added deleteCompany method
    Company getCompanyById(Long id); // Added getCompanyById method
}
