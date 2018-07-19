function getPosTop(i,j,width){
	return 0.04*width+i*0.24*width;
}

function getPosLeft(i,j,width){
	return 0.04*width+j*0.24*width;
}

function getBackgroundColor(number){

    switch(number){

    	case 2:return "#eee4da";
    	break;

    	case 4:return "#ede0c8";
    	break;

    	case 8:return "#f2b179";
    	break;

    	case 16:return "#f59563";
    	break;

    	case 32:return "#f67c5f";
    	break;

    	case 64:return "#f65e3b";
    	break;

    	case 128:return "#edcf72";
    	break;

    	case 258:return "#edcc61";
    	break;

    	case 512:return "#9c0";
    	break;

    	case 1024:return "#33b5e5";
    	break;

    	case 2048:return "#09c";
    	break;

    	case 4096:return "#a6c";
    	break;

    	case 8192:return "#93c";
    	break;

    }

    return '#000';

}

function getColor(number){
	if(number<=4){
		return "#776e65";
	}
	return "white"
}

function nospace(board){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0)
				return false;
		}
	}
	return true;
}

function canMoveLeft(board){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0)
				if(board[i][j-1]==0||board[i][j-1]==board[i][j])
					return true;
				
		}
	}
	return false;
}

function noBlockL(row,j,k,board){
	for(var i=k+1;i<j;i++){
		if(board[row][i]!=0){
			return false;
		}	
	}
	return true;
}

function canMoveRight(board){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0)
				if(board[i][j+1]==0||board[i][j+1]==board[i][j])
					return true;
				
		}
	}
	return false;
}

function noBlockR(row,j,k,board){
	for(var i=k-1;i>j;i--){
		if(board[row][i]!=0){
			return false;
		}	
	}
	return true;
}

function canMoveUp(board){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0)
				if(board[i-1][j]==0||board[i-1][j]==board[i][j])
					return true;
				
		}
	}
	return false;
}

function noBlockU(row,j,k,board){
	for(var i=k+1;i<row;i++){
		if(board[i][j]!=0){
			return false;
		}	
	}
	return true;
}

function canMoveDown(board){
	for(var i=2;i>=0;i--){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0)
				if(board[i+1][j]==0||board[i+1][j]==board[i][j])
					return true;
				
		}
	}
	return false;
}

function noBlockD(row,j,k,board){
	for(var i=k-1;i>row;i--){
		if(board[i][j]!=0){
			return false;
		}	
	}
	return true;
}

function nomove(board){
	if(canMoveDown(board)||canMoveUp(board)||canMoveRight(board)||canMoveLeft(board))
		return false;
	return true;
}