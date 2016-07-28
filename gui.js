var t;

$(function(){
	console.log('hello world');

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



	t = new ThreePiece('draw');

	var dx = 16;
	var dy = 4;
	var dz = 8;

	var sx = 1.0;
	var sy = 1.8;
	var sz = 1.2;
	var sc = 0.15;
	var scOn = 0.2;
	var scOff = 0.12;

	var data = [
        {obj:"grid"},
//        {obj:"plane", col:0xcc8888, scale:100, rx:-Math.PI/2, y:-1},
//        {obj:"plane", col:0xcccc88, scale:100, z:-15, x:3, ry:0.3-Math.PI/2},
//        {obj:"plane", col:0xcccc88, scale:100, z:-15, x:3, ry:0.3},

//        {obj:"box", col:0x0000ff, name:"box"},
 //       {obj:"bloom", col:0x0000AA, scale:3,   name:"bloom",  c:0, p:8, camerax:0, cameray:0.5, cameraz:3},
//        {obj:"bloom", col:0x4488FF, scale:1.8, name:"bloom2", c:0, p:8, camerax:0, cameray:0.5, cameraz:3},
 //       {obj:"pointLight", col:0x4488FF, x:0,y:0,z:0, distance:2, name:"bloomLight"},

//        {obj:"box", col:0xee0000, x:-2},
//        {obj:"box", col:0xeeee00, x:2},


//        {obj:"directionalLight", intensity:0.2},
//        {obj:'hemisphereLight', intensity:0.2}
    ];

    var json = {obj:"group", data:[]};

    var angleStep = 2 * 60 / dz;
    for (var z = 0; z < dz; z++) {
	    var angle = 250 + z * angleStep;
	    for (var y = 0; y < dy; y++) {
		    for (var x = 0; x < dx; x++) {
		    	var px = sx * x - (sx * 8);
		    	var py = sy * y - 2;
		    	var pz = -sz * z + 5;
		    	var json1 = { 
					obj:"sphere",
					name:"" + x + "-" + y + "-" + z,
					x:px, y:py, z:pz,
					scale:(Math.random() > 0.8) ? scOn : scOff,
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



/*
	var angle = 0;
//	console.log(t.obj("box").material.color);
	t.addHook(function() {
		var p = (Math.sin(angle) / 2 + 0.5);
//		t.obj("bloom").material.uniforms["p"].value = (1 - p) * 4 + 4;
		t.obj("bloom2").material.uniforms["p"].value = (1 - p) * 4 + 4;
//		t.obj("bloomLight").intensity = p * 1;
		t.obj("box").material.color.r = p * 1;
		t.obj("box").material.color.g = p * 1;
		t.obj("box").material.color.b = 0.8 + 0.2 * p;
		angle += 0.05;
	});
*/


    for (var z = 0; z < dz; z++) {
	    for (var y = 0; y < dy; y++) {
		    for (var x = 0; x < dx; x++) {
				t.obj("" + x + "-" + y + "-" + z + "b").material.visible = false;
			}
		}
	}

	var cx = 0;
	var y = 0;
	setInterval(function() {
		for (var i = 0; i < dz; i++) {
			t.obj("" + cx + "-" + y + "-" + i + "b").material.visible = false;
		}
		cx = (cx + 1) % dx;
		if (cx == 0) {
			y = (y + 1) % dy;
		}
		for (var z = 0; z < dz; z++) {
			var o = t.obj("" + cx + "-" + y + "-" + z + "b");
			o.material.visible = true;
		}
	}, 100);



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

});
