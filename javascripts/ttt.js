$(function() {
  var ttt_board, cellmap, is_match, match_strategies;

  ttt_board = $('#ttt-board');

  cellmap = [
    0,0,0,
    0,0,0,
    0,0,0
  ];

  match_strategies = [
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6]
  ];

  is_match = function() {
    var match_found = false;
    $.each(match_strategies, function(k,v) {
      var this_match_strategy = v;
      var this_total = 0;
      $.each(this_match_strategy, function(i,n) {
        this_total = this_total + cellmap[n];
      });
      if (this_total > 2) match_found = 'X';
      if (this_total < -2) match_found = 'O';
    });
    if (match_found != false) return match_found;
    return false;
  }

  get_character_token = function(value) {
    if (value == -1) return 'O';
    if (cellmap[this_index] == 1) return 'X';
    return '';
  }

  get_value = function(token) {
    if (token == 'X' || token == 'x') return 1;
    if (token == 'O' || token == 'o') return -1;
    return 0;
  }

  update_board = function() {
    ttt_cells = $('.ttt-cell');
    $.each(ttt_cells, function(k,v) {
      this_index = $(ttt_cells).index(this);
      $(this).val(get_character_token(cellmap[this_index]));
    });
  }

  game_over = function(winner) {
    var ttt_result = $('#ttt-result');
    ttt_result.html('GAME OVER!  ' + winner + ' WINS!');
  }

  $('.ttt-cell').on('keyup', function(e) {
    var this_index = $('.ttt-cell').index(this);
    cellmap[this_index] = get_value($(this).val());
    update_board();
    if (is_match()) game_over(is_match());
  });

});
