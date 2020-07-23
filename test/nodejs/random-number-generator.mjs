var LIB = (function (t) {
  var e = {}
  function n (o) {
    if (e[o]) return e[o].exports
    var r = (e[o] = { i: o, l: !1, exports: {} })
    return t[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports
  }
  return (
    (n.m = t),
    (n.c = e),
    (n.d = function (t, e, o) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: o })
    }),
    (n.r = function (t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 })
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t
      if (4 & e && 'object' == typeof t && t && t.__esModule) return t
      var o = Object.create(null)
      if (
        (n.r(o),
        Object.defineProperty(o, 'default', { enumerable: !0, value: t }),
        2 & e && 'string' != typeof t)
      )
        for (var r in t)
          n.d(
            o,
            r,
            function (e) {
              return t[e]
            }.bind(null, r)
          )
      return o
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default
            }
          : function () {
              return t
            }
      return n.d(e, 'a', e), e
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }),
    (n.p = ''),
    n((n.s = 0))
  )
})([
  function (t, e, n) {
    'use strict'
    n.r(e),
      n.d(e, 'NodeWorker', function () {
        return o
      })
    class o {
      constructor () {
        this.countConnections = 0
      }
      stop () {
        clearInterval(this.intervalId), (this.intervalId = null)
      }
      pause () {
        this.stop()
      }
      resume () {
        this.stop(),
          (this.intervalId = setInterval(() => {
            if (this.output) {
              const t =
                Math.random() *
                  (this.state.config.max - this.state.config.min) +
                this.state.config.min
              this.output(t, this.outputSocketId)
            }
          }, this.state.config.interval))
      }
      outputStream (t) {
        this.output = t
      }
      connectToOutSocket () {
        this.countConnections++, 1 === this.countConnections && this.resume()
      }
      disconnectOut () {
        ;(this.countConnections -= 0 === this.countConnections ? 0 : 1),
          0 === this.countConnections && clearInterval(this.intervalId)
      }
      init (t) {
        const e = this.state
        ;(this.state = t),
          t.config || (this.state.config = { interval: 1e3, min: 0, max: 1 }),
          e
            ? e.config.interval !== (t.config || {}).interval &&
              this.intervalId &&
              this.resume()
            : !1 !== t.autoStart && this.resume(),
          (this.outputSocketId = t.sockets[0].id)
      }
    }
  }
])
const _LIB$NodeWorker = LIB.NodeWorker
export { _LIB$NodeWorker as NodeWorker }
