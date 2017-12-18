$(document).ready(function() {
  var charizard = {
    name: 'charizard',
    health: 100,
    attack: 25,
    baseAtk: 25,
    counter: 10,
  },
  blastoise = {
    name: 'blastoise',
    health: 100,
    attack: 20,
    baseAtk: 20,
    counter: 20
  },
  venosaur = {
    name: 'venosaur',
    health: 100,
    attack: 10,
    baseAtk: 10,
    counter: 30
  };

  var userChar = {},
      opponent = {};

  var defeatedCount = 0;

  var $userChar,
      $opponent;

  var characterSelected = false,
      opponentSelected = false;

  var $charizard = $('#charizard'),
      $blastoise = $('#blastoise'),
      $venosaur = $('#venosaur');

  var characters = [
    charizard,
    blastoise,
    venosaur
  ];
  var $characters = [
    $charizard,
    $blastoise,
    $venosaur
  ];

  function attack() {
    // User attacks
    opponent.health -= userChar.attack;
    // Opponent counters
    userChar.health -= opponent.counter;
    // Increase user's attack
    userChar.attack += userChar.baseAtk;

    if (userChar.health > 0 && opponent.health <= 0) {
      opponent.health = 0;
      $('#messages').html("You defeated " + opponent.name + "! Select your next opponent!");
      $opponent.find('.overlay').removeClass('opponent').addClass('defeated');
      updateStats();
      defeatedCount++;
      opponent = 0;
      $opponent = 0;
      opponentSelected = false;
    } else if (userChar.health <= 0 && opponent.health > 0) {
      userChar.health = 0;
      $('#messages').html("You were defeated! Reset the game to try again!");
      $userChar.find('.overlay').addClass('defeated');
      updateStats();
    } else if (userChar.health <= 0 && opponent.health <= 0) {
      userChar.health = 0;
      opponent.health = 0;
      $('#messages').html("You were both defeated! Reset the game to try again!");
      $opponent.find('.overlay').removeClass('opponent').addClass('defeated');
      $userChar.find('.overlay').addClass('defeated');
      updateStats();
      defeatedCount++;
      opponent = 0;
      $opponent = 0;
      updateStats();
    } else {
      updateStats();
    }
  }

  function updateStats() {
    if(!characterSelected) {
      for (var i = 0; i < $characters.length; i++) {
        $characters[i].find('.health').children().html(characters[i].health);
        $characters[i].find('.attack').children().html(characters[i].attack);
        $characters[i].find('.counter').children().html(characters[i].counter);
      }
    } else {
      $userChar.find('.health').children().html(userChar.health);
      $userChar.find('.attack').children().html(userChar.attack);
      $userChar.find('.counter').children().html(userChar.counter);
      $opponent.find('.health').children().html(opponent.health);
      $opponent.find('.attack').children().html(opponent.attack);
      $opponent.find('.counter').children().html(opponent.counter);
    }

  }
  function reset() {
    userChar = 0;
    $userChar = 0;
    opponent = 0;
    $opponent = 0;
    defeatedCount = 0;
    characterSelected = false;
    opponentSelected = false;
    for (var i = 0; i < $characters.length; i++) {
      $characters[i].find('.overlay').removeClass('user opponent defeated');
      characters[i].health = 100;
      characters[i].attack = characters[i].baseAtk;
    }
    updateStats();
    $('html, body').animate({
        scrollTop: $("#characters").offset().top
    }, 1000);
    $('#messages').html("Select your character!");
  }
  function runGame() {
    $('html, body').animate({
        scrollTop: $("#characters").offset().top
    }, 1000);
    $('#messages').html("Select your character!");
    $('.character').click(function() {
      var $this = $(this);
      if (defeatedCount < 2) {
        if (!characterSelected) {
          switch ($this.data('character')) {
            case 'charizard':
              userChar = charizard;
              $userChar = $charizard;
              break;
            case 'blastoise':
              userChar = blastoise;
              $userChar = $blastoise;
              break;
            case 'venosaur':
              userChar = venosaur;
              $userChar = $venosaur;
              break;
            default:
              break;
          }
          characterSelected = true;
          console.log("User character: ");
          console.log(userChar);
          console.log($userChar);
          $('#messages').html("Choose your opponent!");
          $userChar.find('.overlay').addClass('user');

        } else {
          if (characterSelected && defeatedCount < 2 && !$this.find('.overlay').hasClass('defeated') && !$this.find('.overlay').hasClass('user')) {
            if (!opponentSelected) {
              switch ($this.data('character')) {
                case 'charizard':
                  opponent = charizard;
                  $opponent = $charizard;
                  break;
                case 'blastoise':
                  opponent = blastoise;
                  $opponent = $blastoise;
                  break;
                case 'venosaur':
                  opponent = venosaur;
                  $opponent = $venosaur;
                  break;
                default:
                  break;
              }
              opponentSelected = true;
              console.log("Opponent character: ");
              console.log(opponent);
              console.log($opponent);
              $opponent.find('.overlay').addClass('opponent');
              $('#messages').html("You attacked " + opponent.name + "!");
              attack();
            } else {
              if ($userChar != $opponent) {
                $opponent.find('.overlay').addClass('opponent');
                $('#messages').html("You attacked " + opponent.name + "!");
                attack();
              } else {
                $('#messages').html("You can't fight yourself!  Please select another one.");
                opponent = 0;
                $opponent = 0;
              }
            }

          } else {
            $('#messages').html("You have already defeated this monster, please select another one.");
          }
        }
      } else {
        $('#messages').html("You win! Reset the game to play again.");
      }

    });
  }
  updateStats();
  $('#gameStart').click(function () {
    runGame();
  });
  $('#reset').click(function() {
    reset();
  });
});
