"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Job, Employee, Review, ApiError } from "@/lib/types"
import ReviewForm from "./review-form"
import { Badge } from "@/components/ui/badge"
import { StarIcon, Loader2, AlertCircle } from "lucide-react"
import { jobsApi, employeesApi, reviewsApi } from "@/lib/api"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch jobs, employees, and reviews in parallel
        const [jobsData, employeesData, reviewsData] = await Promise.all([
          jobsApi.getAll(),
          employeesApi.getAll(),
          reviewsApi.getAll(),
        ])

        setJobs(jobsData)
        setEmployees(employeesData)
        setReviews(reviewsData)
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError.message || "Failed to fetch data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleReviewAdded = async (newReview: Review) => {
    // Refresh reviews after adding a new one
    try {
      const reviewsData = await reviewsApi.getAll()
      setReviews(reviewsData)
      setSelectedJobId(null)
    } catch (err) {
      const apiError = err as ApiError
      console.error("Failed to refresh reviews:", apiError.message)
    }
  }

  const getJobReviews = (jobId: number) => {
    return reviews
      .filter((review) => review.jobId === jobId)
      .map((review) => {
        // Find employee name for this review
        const employee = employees.find((emp) => emp.id === review.employeeId)
        return {
          ...review,
          employeeName: employee?.name || "Unknown Employee",
        }
      })
  }

  const getJobEmployees = (jobId: number) => {
    return employees.filter((employee) => employee.jobId === jobId)
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <StarIcon key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
      ))
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>Loading job listings...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-8">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold mb-2">No Jobs Available</h2>
        <p className="text-muted-foreground">Please add jobs using the Jobs tab.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Available Jobs</h2>

      {jobs.map((job) => {
        const jobReviews = getJobReviews(job.id)
        const jobEmployees = getJobEmployees(job.id)
        const averageRating =
          jobReviews.length > 0 ? jobReviews.reduce((sum, review) => sum + review.rating, 0) / jobReviews.length : 0

        return (
          <Card key={job.id} className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>
                    {job.company} • {job.location}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-green-600 bg-green-50">
                  ${job.salary.toLocaleString()}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{job.description}</p>
              </div>

              {job.requirements && (
                <div>
                  <h3 className="font-medium mb-2">Requirements</h3>
                  <p className="text-sm text-muted-foreground">{job.requirements}</p>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Reviews</h3>
                  {jobReviews.length > 0 && (
                    <div className="flex items-center gap-1">
                      {renderStars(Math.round(averageRating))}
                      <span className="text-sm ml-1">({averageRating.toFixed(1)})</span>
                    </div>
                  )}
                </div>

                {jobReviews.length > 0 ? (
                  <div className="space-y-3">
                    {jobReviews.map((review) => (
                      <div key={review.id} className="bg-muted p-3 rounded-md">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-sm">{review.employeeName}</span>
                          <div className="flex">{renderStars(review.rating)}</div>
                        </div>
                        <p className="text-sm">{review.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No reviews yet.</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex-col items-start gap-4">
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Employees</h3>
                  <Badge variant="outline">{jobEmployees.length}</Badge>
                </div>

                {jobEmployees.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {jobEmployees.map((employee) => (
                      <Badge key={employee.id} variant="secondary">
                        {employee.name}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No employees registered for this job yet.</p>
                )}
              </div>

              {selectedJobId === job.id ? (
                <div className="w-full">
                  <h3 className="font-medium mb-2">Add a Review</h3>
                  <ReviewForm jobId={job.id} onSubmit={handleReviewAdded} onCancel={() => setSelectedJobId(null)} />
                </div>
              ) : (
                <Button variant="outline" onClick={() => setSelectedJobId(job.id)}>
                  Add Review
                </Button>
              )}
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

