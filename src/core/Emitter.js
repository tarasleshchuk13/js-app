export class Emitter {
    
    constructor() {
        this.liteners = {}
    }
    
    emit(event, ...args) {
        if (!Array.isArray(this.liteners[event])) {
            return false
        }
        
        this.liteners[event].forEach(listener => {
            listener(...args)
        })
        
        return true
    }
    
    subscribe(event, fn) {
        this.liteners[event] = this.liteners[event] ?? []
        this.liteners[event].push(fn)
        
        return () => {
            this.liteners[event] =
                this.liteners[event].filter(listener => listener !== fn)
        }
    }
    
}

// ============== EXAMPLE ==================
//
// const emitter = new Emitter()
//
// const unsub = emitter.subscribe('test', console.log)
//
// emitter.emit('test', 42, 43, 44)
// emitter.emit('testasdf', 42, 43, 44)
//
// setTimeout(() => {
//     emitter.emit('test', 'after 2 sec')
// }, 2000)
//
// setTimeout(() => {
//     unsub()
// }, 3000)
//
// setTimeout(() => {
//     emitter.emit('test', 'after 4 sec')
// }, 4000)
