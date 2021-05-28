$(document).ready(function(){

//var $title = $('#title'),
//var $author = $('#author'),
//var $submit = $('#submit');
//var $reset = $('#reset');
//var $addBook = $('#addBook');

$('.h2').after('<button class="btn" id="addBook">Ajouter un livre</button>');
	$('#addBook').css({
		color : 'rgb(255,255,255)',
		backgroundColor : 'rgb(23, 152, 155)',
		fontSize : '1.3em',
		width : '200px',
		height : '35px'
	});


$('<div id="addBookForm"></div>').insertAfter('.btn');
	$('#addBookForm').css({
		backgroundColor : 'rgb(224, 224, 224)',
});

function displaySearchForm(){
$('#addBookForm').prepend(
	'<div id="formDisplay">',
	'<form id="formSearch">',
	'<label for="title" class="label">Titre du livre</label><br /><br />', 
	'<input type="text" id="title" class="field" required /><br /><br />',
	'<label for="author" class="label">Auteur</label><br /><br />', 
	'<input type="text" id="author" class="field" required /><br /><br />',
	'</form>',
	'<script>',
	'console.log("test")',
	'</script>',

	'<button class="btnForm" id="search">Rechercher</button><br /><br />',
	'<button class="btnForm" id="cancel">Annuler</button><br /><br />',
	'</div>');
	//'<input type="submit" id="submit" class="btnForm" value="Rechercher" /><br /><br />',
	//'<input type="reset" id="reset" class="btnForm" value="Annuler" /><br /><br />',
}

$('#addBook').click(function(){
	$('#addBook').hide();
	displaySearchForm();
});



$('#cancel').click(function(){
	$('#addBook').show();
});



});

/* 1. Créer une arboresence des méthodes utiles
   2. Variabiliser un maximum
*/


/*function displaySearchForm(){
$('#addBookForm').prepend('<div id="formDisplay"></div>');
$('#formDisplay').append('<form id="formSearch"></form>');
$('#formSearch').append('<label for="title" class="label">Titre du livre</label><br /><br />');
$('#formSearch').append('<input type="text" id="title" class="field" required /><br /><br />');
$('#formSearch').append('<label for="author" class="label">Auteur</label><br /><br />');
$('#formSearch').append('<input type="text" id="author" class="field" required /><br /><br />');
$('#formSearch').append('<input type="submit" id="submit" class="btnForm" value="Rechercher" /><br /><br />');
$('#formSearch').append('<input type="reset" id="reset" class="btnForm" value="Annuler" /><br /><br />');
}*/