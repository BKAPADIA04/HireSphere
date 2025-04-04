package com.microservices.First_Project.Review.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.microservices.First_Project.Company.Company;
import com.microservices.First_Project.Company.CompanyService;
import com.microservices.First_Project.Review.Review;
import com.microservices.First_Project.Review.ReviewRepository;
import com.microservices.First_Project.Review.ReviewService;

@Service
public class ReviewServiceimpl implements ReviewService{

    private final ReviewRepository reviewRepository;
    private final CompanyService companyService;

    public ReviewServiceimpl(ReviewRepository reviewRepository, CompanyService companyService) {
        this.reviewRepository = reviewRepository;
        this.companyService = companyService;
    }

    @Override
    public List<Review> getAllReviewsByCompanyId(Long companyId) {
        List<Review> reviews = reviewRepository.findByCompanyId(companyId);
        return reviews;
    }

    @Override
    public boolean addReview(Long companyId, Review review) {
        Company company = companyService.getCompanyById(companyId);
        if (company != null) {
            review.setCompany(company);
            reviewRepository.save(review);
            return true;
        }
        else {
            return false;
        }
    }

    @Override
    public Review getReviewById(Long companyId, Long reviewId) {
        List<Review> reviews = reviewRepository.findByCompanyId(companyId);
        return reviews.stream()
                .filter(review -> review.getId().equals(reviewId))
                .findFirst()
                .orElse(null);
    }

    @Override
    public boolean updateReview(Long companyId, Long reviewId, Review review) {
        List<Review> reviews = reviewRepository.findByCompanyId(companyId);
        Review existingReview = reviews.stream()
                .filter(r -> r.getId().equals(reviewId))
                .findFirst()
                .orElse(null);

        if (existingReview != null) {
            existingReview.setTitle(review.getTitle());
            existingReview.setDescription(review.getDescription());
            existingReview.setRating(review.getRating());
            reviewRepository.save(existingReview);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean deleteReview(Long companyId, Long reviewId) {
        List<Review> reviews = reviewRepository.findByCompanyId(companyId);
        Review existingReview = reviews.stream()
                .filter(r -> r.getId().equals(reviewId))
                .findFirst()
                .orElse(null);

        if (existingReview != null) {
            reviewRepository.delete(existingReview);
            return true;
        } else {
            return false;
        }
    }
    
}