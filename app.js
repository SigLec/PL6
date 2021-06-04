$(document).ready(function(){

// Ajout bouton "Ajouter un livre" 
var addButton = $('.h2').after('<button class="btn" id="addBook">Ajouter un livre</button>');
var $addBook = $('#addBook');
	
// Ajout bloc div "searchForm" 
var addSearchForm = $('.h2').after('<div id="searchForm"></div>');
var $searchForm = $('#searchForm');

// Ajout du formualire dans le bloc div "searchForm"
$searchForm.append(
	'<form id="form">',
	'<label for="title" class="label">Titre du livre</label><br />', 
	'<input type="text" id="titleInput" class="field" /><br /><br />',
	'<label for="author" class="label">Auteur</label><br />', 
	'<input type="text" id="authorInput" class="field" /><br /><br />',
	'<button class="btnForm" id="search">Rechercher</button><br /><br />',
	'<button class="btnForm" id="cancel">Annuler</button><br /><br />',
	'</form>');

var $field = $('.field');

// Bloc div formulaire caché par défaut
$searchForm.hide();

// Fonctionnalités du clic sur le bouton "Ajouter un livre"
$('#addBook').click (function(){
	$addBook.hide();
	$searchForm.show();
});

// Fonctionnalités du clic sur le bouton "Annuler"
$('#cancel').click (function(){
	$searchForm.hide();
	$addBook.show();
	$resultsTitle.hide();
	$resultsContainer.hide();
	$field.val("");
});

/* A partir d'ici, code appel API requête AJAX */
$searchForm.after(
	"<div class='h4' id='resultsTitle'>" +
	"<h4>Résultats de recherche</h4>" +
	"</div>");
var $resultsTitle = $('#resultsTitle');

$resultsTitle.after(
	"<div class='container' id='resultsContainer'></div>");
var $resultsContainer = $('#resultsContainer');
// Bloc div titre et résultats de la recherche caché par défaut
$resultsTitle.hide();
$resultsContainer.hide();

//-----var $resultBlock = $('#resultBlock');-------------------------//
var apiUrl = "https://www.googleapis.com/books/v1/volumes?q="
var apiKey = "AIzaSyAdMSAMUsKSRpbMDjFuBmTjPDGTk4DRN-k"
var resultsData;

// Ecoute du bouton search
$('#search').click(function() {
	//$resultsContainer.html("");
	resultsData = $('#titleInput').val();
	//handling empty search input field
	if(resultsData === "" || resultsData === null) {
		alert("Vous devez renseigner les champs titre et auteur avant de soumettre le formulaire");
	} else {
		$.ajax({
			url: apiUrl + resultsData,
			dataType: 'json',
			success: function(response) {
				console.log(response);
				if(response.totalItems === 0) {
					alert("Aucun livre n\'a été trouvé");
				}
				else {
					$resultsTitle.show();
					$resultsContainer.show();

					displayResults(response);
				}
			},
			error: function() {
				alert("Une erreur est survenue");
			}
		});
	}
	$('#titleInput').val(""); // clean search box
});

	//Fonction to display the results in index.html
	function displayResults(response) {
		for (var i = 0; i < response.items.length; i++) {
			// get id, title, author, description and image of the book
			item = response.items[i];
			var $title = item.volumeInfo.title;
			var $id = item.id;
			var $author = item.volumeInfo.authors[0];
			/* The description should contain 200 char max and display 
			"Information manquante" if there's no description available*/
			var $description = 
			item.volumeInfo.description === undefined ? 
			"Information manquante" : item.volumeInfo.description.substr(0, 199);
			var $imgBook = item.volumeInfo.imageLinks === undefined ?
			"image/unavailable.png" : item.volumeInfo.imageLinks.thumbnail;

	$('.container').append(
			"<div class='container-card'>" +
  			"<div class='card'>" +
  			"<div class='card-body'>" +
    			"<h5 class='card-title'>Titre :&nbsp;" + $title + "</h3>" +
    			"<h4 class='card-author'>"  + $author  + "</h4>" +
       		"<p class='card-id'>Id :&nbsp;" + $id  + "</p>" +
       		"<p class='card-text'>Description : &nbsp;" + $description + "</p>" + 
   			"<button class='button' id='bookmark'" + $id + "'><i class='far-solid fa-bookmark'></i></button>" +
   			"<img src='" + $imgBook + "'class='card-img-bottom img-fluid img-thumbnail' alt='later'/>" + 
			"</div>" +
			"</div>" +
			"</div>");


			}
	}



});