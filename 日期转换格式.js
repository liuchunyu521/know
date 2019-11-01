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


format(fmt, date) { //author: format(yyyy-MM-dd,new Date();
	var o = {
	  "M+": date.getMonth() + 1, //月份
	  "d+": date.getDate(), //日
	  "h+": date.getHours(), //小时
	  "m+": date.getMinutes(), //分
	  "s+": date.getSeconds(), //秒
	  "q+": Math.floor((date.getMonth() + 3) / 3), //季度
	  "S": date.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
},
