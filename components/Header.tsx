"use client";
import { useRouter } from "next/navigation";
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight} from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {useUser} from "../hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Home from "@/app/(site)/page";
import { RiAppsFill } from "react-icons/ri";

interface HeaderProps{
    children: React.ReactNode;
    className?:string;
}
const Header: React.FC<HeaderProps> = ({
    children,
    className
}) =>{
  const AuthModal=useAuthModal();
    const Router = useRouter();

    const supabaseClient=useSupabaseClient();
    const {user}=useUser(); 
    const handleLogOut = async() =>{
      const {error}= await supabaseClient.auth.signOut();
      //reset any playing songs
      Router.refresh();
      if(error){
        toast.error(error.message)
      }
      else{
        toast.success('logged out')
      } 
      
    }
    return(
        <div className={twMerge(`
        h-fit
        bg-gradient-to-b
        from-blue-700
        p-6
        `,
        className
        )}
        >
        <div className="w-full mb-4 flex items-center justify-between">
          <div>
            <Image src={"/images/logo21.png"} alt={"logo"} height={260} width={260} />
          </div>
          <div className="flex flex-row p-4 gap-x-3">

         
            <div className="hidden md:flex gap-x-2 items-center">
                <button onClick={() => Router.back()} className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                    <RxCaretLeft className="text-white" size={35}/>
                </button>
                <button onClick={() => Router.forward()} className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                    <RxCaretRight className="text-white" size={35}/>
                </button>
            </div>
            <div className="flex md:hidden gap-x-2 items-center">
                <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                    <HiHome className="text-black" size={20}/>
                </button>
                <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                    <BiSearch className="text-black" size={20}/>
                </button>
            </div>
            <div className="flex justify-between items-center gap-x-4">
              {user ?(
              <div className="flex gap-x-4 items-center ">
                <button onClick={handleLogOut} className="bg-white px-6 py-2 text-black rounded-full" >Logout</button>
                <button onClick={()=>Router.push('/account')} className="bg-black h-6 w-6 justify-center flex items-center  rounded-full ">
                  <FaUserAlt />
                </button>

              </div>):(
                <>
                <div>
                <Button 
                  onClick={AuthModal.onOpen} 
                  className="
                    bg-transparent 
                    text-neutral-300 
                    font-medium
                  "
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button 
                  onClick={AuthModal.onOpen} 
                  className="bg-white px-6 py-2"
                >
                  Log in
                </Button>
              </div>
                </>)}
            </div>
            </div>
        </div>
        {children}

        
        </div>

        

    );
}
export default Header;