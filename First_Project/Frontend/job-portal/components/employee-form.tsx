"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { jobsApi, employeesApi } from "@/lib/api"
import type { Job, ApiError } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function EmployeeForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    jobId: "",
  })
  const [jobs, setJobs] = useState<Job[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        setFetchError(null)
        const jobsData = await jobsApi.getAll()
        setJobs(jobsData)
      } catch (err) {
        const apiError = err as ApiError
        setFetchError(apiError.message || "Failed to fetch jobs")
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null) // Clear error when user starts typing
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, jobId: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.jobId) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      await employeesApi.create({
        ...formData,
        jobId: Number.parseInt(formData.jobId),
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        skills: "",
        jobId: "",
      })

      toast({
        title: "Success",
        description: "Employee has been registered successfully",
      })
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)

      toast({
        title: "Error",
        description: apiError.message || "Failed to register employee. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register as an Employee</CardTitle>
        <CardDescription>Enter your details to register for a job</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error.message}
                {error.errors && (
                  <ul className="mt-2 text-sm">
                    {Object.entries(error.errors).map(([field, message]) => (
                      <li key={field}>
                        {field}: {message}
                      </li>
                    ))}
                  </ul>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <Textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="List your skills, separated by commas..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobId">Select a Job *</Label>
            {isLoading ? (
              <div className="flex items-center justify-center p-4 border rounded-md">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <span>Loading jobs...</span>
              </div>
            ) : fetchError ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{fetchError}</AlertDescription>
              </Alert>
            ) : jobs.length > 0 ? (
              <Select value={formData.jobId} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a job" />
                </SelectTrigger>
                <SelectContent>
                  {jobs.map((job) => (
                    <SelectItem key={job.id} value={job.id.toString()}>
                      {job.title} at {job.company} - {job.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="text-sm text-muted-foreground p-2 border rounded-md">
                No jobs available. Please add jobs first.
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting || isLoading || jobs.length === 0}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

