'use client'
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const upidetail = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Card className="w-full mx-auto h-[650px] md:w-[650px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">UPI Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* UPI Number */}
          <div className="space-y-2">
            <Label htmlFor="upiNumber">UPI Number</Label>
            <Input
              id="upiNumber"
              placeholder="Enter UPI ID (e.g., name@bank)"
              className="w-full"
            />
          </div>

          {/* Account Holder Name */}
          <div className="space-y-2">
            <Label htmlFor="holderName">Account Holder Name</Label>
            <Input
              id="holderName"
              placeholder="Enter account holder name"
              className="w-full"
            />
          </div>

          {/* Bank Name */}
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              placeholder="Enter bank name"
              className="w-full"
            />
          </div>

          {/* Account Type */}
          <div className="space-y-2">
            <Label>Account Type</Label>
            <RadioGroup defaultValue="savings" className="grid grid-cols-2 gap-4">
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
            <Label htmlFor="upiApp">UPI App</Label>
            <Select>
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

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default upidetail;