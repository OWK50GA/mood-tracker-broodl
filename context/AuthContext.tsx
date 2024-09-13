'use client'

import { createContext, useContext, useEffect, useState } from "react"
import {auth} from '@/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import { doc, getDoc } from "firebase/firestore"
import {db} from '../firebase'

export type MoodData = {
    [year: number]: {
        [month: number]: {
            [day: number]: any;
        }
    }
}

type AuthContextType = {
    currentUser: User | null;
    userDataObj: MoodData | null;
    signup: (email: string, password: string) => Promise<any>;
    logout: () => Promise<void>;
    login: (email: string, password: string) => Promise<any>;
    loading: boolean;
    setUserDataObj: React.Dispatch<React.SetStateAction<Record<string, any> | null>>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth(): AuthContextType | null {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context
}

export const AuthProvider: React.FC<{children: React.ReactNode}> = ( {children} ) => {

    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [userDataObj, setUserDataObj] = useState<MoodData | null>({})
    const [loading, setLoading] = useState(true)

    //Auth handlers
    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        setUserDataObj(null)
        setCurrentUser(null)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                //set user to local context state
                setLoading(true)
                setCurrentUser(user)

                if (!user) {
                    console.log('No user')
                    return;
                }

                //if user exist, fetch user from database
                console.log('fetching user data')
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                let firebaseData = {}
                if (docSnap.exists()) {
                    console.log('found user data')
                    firebaseData = docSnap.data()
                }

                setUserDataObj(firebaseData)
            } catch (error) {
                console.error('No User Found')
            } finally {
                setLoading(false)
            }
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser, userDataObj, signup, logout, login, loading, setUserDataObj
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}