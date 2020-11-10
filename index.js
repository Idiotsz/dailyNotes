// 柯里化函数
// 如果传入参数大于等于原先函数的形参，返回原函数执行结果
// 如果传入参数小于原函数形参，返回一个函数，等待下次调用，该函数保存之前调用入参，直至传入满足原函数形参要求的参数才立刻执行，并返回原函数执行结果
// 因为参数不满足之前返回的是函数，所以可以连续掉用
// function curry(fn) {
// 	return function curried(...argu) {
// 		if(argu.length>=fn.length) {// fn.length 可以获得fn的形参
// 			return fn(...argu);
// 		}else {
// 			return function(...curriedArgu) {
// 				return curried(...argu.concat(curriedArgu));
// 			}
// 		}
// 	}
// }

// function test(a,b,c) {
// 	return a+b+c;
// }

// var testCurry = curry(test);

// var temp = testCurry(1)(2);
// let result = temp(4);

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