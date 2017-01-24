(function (console, $global) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
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
Std["int"] = function(x) {
	return x | 0;
};
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
var engine_projects_TickManager = function() {
	this.update_list = [];
	this.delta_time = 0.0;
	this.prev_frame_time = 0.0;
	this.lag = 0.01;
	this.MS_PER_UPDATE = 0.01;
	this.MAX_FRAME_TIME = 0.3;
	this.loop(0.0);
};
engine_projects_TickManager.__name__ = ["engine","projects","TickManager"];
engine_projects_TickManager.prototype = {
	pushBack: function(f) {
		this.update_list.push(f);
	}
	,getLastFrameTime: function() {
		return this.delta_time;
	}
	,loop: function(timestamp) {
		var frame_time = timestamp / 1000.0;
		this.delta_time = frame_time - this.prev_frame_time;
		if(this.delta_time < this.MAX_FRAME_TIME) this.delta_time = this.delta_time; else this.delta_time = this.MAX_FRAME_TIME;
		this.lag += this.delta_time;
		while(this.lag >= this.MS_PER_UPDATE) {
			var _g = 0;
			var _g1 = this.update_list;
			while(_g < _g1.length) {
				var callback = _g1[_g];
				++_g;
				callback(this.MS_PER_UPDATE);
			}
			this.lag -= this.MS_PER_UPDATE;
		}
		this.prev_frame_time = frame_time;
		window.requestAnimationFrame($bind(this,this.loop));
	}
	,__class__: engine_projects_TickManager
};
var engine_projects_IService = function() { };
engine_projects_IService.__name__ = ["engine","projects","IService"];
engine_projects_IService.prototype = {
	__class__: engine_projects_IService
};
var engine_projects_ServiceLocator = function() {
	this.services = new haxe_ds_StringMap();
};
engine_projects_ServiceLocator.__name__ = ["engine","projects","ServiceLocator"];
engine_projects_ServiceLocator.prototype = {
	register: function(name,service) {
		this.services.set(name,service);
	}
	,getService: function(name) {
		return this.services.get(name);
	}
	,destroyAll: function() {
		var $it0 = this.services.iterator();
		while( $it0.hasNext() ) {
			var service = $it0.next();
			service.destroy();
		}
	}
	,__class__: engine_projects_ServiceLocator
};
var engine_projects_IGame = function() { };
engine_projects_IGame.__name__ = ["engine","projects","IGame"];
engine_projects_IGame.prototype = {
	__class__: engine_projects_IGame
};
var engine_projects_ISortableObject = function() { };
engine_projects_ISortableObject.__name__ = ["engine","projects","ISortableObject"];
engine_projects_ISortableObject.prototype = {
	__class__: engine_projects_ISortableObject
};
var engine_projects_IGameObject = function() { };
engine_projects_IGameObject.__name__ = ["engine","projects","IGameObject"];
engine_projects_IGameObject.__interfaces__ = [engine_projects_ISortableObject];
engine_projects_IGameObject.prototype = {
	__class__: engine_projects_IGameObject
};
var engine_projects_IScene = function() { };
engine_projects_IScene.__name__ = ["engine","projects","IScene"];
engine_projects_IScene.prototype = {
	__class__: engine_projects_IScene
};
var engine_projects_IUserInput = function() { };
engine_projects_IUserInput.__name__ = ["engine","projects","IUserInput"];
engine_projects_IUserInput.prototype = {
	__class__: engine_projects_IUserInput
};
var engine_projects_ISoundEngine = function() { };
engine_projects_ISoundEngine.__name__ = ["engine","projects","ISoundEngine"];
var engine_projects_IGraphicEngine = function() { };
engine_projects_IGraphicEngine.__name__ = ["engine","projects","IGraphicEngine"];
engine_projects_IGraphicEngine.prototype = {
	__class__: engine_projects_IGraphicEngine
};
var engine_projects_IUpdateEvent = function() { };
engine_projects_IUpdateEvent.__name__ = ["engine","projects","IUpdateEvent"];
var engine_projects_IRenderEvent = function() { };
engine_projects_IRenderEvent.__name__ = ["engine","projects","IRenderEvent"];
var engine_projects_IDepthSorting = function() { };
engine_projects_IDepthSorting.__name__ = ["engine","projects","IDepthSorting"];
var engine_projects_Events = function() {
	this.UPDATE = engine_projects_IUpdateEvent;
	this.RENDER = engine_projects_IRenderEvent;
	this.DEPTH_SORTING = engine_projects_IDepthSorting;
};
engine_projects_Events.__name__ = ["engine","projects","Events"];
engine_projects_Events.prototype = {
	__class__: engine_projects_Events
};
var engine_projects_IEventDispatcher = function() { };
engine_projects_IEventDispatcher.__name__ = ["engine","projects","IEventDispatcher"];
engine_projects_IEventDispatcher.prototype = {
	__class__: engine_projects_IEventDispatcher
};
var engine_projects_IResourceManager = function() { };
engine_projects_IResourceManager.__name__ = ["engine","projects","IResourceManager"];
engine_projects_IResourceManager.prototype = {
	__class__: engine_projects_IResourceManager
};
var engine_projects_EventDispatcher = function() {
	this.events = new engine_projects_Events();
	this.listeners = new haxe_ds_StringMap();
};
engine_projects_EventDispatcher.__name__ = ["engine","projects","EventDispatcher"];
engine_projects_EventDispatcher.__interfaces__ = [engine_projects_IEventDispatcher,engine_projects_IService];
engine_projects_EventDispatcher.prototype = {
	init: function() {
	}
	,destroy: function() {
		this.removeAll();
	}
	,addListener: function(type,handler) {
		var class_name = Type.getClassName(type);
		if(!this.listeners.exists(class_name)) {
			var value = [];
			this.listeners.set(class_name,value);
		}
		this.listeners.get(class_name).push(handler);
	}
	,removeAll: function() {
		var $it0 = this.listeners.keys();
		while( $it0.hasNext() ) {
			var class_name = $it0.next();
			this.listeners.remove(class_name);
		}
	}
	,emit: function(event) {
		var class_name = Type.getClassName(event);
		if(this.listeners.exists(class_name)) {
			var _g = 0;
			var _g1 = this.listeners.get(class_name);
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener();
			}
		}
	}
	,__class__: engine_projects_EventDispatcher
};
var engine_projects_UserInput = function() {
	this.MOVE_RIGHT = 39;
	this.MOVE_LEFT = 37;
	this.key_map = new haxe_ds_IntMap();
};
engine_projects_UserInput.__name__ = ["engine","projects","UserInput"];
engine_projects_UserInput.__interfaces__ = [engine_projects_IUserInput,engine_projects_IService];
engine_projects_UserInput.prototype = {
	init: function() {
		window.addEventListener("keyup",$bind(this,this.onKeyUp));
		window.addEventListener("keydown",$bind(this,this.onKeyDown));
	}
	,destroy: function() {
		window.removeEventListener("keyup",$bind(this,this.onKeyUp));
		window.removeEventListener("keydown",$bind(this,this.onKeyDown));
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
	,__class__: engine_projects_UserInput
};
var engine_projects_GraphicsEngine = function(scr_width,scr_height) {
	var options = { };
	options.antialias = false;
	options.resolution = window.devicePixelRatio;
	this.internal_renderer = PIXI.autoDetectRenderer(scr_width,scr_height,options);
	window.document.body.appendChild(this.internal_renderer.view);
	engine_utils_Utils.log("Render type: " + (this.internal_renderer.type == 1?"WebGL":"Canvas"));
};
engine_projects_GraphicsEngine.__name__ = ["engine","projects","GraphicsEngine"];
engine_projects_GraphicsEngine.__interfaces__ = [engine_projects_IGraphicEngine,engine_projects_IService];
engine_projects_GraphicsEngine.prototype = {
	init: function() {
	}
	,destroy: function() {
	}
	,resize: function(width,height) {
		this.internal_renderer.view.style.width = width + "px";
		this.internal_renderer.view.style.height = height + "px";
	}
	,render: function(scene) {
		this.internal_renderer.render(js_Boot.__cast(scene , PIXI.DisplayObject));
	}
	,__class__: engine_projects_GraphicsEngine
};
var engine_projects_AudioEngine = function() {
};
engine_projects_AudioEngine.__name__ = ["engine","projects","AudioEngine"];
engine_projects_AudioEngine.__interfaces__ = [engine_projects_ISoundEngine,engine_projects_IService];
engine_projects_AudioEngine.prototype = {
	init: function() {
	}
	,destroy: function() {
	}
	,__class__: engine_projects_AudioEngine
};
var engine_projects_ResourceManager = function(resources) {
	this.resource_list = resources;
};
engine_projects_ResourceManager.__name__ = ["engine","projects","ResourceManager"];
engine_projects_ResourceManager.__interfaces__ = [engine_projects_IResourceManager,engine_projects_IService];
engine_projects_ResourceManager.prototype = {
	getTexture: function(name) {
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
	,init: function() {
	}
	,destroy: function() {
	}
	,__class__: engine_projects_ResourceManager
};
var engine_projects_ILoader = function() { };
engine_projects_ILoader.__name__ = ["engine","projects","ILoader"];
engine_projects_ILoader.prototype = {
	__class__: engine_projects_ILoader
};
var engine_projects_ResourceLoader = function() {
	this.internal_loader = new PIXI.loaders.Loader();
};
engine_projects_ResourceLoader.__name__ = ["engine","projects","ResourceLoader"];
engine_projects_ResourceLoader.__interfaces__ = [engine_projects_ILoader];
engine_projects_ResourceLoader.prototype = {
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
	,__class__: engine_projects_ResourceLoader
};
var engine_projects_Animation = function(speed) {
	if(speed == null) speed = 8.0;
	this.updateMethod = null;
	PIXI.Sprite.call(this);
	this.cacheAsBitmap = false;
	this.play_speed = speed;
	this.frames_array = [];
	this.reset();
};
engine_projects_Animation.__name__ = ["engine","projects","Animation"];
engine_projects_Animation.__interfaces__ = [engine_projects_IGameObject];
engine_projects_Animation.__super__ = PIXI.Sprite;
engine_projects_Animation.prototype = $extend(PIXI.Sprite.prototype,{
	init: function(game) {
		var _g = this;
		this.updateMethod = function() {
			_g.update(engine_projects_TickManager.instance.getLastFrameTime());
		};
	}
	,reset: function() {
		this.delta_frame = this.current_frame_index = 0;
	}
	,update: function(dt) {
		this.delta_frame += this.play_speed * dt;
		if(this.delta_frame >= 1.0) {
			this.delta_frame = 0.0;
			this.current_frame_index += 1;
			if(this.current_frame_index >= this.frames_array.length) this.current_frame_index = 0;
		}
		this.texture = this.frames_array[this.current_frame_index | 0];
	}
	,pushFrame: function(frame) {
		this.frames_array.push(frame);
	}
	,get_depth: function() {
		return 1.0;
	}
	,__class__: engine_projects_Animation
});
var engine_projects_AnimationList = function() {
	this.current_state = null;
	PIXI.Container.call(this);
	this.animation_list = new haxe_ds_StringMap();
	this.current_state = "undefined";
};
engine_projects_AnimationList.__name__ = ["engine","projects","AnimationList"];
engine_projects_AnimationList.__interfaces__ = [engine_projects_IGameObject];
engine_projects_AnimationList.__super__ = PIXI.Container;
engine_projects_AnimationList.prototype = $extend(PIXI.Container.prototype,{
	init: function(game) {
	}
	,get_depth: function() {
		return 1.0;
	}
	,push: function(name,animation) {
		this.animation_list.set(name,animation);
	}
	,setState: function(name) {
		var is_valid_name = name != null && name != this.current_state;
		if(is_valid_name) {
			var prev_animation = this.getAnimation(this.current_state);
			var current_animation = this.getAnimation(name);
			(js_Boot.__cast(this , PIXI.Container)).removeChild(prev_animation);
			(js_Boot.__cast(this , PIXI.Container)).addChild(current_animation);
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
	,__class__: engine_projects_AnimationList
});
var engine_projects_TouchButton = function(key_code,x,y,w,h) {
	if(h == null) h = 0.0;
	if(w == null) w = 0.0;
	if(y == null) y = 0.0;
	if(x == null) x = 0.0;
	this.touchEndMethod = null;
	this.touchStartMethod = null;
	this.key_code = 0;
	PIXI.Graphics.call(this);
	this.x = x;
	this.y = y;
	this.key_code = key_code;
	this.hitArea = new PIXI.Rectangle(0,0,w,h);
};
engine_projects_TouchButton.__name__ = ["engine","projects","TouchButton"];
engine_projects_TouchButton.__interfaces__ = [engine_projects_IGameObject];
engine_projects_TouchButton.__super__ = PIXI.Graphics;
engine_projects_TouchButton.prototype = $extend(PIXI.Graphics.prototype,{
	init: function(game) {
		var _g = this;
		this.interactive = true;
		var user_input;
		user_input = js_Boot.__cast(game.locator.getService("UserInput") , engine_projects_IUserInput);
		this.touchStartMethod = function() {
			var event_params = { bubbles : true, keyCode : _g.key_code, code : "ArrowRight"};
			var keyboard_event = new KeyboardEvent("keydown",event_params);
			user_input.onKeyDown(keyboard_event,_g.key_code);
		};
		this.touchEndMethod = function() {
			var event_params1 = { bubbles : true, keyCode : _g.key_code, code : "ArrowRight"};
			var keyboard_event1 = new KeyboardEvent("keyup",event_params1);
			user_input.onKeyUp(keyboard_event1,_g.key_code);
		};
		this.on("touchstart",this.touchStartMethod);
		this.on("touchend",this.touchEndMethod);
		this.on("touchendoutside",this.touchEndMethod);
	}
	,get_depth: function() {
		return 1.0;
	}
	,__class__: engine_projects_TouchButton
});
var engine_projects_ScrollingBackground = function() {
	this.updateMethod = null;
	this.scroll_speed = 15.0;
	this.scroll_direction = 0;
	PIXI.Sprite.call(this);
};
engine_projects_ScrollingBackground.__name__ = ["engine","projects","ScrollingBackground"];
engine_projects_ScrollingBackground.__interfaces__ = [engine_projects_IGameObject];
engine_projects_ScrollingBackground.__super__ = PIXI.Sprite;
engine_projects_ScrollingBackground.prototype = $extend(PIXI.Sprite.prototype,{
	init: function(game) {
		var _g = this;
		var asssets;
		asssets = js_Boot.__cast(game.locator.getService("ResourceManager") , engine_projects_IResourceManager);
		this.background = new PIXI.extras.TilingSprite(asssets.getTexture("street_map.png"),256,160);
		this.addChild(this.background);
		var dispatcher;
		dispatcher = js_Boot.__cast(game.locator.getService("EventDispatcher") , engine_projects_IEventDispatcher);
		this.updateMethod = function() {
			_g.handleUserInput(game);
			var delta_time = engine_projects_TickManager.instance.getLastFrameTime();
			_g.background.tilePosition.x += _g.scroll_direction * _g.scroll_speed * delta_time;
			if(_g.background.tilePosition.x > 0) _g.background.tilePosition.x = 0;
			if(_g.background.tilePosition.x < -1024) _g.background.tilePosition.x = -1024;
		};
		dispatcher.addListener(dispatcher.events.UPDATE,this.updateMethod);
	}
	,get_depth: function() {
		return 3;
	}
	,handleUserInput: function(game) {
		var user_input;
		user_input = js_Boot.__cast(game.locator.getService("UserInput") , engine_projects_IUserInput);
		var move_left = user_input.isDown(user_input.MOVE_LEFT);
		var move_right = user_input.isDown(user_input.MOVE_RIGHT);
		var state_was_changed = move_left || move_right;
		if(move_left) this.scroll_direction = 1;
		if(move_right) this.scroll_direction = -1;
		if(!state_was_changed) this.scroll_direction = 0;
	}
	,__class__: engine_projects_ScrollingBackground
});
var engine_projects_FPSMeter = function() {
	this.updateMethod = null;
	PIXI.Sprite.call(this);
};
engine_projects_FPSMeter.__name__ = ["engine","projects","FPSMeter"];
engine_projects_FPSMeter.__interfaces__ = [engine_projects_IGameObject];
engine_projects_FPSMeter.__super__ = PIXI.Sprite;
engine_projects_FPSMeter.prototype = $extend(PIXI.Sprite.prototype,{
	init: function(game) {
		var _g = this;
		var style_font = "3 Arial";
		var style_fill = "red";
		var style_align = "left";
		this.text_field = new PIXI.Text("FPS: 0 \n Minimal",{ font : "30 Verdana", fill : "red", align : "left"});
		this.text_field.x = this.text_field.y = 3;
		this.addChild(this.text_field);
		var dispatcher;
		dispatcher = js_Boot.__cast(game.locator.getService("EventDispatcher") , engine_projects_IEventDispatcher);
		this.updateMethod = function() {
			_g.text_field.text = "FPS: " + Std["int"](1.0 / engine_projects_TickManager.instance.getLastFrameTime());
		};
		dispatcher.addListener(dispatcher.events.UPDATE,this.updateMethod);
	}
	,get_depth: function() {
		return 3;
	}
	,__class__: engine_projects_FPSMeter
});
var engine_projects_PoliceCar = function() {
	this.updateMethod = null;
	this.move_speed = 40;
	PIXI.Sprite.call(this);
	this.animation = new engine_projects_Animation();
};
engine_projects_PoliceCar.__name__ = ["engine","projects","PoliceCar"];
engine_projects_PoliceCar.__interfaces__ = [engine_projects_IGameObject];
engine_projects_PoliceCar.__super__ = PIXI.Sprite;
engine_projects_PoliceCar.prototype = $extend(PIXI.Sprite.prototype,{
	init: function(game) {
		var _g = this;
		this.y = 136;
		this.addChild(this.animation);
		var asssets;
		asssets = js_Boot.__cast(game.locator.getService("ResourceManager") , engine_projects_IResourceManager);
		this.animation.pushFrame(asssets.getTexture("police_car-1.png"));
		this.animation.pushFrame(asssets.getTexture("police_car-2.png"));
		var dispatcher;
		dispatcher = js_Boot.__cast(game.locator.getService("EventDispatcher") , engine_projects_IEventDispatcher);
		this.updateMethod = function() {
			var dt = engine_projects_TickManager.instance.getLastFrameTime();
			_g.animation.update(dt);
			_g.x -= _g.move_speed * dt;
			if(_g.x < -300) _g.x = 255;
		};
		dispatcher.addListener(dispatcher.events.UPDATE,this.updateMethod);
		dispatcher.addListener(dispatcher.events.DEPTH_SORTING,$bind(this,this.depthSorting));
	}
	,get_depth: function() {
		return 3;
	}
	,zAxisSorting: function(a,b) {
		if((js_Boot.__cast(a , engine_projects_ISortableObject)).get_depth() > (js_Boot.__cast(b , engine_projects_ISortableObject)).get_depth()) return -1; else return 1;
	}
	,depthSorting: function() {
		(js_Boot.__cast(this , PIXI.Container)).children.sort($bind(this,this.zAxisSorting));
	}
	,__class__: engine_projects_PoliceCar
});
var engine_projects_Urban = function() {
	this.renderMethod = null;
	this.updateMethod = null;
	this.move_speed = 0.0;
	this.move_direction = 0;
	PIXI.Graphics.call(this);
	this.character_animation = new engine_projects_AnimationList();
	this.x = 100;
	this.y = 96;
	this.move_direction = 0;
};
engine_projects_Urban.__name__ = ["engine","projects","Urban"];
engine_projects_Urban.__interfaces__ = [engine_projects_IGameObject];
engine_projects_Urban.__super__ = PIXI.Graphics;
engine_projects_Urban.prototype = $extend(PIXI.Graphics.prototype,{
	init: function(game) {
		var _g = this;
		var asssets;
		asssets = js_Boot.__cast(game.locator.getService("ResourceManager") , engine_projects_IResourceManager);
		this.addChild(this.character_animation);
		this.character_animation.push("idle",new engine_projects_Animation());
		this.character_animation.push("move_left",new engine_projects_Animation());
		this.character_animation.push("move_right",new engine_projects_Animation());
		this.character_animation.push("jab",new engine_projects_Animation());
		this.character_animation.push("uppercut",new engine_projects_Animation());
		this.character_animation.push("cover_up",new engine_projects_Animation());
		this.character_animation.push("cover_down",new engine_projects_Animation());
		this.character_animation.push("skip_easy_jab",new engine_projects_Animation());
		this.character_animation.push("skip_easy_uppercut",new engine_projects_Animation());
		this.character_animation.push("skip_strong_jab",new engine_projects_Animation());
		this.character_animation.push("skip_strong_uppercut",new engine_projects_Animation());
		this.character_animation.push("back_out",new engine_projects_Animation());
		this.character_animation.push("knockout",new engine_projects_Animation());
		this.character_animation.push("knockdown",new engine_projects_Animation());
		this.character_animation.push("arrest",new engine_projects_Animation());
		this.character_animation.push("police",new engine_projects_Animation());
		this.character_animation.push("win",new engine_projects_Animation());
		var initializeAnimation = function(animation_name,texture_name,frames_number,reverse) {
			if(reverse == null) reverse = false;
			if(animation_name == null) animation_name = texture_name; else animation_name = animation_name;
			var animation = _g.character_animation.getAnimation(animation_name);
			if(reverse) {
				var _g2 = 1;
				var _g1 = frames_number + 1;
				while(_g2 < _g1) {
					var i = _g2++;
					animation.pushFrame(asssets.getTexture("" + texture_name + "-" + (frames_number + 1 - i) + ".png"));
				}
			} else {
				var _g21 = 1;
				var _g11 = frames_number + 1;
				while(_g21 < _g11) {
					var i1 = _g21++;
					animation.pushFrame(asssets.getTexture("" + texture_name + "-" + i1 + ".png"));
				}
			}
		};
		initializeAnimation(null,"idle",1);
		initializeAnimation("move_left","move_right",4,true);
		initializeAnimation(null,"move_right",4);
		initializeAnimation(null,"jab",2);
		var dispatcher;
		dispatcher = js_Boot.__cast(game.locator.getService("EventDispatcher") , engine_projects_IEventDispatcher);
		this.updateMethod = function() {
			_g.update(game,engine_projects_TickManager.instance.getLastFrameTime());
		};
		this.renderMethod = function() {
			_g.render(game);
		};
		dispatcher.addListener(dispatcher.events.UPDATE,this.updateMethod);
		dispatcher.addListener(dispatcher.events.RENDER,this.renderMethod);
	}
	,get_depth: function() {
		return 1;
	}
	,update: function(game,delta_time) {
		this.handleUserInput(game);
		this.character_animation.update(delta_time);
		this.x += this.move_direction * this.move_speed * delta_time;
	}
	,render: function(game) {
	}
	,handleUserInput: function(game) {
		var audio;
		audio = js_Boot.__cast(game.locator.getService("AudioSystem") , engine_projects_ISoundEngine);
		var user_input;
		user_input = js_Boot.__cast(game.locator.getService("UserInput") , engine_projects_IUserInput);
		var move_left = user_input.isDown(user_input.MOVE_LEFT);
		var move_right = user_input.isDown(user_input.MOVE_RIGHT);
		var state_was_changed = move_left || move_right;
		if(move_left) {
			this.character_animation.setState("move_left");
			this.move_direction = -1;
		}
		if(move_right) {
			this.character_animation.setState("move_right");
			this.move_direction = 1;
		}
		if(!state_was_changed) {
			this.character_animation.setState("idle");
			this.move_direction = 0;
		}
	}
	,__class__: engine_projects_Urban
});
var engine_projects_GameScene = function() {
	PIXI.Container.call(this);
};
engine_projects_GameScene.__name__ = ["engine","projects","GameScene"];
engine_projects_GameScene.__interfaces__ = [engine_projects_IScene];
engine_projects_GameScene.__super__ = PIXI.Container;
engine_projects_GameScene.prototype = $extend(PIXI.Container.prototype,{
	init: function(game) {
		this.addChild(new engine_projects_ScrollingBackground());
		this.addChild(new engine_projects_Urban());
		this.addChild(new engine_projects_FPSMeter());
		this.addChild(new engine_projects_PoliceCar());
		var user_input;
		user_input = js_Boot.__cast(game.locator.getService("UserInput") , engine_projects_IUserInput);
		this.addChild(new engine_projects_TouchButton(user_input.MOVE_LEFT,0.0,0.0,128,160));
		this.addChild(new engine_projects_TouchButton(user_input.MOVE_RIGHT,128,0.0,128,160));
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			(js_Boot.__cast(entity , engine_projects_IGameObject)).init(game);
		}
		this.dispatcher = js_Boot.__cast(game.locator.getService("EventDispatcher") , engine_projects_IEventDispatcher);
	}
	,destruct: function(game) {
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			(js_Boot.__cast(entity , engine_projects_IScene)).destruct(game);
			this.removeChild(entity);
		}
		this.dispatcher = null;
	}
	,update: function(game) {
		this.dispatcher.emit(this.dispatcher.events.UPDATE);
		this.dispatcher.emit(this.dispatcher.events.RENDER);
		(js_Boot.__cast(game.locator.getService("GraphicEngine") , engine_projects_IGraphicEngine)).render(this);
	}
	,__class__: engine_projects_GameScene
});
var engine_projects_SceneManager = function() {
	this.scene_list = new haxe_ds_StringMap();
	this.current_scene = "undefined";
};
engine_projects_SceneManager.__name__ = ["engine","projects","SceneManager"];
engine_projects_SceneManager.prototype = {
	update: function(game) {
		this.getScene().update(game);
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
	,__class__: engine_projects_SceneManager
};
var engine_projects_UrbanChampion = function(width,height) {
	if(height == null) height = 320.0;
	if(width == null) width = 512.0;
	this.window_width = width;
	this.window_height = height;
	this.scene_manager = new engine_projects_SceneManager();
	this.locator = new engine_projects_ServiceLocator();
	window.addEventListener("resize",$bind(this,this.resize),false);
	window.addEventListener("onbeforeunload",$bind(this,this.destroy),false);
};
engine_projects_UrbanChampion.__name__ = ["engine","projects","UrbanChampion"];
engine_projects_UrbanChampion.__interfaces__ = [engine_projects_IGame];
engine_projects_UrbanChampion.main = function() {
	var custom_loader = null;
	var preloader = new engine_projects_ResourceLoader();
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
			var game = new engine_projects_UrbanChampion();
			game.init(game_resources);
			game.resize();
			game.resume();
		});
	});
};
engine_projects_UrbanChampion.prototype = {
	init: function(_resources) {
		this.locator.register("EventDispatcher",new engine_projects_EventDispatcher());
		this.locator.register("AudioSystem",new engine_projects_AudioEngine());
		this.locator.register("GraphicEngine",new engine_projects_GraphicsEngine(this.window_width,this.window_height));
		this.locator.register("UserInput",new engine_projects_UserInput());
		this.locator.register("ResourceManager",new engine_projects_ResourceManager(_resources));
		this.locator.getService("EventDispatcher").init();
		this.locator.getService("AudioSystem").init();
		this.locator.getService("GraphicEngine").init();
		this.locator.getService("UserInput").init();
		this.locator.getService("ResourceManager").init();
		this.scene_manager.pushScene("Intro",new engine_projects_GameScene());
		this.scene_manager.pushScene("MainMenu",new engine_projects_GameScene());
		this.scene_manager.pushScene("Intro",new engine_projects_GameScene());
		this.scene_manager.pushScene("Intro",new engine_projects_GameScene());
		this.scene_manager.setScene("Intro");
		this.scene_manager.getScene().init(this);
	}
	,destroy: function() {
		this.scene_manager.destroyScene(this);
		this.locator.destroyAll();
	}
	,resize: function() {
		var actual_width = window.innerWidth;
		var actual_height = window.innerHeight;
		var ratio_scale = Math.min(actual_width / this.window_width,actual_height / this.window_height);
		ratio_scale *= 0.8;
		(js_Boot.__cast(this.locator.getService("GraphicEngine") , engine_projects_IGraphicEngine)).resize(this.window_width * ratio_scale,this.window_height * ratio_scale);
	}
	,resume: function() {
		engine_projects_TickManager.instance.pushBack($bind(this,this.update));
	}
	,update: function(dt) {
		this.scene_manager.update(this);
	}
	,__class__: engine_projects_UrbanChampion
};
var engine_utils_Utils = function() { };
engine_utils_Utils.__name__ = ["engine","utils","Utils"];
engine_utils_Utils.log = function(message) {
	window.console.log(message);
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
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
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
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
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
engine_projects_TickManager.instance = new engine_projects_TickManager();
js_Boot.__toStr = {}.toString;
engine_projects_UrbanChampion.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
