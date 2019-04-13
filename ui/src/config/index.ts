const environmentConfiguration = (environment: string) => {

  if (environment === 'development') {
    return {
      baseURL: `http://${window.location.hostname}:8080`
    };
  }
  return {
    baseURL: `https://api.${window.location.hostname}`
  };
};

const Config = {
  env: environmentConfiguration(process.env.REACT_APP_ENVIRONMENT || 'development')
};

export default Config;
