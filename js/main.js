'use strict';
{
  function putStr2(tgtStr,ix,iy) {
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');

    // 文字列削除処理（一括）
    ctx.beginPath();
    ctx.moveTo(ix,iy);
    ctx.lineTo(ix+(tgtStr.length)*70, iy);
    ctx.lineTo(ix+(tgtStr.length)*70-19, iy+113);
    ctx.lineTo(ix-19, iy+113);
    ctx.lineTo.closePath;
    ctx.fillStyle = '#aaa';
    ctx.fill();

    // 文字列描画処理
    for (let cnt=0;cnt<tgtStr.length;cnt++){
      //console.log(cnt,tgtStr[cnt]);
      if (tgtStr[cnt]===':'){
        putChar_2D(ctx, ix + cnt * 70, iy);
      }
      if (tgtStr[cnt]==='-'){
        putChar_3A(ctx, ix + cnt * 70, iy);
      } 
      if (tgtStr[cnt]>='0' && tgtStr[cnt]<='9'){
        let tgtNum = tgtStr.charCodeAt(cnt) - 0x30;
        //console.log(cnt,tgtStr[cnt],tgtNum);
        putNum(ctx, tgtNum, ix + cnt * 70, iy);
      }
    }
  } // end of function putStr2

  // Colonの描画
  function putChar_2D(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x+25,y+15);
    ctx.lineTo(x+40,y+15);
    ctx.lineTo(x+37,y+33);
    ctx.lineTo(x+22,y+33);
    ctx.lineTo.closePath;
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x+10,y+98);
    ctx.lineTo(x+13,y+80);
    ctx.lineTo(x+28,y+80);
    ctx.lineTo(x+25,y+98);
    ctx.lineTo.closePath;
    ctx.fillStyle = '#000000';
    ctx.fill();
  }
  // マイナスの描画
  function putChar_3A(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x,y+59);
    ctx.lineTo(x+10,y+49);
    ctx.lineTo(x+45,y+49);
    ctx.lineTo(x+50,y+54);
    ctx.lineTo(x+40,y+64);
    ctx.lineTo(x+5,y+64);
    ctx.lineTo.closePath;
    ctx.fillStyle = '#000000';
    ctx.fill();
  }

  function putNum(ctx, Num, x, y){
    // 0～9描画時、各セグメントのON/OFF情報をビットに置き換えた配列
    var BitSegs = [0x77, 0x12, 0x5d, 0x5b, 0x3a, 0x6b, 0x6f, 0x72, 0x7f, 0x7b];
    //console.log('Num : BitSeg',Num,BitSegs[Num]);
    drawNum( ctx, BitSegs[Num],x,y);
  }
  
  function drawNum(ctx, bitInfo,ix,iy){
    var BitChk = [0x00, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01];
    var SegOffsetX = [null, 10, 8, 62, 0, -2, 52, -10];
    var SegOffsetY = [null, 10, 12, 7, 59, 61, 56, 108];
    for(let i=0; i<8; i++){
      console.log(' Segment',bitInfo,i,(bitInfo & BitChk[i])!=0 );
    }
    //セグメント１作成
    if (bitInfo & BitChk[1]){
      ctx.beginPath();
      ctx.moveTo(ix+SegOffsetX[1],iy+SegOffsetY[1]);
      ctx.lineTo(ix+SegOffsetX[1]+10,iy+SegOffsetY[1]-10);
      ctx.lineTo(ix+SegOffsetX[1]+45,iy+SegOffsetY[1]-10);
      ctx.lineTo(ix+SegOffsetX[1]+50,iy+SegOffsetY[1]-5);
      ctx.lineTo(ix+SegOffsetX[1]+40,iy+SegOffsetY[1]+5);
      ctx.lineTo(ix+SegOffsetX[1]+5,iy+SegOffsetY[1]+5);
      ctx.lineTo.closePath;
      ctx.fillStyle = '#000000';
      ctx.fill();
    }
    //セグメント２作成
    if (bitInfo & BitChk[2]){
      ctx.beginPath();
      ctx.moveTo(ix+SegOffsetX[2],iy+SegOffsetY[2]);
      ctx.lineTo(ix+SegOffsetX[2]+5,iy+SegOffsetY[2]+5);
      ctx.lineTo(ix+SegOffsetX[2],iy+SegOffsetY[2]+35);
      ctx.lineTo(ix+SegOffsetX[2]-10,iy+SegOffsetY[2]+45);
      ctx.lineTo(ix+SegOffsetX[2]-15,iy+SegOffsetY[2]+40);
      ctx.lineTo(ix+SegOffsetX[2]-10,iy+SegOffsetY[2]+10);
      ctx.lineTo.closePath;
      ctx.fillStyle = '#000000';
      ctx.fill();
    } 
    //セグメント３作成
    if (bitInfo & BitChk[3]){
      //console.log('BitSeg3 ');
      ctx.beginPath();
      ctx.moveTo(ix+SegOffsetX[3],iy+SegOffsetY[3]);
      ctx.lineTo(ix+SegOffsetX[3]+5,iy+SegOffsetY[3]+5);
      ctx.lineTo(ix+SegOffsetX[3],iy+SegOffsetY[3]+35);
      ctx.lineTo(ix+SegOffsetX[3]-10,iy+SegOffsetY[3]+45);
      ctx.lineTo(ix+SegOffsetX[3]-15,iy+SegOffsetY[3]+40);
      ctx.lineTo(ix+SegOffsetX[3]-10,iy+SegOffsetY[3]+10);
      ctx.lineTo.closePath;
      ctx.fillStyle = '#000000';
      ctx.fill();
    } 
    //セグメント４作成
    if (bitInfo & BitChk[4]){
      ctx.beginPath();
      ctx.moveTo(ix+SegOffsetX[4],iy+SegOffsetY[4]);
      ctx.lineTo(ix+SegOffsetX[4]+10,iy+SegOffsetY[4]-10);
      ctx.lineTo(ix+SegOffsetX[4]+45,iy+SegOffsetY[4]-10);
      ctx.lineTo(ix+SegOffsetX[4]+50,iy+SegOffsetY[4]-5);
      ctx.lineTo(ix+SegOffsetX[4]+40,iy+SegOffsetY[4]+5);
      ctx.lineTo(ix+SegOffsetX[4]+5,iy+SegOffsetY[4]+5);
      ctx.lineTo.closePath;
      ctx.fillStyle = '#000000';
      ctx.fill();
    } 
    //セグメント５作成
    if (bitInfo & BitChk[5]){
      ctx.beginPath();
      ctx.moveTo(ix+SegOffsetX[5],iy+SegOffsetY[5]);
      ctx.lineTo(ix+SegOffsetX[5]+5,iy+SegOffsetY[5]+5);
      ctx.lineTo(ix+SegOffsetX[5],iy+SegOffsetY[5]+35);
      ctx.lineTo(ix+SegOffsetX[5]-10,iy+SegOffsetY[5]+45);
      ctx.lineTo(ix+SegOffsetX[5]-15,iy+SegOffsetY[5]+40);
      ctx.lineTo(ix+SegOffsetX[5]-10,iy+SegOffsetY[5]+10);
      ctx.lineTo.closePath;
      ctx.fillStyle = '#000000';
      ctx.fill();
    } 
    //セグメント６作成
    if (bitInfo & BitChk[6]){
      //console.log('BitSeg6 ');
      ctx.beginPath();
      ctx.moveTo(ix+SegOffsetX[6],iy+SegOffsetY[6]);
      ctx.lineTo(ix+SegOffsetX[6]+5,iy+SegOffsetY[6]+5);
      ctx.lineTo(ix+SegOffsetX[6],iy+SegOffsetY[6]+35);
      ctx.lineTo(ix+SegOffsetX[6]-10,iy+SegOffsetY[6]+45);
      ctx.lineTo(ix+SegOffsetX[6]-15,iy+SegOffsetY[6]+40);
      ctx.lineTo(ix+SegOffsetX[6]-10,iy+SegOffsetY[6]+10);
      ctx.lineTo.closePath;
      ctx.fillStyle = '#000000';
      ctx.fill();
    } 
    //セグメント７作成
    if (bitInfo & BitChk[7]){
      ctx.beginPath();
      ctx.moveTo(ix+SegOffsetX[7],iy+SegOffsetY[7]);
      ctx.lineTo(ix+SegOffsetX[7]+10,iy+SegOffsetY[7]-10);
      ctx.lineTo(ix+SegOffsetX[7]+45,iy+SegOffsetY[7]-10);
      ctx.lineTo(ix+SegOffsetX[7]+50,iy+SegOffsetY[7]-5);
      ctx.lineTo(ix+SegOffsetX[7]+40,iy+SegOffsetY[7]+5);
      ctx.lineTo(ix+SegOffsetX[7]+5,iy+SegOffsetY[7]+5);
      ctx.lineTo.closePath;
      ctx.fillStyle = '#000000';
      ctx.fill();
    }

  }

  let pre_msec = 0;
  let blink_On = 0;

  function showSeconds(){
  
    setInterval(()=>{
      const d = new Date();
      const msec = d.getMilliseconds();
      const hour = String(d.getHours()).padStart(2,'0');
      const min = String(d.getMinutes()).padStart(2,'0');
      const sec = String(d.getSeconds()).padStart(2,'0');

      if (msec > 900 && blink_On ===0){
        let curTime = hour + ' ' + min + ' ' + sec;
        //console.log(`${hour} ${min} ${sec}`);
        putStr2(curTime,25,50);
        blink_On = 1;
      }
      if (msec < pre_msec){
        let curTime = hour + ':' + min + ':' + sec;
        //console.log(`${hour}:${min}:${sec}`);
        putStr2(curTime,25,50);
        blink_On = 0;
      }
      pre_msec = msec;
    },50);
  }

  showSeconds();
}