player = {
	x:32,
	y:32,
	
	update:function(){
		player.draw();
	},

	draw:function(){
		image(_greg, player.x, player.y);	 
	},

	move:function(x, y){
		if(!pause){
			var moveX = x * TILESIZE;
			var moveY = y * TILESIZE;
			var slotted = 0;
			player.x += moveX
			player.y += moveY
			moves++;
			for(var i = 0; i < boxes.length; i++){
				if(collide(player.x, player.y, boxes[i].x, boxes[i].y)){
					boxes[i].x += moveX;
					boxes[i].y += moveY;
					for(var j = 0; j < boxes.length; j++){
						if(i != j){
							if(collide(boxes[i].x, boxes[i].y, boxes[j].x, boxes[j].y)){
								boxes[i].x -= moveX;
								boxes[i].y -= moveY;
								player.x -= moveX;
								player.y -= moveY;
								moves--;
							}
						}
					}
					for(var j = 0; j < walls.length; j++){
						if(collide(boxes[i].x, boxes[i].y, walls[j].x, walls[j].y)){
							player.x -= moveX;
							player.y -= moveY;
							boxes[i].x -= moveX;
							boxes[i].y -= moveY;
							moves--;
						}	
					}	
				}
			}
			for(var i = 0; i < walls.length; i++){
				if(collide(player.x, player.y, walls[i].x, walls[i].y)){
					player.x -= moveX;
					player.y -= moveY;
					moves--;
				}
			}
			for(var i = 0; i < boxes.length; i++){
				if(collide(boxes[boxes[i].flag].x, boxes[boxes[i].flag].y, slots[boxes[i].flag].x, slots[boxes[i].flag].y)){
					slotted++;
				} else {
					slotted = 0;
				}
			}
			if(slotted == boxes.length){
				currentLevel += 1;
				totalmoves += moves;
				moves = 0;
				loadLevel();
			}
		}
	}
}
