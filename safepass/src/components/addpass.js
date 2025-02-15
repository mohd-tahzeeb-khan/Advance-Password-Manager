"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddPassword() {
  const [formData, setFormData] = useState({
    username: "",
    websiteName: "",
    url: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your form submission logic here
    console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({
      username: "",
      websiteName: "",
      url: "",
      password: "",
      confirmPassword: "",
    })
  }

  return (
    <Card className="w-full mx-auto h-[650px]  md:w-[500px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add New Credential</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-3">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="text-sm font-medium">
                {key.charAt(0).toUpperCase() +
                  key
                    .slice(1)
                    .replace(/([A-Z])/g, " $1")
                    .trim()}
              </Label>
              <Input
                type={key.includes("password") ? "password" : "text"}
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full mt-14">
            Add
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

