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
    // for(let i=0; i<8; i++){
    //   console.log(' Segment',bitInfo,i,(bitInfo & BitChk[i])!=0 );
    // }
    //セグメント１作成
    if (bitInfo & BitChk[1]){
      drawHSeg(ctx,ix+SegOffsetX[1],iy+SegOffsetY[1]);
    }
    //セグメント２作成
    if (bitInfo & BitChk[2]){
      drawVSeg(ctx,ix+SegOffsetX[2],iy+SegOffsetY[2]);
    } 
    //セグメント３作成
    if (bitInfo & BitChk[3]){
      drawVSeg(ctx,ix+SegOffsetX[3],iy+SegOffsetY[3]);
    } 
    //セグメント４作成
    if (bitInfo & BitChk[4]){
      drawHSeg(ctx,ix+SegOffsetX[4],iy+SegOffsetY[4]);
    } 
    //セグメント５作成
    if (bitInfo & BitChk[5]){
      drawVSeg(ctx,ix+SegOffsetX[5],iy+SegOffsetY[5]);
    } 
    //セグメント６作成
    if (bitInfo & BitChk[6]){
      drawVSeg(ctx,ix+SegOffsetX[6],iy+SegOffsetY[6]);
    } 
    //セグメント７作成
    if (bitInfo & BitChk[7]){
      drawHSeg(ctx,ix+SegOffsetX[7],iy+SegOffsetY[7]);
    }
  }

  function drawHSeg(ctx, ix ,iy ){
    ctx.beginPath();
    ctx.moveTo(ix,iy);
    ctx.lineTo(ix+10,iy-10);
    ctx.lineTo(ix+45,iy-10);
    ctx.lineTo(ix+50,iy-5);
    ctx.lineTo(ix+40,iy+5);
    ctx.lineTo(ix+5,iy+5);
    ctx.lineTo.closePath;
    ctx.fillStyle = '#000000';
    ctx.fill();
  }
  function drawVSeg(ctx, ix ,iy ){
    ctx.beginPath();
    ctx.moveTo(ix,iy);
    ctx.lineTo(ix+5,iy+5);
    ctx.lineTo(ix,iy+35);
    ctx.lineTo(ix-10,iy+45);
    ctx.lineTo(ix-15,iy+40);
    ctx.lineTo(ix-10,iy+10);
    ctx.lineTo.closePath;
    ctx.fillStyle = '#000000';
    ctx.fill();
  }

  function putAlalogClock(ix,iy,r) {
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');
    // 目盛りの描画
    for ( let icnt=0 ; icnt< 360 ; icnt += 6){
      drawLine ( ctx, allocX( ix , r+25 ,icnt), allocY(iy, r+25,icnt), allocX( ix , r+20 ,icnt), allocY(iy, r+20,icnt));    
    }
    for ( let icnt=0 ; icnt< 360 ; icnt += 30){
      drawCircle ( ctx, allocX( ix , r+15 ,icnt), allocY(iy, r+15,icnt), 5);    
    }
    for ( let icnt=0 ; icnt< 360 ; icnt += 90){
      drawQuad ( ctx, allocX( ix+8 , r+15 ,icnt), allocY(iy+8, r+15,icnt), allocX( ix+8 , r+15 ,icnt), allocY(iy-8, r+15,icnt), allocX( ix-8 , r+15 ,icnt), allocY(iy-8, r+15,icnt), allocX( ix-8 , r+15 ,icnt), allocY(iy+8, r+15,icnt));    
    }
    // drawQuad ( ctx, allocX( ix+8 , r+12 ,270), allocY(iy+8, r+12,270), allocX( ix+8 , r+12 ,270), allocY(iy-8, r+12,270), allocX( ix-8 , r+12 ,270), allocY(iy-8, r+12,270), allocX( ix-8 , r+12 ,270), allocY(iy+8, r+12,270));    
  } // end of function putAnalogClock  

  // 点の回転配置（角度deg）
  function allocX( ix, r, deg) {
    let rate = Math.PI / 180;
    return ix + r * Math.cos(rate * deg) ;
  }

  function allocY( iy, r, deg) {
    let rate = Math.PI / 180;
    return iy + r * Math.sin(rate * deg);
  }
 
  // 座標回転（角度deg）
  function rotateX( ix, iy, deg) {
    let rate = Math.PI / 180;
    return ix  * Math.cos(rate * deg) + iy * Math.sin(rate *deg) ;
  }
  function rotateY( ix, iy, deg) {
    let rate = Math.PI / 180;
    return ix  * Math.sin(rate * deg) - iy * Math.cos(rate *deg) ;
  }

  // 円の描画
  function drawCircle(ctx, ix, iy, r){
    ctx.beginPath();
    ctx.arc(ix, iy, r, 0, 2*Math.PI);
    ctx.closePath;
    ctx.fillStyle = '#000000';
    ctx.fill();
  }  
  // 四辺形の描画
  function drawQuad(ctx, x1,y1,x2,y2,x3,y3,x4,y4){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.lineTo.closePath;
    ctx.fillStyle = '#000000';
    ctx.fill();
  }  
  // 線の描画
  function drawLine(ctx, ix, iy, x1,y1){
    ctx.beginPath();
    ctx.moveTo(ix, iy);
    ctx.lineTo(x1, y1);
    ctx.strokestyle = '#000000';
    ctx.stroke();
  }
    // 針削除処理（一括）
  function ClearHands(ctx, ix, iy, r){
    ctx.beginPath();
    ctx.moveTo(ix,iy);
    ctx.arc(ix, iy, r, 0, 2*Math.PI);
    ctx.closePath;
    ctx.fillStyle = '#aaa';
    ctx.fill();

  }
   // 針の描画
  function DrawHands(ix, iy, r,hour, min, sec){
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');
    ClearHands(ctx, ix, iy, r );
    let iHour= parseInt (hour);
    let iMin= parseInt (min);
    let iSec= parseInt (sec);
    if (iHour>=12) {
      iHour -=12;
    }
    let ShortHand= 360*iHour/12+30*iMin/60;
    let LongHand=  360*iMin/60+6*iSec/60;
    let SecondHand = 360*iSec/60;
    console.log('SH',ShortHand);
    console.log('LH',LongHand);
    console.log('SecH',SecondHand);
    // 短針の描画
    ShortHand -= 90;
    if (ShortHand < 0){
      ShortHand += 360;
    }
    drawQuad ( ctx, ix+rotateX(-5,+3,ShortHand), iy+rotateY(-5,+3,ShortHand), ix+rotateX(+58,+3,ShortHand), iy+rotateY(+58,+3,ShortHand), ix+rotateX(+58,-3,ShortHand), iy+rotateY(+58,-3,ShortHand), ix+rotateX(-5,-3,ShortHand), iy+rotateY(-5,-3,ShortHand));    
    console.log('SX',ix+rotateX(+58,+3,ShortHand));
    console.log('SY',iy+rotateX(+58,+3,ShortHand));
    // 長針の描画
    LongHand -= 90;
    if (LongHand < 0){
      LongHand += 360;
    }
    drawQuad ( ctx, ix+rotateX(-10,+3 ,LongHand), iy+rotateY(-10,+3,LongHand), ix+rotateX(+98,+3,LongHand), iy+rotateY(+98,+3,LongHand), ix+rotateX(+98,-3,LongHand), iy+rotateY(+98,-3,LongHand), ix+rotateX(-10,-3,LongHand), iy+rotateY(-10,-3,LongHand));    
    console.log('LX',ix+rotateX(+98,+3,LongHand));
    console.log('LY',iy+rotateX(+98,+3,LongHand));

    // 秒針の描画
    SecondHand -= 90;
    if (SecondHand < 0){
      SecondHand += 360;
    }
    drawLine ( ctx, ix+rotateX( -20,0,SecondHand), iy+rotateY(-20,0,SecondHand), ix+rotateX(+98,0,SecondHand), iy+rotateY(+98,0,SecondHand));   
    console.log('SecX',ix+rotateX(-10,0,SecondHand));
    console.log('SecY',iy+rotateY(+98,0,SecondHand));

  }

  let pre_msec = 0;
  let blink_On = 0;
  putAlalogClock(300,200,100);

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
        putStr2(curTime,25,400);
        blink_On = 1;
      }
      if (msec < pre_msec){
        let curTime = hour + ':' + min + ':' + sec;
        //console.log(`${hour}:${min}:${sec}`);
        putStr2(curTime,25,400);
        DrawHands(300,200,100,hour,min,sec);
        blink_On = 0;
      }
      pre_msec = msec;
    },50);
  }

  showSeconds();
}