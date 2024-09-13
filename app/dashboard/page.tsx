'use client'

import Dashboard from '@/components/Dashboard';
import Loading from '@/components/Loading';
import Login from '@/components/Login';
import Main from '@/components/Main';
import { useAuth } from '@/context/AuthContext';

type ChildrenType = {
  Dashboard: React.ReactNode;
  Login: React.ReactNode;
  Loading: React.ReactNode;
}

// export const metadata = {
//   title: 'Broodl · Dashboard'
// }

export default function DashboardPage() {

  const context = useAuth()
  const currentUser = context?.currentUser
  const loading = context?.loading

    // const isAuthenticated = true;

    const children: ChildrenType = {
      Dashboard: <Main><Dashboard /></Main>,
      Login: <Main><Login /></Main>,
      Loading: <Main><Loading /></Main>
    }

  return loading? children.Loading : currentUser ? children.Dashboard : children.Login
}
