
window.onload = initpage;
function initpage(){
	clearClick();
	var panels = document.getElementById("content").childNodes;
	for(var i=0; i < panels.length; i++)
	{
		panels[i].className = "hidden";
	}
	var links = document.getElementById("sidebar").getElementsByTagName("a");
	for(var i=0; i < links.length; i++)
	{
		//if(links[i].)	//含有id属性
		links[i].onclick = showPanel;
	}
	document.getElementById("TextMessagePanel").className = "";
	document.getElementById("addBtn").disabled = true;
	document.getElementById("sendBtn").disabled = true;
	
	
	document.getElementById("message").onkeyup = msgKeyup;
	document.getElementById("importBtn").onclick= importClick;
	document.getElementById("addBtn").onclick= addClick;
	document.getElementById("clearBtn").onclick= clearClick;
	document.getElementById("sendBtn").onclick= sendClick;
	document.getElementById("cancelBtn").onclick= cancelClick;
	document.getElementById("continueBtn").onclick= continueClick;
	document.getElementById("cpwBtn").onclick= cpwClick;
	document.getElementById("telnum").onkeyup= telnumKeyup;
	
	
	//document.getElementById("Record").onclick= test;
	addEventHandler(document.getElementById("AM"), "click", getAccountInfo);
}
function msgKeyup(e) {
	var me = getActivatedObject(e);
	document.getElementById("charNum").firstChild.nodeValue = me.value.length;
	if((me.value.length != 0) && (document.getElementById("telCount").firstChild.nodeValue != "0"))
		document.getElementById("sendBtn").disabled = false;
	else
		document.getElementById("sendBtn").disabled = true;
}
function telnumKeyup(e) {
	var me = getActivatedObject(e);
	if(/^\d{11}$/.test(me.value))
		document.getElementById("addBtn").disabled = false;
	else
		document.getElementById("addBtn").disabled = true;
}
function test(){
	r = createRequest();
	if(r == null)
	{
		alert("unable to create request");
		return;
	}
	r.onreadystatechange = function(){
		if(r.readyState == 4){
			if(r.status == 200){
				alert(r.responseText);
				//DataTable.reload("datatable10");
				//document.getElementById("telCount").firstChild.nodeValue = r.responseText;
			}
		}
	}
	r.open("GET","LoadRecordJson.php",true);
	r.send();
}
function showPanel()
{
	var panels = document.getElementById("content").childNodes;
	for(var i=0; i < panels.length; i++)
	{
		panels[i].className = "hidden";
	}
	//alert(this.id);
	document.getElementById(this.id + "Panel").className = "";
}

function importClick(){
	if(document.getElementById("file").value=="")
	{
		alert("请选择要上传的号码文件！");
		return;
	}
	r = createRequest();
	if(r == null)
	{
		alert("unable to create request");
		return;
	}
	r.onreadystatechange = function(){
		if(r.readyState == 4){
			if(r.status == 200){
				//alert(r.responseText);
				DataTable.reload("telTable");
				document.getElementById("telCount").firstChild.nodeValue = r.responseText;
				
				if(document.getElementById("message").value != "")
					document.getElementById("sendBtn").disabled = false;
				else
					document.getElementById("sendBtn").disabled = true;
			}
		}
	}
	var df = new FormData(document.getElementById("telForm"));
	r.open("POST","importTelNum.php",true);
	r.send(df);
}

function addClick(){
	r = createRequest();
	if(r == null)
	{
		alert("unable to create request");
		return;
	}
	r.onreadystatechange = function(){
		if(r.readyState == 4){
			if(r.status == 200){
				//alert(r.responseText);
				DataTable.reload("telTable");
				document.getElementById("telCount").firstChild.nodeValue = r.responseText;
				
				if(document.getElementById("message").value != "")
					document.getElementById("sendBtn").disabled = false;
				else
					document.getElementById("sendBtn").disabled = true;
			}
		}
	}
	var url = "addTelNum.php?telnum=" + escape(document.getElementById("telnum").value);
	r.open("GET",url,true);
	r.send();
}

function clearClick(){
	r = createRequest();
	if(r == null)
	{
		alert("unable to create request");
		return;
	}
	r.onreadystatechange = function(){
		if(r.readyState == 4){
			if(r.status == 200){
				//alert(r.responseText);
				DataTable.reload("telTable");
				document.getElementById("telCount").firstChild.nodeValue = r.responseText;
				
				document.getElementById("sendBtn").disabled = true;
			}
		}
	}
	var url = "clearTelNum.php";
	r.open("GET",url,true);
	r.send();
}

function sendClick(){
	document.getElementById("TextMessagePanel").className = "hidden";
	document.getElementById("EnsurePanel").className = "";
	var tc = document.getElementById("telCount");
	var tc1 = document.getElementById("telCount1");
	var msg = document.getElementById("message");
	var msg1 = document.getElementById("message1");
	if(tc1.firstChild)
		tc1.firstChild.nodeValue = tc.firstChild.nodeValue;
	else{
		var lettertext = document.createTextNode(tc.firstChild.nodeValue);
		tc1.appendChild(lettertext);
	}
	msg1.value = msg.value;
	
	r = createRequest();
	if(r == null)
	{
		alert("unable to create request");
		return;
	}
	r.onreadystatechange = function(){
		if(r.readyState == 4){
			if(r.status == 200){
				var sendInfo = eval('(' + r.responseText + ')');
				var act = document.getElementById("account");
				var avb = document.getElementById("available");
				if(act.firstChild)
					act.firstChild.nodeValue = sendInfo.account;
				else{
					var lettertext = document.createTextNode(sendInfo.account);
					act.appendChild(lettertext);
				}
				if(avb.firstChild)
					avb.firstChild.nodeValue = sendInfo.available;
				else{
					var lettertext = document.createTextNode(sendInfo.available);
					avb.appendChild(lettertext);
				}
			}
		}
	}
	var url = "Ensure.php";
	r.open("GET",url,true);
	r.send();
}

function cancelClick(){
	document.getElementById("TextMessagePanel").className = "";
	document.getElementById("EnsurePanel").className = "hidden";
}
function continueClick(){
	//画个等待的图案
	document.getElementById("loading").className = "";
	r = createRequest();
	if(r == null)
	{
		alert("unable to create request");
		return;
	}
	r.onreadystatechange = function(){
		if(r.readyState == 4){
			if(r.status == 200){
				DataTable.reload("recordTable");
				document.getElementById("loading").className = "hidden";
				alert(r.responseText);
				document.getElementById("TextMessagePanel").className = "";
				document.getElementById("EnsurePanel").className = "hidden";
			}
		}
	}
	var url = "sendMessage.php?message=" + document.getElementById("message").value;
	r.open("GET",url,true);
	r.send();
}
function showRecord(obj)
{
	//alert(obj.id.substr(1));
	var id = obj.id.substr(1)
	r = createRequest();
	if(r == null)
	{
		alert("unable to create request");
		return;
	}
	r.onreadystatechange = function(){
		if(r.readyState == 4){
			if(r.status == 200){
				var recordInfo = eval('(' + r.responseText + ')');
				var rt = document.getElementById("rectime");
				var rm = document.getElementById("recmsg");
				if(rt.firstChild)
					rt.firstChild.nodeValue = recordInfo.time;
				else{
					var lettertext = document.createTextNode(recordInfo.time);
					rt.appendChild(lettertext);
				}
				/*if(rm.firstChild)
					rm.firstChild.nodeValue = recordInfo.msg;
				else{
					var lettertext = document.createTextNode(recordInfo.msg);
					rm.appendChild(lettertext);
				}*/
				rm.value = recordInfo.msg;
				//alert(r.responseText);
				
				var f = document.getElementById("drForm");
				f.action="LoadDRJson.php?id="+id;
				DataTable.reload("drTable");
				document.getElementById("DRPanel").className = "";
				document.getElementById("RecordPanel").className = "hidden";
				//document.getElementById("telCount").firstChild.nodeValue = r.responseText;
			}
		}
	}
	var url="showRecord.php?id="+id;
	r.open("GET",url,true);
	r.send();
}
function deleteRecord(obj)
{
	//alert(obj.id.substr(1));
	var id = obj.id.substr(1)
	r = createRequest();
	if(r == null)
	{
		alert("unable to create request");
		return;
	}
	r.onreadystatechange = function(){
		if(r.readyState == 4){
			if(r.status == 200){
				alert(r.responseText);
				DataTable.reload("recordTable");
			}
		}
	}
	var url="deleteRecord.php?id="+id;
	r.open("GET",url,true);
	r.send();
}
function getAccountInfo(){
	r = createRequest();
	if(r == null)
	{
		alert("unable to create request");
		return;
	}
	r.onreadystatechange = function(){
		if(r.readyState == 4){
			if(r.status == 200){
				var accountInfo = eval('(' + r.responseText + ')');
				var amount = document.getElementById("amount");
				var account1 = document.getElementById("account1");
				if(amount.firstChild)
					amount.firstChild.nodeValue = accountInfo.amount;
				else{
					var lettertext = document.createTextNode(accountInfo.amount);
					amount.appendChild(lettertext);
				}
				if(account1.firstChild)
					account1.firstChild.nodeValue = accountInfo.account;
				else{
					var lettertext = document.createTextNode(accountInfo.account);
					account1.appendChild(lettertext);
				}
			}
		}
	}
	var url = "getAccount.php";
	r.open("GET",url,true);
	r.send();
}


function cpwClick(){
	var origpsw = document.getElementById("origpsw");
	var newpsw = document.getElementById("newpsw");
	if(origpsw.value == "" || newpsw.value == "")
	{
		alert("请输入密码！");
		return;
	}
	r = createRequest();
	if(r == null)
	{
		alert("unable to create request");
		return;
	}
	r.onreadystatechange = function(){
		if(r.readyState == 4){
			if(r.status == 200){
				alert(r.responseText);
				document.getElementById("origpsw").value="";
				document.getElementById("newpsw").value="";
				//DataTable.reload("datatable10");
				//document.getElementById("telCount").firstChild.nodeValue = r.responseText;
			}
		}
	}
	var requestDate = "origpsw=" + escape(document.getElementById("origpsw").value) + "&newpsw=" + escape(document.getElementById("newpsw").value);
	//alert(requestDate);
	r.open("POST","ChangePSW.php",true);
	r.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
	r.send(requestDate);
}


function createRequest() {
  try {
    request = new XMLHttpRequest();
  } catch (tryMS) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (otherMS) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        request = null;
      }
    }
  }	
  return request;
}

function getActivatedObject(e){
	var obj;
	if(!e){
		obj = window.event.srcElement;
	}
	else if(e.srcElement){
		obj = e.srcElement;
	}
	else{
		obj = e.target;
	}
	return obj;
}

function addEventHandler(obj, eventName, handler){
	if(document.attachEvent){
		obj.attachEvent("on" + eventName, handler);
	}
	else if(document.addEventListener){
		obj.addEventListener(eventName, handler, false);
	}
}





