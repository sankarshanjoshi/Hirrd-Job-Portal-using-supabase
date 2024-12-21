import React, { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusiness, Heart, PenBox } from 'lucide-react'

const Header = () => {

    const [showSignIn, setShowSignIn] = useState(false);

    const [search, setSearch] = useSearchParams();
    const {user} = useUser();
    useEffect(() => {
        if (search.get("sign-in")) {
          setShowSignIn(true);
        }
      }, [search]);


    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
          setShowSignIn(false);
          setSearch({});
        }
      };


  return (
    <>
   
    <nav className='py-4 flex justify-between items-center'>
      <Link>
      <img src='/logo.png' className='h-20' />
      </Link> 
      <div className='flex gap-8'>
      <SignedOut>
      <Button variant = "outline" onClick ={()=>setShowSignIn(true)} >Login</Button>
      </SignedOut>
      <SignedIn>
        {/* add a condition here */}
      {user?.unsafeMetadata?.role === "recruiter" && (
      <Link to='/jobpost'>
      <Button variant ='destructive' className='rounded-full'><PenBox className='mr-2' size={20} />Post a Job</Button>
      </Link>
      )}  
        <UserButton appearance={{

            elements:{
                avatarBox: "w-10 h-10"
            },
        }
        }>
           <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/myjobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/savedjobs"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>

        </UserButton>
      </SignedIn>
        
      </div> 

    </nav>
    
    {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}

</>  

  );
}

export default Header
