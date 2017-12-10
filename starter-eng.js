var X_TASK_DOMAIN = 'https://xtask.tech/',
	X_TASK_PATH_TO_SCRIPT = X_TASK_DOMAIN + 'scripts/core-eng.js',
	X_TASK_PATH_TO_STYLE =  X_TASK_DOMAIN + 'scripts/styles.css';
	
var XTaskScriptLoader = new (function() {
	var script;

	this.load = function() {
		if (!script) {
			script = document.createElement('script');
			script.src = X_TASK_PATH_TO_SCRIPT;
			document.head.appendChild(script);
		}
	};

	this.dispose = function() {
		document.head.removeChild(script);
		script = null;
	};
});

var XTaskCssLoader = new (function() {
	var link;

	this.load = function() {
		link = document.createElement('link');
		link.href = X_TASK_PATH_TO_STYLE;
		link.rel = 'stylesheet';
		document.head.appendChild(link);
	};

	this.dispose = function() {
		document.head.removeChild(link);
		link = null;
	};
});

(function() {
	var KEYWORD = 'xtask';
	var STORE_KEY = 'xtask_activated';
	var activated = localStorage.getItem(STORE_KEY);
	var script;
	var keyword = '';
	
	window.addEventListener('load', onLoad, false);

	function onLoad() {
		window.addEventListener('keyup', function(e) {
			if (e.target == document.body) {
				var key = e.key.toLowerCase();
				if (!keyword) {
					if (key == 'x') keyword = 'x';
				} else if ((new RegExp(key)).test(KEYWORD)) {
					var regex = new RegExp('^' + keyword + key);
					if (!regex.test(KEYWORD)) {
						keyword = '';
						return;
					}
					keyword += key;
				}
				if (keyword == KEYWORD) {
					if (activated) {
						localStorage.removeItem(STORE_KEY);
						if (typeof XTask != 'undefined') {
							XTask.dispose();
						}
						XTaskScriptLoader.dispose();
						XTaskCssLoader.dispose();
					} else {
						localStorage.setItem(STORE_KEY, '1');
						load();
					}
					activated = !activated;
					keyword = '';
				}
			}
		}, false);
	}

	function load() {
		XTaskScriptLoader.load('bundle');
		XTaskCssLoader.load('bundle');
	}

	if (activated) {
		load();
	} else {
		console.log('%cЧтобы активировать/деактивировать XTask, наберите на клавиатуре слово "xtask"','color:blue;font-weight:bold;');
	}

})();