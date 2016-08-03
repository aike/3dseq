var t;

var hsv2rgb = function(h, s, v) {
	var f, i, p, q, t;
	var rgb = [0,0,0];
	i = Math.floor(h / 60.0) % 6;
	f = (h / 60.0) - Math.floor(h / 60.0);
	p = Math.round(v * (1.0 - (s / 255.0)));
	q = Math.round(v * (1.0 - (s / 255.0) * f));
	t = Math.round(v * (1.0 - (s / 255.0) * (1.0 - f)));

	switch (i) {
		case 0 : rgb[0] = v; rgb[1] = t; rgb[2] = p; break;
		case 1 : rgb[0] = q; rgb[1] = v; rgb[2] = p; break;
		case 2 : rgb[0] = p; rgb[1] = v; rgb[2] = t; break;
		case 3 : rgb[0] = p; rgb[1] = q; rgb[2] = v; break;
		case 4 : rgb[0] = t; rgb[1] = p; rgb[2] = v; break;
		case 5 : rgb[0] = v; rgb[1] = p; rgb[2] = q; break;
	}
	return rgb[0] * 0x10000 + rgb[1] * 0x100 + rgb[2];
};

var GUI = function() {

};

GUI.prototype.init = function() {

	t = new ThreePiece('draw');

	this.dx = 16;
//	this.dy = 2; this.dz = 8;
	this.dy = 4; this.dz = 8;

	this.ox = 0;
	this.oy = 0;

//	this.scOn = 0.2; this.scOff = 0.12;
//	this.scOn = 0.25; this.scOff = 0.12;
	this.scMin = 0.12; this.scMax = 0.3; this.scDiff = this.scMax - this.scMin;

	this.showLayer = new Array(this.dy);
	for (var i = 0; i < this.dy; i++) {
		this.showLayer[i] = true;
	}

	this.showTrack = new Array(this.dy);
	for (var i = 0; i < this.dy; i++) {
		this.showTrack[i] = new Array(this.dz);
		for (var j = 0; j < this.dz; j++) {
			this.showTrack[i][j] = true;
		}
	}

	var sx = 1.0;
	var sy = 1.8;
	var sz = 1.2;
	var sc = 0.15;

	var data = [
        {obj:"grid"},
    ];

    var json = {obj:"group", data:[]};

    var angleStep = 2 * 60 / this.dz;
    for (var z = 0; z < this.dz; z++) {
	    var angle = 250 + z * angleStep;
	    for (var y = 0; y < this.dy; y++) {
		    for (var x = 0; x < this.dx; x++) {
		    	var px = sx * x - (sx * 8);
		    	var py = sy * y - 2;
		    	var pz = -sz * z + 5;
		    	var json1 = { 
					obj:"sphere",
					name:"" + x + "-" + y + "-" + z,
					x:px, y:py, z:pz,
					scale: this.scMin,
					segments: 10,
					col:hsv2rgb(angle, 255, 220)
				};
				var json2 = {
					obj:"bloom",
					name:"" + x + "-" + y + "-" + z + "b",
//					c:0, p:8, camerax:3, cameray:0.5, cameraz:10,
					c:0, p:8,
					x:px, y:py, z:pz,
					scale:0.8,
					col:hsv2rgb(angle, 255, 220)
				};

				json.data.push(json1);
				json.data.push(json2);
		    }
		}
    }
    data.push(json);

	t.eval(data);

	this.hideCursor();

	// resize callback
	var fitToWindow = function() {
		var w = window.innerWidth;
		var h = window.innerHeight;
		if (w / h > 11 / 6) {
			w = Math.floor(h * 11 / 6);
		} else {
			h = Math.floor(w * 6 / 11);
		}
		t.resize(w, h);
		t.setDirty();
	}
	fitToWindow();

	window.addEventListener('resize', function() {
		fitToWindow();
	}, false );
}



GUI.prototype.setCursor = function(y, x) {
	for (var z = 0; z < this.dz; z++) {
		t.obj("" + this.ox + "-" + this.oy + "-" + z + "b").material.visible = false;
	}

	for (var z = 0; z < this.dz; z++) {
		if (this.showTrack[y][z]) {
			t.obj("" + x + "-" + y + "-" + z + "b").material.visible = true;
		}
	}

	this.ox = x;
	this.oy = y;
}

GUI.prototype.hideCursor = function() {
	// 全ブルームを消す
    for (var z = 0; z < this.dz; z++) {
	    for (var y = 0; y < this.dy; y++) {
		    for (var x = 0; x < this.dx; x++) {
				t.obj("" + x + "-" + y + "-" + z + "b").material.visible = false;
			}
		}
	}
}

GUI.prototype.setSequence = function(seq) {
    for (var z = 0; z < this.dz; z++) {
	    for (var y = 0; y < this.dy; y++) {
		    for (var x = 0; x < this.dx; x++) {
		    	var size = this.scMin + (seq[y][z][x]/127) * this.scDiff;
				t.obj("" + x + "-" + y + "-" + z).scale.set(size, size, size);
			}
		}
	}
}

GUI.prototype.selectLayer = function(n) {
	if (n >= this.dy) return;
	gScene = n;
	gScene = n;
}

GUI.prototype.showSelectedLayer = function() {
	for (var i = 0; i < this.dy; i++) {
		this.showLayer[i] = false;
	}
	this.showLayer[gScene] = true;
	this.updateView();
}

GUI.prototype.showAllLayers = function() {
	for (var i = 0; i < this.dy; i++) {
		this.showLayer[i] = true;
	}
	this.updateView();
}

GUI.prototype.toggleTrack = function(y, tr) {
	if (y >= this.dy) return;
	if (tr >= this.dz) return;

	this.showTrack[y][tr] = !this.showTrack[y][tr];

	var b = this.showTrack[y][tr];
	for (var x = 0; x < this.dx; x++) {
		var s = "" + x + "-" + y + "-" + tr;
		t.obj(s      ).material.visible = b;
		t.obj(s + "b").material.visible = false;
	}
} 

GUI.prototype.setInitTrack = function(tr) {
	for (var y = 0; y < this.dy; y++) {
		for (var z = 0; z < this.dz; z++) {
			this.showTrack[y][z] = tr[y][z];
			var b = this.showTrack[y][z];
			for (var x = 0; x < this.dx; x++) {
				var s = "" + x + "-" + y + "-" + z;
				t.obj(s      ).material.visible = b;
				t.obj(s + "b").material.visible = false;
			}
		}
	}

} 


GUI.prototype.updateView = function() {
	for (var y = 0; y < this.dy; y++) {
		for (var z = 0; z < this.dz; z++) {
			var b;
			if (this.showLayer[y] && this.showTrack[y][z]) {
				b = true;
			} else {
				b = false;
			}
			for (var x = 0; x < this.dx; x++) {
				var s = "" + x + "-" + y + "-" + z;
				t.obj(s      ).material.visible = b;
				t.obj(s + "b").material.visible = false;
			}
		}
	}
}

