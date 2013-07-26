/*! 
 *No Blinking Input JavaScript Library
 *
 *Copyright (c) 2013 Liangdi wu@liangdi.me 
 *
 *Released under the MIT license
 */
(function($) {
	var inputId = "no-blinking-input";
	var noBlinkingInput = window.noBlinkingInput = {
		instances: {},
		/**
		 *  清除隐藏表单内容
		 * @param {type} instanceId
		 * @returns {undefined}
		 */
		cleanValue: function(instanceId) {
			if (this.instances[instanceId]) {
				$("#" + instanceId).val("").trigger("keyup")
			} else {
				for (var p in this.instances) {
					$("#" + p).val("").trigger("keyup")
				}
			}
		},
		/**
		 * 
		 * @param {type} config
		 *	config.context:绑定输入事件的上下文对象,默认为 document
		 *	config.debug:调试模式
		 * @param {type} callback	
		 *	回调方法
		 * @returns {undefined}
		 */
		newInstance: function(config, callback) {
			var trueId = inputId + (Math.random() + "").substring(2);
			var context = config.context || document;

			var inputStr = '<textarea id="' + trueId + '"></textarea>';


			var debug = config.debug || false;
			if (!debug) {
				$(inputStr).css("width", "0px").css("height", "0px")
						.css("opacity", 0)
						.css("position", "absolute")
						.appendTo("body");
			} else {
				$("body").append($(inputStr).css("position", "absolute"));
			}

			$(context).on("mousemove", function(e) {

				var w = $(context).width();
				var h = $(context).height();
				var offset = $(context).offset();
				/**
				 * 如果不是document 需要加上 offset 偏差
				 */
				if (offset) {
					w += offset.left;
					h += offset.top;
				}
				w = (w - 10) < e.clientX ? w - 10 : e.clientX;
				h = (h - 10) < e.clientY ? h - 10 : e.clientY;

				if (debug) {
					console.log(w, h, e.clientX, e.clientY, e)
					console.log($(context).offset())
				}
				/**
				 * textarea 跟随 光标移动 这样 中文输入的时候 可以正常显示输入法位置
				 */
				$("#" + trueId).css("left", w).css("top", h);
				setTimeout(function() {
					$("#" + trueId).focus();
				}, 100);
			}).on("focus", function() {
				setTimeout(function() {
					$("#" + trueId).focus();
				}, 100);
			});
			/**
			 * 这里使用 keyup事件作为回调触发
			 */
			var inputMethod = 'keyup';
			$("#" + trueId).on(inputMethod, function(e) {

				var value = $(this).val();
				if (typeof callback === "function") {
					callback(e, value,trueId);
				}

			});
			this.instances[trueId] = true;
			return trueId;
		}
	};
})(window.jQuery);