[toc]
# 有意思的高阶函数
## 柯里化 curry
- 如果传入参数大于等于原先函数的形参，返回原函数执行结果
- 如果传入参数小于原函数形参，返回一个函数，等待下次调用，该函数保存之前调用入参，直至传入满足原函数形参要求的参数才立刻执行，并返回原函数执行结果
- 因为参数不满足之前返回的是函数，所以可以连续掉用
> 逆推函数实现起来很简单，重要的是实现思路，适应的场景。
> lodash _.curry
```js
// 柯里化函数

function curry(fn) {
	return function curried(...argu) {
		if(argu.length>=fn.length) {// fn.length 可以获得fn的形参
			return fn(...argu);
		}else {
			return function(...curriedArgu) {
				return curried(...argu.concat(curriedArgu));
			}
		}
	}
}

function test(a,b,c) {
	return a+b+c;
}

var testCurry = curry(test);

var temp = testCurry(1)(2);
let result = temp(4);
```

## 偏函数 partial
- 固定函数的一部分入参，返回新的函数，新函数接受剩下参数
- 与柯里化类比，类似却不同
- lodash.partial
```js
function partial (fn,...argu) {
	return function (...partialArgu) {
		return fn.apply(this, argu.concat(partialArgu))
	}
}

function test(a,b,c) {
	return a+b+c;
}

let partialTest = partial(test, 1,2)

console.log(partialTest(3))
```

## 惰函数
- 所谓多函数，就是该函数第一次执行时，判断一次条件，再次执行就直接默认走之前条件的分支。
- 场景：首先执行分支不依赖分支，而是依赖固定的条件。第一次执行后该函数更新为某一分支的执行函数。
- 例如：浏览器事件监听
```js
 const addEvent = (element,type, handler) => {
 	if(element.addEventListener) {
 		element.addEventListener(type, handler, false);
 	}else if(element.attachEvent) {
 		element.attachEvent('on' + type, handler);
 	}else {
 		element['on' + type] = handler
 	}
 }
```
- 常用的浏览器注册事件， 但是每次注册都会判断一次条件，很没必要，所以可以利用惰函数
```js
//  1.改变自身
 const addEvent = (element, type, handler) => {
 	if(element.addEventListener) {
 		addEvent = (element, type, handler) => {
 			element.addEventListener(type, handler, false);
 		}
 	}else if(element.attachEvent) {
 		addEvent = (element, type, handler) => {
 			element.attachEvent('on' + type, handler);
 		}
 	}else {
 		addEvent = (element, type, handler) => {
 			element['on' + type] = handler;
 		}
 	}
 }
//  2. 自执行函数
const addEvent = ((element, type, handler) => {
	if (document.addEventListener) {
		return function (element, type, handler) {
		  element.addEventListener(type, handler, false);
		};
	  } else if (document.attachEvent) {
		return function (element, type, handler) {
		  element.attachEvent("on" + type, handler);
		};
	  } else {
		return function (element, type, handler) {
		  element["on" + type] = handler;
		};
	  }
})();
```