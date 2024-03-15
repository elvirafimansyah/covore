import Image from 'next/image'
import Link from 'next/link';
const Logo = () => {
  return ( 
    <Link href="/">
      <div className='flex items-center gap-2'>
        <Image
          src="/img/logo.png"
          width={45}
          height={45}
          alt="logo"
        />
        <span className='text-xl font-bold'>Covore</span>
      </div>
    </Link>
  );
}

export default Logo;