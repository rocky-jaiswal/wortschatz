const environmentConfiguration = (environment: string) => {
  if (environment === 'development') {
    return {
      baseURL: `http://${window.location.hostname}:3000`,
    }
  }
  return {
    baseURL: `https://wortschatz-rockyj.web.app`,
  }
}

const Config = {
  env: environmentConfiguration(
    process.env.REACT_APP_ENVIRONMENT || 'development'
  ),
}

export default Config
