function timeFormat(da) {
		var time = da,nowTime=new Date()
		var timeArr=[
			nowTime.getFullYear()+'',
			nowTime.getMonth()+1+'',
			nowTime.getDate()+'',
			nowTime.getHours()+'',
			nowTime.getMinutes()+'',
			nowTime.getSeconds()+''
		]
		timeArr=timeArr.map(item=> item=item.length<2?"0"+item:item)
		time=time.replace(/[-|\s]/ig,":").split(":")

		if(time[1]!=timeArr[1]||time[0]!=timeArr[0]||timeArr[2]-time[2]>2){
			return time[0]+'-'+time[1]+'-'+time[2]
		}else if(timeArr[2]-time[2]==2){
			return "前天"
		}else if(timeArr[2]-time[2]==1){
			return "昨天"
		}else if(timeArr[3]-time[3]>12){
			return "上午"
		}else if(timeArr[3]!=time[3]){
			return timeArr[3]-time[3]+"小时前"
		}else if(timeArr[4]!=time[4]){
			return timeArr[4]-time[4]+"分钟前"
		}else{
			return "刚刚"
		}
	}
