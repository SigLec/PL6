$(document).ready(function() {

$('#addBookForm')after('<div class="diplaySearch" id="searchList"</div>');
$('.diplaySearch')append('<div class ="searchTitle"');
$('.diplaySearch')append('<div class ="bookList"');


var item, title, id, author, description, image //JSON ressources from API
var field; // Data input fields from user
var $searchList = $('.diplaySearch');

const googleBooksApiUrl = "https://www.googleapis.com/books/v1/volumes?q="
const googleBooksApiKey = 'AIzaSyAdMSAMUsKSRpbMDjFuBmTjPDGTk4DRN-k'
const unavailableImg = '<img src= "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Salesforce_P1_FR/unavailable.png">'
const bookMarkICon = '';
const trashIcon = '';

//lestener for search button
$('#search').click(function() {
	$searchList.html() = ""
	field = $('.field').val(); 
	//
	if(field === "" || field === null){
		displayError();
	}
	else {
		$.ajax({
			url: googleBooksApiUrl + searchData
			dataType: 'json',
			success: fonction(response){
				console.log(response)
				if(response.totalItem === 0) {
					alert("No results found");
				}
				else {
					$(".searchTitle").show();
					$(".bookList").show();
					displayResults(response);
			
				}
			}
			error: function() {
				alert("An error has occured");
			}
		});
	}
	$('.field').val(""); // clean search-box

});




	/*$.post(
		{
			title : $('#title').val(),
			author : $('#author').val()
		},

		function(data){
			if(datd ==='success'){
			// Le membre est connecté, ajoutons-lui un msg dans la page HTML
				$('#resultats').html('<p>Vous êtes désormais connecté!</p>');
			}
			else{
			// Le membre n'a pas été connecté
				$('#resultats').html('<p>Erreur lors de la connexion...</p>');
			}
		},

		'json',
		);*/
	

