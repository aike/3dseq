/*
 *
 * This program is licensed under the MIT License.
 * Copyright 2013, aike (@aike1000)
 *
 */


var gPlay = true;

var gScene = 0;
var gNextScene = 0;

var gBar = 0;
var gBeat = 0;

var gBpm = 150;
var gNoteLen = Math.floor(60 * 1000 / (4 * gBpm));

$(function() {
	var rotating = false;

// 1-8のキーは、trackのOn/Offがよさそう
// シーン切り替えは Z X C V


/*

	shortcut.add("1",function() { toggleTrack(0); });
	shortcut.add("2",function() { toggleTrack(1); });
	shortcut.add("3",function() { toggleTrack(2); });
	shortcut.add("4",function() { toggleTrack(3); });
	shortcut.add("5",function() { toggleTrack(4); });
	shortcut.add("6",function() { toggleTrack(5); });
	shortcut.add("7",function() { toggleTrack(6); });
	shortcut.add("8",function() { toggleTrack(7); });

	shortcut.add("z",function() { selScene(0); });
	shortcut.add("x",function() { selScene(1); });
	shortcut.add("c",function() { selScene(2); });
	shortcut.add("v",function() { selScene(3); });


	shortcut.add("l",function() { showSelectedScene(); });
*/

	shortcut.add("r",function() {
		if (!rotating) {
			t.rotate();
		} else {
			t.stopRotate();
		}
		rotating = !rotating;
	});

	shortcut.add(" ",function() { 
		if (!gPlay) {
			gBeat = 0;
			gPlay = true;
		}
	});

	shortcut.add("esc",function() {
		gPlay = false;
	});

	var player = new Player();
	player.init();

	var sequencer = function() {

		var play = function() {
			if (gPlay) {
				for (var tr = 0; tr < 8; tr++) {
					if (pat[gScene][tr][gBeat] > 0) {
						player.noteOn(tr, pat[gScene][tr][gBeat]);
					}
				}
			}

			gBeat++;
			if (gBeat > 15) {
				gBar++;
				gBeat = 0;
			}
			setTimeout(play, gNoteLen);
		};

		setTimeout(play, 0);
	};

	var seq = new sequencer();

//	setTimeout(function() { console.log("play1 "); sequencer.play(); }, 3000);

});