import AutoSignOut from '@/components/shared/AutoSignOut';

export default function GrantedPage() {
  return (
    <AutoSignOut redirect="/login?message=Membership granted! Please login again to access." />
  );
}
