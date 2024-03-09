import router from 'next/router'

const handleRedirectResponse = (error: any) => {
  if (error.response.data.redirectTo) router.push(error.response.data.redirectTo)
}

export default handleRedirectResponse
