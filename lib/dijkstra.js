var ds, tl, ss;

addEventListener('message', om);  

console.log("OPTIMIZER INITIALIZED");

function om(m){
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
	ro(ds, dstrt, ss, tl, 
		function(d){
			self.postMessage(d)
		}
	);
	console.log("OPTIMIZING TASK:");
	console.log(d);
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
	var p, c, cd, v, r, rl, s, b, ri, ns, di, dj;
	v = [p = ds];
	r = ss;
	r.splice(r.indexOf(p), 1);
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
			if (b > cd && cd !== 0){
				s = c;
				b = cd;
			}
		}
		v.push(s);
		r.splice(r.indexOf(s), 1);
		p = s;	
	}
	cb(v);
}




















