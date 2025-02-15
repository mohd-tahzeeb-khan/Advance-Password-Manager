'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const datadisplay = () => {
  // Sample data - replace with your actual data
  const data = {
    cards: [
      { id: 1, cardNumber: "**** **** **** 1234", cardHolder: "John Doe", expiry: "12/25", cvv: "***" },
      { id: 2, cardNumber: "**** **** **** 5678", cardHolder: "Jane Smith", expiry: "03/26", cvv: "***" },
      // Add more card entries
    ],
    upi: [
      { id: 1, upiId: "john@upi", bankName: "State Bank", phone: "******1234" },
      { id: 2, upiId: "jane@upi", bankName: "City Bank", phone: "******5678" },
      { id: 1, upiId: "john@upi", bankName: "State Bank", phone: "******1234" },
      { id: 2, upiId: "jane@upi", bankName: "City Bank", phone: "******5678" },
      { id: 1, upiId: "john@upi", bankName: "State Bank", phone: "******1234" },
      { id: 2, upiId: "jane@upi", bankName: "City Bank", phone: "******5678" },
      { id: 1, upiId: "john@upi", bankName: "State Bank", phone: "******1234" },
      { id: 2, upiId: "jane@upi", bankName: "City Bank", phone: "******5678" },
      // Add more UPI entries
    ],
    credentials: [
      { id: 1, username: "johndoe", password: "********", platform: "Gmail" },
      { id: 2, username: "janesmith", password: "********", platform: "Facebook" },
      // Add more credential entries
    ]
  };

  // State for column visibility
  const [unlockedColumns, setUnlockedColumns] = useState({
    cards: false,
    upi: false,
    credentials: false
  });

  // State for password inputs
  const [passwords, setPasswords] = useState({
    cards: '',
    upi: '',
    credentials: ''
  });

  // Password verification (replace with your actual verification logic)
  const verifyPassword = (column, password) => {
    // Example password - replace with secure verification
    const correctPassword = "1234";
    return password === correctPassword;
  };

  const handleUnlock = (column) => {
    if (verifyPassword(column, passwords[column])) {
      setUnlockedColumns(prev => ({
        ...prev,
        [column]: true
      }));
      setPasswords(prev => ({
        ...prev,
        [column]: ''
      }));
    } else {
      alert("Incorrect password!");
    }
  };

  const ColumnLock = ({ column }) => (
    <div className="absolute inset-0 bg-white/30 backdrop-blur-md flex flex-col items-center justify-center gap-4 p-4">
      <Lock className="w-12 h-12 text-gray-600" />
      <Input
        type="password"
        placeholder="Enter password"
        value={passwords[column]}
        onChange={(e) => setPasswords(prev => ({
          ...prev,
          [column]: e.target.value
        }))}
        className="max-w-[200px]"
      />
      <Button onClick={() => handleUnlock(column)}>Unlock</Button>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cards Column */}
        <Card className="relative h-[600px]">
          <CardHeader>
            <CardTitle>Card Details</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="h-[500px] overflow-y-auto space-y-4">
              {data.cards.map(card => (
                <Card key={card.id} className="p-4">
                  <p>Card Number: {card.cardNumber}</p>
                  <p>Card Holder: {card.cardHolder}</p>
                  <p>Expiry: {card.expiry}</p>
                  <p>CVV: {card.cvv}</p>
                </Card>
              ))}
            </div>
            {!unlockedColumns.cards && <ColumnLock column="cards" />}
          </CardContent>
        </Card>

        {/* UPI Column */}
        <Card className="relative h-[600px]">
          <CardHeader>
            <CardTitle>UPI Details</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="h-[500px] overflow-y-auto space-y-4">
              {data.upi.map(upi => (
                <Card key={upi.id} className="p-4">
                  <p>UPI ID: {upi.upiId}</p>
                  <p>Bank: {upi.bankName}</p>
                  <p>Phone: {upi.phone}</p>
                </Card>
              ))}
            </div>
            {!unlockedColumns.upi && <ColumnLock column="upi" />}
          </CardContent>
        </Card>

        {/* Credentials Column */}
        <Card className="relative h-[600px]">
          <CardHeader>
            <CardTitle>Credentials</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="h-[500px] overflow-y-auto space-y-4">
              {data.credentials.map(cred => (
                <Card key={cred.id} className="p-4">
                  <p>Platform: {cred.platform}</p>
                  <p>Username: {cred.username}</p>
                  <p>Password: {cred.password}</p>
                </Card>
              ))}
            </div>
            {!unlockedColumns.credentials && <ColumnLock column="credentials" />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default datadisplay;