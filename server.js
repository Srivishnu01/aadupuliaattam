var canvas = document.getElementById('gameBoard');
document.getElementById('newgame')
    .onclick = initAll;
document.getElementById('loadgame')
    .onclick = getplay;
var ctx = canvas.getContext('2d');
var pts, alloc, selected = -1,
    remaining = [3, 15],
    player = 0,
    gdead = 0,
    tdead = 0,
    gameEnded = false;
const nears = [
[11, 13, 14, 12],
[19, 3],
[4, 20],
[1, 4, 21],
[3, 2, 22],
[7, 11],
[12, 8],
[5, 9, 15],
[16, 6, 10],
[7, 19],
[20, 8],
[0, 5, 13, 15],
[0, 14, 6, 16],
[11, 14, 0, 17],
[0, 13, 12, 18],
[7, 11, 17, 19],
[12, 18, 8, 20],
[15, 18, 13, 21],
[17, 16, 14, 22],
[9, 15, 21, 1],
[2, 16, 22, 10],
[22, 19, 17, 3],
[18, 4, 21, 20]
];
const captures = [
[15, 17, 18, 16],
[15, 4],
[16, 3],
[2, 17],
[1, 18],
[9, 13],
[14, 10],
[17],
[18],
[21, 5],
[22, 6],
[14, 19],
[20, 13],
[12, 5, 21],
[11, 6, 22],
[18, 1, 0],
[17, 0, 2],
[16, 7, 0, 3],
[0, 15, 8, 4],
[22, 11],
[21, 12],
[20, 9, 13],
[19, 10, 14]
];

function initAll() {

    alloc = new Array(23)
        .fill(0);
    selected = -1, remaining = [3, 15], player = 0, gdead = 0, tdead = 0;
    gameEnded = false;
    refresh();
    drefresh();
    played();
    //	document.getElementById('checkOut').innerText=alloc.toString();
}

function canGoatMove(al) {
    for (nr of nears[al]) {
        if (alloc[nr] == 0) {
            return 0;
        }
    }
    return 1;
}

function canTigerMove(al) {
    //if(alloc[al]==1)

    var conti = false;
    if (!canGoatMove(al)) return 0;
    for (cr of captures[al]) {
        if (alloc[cr] == 0) {
            for (x of nears[cr]) {
                for (y of nears[al]) {
                    if (x == y && x && alloc[x] == 2) {
                        return 0;

                    }

                }
            }
        }
    }
    return 1;

}


function Validate(player, dest, sour, perform) {
    if (alloc[dest])
        return 0;
    if (alloc[sour] != player + 1)
        return 0;
    var i = nears[dest].indexOf(sour);
    if (i == -1) {
        if (player)
            return 0;
        i = captures[dest].indexOf(sour);
        if (i == -1) {
            return 0;
        }
        for (x of nears[dest]) {
            for (y of nears[sour]) {
                if (x == y && x) {
                    if (alloc[x] != 2)
                        return 0;
                    if (perform) {
                        //		  document.getElementById('checkOut').innerText="inside9-";
                        //capture logic
                        alloc[x] = 0;
                        gdead++;
                        gdaudio.play();
                        //		document.getElementById('checkOut').innerText+=x;
                        alloc[sour] = 0;
                        alloc[dest] = 1;
                    }
                    return 1;
                }
            }
        }
        return 0;
    }

    //move logic
    if (perform) {
        (player ? giaudio : tiaudio)
        .play();
        alloc[sour] = 0;
        alloc[dest] = player + 1;
    }
    return 1;

}

function calctiger() {
    var al = 0,
        tdead3 = 0;
    for (; al < 23; al++) {
        if (alloc[al] == 1 && canTigerMove(al)) tdead3++;
    }
    return tdead3;
}

function refresh() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    var jc = 0;
    var i = 0;
    for (; i < 23; i++) {
        if (alloc[i] > 0) {
            let p = pts[i];
            //	document.getElementById('checkOut').innerText+=(jc++);
            drawImage(p[0], p[1], alloc[i]);
        }
    }
    //document.getElementById('checkOut').innerText="";

}

function nearestPoint(x, y) {
    //document.getElementById('checkOut').innerText=pts.length+1;
    var i = 0,
        MinD = 10000.0,
        rpi = 0;
    //document.getElementById('checkOut').innerText=pts.length+2;
    for (i = 0; i < 23; i++) {
        let p = pts[i];
        //document.getElementById('checkOut').innerText=i;
        let d = Math.sqrt(Math.pow(p[0] - x, 2) + Math.pow(p[1] - y, 2));
        if (d < MinD) {
            MinD = d;
            rpi = i;
        }
    }
    //	document.getElementById('checkOut').innerText="s"+MinD.toString();
    return rpi;
}
var ele = document.getElementById('gameturn');
var tiger, goat, One = 0,
    gdaudio = new Audio('src/Goat-Short-Cry.mp3'),
    giaudio = new Audio('src/Goat-Short-Far-Away.mp3'),
    gwaudio = new Audio('src/Goats-Multiple-In-Distance.mp3'),
    tdaudio = new Audio('src/Tiger.wav'),
    tiaudio = new Audio('src/TIGER_R2.wav'),
    twaudio = new Audio('src/tiigri_urin.wav');
applause = new Audio('src/applause2.mp3');
tiger = new Image();
goat = new Image();
crown = new Image();
ximg = new Image();
xgimg = new Image();
tlife = new Image();
tlife.src = "src/thuglife.png";
tiger.src = "src/tv2.png";
goat.src = "src/gv2.png";
ximg.src = "src/xv2.png";
xgimg.src = "src/xvg.png";
crown.src = "src/crown1.png";

function drefresh() {
    document.getElementById('tigercount')
        .innerText = "புலிகள் மீதி : " + remaining[0];
    document.getElementById('goatcount')
        .innerText = "ஆடுகள் மீதி : " + remaining[1];
    ele.innerText = player ? 'ஆடு ஆடுக' : 'புலி ஆடுக';
    ele.style.color = player ? 'blue' : 'green';
    document.getElementById('goatdead')
        .innerText = "கொல்லப்பட்ட ஆடுகள் : " + gdead;
    var tdead2 = calctiger();
    if (tdead2 > tdead) {
        tdaudio.play();
    }
    tdead = tdead2;
    document.getElementById('tigerdead')
        .innerText = "அடக்கப்பட்ட புலிகள் : : " + tdead;
    if (tdead == 3) {
        gameEnded = true;
        ele.innerText = "ஆடு வெற்றி....!!";
        ele.style.color = 'purple';
        refresh();
        applause.play();
        gwaudio.play();
    } else if (gdead >= 5) {
        gameEnded = true;
        ele.innerText = "புலி வெற்றி....!!";
        ele.style.color = 'purple';
        applause.play();
        twaudio.play();
    }
}

canvas.addEventListener('mousemove', function (event) {
    if (gameEnded) return;
    if (selected == -1) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        var rpi = nearestPoint(x, y);

        One = !((!player && alloc[rpi] == 1 && !canTigerMove(rpi) && !remaining[0]) || (player && alloc[rpi] == 2 && !canGoatMove(rpi) && !remaining[1]) || (alloc[rpi] == 0 && remaining[player]));
        var p = pts[rpi];
        drawImage(p[0], p[1], 3 + One);
        refresh();
        drawImage(p[0], p[1], 3 + One);
    }
    ele.style.color = '#' + Math.random()
        .toString(16)
        .substr(-6);

});

canvas.addEventListener('mousedown', function (event) {


    /*if(One)
{
        //display error
document.getElementById('checkOut').innerText="தவறானது";
return;
}*/
    if (gameEnded) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    var rpi = nearestPoint(x, y);
    var p = pts[rpi];
    //document.getElementById('checkOut').innerText="hi threr "+x+" - "+y+" "+pts.length;
    //drawImage(p[0],p[1]);
    if (!remaining[player]) {
        if (alloc[rpi]) {
            selected = rpi;
            refresh();
            //var i=0;
            //document.getElementById('tigerdead').innerText=nears[rpi]+captures[rpi];
            for (nr of nears[rpi].concat(captures[rpi])) {
                //i++;
                //document.getElementById('tigerdead').innerText="hi";
                if (Validate(player, nr, rpi, false)) {
                    let p = pts[nr];
                    drawImage(p[0], p[1], 5);
                }

            }

        } else {
            if (selected >= 0) {
                if (Validate(player, rpi, selected, true)) {


                    player ^= 1;
                    played();
                    document.getElementById('checkOut')
                        .innerText = "";
                } else {
                    //display error
                    document.getElementById('checkOut')
                        .innerText = "தவறானது";
                }
                selected = -1;
            }

        }
    } else {
        if (alloc[rpi] == 0) {
            //document.getElementById('checkOut').innerText="inner4";
            (player ? giaudio : tiaudio)
            .play();
            alloc[rpi] = player + 1;
            remaining[player]--;
            player ^= 1;
            played();
            document.getElementById('checkOut')
                .innerText = "";

        }

    }
    //refresh();
});
canvas.addEventListener('mouseup', function (event) {

    /*if(One)
{
        //display error
document.getElementById('checkOut').innerText="தவறானது";
return;
}*/
console.log(getcurrentpos(),getcurrentv2());
    if (gameEnded) return;
    if (selected >= 0) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        var rpi = nearestPoint(x, y);
        if (alloc[rpi])
            return;
        var p = pts[rpi];


        if (Validate(player, rpi, selected, true)) {
            player ^= 1;
            played();
            document.getElementById('checkOut')
                .innerText = "";
        } else {

            //display error
            document.getElementById('checkOut')
                .innerText = "தவறானது";
        }
        selected = -1;
    }
    refresh();
    drefresh();

});

function draw() {
    if (canvas.getContext) {
        //var ctx = canvas.getContext('2d');
        ctx.lineWidth = 5;
        var sWidth = canvas.width;
        var sHeight = canvas.height;
        ctx.moveTo(sWidth / 2, 40);
        ctx.lineTo(40, sHeight - 40);
        ctx.lineTo(40, sHeight - 40);
        ctx.lineTo(sWidth - 40, sHeight - 40);
        ctx.lineTo(sWidth / 2, 40);
        ctx.lineTo((sWidth - 80) / 3 + 40, sHeight - 40);
        ctx.moveTo(sWidth / 2, 40);
        ctx.lineTo(2 * (sWidth - 80) / 3 + 40, sHeight - 40);
        ctx.moveTo(sWidth / 6, sHeight / 3);
        ctx.lineTo(5 * sWidth / 6, sHeight / 3);
        ctx.moveTo(sWidth / 12 + 20, sHeight / 2);
        ctx.lineTo(11 * sWidth / 12 - 20, sHeight / 2);
        ctx.moveTo(40, 2 * sHeight / 3);
        ctx.lineTo(sWidth - 40, 2 * sHeight / 3);

        ctx.moveTo(sWidth / 6, sHeight / 3);
        ctx.lineTo(40, 2 * sHeight / 3);
        ctx.moveTo(5 * sWidth / 6, sHeight / 3);
        ctx.lineTo(sWidth - 40, 2 * sHeight / 3);
        ctx.stroke();
    }
};

function getPoints() {
    var sWidth = canvas.width;
    var sHeight = canvas.height;
    pts = [
    [sWidth / 2, 40],
    [40, sHeight - 40],
    [sWidth - 40, sHeight - 40],
    [(sWidth - 80) / 3 + 40, sHeight - 40],
    [2 * (sWidth - 80) / 3 + 40, sHeight - 40],
    [sWidth / 6, sHeight / 3],
    [5 * sWidth / 6, sHeight / 3],
    [sWidth / 12 + 20, sHeight / 2],
    [11 * sWidth / 12 - 20, sHeight / 2],
    [40, 2 * sHeight / 3],
    [sWidth - 40, 2 * sHeight / 3]
];

    function fx(P, Q, R, S) {
        var x1 = pts[P][0],
            x2 = pts[Q][0],
            x3 = pts[R][0],
            x4 = pts[S][0];
        var y1 = pts[P][1],
            y2 = pts[Q][1],
            y3 = pts[R][1],
            y4 = pts[S][1];
        var x12 = x1 - x2;
        var x34 = x3 - x4;
        var y12 = y1 - y2;
        var y34 = y3 - y4;
        var c = x12 * y34 - y12 * x34;
        var a = x1 * y2 - y1 * x2;
        var b = x3 * y4 - y3 * x4;
        var x = (a * x34 - b * x12) / c;
        var y = (a * y34 - b * y12) / c;
        return [x, y];
    };
    pts = pts.concat(
[
fx(0, 1, 5, 6),
fx(0, 2, 5, 6),
fx(0, 3, 5, 6),
fx(0, 4, 5, 6),
fx(0, 1, 7, 8),
fx(0, 2, 7, 8),
fx(0, 3, 7, 8),
fx(0, 4, 7, 8),
fx(0, 1, 9, 10),
fx(0, 2, 9, 10),
fx(0, 3, 9, 10),
fx(0, 4, 9, 10)
]);
    //document.getElementById('checkOut').innerText=pts.length;
}

function drawImage(x, y, current) {
    var img, mXY = 80,
        cXY = 40,
        isCrown = false;
    switch (current) {
    case 1:
        img = tiger;
        isCrown = gdead >= 5;
        break;
    case 2:
        img = goat;
        isCrown = tdead == 3;
        break;
    case 5:
        mXY = 60;
        cXY = 30;
    case 3:
        img = xgimg;
        //mXY=40;cXY=20;
        break;
    case 4:
        img = ximg;
        break;
    default:
        return;
    }
    ctx.drawImage(img, x - cXY, y - cXY, mXY, mXY);
    if (current > 2 || !isCrown) return;

    ctx.drawImage(tlife, x - 65, y, 120, 80);
    ctx.drawImage(crown, x - 65, y - 95, 120, 80);
};
var gameid='0';

function getcurrentpos()
{
    var cn=0;
    for(i of alloc)
    {
        cn=cn*3+i;
    }
    return cn;
}
function compareposv2(MM,VV)
{
    //var NN=getcurrentpos();
    var i=23, changecounter=0,whose=0;
    MM=parseInt(MM);
    console.log("begin i,alloc",alloc[1],alloc[0],MM+1);
    while((--i)>=0)
    {
        console.log(i);
        var a=MM%3,b=alloc[i];
        MM=Math.floor(MM/3);
        if(a==b)continue;
        changecounter++;
        whose=a?a:b;
        alloc[i]=a;
        console.log("i,alloc",i,alloc[i]);
        

    }
    console.log("i,alloc",alloc[1],alloc[0]);
    switch(changecounter)
    {
        case 0:
            return;
        case 1:
        case 2:
            (whose==2?giaudio : tiaudio).play();
            break;
        case 3:
            gdaudio.play();
            break;
    }
    VV=parseInt(VV);
    player=VV%2;
    VV>>=1;
    gameEnded=VV%2==1;
    VV>>=1;
    remaining[0]=VV%4;
    VV>>=2;
    remaining[1]=VV%16;
    VV>>=4;
    tdead=VV%4;
    VV>>=2;
    gdead=VV%8;
    drefresh();
    refresh();
}
function comparev2(MM)
{
    
}
function getplay()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log( this.responseText);
         var split2=this.responseText.split(" ");
         console.log("splitted",split2[0],split2[1]);
       compareposv2(split2[0],split2[1]);
       console.log("splitted2:",split2[0],split2[1]);
       console.log( this.responseText);
      }
    };
    xmlhttp.open("GET", "backend.php/?id=".concat(gameid).concat("&v=-1&v2=-1"), true);
        //document.getElementById("gameturn").innerHTML = gameid;
    xmlhttp.send();
}
function getcurrentv2()
{
    var offset=1024*gdead+256*tdead+16*remaining[1]+4*remaining[0]+(gameEnded?2:0)+(player?1:0);
    return offset;

}
function played()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       // document.getElementById("gameturn").innerHTML = this.responseText;
      }
    };
    xmlhttp.open("GET", "backend.php/?id=".concat(gameid).concat("&v=").concat(getcurrentpos().toString()).concat("&v2=").concat(getcurrentv2().toString()), true);
    //document.getElementById("gameturn").innerHTML = gameid;
    xmlhttp.send();
}
const interval=setInterval(getplay,3000);
//clearInterval(interval);
window.onload = function () {
   
    var temps=document.location.search;
    gameid= temps.substring(temps.indexOf('=')+1);
    getPoints();
    alloc = new Array(23)    .fill(0);
    selected = -1, remaining = [3, 15], player = 0, gdead = 0, tdead = 0;
    gameEnded = false;
    //getplay();
    refresh();
    drefresh();
   
    console.log(getcurrentpos(),getcurrentv2(),pts);
    
    //refresh();drefresh();
    
//    played();
   // document.getElementById('gameturn').innerText=document.location.search;
}
//initAll();
