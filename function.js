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
      this.counter += 1
      //push ke yang kosong
      let zeroIndex = this.games.findIndex(function(e){
        return e == ""
      })
      var a = this.games.splice(i,1,'')

      this.games.splice(zeroIndex,1,a)
      console.log('INDEX',zeroIndex);

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
