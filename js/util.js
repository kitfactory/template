var app = new Vue({
  el: "#app",
  methods:{
    click: function(){
        alert( "Hello VueJS");
    }
    spin: function(){
      console.log("spin here");
    }
  },
});

$( function(){
  console.log("start jquery");
});

function spin()
{
  console.log("spin");

}

var text = "テキストデータ";

function sava( text ){
  var blob = new Blob([text], {type: "text/plain"}); // バイナリデータを作ります。

  // IEか他ブラウザかの判定
  if(window.navigator.msSaveBlob)
  {
      // IEなら独自関数を使います。
      window.navigator.msSaveBlob(blob, "ファイル名.txt");
  } else {
      // それ以外はaタグを利用してイベントを発火させます
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.target = '_blank';
      a.download = 'ファイル名.txt';
      a.click();
  }
}
