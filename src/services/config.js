const currentHost = window.location.hostname
const currentPort = window.location.port
const baseUrl = `${currentHost}${currentPort ? ':' + currentPort : ''}`;
export let HOST_API_SERVER = 'http://localhost:8090/api/v1'


