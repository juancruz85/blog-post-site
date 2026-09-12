import Link from "next/link";
import { signOutFormAction } from "@/lib/actions/auth";

interface Props {
  isLoggedIn: boolean;
}

export default function NavLinks({ isLoggedIn }: Props) {
  return (
    <nav className="nav-links">
      <Link href="/">Home</Link>
      <Link href="/posts">Posts</Link>
      {isLoggedIn ? (
        <>
          <Link href="/posts/new">New Post</Link>
          <form action={signOutFormAction}>
            <button type="submit" className="nav-link-button">
              Sign Out
            </button>
          </form>
        </>
      ) : (
        <Link href="/login">Sign In</Link>
      )}
    </nav>
  );
}
