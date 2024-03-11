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
    <div className="mt-20 border-t-2">
      <div className="flex xxs:flex-col xsm:flex-row xxs:space-y-2 xsm:space-y-0 items-center justify-between mt-6">
        <AnyGameLogo />
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
          <Link target="_blank" className="text-center" href={'https://rawg.io'}>
            Powered by RAWG
          </Link>
        </div>
        <div className="flex space-x-2">
          {socialMedia.map((el) => (
            <Link key={el.name} href={el.url}>
              <Image alt={el.name} src={el.icon} width={32} height={32} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer
