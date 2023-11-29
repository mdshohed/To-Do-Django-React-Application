import { Fragment, useState } from 'react'
import { Dialog, Menu, Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  Cog8ToothIcon,
  PencilIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import { ChevronDownIcon  } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
        <Link to="/home" className="text-sm font-semibold leading-6 text-gray-900">
            Home
          </Link>
          <Link to="/addUser" className="text-sm font-semibold leading-6 text-gray-900">
            AddUser
          </Link>
          <Link to="/user" className="text-sm font-semibold leading-6 text-gray-900">
            User
          </Link>
          <Link to="/userPdf" className="text-sm font-semibold leading-6 text-gray-900">
            PDF
          </Link>
          
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                  <Menu.Button className='inline-flex w-full justify-center items-center'>
                      <span className='hidden md:block font-medium text-gray-700'>User</span>
                      <ChevronDownIcon className='ml-2 h-4 w-4 text-gray-700' />
                  </Menu.Button>
              </div>
              <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform scale-95"
                  enterTo="transform scale-100"
                  leave="transition ease-in duration=75"
                  leaveFrom="transform scale-100"
                  leaveTo="transform scale-95"
              >
                <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
                    <div className="p-1">
                        <Menu.Item>
                            <Link to="#" className="flex hover:bg-green-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center">
                                <PencilIcon className="h-4 w-4 mr-2" />
                                Profile
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="#" className="flex hover:bg-[#039BE5] hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center">
                                <Cog8ToothIcon className="h-4 w-4 mr-2" />
                                {/* <RiLogoutCircleLine className='h-4 w-4 mr-2'/> */}
                                Logout
                            </Link>
                        </Menu.Item>
                    </div>
                </Menu.Items>
              </Transition>
          </Menu>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                
                <Link
                  to="/home"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  to="/addUser"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  AddUser
                </Link>
                <Link to="/user" className="text-sm font-semibold leading-6 text-gray-900">
                  User
                </Link>
                <Link to="/userPdf" className="text-sm font-semibold leading-6 text-gray-900">
                  PDF
                </Link>
                          
              </div>
              <div className="py-6">
                <Link href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

export default Header;