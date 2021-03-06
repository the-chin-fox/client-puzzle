function navigationOpenBiasa(id){
  $(id).addClass('is-active')
}

function navigationCloseBiasa(){
  $('.navbottom').removeClass('is-active')
}

function closeModal(id){
  document.querySelector(id).classList.remove('is-active')
}

var finalMove = 0;
var finalTime = 0;
var finalGame = 0;

function openModalWinner(){
  document.querySelector('#submitScore').classList.add('is-active')
  document.getElementById("#finalMove").value = finalMove;
  document.getElementById("#finalTime").value = finalTime;
  document.getElementById("#finalGame").value = finalGame;
}

var images = []

//Custom Puzzle Component
Vue.component('custom-component', {
  template : "#custom-template",
  data : function () {
    return {

    }
  },
  methods: {
    uploadImage () {
      images = []
      let imageId = document.querySelector('#imageId')
      const formData = new FormData()

      formData.append('image', imageId.files[0])
      axios.post(`http://localhost:3000/api/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((result) => {
        images.push(result.data.imageSlice1)
        images.push(result.data.imageSlice4)
        images.push(result.data.imageSlice7)
        images.push(result.data.imageSlice2)
        images.push(result.data.imageSlice5)
        images.push(result.data.imageSlice8)
        images.push(result.data.imageSlice3)
        images.push(result.data.imageSlice6)
        images.push(result.data.imageSlice9)
        swal({
          title: "Good job!",
          text: "Your photo's has been uploaded !",
          icon: "success",
          button: "Let's play!",
        });
        console.log(images);
      }).catch((err) => {
        console.log(err);
      })
    }
  }
})

//Leaderboard Component
Vue.component('leaderboard-component', {
  template : "#leaderboard-template",
  data : function (){
    return {

    }
  },
  methods : {

  }
})


Vue.component('firstgame-component', {
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

        finalMove = 0;
        finalTime = 0;
    },
    stopTimer: function () {
        this.disableButton = true;
        clearInterval(this.timer);

        finalMove = this.totalMoves;
        finalTime = this.date;
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

            finalMove = 0;
            finalTime = 0;
        },
        stopTimer: function () {
            this.disableButton = true;
            clearInterval(this.timer);

            finalMove = this.totalMoves;
            finalTime = this.date;
        }
    }
})


new Vue({
  el: '#app',
  data() {
    return {
      home : true,
      game_1 : false,
      game_2 : false,
      leaderboard : false,
      custom : false,
      username : ''
    }
  },
  methods : {
    navigationGame_1(id){
      $('.navbottom').removeClass('is-active')
      this.game_1 = true
      this.home = false
      this.game_2 = false
      this.leaderboard = false
      this.custom = false
      navigationCloseBiasa()
      navigationOpenBiasa(id)
      finalGame = 1;
    },
    navigationHome(id){
      this.home = true
      this.game_1 = false
      this.game_2 = false
      this.leaderboard = false
      this.custom = false
      $('.navbottom').removeClass('is-active')
      navigationCloseBiasa()
      navigationOpenBiasa(id)
    },
    navigationGame_2(id){
      this.home = false
      this.game_1 = false
      this.game_2 = true
      this.leaderboard = false
      this.custom = false
      navigationCloseBiasa()
      navigationOpenBiasa(id)
      finalGame = 2;
    },
    navigationLeaderboard(id){
      this.home = false
      this.game_1 = false
      this.game_2 = false
      this.leaderboard = true
      this.custom = false
      navigationCloseBiasa()
      navigationOpenBiasa(id)
    },
    navigationCustom(id){
      this.home = false
      this.game_1 = false
      this.game_2 = false
      this.leaderboard = false
      this.custom = true
      navigationCloseBiasa()
      navigationOpenBiasa(id)
    },
    saveScore(){
      axios.post('http://localhost:3000/api/leaderboard/', {
        name: this.username,
        move: document.getElementById("#finalMove").value,
        time: document.getElementById("#finalTime").value,
        game: document.getElementById("#finalGame").value
      })
      .then(function (response) {
        closeModal('#submitScore')
        console.log('response');
        console.log(response);
      })
      .catch(function (error) {
        console.log('error');
        console.log(error);
      });
    },
  }
})
