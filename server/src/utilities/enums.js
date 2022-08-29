"use strict";
import { buildPartial,buildTest,buildTestList } from './regexpressions';




export class SerpentEnums {
	static comment_tests = comment_enums.map(e=>{return new RegExp(e.test,'g')});
	static comment_ids = comment_enums.map(e=>{return e.id});
	static syntax_tests = syntax_enums.map(e=>{return new RegExp(e.test,'g')});
	static syntax_ids = syntax_enums.map(e=>{return e.id});
	static command_ids = ['cell','dep','det','disp','ene','include','lat','mat','mesh','nest','particle','pbed','pin','plot',
	'set','src','surf','therm','trans'];	
	static all_commands_test = [buildTestList(this.command_ids,'g')]; 
	static test_id(id){		
		return buildTest(id);
	}
	static test_partial(id){
		return buildPartial(id);
	}
	static test_list(list){
		return buildTestList(list);
	}
}


const surf_types = [
	{id:"inf",regex:/[\s](inf)[\s]*/},
	{id:"px",regex:/[\s]+(px)([\s]\d+\.?\d*){1}/},
	{id:"py",regex:/[\s]+(py)([\s]\d+\.?\d*){1}/},
	{id:"pz",regex:/[\s]+(pz)([\s]\d+\.?\d*){1}/},
	{id:"sph",regex:/[\s]+(sph)([\s]\d+\.?\d*){4}/},
	{id:"cylx",regex:/[\s]+(cylx)([\s]\d+\.?\d*){5}/},
	{id:"cyly",regex:/[\s]+(cyly)([\s]\d+\.?\d*){5}/},
	{id:"cylz",regex:/[\s]+(cylz)([\s]\d+\.?\d*){5}/},
	{id:"cyl",regex:/[\s]+(cyl)([\s]\d+\.?\d*){5}/},
	{id:"sqc",regex:/[\s]+(sqc)([\s]\d+\.?\d*){4}/},
	{id:"cube",regex:/[\s]+(cube)([\s]\d+\.?\d*){4}/},
	{id:"cuboid",regex:/[\s]+(cuboid)([\s]\d+\.?\d*){6}/},
	{id:"hexxc",regex:/[\s]+(hexxc)([\s]\d+\.?\d*){4}/},
	{id:"hexyc",regex:/[\s]+(hexyc)([\s]\d+\.?\d*){4}/},
	{id:"hexxprism",regex:/[\s]+(hexxprism)([\s]\d+\.?\d*){5}/},
	{id:"hexyprism",regex:/[\s]+(hexyprism)([\s]\d+\.?\d*){5}/},
	{id:"cross",regex:/[\s]+(cross)([\s]\d+\.?\d*){5}/},
	{id:"pad",regex:/[\s]+(pad)([\s]\d+\.?\d*){6}/},
	{id:"cone",regex:/[\s]+(cone)([\s]\d+\.?\d*){5}/},
	{id:"conx",regex:/[\s]+(conx)([\s]\d+\.?\d*){5}/},
	{id:"cony",regex:/[\s]+(cony)([\s]\d+\.?\d*){5}/},
	{id:"conz",regex:/[\s]+(conz)([\s]\d+\.?\d*){5}/},
	{id:"dode",regex:/[\s]+(dode)([\s]\d+\.?\d*){4}/},
	{id:"octa",regex:/[\s]+(octa)([\s]\d+\.?\d*){4}/},
	{id:"plane",regex:/[\s]+(plane)([\s]\d+\.?\d*){4}/},
	{id:"quadratic",regex:/[\s]+(quadratic)([\s]\d+\.?\d*){10}/}
];
const set_params = ['bc'];


const material_options = ['vol','mass','rgb', 'moder','tmp'];

const comment_enums = [
	{id:"inline",test:'(?:[\\#\\%].*)'},
	{id:"inline-c",test:'(?:(?:\\/\\*)[^*]*(?:\\*\\/))'},
	{id:"block-start",test:'(?:\\/\\*.*)'},
	{id:"block-end",test:'(?:.*\\*\\/)'}];
const syntax_enums = [
	{id:"quoted",test:'(?:\\"[^"]*\\")'},
	{id:"invalid",test:'(?:[^a-zA-Z0-9\\t ]+)'}];



