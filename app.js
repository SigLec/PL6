$(document).ready(function(){

//var $title = $('#title'),

var addButton = $('.h2').after('<button class="btn" id="addBook">Ajouter un livre</button>');
	$('#addBook').css({
		color : 'rgb(255,255,255)',
		backgroundColor : 'rgb(23, 152, 155)',
		fontSize : '1.3em',
		width : '200px',
		height : '35px'
	});


var addBookForm = $('.h2').after('<div id="addBookForm"></div>')
	$('#addBookForm').css({
		backgroundColor : 'rgb(205, 224, 224)',
});

$('#addBookForm').css('display', 'none');

$('#addBook').click (function(){
	$('#addBook').hide();
	$('#addBookForm').css('display', 'block');


});

$('#addBookForm').append(
	'<form id="formSearch">',
	'<label for="title" class="label">Titre du livre</label><br /><br />', 
	'<input type="text" id="title" class="field" required /><br /><br />',
	'<label for="author" class="label">Auteur</label><br /><br />', 
	'<input type="text" id="author" class="field" required /><br /><br />',
	'<button class="btnForm" id="search">Rechercher</button><br /><br />',
	'<button class="btnForm" id="cancel">Annuler</button><br /><br />',
	'</form>');


$('#cancel').click (function(){
	$('#addBookForm').css('display', 'none');
	$('#addBook').show();
});


});