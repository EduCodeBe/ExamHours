// Generated by CoffeeScript 1.7.1
(function() {
  new Vue({
    el: 'body',
    data: {
      clock: '00:00',
      leaveTime: '15:30',
      endTime: '16:00',
      title: "Examen",
      consignes: "Éteignez vos téléphones.",
      configOpen: true,
      hiddenMessage: true
    },
    created: function() {
      var config, k, v;
      config = localStorage.getItem('examHours-config');
      if (config != null) {
        config = JSON.parse(config);
        for (k in config) {
          v = config[k];
          this[k] = v;
        }
      }
      return setInterval((function(_this) {
        return function() {
          return _this.updateClock();
        };
      })(this), 200);
    },
    attached: function() {
      return this.updateClock();
    },
    ready: function() {
      window.onresize = (function(_this) {
        return function() {
          var ntw, scale, table, th, tw, wh, ww;
          ww = window.innerWidth;
          wh = window.innerHeight;
          table = _this.$els.table;
          tw = table.offsetWidth + 30;
          th = table.offsetHeight + 30;
          scale = wh / th;
          ntw = Math.min(100 / scale, 100);
          table.style.transform = 'scale(' + scale + ')';
          return table.style.width = ntw + '%';
        };
      })(this);
      return window.onresize();
    },
    methods: {
      getDiff: function(time1, time2) {
        var endHour, endMinutes, hour, minutes, remainHour, remainMinutes;
        endHour = parseInt(time2.substr(0, 2));
        endMinutes = parseInt(time2.substr(3, 2));
        hour = parseInt(time1.substr(0, 2));
        minutes = parseInt(time1.substr(3, 2));
        remainMinutes = endHour * 60 + endMinutes - (hour * 60 + minutes);
        if (remainMinutes <= 0) {
          return {
            hours: 0,
            minutes: 0
          };
        }
        remainHour = Math.floor(remainMinutes / 60);
        remainMinutes = remainMinutes - remainHour * 60;
        return {
          hours: remainHour,
          minutes: remainMinutes
        };
      },
      getRemainTime: function() {
        return this.getDiff(this.clock, this.endTime);
      },
      updateClock: function() {
        return this.clock = new Date().toLocaleTimeString().substr(0, 5);
      },
      toggleConfig: function() {
        return this.configOpen = !this.configOpen;
      },
      mousemove: function() {
        this.hiddenMessage = false;
        if (this.lastTimeout) {
          clearTimeout(this.lastTimeout);
        }
        return this.lastTimeout = setTimeout((function(_this) {
          return function() {
            return _this.hiddenMessage = true;
          };
        })(this), 500);
      },
      saveState: function() {
        return localStorage.setItem('examHours-config', JSON.stringify(this.$data));
      }
    },
    computed: {
      isFinished: function() {
        var remainTime;
        remainTime = this.getRemainTime();
        return remainTime.hours === 0 && remainTime.minutes === 0;
      },
      canLeave: function() {
        var diffTime;
        diffTime = this.getDiff(this.clock, this.leaveTime);
        return diffTime.hours === 0 && diffTime.minutes === 0;
      },
      remainTime: function() {
        var remainTime;
        remainTime = this.getRemainTime();
        if (remainTime.minutes < 10) {
          remainTime.minutes = "0" + remainTime.minutes;
        }
        return remainTime.hours + ":" + remainTime.minutes;
      },
      consigneLines: function() {
        return this.consignes.split("\n");
      }
    },
    watch: {
      leaveTime: function() {
        Vue.nextTick(function() {
          return window.onresize();
        });
        return this.saveState();
      },
      endTime: function() {
        Vue.nextTick(function() {
          return window.onresize();
        });
        return this.saveState();
      },
      title: function() {
        Vue.nextTick(function() {
          return window.onresize();
        });
        return this.saveState();
      },
      consignes: function() {
        Vue.nextTick(function() {
          return window.onresize();
        });
        return this.saveState();
      }
    }
  });

}).call(this);
