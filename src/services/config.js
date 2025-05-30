const currentHost = window.location.hostname
const currentPort = window.location.port
const baseUrl = `${currentHost}${currentPort ? ':' + currentPort : ''}`;
export let HOST_API_SERVER = 'http://192.168.63.93:8090/api/v1'
export let HOST_API_SERVER_AUTH = 'http://192.168.63.93:8090'


