const currentHost = window.location.hostname
const currentPort = window.location.port
const baseUrl = `${currentHost}${currentPort ? ':' + currentPort : ''}`;
export let HOST_API_SERVER = 'https://localhost:8080'
export let HOST_API_SERVER_AUTH = 'https://localhost:8080'
export let HOST_SOCKET = 'https://localhost:8080'