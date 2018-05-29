var yzmStr="";
function Yzmblur(formname){//验证码的监控
	var info="";
	var TelStr=$(formname).find(".KS_Tel").val()
	if (!TelStr.match(/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/) || TelStr.length!=11) {
		$(formname).find("#yzmbtn").attr("disabled","disabled")
		$(formname).find("#yzmbtn").removeClass("nodisabledbtn")
		return false;
	}
	if(info == ""){
		$(formname).find("#yzmbtn").removeAttr("disabled")
		$(formname).find("#yzmbtn").addClass("nodisabledbtn")
	}
}
function SendYZM(formname){//发送验证码
	var TelStr=$(formname).find(".KS_Tel").val();
	 for(var i=0;i<4;i++){
	 	yzmStr +=Math.floor(Math.random()*10)
	 }
	var c = "您正在计算预算的验证码为:"+yzmStr+"，如非本人操作，请忽略本短信";
	$.post("http://duanxin.tianjiedao.com/dx/",{tel:TelStr,content:c,cid:"味蜀吾"});//发送短信接口
	var i=60;
	var mySet=setInterval(function(){
		$(formname).find("#yzmbtn").attr("disabled","disabled")
		$(formname).find("#yzmbtn").removeClass("nodisabledbtn")
		$(formname).find("#yzmbtn").val(i+"S重新获取")
		i--
		if(i<=0){
			clearInterval(mySet)
			$(formname).find("#yzmbtn").val("获取验证码")
		}
	},1000)
}


function FormAJAX(formname,n,Pname){  //多功能表单提交插件
	var info = "",
		_name=formname;
		$(_name).children(".KS_Url").val(getCookie("url"))
		$(_name).children(".KS_Domain").val(getCookie("domain"))
		$(_name).children(".KS_Keyword").val(getCookie("kw"))
		$(_name).children(".KS_Source").val(getCookie("source"))
		$(_name).children(".KS_Plan").val(getCookie("plan"))
		$(_name).children(".KS_Unit").val(getCookie("unit"))
		$(_name).children(".KS_thisPage").val(getCookie("thisPage"))
		$(_name).children(".KS_AdPosition").val(getCookie("e_adposition"))
		$(_name).children(".KS_Creative").val(getCookie("e_creative"))
		$(_name).children(".KS_audience").val(getCookie("audience"))
		$(_name).children(".KS_PCM").val(getCookie("pcm"))
	var TelStr=$(_name).find(".KS_Tel").val(),
		NameStr=$(_name).find(".KS_Name").val();
	if (!TelStr.match(/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/) || TelStr.length!=11) {
			info = "请输入正确的电话号码！以便及时联系您！";
			alert(info)
			return false;
		}
	if(n == 1){ //******************************************************预约考察
		var year=$(_name).find("#year").find("option:selected").data().val,
		    month=$(_name).find("#month").find("option:selected").data().val,
		    days=$(_name).find("#days").find("option:selected").data().val;
		if(year == 1 || month == 1 || days == 1 ){
			info="请输入完整考察日期"
			alert(info)
			return false;
		}
		if(info == ""){
			var allstr="到店考察预约时间："+$(_name).find("#year").val()+"年"+
						$(_name).find("#month").val()+"月"+$(_name).find("#days").val()+"日"
			$(_name).find(".KS_Name").val(NameStr+Pname)
			$(_name).children(".KS_Content").val(allstr+Pname)
			/*************短信*/
			
			//需要就添加
			/*************短信*/
			$.post("http://m.wswhg.com/plus/form/form.asp", $(_name).serialize());//表单提交	
			$(_name).children(".KS_Name").val("")
			$(_name).children(".KS_Tel").val("")
			alert("留言成功，我们将尽快与您联系！")
		}
		
	}
	if(n == 2){//******************************************************投资预算
		var AreaStr=$(_name).find(".KS_Area").val(),
			CityStr=$(_name).find(".KS_City").val();
		if (CityStr == "") {
			info = "请输入准备加盟的城市！";
			alert(info)
			return false;
		}
		if (isNaN(AreaStr) || AreaStr < 190) {
			info = "请输入200平米以上的店铺面积！";
			alert(info)
			return false;
		}
		if(info == ""){
			$(_name).find(".KS_Name").val(NameStr+Pname)
			$(_name).children(".KS_Content").val("【预算"+AreaStr+"㎡】"+Pname)
			$.post("http://m.wswhg.com/plus/form/form.asp", $(_name).serialize());//表单提交
			/*************短信*/
			//需要就添加
			/*************短信*/
//			window.location.href = "http://www.yclmhg.cn/newpc/html/yusuan.html?a="+AreaStr+"#yusuan";//查看预算结果
			$(_name).find(".KS_Area").val("");
			$(_name).find(".KS_City").val("");
			$(_name).children(".KS_Tel").val("")
			alert("留言成功，我们将尽快与您联系！")
		}
		
	}
	if(n == 3){  //******************************************************底料试吃
		var Province=$(_name).find("#Province").val().trim(),
			City=$(_name).find("#City").val().trim(),
			Area=$(_name).find("#Area").val().trim(),
			cityxx=$(_name).find(".cityxx").val().trim(),
			_yjmap=Province+"省"+City+"市"+Area+"区/县"+"详情："+cityxx;
		if(!Province || !City || !Area){
			info="请选择邮寄地址"
			alert(info)
			return false;
		}
		if(info == ""){
			$(_name).find(".KS_Name").val(NameStr+Pname)
			$(_name).children(".KS_Content").val("底料试吃，详细地址："+_yjmap)
			$.post("http://m.wswhg.com/plus/form/form.asp", $(_name).serialize());//表单提交
			/*************短信*/
			//需要就添加
			/*************短信*/
			$(_name).find(".cityxx").val("")
			$(_name).find(".KS_Name").val("")
			$(_name).children(".KS_Tel").val("")
			alert("留言成功，我们将尽快与您联系！")
		}
		
	}
	if(n == 4){ //******************************************************选址评估
		var _GDP_val=$("#GDP_val").val(),
			_XF_val=$("#XF_val").val(),
			_SQ_val=$("#SQ_val").val(),
			_FJ_val=$("#FJ_val").val(),
			_DL_val=$("#DL_val").val(),
			_CAR_val=$("#CAR_val").val(),
			_RLL_val=$("#RLL_val").val(),
			_ZB_val=$("#ZB_val").val(),
			_JM_val=$("#JM_val").val(),
			_CS_num=99,
			contentStr ="人均GDP:"+_GDP_val+",人均消费:"+_XF_val+",商圈要求:"+_SQ_val+",房价参考值:"+_FJ_val+",周边到达道路:"+_DL_val+
				",车流量:"+_CAR_val+",人流量:"+_RLL_val+",周边单位数"+_ZB_val+",周边居民人口"+_JM_val;
		if($("#GDP_val").find("option:selected").data().val==1){
			_CS_num -= 1
		}
		if($("#XF_val").find("option:selected").data().val==1){
			_CS_num -= 1
		}
		if($("#FJ_val").find("option:selected").data().val==1){
			_CS_num -= 1
		}
		if($("#DL_val").find("option:selected").data().val==1){
			_CS_num -= 1
		}
		if($("#CAR_val").find("option:selected").data().val==1){
			_CS_num -= 1
		}
		if($("#RLL_val").find("option:selected").data().val==1){
			_CS_num -= 1
		}
		if($("#ZB_val").find("option:selected").data().val==1){
			_CS_num -= 1
		}
		if($("#JM_val").find("option:selected").data().val==1){
			_CS_num -= 1
		}
		if (info == "") {
			$(_name).find(".KS_Name").val(NameStr+Pname)
			$(_name).find(".KS_Content").val("【选址】:"+contentStr)
			$.post("http://m.wswhg.com/plus/form/form.asp", $(_name).serialize());//表单提交			
			$(_name).find(".KS_Content").val("")
			$(_name).find(".KS_Name").val("")
			$(_name).find(".KS_Tel").val("")
			alert("留言成功，我们将尽快与您联系！")
			document.getElementById("info").innerHTML = "";
			if(_CS_num<95){
				_CS_num=95
				$("#CS_num").html(_CS_num)
				$("#CS_info").fadeIn()
			}else{
				$("#CS_num").html(_CS_num)
				$("#CS_info").fadeIn()
			}
		}
	}
	if(n == 5){ //******************************************************底部页脚
		var contentStr="底部页脚留言";
		if (info == ""){
			$(_name).find(".KS_Content").val(contentStr);
			$(_name).find(".KS_Name").val(Pname);
			$.post("http://m.wswhg.com/plus/form/form.asp", $(_name).serialize());//表单提交			
			$(_name).find(".KS_Name").val("");
			$(_name).find(".KS_Tel").val("");
			$(_name).find(".KS_Content").val("")
			alert("留言成功，我们将尽快与您联系！")
		}
	}
}
			
			
			
function setCookie(name, value, day) {
	var Days = day;
	if (Days > 0){
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
	}else{	
		document.cookie = name + "=" + escape(value) + ";path=/";
	}
}
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) return unescape(arr[2]);
	else return null;
}


//发短信
function sendMessage(a,t){
	var my = new myClass(new para());
	var c = "您查询的"+a+"平米火锅店预算";
		c += my.unit(my.getTotal(a))+"万,"+my.getHb(a)+"个月。";
	$.post("http://duanxin.tianjiedao.com/dx/",{tel:t,content:c,cid:"渝城老妈"});//发送短信接口
}