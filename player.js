
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
}

Player.prototype.noteOn = function(inst, velocity) {
	switch (inst) {
		case 0:
			this.kick.noteOn();
			break;
		case 1:
			this.snare.noteOn();
			break;
		case 2:
			this.hat.noteOn();
			break;
		case 3:
			this.clap.noteOn();
			break;
		case 4:
		case 5:
		case 6:
		case 7:
	}

}

