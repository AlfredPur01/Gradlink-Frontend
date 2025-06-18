"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Upload, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"

const nigerianUniversities = [
  "University of Lagos (UNILAG)",
  "University of Ibadan (UI)",
  "Obafemi Awolowo University (OAU)",
  "University of Nigeria, Nsukka (UNN)",
  "Ahmadu Bello University (ABU)",
  "University of Benin (UNIBEN)",
  "Lagos State University (LASU)",
  "Covenant University",
  "Babcock University",
  "Federal University of Technology, Akure (FUTA)",
  "Federal University of Technology, Owerri (FUTO)",
  "University of Port Harcourt (UNIPORT)",
  "Rivers State University",
  "Delta State University (DELSU)",
  "Nnamdi Azikiwe University (UNIZIK)",
  "Imo State University (IMSU)",
  "Federal University, Oye-Ekiti (FUOYE)",
  "University of Ilorin (UNILORIN)",
  "Kwara State University (KWASU)",
  "Landmark University",
  "Redeemer's University",
  "Pan-Atlantic University",
  "American University of Nigeria (AUN)",
  "Baze University",
  "University of Abuja (UNIABUJA)",
  "Nasarawa State University",
  "Benue State University",
  "University of Jos (UNIJOS)",
  "Federal University of Agriculture, Abeokuta (FUNAAB)",
  "Olabisi Onabanjo University (OOU)",
  "Tai Solarin University of Education (TASUED)",
  "Lagos State University of Science and Technology (LASUSTECH)",
  "Yaba College of Technology (YABATECH)",
  "Federal Polytechnic, Nekede",
  "Moshood Abiola Polytechnic (MAPOLY)",
  "Other",
]

// Generate year options
const currentYear = new Date().getFullYear()
const entryYears = Array.from({ length: 50 }, (_, i) => currentYear - i).map((year) => year.toString())
const graduationYears = Array.from({ length: 50 }, (_, i) => currentYear + 10 - i).map((year) => year.toString())

// Secondary school years attended options
const secondaryYearsOptions = [
  "2018-2024",
  "2017-2023",
  "2016-2022",
  "2015-2021",
  "2014-2020",
  "2013-2019",
  "2012-2018",
  "2011-2017",
  "2010-2016",
  "2009-2015",
  "2008-2014",
  "2007-2013",
  "2006-2012",
  "2005-2011",
  "2004-2010",
  "Other",
]

interface FormData {
  // Step 1: Personal Info
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  profilePicture: string | null

  // Step 2: Educational History
  institution: string
  course: string
  matricNumber: string
  entryYear: string
  graduationYear: string
  degree: string
  secondarySchool: string
  secondaryLocation: string
  secondaryYears: string

  // Step 3: Professional Info
  occupation: string
  company: string
  linkedin: string
  openToMentorship: boolean
  showProfilePublicly: boolean
  agreeToTerms: boolean
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  profilePicture: null,
  institution: "",
  course: "",
  matricNumber: "",
  entryYear: "",
  graduationYear: "",
  degree: "",
  secondarySchool: "",
  secondaryLocation: "",
  secondaryYears: "",
  occupation: "",
  company: "",
  linkedin: "",
  openToMentorship: false,
  showProfilePublicly: true,
  agreeToTerms: false,
}

const degrees = ["BSc", "BA", "BEng", "BTech", "HND", "MSc", "MA", "MEng", "MBA", "PhD", "Other"]

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { register, isLoading } = useAuth()
  const router = useRouter()

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
      if (!formData.password) newErrors.password = "Password is required"
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    if (step === 2) {
      if (!formData.institution.trim()) newErrors.institution = "Institution is required"
      if (!formData.course.trim()) newErrors.course = "Course is required"
      if (!formData.matricNumber.trim()) newErrors.matricNumber = "Matric number is required"
      if (!formData.entryYear) newErrors.entryYear = "Entry year is required"
      if (!formData.graduationYear) newErrors.graduationYear = "Graduation year is required"
      if (!formData.degree) newErrors.degree = "Degree is required"
      if (!formData.secondarySchool.trim()) newErrors.secondarySchool = "Secondary school is required"
    }

    if (step === 3) {
      if (!formData.occupation.trim()) newErrors.occupation = "Occupation is required"
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (validateStep(3)) {
      const success = await register(formData)
      if (success) {
        router.push("/dashboard")
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        updateFormData("profilePicture", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Card className="shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Join GradLink</CardTitle>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Step {currentStep} of 3</span>
                    <span className="text-sm text-gray-600">{Math.round((currentStep / 3) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-blue-600 h-2 rounded-full"
                      initial={{ width: "33%" }}
                      animate={{ width: `${(currentStep / 3) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>

                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => updateFormData("fullName", e.target.value)}
                          placeholder="Enter your full name"
                          className={errors.fullName ? "border-red-500" : ""}
                        />
                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateFormData("email", e.target.value)}
                            placeholder="your.email@example.com"
                            className={errors.email ? "border-red-500" : ""}
                          />
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => updateFormData("phone", e.target.value)}
                            placeholder="+234 xxx xxx xxxx"
                            className={errors.phone ? "border-red-500" : ""}
                          />
                          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="password">Password *</Label>
                          <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => updateFormData("password", e.target.value)}
                            placeholder="Create a password"
                            className={errors.password ? "border-red-500" : ""}
                          />
                          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div>
                          <Label htmlFor="confirmPassword">Confirm Password *</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                            placeholder="Confirm your password"
                            className={errors.confirmPassword ? "border-red-500" : ""}
                          />
                          {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="profilePicture">Profile Picture</Label>
                        <div className="mt-1 flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                            {formData.profilePicture ? (
                              <img
                                src={formData.profilePicture || "/placeholder.svg"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Upload className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <input
                            type="file"
                            id="profilePicture"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("profilePicture")?.click()}
                          >
                            Upload Photo
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Educational History</h3>

                      <div>
                        <Label htmlFor="institution">Tertiary Institution Name *</Label>
                        <Select
                          value={formData.institution}
                          onValueChange={(value) => updateFormData("institution", value)}
                        >
                          <SelectTrigger className={errors.institution ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select your institution" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {nigerianUniversities.map((university) => (
                              <SelectItem key={university} value={university}>
                                {university}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="course">Course/Department *</Label>
                          <Input
                            id="course"
                            value={formData.course}
                            onChange={(e) => updateFormData("course", e.target.value)}
                            placeholder="e.g., Computer Science"
                            className={errors.course ? "border-red-500" : ""}
                          />
                          {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
                        </div>

                        <div>
                          <Label htmlFor="matricNumber">Matric Number *</Label>
                          <Input
                            id="matricNumber"
                            value={formData.matricNumber}
                            onChange={(e) => updateFormData("matricNumber", e.target.value)}
                            placeholder="e.g., 180401001"
                            className={errors.matricNumber ? "border-red-500" : ""}
                          />
                          {errors.matricNumber && <p className="text-red-500 text-sm mt-1">{errors.matricNumber}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="entryYear">Entry Year *</Label>
                          <Select
                            value={formData.entryYear}
                            onValueChange={(value) => updateFormData("entryYear", value)}
                          >
                            <SelectTrigger className={errors.entryYear ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              {entryYears.map((year) => (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.entryYear && <p className="text-red-500 text-sm mt-1">{errors.entryYear}</p>}
                        </div>

                        <div>
                          <Label htmlFor="graduationYear">Graduation Year *</Label>
                          <Select
                            value={formData.graduationYear}
                            onValueChange={(value) => updateFormData("graduationYear", value)}
                          >
                            <SelectTrigger className={errors.graduationYear ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              {graduationYears.map((year) => (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.graduationYear && (
                            <p className="text-red-500 text-sm mt-1">{errors.graduationYear}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="degree">Degree Obtained *</Label>
                          <Select value={formData.degree} onValueChange={(value) => updateFormData("degree", value)}>
                            <SelectTrigger className={errors.degree ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select degree" />
                            </SelectTrigger>
                            <SelectContent>
                              {degrees.map((degree) => (
                                <SelectItem key={degree} value={degree}>
                                  {degree}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.degree && <p className="text-red-500 text-sm mt-1">{errors.degree}</p>}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="secondarySchool">Secondary School Name *</Label>
                        <Input
                          id="secondarySchool"
                          value={formData.secondarySchool}
                          onChange={(e) => updateFormData("secondarySchool", e.target.value)}
                          placeholder="e.g., King's College Lagos"
                          className={errors.secondarySchool ? "border-red-500" : ""}
                        />
                        {errors.secondarySchool && (
                          <p className="text-red-500 text-sm mt-1">{errors.secondarySchool}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="secondaryLocation">Location of Secondary School</Label>
                          <Input
                            id="secondaryLocation"
                            value={formData.secondaryLocation}
                            onChange={(e) => updateFormData("secondaryLocation", e.target.value)}
                            placeholder="e.g., Lagos, Nigeria"
                          />
                        </div>

                        <div>
                          <Label htmlFor="secondaryYears">Years Attended</Label>
                          <Select
                            value={formData.secondaryYears}
                            onValueChange={(value) => updateFormData("secondaryYears", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select years attended" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              {secondaryYearsOptions.map((years) => (
                                <SelectItem key={years} value={years}>
                                  {years}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Info & Preferences</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="occupation">Occupation *</Label>
                          <Input
                            id="occupation"
                            value={formData.occupation}
                            onChange={(e) => updateFormData("occupation", e.target.value)}
                            placeholder="e.g., Software Engineer"
                            className={errors.occupation ? "border-red-500" : ""}
                          />
                          {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
                        </div>

                        <div>
                          <Label htmlFor="company">Company Name</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => updateFormData("company", e.target.value)}
                            placeholder="e.g., Tech Company Ltd"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
                        <Input
                          id="linkedin"
                          value={formData.linkedin}
                          onChange={(e) => updateFormData("linkedin", e.target.value)}
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="openToMentorship"
                            checked={formData.openToMentorship}
                            onCheckedChange={(checked) => updateFormData("openToMentorship", checked)}
                          />
                          <Label htmlFor="openToMentorship" className="text-sm">
                            I'm open to mentorship opportunities
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="showProfilePublicly"
                            checked={formData.showProfilePublicly}
                            onCheckedChange={(checked) => updateFormData("showProfilePublicly", checked)}
                          />
                          <Label htmlFor="showProfilePublicly" className="text-sm">
                            Show my profile publicly in the alumni directory
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) => updateFormData("agreeToTerms", checked)}
                          />
                          <Label htmlFor="agreeToTerms" className="text-sm">
                            I agree to the Terms & Conditions and Privacy Policy *
                          </Label>
                        </div>
                        {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center space-x-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </Button>

                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
                    >
                      {isLoading ? (
                        <span>Creating Account...</span>
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Complete Registration</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
