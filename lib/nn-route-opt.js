var ds, tl, ss;
console.log("I LIVE!");
addEventListener('message', om);  

function om(m){
	console.log("I GOT MESSAGE!");
	console.log(m);
	var d, dstrt;
	d = m.data;
	ds = d.distances || ds;
	tl = d.tourLength || tl;
	ss = d.stops || ss;
	dstrt = d.tourStart || 0;
	if (!(tl && ds && ss)){
		// throw error
		return
	}  
	console.log(ds);

	ro(ds, dstrt, ss, tl, 
		function(d){
			self.postMessage(d)
		}
	);
}		

function sm(m){
	return function (i, j){
		j = i < j 
			? [j, i = j][0] 
			: j;
		return m[i+','+j]
	}
}

function ro(dm, ds, sr, tl, cb){
	console.log("OPTIMIZING!");
	var p, c, cd, v, r, rl, s, b, ri, ns, di, dj;
	v = [p = ds];
	r = ss;
	console.log(r);
	r.splice(r.indexOf(p), 1);
	console.log(v);
	console.log(r);
	console.log(tl);
	while (v.length < tl){
		ri = 0;
		rl = r.length;
		b = Infinity; 
		s = 0;
		for (; ri < rl; ri++){ 
			c = r[ri];
			di = c < p
				 ? c
				 : p;
			dj = di === c
				? p
				: c;
			cd = parseInt(dm[di+','+dj], 10);
			console.log(b);
			console.log(cd);
			if (b > cd && cd !== 0){
				s = c;
				b = cd;
				console.log("NEW");
				console.log(s);
			}
		}
		v.push(s);
		r.splice(r.indexOf(s), 1);
		p = s;	
	}
	console.log(v);
	cb(v);
}




















