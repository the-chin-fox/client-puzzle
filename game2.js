Vue.component('secondgame-component', {
    template: `#secondGame-template`,
    data: function () {
        return {
            inputs: [
                './images/1.png', './images/2.png', './images/3.png',
                './images/4.png', './images/5.png', './images/6.png',
                './images/7.png', './images/8.png', './images/9.png'
            ],
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


var item = new Vue({
    el: '#game_2',
})