function navigationOpenBiasa(id){
  $(id).addClass('is-active')
}

function navigationCloseBiasa(){
  $('.navbottom').removeClass('is-active')
}

function closeModal(id){
  document.querySelector(id).classList.remove('is-active')
}

function openModalWinner(){
  document.querySelector('#submitScore').classList.add('is-active')
}

var images = [
  '/images/1.png',
  '/images/2.png',
  '/images/3.png',
  '/images/4.png',
  '/images/5.png',
  '/images/6.png',
  '/images/7.png',
  '/images/8.png',
  '/images/9.png'
]

Vue.component('firstgame-component', {
  // props: ['images'],
  template: "#firstgame-template",
  data : function () {
    return {
      totalMoves : 0,
      statusWin : false,
      images : images,
      dissableButton : true,
      dissableStart : false,
      timer : 0,
      startDate : 0,
      date: 0
    }
  },
  methods : {
    moveImage(i) {
      let zeroIndex = this.games.findIndex(function(e){
        return e == ""
      })
      if (this.canMove(zeroIndex, i)) {
        this.totalMoves += 1
        var a = this.games.splice(i,1,'')
        this.games.splice(zeroIndex,1,a)
      }
      this.compare()
    },
    canMove(emptyPosition, clickedPosition) {
        switch (emptyPosition) {
        case 0:
            return clickedPosition == 1 || clickedPosition == 3;
        case 1:
            return clickedPosition == 0 || clickedPosition == 2 || clickedPosition == 4;
        case 2:
            return clickedPosition == 1 || clickedPosition == 5;
        case 3:
            return clickedPosition == 0 || clickedPosition == 4 || clickedPosition == 6;
        case 4:
            return clickedPosition == 1 || clickedPosition == 3 || clickedPosition == 5 || clickedPosition == 7;
        case 5:
            return clickedPosition == 2 || clickedPosition == 4 || clickedPosition == 8;
        case 6:
            return clickedPosition == 3 || clickedPosition == 7;
        case 7:
            return clickedPosition == 4 || clickedPosition == 6 || clickedPosition == 8;
        case 8:
            return clickedPosition == 5 || clickedPosition == 7;
        }
    },
    random(){
      this.statusWin = true
      this.totalMoves = 0
      for (var i = this.games.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.games[i];
        this.games[i] = this.games[j];
        this.games[j] = temp;
      }

      var zero = this.games.findIndex(function(e){
        return e == ""
      })

      if (zero == 0 || zero == 2 || zero == 6 || zero == 8) {
        if (zero < 3) {
          let helperTop = this.games.splice(7,1,'')
          this.moveImage(4)
          this.games.splice(7,1,helperTop)
        } else {
          var helperBot = this.games.splice(1,1,'')
          this.moveImage(4)
          this.games.splice(4,1,helperBot)
        }
      } else {
        this.moveImage(4)
      }
      this.totalMoves = 0
      this.start()
      return this.games;
    },
    compare(){
      var result = this.images.slice(0,8)
      result.push('')
      if (String(this.games) == String(result) && this.statusWin) {
        this.stopTimer()
        openModalWinner()
        return 'CONGRATULATION YOU BEAT YOUR MIND !'
      } else {
        return 'LETS DO THIS'
      }
    },
    runDate: function () {
        this.date = Math.abs(Math.round((this.startDate - new Date()) / 1000));
    },
    start: function () {
        if (!this.dissableStart) {
            this.startTimer();
        }
    },
    startTimer: function () {
        this.disableButton = false;
        this.startDate = new Date();
        this.timer = setInterval(this.runDate, 1000);
    },
    stopTimer: function () {
        this.disableButton = true;
        clearInterval(this.timer);
    }
  },
  computed : {
    games:function(){
      var isi = [...this.images]
      isi.pop()
      isi.push('')
      return isi
    },
  }
})

//second game
Vue.component('secondgame-component', {
    template: `#secondGame-template`,
    data: function () {
        return {
            inputs: images,
            result: ['', '', '', '', '', '', '', '', ''],
            statusWin: false,
            disableButton: true,
            disableStart: true,
            timer: 0,
            startDate: 0,
            date: 0,
            totalMoves: 0
        }
    },
    computed: {
        pickImage: function () {
            return [...this.inputs];
        },
    },
    methods: {
        runDate: function () {
            this.date = Math.abs(Math.round((this.startDate - new Date()) / 1000));
        },
        moveToResult: function (imageName, idx) {
            if (!this.disableButton) {
                let pick = this.pickImage[idx];
                if (pick != '') {
                    this.pickImage[idx] = '';

                    for (let i = 0; i < this.result.length; i++) {
                        if (this.result[i] == '') {
                            this.result[i] = imageName;
                            break;
                        }
                    }
                    this.totalMoves += 1;
                }

            }

            this.statusWin = this.inputs + '' == this.result + '';
            if (this.statusWin) {
                this.stopTimer();
                openModalWinner()
            }
        },
        moveToPick: function (imageName, idx) {
            if (!this.disableButton) {
                let res = this.result[idx];

                if (res != '') {
                    this.result[idx] = '';

                    for (let i = 0; i < this.pickImage.length; i++) {
                        if (this.pickImage[i] == '') {
                            this.pickImage[i] = imageName;
                            break;
                        }
                    }
                    this.totalMoves += 1;
                }
            }
        },
        reset: function () {
            let newArr = [...this.inputs];

            for (let i = this.inputs.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * 8);
                var temp = newArr[i];
                newArr[i] = newArr[j];
                newArr[j] = temp;
            }

            newArr.forEach((item, idx) => {
                this.pickImage[idx] = item
            });

            this.result = ['', '', '', '', '', '', '', '', ''];
            this.totalMoves = 0;
            this.disableStart = false;
            this.statusWin = false;

            this.startDate = 0;
            this.date = 0;
            this.stopTimer();
        },
        start: function () {
            if (!this.disableStart) {
                this.startTimer();
            }
        },
        startTimer: function () {
            this.disableButton = false;
            this.startDate = new Date();
            this.timer = setInterval(this.runDate, 1000);
        },
        stopTimer: function () {
            this.disableButton = true;
            clearInterval(this.timer);
        }

    }
})


new Vue({
  el: '#app',
  data() {
    return {
      home : true,
      game_1 : false,
      game_2 : false
    }
  },
  methods : {

    navigationGame_1(id){
      $('.navbottom').removeClass('is-active')
      this.game_1 = true
      this.home = false
      this.game_2 = false
      navigationCloseBiasa()
      navigationOpenBiasa(id)
    },
    navigationHome(id){
      this.home = true
      this.game_1 = false
      this.game_2 = false
      $('.navbottom').removeClass('is-active')
      navigationCloseBiasa()
      navigationOpenBiasa(id)
    },
    navigationGame_2(id){
      this.home = false
      this.game_1 = false
      this.game_2 = true
      navigationCloseBiasa()
      navigationOpenBiasa(id)
    }
  }
})
