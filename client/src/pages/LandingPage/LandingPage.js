import { useContext } from 'react'
import backgroundImg from '../../images/bballbackground.jpg';
import { UserContext } from '../../providers/UserProvider';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const { setSignupModalOpen } = useContext(UserContext);

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImg})` }}
      className="bg-cover bg-fixed bg-center h-screen flex items-center overflow-hidden mb-[-20px]"
    >
      <div className="relative bg-opacity-70 bg-white w-full h-full">
        <div
          className="absolute inset-x-0 -top-10 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 "
          aria-hidden="true"
        >
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">

          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              DreamTeam
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              Keep up with the latest NBA news and build your own dream team
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => setSignupModalOpen(prev => !prev)}
                className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                Get started
              </button>
              <Link to={'/about'} className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}