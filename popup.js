var responseObject;

$(function(){
  $("#machine").bind("change", machineselected);
  $("#os").bind("change", osselected);
  $("#shoot").bind("click", gotest);
  $.ajax({
    'url' : 'https://www.browserstack.com/list-of-browsers-and-platforms.json?product=live',
    'type' : 'GET',
    'dataType' : 'json',
    'success' : function(response) {
      responseObject = response;
	  fillmachine();
    }
  });
});

function machineselected(){
  var platform = $('#machine').val();
  $('#os').empty();
  oslist = responseObject[platform];
  if(platform == 'mobile'){
    $('#device').show();
    $('#browser').hide();
  }else{
    $('#device').hide();
    $('#browser').show();
  }
  displayoslist(oslist);
};

function osselected(oslist){
    platform = $('#machine').val();
    os = $('#os').val();
    if(platform == 'desktop'){
   	 browserlist = responseObject[platform][os].browsers;
        displaybrowserlist(browserlist);
     }else{
		 devicelist = responseObject[platform][os].devices;
        displaydevicelist(devicelist);
    }
};


function gotest(){
	var url = "https://www.browserstack.com/start#";
    platform = $('#machine').val();
    osselected = $('#os').val();
	osDetails = responseObject[platform][osselected];
	url += "os=" + osDetails.osselected + "&";
	   if ( platform === "desktop" ){

	       browser = $('#browser').val();
	        browserDetails = osDetails.browsers[browser];
	        url += "os_version=" + osDetails.os_version + "&browser=" + 
	            browserDetails.browser + "&browser_version=" + 
	            browserDetails.browser_version;
	   }
	   else {
		   device = $('#device').val();
	        deviceDetails = osDetails.devices[device];
	        url += "os_version=" + deviceDetails.os_version
	            +"&device=" + deviceDetails.device;
	   }
	    url=url.replace(/\s/g,"+");
	   chrome.tabs.create({url:url,selected:true});
}

function displayoslist(osList){
	for(i=0;i<osList.length;i++){
	       $('#os').append('<option value="'+i.toString()+'">'+
	               osList[i].os_display_name+'</option>');
	    } 
	};
	
function displaybrowserlist(browsersList){
	for(i=0;i<browsersList.length;i++){
	       $('#browser').append('<option value="'+i.toString()+'">'+
	               browsersList[i].display_name+'</option>');
	    } 
	
};

function displaydevicelist(devicesList){
	for(i=0;i<devicesList.length;i++){
	       $('#device').append('<option value="'+i.toString()+'">'+
	               devicesList[i].display_name+'</option>');
	    } 
};

function fillmachine(){
    $.each(responseObject,function(index,item){
        $('#machine').append('<option value="'+index.toString()+'">'+
                index.toString()+'</option>');
    });
};

