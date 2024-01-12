import Link from 'next/link'
import AnyGameLogo from './components/AnyGameLogo'
import Image from 'next/image'

type IconType = {
  name: string
  icon: string
  url: string
}

const Footer = () => {
  const socialMedia: IconType[] = [
    {
      name: 'YouTube',
      icon: '/icons/Youtube.svg',
      url: 'https://www.youtube.com/'
    },
    {
      name: 'Instagram',
      icon: '/icons/Instagram.svg',
      url: 'https://www.instagram.com/'
    },
    {
      name: 'Twitter',
      icon: '/icons/Twitter.svg',
      url: 'https://twitter.com/'
    }
  ]

  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-20">
      <div className="flex justify-center items-center space-x-2">
        <AnyGameLogo />
        {socialMedia.map((el) => (
          <Link href={el.url}>
            <Image alt={el.name} src={el.icon} width={32} height={32} />
          </Link>
        ))}
      </div>
      <div className="flex flex-col w-48">
        <div className="flex justify-evenly">
          <div>About</div>
          <div>Privacy</div>
          <div>Terms</div>
        </div>
        <div className="flex justify-evenly">
          <div>Contact Us</div>
          <div>Careers</div>
        </div>
      </div>
    </div>
  )
}

export default Footer
