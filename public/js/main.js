
$('#song').keypress(function (e) {
    // debugger;
    
    var key = e.which;
    
 if(key == 13){ 
     e.preventDefault();
    var songname = $('#song').val();
    // alert(songname);

  
    $.get("songs/", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
    return false;
    
}

});   
