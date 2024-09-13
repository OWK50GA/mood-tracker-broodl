'use client'

import Link from "next/link";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

const CallToAction = () => {

    const context = useAuth()
    const currentUser = context?.currentUser

    if (currentUser) {
        return (
            <div className="">
                <Link href={'/dashboard'}>
                    <Button text="Go to Dashboard" dark={true} full={true}/>
                </Link>
            </div>
        )
    }

    return ( 
        <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
                    <Link href={'/dashboard'}>
                        <Button text="Sign Up" dark={false} full={true}/>
                    </Link>
                    <Link href={'/dashboard'}>
                        <Button text="Login" dark={true} full={false}/>
                    </Link>
                </div>
     );
}
 
export default CallToAction;