'use strict'

const mafmt = require('mafmt')
const multiaddr = require('multiaddr')
const utils = require('../../utils')
const print = require('../../utils').print

module.exports = {
  command: 'peers',

  describe: 'List peers with open connections',

  builder: {},

  handler (argv) {
    argv.resolve((async () => {
      if (!utils.isDaemonOn()) {
        throw new Error('This command must be run in online mode. Try running \'ipfs daemon\' first.')
      }

      const result = await argv.ipfs.swarm.peers()

      result.forEach((item) => {
        let ma = multiaddr(item.addr.toString())
        if (!mafmt.IPFS.matches(ma)) {
          ma = ma.encapsulate('/ipfs/' + item.peer.toB58String())
        }
        const addr = ma.toString()
        print(addr)
      })
    })())
  }
}
