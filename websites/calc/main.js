let app = new Vue({
  el: '#app',
  data: {
    result: '',
    numbers: [1,2,3,4,5,6,7,8,9,0],
    operation: ['+', '-', '*', '/','(',')']
  },
  methods: {
    input:function(char) {
      this.result = this.result.toString();
      this.result += char;
    },
    pi:function () {
      this.result += 3.14;
    },
    reset: function(){
      this.result = '';
    },  
    calc: function(){
      this.result = Math.round(eval(this.result)* 1000)/1000;
    },
    checkName: function(event){
      
    }
  }
});
