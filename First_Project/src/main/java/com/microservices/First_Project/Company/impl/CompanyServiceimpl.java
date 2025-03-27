package com.microservices.First_Project.Company.impl;

import com.microservices.First_Project.Company.CompanyService;

import java.util.List;
import java.util.Optional;

import com.microservices.First_Project.Company.Company;
import com.microservices.First_Project.Company.CompanyRepository;

import org.springframework.stereotype.Service;

@Service
public class CompanyServiceimpl implements CompanyService{
    
    private CompanyRepository companyRepository;

    public CompanyServiceimpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public boolean updateCompany(Company company, Long id) {
        Optional<Company> companyOptional = companyRepository.findById(id);
        if (companyOptional.isEmpty()) {
            return false;
        }
        for (Company c : companyRepository.findAll()) {
            if (c.getId() == id) {
                c.setName(company.getName());
                c.setDescription(company.getDescription());
                c.setJobs(company.getJobs());
                companyRepository.save(c);
                return true;
            }
        }
        return false;
    }

    @Override
    public void createCompany(Company company) {
        companyRepository.save(company);
    }

    @Override
    public boolean deleteCompanyById(Long id) {
        Optional<Company> companyOptional = companyRepository.findById(id);
        if (companyOptional.isPresent()) {
            companyRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Company getCompanyById(Long id) {
        Optional<Company> companyOptional = companyRepository.findById(id);
        if (companyOptional.isPresent()) {
            return companyOptional.get();
        }
        return null;
    }
}
