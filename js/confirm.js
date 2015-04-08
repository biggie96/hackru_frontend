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
    Parse.initialize("kTCMnVzLnr8yVMnYANvA89GsHnWt6pVNVGFmMtW8", "CSNsCGdPM6DgC9Mx6uIyFJ9aVH5zMz1YD4Qzi3s2");

    $('#submitbtn').attr('disabled', true);
    $('#submitbtn').attr('value', 'Registering...');

    var reg = Parse.Object.extend("confirmations");
    var original_registrations = Parse.Object.extend("registration");

    var user = new reg();
    var data = getData();

    for (var i in data) user.set(i, data[i]);

    var q = new Parse.Query(original_registrations);
    q.equalTo('email', data.email);
    q.find({
      success: function (results) {
        if (results.length === 0) {
          finish("Sorry, we could not find a registration matching that email.");
          return;
        }

        q = new Parse.Query(reg)
        q.equalTo('email', data.email);
        q.find({
          success: function (results) {
            if (results.length === 0) {
              user.save().then(function () {
                finish("You're now confirmed for HackRU Spring 2015!");
              }, finish);
            }

            else finish("You have already confirmed your attendance.");
          },

          error: function (error) {
            finish("There was an error. Please try again later.");
          }
        });
      },

      error: function (error) {
        finish("There was an error. Please try again later.");
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

  }

}());
