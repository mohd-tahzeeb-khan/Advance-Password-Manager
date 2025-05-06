'use client'
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import AddPassword from '@/components/addpass';
import AddCards from '@/components/addcard';
import UpiDetail from '@/components/addupi';
import Datadisplay from '@/components/datadisplay';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // If user is not signed in, redirect to sign-in page
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }

    // If user is signed in, fetch user data
    if (isLoaded && isSignedIn && user) {
      fetch(`/api/user?email=${encodeURIComponent(user.primaryEmailAddress?.emailAddress)}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching user:', err);
          setLoading(false);
        });
    }
  }, [user, isLoaded, isSignedIn, router]);

  // Show skeletons while user data is loading
  if (!isLoaded || loading) {
    return (
      <div className="flex flex-col h-full border border-white/40 m-5 p-5 w-[98%]">
        <div className="flex flex-row sm:flex-col max-md:flex-col lg:flex-row justify-between w-full border border-white/60 p-3">
          <Skeleton className="h-[650px] w-[30%]" />
          <Skeleton className="h-[650px] w-[35%]" />
          <Skeleton className="h-[650px] w-[30%]" />
        </div>
        <div>
          <Datadisplay />
        </div>
      </div>
    );
  }

  // Show the main dashboard content when user data is loaded
  return (
    <div className="flex flex-col h-full w-[98%] border border-white/40 m-5 p-5">
      <h1 className="text-center text-3xl p-6">Enter your Precious Details here..</h1>
      <div className="flex flex-row sm:flex-col max-md:flex-col lg:flex-row justify-between gap-4 w-full border border-white/60 p-3">
        <AddCards />
        <UpiDetail />
        <AddPassword />
      </div>
        <Datadisplay />
      
    </div>
  );
};

export default Dashboard;
