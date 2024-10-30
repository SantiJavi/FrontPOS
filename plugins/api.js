export default function ({ $axios }, inject) {
    // Create a custom axios instance
    const api = $axios.create({
      headers: {        
        common: {
          Accept: 'text/plain, */*',
        }
      }
    })
  
    // Set baseURL to something different
    api.url = process.env.URL_BACK
    api.setBaseURL(process.env.URL_BACK)
    
    //api.setBaseURL('https://apifacturacion.connieconito.com/APIFacturacion/apifacturacion/public/')
  
    // Inject to context as $api
    inject('api', api)
  }