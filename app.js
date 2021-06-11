$(document).ready(function(){

var book, title, author, id, description, imgBook;
var booksSortedById = new Set();
var selectedBooks = new Set();
var pochList = [];


// Add button "Ajouter un livre" 
var addButton = $('.h2').after('<button class="btn" id="addBook">Ajouter un livre</button>');
var $addBook = $('#addBook');
	
// Add div "searchForm" 
var addSearchForm = $('.h2').after('<div id="searchForm"></div>');
var $searchForm = $('#searchForm');

// Add form in div "searchForm"
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

// div form hidden by default
$searchForm.hide();

// Event listener on "addBook" button
$('#addBook').click (function(){
	$addBook.hide();
	$searchForm.show();
});

// Event listener on "cancel" button
$('#cancel').click (function(){
	$searchForm.hide();
	$addBook.show();
	$resultsTitle.hide();
	$resultsContainer.hide();
	$field.val("");
});

// Add div for title of the search results area
$searchForm.after(
	"<div class='h4' id='resultsTitle'>" +
	"<h4>Résultats de recherche</h4>" +
	"</div>");
var $resultsTitle = $('#resultsTitle');
// Add div for search results area
$resultsTitle.after(
	"<div class='container' id='resultsContainer'></div>");
var $resultsContainer = $('#resultsContainer');
// Title and search results block hidden dy default
$resultsTitle.hide();
$resultsContainer.hide();

var apiUrl = "https://www.googleapis.com/books/v1/volumes?q="
var apiKey = "AIzaSyAdMSAMUsKSRpbMDjFuBmTjPDGTk4DRN-k"

// Event listener on search button
$('#search').click(function() {
	apiCall();
});

//Send the request to google API
	function apiCall() {
	$resultsContainer.html("");
	titleInput = $('#titleInput').val();
	authorInput = $('#authorInput').val();
	//handling empty search input field
	if(titleInput === "" || authorInput === "") {
		alert("Vous devez renseigner les champs titre et auteur avant de soumettre le formulaire");
	} else {
		$.ajax({
			url: apiUrl + "+intitle:" + titleInput + "+inauthor:" + authorInput,
			dataType: 'json',
			success: function(response) {
				console.log(response);
				if(response.totalItems === 0) {
					alert("Aucun livre n'a été trouvé");
				}
				else {
					$resultsTitle.show();
					$resultsContainer.show();
					displayResponse(response);
				}
			},
			error: function() {
				alert("Une erreur est survenue");
			}
		});
	}
	$('#titleInput').val(""); // clean search input
	$('#authorInput').val("");  // clean search input
}

//Fonction to display the results in index.html
function displayResponse(response) {
	var result = [];
	for (var i = 0; i < response.items.length; i++) {
		var item = response.items[i];
		var book = {
			"title": item.volumeInfo.title,
			"author" : item.volumeInfo.authors[0],
			"id": item.id,
			"description": item.volumeInfo.description ? item.volumeInfo.description.substr(0, 199) : "information manquante",
			"imgBook" : item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail :
		"image/unavailable.png" 
		};
		result.push(book);
		booksSortedById[book.id] = book;
		}
		displayResponseInCard(result);
	}

//Fonction to display the results in cards format
function displayResponseInCard(result) {
	for(var i = 0; i < result.length; i++) {
    var book = result[i];
	$resultsContainer.append(
		'<div class="container-card">'+
  		'<div class="card">' +
  		'<div class="card-body">' +
    		'<h5 class="card-title" id="titleCard">Titre :&nbsp;' + book.title + '</h3>' +
    		'<h4 class="card-author" id="authorCard">'  + book.author + '</h4>' +
       	'<p class="card-id">Id :&nbsp;' + book.id  + '</p>' +
       	'<p class="card-text">Description : &nbsp;' + book.description + "&nbsp;[...]" + '</p>' + 
		'<button class="icon" id="bookmark" data-id= "' + book.id + '"><i class="fas fa-bookmark" title="Ajouter à la poch\'List"></i></button>' +   		
		'<img src="' + book.imgBook + '"class="card-img-bottom img-fluid img-thumbnail" alt="cover"/>' + 
		'</div>' +
		'</div>' +
		'</div>');
	}
}
	// Event listener on bookmark button
	$("body").on("click", "#bookmark", function() {
				var bookId = $(this).data("id");
				console.log(bookId);
				addToFavorites(bookId);
				$pochListContainer.empty();
				displayPochList();
				$pochListContainer.show();
	});

		function addToFavorites(bookId) {
		var book = booksSortedById[bookId];
		if(selectedBooks.has(bookId)) {
		console.log('Vous ne pouvez ajouter deux fois le même livre');
		} else {
		selectedBooks.add(bookId);
		pochList.push(book);
		console.log('Votre livre a bien été ajouté à votre poch\'List!');
		sessionStorage.setItem('selectedBooks', JSON.stringify(pochList));
		console.log(selectedBooks);
		console.log(pochList);
			}
		}

	// Add div for pochList area
	var addFavoritesContainer = $('#content').after('<div class="container" id="pochListContainer"></div>');
	var $pochListContainer = $('#pochListContainer');

	// Function to dislay books in pochList
	function displayPochList() {
	for (var i = 0; i < pochList.length; i++) {
		$pochListContainer.append(
		'<div class="container-card">'+
  		'<div class="card">' +
  		'<div class="card-body">' +
    		'<h5 class="card-title" id="titleCard">Titre :&nbsp;' + pochList[i].title + '</h3>' +
    		'<h4 class="card-author" id="authorCard">'  + pochList[i].author + '</h4>' +
       	'<p class="card-id">Id :&nbsp;' + pochList[i].id  + '</p>' +
       	'<p class="card-text">Description : &nbsp;' + pochList[i].description + "&nbsp;[...]" + '</p>' + 
       	'<button class="icon" id="trash" data-trash= "' + pochList[i].id + '"><i class="fas fa-trash-alt" title="Supprimer de la poch\'List"></i></button>' +   		
   		'<img src="' + pochList[i].imgBook + '"class="card-img-bottom img-fluid img-thumbnail" alt="cover"/>' + 
		'</div>' +
		'</div>' +
		'</div>');
		}
	}

	//PochList container hidden by default
	$pochListContainer.hide();

	// Event listener on trash button
	$("body").on("click", "#trash", function() {
				var bookId = $(this).data("trash");
				var book = booksSortedById[bookId];
				console.log(bookId);
				removeFromFavorites(bookId);
				$pochListContainer.empty();
				displayPochList();			
	});

	// Event listener on trash button
	function removeFromFavorites(bookId) {
		var book = booksSortedById[bookId];
		selectedBooks.delete(bookId);
		console.log(selectedBooks);
		console.log(pochList);
		// Find the index of the book we want to delete
		var deletedBookIndex = pochList.indexOf(book);
		console.log(deletedBookIndex);
		var removedBook = pochList.splice(deletedBookIndex, 1);
		sessionStorage.setItem('selectedBooks', JSON.stringify(pochList));
		console.log('Votre livre a bien été retiré votre poch\'List!');
		console.log(pochList);
		console.log(selectedBooks);
	}

});