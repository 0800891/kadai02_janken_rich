/*
Copyright 2016 Delta System Solutions Co.Ltd. All rights reserved.
*/
/*---------------------
 Customize Settings
-----------------------*/
// スロット画像配列
// var slotImg = ['slot1.jpg','slot2.jpg','slot3.jpg','slot4.jpg','slot5.jpg'];
var slotImg = ['slot1.jpg','slot2.jpg','slot3.jpg'];
// 縦に並べるスロット画像の数
var slotNum = 50;
// スロット画像のスタート位置
var startPos = -30 * (slotNum - 3);
// スロット画像の停止位置
var stopPos = -150;
// 最後に真ん中（２行目）にくるスロット画像の番号
var middleNum = 3;
// 回転エフェクト配列（jQuery easing）
// var slotEasing = ['swing','easeOutQuart','easeOutBack','easeOutBounce'];
var slotEasing = ['easeOutQuart'];
// 回転秒数
var slotDuration = 5;
// 当たり目確率（1=100%、0.5=50%）
var kakuritu = 1.0;
// 点数
let tensuu = 0;
// 前回の点数
let previous_tensuu = 0;

/*---------------------
 Definitions
-----------------------*/
var atariIdx;
var easingIdx;
// var hantei;
var time;
var result1 = new Array();
var result2 = new Array();
var result3 = new Array();

/*---------------------
 Functions
-----------------------*/
/* 初期処理 */
$(document).ready(function() {
  // 当たり判定
//   atariHantei();
  // A枠にスロット画像を生成
  slotCreate( $("#slots_a .wrapper"), 1 );
  // B枠にスロット画像を生成
  slotCreate( $("#slots_b .wrapper"), 2 );
  // C枠にスロット画像を生成
  slotCreate( $("#slots_c .wrapper"), 3 );


  slotPoints()
});

/* 当たり判定 */
// function atariHantei(){
//   atariIdx = Math.floor(Math.random() * slotImg.length);
//   hantei = Math.random() < kakuritu;
// };

/*当たった場合の色の変更*/
// classの場合
function changeColorClass(className, color){
    var elems = document.getElementsByClassName(className);

    //文字色変える
    elems[0].style.backgroundColor =  color;
    elems[1].style.backgroundColor =  color;
    elems[2].style.backgroundColor =  color;
}

// id の場合
function changeColorId(IdName, color){
    var elem = document.getElementById(IdName);

    //文字色変える
    elem.style.backgroundColor =  color;
}



//スロットの特点
function slotPoints(a,b,c){
    if(a===0){
        if(a===b && b===c){
            return 1;
        }else{
            return 0;
        }
    }else if(a===1){
        if(a===b && b===c){
            return 2;
        }else{
            return 0;
        }
    }else if(a===2){
        if(a===b && b===c){
            return 3;
        }else{
            return 0;
        }
    }
    }

/* スロット画像生成 */
function slotCreate(obj, slotno){

  // アニメーションをストップ（アニメーション処理中の場合の対応）
  obj.stop(true, true);
  // 枠内の要素をクリア
  obj.children().remove();
  
  // 前回結果を退避
  // 1行目の画像INDEXをセーブ
  var save_result1 = result1[slotno];
  // 2行目の画像INDEXをセーブ
  var save_result2 = result2[slotno];
  // 3行目の画像INDEXをセーブ
  var save_result3 = result3[slotno];
  
  //横線の色を戻す
  changeColorClass('slotline-top','red');
  changeColorClass('slotline-middle','red');
  changeColorClass('slotline-bottom','red');
  //斜め線の色を戻す
  changeColorId('a_naname-shita-slotline', 'red');
  changeColorId('b_naname-shita-slotline', 'red');
  changeColorId('c_naname-shita-slotline', 'red');
  changeColorId('a_naname-ue-slotline', 'red');
  changeColorId('b_naname-ue-slotline', 'red');
  changeColorId('c_naname-ue-slotline', 'red');

  var slot_random = []
  // スロット画像のタグ生成
  for (var i = 0; i <= slotNum; i++) {
    // 画像ファイルは配列からランダムに取得
    var idx = Math.floor(Math.random() * slotImg.length);
    
    // 画像ファイルの調整
    if (i == middleNum-1) {
      // 最後に1行目にくる画像
      result1[slotno] = idx;
    } else if (i == middleNum) {
      // 最後に2行目にくる画像
    //   if (hantei) {
    //     // 当たり判定の場合は当たり目のINDEXを設定
    //     idx = atariIdx;
    //   }
      result2[slotno] = idx;
    } else if (i == middleNum+1) {
      // 最後に3行目にくる画像
      result3[slotno] = idx;
    } else if (i == slotNum-2) {
      // 最初に1行目にくる画像
      if (save_result1 != undefined) {
        // 前回結果の1行目の画像INDEXを設定
        idx = save_result1;
      }
    } else if (i == slotNum-1) {
      // 最初に2行目にくる画像
      if (save_result2 != undefined) {
        // 前回結果の2行目の画像INDEXを設定
        idx = save_result2;
      }
    } else if (i == slotNum) {
      // 最初に3行目にくる画像
      if (save_result3 != undefined) {
        // 前回結果の3行目の画像INDEXを設定
        idx = save_result3;
      }
      
    }
    
    obj.append("<div class='slot'>"
    + "<img border='0' class='ml-4'"
    + " src='img/" + slotImg[idx] + "'"
    + " width='45' height='20'/>"
    + "</div>");
    slot_random[i] = idx;
    // console.log(idx)
  }
  
  // スロット画像のスタート位置を設定
  obj.css({
    "margin-top" : startPos + "px"
  });
  console.log(slot_random[middleNum-1,middleNum,middleNum+1])

  console.log("Top 1列目"+result1[1],"2列目"+result1[2],"3列目"+result1[3])
  console.log("Middle 1列目"+result2[1],"2列目"+result2[2],"3列目"+result2[3])
  console.log("Bottom 1列目"+result3[1],"2列目"+result3[2],"3列目"+result3[3])
//   return [slot_random[middleNum-1,middleNum,middleNum+1]]
//   console.log(result2)
//   console.log(result3)
}

/* スロットスタート */
function slotStart(){
  
  // スタートボタンの無効化
  $("#startBtn").prop('disabled', true);
  
  // 開始メッセージ表示
  $("#slotMsg").html("GO !!");
  
  //点数表示
  $("#tensuu").html(tensuu);

  if ($("#slots_a .wrapper").css("margin-top") != startPos + "px"){
    // スロットが動いた後であれば、当たり判定を再度行なう
    // atariHantei();
  }
  
  // スロットの回転秒数の取得
  time = slotDuration * 1000;
  // スロットの回転エフェクトをランダムに取得
  easingIdx = Math.floor(Math.random() * slotEasing.length);
  
  // A枠のスロット画像移動
  slotMove( $("#slots_a .wrapper"), 1 );
  // 少し遅れてB枠のスロット画像移動
  setTimeout( function() {
    slotMove($("#slots_b .wrapper"), 2 );
  }, 200);
  // さらに少し遅れてC枠のスロット画像移動
  setTimeout( function() {
    slotMove($("#slots_c .wrapper"), 3 );
  }, 400);
  
  // スロット停止後の処理（jQueryキューで回転秒数後に実行）
  $(this).delay(time+500).queue(function() {
    
//結果判定に入る前に、前回の点数を保存
previous_tensuu = tensuu;
// 結果判定: 上　横
if (result1[1] == result1[2] && result1[1] == result1[3]) {
    // あたりメッセージ表示
    $("#slotMsg").html("BINGO !!!");
     // 点数１ポイントゲット
    tensuu += 1;
    //点数更新
    $("#tensuu").html(tensuu);
    //横線の色を変更
    // console.log(document.getElementsByClassName('slotline-top'))
    changeColorClass('slotline-top','blue');
} else {
   // そのままの点数表示
    $("#tensuu").html(tensuu);
}

// 結果判定: 中央　横
if (result2[1] == result2[2] && result2[1] == result2[3]) {
    // あたりメッセージ表示
    $("#slotMsg").html("BINGO !!!");
    // 点数１ポイントゲット
    tensuu += 1;
    // 点数更新
    $("#tensuu").html(tensuu);
    //横線の色を変更

    // console.log(document.getElementsByClassName('slotline-middle'))
    changeColorClass('slotline-middle','blue');
} else {
    // そのままの点数表示
    $("#tensuu").html(tensuu);
    
    }
    
// 結果判定: 下　横
if (result3[1] == result3[2] && result3[1] == result3[3]) {
    // あたりメッセージ表示
    $("#slotMsg").html("BINGO !!!");
    // 点数１ポイントゲット
    tensuu += 1;
    $("#tensuu").html(tensuu);
    //横線の色を変更
    // console.log(document.getElementsByClassName('slotline-bottom'))
    changeColorClass('slotline-bottom','blue');
} else {
    
    // そのままの点数表示
    $("#tensuu").html(tensuu);
}
    
// 結果判定: 斜め下
if (result1[1] == result2[2] && result1[1] == result3[3]) {
    // あたりメッセージ表示
    $("#slotMsg").html("BINGO !!!");
    // 点数１ポイントゲット
    tensuu += 1;
    // 点数更新
    $("#tensuu").html(tensuu);
    //斜め線の色の変更
    changeColorId('a_naname-shita-slotline', 'blue');
    changeColorId('b_naname-shita-slotline', 'blue');
    changeColorId('c_naname-shita-slotline', 'blue');
} else {
    // そのままの点数表示
    $("#tensuu").html(tensuu);
}
    
// 結果判定: 斜め上
if (result3[1] == result2[2] && result3[1] == result1[3]) {
    
    // 点数１ポイントゲット
    tensuu += 1;
    // 点数更新
    $("#tensuu").html(tensuu);
    //斜め線の色の変更
    changeColorId('a_naname-ue-slotline', 'blue');
    changeColorId('b_naname-ue-slotline', 'blue');
    changeColorId('c_naname-ue-slotline', 'blue');
} else {
    // そのままの点数表示
    $("#tensuu").html(tensuu);
}

if (tensuu > previous_tensuu){
// あたりメッセージ表示
$("#slotMsg").html("BINGO !!!");
}else{
// はずれメッセージ表示
$("#slotMsg").html("TRY AGAIN");
}
 
    // スタートボタンの有効化
    $("#startBtn").prop('disabled', false);
    
    // キュー削除
    $(this).dequeue();
  });
}

/* スロット画像移動 */
function slotMove(obj, slotno){

  if (obj.css("margin-top") != startPos + "px"){
    // スロットが動いた後であれば、スロット画像を再作成
    slotCreate( obj, slotno );
  }
  
  // スロット画像の移動アニメーション
  obj.animate({
    "margin-top" : stopPos + "px"
  }, {
    'duration' : time,
    'easing' : slotEasing[easingIdx]
  });
};