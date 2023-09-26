import { Fragment, useState, useContext, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logoImg from '../../images/basketballicon.png';
import profileIcon from '../../images/profileicon.png';
import { Link } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import { useAuth } from '../../hooks/useAuth';
import { removeJwt, getJwt } from '../../utils/jwt';
import { useNavigate } from 'react-router-dom';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const { setLoginModalOpen } = userContext;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(prev => !prev)
  };


  const navigation = [
    { name: 'Dashboard', to: '/dashboard', current: false, show: isLoggedIn },
    { name: 'Team', to: '#', current: false, show: isLoggedIn },
  ]

  useEffect(() => {
    isAuthenticated ? setIsLoggedIn(true) : setIsLoggedIn(false)

  }, [isAuthenticated, getJwt()]);

  const renderProfileMenu = () => {
    return (
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src={profileIcon}
              alt=""
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                  Your Profile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                  Settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  };

  const handleLogout = () => {
    removeJwt();
    navigate('/')
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link to='/' className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src={logoImg}
                    alt="Your Company"
                  />
                  <div className="text-white">
                    DreamTeam
                  </div>
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => {
                      if (item.show === false) return <></>;
                      return <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    })}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-5 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {getJwt() ?
                  renderProfileMenu()
                  : (
                    <button
                      className="ml-2 rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                      type="button"
                      aria-label="Login" // Add an accessible label
                      onClick={openLoginModal}
                    >
                      Login
                    </button>
                  )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => {
                return (
                  <>
                    {item.show === false ?
                      <></> :
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button >
                    }
                  </>
                )
              }

              )}
            </div>
          </Disclosure.Panel>
        </>
      )
      }
    </Disclosure >
  )
}
