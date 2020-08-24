
function Event() {
    this.cache = {}
    this.UID = 0
}

Event.prototype.on = function on(eventName, callback) {
    if (this.cache[eventName] === undefined) {
        this.cache[eventName] = []
    }

    let token = this.UID++
    console.log(token)
    this.cache[eventName].push({
        token: token,
        callback
    })
    console.log(this.cache)
    return token
}

Event.prototype.emit = function emit(eventName, payload, context) {
    if (this.cache[eventName] !== undefined) {
        this.cache[eventName].forEach(({ callback }) => {
            callback.call(context || this, payload || [])
        })
    }
}

Event.prototype.remove = function remove(eventName, eventToken) {
    if (this.cache[eventName] !== undefined) {
        this.cache[eventName].forEach(({ token, callback }, index) => {
            if (token === eventToken) {
                this.cache[eventName].splice(index, 1)
            }
        })
    }
}