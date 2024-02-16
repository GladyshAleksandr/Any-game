const getPlatformImg = (slug: string) => {
  switch (slug) {
    case 'pc':
      return '/icons/PC.svg'

    case 'playstation':
      return '/icons/PlayStation.svg'

    case 'xbox':
      return '/icons/Xbox.svg'

    case 'mac':
      return '/icons/Mac.svg'

    case 'nintendo':
      return '/icons/Nintendo.svg'

    case 'linux':
      return '/icons/Linux.svg'

    case 'android':
      return '/icons/Android.svg'

    case 'ios':
      return '/icons/IOS.svg'

    case 'web':
      return '/icons/Web.svg'

    case 'sega':
      return '/icons/Sega.svg'

    default:
      return ''
  }
}

export default getPlatformImg
