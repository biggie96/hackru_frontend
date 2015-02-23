(function () {

// ## getData
// Gets data out of form and returns it
function getData () {
  return $('#regform').serializeArray().reduce(function (memo, item) {

    memo[item.name] = item.value;

    return memo;
  }, {});
}

function finish (msg) {
  superAlert(msg);

  $('#submitbtn').attr('disabled', false);
  $('#submitbtn').attr('value',  'Register');
}

function register () {
  Parse.initialize("9vSVKysQ2KkvfMMbToW3LXoyy1xcs20nUlqsiBg8", "OkHTHIZv4KVNKAdFXow3CtXlQ4IJb4ZTZeOJ0jrc");

  $('#submitbtn').attr('disabled', true);
  $('#submitbtn').attr('value', 'Registering ...');

  var reg = Parse.Object.extend("registration");

  var user = new reg();
  var data = getData();

  for (var i in data) user.set(i, data[i]);

  var filecontrol = $('#upfile')[0];
  var filename = $('#upfile').value;
  var parseFile;

  try {

    if (filecontrol.files.length > 0) {
      var file = filecontrol.files[0];
      var name = data.username.replace(/ /g, '') + "_resume";

      var parts = file.name.split('.');
      var ext = parts[parts.length - 1].toUpperCase();
      if (ext !== "PDF") {
        return finish("Resume must be a .pdf file");
      }

      parseFile = new Parse.File(name, file);
    } else {
      //return finish("Resume is required");
    }

  } catch (e) { 
    /* do nothing if the file shit doesnt work */
    //finish("Resume is required");
  } finally {
  }

  user.set('resume', parseFile);

  var q = new Parse.Query(reg);
  q.equalTo('email', data.email);
  q.find({
    success: function (results) {
      if (results.length === 0) {
        user.save().then(function () {
          finish("You've been signed up successfully!");
        }, finish);
      }

      else finish("Someone has already registered with that email.");
    },

    error: function (error) {
      finish("There was an error signing you up. Please try again later.");
    }
  });
}

$('#regform').on('submit', function (e) {
  e.preventDefault();

  register();
});

window.getData = getData;
window.register = register;

var inst = $.remodal.lookup[$('[data-remodal-id=modal]').data('remodal')];

function superAlert (stuff, redirect) {
  $('#remodal p').html(stuff);
  inst.open();

/*
  if (redirect) {
    $(document).on('closed', '.remodal', function () {
      window.location = redirect;
    });
  }
  */
}

}());
