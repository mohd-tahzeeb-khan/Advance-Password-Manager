'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from './ui/button';
import { useUserContext } from '@/context/userContext';
import { useUser } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';

// ---------------------------------------------------------------------------------------------
const AddCards = () => {
  const {toast} =useToast();
  const {user, loaduser}=useUser();
  const [userdetails, setuserdetails] = useState()
  const { userdata }=useUserContext();
  const [formData, setFormData] = useState({
    user_id: "",
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    cardType: "credit",
    network: "",
    bank: "",
    pin: ""
  });

  useEffect(() => {
    if(user && user.primaryEmailAddress){
      const useremail=encodeURIComponent(user.primaryEmailAddress?.emailAddress)
      fetch(`/api/user?email=${useremail}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Users:", data);
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
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCardTypeChange = (value) => {
    setFormData((prev) => ({ ...prev, cardType: value }));
  };

  const handleSelectChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Form Data:", formData);

    try {
      const response = await fetch("/api/addcard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Successfully Card Details added.",
        })
        setFormData({user_id: "",
          cardNumber: "",
          cardholderName: "",
          expiryDate: "",
          cvv: "",
          cardType: "credit",
          network: "",
          bank: "",
          pin: ""})
      } else {
        toast({
          title: "Card is not Added",
          description: "Please Check with you Network and Try again Later",
        })
      }
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  return (
    <Card className="w-full max-w-7xl mx-auto h-[650px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Card Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              className="font-mono"
              maxLength={19}
              value={formData.cardNumber}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              placeholder="John Doe"
              className="uppercase"
              value={formData.cardholderName}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                maxLength={5}
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="password"
                maxLength={3}
                placeholder="123"
                className="font-mono"
                value={formData.cvv}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 flex gap-9">
              <Label htmlFor="pin" className="pt-5">Pin</Label>
              <Input
                id="pin"
                type="password"
                maxLength={8}
                placeholder="***"
                className="font-mono"
                value={formData.pin}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2 flex justify-between">
            <div>
              <Label>Card Type</Label>
              <RadioGroup
                value={formData.cardType}
                onValueChange={handleCardTypeChange}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit" id="credit" />
                  <Label htmlFor="credit">Credit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="debit" id="debit" />
                  <Label htmlFor="debit">Debit</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="network">Card Network</Label>
              <Select value={formData.network} onValueChange={(value) => handleSelectChange("network", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select card network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visa">Visa</SelectItem>
                  <SelectItem value="mastercard">Mastercard</SelectItem>
                  <SelectItem value="rupay">RuPay</SelectItem>
                  <SelectItem value="amex">American Express</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 flex gap-9">
            <Label htmlFor="bank" className="pt-5">Bank</Label>
            <Select value={formData.bank} onValueChange={(value) => handleSelectChange("bank", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hdfc">HDFC Bank</SelectItem>
                <SelectItem value="sbi">State Bank of India</SelectItem>
                <SelectItem value="icici">ICICI Bank</SelectItem>
                <SelectItem value="axis">Axis Bank</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full space-y-4">
            Add
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCards;
