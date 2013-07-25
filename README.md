无光标输入框
=================

Javascrip 实现无光标输入

使用方法
=================
依赖于jQuery

	<script type="text/javascript" src="jquery.min.js"></script>
	<script type="text/javascript" src="no-blinking-input.js"></script>
	<script type="text/javascript">
			$(function(){
				noBlinkingInput.newInstance({
					context:$(".input"), //默认为document
					debug:false
				},function(e,val){
					// e: keyup event
					// val: input value
					//console.log("here",e,val)
					if(val == ""){
						$(".output").html("&nbsp;")
						
					} else {
						$(".output").html(val)
						
					}
				})
			})
	</script>

详细看 examples 目录文件

* * *
清除隐藏表单的内容并触发keyup事件

	noBlinkingInput.cleanValue()
其他
=================
未在IE平台测试