
var Player = function() {
	
}

Player.prototype.init = function() {
	var ctx = new AudioContext();
	if (!ctx.createGain)
		ctx.createGain = ctx.createGainNode;
	if (!ctx.createDelay)
		ctx.createDelay = ctx.createDelayNode;

	this.drumVolume = ctx.createGain();
	this.drumVolume.gain.value = 0.8;

//	this.kick = new Sampler(ctx, 'wav/kick.wav');
	this.kick = new Sampler(ctx, 'wav/amen_kick_crash.wav');
//	this.snare = new Sampler(ctx, 'wav/snare.wav');
	this.snare = new Sampler(ctx, 'wav/amen_snare.wav');
//	this.hat = new Sampler(ctx, 'wav/hat.wav');
	this.hat = new Sampler(ctx, 'wav/amen_kick_ride.wav');
	this.clap = new Sampler(ctx, 'wav/clap.wav');

	this.kick.connect(this.drumVolume);
	this.snare.connect(this.drumVolume);
	this.hat.connect(this.drumVolume);
	this.clap.connect(this.drumVolume);
	this.drumVolume.connect(ctx.destination);

	this.synth1 = new Sampler(ctx, 'wav/synth1.wav');
	this.synth1.connect(ctx.destination);
	this.synth2 = new Sampler(ctx, 'wav/synth2.wav');
	this.synth2.connect(ctx.destination);
	this.perc1 = new Sampler(ctx, 'wav/perc1.wav');
	this.perc1.connect(ctx.destination);
	this.seq = new Sampler(ctx, 'wav/seq.wav');
	this.seq.connect(ctx.destination);
	this.bass = new Sampler(ctx, 'wav/bass.wav');
	this.bass.connect(ctx.destination);
}

Player.prototype.noteOn = function(inst, velocity) {
	switch (inst) {
		case 0:
			this.kick.noteOn(velocity);
			break;
		case 1:
			this.snare.noteOn(velocity);
			break;
		case 2:
			this.perc1.noteOn(velocity);
			break;
		case 3:
			this.seq.noteOn(velocity);
			break;
		case 4:
			this.bass.noteOn(velocity);
			break;
		case 5:
			this.synth1.noteOn(velocity);
			break;
		case 6:
		case 7:
	}

}

