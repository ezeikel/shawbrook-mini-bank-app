import { useAuth } from '@/app/context/auth-context';

export default function Index() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return null; // TODO: add a loading spinner
  }

  // auth context will handle the navigation
  return null;
} 