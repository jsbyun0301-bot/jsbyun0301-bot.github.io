import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-[#0b0b0b] text-white'>
      <div className='text-center space-y-4 px-6'>
        <div className='text-5xl font-extrabold tracking-tight'>404</div>
        <div className='text-lg text-white/80'>The page was not found.</div>
        <Link
          to='/'
          className='inline-flex items-center justify-center px-4 py-2 rounded-md bg-white text-black hover:bg-white/90 transition'
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
