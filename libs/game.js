(function (console, $global) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
Math.__name__ = ["Math"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	__class__: haxe_ds_IntMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var src_events_IUpdateEventListener = function() { };
src_events_IUpdateEventListener.__name__ = ["src","events","IUpdateEventListener"];
src_events_IUpdateEventListener.prototype = {
	__class__: src_events_IUpdateEventListener
};
var src_IGameObject = function() { };
src_IGameObject.__name__ = ["src","IGameObject"];
src_IGameObject.prototype = {
	__class__: src_IGameObject
};
var src_Animation = function(velocity) {
	if(velocity == null) velocity = 0.01;
	PIXI.Sprite.call(this);
	this.cacheAsBitmap = false;
	this.play_velocity = velocity;
	this.frames_array = [];
	this.reset();
};
src_Animation.__name__ = ["src","Animation"];
src_Animation.__interfaces__ = [src_events_IUpdateEventListener,src_IGameObject];
src_Animation.__super__ = PIXI.Sprite;
src_Animation.prototype = $extend(PIXI.Sprite.prototype,{
	init: function(game) {
	}
	,reset: function() {
		this.delta_frame = this.current_frame_index = 0;
	}
	,update: function(dt) {
		this.delta_frame += this.play_velocity * dt;
		if(this.delta_frame >= 1.0) {
			this.delta_frame -= 1.0;
			this.current_frame_index += 1;
			if(this.current_frame_index >= this.frames_array.length) this.current_frame_index = 0;
		}
		this.texture = this.frames_array[this.current_frame_index | 0];
	}
	,pushFrame: function(frame) {
		this.frames_array.push(frame);
	}
	,__class__: src_Animation
});
var src_AnimationList = function() {
	this.current_state = null;
	PIXI.Container.call(this);
	this.animation_list = new haxe_ds_StringMap();
	this.current_state = "undefined";
};
src_AnimationList.__name__ = ["src","AnimationList"];
src_AnimationList.__interfaces__ = [src_IGameObject];
src_AnimationList.__super__ = PIXI.Container;
src_AnimationList.prototype = $extend(PIXI.Container.prototype,{
	init: function(game) {
	}
	,push: function(name,animation) {
		this.animation_list.set(name,animation);
	}
	,setState: function(name) {
		var is_valid_name = name != null && name != this.current_state;
		if(is_valid_name) {
			var prev_animation = this.getAnimation(this.current_state);
			var current_animation = this.getAnimation(name);
			this.removeChild(prev_animation);
			this.addChild(current_animation);
			this.current_state = name;
		}
	}
	,getAnimation: function(name) {
		var key;
		if(this.animation_list.exists(name)) key = name; else key = this.current_state;
		return this.animation_list.get(key);
	}
	,update: function(dt) {
		this.getAnimation(this.current_state).update(dt);
	}
	,__class__: src_AnimationList
});
var src_ScrollingBackground = function() {
	this.game = null;
	this.scroll_velocity = 0.01;
	this.scroll_direction = 0;
	PIXI.Container.call(this);
	this.sprite_list = [];
};
src_ScrollingBackground.__name__ = ["src","ScrollingBackground"];
src_ScrollingBackground.__interfaces__ = [src_events_IUpdateEventListener,src_IGameObject];
src_ScrollingBackground.__super__ = PIXI.Container;
src_ScrollingBackground.prototype = $extend(PIXI.Container.prototype,{
	init: function(game) {
		this.game = game;
		var assets = game.locator.getService(src_resources_IResourceManager);
		var _g = 0;
		var _g1 = ["street_background","street_buildings"];
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			var sprite = new PIXI.extras.TilingSprite(assets.getTexture("" + item + ".png"),256,160);
			this.sprite_list.push(sprite);
			this.addChild(sprite);
		}
		var dispatcher = game.locator.getService(src_events_IEventDispatcher);
		dispatcher.addListener("update_event",this);
	}
	,update: function(dt) {
		this.handleUserInput(this.game.locator.getService(src_input_IUserInput));
		var sprite_number = this.sprite_list.length;
		var _g = 0;
		while(_g < sprite_number) {
			var i = _g++;
			this.sprite_list[i].tilePosition.x += this.scroll_direction * (this.scroll_velocity / (sprite_number - i)) * dt;
		}
	}
	,handleUserInput: function(user_input) {
		var move_left = user_input.isDown(user_input.MOVE_LEFT);
		var move_right = user_input.isDown(user_input.MOVE_RIGHT);
		var state_was_changed = move_left || move_right;
		if(move_left) this.scroll_direction = 1;
		if(move_right) this.scroll_direction = -1;
		if(!state_was_changed) this.scroll_direction = 0;
	}
	,__class__: src_ScrollingBackground
});
var src_Label = function(x,y,text,custom_text_style) {
	this.text_field = null;
	PIXI.Sprite.call(this);
	this.x = x;
	this.y = y;
	var text_style = { font : "12px Visitor65", align : "center", tint : 16777215};
	var _g = 0;
	var _g1 = Reflect.fields(custom_text_style);
	while(_g < _g1.length) {
		var key = _g1[_g];
		++_g;
		Reflect.setField(text_style,key,Reflect.field(custom_text_style,key));
	}
	this.text_field = new PIXI.extras.BitmapText(text,text_style);
	this.addChild(this.text_field);
};
src_Label.__name__ = ["src","Label"];
src_Label.__interfaces__ = [src_IGameObject];
src_Label.__super__ = PIXI.Sprite;
src_Label.prototype = $extend(PIXI.Sprite.prototype,{
	init: function(game) {
	}
	,update: function(text) {
		this.text_field.text = text;
	}
	,__class__: src_Label
});
var src_FpsMeter = function() {
	this.milliseconds = 0.0;
	PIXI.Sprite.call(this);
};
src_FpsMeter.__name__ = ["src","FpsMeter"];
src_FpsMeter.__interfaces__ = [src_events_IUpdateEventListener,src_IGameObject];
src_FpsMeter.__super__ = PIXI.Sprite;
src_FpsMeter.prototype = $extend(PIXI.Sprite.prototype,{
	init: function(game) {
		this.label = new src_Label(3,3,"",{ tint : 16711680});
		this.addChild(this.label);
		game.locator.getService(src_ticker_ITickManager).addListener("update_event",this);
	}
	,update: function(dt) {
		this.milliseconds += dt;
		if(this.milliseconds > 500.0) {
			this.label.update("FPS: " + (1000.0 / dt | 0));
			this.milliseconds = 0.0;
		}
	}
	,__class__: src_FpsMeter
});
var src_GameScreenMask = function() {
	PIXI.Graphics.call(this);
	this.beginFill();
	this.drawRect(0,0,256,244);
	this.endFill();
};
src_GameScreenMask.__name__ = ["src","GameScreenMask"];
src_GameScreenMask.__interfaces__ = [src_IGameObject];
src_GameScreenMask.__super__ = PIXI.Graphics;
src_GameScreenMask.prototype = $extend(PIXI.Graphics.prototype,{
	init: function(game) {
	}
	,__class__: src_GameScreenMask
});
var src_events_IDepthSortingEventListener = function() { };
src_events_IDepthSortingEventListener.__name__ = ["src","events","IDepthSortingEventListener"];
src_events_IDepthSortingEventListener.prototype = {
	__class__: src_events_IDepthSortingEventListener
};
var src_PoliceCar = function() {
	this.move_velocity = 0.06;
	PIXI.Sprite.call(this);
	this.animation = new src_Animation();
};
src_PoliceCar.__name__ = ["src","PoliceCar"];
src_PoliceCar.__interfaces__ = [src_events_IDepthSortingEventListener,src_events_IUpdateEventListener,src_IGameObject];
src_PoliceCar.__super__ = PIXI.Sprite;
src_PoliceCar.prototype = $extend(PIXI.Sprite.prototype,{
	init: function(game) {
		this.y = 136;
		this.addChild(this.animation);
		var assets = game.locator.getService(src_resources_IResourceManager);
		this.animation.pushFrame(assets.getTexture("police_car-1.png"));
		this.animation.pushFrame(assets.getTexture("police_car-2.png"));
		var dispatcher = game.locator.getService(src_events_IEventDispatcher);
		dispatcher.addListener("update_event",this);
		dispatcher.addListener("depth_sorting_event",this);
	}
	,update: function(dt) {
		this.animation.update(dt);
		this.x -= this.move_velocity * dt;
		if(this.x < -300) this.x = 255;
	}
	,zAxisSorting: function(a,b) {
		if((js_Boot.__cast(a , src_ISortableObject)).get_depth() > (js_Boot.__cast(b , src_ISortableObject)).get_depth()) return -1; else return 1;
	}
	,depthSorting: function() {
		(js_Boot.__cast(this , PIXI.Container)).children.sort($bind(this,this.zAxisSorting));
	}
	,__class__: src_PoliceCar
});
var src_events_IAABBCollisionEventListener = function() { };
src_events_IAABBCollisionEventListener.__name__ = ["src","events","IAABBCollisionEventListener"];
src_events_IAABBCollisionEventListener.prototype = {
	__class__: src_events_IAABBCollisionEventListener
};
var src_Urban = function() {
	this.game = null;
	this.move_velocity = 0.0;
	this.move_direction = 0;
	this.character_animation = new src_AnimationList();
	this.dispatcher = null;
	PIXI.Graphics.call(this);
	this.addChild(this.character_animation);
	this.x = 100;
	this.y = 96;
};
src_Urban.__name__ = ["src","Urban"];
src_Urban.__interfaces__ = [src_events_IAABBCollisionEventListener,src_events_IUpdateEventListener,src_IGameObject];
src_Urban.__super__ = PIXI.Graphics;
src_Urban.prototype = $extend(PIXI.Graphics.prototype,{
	init: function(game) {
		var _g = this;
		this.game = game;
		var assets = game.locator.getService(src_resources_IResourceManager);
		this.character_animation.push("idle",new src_Animation());
		this.character_animation.push("move_left",new src_Animation());
		this.character_animation.push("move_right",new src_Animation());
		this.character_animation.push("jab",new src_Animation());
		this.character_animation.push("uppercut",new src_Animation());
		this.character_animation.push("cover_up",new src_Animation());
		this.character_animation.push("cover_down",new src_Animation());
		this.character_animation.push("skip_easy_jab",new src_Animation());
		this.character_animation.push("skip_easy_uppercut",new src_Animation());
		this.character_animation.push("skip_strong_jab",new src_Animation());
		this.character_animation.push("skip_strong_uppercut",new src_Animation());
		this.character_animation.push("back_out",new src_Animation());
		this.character_animation.push("knockout",new src_Animation());
		this.character_animation.push("knockdown",new src_Animation());
		this.character_animation.push("arrest",new src_Animation());
		this.character_animation.push("police",new src_Animation());
		this.character_animation.push("win",new src_Animation());
		var initializeAnimation = function(animation_name,texture_name,frames_number,reverse) {
			if(reverse == null) reverse = false;
			if(animation_name == null) animation_name = texture_name; else animation_name = animation_name;
			var animation = _g.character_animation.getAnimation(animation_name);
			if(reverse) {
				var _g2 = 1;
				var _g1 = frames_number + 1;
				while(_g2 < _g1) {
					var i = _g2++;
					animation.pushFrame(assets.getTexture("" + texture_name + "-" + (frames_number + 1 - i) + ".png"));
				}
			} else {
				var _g21 = 1;
				var _g11 = frames_number + 1;
				while(_g21 < _g11) {
					var i1 = _g21++;
					animation.pushFrame(assets.getTexture("" + texture_name + "-" + i1 + ".png"));
				}
			}
		};
		initializeAnimation(null,"idle",1);
		initializeAnimation("move_left","move_right",4,true);
		initializeAnimation(null,"move_right",4);
		initializeAnimation(null,"jab",2);
		initializeAnimation(null,"uppercut",2);
		this.dispatcher = game.locator.getService(src_events_IEventDispatcher);
		this.dispatcher.addListener("update_event",this);
		this.dispatcher.addListener("aabb_collision",this);
	}
	,collision: function(bounding_box) {
		var physics = this.game.locator.getService(src_physics_IPhysicsEngine);
		var self_bounding_box = new src_geom_Rect(this.x,this.y,this.width,this.height);
		if(physics.aabbCollision(bounding_box,self_bounding_box)) this.dispatcher.dispatch("collision_success",new src_events_CollisionSuccessEvent(this));
	}
	,update: function(dt) {
		this.handleUserInput(this.game);
		this.character_animation.update(dt);
		this.x += this.move_direction * this.move_velocity * dt;
	}
	,handleUserInput: function(game) {
		var audio = game.locator.getService(src_sound_ISoundEngine);
		var user_input = game.locator.getService(src_input_IUserInput);
		var move_left = user_input.isDown(user_input.MOVE_LEFT);
		var move_right = user_input.isDown(user_input.MOVE_RIGHT);
		var strong_hit = user_input.isDown(user_input.STRONG_HIT);
		var easy_hit = user_input.isDown(user_input.EASY_HIT);
		var state_was_changed = move_left || move_right || strong_hit || easy_hit;
		if(move_left) {
			this.character_animation.setState("move_left");
			this.move_direction = -1;
		}
		if(move_right) {
			this.character_animation.setState("move_right");
			this.move_direction = 1;
		}
		if(strong_hit) {
			this.character_animation.setState("uppercut");
			this.move_direction = 0;
		}
		if(easy_hit) {
			this.character_animation.setState("jab");
			this.move_direction = 0;
		}
		if(!state_was_changed) {
			this.character_animation.setState("idle");
			this.move_direction = 0;
		}
	}
	,__class__: src_Urban
});
var src_events_ICollisionSuccessEventListener = function() { };
src_events_ICollisionSuccessEventListener.__name__ = ["src","events","ICollisionSuccessEventListener"];
src_events_ICollisionSuccessEventListener.prototype = {
	__class__: src_events_ICollisionSuccessEventListener
};
var src_FlowerPot = function(x_position,y_position) {
	this.falling_velocity = 0.05;
	this.texture_list = [];
	this.pause_after_collision = new src_utils_SimpleTimer();
	this.internal_state = 0;
	this.dispatcher = null;
	PIXI.Sprite.call(this);
	this.x = x_position;
	this.y = 20;
};
src_FlowerPot.__name__ = ["src","FlowerPot"];
src_FlowerPot.__interfaces__ = [src_events_ICollisionSuccessEventListener,src_events_IUpdateEventListener,src_IGameObject];
src_FlowerPot.__super__ = PIXI.Sprite;
src_FlowerPot.prototype = $extend(PIXI.Sprite.prototype,{
	init: function(game) {
		var _g = this;
		this.updateState(0);
		var assets = game.locator.getService(src_resources_IResourceManager);
		this.texture_list.push(assets.getTexture("flower_pot-1.png"));
		this.texture_list.push(assets.getTexture("flower_pot-2.png"));
		this.dispatcher = game.locator.getService(src_events_IEventDispatcher);
		this.dispatcher.addListener("update_event",this);
		this.dispatcher.addListener("collision_success",this);
		var callback = function() {
			var event = new src_events_FlowerPotDestroyEvent();
			_g.dispatcher.dispatch("flower_pot_destroy",event);
		};
		this.pause_after_collision.alarm(1000,callback);
	}
	,destruct: function(game) {
		this.dispatcher.removeListener("update_event",this);
		this.dispatcher.removeListener("collision_success",this);
		this.dispatcher = null;
	}
	,updateState: function(state) {
		this.internal_state = state;
	}
	,updateTexture: function(index) {
		this.texture = this.texture_list[index];
	}
	,update: function(dt) {
		var _g = this.internal_state;
		switch(_g) {
		case 0:
			this.updateTexture(0);
			this.y += this.falling_velocity * dt;
			if(this.y < 128) {
				var bounding_box = new src_geom_Rect(this.x,this.y,this.width,this.height);
				this.dispatcher.dispatch("aabb_collision",new src_events_AABBCollisionEvent(bounding_box));
			} else {
				this.y = 128;
				this.updateState(1);
			}
			break;
		case 1:
			this.updateTexture(1);
			this.pause_after_collision.update(dt);
			break;
		}
	}
	,collisionSuccess: function(entity) {
		this.updateState(1);
	}
	,__class__: src_FlowerPot
});
var src_Citizen = function() {
	this.internal_timer = 0.0;
	this.character_animation = new src_AnimationList();
	this.dispatcher = null;
	PIXI.Container.call(this);
	this.addChild(this.character_animation);
};
src_Citizen.__name__ = ["src","Citizen"];
src_Citizen.__interfaces__ = [src_events_IUpdateEventListener,src_IGameObject];
src_Citizen.__super__ = PIXI.Container;
src_Citizen.prototype = $extend(PIXI.Container.prototype,{
	init: function(game) {
		this.character_animation.push("idle",new src_Animation());
		this.character_animation.push("drop",new src_Animation());
		var assets = game.locator.getService(src_resources_IResourceManager);
		var animation = this.character_animation.getAnimation("idle");
		animation.pushFrame(assets.getTexture("man_idle-01.png"));
		var animation1 = this.character_animation.getAnimation("drop");
		animation1.pushFrame(assets.getTexture("man_drop_flower-01.png"));
		animation1.pushFrame(assets.getTexture("man_drop_flower-02.png"));
		animation1.pushFrame(assets.getTexture("man_drop_flower-01.png"));
		this.dispatcher = game.locator.getService(src_events_IEventDispatcher);
		this.dispatcher.addListener("update_event",this);
	}
	,update: function(dt) {
		this.internal_timer += dt;
		var is_drop_time = this.internal_timer > 10000.0;
		if(is_drop_time) {
			this.internal_timer -= 10000.0;
			this.dispatcher.dispatch("flower_pot_create",new src_events_FlowerPotCreateEvent(this.x,this.y));
		}
	}
	,__class__: src_Citizen
});
var src_events_IFlowerPotDestroyEventListener = function() { };
src_events_IFlowerPotDestroyEventListener.__name__ = ["src","events","IFlowerPotDestroyEventListener"];
src_events_IFlowerPotDestroyEventListener.prototype = {
	__class__: src_events_IFlowerPotDestroyEventListener
};
var src_events_IFlowerPotCreateEventListener = function() { };
src_events_IFlowerPotCreateEventListener.__name__ = ["src","events","IFlowerPotCreateEventListener"];
src_events_IFlowerPotCreateEventListener.prototype = {
	__class__: src_events_IFlowerPotCreateEventListener
};
var src_GameScreen = function(x,y) {
	if(y == null) y = 10;
	if(x == null) x = 128;
	this.flower_pot = null;
	this.dispatcher = null;
	this.game = null;
	PIXI.Container.call(this);
	this.x = x;
	this.y = y;
	this.addChild(new src_ScrollingBackground());
	this.addChild(new src_Urban());
	this.addChild(new src_PoliceCar());
	this.addChild(new src_Citizen());
};
src_GameScreen.__name__ = ["src","GameScreen"];
src_GameScreen.__interfaces__ = [src_events_IFlowerPotDestroyEventListener,src_events_IFlowerPotCreateEventListener,src_IGameObject];
src_GameScreen.__super__ = PIXI.Container;
src_GameScreen.prototype = $extend(PIXI.Container.prototype,{
	init: function(game) {
		this.game = game;
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			(js_Boot.__cast(entity , src_IGameObject)).init(game);
		}
		var mask = new src_GameScreenMask();
		this.mask = mask;
		this.addChild(js_Boot.__cast(mask , PIXI.Graphics));
		this.dispatcher = game.locator.getService(src_events_IEventDispatcher);
		this.dispatcher.addListener("flower_pot_create",this);
		this.dispatcher.addListener("flower_pot_destroy",this);
	}
	,flowerPotCreate: function(x,y) {
		this.flower_pot = new src_FlowerPot(0,0);
		this.flower_pot.init(this.game);
		this.addChild(this.flower_pot);
	}
	,flowerPotDestroy: function() {
		this.removeChild(this.flower_pot);
		this.flower_pot.destruct(this.game);
		this.flower_pot = null;
	}
	,__class__: src_GameScreen
});
var src_UIScreen = function() {
	PIXI.Container.call(this);
};
src_UIScreen.__name__ = ["src","UIScreen"];
src_UIScreen.__interfaces__ = [src_IGameObject];
src_UIScreen.__super__ = PIXI.Container;
src_UIScreen.prototype = $extend(PIXI.Container.prototype,{
	init: function(game) {
		var user_input = game.locator.getService(src_input_IUserInput);
		this.addChild(new src_input_TouchButton(user_input.EASY_HIT,390,20,110,60));
		this.addChild(new src_input_TouchButton(user_input.STRONG_HIT,390,100,110,60));
		var virtual_joystick = new src_input_VirtualJoystick(5,40,120,130);
		this.addChild(virtual_joystick);
		var label = new src_Label(17,14,"TOUCH INSIDE\nTHE BOX TO ACCESS\nTHE JOYSTICK");
		this.addChild(label);
		this.addChild(new src_FpsMeter());
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			(js_Boot.__cast(entity , src_IGameObject)).init(game);
		}
	}
	,__class__: src_UIScreen
});
var src_IScene = function() { };
src_IScene.__name__ = ["src","IScene"];
src_IScene.prototype = {
	__class__: src_IScene
};
var src_GameScene = function() {
	this.game = null;
	PIXI.Container.call(this);
};
src_GameScene.__name__ = ["src","GameScene"];
src_GameScene.__interfaces__ = [src_IScene];
src_GameScene.__super__ = PIXI.Container;
src_GameScene.prototype = $extend(PIXI.Container.prototype,{
	init: function(game) {
		this.game = game;
		this.dispatcher = game.locator.getService(src_events_IEventDispatcher);
		this.addChild(new src_GameScreen());
		this.addChild(new src_UIScreen());
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			(js_Boot.__cast(entity , src_IGameObject)).init(game);
		}
	}
	,destruct: function(game) {
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			(js_Boot.__cast(entity , src_IScene)).destruct(game);
			this.removeChild(entity);
		}
		this.dispatcher = null;
	}
	,update: function(dt) {
		var update_event = new src_events_UpdateEvent(dt);
		this.dispatcher.dispatch("update_event",update_event);
		this.dispatcher.dispatch("depth_sorting_event",new src_events_DepthSortingEvent());
	}
	,__class__: src_GameScene
});
var src_SceneManager = function() {
	this.scene_list = new haxe_ds_StringMap();
	this.current_scene = "undefined";
};
src_SceneManager.__name__ = ["src","SceneManager"];
src_SceneManager.prototype = {
	update: function(dt) {
		this.getScene().update(dt);
	}
	,getScene: function(name) {
		return this.scene_list.get(name != null?name:this.current_scene);
	}
	,setScene: function(name) {
		var is_valid_name = name != null && name != this.current_scene;
		if(is_valid_name) this.current_scene = name;
	}
	,pushScene: function(name,scene) {
		this.scene_list.set(name,scene);
	}
	,destroyScene: function(game,scene_name) {
		this.getScene(scene_name).destruct(game);
	}
	,scaleScene: function(ratio) {
		(js_Boot.__cast(this.getScene() , PIXI.Container)).scale.set(ratio);
	}
	,__class__: src_SceneManager
};
var src_events_ITickEventListener = function() { };
src_events_ITickEventListener.__name__ = ["src","events","ITickEventListener"];
src_events_ITickEventListener.prototype = {
	__class__: src_events_ITickEventListener
};
var src_IGame = function() { };
src_IGame.__name__ = ["src","IGame"];
src_IGame.prototype = {
	__class__: src_IGame
};
var src_Game = function(width,height) {
	if(height == null) height = 180.0;
	if(width == null) width = 512.0;
	this.window_width = width;
	this.window_height = height;
	this.scene_manager = new src_SceneManager();
	this.locator = new src_services_ServiceLocator();
};
src_Game.__name__ = ["src","Game"];
src_Game.__interfaces__ = [src_events_IUpdateEventListener,src_events_ITickEventListener,src_IGame];
src_Game.main = function() {
	var custom_loader = null;
	var preloader = new src_resources_ResourceLoader();
	preloader.reset();
	preloader.set_baseUrl("config");
	preloader.add("resource_json","resources.json");
	preloader.load(function(_resources) {
		var resources = Reflect.field(_resources,"resource_json").data;
		if(custom_loader != null) preloader = custom_loader;
		preloader.reset();
		preloader.set_baseUrl(resources.baseUrl);
		var _g = 0;
		var _g1 = resources.resource_list;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			preloader.add(item.name,item.url);
		}
		preloader.load(function(game_resources) {
			var game = new src_Game();
			game.init(game_resources);
			game.resize();
			game.resume();
		});
	});
};
src_Game.prototype = {
	init: function(_resources) {
		this.locator.provide(src_ticker_ITickManager,new src_ticker_TickManager());
		this.locator.provide(src_events_IEventDispatcher,new src_events_EventDispatcher());
		this.locator.provide(src_sound_ISoundEngine,new src_sound_SoundEngine());
		this.locator.provide(src_graphics_IGraphicsEngine,new src_graphics_GraphicsEngine(this.window_width,this.window_height));
		this.locator.provide(src_physics_IPhysicsEngine,new src_physics_PhysicsEngine());
		this.locator.provide(src_input_IUserInput,new src_input_UserInput());
		this.locator.provide(src_resources_IResourceManager,new src_resources_ResourceManager(_resources));
		this.scene_manager.pushScene("Intro",new src_GameScene());
		this.scene_manager.pushScene("MainMenu",new src_GameScene());
		this.scene_manager.pushScene("Intro",new src_GameScene());
		this.scene_manager.pushScene("Intro",new src_GameScene());
		this.scene_manager.setScene("Intro");
		this.scene_manager.getScene().init(this);
		window.addEventListener("resize",$bind(this,this.resize),false);
		window.addEventListener("onbeforeunload",$bind(this,this.destroy),false);
		window.addEventListener("blur",$bind(this,this.resize),false);
	}
	,destroy: function() {
		this.scene_manager.destroyScene(this);
		this.locator.destroyAll();
		window.removeEventListener("resize",$bind(this,this.resize),false);
		window.removeEventListener("deviceOrientation",$bind(this,this.resize),false);
		window.removeEventListener("onbeforeunload",$bind(this,this.destroy),false);
	}
	,resize: function() {
		var actual_width = Math.min(window.innerWidth,window.outerWidth);
		var actual_height = Math.min(window.innerHeight,window.outerHeight);
		var ratio_scale = Math.min(actual_width / this.window_width,actual_height / this.window_height);
		ratio_scale = Math.floor(ratio_scale * 0.8);
		if(ratio_scale == 0.0) ratio_scale = 1.0;
		this.scene_manager.scaleScene(ratio_scale);
		this.locator.getService(src_graphics_IGraphicsEngine).resize(this.window_width * ratio_scale,this.window_height * ratio_scale);
		window.scrollTo(0,0);
	}
	,resume: function() {
		var tick_manager = this.locator.getService(src_ticker_ITickManager);
		tick_manager.addListener("tick_event",this);
		tick_manager.addListener("update_event",this);
	}
	,tick: function(tick) {
		this.scene_manager.update(tick);
	}
	,update: function(dt) {
		this.locator.getService(src_graphics_IGraphicsEngine).render(this.scene_manager.getScene());
	}
	,__class__: src_Game
};
var src_ISortableObject = function() { };
src_ISortableObject.__name__ = ["src","ISortableObject"];
src_ISortableObject.prototype = {
	__class__: src_ISortableObject
};
var src_events_IEvent = function() { };
src_events_IEvent.__name__ = ["src","events","IEvent"];
src_events_IEvent.prototype = {
	__class__: src_events_IEvent
};
var src_events_AABBCollisionEvent = function(bounding_box) {
	this.bounding_box = bounding_box;
};
src_events_AABBCollisionEvent.__name__ = ["src","events","AABBCollisionEvent"];
src_events_AABBCollisionEvent.__interfaces__ = [src_events_IEvent];
src_events_AABBCollisionEvent.prototype = {
	notify: function(listener) {
		listener.collision(this.bounding_box);
	}
	,__class__: src_events_AABBCollisionEvent
};
var src_events_CollisionSuccessEvent = function(entity) {
	this.entity = entity;
};
src_events_CollisionSuccessEvent.__name__ = ["src","events","CollisionSuccessEvent"];
src_events_CollisionSuccessEvent.__interfaces__ = [src_events_IEvent];
src_events_CollisionSuccessEvent.prototype = {
	notify: function(listener) {
		listener.collisionSuccess(this.entity);
	}
	,__class__: src_events_CollisionSuccessEvent
};
var src_events_DepthSortingEvent = function() {
};
src_events_DepthSortingEvent.__name__ = ["src","events","DepthSortingEvent"];
src_events_DepthSortingEvent.__interfaces__ = [src_events_IEvent];
src_events_DepthSortingEvent.prototype = {
	notify: function(listener) {
		listener.depthSorting();
	}
	,__class__: src_events_DepthSortingEvent
};
var src_services_IService = function() { };
src_services_IService.__name__ = ["src","services","IService"];
src_services_IService.prototype = {
	__class__: src_services_IService
};
var src_events_IEventDispatcher = function() { };
src_events_IEventDispatcher.__name__ = ["src","events","IEventDispatcher"];
src_events_IEventDispatcher.__interfaces__ = [src_services_IService];
src_events_IEventDispatcher.prototype = {
	__class__: src_events_IEventDispatcher
};
var src_events_EventDispatcher = function() {
	this.listeners = new haxe_ds_StringMap();
};
src_events_EventDispatcher.__name__ = ["src","events","EventDispatcher"];
src_events_EventDispatcher.__interfaces__ = [src_events_IEventDispatcher];
src_events_EventDispatcher.prototype = {
	init: function() {
	}
	,addListener: function(name,listener) {
		if(!this.listeners.exists(name)) {
			var value = [];
			this.listeners.set(name,value);
		}
		this.listeners.get(name).push(listener);
	}
	,removeListener: function(name,listener) {
		if(this.listeners.exists(name)) {
			var _this = this.listeners.get(name);
			HxOverrides.remove(_this,listener);
		}
	}
	,dispatch: function(name,event) {
		if(this.listeners.exists(name)) {
			var _g = 0;
			var _g1 = this.listeners.get(name);
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				event.notify(listener);
			}
		}
	}
	,__class__: src_events_EventDispatcher
};
var src_events_FlowerPotCreateEvent = function(x,y) {
	this.x = x;
	this.y = y;
};
src_events_FlowerPotCreateEvent.__name__ = ["src","events","FlowerPotCreateEvent"];
src_events_FlowerPotCreateEvent.__interfaces__ = [src_events_IEvent];
src_events_FlowerPotCreateEvent.prototype = {
	notify: function(listener) {
		listener.flowerPotCreate(this.x,this.y);
	}
	,__class__: src_events_FlowerPotCreateEvent
};
var src_events_FlowerPotDestroyEvent = function() {
};
src_events_FlowerPotDestroyEvent.__name__ = ["src","events","FlowerPotDestroyEvent"];
src_events_FlowerPotDestroyEvent.__interfaces__ = [src_events_IEvent];
src_events_FlowerPotDestroyEvent.prototype = {
	notify: function(listener) {
		listener.flowerPotDestroy();
	}
	,__class__: src_events_FlowerPotDestroyEvent
};
var src_events_IJoystickEventListener = function() { };
src_events_IJoystickEventListener.__name__ = ["src","events","IJoystickEventListener"];
src_events_IJoystickEventListener.prototype = {
	__class__: src_events_IJoystickEventListener
};
var src_events_JoystickEvent = function(x,y) {
	this.x = x;
	this.y = y;
};
src_events_JoystickEvent.__name__ = ["src","events","JoystickEvent"];
src_events_JoystickEvent.__interfaces__ = [src_events_IEvent];
src_events_JoystickEvent.prototype = {
	notify: function(listener) {
		listener.joystickMove(this.x,this.y);
	}
	,__class__: src_events_JoystickEvent
};
var src_events_TickEvent = function(dt) {
	this.dt = dt;
};
src_events_TickEvent.__name__ = ["src","events","TickEvent"];
src_events_TickEvent.__interfaces__ = [src_events_IEvent];
src_events_TickEvent.prototype = {
	notify: function(listener) {
		listener.tick(this.dt);
	}
	,__class__: src_events_TickEvent
};
var src_events_UpdateEvent = function(dt) {
	this.dt = dt;
};
src_events_UpdateEvent.__name__ = ["src","events","UpdateEvent"];
src_events_UpdateEvent.__interfaces__ = [src_events_IEvent];
src_events_UpdateEvent.prototype = {
	notify: function(listener) {
		listener.update(this.dt);
	}
	,__class__: src_events_UpdateEvent
};
var src_geom_Rect = function(x,y,w,h) {
	if(h == null) h = 0.0;
	if(w == null) w = 0.0;
	if(y == null) y = 0.0;
	if(x == null) x = 0.0;
	this.h = 0.0;
	this.w = 0.0;
	this.y = 0.0;
	this.x = 0.0;
	this.x = x;
	this.y = x;
	this.w = x;
	this.h = x;
};
src_geom_Rect.__name__ = ["src","geom","Rect"];
src_geom_Rect.prototype = {
	__class__: src_geom_Rect
};
var src_graphics_IGraphicsEngine = function() { };
src_graphics_IGraphicsEngine.__name__ = ["src","graphics","IGraphicsEngine"];
src_graphics_IGraphicsEngine.__interfaces__ = [src_services_IService];
src_graphics_IGraphicsEngine.prototype = {
	__class__: src_graphics_IGraphicsEngine
};
var src_graphics_GraphicsEngine = function(width,height) {
	this.internal_renderer = null;
	this.device_pixel_ratio = 1.0;
	this.scr_height = 0.0;
	this.scr_width = 0.0;
	this.scr_width = width;
	this.scr_height = height;
};
src_graphics_GraphicsEngine.__name__ = ["src","graphics","GraphicsEngine"];
src_graphics_GraphicsEngine.__interfaces__ = [src_graphics_IGraphicsEngine];
src_graphics_GraphicsEngine.prototype = {
	init: function() {
		var force_canvas = false;
		var is_not_valid_gpu = src_utils_Tools.detectGpu("Mali-4");
		if(is_not_valid_gpu) force_canvas = true;
		this.device_pixel_ratio = window.devicePixelRatio;
		var options = { };
		options.antialias = false;
		options.transparent = false;
		options.resolution = this.device_pixel_ratio;
		this.internal_renderer = PIXI.autoDetectRenderer(this.scr_width,this.scr_height,options,force_canvas);
		this.internal_renderer.view.id = "canvas";
		window.document.body.appendChild(this.internal_renderer.view);
	}
	,resize: function(width,height) {
		this.internal_renderer.resize(width,height);
		this.internal_renderer.view.style.width = width + "px";
		this.internal_renderer.view.style.height = height + "px";
	}
	,render: function(scene) {
		this.internal_renderer.render(js_Boot.__cast(scene , PIXI.DisplayObject));
	}
	,__class__: src_graphics_GraphicsEngine
};
var src_input_IUserInput = function() { };
src_input_IUserInput.__name__ = ["src","input","IUserInput"];
src_input_IUserInput.__interfaces__ = [src_services_IService];
src_input_IUserInput.prototype = {
	__class__: src_input_IUserInput
};
var src_input_TouchButton = function(key_code,x,y,w,h) {
	if(h == null) h = 0.0;
	if(w == null) w = 0.0;
	if(y == null) y = 0.0;
	if(x == null) x = 0.0;
	this.button_height = 0;
	this.button_width = 0;
	this.is_enabled = false;
	this.touch_identifier = null;
	this.key_code = 0;
	this.user_input = null;
	PIXI.Graphics.call(this);
	this.x = x;
	this.y = y;
	this.button_width = w;
	this.button_height = h;
	this.key_code = key_code;
	this.hitArea = new PIXI.Rectangle(0,0,this.button_width,this.button_height);
	this.redrawButton(16777215);
};
src_input_TouchButton.__name__ = ["src","input","TouchButton"];
src_input_TouchButton.__interfaces__ = [src_IGameObject];
src_input_TouchButton.__super__ = PIXI.Graphics;
src_input_TouchButton.prototype = $extend(PIXI.Graphics.prototype,{
	init: function(game) {
		this.interactive = true;
		this.buttonMode = true;
		this.user_input = game.locator.getService(src_input_IUserInput);
		this.on("touchstart",$bind(this,this.touchStartEventHandler));
		this.on("touchend",$bind(this,this.touchEndEventHandler));
		this.on("touchendoutside",$bind(this,this.touchEndEventHandler));
		this.on("mousedown",$bind(this,this.touchStartEventHandler));
		this.on("mouseup",$bind(this,this.touchEndEventHandler));
		this.on("mouseupoutside",$bind(this,this.touchEndEventHandler));
	}
	,isValidTouch: function(e) {
		return this.is_enabled && this.touch_identifier == src_utils_Tools.getTouchIdentifier(e);
	}
	,touchStartEventHandler: function(e) {
		if(!this.is_enabled) {
			this.is_enabled = true;
			this.touch_identifier = src_utils_Tools.getTouchIdentifier(e);
			this.redrawButton(16776960);
			var event_params = { bubbles : true, keyCode : this.key_code, code : "ArrowRight"};
			var keyboard_event = new KeyboardEvent("keydown",event_params);
			this.user_input.onKeyDown(keyboard_event,this.key_code);
		}
	}
	,touchEndEventHandler: function(e) {
		if(this.isValidTouch(e)) {
			this.is_enabled = false;
			this.touch_identifier = null;
			this.redrawButton(16777215);
			var event_params = { bubbles : true, keyCode : this.key_code, code : "ArrowRight"};
			var keyboard_event = new KeyboardEvent("keyup",event_params);
			this.user_input.onKeyUp(keyboard_event,this.key_code);
		}
	}
	,redrawButton: function(color) {
		this.clear();
		this.beginFill(color);
		this.lineStyle(1,0);
		this.drawRect(0,0,this.button_width,this.button_height);
		this.endFill();
	}
	,__class__: src_input_TouchButton
});
var src_input_UserInput = function() {
	this.STRONG_HIT = 90;
	this.EASY_HIT = 88;
	this.MOVE_DOWN = 40;
	this.MOVE_RIGHT = 39;
	this.MOVE_UP = 38;
	this.MOVE_LEFT = 37;
	this.key_map = new haxe_ds_IntMap();
};
src_input_UserInput.__name__ = ["src","input","UserInput"];
src_input_UserInput.__interfaces__ = [src_input_IUserInput];
src_input_UserInput.prototype = {
	init: function() {
		window.addEventListener("keyup",$bind(this,this.onKeyUp));
		window.addEventListener("keydown",$bind(this,this.onKeyDown));
	}
	,onKeyDown: function(e,keyCode) {
		if(keyCode == null) keyCode = -1;
		this.key_map.h[keyCode > 0?keyCode:e.keyCode] = true;
	}
	,onKeyUp: function(e,keyCode) {
		if(keyCode == null) keyCode = -1;
		this.key_map.h[keyCode > 0?keyCode:e.keyCode] = false;
	}
	,isDown: function(key_code) {
		if(this.key_map.h.hasOwnProperty(key_code)) return this.key_map.h[key_code]; else return false;
	}
	,__class__: src_input_UserInput
};
var src_input_VirtualJoystick = function(x,y,w,h) {
	if(h == null) h = 180;
	if(w == null) w = 512;
	if(y == null) y = 0.0;
	if(x == null) x = 0.0;
	this.touch_identifier = null;
	this.dispatcher = null;
	this.user_input = null;
	this.stick = null;
	this.border = null;
	this.start_position_y = 0.0;
	this.start_position_x = 0.0;
	this.is_enabled = false;
	PIXI.Graphics.call(this);
	this.x = x;
	this.y = y;
	this.hitArea = new PIXI.Rectangle(0,0,w,h);
	this.beginFill(0);
	this.lineStyle(1,-1);
	this.drawRect(0,0,w,h);
	this.endFill();
	this.border = new PIXI.Graphics();
	this.stick = new PIXI.Graphics();
	this.addChild(this.border);
	this.addChild(this.stick);
};
src_input_VirtualJoystick.__name__ = ["src","input","VirtualJoystick"];
src_input_VirtualJoystick.__interfaces__ = [src_IGameObject];
src_input_VirtualJoystick.__super__ = PIXI.Graphics;
src_input_VirtualJoystick.prototype = $extend(PIXI.Graphics.prototype,{
	init: function(game) {
		this.interactive = true;
		this.buttonMode = true;
		this.on("touchstart",$bind(this,this.touchStartEventHandler));
		this.on("touchend",$bind(this,this.touchEndEventHandler));
		this.on("touchmove",$bind(this,this.touchMoveEventHandler));
		this.on("touchendoutside",$bind(this,this.touchEndEventHandler));
		this.on("mousedown",$bind(this,this.touchStartEventHandler));
		this.on("mouseup",$bind(this,this.touchEndEventHandler));
		this.on("mousemove",$bind(this,this.touchMoveEventHandler));
		this.on("mouseupoutside",$bind(this,this.touchEndEventHandler));
		this.user_input = game.locator.getService(src_input_IUserInput);
		this.dispatcher = game.locator.getService(src_events_IEventDispatcher);
	}
	,isValidTouch: function(e) {
		return this.is_enabled && this.touch_identifier == src_utils_Tools.getTouchIdentifier(e);
	}
	,touchStartEventHandler: function(e) {
		if(!this.is_enabled) {
			this.is_enabled = true;
			this.touch_identifier = src_utils_Tools.getTouchIdentifier(e);
			var position = e.data.getLocalPosition(this);
			this.start_position_x = position.x;
			this.start_position_y = position.y;
			this.drawPrimitive(this.border,position.x,position.y,30,-65536);
			this.drawPrimitive(this.stick,position.x,position.y,25,-16711936);
		}
	}
	,touchEndEventHandler: function(e) {
		if(this.isValidTouch(e)) {
			this.is_enabled = false;
			this.touch_identifier = null;
			this.stick.x = this.stick.y = 0;
			this.start_position_x = 0.0;
			this.start_position_y = 0.0;
			this.border.clear();
			this.stick.clear();
			var keyboard_event = new KeyboardEvent("keydown",null);
			this.user_input.onKeyUp(keyboard_event,this.user_input.MOVE_RIGHT);
			this.user_input.onKeyUp(keyboard_event,this.user_input.MOVE_LEFT);
			this.user_input.onKeyUp(keyboard_event,this.user_input.MOVE_UP);
			this.user_input.onKeyUp(keyboard_event,this.user_input.MOVE_DOWN);
		}
	}
	,touchMoveEventHandler: function(e) {
		if(this.isValidTouch(e)) {
			var local_position = e.data.getLocalPosition(this);
			var delta_x = local_position.x - this.start_position_x;
			var delta_y = local_position.y - this.start_position_y;
			var stick_distance = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
			if(stick_distance > 30) {
				var normalized_x = delta_x / stick_distance;
				var normalized_y = delta_y / stick_distance;
				delta_x = normalized_x * 30;
				delta_y = normalized_y * 30;
			}
			this.stick.x = delta_x;
			this.stick.y = delta_y;
			var keyboard_event = new KeyboardEvent("keydown",null);
			if(src_math_SimpleMath.isNegative(delta_x)) {
				this.user_input.onKeyUp(keyboard_event,this.user_input.MOVE_RIGHT);
				this.user_input.onKeyDown(keyboard_event,this.user_input.MOVE_LEFT);
			}
			if(src_math_SimpleMath.isPositive(delta_x)) {
				this.user_input.onKeyUp(keyboard_event,this.user_input.MOVE_LEFT);
				this.user_input.onKeyDown(keyboard_event,this.user_input.MOVE_RIGHT);
			}
			if(src_math_SimpleMath.isNegative(delta_y)) {
				this.user_input.onKeyUp(keyboard_event,this.user_input.MOVE_DOWN);
				this.user_input.onKeyDown(keyboard_event,this.user_input.MOVE_UP);
			}
			if(src_math_SimpleMath.isPositive(delta_y)) {
				this.user_input.onKeyUp(keyboard_event,this.user_input.MOVE_UP);
				this.user_input.onKeyDown(keyboard_event,this.user_input.MOVE_DOWN);
			}
			var event = new src_events_JoystickEvent(delta_x / 30,delta_y / 30);
			this.dispatcher.dispatch("joystick_start",event);
		}
	}
	,drawPrimitive: function(drawable_object,x,y,radius,color) {
		drawable_object.beginFill(color);
		drawable_object.lineStyle(1,-1);
		drawable_object.drawCircle(x,y,radius);
		drawable_object.endFill();
	}
	,__class__: src_input_VirtualJoystick
});
var src_math_SimpleMath = function() { };
src_math_SimpleMath.__name__ = ["src","math","SimpleMath"];
src_math_SimpleMath.isPositive = function(value) {
	if(value > 0.0) return true; else return false;
};
src_math_SimpleMath.isNegative = function(value) {
	if(value < 0.0) return true; else return false;
};
src_math_SimpleMath.mean = function(m) {
	var sum = 0.0;
	var _g1 = 0;
	var _g = m.length;
	while(_g1 < _g) {
		var i = _g1++;
		sum += m[i];
	}
	return sum / m.length;
};
var src_physics_IPhysicsEngine = function() { };
src_physics_IPhysicsEngine.__name__ = ["src","physics","IPhysicsEngine"];
src_physics_IPhysicsEngine.__interfaces__ = [src_services_IService];
src_physics_IPhysicsEngine.prototype = {
	__class__: src_physics_IPhysicsEngine
};
var src_physics_PhysicsEngine = function() {
};
src_physics_PhysicsEngine.__name__ = ["src","physics","PhysicsEngine"];
src_physics_PhysicsEngine.__interfaces__ = [src_physics_IPhysicsEngine];
src_physics_PhysicsEngine.prototype = {
	init: function() {
	}
	,aabbCollision: function(bounding_box1,bounding_box2) {
		var x1 = bounding_box1.x;
		var y1 = bounding_box1.y;
		var w1 = bounding_box1.w;
		var h1 = bounding_box1.h;
		var x2 = bounding_box2.x;
		var y2 = bounding_box2.y;
		var w2 = bounding_box2.w;
		var h2 = bounding_box2.h;
		if(x1 > x2 + w2 || x1 + w1 < x2) return false;
		if(y1 > y2 + h2 || y1 + h1 < y2) return false;
		return true;
	}
	,__class__: src_physics_PhysicsEngine
};
var src_resources_ILoader = function() { };
src_resources_ILoader.__name__ = ["src","resources","ILoader"];
src_resources_ILoader.prototype = {
	__class__: src_resources_ILoader
};
var src_resources_IResourceManager = function() { };
src_resources_IResourceManager.__name__ = ["src","resources","IResourceManager"];
src_resources_IResourceManager.__interfaces__ = [src_services_IService];
src_resources_IResourceManager.prototype = {
	__class__: src_resources_IResourceManager
};
var src_resources_ResourceLoader = function() {
	this.internal_loader = new PIXI.loaders.Loader();
};
src_resources_ResourceLoader.__name__ = ["src","resources","ResourceLoader"];
src_resources_ResourceLoader.__interfaces__ = [src_resources_ILoader];
src_resources_ResourceLoader.prototype = {
	set_baseUrl: function(url) {
		this.internal_loader.baseUrl = url;
		return url;
	}
	,reset: function() {
		this.internal_loader.reset();
	}
	,add: function(name,path) {
		this.internal_loader.add(name,path);
	}
	,load: function(f) {
		var callback = function(internal_loader,resources) {
			f(resources);
		};
		this.internal_loader.load(callback);
	}
	,__class__: src_resources_ResourceLoader
};
var src_resources_ResourceManager = function(resources) {
	this.resource_list = resources;
};
src_resources_ResourceManager.__name__ = ["src","resources","ResourceManager"];
src_resources_ResourceManager.__interfaces__ = [src_resources_IResourceManager];
src_resources_ResourceManager.prototype = {
	init: function() {
	}
	,getTexture: function(name) {
		var texture = null;
		if(Object.prototype.hasOwnProperty.call(this.resource_list,name)) texture = Reflect.field(this.resource_list,name).texture; else {
			var _g = 0;
			var _g1 = Reflect.fields(this.resource_list);
			while(_g < _g1.length) {
				var resource_item = _g1[_g];
				++_g;
				var spritesheet = Reflect.field(this.resource_list,resource_item);
				if(Object.prototype.hasOwnProperty.call(spritesheet,"textures")) {
					var textures = Reflect.field(spritesheet,"textures");
					if(Object.prototype.hasOwnProperty.call(textures,name)) {
						texture = Reflect.field(textures,name);
						break;
					}
				}
			}
		}
		if(texture == null) return PIXI.Texture.EMPTY; else return texture;
	}
	,__class__: src_resources_ResourceManager
};
var src_services_ServiceLocator = function() {
	this.service_list = new haxe_ds_StringMap();
};
src_services_ServiceLocator.__name__ = ["src","services","ServiceLocator"];
src_services_ServiceLocator.prototype = {
	provide: function(name,service) {
		service.init();
		var key = Type.getClassName(name);
		this.service_list.set(key,service);
	}
	,getService: function(service) {
		var key = Type.getClassName(service);
		return this.service_list.get(key);
	}
	,destroyAll: function() {
		var $it0 = this.service_list.iterator();
		while( $it0.hasNext() ) {
			var service = $it0.next();
			service.destroy();
		}
	}
	,__class__: src_services_ServiceLocator
};
var src_sound_ISoundEngine = function() { };
src_sound_ISoundEngine.__name__ = ["src","sound","ISoundEngine"];
src_sound_ISoundEngine.__interfaces__ = [src_services_IService];
var src_sound_SoundEngine = function() {
};
src_sound_SoundEngine.__name__ = ["src","sound","SoundEngine"];
src_sound_SoundEngine.__interfaces__ = [src_sound_ISoundEngine];
src_sound_SoundEngine.prototype = {
	init: function() {
	}
	,__class__: src_sound_SoundEngine
};
var src_ticker_ITickManager = function() { };
src_ticker_ITickManager.__name__ = ["src","ticker","ITickManager"];
src_ticker_ITickManager.__interfaces__ = [src_events_IEventDispatcher];
var src_ticker_TickManager = function() {
	this.raf_buffer = [];
	this.raf_index = 0;
	this.delta_time = 0.0;
	this.prev_frame_time = 0.0;
	this.lag = 0.0;
	this.ms_per_update = 0.0;
	src_events_EventDispatcher.call(this);
	var _g = 0;
	while(_g < 10) {
		var i = _g++;
		this.raf_buffer.push(0.0);
	}
	this.ms_per_update = 16.666666666666668;
	this.loop(50.);
};
src_ticker_TickManager.__name__ = ["src","ticker","TickManager"];
src_ticker_TickManager.__interfaces__ = [src_ticker_ITickManager];
src_ticker_TickManager.__super__ = src_events_EventDispatcher;
src_ticker_TickManager.prototype = $extend(src_events_EventDispatcher.prototype,{
	loop: function(timestamp) {
		window.requestAnimationFrame($bind(this,this.loop));
		this.delta_time = timestamp - this.prev_frame_time;
		this.prev_frame_time = timestamp;
		if(this.delta_time > 100.0) this.delta_time = 100.0;
		this.raf_buffer[this.raf_index] = this.delta_time;
		var mean = src_math_SimpleMath.mean(this.raf_buffer);
		this.lag += mean;
		var tick_event = new src_events_TickEvent(this.ms_per_update);
		while(this.lag >= this.ms_per_update) {
			this.lag -= this.ms_per_update;
			this.dispatch("tick_event",tick_event);
		}
		var update_event = new src_events_UpdateEvent(mean);
		this.dispatch("update_event",update_event);
		this.raf_index = (this.raf_index + 1) % this.raf_buffer.length;
	}
	,__class__: src_ticker_TickManager
});
var src_utils_SimpleTimer = function() {
	this.callback = null;
	this.internal_timer = 0.0;
	this.limit = 0.0;
};
src_utils_SimpleTimer.__name__ = ["src","utils","SimpleTimer"];
src_utils_SimpleTimer.prototype = {
	alarm: function(limit,callback) {
		this.limit = limit;
		this.callback = callback;
	}
	,update: function(dt) {
		this.internal_timer += dt;
		if(this.internal_timer > this.limit) this.callback();
	}
	,__class__: src_utils_SimpleTimer
};
var src_utils_Tools = function() { };
src_utils_Tools.__name__ = ["src","utils","Tools"];
src_utils_Tools.getTouchIdentifier = function(e) {
	var touch_identifier = Reflect.field(e.data,"identifier");
	if(e.type == "touch") {
		var changed_touches = Reflect.field(e.data.originalEvent,"changedTouches");
		touch_identifier = Reflect.field(changed_touches[touch_identifier],"identifier");
	}
	return touch_identifier;
};
src_utils_Tools.detectGpu = function(series) {
	var canvas;
	canvas = js_Boot.__cast((function($this) {
		var $r;
		var _this = window.document;
		$r = _this.createElement("canvas");
		return $r;
	}(this)) , HTMLCanvasElement);
	canvas.id = "canvas";
	window.document.body.appendChild(canvas);
	var gl = canvas.getContext("experimental-webgl");
	window.document.body.removeChild(canvas);
	if(gl == null) return false;
	var dbg_render_info = gl.getExtension("WEBGL_debug_renderer_info");
	if(dbg_render_info == null) return false;
	var renderer = gl.getParameter(37446);
	if(renderer == null) return false;
	return renderer.toLowerCase().indexOf(series.toLowerCase(),0) != -1;
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
js_Boot.__toStr = {}.toString;
src_Game.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
