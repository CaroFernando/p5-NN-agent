let ps = []
let env;
let ncuad;
let ncont;
let globalcount;
const nregs = 5000;
const ini = 500;
let xs = [];
let ys = [];

let spawn = [20,40];

function setup(){
	createCanvas(800, 600, P2D);
	background(0);
	ps = [];
	ncont = 0;
	globalcount = 0;

	for(let i = 0; i < 1; i++){
		ps.push(new player(16, 30));
	}

	env = new environment();
	ncuad = int(random(spawn[0],spawn[1]));
}

function draw(){
	background(0);
	env.show();

	for(let i = 0; i < ps.length; i++){
		let dists = ps[i].update(env.get_lines());

		if(globalcount == nregs + ini){
			for(let ep = 0; ep < 100; ep++){
				for(let d = 0; d < xs.length; d++){
					ps[i].nn.train(xs[d], ys[d]);
				}
			}

		}else if(globalcount > nregs + ini){
			if(keyIsDown(UP_ARROW)){
				ps[i].pos.x = width/2;
				ps[i].pos.y = height/2;
			}else ps[i].automove_all_dir(dists);
		}else{
			let m = [0,0,0,0,1];

			if(keyIsDown(UP_ARROW)){
				m[0] = 1;
				m[4] = 0;
			}
			if (keyIsDown(DOWN_ARROW)){
				m[1] = 1;
				m[4] = 0;
			}
			if (keyIsDown(RIGHT_ARROW)){
				m[4] = 0;
				m[2] = 1;
			}
			if (keyIsDown(LEFT_ARROW)){
				m[4] = 0;
				m[3] = 1;
			}
			print(m);
			ps[i].move_all_dir(m)
			if(globalcount > ini){
				xs.push(dists);
				ys.push(m);
			}
		}

		if(env.check_col(ps[i])){
				print("HIT");
		}

	}
	if(ncont >= ncuad){
		ncont = 0;
		ncuad = int(random(spawn[0],spawn[1]));
		env.new_cuad();
	}
	//print(globalcount);
	ncont++;
	globalcount++;

}
