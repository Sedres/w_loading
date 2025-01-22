import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: `https://${GetParentResourceName()}/`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la solicitud NUI:', error)
    if (error.response) {
      console.error('Respuesta del servidor:', error.response.data)
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request)
    } else {
      console.error('Error al configurar la solicitud:', error.message)
    }
    return Promise.reject(error)
  }
)

export default api
