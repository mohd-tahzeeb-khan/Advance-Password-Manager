'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/userContext';
import { toast, useToast } from '@/hooks/use-toast';
import { encrypt } from '@/utils/encryption';

const upidetail = () => {
  const {toast} =useToast();
  const {userdata}=useUserContext();

  const [upidata, setupidata] = useState({
    user_id:'',
    upino:'',
    account_holder_name:'',
    bank_name:'',
    account_type:'',
    upi_app:'',
    pin:''
  })
  const handleSubmit = async(e) => {
    setupidata((prev) => ({
      ...prev, 
      user_id: userdata?.user_id || "" // Ensure userdata is not undefined
    }))
    e.preventDefault();
    const encryptedUpino = encrypt(upidata.upino);
    const encryptedPin = encrypt(upidata.pin);
    console.log("encrypted : data: ",encryptedUpino);
    console.log("encrypted : data: ",encryptedPin);

    const updatedFormData = { ...upidata, upino: encryptedUpino, pin:encryptedPin };
    try {
      const response = await fetch("/api/addupi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Successfully Card Details added.",
        })
      } else {
        toast({
          title: "UPI details is not ",
          description: "Please Check with you Network and Try again Later",
        })
      }
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setupidata((prev) => ({ ...prev, [id]: value }));
  };
  const handleSelectChange = (id, value) => {
    setupidata((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <Card className="w-full mx-auto h-[650px] md:w-[650px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">UPI Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* UPI Number */}
          <div className="space-y-2 flex gap-5 justify-around items-center">
            <Label htmlFor="upiNumber">UPI Number</Label>
            <Input
              id="upino"
              placeholder="Enter UPI ID (e.g., name@bank)"
              value={upidata.upino}
              onChange={handleChange}
              className="w-1/2"
            />
          </div>

          {/* Account Holder Name */}
          <div className="space-y-2">
            <Label htmlFor="holderName">Account Holder Name</Label>
            <Input
              id="account_holder_name"
              placeholder="Enter account holder name"
              value={upidata.account_holder_name}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Bank Name */}
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bank_name"
              placeholder="Enter bank name"
              value={upidata.bank_name}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Account Type */}
          <div className="space-y-2">
            <Label>Account Type</Label>
            <RadioGroup defaultValue={upidata.acc_type}
            onValueChange={(value) => handleSelectChange('account_type', value)} className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="savings" id="savings" />
                <Label htmlFor="savings">Savings</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="current" id="current" />
                <Label htmlFor="current">Current</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="joint" id="joint" />
                <Label htmlFor="joint">Joint</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="firm" id="firm" />
                <Label htmlFor="firm">Firm</Label>
              </div>
            </RadioGroup>
          </div>

          {/* UPI App Selection */}
          <div className="space-y-2">
            <Label htmlFor="upi_app">UPI App</Label>
            <Select value={upidata.upi_app} onValueChange={(value) => handleSelectChange("upi_app", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select UPI app" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpay">Google Pay</SelectItem>
                <SelectItem value="phonepe">PhonePe</SelectItem>
                <SelectItem value="paytm">Paytm</SelectItem>
                <SelectItem value="bhim">BHIM</SelectItem>
                <SelectItem value="amazonpay">Amazon Pay</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* UPI Pin */}
          <div className="space-y-2 flex gap-3 justify-around">
            <Label htmlFor="bankName" className="pt-5">UPI Pin</Label>
            <Input
              id="pin"
              placeholder="Enter your Pin"
              type="password"
              maxLength={8}
              value={upidata.pin}
              onChange={handleChange}
              className="w-1/2"
            />
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default upidetail;