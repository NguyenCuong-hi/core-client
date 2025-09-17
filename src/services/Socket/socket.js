import SockJs from 'sockjs-client'
import Stomp from 'stompjs'
import { HOST_SOCKET } from '../config'
import { setStatus } from 'store/statusReducer'

let stompClient = null
let socket = null
let reconnectTimeout = null
let isManuallyDisconnected = false
let isConnected = false
let currentUserId = null
const RECONNECT_INTERVAL = 5000 // 5 seconds
const HEARTBEAT_INTERVAL = 10000 // 10 seconds

export const connectWebSocket = (dispatch) => {
    if (isConnected) {
        console.log('WebSocket is already connected.')
        return
    }
    if (stompClient) {
        console.log('WebSocket is already connecting.')
        return
    }

    isManuallyDisconnected = false

    socket = new SockJs(`${HOST_SOCKET}/ws`)
    stompClient = Stomp.over(socket)
    stompClient.heartbeat.outgoing = HEARTBEAT_INTERVAL
    stompClient.heartbeat.incoming = HEARTBEAT_INTERVAL
    stompClient.connect(
        {},
        () => onConnect(dispatch),
        onError
    )
    socket.onclose = onClose
    socket.onerror = onError
    console.log('Attempting to connect to WebSocket...')
}

export const disconnectWebSocket = () => {
    isManuallyDisconnected = true
    if (stompClient) {
        stompClient.disconnect(() => {
            console.log('WebSocket disconnected.')
            isConnected = false
            stompClient = null
            socket = null
        })
    }
    if (reconnectTimeout) {
        clearTimeout(reconnectTimeout)
        reconnectTimeout = null
    }
    isConnected = false
    stompClient = null
    socket = null
}
const onConnect = (dispatch) => {
    console.log('WebSocket connected.')
    isConnected = true
    reconnectTimeout = null
    subscribeToRefreshStatus(dispatch)
}
const onError = (error) => {
    console.error('WebSocket error:', error)
}
const onClose = () => {
    console.log('WebSocket connection closed.')
    isConnected = false
    stompClient = null
    socket = null
    if (!isManuallyDisconnected && !reconnectTimeout) {
        reconnectTimeout = setTimeout(() => {
            console.log('Attempting to reconnect to WebSocket...')
        }, RECONNECT_INTERVAL)
    }

}


const subscribeToRefreshStatus = (dispatch) => {
    if (!stompClient) return
    stompClient.subscribe('/topic/events', (message) => {
        const msg = JSON.parse(message.body);
        dispatch(setStatus(msg.label));
    })
}

export const sendMessage = (destination, payload) => {
    if (stompClient && isConnected) {
        stompClient.send(destination, {}, JSON.stringify(payload))
    } else {
        console.error('WebSocket is not connected. Cannot send message.')
    }
}


export const isWebSocketConnected = () => isConnected
export const getCurrentUserId = () => currentUserId
export const getStompClient = () => stompClient
export const getSocket = () => socket
export const isManuallyDisconnectedStatus = () => isManuallyDisconnected
export const getReconnectTimeout = () => reconnectTimeout
export const getReconnectInterval = () => RECONNECT_INTERVAL
export const getHeartbeatInterval = () => HEARTBEAT_INTERVAL
export const setManuallyDisconnected = (value) => { isManuallyDisconnected = value }
export const setCurrentUserId = (userId) => { currentUserId = userId }
export const setStompClient = (client) => { stompClient = client }
export const setSocket = (sock) => { socket = sock }
export const setReconnectTimeout = (timeout) => { reconnectTimeout = timeout }
export const setIsConnected = (status) => { isConnected = status }

