package com.microservices.First_Project.Company;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    // This interface will automatically provide CRUD operations for the Company entity
    // You can add custom query methods here if needed
    
}
