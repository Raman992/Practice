'use client';

import Image from "next/image"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store/store"
import { logout } from "@/store/authSlice"
import { useRouter } from "next/navigation"
import { useState, useEffect, memo, useCallback } from "react"

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

const handleLogout = useCallback(() => {
  dispatch(logout());
  router.push("/login");
}, [dispatch, router]);

  // Don't render until mounted
  if (!mounted) {
    return (
      <div className="mx-auto flex items-center justify-between px-6 py-4 bg-accent-foreground">
        <div className="flex items-center gap-2">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={90}
            height={20}
          />
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition"
          >
            Home
          </Link>
        </nav>
        <p className="hidden md:block text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex items-center justify-between px-6 py-4 bg-accent-foreground">
      <div className="flex items-center gap-2">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={90}
          height={20}
        />
      </div>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link
          href="/"
          className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition"
        >
          Home
        </Link>
        {!isAuthenticated ? (
          <>
            <Link
              href="/login"
              className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition"
            >
              Logout
            </button>
          </>
        )}
      </nav>
      <p className="hidden md:block text-sm text-gray-500 dark:text-gray-400">
        {isAuthenticated && user ? `Welcome ${user?.fullName || user.username}` : 'You are not logged in'}
      </p>
    </div>
  );
}

export default memo(Navbar);