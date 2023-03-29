import Link from "next/link";
import Image from "next/image";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Header() {
  return (
    <div className="bg-stone-50 border-b border-amber-400 text-stone-700">
      <nav className="container mx-auto flex align-center justify-between p-4">
        <Link href="/">Home</Link>
        {/* <Menu id="main-menu">
          <MenuItem href="/upload">Upload</MenuItem>
          <MenuItem href="/discover">Discover</MenuItem>
          <MenuItem href="/learn">Learn</MenuItem>
          <MenuItem href="/search">Search</MenuItem>
        </Menu> */}
        <Menu id="user-menu">
          <MenuItem href="/auth/login">Login</MenuItem>
          <MenuItem href="/auth/register">Register</MenuItem>
          {/* <MenuItem href="/user/profile">Profile</MenuItem>
          <MenuItem href="/user/settings">Settings</MenuItem> */}
        </Menu>
      </nav>
    </div>
  );
}

export function Menu(props: {id?: string; children: React.ReactNode }) {
  return (
    <ul id={props.id} className="flex align-center justify-between">
      {props.children}
    </ul>
  );
}

export function MenuItem(props: {href: string; children: React.ReactNode}) {
  return (
    <li>
      <Link href={props.href} className="p-4">
        {props.children}
      </Link>
    </li>
  );
}