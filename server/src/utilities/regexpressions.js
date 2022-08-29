"use strict";
export function buildTestList(list,mods=""){
	const list_str = `(?:[\\s]|^)(${list.join('|')})(?:[\\s]|$)`;
	return buildTest(list_str,mods);	
}
export function buildTest(test, mods=""){
	if(mods===""){
		return new RegExp(`(?:(${test}))`);
	} else {
		return new RegExp(`(?:(${test}))`,mods);
	}	
}
export function buildPartial(item){
	const str_array = [];
	for(i of item){
		str_array.push(`(?:${i}|$)`);
	}
	return buildTestList(str_array);
}
