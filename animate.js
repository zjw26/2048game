function showNumber(i,j,randomNum,width){
	var numberCell=$('#number-cell-'+i+'-'+j);
	numberCell.css('background-color',getBackgroundColor(randomNum));
	numberCell.css('color',getColor(randomNum));
	if(randomNum<1024){
		numberCell.css({
					'font-size':width*0.11,
					'line-height':width*0.2+'px'
				})
		numberCell.text(randomNum);
	}else{
		numberCell.css({
					'font-size':width*0.06,
					'line-height':width*0.2+'px'
				})
		numberCell.text(randomNum);
	}
	

	numberCell.animate({
		width:width*0.2,
		height:width*0.2,
		top:getPosTop(i,j,width),
		left:getPosLeft(i,j,width),
	},100)
}

function showMove(fromi,fromj,toi,tok,width){
	var numberCell=$('#number-cell-'+fromi+'-'+fromj);
	numberCell.animate({
		top:getPosTop(toi,tok,width),
		left:getPosLeft(toi,tok,width)
	},200)
}

function updateScore(score){
	$('#score').fadeOut(100);
	$('#score').text(score);
	$('#score').fadeIn(100)
}