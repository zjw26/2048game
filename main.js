var board=[];
var hascrash=[];
var score=0;
var WIDTH=$(document).width();
var HEIGHT=$(document).height();
var startx;
var starty;
var endx;
var endy;
if(WIDTH>HEIGHT){
	if(WIDTH>1500){
		var width=WIDTH*0.3
	}else{
		var width=WIDTH*0.25
	}
}else{
		var width=HEIGHT*0.4
}

$(document).ready(function(){
	newGame();
	$('header .btn').on('click',function(){
		newGame();
	})
})

function newGame(){
	//初始化棋盘格
	init();
	//在随机两个格子生成2或4
	generateOneNumber();
	generateOneNumber();
}

function init(){
	setSize();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var gridCell=$('#grid-cell-'+i+'-'+j);
			gridCell.css('top',getPosTop(i,j,width));
			gridCell.css('left',getPosLeft(i,j,width));
		}
	}

	for(var i=0;i<4;i++){
		board[i]=[];
		hascrash[i]=[]
		for(var j=0;j<4;j++){
			board[i][j]=0;
			hascrash[i][j]=false;
		}
	}
	score=0;
	updateScore(score);
	updateBoardView();
	

}

function setSize(){
	$(".grid-container").css({
		'width':width,
		'height':width
	});
	$(".grid-cell").css({
		'width':width*0.2,
		'height':width*0.2
	})
	$(".up").css({
		'width':WIDTH,
		'height':HEIGHT
	});
}

function updateBoardView(){
	$(".number-cell").remove();//清空之前的
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$(".grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell=$('#number-cell-'+i+'-'+j);

			if(board[i][j]==0){
				theNumberCell.css({
					'top':getPosTop(i,j,width)+0.1*width,
					'left':getPosLeft(i,j,width)+0.1*width,
					'width':0,
					'height':0
				})
			}else if(board[i][j]<1024){
				theNumberCell.css({
					'top':getPosTop(i,j,width),
					'left':getPosLeft(i,j,width),
					'width':width*0.2,
					'height':width*0.2,
					'background-color':getBackgroundColor(board[i][j]),
					'color':getColor(board[i][j]),
					'font-size':width*0.11,
					'line-height':width*0.2+'px'
				})
				theNumberCell.text(board[i][j])
			}else{
				theNumberCell.css({
					'top':getPosTop(i,j,width),
					'left':getPosLeft(i,j,width),
					'width':width*0.2,
					'height':width*0.2,
					'background-color':getBackgroundColor(board[i][j]),
					'color':getColor(board[i][j]),
					'font-size':width*0.06,
					'line-height':width*0.2+'px'
				})
				theNumberCell.text(board[i][j])
			}
			hascrash[i][j]=false;
		}
		
	}


}

function generateOneNumber(){
	if(nospace(board)){
		return false;
	}
	//随机一个位置
	var randomX=parseInt(Math.floor(Math.random()*4));
	var randomY=parseInt(Math.floor(Math.random()*4));
	var times=0;
	while(times<50){
		if(board[randomX][randomY]==0)
			break;
		randomX=parseInt(Math.floor(Math.random()*4));
		randomY=parseInt(Math.floor(Math.random()*4));
		times++;
	}
	if(times==50){
		for(var i=0;i<4;i++)
			for(var j=0;j<4;j++)
				if(board[i][j]==0){
					randomX=i;
					randomY=j;
				}
	}

	//随机生成一个数字2或4
	var randomNum=Math.random()<0.5?2:4;

	//在随机位置显示随机数字
	board[randomX][randomY]=randomNum;
	showNumber(randomX,randomY,randomNum,width);
	// updateBoardView();

	return true;
}

$(document).keydown(function(e){
	switch(e.keyCode){
		case 37:
			e.preventDefault();
			if(moveLeft()){
				setTimeout(function(){
					generateOneNumber();
				},210)
				setTimeout(function(){
					isgameover();
				},500)

			}
			break;//left
		case 38:
			e.preventDefault();
			if(moveUp()){
				setTimeout(function(){
					generateOneNumber();
				},210)
				setTimeout(function(){
					isgameover();
				},500)

			}
			break;//up
		case 39:
			e.preventDefault();
			if(moveRight()){
				setTimeout(function(){
					generateOneNumber();
				},210)
				setTimeout(function(){
					isgameover();
				},500)

			}
			break;//right
		case 40:
			e.preventDefault();
			if(moveDown()){
				setTimeout(function(){
					generateOneNumber();
				},210)
				setTimeout(function(){
					isgameover();
				},500)

			}
			break;//down
		default:
			break;
	}
})

function isgameover(){
	if(nospace(board)&&nomove(board)){
		gameover();
	}
}

function gameover(){
	$('.deleteAll').click();
	$('#yesAll').on('click',function(){
		$('header .btn').click();
	})
}

document.addEventListener('touchstart',function(e){
	startx=e.touches[0].pageX;
	starty=e.touches[0].pageY;
})

document.addEventListener('touchmove',function(e){
	e.preventDefault();
})

document.addEventListener('touchend',function(e){
	endx=e.changedTouches[0].pageX;
	endy=e.changedTouches[0].pageY;

	var x=endx-startx;
	var y=endy-starty;
	if(Math.abs(x)>=Math.abs(y)){
		if(x>20){
			//右滑
			if(moveRight()){
				setTimeout(function(){
					generateOneNumber();
				},210)
				setTimeout(function(){
					isgameover();
				},500)

			}
		}else if(x<-20){
			//左滑
			if(moveLeft()){
				setTimeout(function(){
					generateOneNumber();
				},210)
				setTimeout(function(){
					isgameover();
				},500)
			}
		}
	}else{
		if(y>20){
			//下滑
			if(moveDown()){
				setTimeout(function(){
					generateOneNumber();
				},210)
				setTimeout(function(){
					isgameover();
				},500)

			}
		}else if(y<-20){
			//上滑
			if(moveUp()){
				setTimeout(function(){
					generateOneNumber();
				},210)
				setTimeout(function(){
					isgameover();
				},500)

			}
		}

	}
})


 

function moveLeft(){
	if(canMoveLeft(board)){
		for(var i=0;i<4;i++){
			for(var j=1;j<4;j++){
				if(board[i][j]!=0){
					for(var k=0;k<j;k++){
						if(board[i][k]==0&&noBlockL(i,j,k,board)){
							//move
							showMove(i,j,i,k,width);
							board[i][k]=board[i][j];
							board[i][j]=0;
							continue;
						}else if(board[i][k]==board[i][j]&&noBlockL(i,j,k,board)&&!hascrash[i][k]){
							//move
							showMove(i,j,i,k,width);
							//add
							board[i][k]+=board[i][j];
							board[i][j]=0;
							//addscore
							score+=board[i][k];
							updateScore(score);

							hascrash[i][k]=true;
							continue;
						}
					}
				}
			}
		}

		setTimeout(updateBoardView,200);
		return true;

	}else{
		return false;
	}
}

function moveRight(){
	if(canMoveRight(board)){
		for(var i=0;i<4;i++){
			for(var j=2;j>=0;j--){
				if(board[i][j]!=0){
					for(var k=3;k>j;k--){
						if(board[i][k]==0&&noBlockR(i,j,k,board)){
							//move
							showMove(i,j,i,k,width);
							board[i][k]=board[i][j];
							board[i][j]=0;
							continue;
						}else if(board[i][k]==board[i][j]&&noBlockR(i,j,k,board)&&!hascrash[i][k]){
							//move
							showMove(i,j,i,k,width);
							//add
							board[i][k]+=board[i][j];
							board[i][j]=0;
							//add score
							score+=board[i][k];
							updateScore(score);

							hascrash[i][k]=true;
							continue;
						}
					}
				}
			}
		}

		setTimeout(updateBoardView,200);
		return true;

	}else{
		return false;
	}
}

function moveUp(){
	if(canMoveUp(board)){
		for(var i=1;i<4;i++){
			for(var j=0;j<4;j++){
				if(board[i][j]!=0){
					for(var k=0;k<i;k++){
						if(board[k][j]==0&&noBlockU(i,j,k,board)){
							//move
							showMove(i,j,k,j,width);
							board[k][j]=board[i][j];
							board[i][j]=0;
							continue;
						}else if(board[k][j]==board[i][j]&&noBlockU(i,j,k,board)&&!hascrash[k][j]){
							//move
							showMove(i,j,k,j,width);
							//add
							board[k][j]+=board[i][j];
							board[i][j]=0;
							//add score
							score+=board[k][j];
							updateScore(score);

							hascrash[k][j]=true;
							continue;
						}
					}
				}
			}
		}

		setTimeout(updateBoardView,200);
		return true;

	}else{
		return false;
	}
}

function moveDown(){
	if(canMoveDown(board)){
		for(var i=2;i>=0;i--){
			for(var j=0;j<4;j++){
				if(board[i][j]!=0){
					for(var k=3;k>i;k--){
						if(board[k][j]==0&&noBlockD(i,j,k,board)){
							//move
							showMove(i,j,k,j,width);
							board[k][j]=board[i][j];
							board[i][j]=0;
							continue;
						}else if(board[k][j]==board[i][j]&&noBlockD(i,j,k,board)&&!hascrash[k][j]){
							//move
							showMove(i,j,k,j,width);
							//add
							board[k][j]+=board[i][j];
							board[i][j]=0;
							//add score
							score+=board[k][j];
							updateScore(score);

							hascrash[k][j]=true;
							continue;
						}
					}
				}
			}
		}

		setTimeout(updateBoardView,200);
		return true;

	}else{
		return false;
	}
}