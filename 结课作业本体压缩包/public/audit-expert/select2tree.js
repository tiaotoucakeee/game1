(function($) {
	$.fn.select2tree = function(options) {
		var defaults = {
			language: "zh-CN"
		};
		var opts = $.extend(defaults, options);
		opts.templateResult = function(data, container) {
			if(data.element) {
				var $element = $(data.element);
				var style = "";
				var css = "";
				if($element.attr("style")) style = $element.attr("style");
				if($element.attr("css")) css = $element.attr("css");
				var icon = "";
				if(opts.icon) icon = "<i class=\""+opts.icon+"\"></i>&nbsp;";
				var $wrapper = $("<div>"+icon+"<span class=\""+css+"\"></span><span style=\""+style+"\">" + data.text + "</span></div>");
				
				$(container).attr("val", $element.val())
				if($element.attr("parent")) {
					$(container).attr("parent", $element.attr("parent"));
				}
				return $wrapper;
			} else {
				return data.text;
			}
		};
		
		$(this).select2(opts).on("select2:open", open);
	};

	function moveOption(id) {
		id = encodeHtml(id);
		if(id) {
			$(".select2-results__options li[parent=" + id + "]").insertAfter(".select2-results__options li[val=" + id + "]");
			$(".select2-results__options li[parent=" + id + "]").each(function() {
				moveOption($(this).attr("val"));
			});
		} else {
			$(".select2-results__options li:not([parent])").appendTo(".select2-results__options ul");
			$(".select2-results__options li:not([parent])").each(function() {
				moveOption($(this).attr("val"));
			});
		}
	}

	//deal switch action
	function switchAction(id, open) {
		id = encodeHtml(id);
		$(".select2-results__options li[parent='" + id + "']").each(function() {
			switchAction($(this).attr("val"), open);
		});
		if(open) {
			$(".select2-results__options li[val=" + id + "] span[class^='select2switch']:eq(0)").removeClass("icon-chevron-right").addClass("icon-chevron-down");
			$(".select2-results__options li[parent='" + id + "']").slideDown();
		} else {
			$(".select2-results__options li[val=" + id + "] span[class^='select2switch']:eq(0)").addClass("icon-chevron-right").removeClass("icon-chevron-down");
			$(".select2-results__options li[parent='" + id + "']").slideUp();
		}
	}

	//get the level of li
	function getLevel(id) {
		id = encodeHtml(id);
		var level = 0;
		while($(".select2-results__options li[parent][val='" + id + "']").length > 0) {
			id = $(".select2-results__options li[val='" + id + "']").attr("parent");
			level++;
		}
		return level;
	}

	function encodeHtml(s) {
		if(typeof s != "string") return s;
		s = s.replace(/\(/g,"\\u0028");
		s = s.replace(/\)/g,"\\u0029");
		return s;
	}
	
	function open() {
		setTimeout(function() {
			moveOption();

			$(".select2-results__options li").each(function() {
				var $this = $(this);
				var parentValue = $this.attr("parent");
				//loop li add some classes and properties
				if($this.attr("parent")) {
					parentValue = parentValue.replace(/\(/g,"\\u0028");
					parentValue = parentValue.replace(/\)/g,"\\u0029");
					$(this).siblings("li[val=" + parentValue + "]").addClass("select2switch").find("span:eq(0)").addClass("select2switch icon icon-chevron-down").css({
						"padding": "0 10px",
						"cursor": "default"
					});
					$(this).siblings("li[val=" +parentValue + "]").find("span:eq(1)").css("font-weight", "bold");
				}
				//add gap for children
				if(!$this.attr("style")) {
					var paddingLeft = getLevel($this.attr("val")) * 2;
					$("li[parent='" + parentValue + "']").css("padding-left", paddingLeft + "em");
				}
			});

			//override mousedown for collapse/expand 
			$(".select2switch").mousedown(function() {
				switchAction($(this).attr("val"), $(this).find("span:eq(0)").hasClass("icon-chevron-right"));
				event.stopPropagation();
			});

			//override mouseup to nothing
			$(".select2switch").mouseup(function() {
				return false;
			});
		}, 0);
	}
})(jQuery);
