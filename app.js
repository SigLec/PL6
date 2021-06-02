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
	'<input type="text" id="title" class="field" required /><br /><br />',
	'<label for="author" class="label">Auteur</label><br />', 
	'<input type="text" id="author" class="field" required /><br /><br />',
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
	$searchResultsBlock.hide();
	$field.val("");
});

// Ajout du bloc des résultats de la recherche  
var addSearchResultsBlock = $('#searchForm').after('<div id="searchResultsBlock">Résultats de la recherche :</div>');
var $searchResultsBlock = $('#searchResultsBlock');

// Ajout du bloc témoin pour chaque item de résultats
$searchResultsBlock.append('<div id="resultBlock"></div>');
var $resultBlock = $('#resultBlock');

// Ajout des renseignements à l'intérieur du bloc témoin
$resultBlock.append(
	'<p id="bookTitle" class="insideResultBlock">Titre : </p>',
	'<p id="bookId" class="insideResultBlock">Id : </p>',
	'<p id="bookAuthor" class="insideResultBlock">Auteur :</p>',
	'<p id="bookDescription" class="insideResultBlock">Description :</p>',
	'<img id="imgBook" class="img" src ="image/unavailable.png"/>'
);

// Bloc div résultats de la recherche caché par défaut
$searchResultsBlock.hide();

// Fonctionnalités du clic sur le bouton "Rechercher"
$('#search').click (function(){
	$searchResultsBlock.show();
});


});