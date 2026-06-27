import "./globals.css";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";

export const metadata = {
  title: "Mars Corn Blog",
  description: "A Blog Project",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en">
      <body>
        <div className="ios-app">
          <header className="ios-navbar">
            <div className="navbar-gloss"></div>

            <div className="navbar-content">
              <Link href="/" className="nav-title">
                Mars Corn Blog
              </Link>

              <nav className="nav-links">
                <Link href="/">Home</Link>
                <Link href="/posts">Posts</Link>
                <Link href="/login">Sign In</Link>
              </nav>
            </div>
          </header>

          <main className="main-container">{children}</main>

          <footer className="ios-footer">
            <p>© {new Date().getFullYear()} My Blog</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
