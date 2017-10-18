
XTILES = 20;
YTILES = 15;

TILESIZE = 32;

var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;
var keyG = false;

var boxes = [];
var slots = [];
var walls = [];
var slotted = 0;

var currentLevel = 0;

var moves = 0;
var totalmoves = 0;

function preload(){
	_greg = loadImage("assets/Greg.png");
	_a = loadImage("assets/a.png");
	_ei = loadImage("assets/ei.png");
	_ou = loadImage("assets/ou.png");
	_ba = loadImage("assets/ba.png");
	_bei = loadImage("assets/bei.png");
	_bou = loadImage("assets/bou.png");
	_b = loadImage("assets/b.png");
	_ka = loadImage("assets/ka.png");
	_kei = loadImage("assets/kei.png");
	_kou = loadImage("assets/kou.png");
	_k = loadImage("assets/k.png");
	_da = loadImage("assets/da.png");
	_dei = loadImage("assets/dei.png");
	_dou = loadImage("assets/dou.png");
	_d = loadImage("assets/d.png");
	_ga = loadImage("assets/ga.png");
	_gei = loadImage("assets/gei.png");
	_gou = loadImage("assets/gou.png");
	_g = loadImage("assets/g.png");
	_ha = loadImage("assets/ha.png");
	_hei = loadImage("assets/hei.png");
	_hou = loadImage("assets/hou.png");
	_h = loadImage("assets/h.png");
	_la = loadImage("assets/la.png");
	_lei = loadImage("assets/lei.png");
	_lou = loadImage("assets/lou.png");
	_l = loadImage("assets/l.png");
	_ma = loadImage("assets/ma.png");
	_mei = loadImage("assets/mei.png");
	_mou = loadImage("assets/mou.png");
	_m = loadImage("assets/m.png");
	_na = loadImage("assets/na.png");
	_nei = loadImage("assets/nei.png");
	_nou = loadImage("assets/nou.png");
	_n = loadImage("assets/n.png");
	_nga = loadImage("assets/nga.png");
	_ngei = loadImage("assets/ngei.png");
	_ngou = loadImage("assets/ngou.png");
	_ng = loadImage("assets/ng.png");
	_pa = loadImage("assets/pa.png");
	_pei = loadImage("assets/pei.png");
	_pou = loadImage("assets/pou.png");
	_p = loadImage("assets/p.png");
	_sa = loadImage("assets/sa.png");
	_sei = loadImage("assets/sei.png");
	_sou = loadImage("assets/sou.png");
	_s = loadImage("assets/s.png");
	_ta = loadImage("assets/ta.png");
	_tei = loadImage("assets/tei.png");
	_tou = loadImage("assets/tou.png");
	_t = loadImage("assets/t.png");
	_wa = loadImage("assets/wa.png");
	_wei = loadImage("assets/wei.png");
	_wou = loadImage("assets/wou.png");
	_w = loadImage("assets/w.png");
	_ya = loadImage("assets/ya.png");
	_yei = loadImage("assets/yei.png");
	_you = loadImage("assets/you.png");
	_y = loadImage("assets/y.png");
	_slot = loadImage("assets/slot.png");
	_redslot = loadImage("assets/redslot.png");
	_firstlevel = loadImage("assets/first.png");
	_secondlevel = loadImage("assets/second.png");
	_thirdlevel = loadImage("assets/third.png");
	_fourthlevel = loadImage("assets/fourth.png");
	_fifthlevel = loadImage("assets/fifth.png");
	_mainmenu = loadImage("assets/mainmenu.png");
	_credits = loadImage("assets/credits.png");
	_music = loadSound("assets/8bk.mp3");
	_font = loadFont("font/pixelart.ttf");
}

function setup(){
	createCanvas(768, 512);
	frameRate(60); 
	_music.setVolume(0.1);
	_music.loop();
	mainMenu();
	textFont(_font);
}

function draw(){
	if(!pause && currentLevel != 5){
		noStroke();
		background(0);
		drawMap();
		for(var i = 0; i < slots.length; i++){
			if(slots[i].flag == 0){
				image(_redslot, slots[i].x, slots[i].y);
			} else {
				image(_slot, slots[i].x, slots[i].y);
			}
		}
		for(var i = 0; i < boxes.length; i++){
			fill(255);
			rect(boxes[i].x, boxes[i].y, TILESIZE, TILESIZE);
			image(boxes[i].spr, boxes[i].x, boxes[i].y);
		}
		player.update();
		fill(0);
		rect(0, levels[currentLevel].size.y, levels[currentLevel].size.x, 20);
		textSize(15);
		fill(255);
		text("HINT  " + hint, 5, levels[currentLevel].size.y + 15);
		text("MOVES " + moves, levels[currentLevel].size.x - 100, levels[currentLevel].size.y + 15);
	} else if(currentLevel == 5){
		image(_credits, 0, 0);
		fill(0);
		textSize(50);
		text("TOTAL MOVES " + totalmoves, 128, 400);
		text("Press R to Restart!", 100, 450);
	} else {
		image(_mainmenu, 0, 0);
	}
}

function cell(x, y){
	return levels[currentLevel].floor[x + (y * XTILES)]
}

function mainMenu(){
	pause = true;
}

function loadLevel(){
	if(currentLevel != 5){
		boxes = [];
		slots = [];
		walls = [];
		for(var i = 0; i < levels[currentLevel].box.length; i++){
			boxes.push(levels[currentLevel].box[i]);
			if(!levels[currentLevel].box[i].ox){
				levels[currentLevel].box[i].ox = levels[currentLevel].box[i].x;
				levels[currentLevel].box[i].oy = levels[currentLevel].box[i].y;
			}
		}
		for(var i = 0; i < boxes.length; i++){
			boxes[i].x = levels[currentLevel].box[i].ox;
			boxes[i].y = levels[currentLevel].box[i].oy;
		}
		for(var i = 0; i < levels[currentLevel].slots.length; i++){
			slots.push(levels[currentLevel].slots[i]);
		}
		for(var i = 0; i < levels[currentLevel].floor.length; i++){
			for(var j = 0; j < YTILES; j++){
				for(var k = 0; k < XTILES; k++){
					var tile = cell(k, j);
					var xx = k * TILESIZE;
					var yy = j * TILESIZE;
					var wall = {x:xx, y:yy};
					if(tile){
						walls.push(wall);
					}
				}
			}	
		}
		var spr = {}
		if(currentLevel == 0){
			mapImage = _firstlevel;
			boxes[0].spr = _ma;
			boxes[1].spr = _la;
			boxes[2].spr = _ya;
			hint = "free";
		} else if(currentLevel == 1){
			mapImage = _secondlevel;
			boxes[0].spr = _ei;
			boxes[1].spr = _sa;
			hint = "one";
		} else if(currentLevel == 2){
			mapImage = _thirdlevel;
			boxes[0].spr = _ba;
			boxes[1].spr = _ha;
			boxes[2].spr = _y;
			boxes[3].spr = _kou;
			boxes[4].spr = _bou;
			hint = "bahay";
		} else if(currentLevel == 3){
			mapImage = _fourthlevel;
			boxes[0].spr = _la;
			boxes[1].spr = _k;
			boxes[2].spr = _mou;
			hint = "insekto";
		} else if(currentLevel == 4){
			mapImage = _fifthlevel;
			boxes[0].spr = _na;
			boxes[1].spr = _ka;
			boxes[2].spr = _tou;
			boxes[3].spr = _lou;
			boxes[4].spr = _g;
			hint = "gabi";
		}
		player.x = levels[currentLevel].pos.x;
		player.y = levels[currentLevel].pos.y;
		resizeCanvas(levels[currentLevel].size.x, levels[currentLevel].size.y + 20);
	} else {
		pause = true;
		resizeCanvas(768, 512);
	}
}

function drawMap(){
	image(mapImage, 0, 0);
}

function collide(x1, y1, x2, y2){
	var res = dist(x1, y1, x2, y2);
	if(!res){
		return true;
	} else {
		return false;
	}
}

function keyReleased(){
	switch(keyCode){
		case 82:
		pause = false;
		if(currentLevel == 5){
			currentLevel = 0;
			totalmoves = 0;
		}
		loadLevel(currentLevel);
		break;
		case 38:
		player.move(0, -1);
		break;
		case 40:
		player.move(0, 1);
		break;
		case 37:
		player.move(-1, 0);
		break;
		case 39:
		player.move(1, 0);
		break;
	}
}
