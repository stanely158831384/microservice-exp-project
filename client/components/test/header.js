import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/icons8-raccoon-128.svg'
import { Navbar } from 'flowbite-react';
import { useState } from "react";
// import Header2 from './header2';

const header = ({ currentUser }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);


  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ].filter(linksConfig => linksConfig).map(({ label, href }) => {
    return (
      <Link href={href} key={href}>
        <a href="#" className="font-cyberFonts px-8 py-2 my-4 text-white bg-racoonBlueA border-b-4 border-b-racoonBlueB rounded-lg shadow-md hover:bg-racoonBlueB hover:border-t-6 hover:border-b-0 transition-all duration-100 block"
        >{label}</a>
      </Link>
    )

  })


  return (
    <div>
      <nav className="fixed mx-auto p-2 z-50 bg-slate-200 w-screen infos-2 shadow-racoonBlueA">
        {/* Flex Container For Nav Items */}
        <div className="flex items-center justify-between sm:space-x-20  space-x-10 sm:my-6 my-3 w-min mx-auto">
          <div className="z-30 hidden sm:flex w-max h-max">
            <Image src={logo} alt="" id="logo" />
          </div>

          <div className="group">
            <Link href="/">
              <a className="font-cyberFonts md:text-4xl text-2xl text-racoonBlueB group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 ">
                Racoon Republic
              </a>
            </Link>

          </div>

          <div
            className="hidden items-center space-x-10 uppercase text-grayishBlue md:flex "
          >
            <a href="#feature" className="font-cyberFonts tracking-widest hover:text-softRed md:text-cyan-500"
            >Features</a>
            <a href="#faq" className="font-cyberFonts tracking-widest hover:text-softRed"
            >Contact</a>
            <a href="#faq" className=" font-cyberFonts tracking-widest hover:text-softRed w-min">About Us</a>
            {links}

          </div>
          <button
            id="menu-btn"
            className="z-30 block md:hidden focus:outline-none hamburger "
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>



        <div
          id="menu"
          // className="fixed inset-0 z-20 hidden flex-col items-center self-end w-full h-full m-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white uppercase divide-y divide-gray-500 opacity-90 bg-veryDarkBlue"
          className={isNavOpen ? "showMenuNav fixed inset-0 z-20 hidden flex-col items-center self-end w-full h-full m-h-screen px-6 py-1 pt-24 pb-4 tracking-normal	 text-black uppercase divide-y divide-gray-500 opacity-90 bg-veryDarkBlue" : "hideMenuNav fixed inset-0 z-20 hidden flex-col items-center self-end w-full h-full m-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white uppercase divide-y divide-gray-500 opacity-90 bg-veryDarkBlue"}
        >
          <div className="w-full py-3 text-center">
            <a href="#features" className="block hover:text-softRed">Features</a>
          </div>
          <div className="w-full py-3 text-center">
            <a href="#download" className="block hover:text-softRed">Download</a>
          </div>
          <div className="w-full py-3 text-center">
            <a href="#faq" className="block hover:text-softRed">FAQ</a>
          </div>
          <div className="w-full py-3 text-center ">
            {/* <a href="#" className="block hover:text-softRed">Login</a> */}
            {links}
          </div>
        </div>

        {/* <Navbar
        fluid={true}
        rounded={true}
      >
        <Navbar.Brand href="https://flowbite.com/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            href="/navbars"
            active={true}
          >
            <span className="font-cyberFonts tracking-widest hover:text-softRed md:text-cyan-500"
            >Features</span>
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            About
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            Services
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            Pricing
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            Contact
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar> */}

        {/* <Header2 /> */}
        <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        // position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .infos-2 {
        background: hsla(0, 0%, 100%, .3);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
    }
    `}</style>
      </nav>
      <div className='h-48 block bg-slate-200'></div>
    </div>

  )
}

export default header;