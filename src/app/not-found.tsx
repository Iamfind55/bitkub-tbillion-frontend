import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='bg-dark min-h-screen min-w-full'>
      <div className="container px-5 lg:py-20 py-10">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className='text-white text-9xl font-bold'>404</h1>
            <h1 className='text-3xl font-bold text-danger py-5'>Page Not Found</h1>
            <Link href='/' className='text-2xl underline text-blue-500 font-bold'>
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}