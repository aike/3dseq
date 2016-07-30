/*
 *
 * This program is licensed under the MIT License.
 * Copyright 2013, aike (@aike1000)
 *
 */


var gPlay = false;

var gScene = 0;
var gNextScene = 0;

var gNextTrack = new Array(false,false,false,false,false,false,false,false);

var gBar = 0;
var gBeat = 0;

var gBpm = 139;
var gNoteLen = Math.floor(60 * 1000 / (4 * gBpm));

var gui;

$(function() {
	var rotating = false;

// 1-8のキーは、trackのOn/Offがよさそう
// シーン切り替えは Z X C V



	shortcut.add("1",function() { gNextTrack[0] = true; });
	shortcut.add("2",function() { gNextTrack[1] = true; });
	shortcut.add("3",function() { gNextTrack[2] = true; });
	shortcut.add("4",function() { gNextTrack[3] = true; });
	shortcut.add("5",function() { gNextTrack[4] = true; });
	shortcut.add("6",function() { gNextTrack[5] = true; });
/*	shortcut.add("6",function() { toggleTrack(5); });
	shortcut.add("7",function() { toggleTrack(6); });
	shortcut.add("8",function() { toggleTrack(7); });
*/
	shortcut.add("z",function() { gNextScene = 0; });
	shortcut.add("x",function() { gNextScene = 1; });
	shortcut.add("c",function() { gNextScene = 2; });
	shortcut.add("v",function() { gNextScene = 3; });

/*
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

	shortcut.add("enter",function() { 
		if (!gPlay) {
			gBeat = 0;
			gPlay = true;
		}
	});

	shortcut.add(" ",function() { 
		gPlay = !gPlay;
	});

	shortcut.add("esc",function() {
		gPlay = false;
	});

	var player = new Player();
	player.init();

	gui = new GUI();
	gui.init();

	gui.setSequence(pat);

	//////////////////////////////////////

	var sequencer = function() {

		var play = function() {
			if (gPlay) {
				for (var tr = 0; tr < 8; tr++) {
					if (gui.showTrack[gScene][tr]) {
						if (pat[gScene][tr][gBeat] > 0) {
							player.noteOn(tr, pat[gScene][tr][gBeat]);
						}
					}
				}
				gui.setCursor(gScene, gBeat);

				gBeat++;
				if (gBeat > 15) {
					gBar++;
					gBeat = 0;

					gScene = gNextScene;
					gui.selectLayer(gScene);

					for (var i = 0; i < 8; i++) {
						if (gNextTrack[i]) {
							gui.toggleTrack(gScene, i);
							gNextTrack[i] = false;
						}
					}
				}
			}

			setTimeout(play, gNoteLen);
		};

		setTimeout(play, 0);
	};

	var seq = new sequencer();

//	setTimeout(function() { console.log("play1 "); sequencer.play(); }, 3000);

});