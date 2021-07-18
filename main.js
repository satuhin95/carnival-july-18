$('.slide_1 .element_5').click(function(e){
	e.preventDefault();
	$('.slide_1 .element_5').addClass('hidden');
	$('.slide_1 .element_1').addClass('hidden');
	$('.slide_1 .element_4').css('bottom','-35px');
	$('.slide_1 .element_6').removeClass('hidden');
	$('.slide_1 .element_7').removeClass('hidden');
	$('.slide_1 .element_8').removeClass('hidden');
})
	setTimeout(showSlide2,4000);
function showSlide2(){
	$('.slide_2').removeClass('hidden');
}



$(".form_area input").keyup(function(){
	$(this).css('background-color','#FEF8E8');
});
$(".form_area select").change(function(){
	$(this).css({'background-color':'#FEF8E8','color':'#EC1651'});
});

$(".slide_2 .element_3").click( function(){

		var name 	= $(".form_area #name").val();
		var mobile 	= $(".form_area #mobile").val();
		var area 	= $(".form_area #area").val();

		if ( mobile.length > 10 ) {

			if ( data_handle( name, mobile, area ) ) {
				
			} else {
				$(".slide_2 [class*='element_']").addClass('hidden');
				$(".something_wrong").removeClass('hidden');

				setTimeout(function () {
					$(".slide_2 [class*='element_']").removeClass('hidden');
					$(".something_wrong").addClass('hidden');
				}, 3000);
			}

		} else {
			console.info('Mobile number not valid');
		}				
		
	});

			function data_handle ( name, mobile, area ) {
				let data = new FormData;

				if ( valid_number = valid_mobile(mobile) ) {
					data.append( "name", name);
					data.append( "mobile", valid_number);
					data.append( "area", area );
					data.append( "link", window.top.location.href);

					var xhttp = new XMLHttpRequest();
              	xhttp.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                     submitted=true;
                     $(".slide_2 [class*='element_']").addClass('hidden');
							$('.slide_3').removeClass('hidden');
							console.log(xhttp.responseText);
                  }
              	};
              	xhttp.open("POST", 'http://localhost/office/carnival/data.php', true);
              	xhttp.send(data);                

					return true;

				} else {
					return false;
				}

			}

			/*
				* Validate Bangladeshi mobile number
				* @author: Lincoln Mahmud
				* @company: Purple Patch
			*/

			function valid_mobile ( value ) {
				/*When value not number then try to convert bangla to english number*/
				if (isNaN(value)) {
					value = translteBanglaToEngNum(value);
				}
				valid_number = value.match("(?:\\+88|88)?(01[3-9]\\d{8})"); /*Regular expression to validate number*/
				/*When valid return without +88/88 number if exist*/
				if(valid_number){
				    return valid_number[1]; /*valid number method return 3 with actual input*/
				} else {
					return false; /*return false when not valid*/
				}
			}

			/*
				* Bangla to English number conversion method
				* @author: Lincoln Mahmud
				* @company: Purple Patch
			*/

			function translteBanglaToEngNum( num_str ){
			    var bengali = {"০":0, "১":1, "২":2, "৩":3, "৪":4, "৫":5, "৬":6, "৭":7, "৮":8, "৯":9};
			    var changed_nun='';
			    num_str.toString().split('').forEach(l => {
			      if(isNaN(l)){
			      	changed_nun += bengali[l];
			      }else{
			      	changed_nun +=l;
			      }
			    });
			    return changed_nun;
			}	