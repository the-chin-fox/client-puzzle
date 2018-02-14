var abc = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    counter : 0,
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
  },
  methods : {
    moveImage(i) {

      //push ke yang kosong
      let zeroIndex = this.games.findIndex(function(e){
        return e == ""
      })

      if (this.canMove(zeroIndex, i)) {
        this.counter += 1
        var a = this.games.splice(i,1,'')
        this.games.splice(zeroIndex,1,a)
      }

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

      // if (zero == 0 || zero == 2 || zero == 6 || zero == 8) {
      //   var helper = this.games.splice(1,1,'')
      //   this.moveImage(4)
      //   this.games.splice(4,1,helper)
      // } else {
      //   this.moveImage(4)
      // }

        this.moveImage(4)
      // if (this.couter()) {
      //
      // }


      return this.games;
    },
    compare(){
      var result = this.images.slice(0,8)
      result.push('')
      if (String(this.games) == String(result)) {
        return 'MENANG'
      } else {
        return 'BELUM'
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
