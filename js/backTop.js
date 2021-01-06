$(window).scroll(function(){
    // console.log($(this).scrollTop());
    if($(this).scrollTop()>420){
        $('.m-warp').css('position','fixed');
        $('.m-warp').addClass('fixed1')
    }
    if($(this).scrollTop()<=420){
        $('.m-warp').removeClass('fixed1')
        $('.m-warp').css('position','absolute');
        $('.m-warp').addClass('absolute1')
    }
    
    if($(window).scrollTop()<=100){
        $(".m6").fadeOut(1000);	
    }else{
        $(".m6").fadeIn(1000);
    }
})
$(function () { 
    $(".m6").click(function(){ 
        $('body,html').animate({scrollTop:0},1000); 
        return false; 
    }); 
}); 
