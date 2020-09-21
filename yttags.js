$(document).ready(function () {
$("#myForm").submit(function (e) {
e.preventDefault();
function getVideoId(url) {
return url.split("v=")[1];
}
var url = $("#url").val();
var apiKey = "AIzaSyAbL44APZsKn_NvwyEEG8-UAyYt0IxMb1c";
var videoId = getVideoId(url);
var apiUrl =
"https://www.googleapis.com/youtube/v3/videos?key=" +
apiKey +
"&fields=items(snippet(title,tags,thumbnails))&part=snippet&id=" +
videoId;
getInfo(apiUrl);
});
function getInfo(apiUrl) {
$.get(apiUrl, function (data) {
$("#result").empty();
$("#url").val("");
var title = data.items[0].snippet.title;
var tags = data.items[0].snippet.tags;
var thumbnail = data.items[0].snippet.thumbnails.high.url;
var tagsResult = "";
if(tags){
tags.forEach((tag) => {
tagsResult += tag + ", ";
});
}
else{
tagsResult+='No Tags associated with this video.'
}
$("#result").append(`
<div class="text-center"> 
<img id="img" src="${thumbnail}" class="img-thumbnail" style="width:60%; height:40%;" alt="${title} image "/>
</div>
<div class="form-group">
<label for="title"><h5>Video Title:</h5></label>
<input type="text" class="form-control" disabled="true" value="${title}"/>
</div>
<div class="form-group" id="tagGenerated>
<label for="tags"><h5>Video Tags:</h5></label>
<textarea cols="12" rows="5" class="form-control" id="tagsResult">${tagsResult}</textarea>
</div>
<div class="text-center">
<button class="btn " id="btncopy" onclick="copyTxt()">
Copy Tags
</button>
</div>
`);
});
document.getElementById('btnmain').addEventListener('click',function(){
window.location='#tagGenerated';
});
}
});
function copyTxt() {
/* Get the text field */
let copyText = document.getElementById("tagsResult");
let btncopy= document.getElementById('btncopy');
copyText.select();
copyText.setSelectionRange(0, 99999); 
document.execCommand("copy");
btncopy.innerHTML='Copied';
setTimeout(function(){ 
btncopy.innerHTML='Copy Tags';
}, 1000);
}
(function($) {
$(function() {
$('nav ul li > a:not(:only-child)').click(function(e) {
$(this).siblings('.nav-dropdown').toggle();
$('.nav-dropdown').not($(this).siblings()).hide();
e.stopPropagation();
});
$('html').click(function() {
$('.nav-dropdown').hide();
});
$('#nav-toggle').on('click', function() {
this.classList.toggle('active');
});
$('#nav-toggle').click(function() {
$('nav ul').toggle();
});
});
})(jQuery);

