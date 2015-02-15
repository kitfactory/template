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
  function startSpin() {
    console.log("startSpin");
    $('body').append('<div id="spin_modal_overlay" style="background-color: rgba(0, 0, 0, 0.6); width:100%; height:100%; position:fixed; top:0px; left:0px; z-index:' + (spinopts.zIndex - 1) + '"/>');
    var spinElem = $("#spin_modal_overlay")[0];
    spinner.spin(spinElem);
  };
  this.startSpin = startSpin;

  /**
   * スピンを終了する
   */
  function stopSpin() {
    console.log("stopSpin")
    spinner.stop();
    $('#spin_modal_overlay').remove();
  };
  this.stopSpin = stopSpin;

  /**
   * モーダルダイアログを表示する
   * @param title タイトル
   * @param text テキスト
   * @param callback コールバック
   */
  function showDialog(title, text, callback) {
    dialogVM.$data.title = title;
    dialogVM.$data.text = text;
    dialogVM.$data.callback = callback;
    $('#dialog').modal('show');
    console.log("showdialog");
  };
  this.showDialog = showDialog;

  function closeDialog() {
    $('#dialog').modal('hide');
  }
  this.closeDialog = closeDialog;

  /**
   *
   */
  this.issues = function() {
    this.startSpin();
    var total = 0;
    var base = "http://localhost/redmine/projects/restcheck/issues.json";
    var issues = [];
    $.when($.ajax({
      url: base,
      cache: false,
      dataType: "jsonp",
      success: function(d) {
        total = d.total_count;
      }
    })).then(
      function() {
        var limit = 100;
        var c = Math.floor(total / limit) + 1;
        var defs = [];
        for (i = 0; i < c; i++) {
          var u = base + "?limit=" + limit + "&offset=" + (i * limit);
          defs.push(
            $.ajax({
              url: u,
              cache: false,
              dataType: "jsonp",
              success: function(d) {
                issues = issues.concat(d.issues);
              }
            })
          );
        }
        $.when.apply(null, defs).done(
          function(){
              stopSpin();
              alert("total get issues " + issues.length);
          }
        ).fail(
          function(){
              stopSpin();
          }
        );
      },
      function() {
        stopSpin();
      }
    );
  }
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
      if (callback != null) {
        this.$data.callback();
      }
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
