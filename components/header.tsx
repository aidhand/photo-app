import Link from "next/link";
import Image from "next/image";

import { faker } from "@faker-js/faker";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Header() {
  return (
    <div>
      <nav>
        <Menu id="main-menu">
          <MenuItem href="/">Home</MenuItem>
        </Menu>
        <Menu id="user-menu">
          <MenuItem href="/user">Profile</MenuItem>
          <MenuItem href="/auth/login">Login</MenuItem>
          <MenuItem href="/auth/signup">Sign Up</MenuItem>
          <MenuItem href="/auth/logout">Logout</MenuItem>

          <Image src={faker.image.avatar()} width={32} height={32} alt="User avatar" />
        </Menu>
      </nav>
    </div>
  );
}

export function SearchBox(props: InputProps) {
  return (
    <>
      <input
        type="search"
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        className="py-1 px-2 mb-8 w-72 block border rounded-md border-indigo-500 bg-white focus:outline-none focus:shadow-outline"
      />
    </>
  );
}

export function Menu(props: {id?: string; children: React.ReactNode }) {
  return (
    <ul id={props.id}>
      {props.children}
    </ul>
  );
}

export function MenuItem(props: {href: string; children: React.ReactNode}) {
  return (
    <li>
      <Link href={props.href}>
        {props.children}
      </Link>
    </li>
  );
}