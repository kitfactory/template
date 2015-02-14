function App() {

  var spinopts = {
    lines: 5, // The number of lines to draw
    length: 20, // The length of each line
    width: 10, // The line thickness
    radius: 30, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#fff', // #rgb or #rrggbb or array of colors
    speed: 0.7, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the      spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '50%', // Top position relative to parent
    left: '50%' // Left position relative to parent
  };

  var spinner = new Spinner(spinopts);
  var spinTarget = document.getElementById('app');

  /**
   * spinを実施する。
   */
  this.startSpin = function() {
    $('body').append('<div id="spin_modal_overlay" style="background-color: rgba(0, 0, 0, 0.6); width:100%; height:100%; position:fixed; top:0px; left:0px; z-index:' + (spinopts.zIndex - 1) + '"/>');
    var spinElem = $("#spin_modal_overlay")[0];
    spinner.spin(spinElem);
    setTimeout(this.stopSpin, 5000);
  };

  /**
   * スピンを終了する
   */
  this.stopSpin = function() {
    console.log("stopSpin")
    spinner.stop();
    $('#spin_modal_overlay').remove();
  };

  /**
   * モーダルダイアログを表示する
   * @param title タイトル
   * @param text テキスト
   * @param callback コールバック
   */
  this.showDialog = function(title, text, callback) {
    dialogVM.$data.title = title;
    dialogVM.$data.text = text;
    dialogVM.$data.callback = callback;
    $('#dialog').modal('show');
    console.log("showdialog");
  };
};

var app = new App();


var appvm = new Vue({
  el: "#app",
  methods: {
    click: function() {
      alert("Hello VueJS");
    },
    spin: function() {
      console.log("spin here");
    }
  },
});

function vmcallback() {
  console.log("callback vm");
}

var dialogVM = new Vue({
  el: "#dialog",
  data: {
    title: "",
    text: "",
    callback: null,
  },
  methods: {
    closeDialog: function() {
      console.log("closing dialog");
      this.$data.callback();
    }
  }
});


$(function() {
  //ready app objects.
  console.log("start jquery");
});


var text = "テキストデータ";

function sava(text) {
  var blob = new Blob([text], {
    type: "text/plain"
  }); // バイナリデータを作ります。

  // IEか他ブラウザかの判定
  if (window.navigator.msSaveBlob) {
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
