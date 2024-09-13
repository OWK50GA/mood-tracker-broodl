'use client'

import { useAuth } from "@/context/AuthContext";
import Button from "./Button";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Logout = () => {

    const context = useAuth()
    const [logout, currentUser] = [context?.logout, context?.currentUser]
    const pathname = usePathname()

    if (!currentUser) {
        return
    } 

    if (pathname === '/') {
        return (
            <Link href={'/dashboard'}>
                <Button text="Go To Dashboard" full={false} dark={false}/>
            </Link>
        )
    }


    return ( 
        <Button text="Logout" full={false} dark={false}/>
     );
}
 
export default Logout;