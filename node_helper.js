const request = require("request")
const shell = require('shelljs')
var NodeHelper = require("node_helper")

module.exports = NodeHelper.create({
  start: function() {
    console.log("::: Debug Tool Start :::");
    shell.config.execPath = String(shell.which('node'));
  },

  socketNotificationReceived: async function(noti, payload) {
    if (noti == "INIT") {
      this.initialize(payload)
    } else if ( noti == "SHELLMESSAGE") {
      console.log("Call!!",payload);
      var exec = shell.exec(payload, { silent: true });
      await this.sendSocketNotification("SHELLRETURN", await exec)
    }
  },
  initialize: function(payload) {
    this.config = payload;
  },

})
