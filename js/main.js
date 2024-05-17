/*
Copyright 2016 Delta System Solutions Co.Ltd. All rights reserved.
*/
/*---------------------
 Customize Settings
-----------------------*/
// スロット画像配列
// var slotImg = ['slot1.jpg','slot2.jpg','slot3.jpg','slot4.jpg','slot5.jpg'];
var slotImg = ['slot11.jpg','slot12.jpg','slot13.jpg'];
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
var slotDuration = 1;
// 当たり目確率（1=100%、0.5=50%）
var kakuritu = 1.0;
// 点数
let tensuu_1 = 0;
let tensuu_2 = 0;
// 前回の点数
let previous_tensuu_1 = 0;
let previous_tensuu_2 = 0;
//Offence or Deffence
let num_offense = 0;
// スタートボタンの回数
let num_start = 0;
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

const min = document.getElementById("min");
const sec = document.getElementById("sec");
let min_temp=1;
let sec_temp=1;
var count   = 284;//dai_zero_kanの曲は284秒 

/*---------------------
 Functions
-----------------------*/
// Countdown
function count_down(){
  if(count>0){
              count--;
              min_temp = Math.floor(count / 60);
              sec_temp = count % 60;
              // var count_down = document.getElementById("default");
              // count_down.innerHTML = ("0"+min) +"：" + ("0"+sec).slice(-2);
              $("#min").html(min_temp);
              $("#sec").html(sec_temp);
              // console.log(count);
  }else{
    $("#min").html("0");
              $("#sec").html("0");
  }
      }

function count_start(){
                if (num_start === 1) {
                  interval = setInterval(count_down,1000);
                }
            }
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

// オフェンスかディフェンスか
function offense_defense(){
    var num_off_def = Math.floor(Math.random() * 2);
    if(min_temp != 0 || sec_temp != 0){
    if (num_off_def === 0){
        $("#shouhoku_off").html("オフェンス");
        // $("#shouhoku_img").attr('src','img/kawata.jpeg');
        // document.getElementById('shouhoku_img').src='img/shouhoku_def.jpeg';
        changeImgId('shouhoku_img', 'img/shouhoku_off_02.jpeg');

        $("#sannou_off").html("ディフェンス");
        // $("#sannou_img").attr('src','img/sannou_def.jpeg');
        changeImgId('sannou_img', 'img/sannou_def_01.jpg');

    }else{
        $("#shouhoku_off").html("ディフェンス");
        changeImgId('shouhoku_img', 'img/shouhoku_def_01.jpeg');
        $("#sannou_off").html("オフェンス");
        changeImgId('sannou_img', 'img/sannou_off.jpg');
        // $("#character_image").attr('src','img/kawata.jpeg');

    }
  }else{
    
    if(tensuu_1>=tensuu_2){
    $("#shouhoku_off").html("勝利");
    $("#sannou_off").html("敗北");
    changeImgId('shouhoku_img', 'img/shouhoku_win.jpeg');
    changeImgId('sannou_img', 'img/sannou_lost.jpeg');
    }else{
    $("#shouhoku_off").html("敗北");
    $("#sannou_off").html("勝利");
    changeImgId('shouhoku_img', 'img/shouhoku_lost_01.jpeg');
    changeImgId('sannou_img', 'img/sannou_win.jpeg');

    }
  }
    return num_off_def
}

// 画像の変更
function changeImgId(IdName, img){
    var elem = document.getElementById(IdName);

    //文字色変える
    elem.src =  img;
}

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

/*当たった場合の高さの変更*/
// classの場合
function changeHeightClass(className, Height,Top){
    var elems = document.getElementsByClassName(className);

    //高さを変える
    elems[0].style.height =  Height;
    elems[1].style.height =  Height;
    elems[2].style.height =  Height;

    //位置を変える
    elems[0].style.top =  Top;
    elems[1].style.top =  Top;
    elems[2].style.top =  Top;
}

//Idの場合
function changeHeightId(IdName, Height,Top){
    var elem = document.getElementById(IdName);
    //高さを変える
    elem.style.height =  Height;
    //位置を変える
    elem.style.top =  Top;
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

  //横線の高さを戻す
  changeHeightClass('slotline-top','2px','30px');
  changeHeightClass('slotline-middle','2px','85px');
  changeHeightClass('slotline-bottom','2px','140px');
  //斜め線の高さを戻す
  changeHeightId('a_naname-shita-slotline','2px','30px');
  changeHeightId('b_naname-shita-slotline','2px','85px');
  changeHeightId('c_naname-shita-slotline','2px','140px');
  changeHeightId('a_naname-ue-slotline','2px','140px');
  changeHeightId('b_naname-ue-slotline','2px','85px');
  changeHeightId('c_naname-ue-slotline','2px','30px');

  //画像を非表示
  $("#character_image").attr('src','');

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
  console.log(min_temp);
  console.log(sec_temp);
 num_start += 1;
  //音楽再生
  if (num_start===1){
  $("#back_music").attr('src','media/dai_zero_kan.mp3');
  count_start();
  };

  if(min_temp === 0 && sec_temp === 0){
  $("#back_music").attr('src','');
  }
  // スタートボタンの無効化
  $("#startBtn").prop('disabled', true);
  
  // 開始メッセージ表示
  $("#slotMsg").html("速攻!!");
  
  // オフェンス
  num_offense = offense_defense()


  //点数表示
  $("#tensuu_1").html(tensuu_1);
  $("#tensuu_2").html(tensuu_2);


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
    previous_tensuu_1 = tensuu_1;
    previous_tensuu_2 = tensuu_2;
    // 結果判定: 上　横
    if (result1[1] == result1[2] && result1[1] == result1[3]) {
    
     // 点数１ポイントゲット
     if (num_offense == 0){
        tensuu_1 += slotPoints(result1[1],result1[2],result1[3]);
        $("#character_image").attr('src','img/miyagi.jpeg');
     }else{
        tensuu_2 += slotPoints(result1[1],result1[2],result1[3]);
        $("#character_image").attr('src','img/hukatsu.png');

     }
    //点数更新
    $("#tensuu_1").html(tensuu_1);
    $("#tensuu_2").html(tensuu_2);
    //横線の色を変更
    changeColorClass('slotline-top','blue');
    //横線の高さを変更
    changeHeightClass('slotline-top','4px','29px');
    } else {
   // そのままの点数表示
    $("#tensuu_1").html(tensuu_1);
    $("#tensuu_2").html(tensuu_2);
    }

// 結果判定: 中央　横
    if (result2[1] == result2[2] && result2[1] == result2[3]) {
   
    // 点数１ポイントゲット
     if (num_offense == 0){
        tensuu_1 += slotPoints(result2[1],result2[2],result2[3]);
        $("#character_image").attr('src','img/rukawa.jpeg');
     }else{
        tensuu_2 += slotPoints(result2[1],result2[2],result2[3]);
        $("#character_image").attr('src','img/sawakita.jpeg');
     }
    // 点数更新
    $("#tensuu_1").html(tensuu_1);
    $("#tensuu_2").html(tensuu_2);
    //横線の色を変更
    changeColorClass('slotline-middle','blue');
    //横線の高さを変更
    changeHeightClass('slotline-middle','4px','84px');
    } else {
    // そのままの点数表示
    $("#tensuu_1").html(tensuu_1);
    $("#tensuu_2").html(tensuu_2);
    }
    
// 結果判定: 下　横
if (result3[1] == result3[2] && result3[1] == result3[3]) {
    // あたりメッセージ表示
    $("#slotMsg").html("BINGO !!!");
    // 点数１ポイントゲット
     if (num_offense == 0){
        tensuu_1 += slotPoints(result3[1],result3[2],result3[3]);
        $("#character_image").attr('src','img/mitsui.jpeg');
     }else{
        tensuu_2 += slotPoints(result3[1],result3[2],result3[3]);
        $("#character_image").attr('src','img/matsumoto-minoru.jpeg');
     }
     $("#tensuu_1").html(tensuu_1);
     $("#tensuu_2").html(tensuu_2);
    //横線の色を変更
    changeColorClass('slotline-bottom','blue');
    //横線の高さを変更
    changeHeightClass('slotline-bottom','4px','139px');
    } else {
    
    // そのままの点数表示
    $("#tensuu_1").html(tensuu_1);
    $("#tensuu_2").html(tensuu_2);
    }
    
// 結果判定: 斜め下
if (result1[1] == result2[2] && result1[1] == result3[3]) {
    // あたりメッセージ表示
    $("#slotMsg").html("BINGO !!!");
    // 点数１ポイントゲット
     if (num_offense == 0){
        tensuu_1 += slotPoints(result1[1],result2[2],result3[3]);
        $("#character_image").attr('src','img/akagi.png');
     }else{
        tensuu_2 += slotPoints(result1[1],result2[2],result3[3]);
        $("#character_image").attr('src','img/kawata.jpeg');
     }
    // 点数更新
    $("#tensuu_1").html(tensuu_1);
    $("#tensuu_2").html(tensuu_2);
    //斜め線の色の変更
    changeColorId('a_naname-shita-slotline', 'blue');
    changeColorId('b_naname-shita-slotline', 'blue');
    changeColorId('c_naname-shita-slotline', 'blue');
    //斜め線の高さの変更
    changeHeightId('a_naname-shita-slotline','4px','29px');
    changeHeightId('b_naname-shita-slotline','4px','84px');
    changeHeightId('c_naname-shita-slotline','4px','139px');
    } else {
    // そのままの点数表示
    $("#tensuu_1").html(tensuu_1);
    $("#tensuu_2").html(tensuu_2);
    }
    
    // 結果判定: 斜め上
    if (result3[1] == result2[2] && result3[1] == result1[3]) {
    
    // 点数１ポイントゲット
     if (num_offense == 0){
        tensuu_1 += slotPoints(result3[1],result2[2],result1[3]);
        $("#character_image").attr('src','img/hanamichi.jpeg');
     }else{
        tensuu_2 += slotPoints(result3[1],result2[2],result1[3]);
        $("#character_image").attr('src','img/kawata-mikio.jpeg');
     }
    // 点数更新
    $("#tensuu_1").html(tensuu_1);
    $("#tensuu_2").html(tensuu_2);
    //斜め線の色の変更
    changeColorId('a_naname-ue-slotline', 'blue');
    changeColorId('b_naname-ue-slotline', 'blue');
    changeColorId('c_naname-ue-slotline', 'blue');
    //斜め線の高さの変更
    changeHeightId('a_naname-ue-slotline','4px','139px');
    changeHeightId('b_naname-ue-slotline','4px','84px');
    changeHeightId('c_naname-ue-slotline','4px','29px');
    } else {
    // そのままの点数表示
    $("#tensuu_1").html(tensuu_1);
    $("#tensuu_2").html(tensuu_2);
    }

if (tensuu_1 > previous_tensuu_1+4){
// 特大あたりメッセージ表示
$("#slotMsg").html("うおおおーーーっ !!!");
}else if(tensuu_1 > previous_tensuu_1){
// あたりメッセージ表示
$("#slotMsg").html("いい仕事したぜ 下手なりに");
}else{
// はずれメッセージ表示
if (tensuu_2==previous_tensuu_2&&num_offense == 0){
$("#slotMsg").html("どあほう");
$("#character_image").attr('src','img/sannou_def_success.jpeg');
}
}


if (tensuu_2 > previous_tensuu_2+4){
    // 特大あたりメッセージ表示
    $("#slotMsg").html("あきらめたらそこで試合終了ですよ");
    }else if(tensuu_2 > previous_tensuu_2){
    // あたりメッセージ表示
    $("#slotMsg").html("華麗な技を持つ河田は鯛・・・");
    }else{
    // はずれメッセージ表示

if (tensuu_1==previous_tensuu_1&&num_offense == 1){
    $("#slotMsg").html("ヤマオーは俺が倒す");
    $("#character_image").attr('src','img/shouhoku_def_success.jpeg');
    }
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