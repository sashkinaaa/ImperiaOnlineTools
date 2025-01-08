// ==UserScript==
// @name       Colony Finder
// @namespace  sashkinaaa
// @version    0.1
// @description Search for colonies of players
// @match      https://*.imperiaonline.org/imperia/game_v5/game/villagejs.php*
// @copyright  2025, sashkinaaa
// ==/UserScript==


init();

//The script takes some time to find the colonies, so just let it work long enough

function init() {
	//let server = prompt('server');

	const container = document.createElement('div');
	container.style.width = '95%';
	container.style.position = 'absolute';
	container.style.top = '90vh';
	container.style.left = '50%';
	container.style.transform = 'translateX(-50%)';
	container.style.background = 'white';
	container.style.border = '1px solid black';
	container.style.zIndex = '999';
	document.body.appendChild(container);

	const values = document.createElement('div');
	values.style.width = '100%';
	values.style.display = 'flex';
	values.style.alignItems = 'center';
	values.style.justifyContent = 'space-evenly';
	values.style.borderBottom = '1px solid black';
	values.innerHTML = `<span>NAME</span><span>LOCATION</span><span>TIPE</span><span>ALIANCE</span>`;
	container.appendChild(values);

	const span = values.children;
	const spans = Array.from(span);
	spans.forEach((element) => {
		element.style.width = '100%';
		element.style.display = 'flex';
		element.style.alignItems = 'center';
		element.style.justifyContent = 'center';
		element.style.borderRight = '1px solid black';
		element.style.fontSize = '1.4rem';
	});
	let i = 0;
	let j = 1000;
	let link = '';
	let data = [];
	var url = '';
	var typ = 'Bonus type';

	const time = setInterval(function () {
		link = '';
		let n = i;
		let m = j;
		for (n; n < m; n++) {
			link += `b=${n}&`;
		}
		data.push(link);
		i = i + 1000;
		j = j + 1000;

		createUrl(link);
		if (i === 40000 && j == 41000) {
			clearInterval(time);
			alert('Finished Scaning');
		}
	}, 10000);
	function createUrl(url) {
		let tempUrl = `https://www.imperiaonline.org/imperia/game_v5/game/json/dynamic_map_objects.php?${url}`;
		let setUrl = tempUrl.slice(0, -1);
		getData(setUrl);
	}

	var mapResponseDecodeKeys = {
		D: 6,
		I: 7,
		Y: 8,
		A: 9,
		N: 10,
	};

	function decodeMapResponse(response) {
		var k = 0;
		var p = 0;
		var decoded = '';
		var responseLength = response.length;
		while (k < responseLength - 1) {
			p = mapResponseDecodeKeys[response.substr(k, 1)];
			decoded += response.substr(k + 1, p);
			k += p + 1;
		}
		return JSON.parse(atob(decoded));
	}

	function getData(url) {
		return new Promise(function (resolve, reject) {
			$.ajax({
				url: url,
				success: function (result) {
					try {
						resolve(JSON.parse(result));
					} catch (e) {
						try {
							var decodedResponse = decodeMapResponse(result);

							showData(decodedResponse);
							resolve(decodedResponse);
						} catch (er) {
							resolve({});
						}
					}
				},
				error: function () {
					resolve({});
				},
			});
		});
	}

	function showData(col) {
		var blocks = col['blocks'];

		for (var blockId = 0; blockId < blocks.length; blockId++) {
			var block = blocks[blockId]['data'];
			for (var i = 0; i < block.length; i++) {
				var x = Math.ceil(block[i].x / 4);
				var y = Math.ceil(block[i].y / 4);
				var colony = block[i].obs[0].ttp;
				var tooltip = block[i].obs[0].ttp[0];
				var tooltip1 = block[i].obs[0].ttp[1];
				var tooltip2 = block[i].obs[0].ttp[2];
				var tooltip3 = block[i].obs[0].ttp[3];
				var tooltip4 = block[i].obs[0].ttp[4];
				var tooltip5 = block[i].obs[0].ttp[5];
				var tooltip6 = block[i].obs[0].ttp[6];

				if (colony.length == 5) {
					showFc(tooltip1.vl, x, y, tooltip.vl, tooltip3.vl);
				} else if (colony.length >= 5 && colony.length <= 8) {
					showC(
						tooltip.vl,
						tooltip1.vl,
						tooltip2.vl,
						tooltip3.vl,
						tooltip4.vl,
						tooltip5.vl,
						tooltip6.vl,
						x,
						y
					);
				}
			}
		}
	}
	function showC(a, b, c, d, e, f, g, h, s) {
		let player = document.createElement('div');

		player.innerHTML = `<span>${e}</span><span>X:${h}  Y:${s}</span><span>${a}</span><span>${g}</span>`;
		player.style.width = '100%';
		player.style.display = 'flex';
		player.style.alignItems = 'center';
		player.style.justifyContent = 'space-evenly';
		player.style.borderBottom = '1px solid black';
		span1 = player.children;
		const spans1 = Array.from(span1);
		spans1.forEach((element) => {
			element.style.width = '100%';
			element.style.display = 'flex';
			element.style.alignItems = 'center';
			element.style.justifyContent = 'center';
			element.style.borderRight = '1px solid black';
			element.style.fontSize = '0.8rem';
		});

		container.appendChild(player);
	}

	function showFc(a, b, c, d, e) {
		let player = document.createElement('div');

		player.innerHTML = `<span>${a}</span><span>X:${b}  Y:${c}</span><span>${d}</span><span>${e}</span>`;
		player.style.width = '100%';
		player.style.display = 'flex';
		player.style.alignItems = 'center';
		player.style.justifyContent = 'space-evenly';
		player.style.borderBottom = '1px solid black';
		span1 = player.children;
		const spans1 = Array.from(span1);
		spans1.forEach((element) => {
			element.style.width = '100%';
			element.style.display = 'flex';
			element.style.alignItems = 'center';
			element.style.justifyContent = 'center';
			element.style.borderRight = '1px solid black';
			element.style.fontSize = '0.8rem';
		});

		container.appendChild(player);
	}
}