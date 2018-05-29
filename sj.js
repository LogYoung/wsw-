function setNYR(min,max){
		var minDate=min
	    var maxDate=max
//	    var arr=min.split("-");
//	    	$("#yinfo").html(arr[0])
//	    	$("#minfo").html(arr[1])
//	    	$("#rinfo").html(arr[2])
	    $(function(){
	        $("#date").selectDate(minDate,maxDate);
	    })
	    $.fn.selectDate = function(minDate,maxDate){
	//默认最早日期
	        minDate=minDate||'1900-01-01';
	        var mindatearr=	minDate.split("-")
	//开始的年月日
	        var minYear = mindatearr[0]
	        var minMon=parseInt(mindatearr[1], 10)
	        var minDay=parseInt(mindatearr[2], 10)
	//当前日期
	        var now=new Date();
	        var currentdate=now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()
	        maxDate=maxDate||currentdate
	        var maxdatearr=maxDate.split("-")
	//截止的年月日
	        var maxYear = maxdatearr[0]
	        var maxMon=parseInt(maxdatearr[1], 10)
	        var maxDay=parseInt(maxdatearr[2], 10)
	
	        var yearSel = document.getElementById('year')
	        var monthSel = document.getElementById('month')
	        var daySel = document.getElementById('days')
	
	        removeOption(yearSel);
	        removeOption(monthSel);
	        removeOption(daySel);
	
	        for(var y = maxYear;y >= minYear;y--){
	            var yearOpt = document.createElement('option')
	            yearOpt.value = y
	            yearOpt.innerHTML = y
	            yearSel.appendChild(yearOpt)
	        }
	
	        $("#year").click(function(event){
	            if(!$("#year").val()){
	                removeOption(monthSel);
	                removeOption(daySel);
	                startMon=1;
	                endMon=12
	                return;
	            }
	            removeOption(monthSel)
	            var startMon=1
	            var endMon=12
	            if($("#year").val()==minYear){startMon=minMon;}
	            if($("#year").val()==maxYear){endMon=maxMon;}
	            addOption(startMon,endMon,'月',monthSel)
	            removeOption(daySel)
	
	        })
	
	        $("#month").click(function(){
	            removeOption(daySel)
	            var year = $("#year option:selected").val()
	            var month = $("#month option:selected").val()
	            var startDay=1
	            var endDay=31
	            if(year==minYear && month==minMon){
	                startDay=minDay;
	            }
	            if(year==maxYear && month==maxMon){
	                endDay=maxDay;
	            }
	
	            if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
	
	                addOption(startDay,endDay,'日',daySel)
	            }else if(month==4 || month==6 || month==9 || month==11){
	                if(endDay>30){endDay=30;}
	                addOption(startDay,endDay,'日',daySel)
	            }else if(month==2){
	                if((year%4 == 0 && year%100 != 0 ) || (year%400 == 0)){
	                    if(endDay>29){endDay=29;}
	                    addOption(startDay,endDay,'日',daySel)
	                }else{
	                    if(endDay>28){endDay=28;}
	                    addOption(startDay,endDay,'日',daySel)
	                }
	            }
	        })
	
	        function addOption(minnum,num,unit,parent){
	//minnum:最小值
	//num：选项个数
	//unit：单位（年/月/日）
	//parent：父对象
	            for(var index=minnum;index <= num;index++){
	                var opt =document.createElement('option')
	                if(index<10){index = '0'+index}
	                $(opt).attr('value',index)
	                $(opt).html(index)
	                $(parent).append(opt)
	            }
	        }
	
	
	
	        function removeOption(parent){
	//parent：父对象
	            var options = $(parent).find('option')
	            for(var index = 1;index < options.length;index++){
	                parent.removeChild(options[index])
	            }
	        }
	    }

}
		