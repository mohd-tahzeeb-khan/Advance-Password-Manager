'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { decrypt } from '@/utils/encryption';
import { Skeleton } from './ui/skeleton';
import { useUser } from '@clerk/nextjs';

const DataDisplay = () => {
  // State to store fetched data
  const [data, setData] = useState({ cards: [], upi: [], credentials: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user, loaduser}=useUser();

  useEffect(() => {
    if(user && user.primaryEmailAddress){
      const useremail=encodeURIComponent(user.primaryEmailAddress?.emailAddress)
      fetch(`/api/user?email=${useremail}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("Fetched Users:", data);
        const id=data.id;
        if(data && typeof data==="object"){
          // setuserdetails(data);
          // console.log("datadisplay",user);
         
        }
        // setFormData((prev) => ({ ...prev, user_id: data.user_id }));
      })
      .catch((error) => console.error("Error fetching users:", error));
    }
  }, [user]);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cardRes, passwordRes, upiRes] = await Promise.all([
          fetch(`/api/addcard?userid=1`),
          fetch('/api/addpass?userid=1'),
          fetch('/api/addupi?userid=1')
        ]);

        if (!cardRes.ok || !passwordRes.ok || !upiRes.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const [cardData, passwordData, upiData] = await Promise.all([
          cardRes.json(),
          passwordRes.json(),
          upiRes.json()
        ]);
        // const encryptedPassword = encrypt(formData.pin);
        // const updatedFormData = { ...formData, pin: encryptedPassword };
        const decryptedCards = cardData.map(card => ({
          ...card,
          pin:decrypt(card.pin), expiry_date:decrypt(card.expiry_date), cvv:decrypt(card.cvv) // Decrypt pin before sending responsedecrypt(user.pin)
        }));
        const decryptedPassword = passwordData.map(password => ({
          ...password,
          password_hashed:decrypt(password.password_hashed) // Decrypt pin before sending responsedecrypt(user.pin)
        }));
        const decryptedUpi = upiData.map(upi => ({
          ...upi,
          UPI_no:decrypt(upi.UPI_no), pin:decrypt(upi.pin) // Decrypt pin before sending responsedecrypt(user.pin)
        }));
        setData({ cards: decryptedCards, upi: decryptedUpi, credentials: decryptedPassword });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // Logic for Copy data
  const handleCopy=async (copydata)=>{
    try {
      await navigator.clipboard.writeText(copydata);
    } catch (error) {
      console.log("error is :", error.message)
    }
  }
  // State for locked columns and passwords
  const [unlockedColumns, setUnlockedColumns] = useState({
    cards: false,
    upi: false,
    credentials: false
  });

  const [passwords, setPasswords] = useState({
    cards: '',
    upi: '',
    credentials: ''
  });

  // Function to verify password (replace with actual logic)
  const verifyPassword = (column, password) => {
    const correctPassword = "1234"; // Replace with secure authentication
    return password === correctPassword;
  };

  // Unlocking a column after verification
  const handleUnlock = (column) => {
    if (verifyPassword(column, passwords[column])) {
      setUnlockedColumns(prev => ({ ...prev, [column]: true }));
      setPasswords(prev => ({ ...prev, [column]: '' }));
    } else {
      alert("Incorrect password!");
    }
  };

  // Loading and Error handling
  if (loading) return(
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3 w-full mt-4'>
        <Skeleton className="h-[600px] w-full"/>
        <Skeleton className="h-[600px] w-full"/>
        <Skeleton className="h-[600px] w-full"/>
      </div>
    </>
  );
  if (error) return <p>NO Data Found</p>;

  // Lock component for secured columns
  const ColumnLock = ({ column }) => (
    <div className="absolute inset-0 bg-white/30 backdrop-blur-md flex flex-col items-center justify-around gap-4 p-4">
      <Lock className="w-12 h-12 text-white" />
      <Input
        type="password"
        placeholder="Enter password"
        value={passwords[column]}
        onChange={(e) => setPasswords(prev => ({ ...prev, [column]: e.target.value }))}
        className="max-w-[200px] border-2 border-white text-white"
      />
      <Button onClick={() => handleUnlock(column)}>Unlock</Button>
    </div>
  );

  return (
    <div className="p-4 w-full">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
      {/* Cards Column */}
      <Card className="relative h-[600px] w-full">
        <CardHeader>
          <CardTitle>Card Details</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="h-[500px] overflow-y-auto space-y-4">
           
            {data.cards.map((card, index) => (
              
              <Card key={index} className="p-4">
                <span className='text-white font-bold text-3xl'>{index+1}.</span>
              <Table>
                <TableHeader>
                  <TableColumn className="w-1/3 min-w-[150px]"></TableColumn>
                  <TableColumn className="w-1/3 min-w-[150px]"></TableColumn>
                </TableHeader>
              <TableBody> 
                <TableRow key={card.card_no}>
                  <TableCell className="w-1/3 min-w-[150px]">Card Number</TableCell>
                  <TableCell className="w-2/3 min-w-[250px]">{card.card_no}</TableCell>
                </TableRow>
                <TableRow key={card.holder_name}>
                  <TableCell className="w-1/3 min-w-[150px]">Card Holder</TableCell>
                  <TableCell className="w-2/3 min-w-[250px] uppercase">{card.holder_name}</TableCell>
                </TableRow>
                <TableRow key={card.bank_name}>
                  <TableCell className="w-1/3 min-w-[150px]">Card Bank</TableCell>
                  <TableCell className="w-2/3 min-w-[250px]">{card.bank_name}</TableCell>
                </TableRow>
                <TableRow key={card.card_network}>
                  <TableCell className="w-1/3 min-w-[150px]">Card Network</TableCell>
                  <TableCell className="w-2/3 min-w-[250px]">{card.card_network}</TableCell>
                </TableRow>
                <TableRow key={card.type}>
                  <TableCell className="w-1/3 min-w-[150px]">Card Type</TableCell>
                  <TableCell className="w-2/3 min-w-[250px]">{card.type}</TableCell>
                </TableRow>
                <TableRow key={card.expiry_date}>
                  <TableCell className="w-1/3 min-w-[150px]">Card Expiry Date</TableCell>
                  <TableCell className="w-[20px] border-2 border-green-400 text-center">{card.expiry_date}</TableCell>
                </TableRow>
                <TableRow key={card.cvv}>
                  <TableCell className="w-1/3 min-w-[150px]">Card CVV</TableCell>
                  <TableCell className="w-[20px] border-2 border-green-400 text-center">{card.cvv}</TableCell>
                </TableRow>
                <TableRow key={card.pin}>
                  <TableCell className="w-1/3 min-w-[150px]">Card PIN</TableCell>
                  <TableCell className="w-[20px] border-2 border-green-400 text-center">{card.pin}</TableCell>
                </TableRow>
              </TableBody>
           </Table>
              </Card>
            ))}
          </div>
          {!unlockedColumns.cards && <ColumnLock column="cards" />}
        </CardContent>
      </Card>
  
      {/* UPI Column */}
      <Card className="relative h-[600px] w-full">
        <CardHeader>
          <CardTitle>UPI Details</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="h-[500px] overflow-y-auto space-y-4">
            {data.upi.map((upi) => (
              
              <Card key={upi.id} className="p-4">
                <p>UPI ID: {upi.UPI_no}</p>
                <p>
                  Holder Name:
                  {/* <span onClick={handleCopy(upi.account_holder_name)}> */}
                  <span onClick={() => handleCopy(upi.account_holder_name)}>{upi.account_holder_name}</span>
                  
                
                  
                </p>
                <p>Bank: {upi.bank_name}</p>
                <p>PIN: {upi.pin}</p>
                <p>Application: {upi.upi_app}</p>
                <p>Type: {upi.account_type}</p>
              </Card>
            ))}
          </div>
          {!unlockedColumns.upi && <ColumnLock column="upi" />}
        </CardContent>
      </Card>
  
      {/* Credentials Column */}
      <Card className="relative h-[600px] w-full">
        <CardHeader>
          <CardTitle>Credentials</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="h-[500px] overflow-y-auto space-y-4">
            {data.credentials.map((cred) => (
              <Card key={cred.id} className="p-4">
                <p>Website: {cred.website_name}</p>
                <p>Website URL: {cred.url}</p>
                <p>Username: {cred.username}</p>
                <p>Password: {cred.password_hashed}</p>
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

export default DataDisplay;
