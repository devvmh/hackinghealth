const io = require('socket.io')()
const stunservers = [{'url': 'stun:stun.l.google.com:19302'}]
const { createStore } = require('redux')

const reducer = (state = { connectedPeople: {}, liveMaps: {} }, action) => {
  switch (type) {
    case 'JOIN_MAP':
      return Object.assign({}, state, {
      })
    case 'LEAVE_MAP':
      return Object.assign({}, state, {
      })
    case 'JOIN_CALL':
      return Object.assign({}, state, {
      })
    case 'LEAVE_CALL':
      return Object.assign({}, state, {
      })
    case 'DISCONNECT':
      return Object.assign({}, state, {
      })
    default:
      return state
  }
}

const store = createStore(reducer)
store.subscribe(() => {
  console.log(store.getState())
  io.sockets.emit('STORE_UPDATED', store.getState())
})

io.on('connection', function(socket) {
  io.sockets.emit('STORE_UPDATED', store.getState())

  socket.on('JOIN_ROOM', data => store.dispatch({ type: 'JOIN_ROOM', payload: data }))
  socket.on('LEAVE_ROOM', () => store.dispatch({ type: 'LEAVE_ROOM', payload: socket }))
  socket.on('JOIN_CALL', data => store.dispatch({ type: 'JOIN_CALL', payload: data }))
  socket.on('LEAVE_CALL', () => store.dispatch({ type: 'LEAVE_CALL', payload: socket }))
  socket.on('disconnect', () => store.dispatch({ type: 'DISCONNECT', payload: socket }))
})

io.listen(parseInt(process.env.SIGNAL_SERVER_PORT) || 5000)
