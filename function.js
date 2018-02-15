function navigationOpenBiasa(id){
  $(id).addClass('is-active')
}

function navigationCloseBiasa(){
  $('.navbottom').removeClass('is-active')
}

Vue.component('firstgame-component', {
  template: "#firstgame-template",
  data : function () {
    return {
      counter : 0,
      statusWin : false,
      images : [
        '/images/1.png',
        '/images/2.png',
        '/images/3.png',
        '/images/4.png',
        '/images/5.png',
        '/images/6.png',
        '/images/7.png',
        '/images/8.png',
        '/images/9.png']
    }
  },
  methods : {
    moveImage(i) {
      let zeroIndex = this.games.findIndex(function(e){
        return e == ""
      })
      if (this.canMove(zeroIndex, i)) {
        this.counter += 1
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
      this.counter = 0
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
      this.counter = 0

      return this.games;
    },
    compare(){
      var result = this.images.slice(0,8)
      result.push('')
      if (String(this.games) == String(result) && this.statusWin) {
        return 'CONGRATULATION YOU BEAT YOUR MIND !'
      } else {
        return 'LETS DO THIS'
      }
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

new Vue({
  el: '#app',
  data : {
    home : true,
    game_1 : false,
    game_2 : false
  },
  methods : {

    navigationGame_1(id){
      $('.navbottom').removeClass('is-active')
      this.home = false
      this.game_1 = true
      navigationCloseBiasa()
      navigationOpenBiasa(id)
      // document.getElementById(id).classList.add('is-active')
    },
    navigationHome(id){
      this.home = true
      this.game_1 = false
      navigationCloseBiasa()
      navigationOpenBiasa(id)
      // document.getElementById(id).classList.add('is-active')
    },
  }
  // data: {
  //   home : true,
  //   game_1 : false,
  //   message: 'Hello Vue!',
  //   counter : 0,
  //   statusWin : false,
  //   images : [
  //     '/images/1.png',
  //     '/images/2.png',
  //     '/images/3.png',
  //     '/images/4.png',
  //     '/images/5.png',
  //     '/images/6.png',
  //     '/images/7.png',
  //     '/images/8.png',
  //     '/images/9.png']
  // },
  // methods : {
  //   navigationGame_1(id){
  //     $('.navbottom').removeClass('is-active')
  //     this.home = false
  //     this.game_1 = true
  //     navigationCloseBiasa()
  //     navigationOpenBiasa(id)
  //     // document.getElementById(id).classList.add('is-active')
  //   },
  //   navigationHome(id){
  //     this.home = true
  //     this.game_1 = false
  //     navigationCloseBiasa()
  //     navigationOpenBiasa(id)
  //     // document.getElementById(id).classList.add('is-active')
  //   },
  //   moveImage(i) {
  //     let zeroIndex = this.games.findIndex(function(e){
  //       return e == ""
  //     })
  //     // if (this.canMove(zeroIndex, i)) {
  //       this.counter += 1
  //       var a = this.games.splice(i,1,'')
  //       this.games.splice(zeroIndex,1,a)
  //     // }
  //
  //     this.compare()
  //   },
  //   canMove(emptyPosition, clickedPosition) {
  //       switch (emptyPosition) {
  //       case 0:
  //           return clickedPosition == 1 || clickedPosition == 3;
  //       case 1:
  //           return clickedPosition == 0 || clickedPosition == 2 || clickedPosition == 4;
  //       case 2:
  //           return clickedPosition == 1 || clickedPosition == 5;
  //       case 3:
  //           return clickedPosition == 0 || clickedPosition == 4 || clickedPosition == 6;
  //       case 4:
  //           return clickedPosition == 1 || clickedPosition == 3 || clickedPosition == 5 || clickedPosition == 7;
  //       case 5:
  //           return clickedPosition == 2 || clickedPosition == 4 || clickedPosition == 8;
  //       case 6:
  //           return clickedPosition == 3 || clickedPosition == 7;
  //       case 7:
  //           return clickedPosition == 4 || clickedPosition == 6 || clickedPosition == 8;
  //       case 8:
  //           return clickedPosition == 5 || clickedPosition == 7;
  //       }
  //   },
  //   random(){
  //     this.statusWin = true
  //     this.counter = 0
  //     for (var i = this.games.length - 1; i > 0; i--) {
  //       var j = Math.floor(Math.random() * (i + 1));
  //       var temp = this.games[i];
  //       this.games[i] = this.games[j];
  //       this.games[j] = temp;
  //     }
  //
  //     var zero = this.games.findIndex(function(e){
  //       return e == ""
  //     })
  //
  //     if (zero == 0 || zero == 2 || zero == 6 || zero == 8) {
  //       if (zero < 3) {
  //         let helperTop = this.games.splice(7,1,'')
  //         this.moveImage(4)
  //         this.games.splice(7,1,helperTop)
  //       } else {
  //         var helperBot = this.games.splice(1,1,'')
  //         this.moveImage(4)
  //         this.games.splice(4,1,helperBot)
  //       }
  //     } else {
  //       this.moveImage(4)
  //     }
  //     this.counter = 0
  //
  //     return this.games;
  //   },
  //   compare(){
  //     var result = this.images.slice(0,8)
  //     result.push('')
  //     if (String(this.games) == String(result) && this.statusWin) {
  //       return 'CONGRATULATION YOU BEAT YOUR MIND !'
  //     } else {
  //       return 'LETS DO THIS'
  //     }
  //   }
  // },
  // computed : {
  //   games:function(){
  //     var isi = [...this.images]
  //     isi.pop()
  //     isi.push('')
  //     return isi
  //   },
  // }
})
