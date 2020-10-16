Module.register("MMM-Debug", {
  defaults: {
    menus: {
      "gedit flask_final.py": "gedit /srv/MagicMirror/modules/MMM-Python/flask_final.py",
      "python3 flask_final.py": "python3 /srv/MagicMirror/modules/MMM-Python/flask_final.py",
      "chrome flask_final": "chromium-browser http://localhost:5000/startStream",
      "-": "",
      "gedit node_helper.js": "gedit /srv/MagicMirror/modules/MMM-Python/node_helper.js",
      "gedit MMM-Python.js": "gedit /srv/MagicMirror/modules/MMM-Python/MMM-Python.js",
      "--": "",
      "pm2 stop mm": "pm2 stop mm",
      "close Menu": "echo ",
      "---": "",
      "Reboot": "reboot",
    },
  },

  getStyles: function() {
    return ["MMM-Debug.css"]
  },

  start: function() {
    this.sendSocketNotification("INIT", this.config)
    this.draw();
  },

  draw: function() {
    var debugButton = document.createElement("div");
    debugButton.id = "debugButton";

    debugButton.addEventListener("click", () => {
      this.drawMenu();
    })
    this.btn = debugButton;
    document.body.appendChild(debugButton);
  },
  drawMenu: function() {
    console.log("draw Menu");
    var debugMenu = document.createElement("div");
    debugMenu.id = "debugMenu";
    this.btn.appendChild(debugMenu);
    for (var v in this.config.menus) {
      if (this.config.menus.hasOwnProperty(v)) {
        console.log(v);
        var foo = document.createElement("div");
        foo.setAttribute("d",this.config.menus[v]);
        var self = this;
        foo.addEventListener("click", function(e) {
          e.stopPropagation();
          self.sendSocketNotification("SHELLMESSAGE", this.getAttribute("d"));
          debugMenu.remove();
        })
        foo.innerText = v;
        debugMenu.appendChild(foo);
      }
    }
  },
  socketNotificationReceived: async function(noti, payload) {
    if (noti == "ENDPYTHON") {
    }
  },

})
