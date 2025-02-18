"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@clerk/nextjs"
import { useToast } from "@/hooks/use-toast"
import { useUserContext } from "@/context/userContext"
import { encrypt } from "@/utils/encryption"
export default function AddPassword() {
  const {toast} =useToast();
  const {user, loaduser}=useUser();
  const [userdetails, setuserdetails] = useState()
  const { userdata }=useUserContext();
  const [formData, setFormData] = useState({
    user_id:"",
    username: "",
    websiteName: "",
    url: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if(user && user.primaryEmailAddress){
      const useremail=encodeURIComponent(user.primaryEmailAddress?.emailAddress)
      fetch(`/api/user?email=${useremail}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("Fetched Users:", data);
        if(data && typeof data==="object"){
          setuserdetails(data);
        }
        // setFormData((prev) => ({ ...prev, user_id: data.user_id }));
      })
      .catch((error) => console.error("Error fetching users:", error));
    }
  }, [user]);
  useEffect(() => {
    if (userdetails?.id) {
      setFormData((prev) => ({
        ...prev,
        user_id: userdetails.id, // ✅ Retains previous values, only updates `user_id`
      }));
    }
  }, [userdetails]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const  handleSubmit =async (e) => {

    e.preventDefault()
    if(formData.password===formData.confirmPassword){
      const encryptedPassword = encrypt(formData.password);
    const updatedFormData = { ...formData, password: encryptedPassword};
      try {
        const response = await fetch("/api/addpass", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        });
  
        const data = await response.json();
        if (response.ok) {
          toast({
            title: "Successfully your Credentials added.",
          })
        } else {
          toast({
            title: "Credentials are not Added",
            description: "Please Check with you Network and Try again Later",
          })
        }
      } catch (error) {
        console.error("Error adding Credentials:", error);
        
      }
    }else{
      console.log("Passwrod does not match")
      alert("password is not matched")
    // Reset form after submission
    
    }
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
          {Object.entries(formData).map(([key, value]) => key==='user_id'? null : (
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
                placeholder={`Enter ${key}`}
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

