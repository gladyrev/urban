(function (console, $global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
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
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var engine_projects_TickManager = function() {
	this.update_list = [];
	this.delta_time = 0.0;
	this.prev_frame_time = 0.0;
	this.lag = 0.0;
	this.MS_PER_UPDATE = 0.0;
	this.MAX_FRAME_TIME = 0.3;
	this.MS_PER_UPDATE = 0.0166666666666666664;
	this.loop(0.0);
};
engine_projects_TickManager.__name__ = true;
engine_projects_TickManager.prototype = {
	pushBack: function(f) {
		this.update_list.push(f);
	}
	,loop: function(timestamp) {
		this.delta_time = (timestamp - this.prev_frame_time) / 1000.0;
		if(this.delta_time > this.MAX_FRAME_TIME) this.delta_time = this.MAX_FRAME_TIME; else this.delta_time = this.delta_time;
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
		this.prev_frame_time = timestamp;
		window.requestAnimationFrame($bind(this,this.loop));
	}
	,__class__: engine_projects_TickManager
};
var engine_projects_IService = function() { };
engine_projects_IService.__name__ = true;
engine_projects_IService.prototype = {
	__class__: engine_projects_IService
};
var engine_projects_ServiceLocator = function() {
	this.services = new haxe_ds_StringMap();
};
engine_projects_ServiceLocator.__name__ = true;
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
engine_projects_IGame.__name__ = true;
engine_projects_IGame.prototype = {
	__class__: engine_projects_IGame
};
var engine_projects_ISortableObject = function() { };
engine_projects_ISortableObject.__name__ = true;
engine_projects_ISortableObject.prototype = {
	__class__: engine_projects_ISortableObject
};
var engine_projects_IGameObject = function() { };
engine_projects_IGameObject.__name__ = true;
engine_projects_IGameObject.__interfaces__ = [engine_projects_ISortableObject];
engine_projects_IGameObject.prototype = {
	__class__: engine_projects_IGameObject
};
var engine_projects_IScene = function() { };
engine_projects_IScene.__name__ = true;
engine_projects_IScene.prototype = {
	__class__: engine_projects_IScene
};
var engine_projects_IUserInput = function() { };
engine_projects_IUserInput.__name__ = true;
engine_projects_IUserInput.prototype = {
	__class__: engine_projects_IUserInput
};
var engine_projects_ISoundEngine = function() { };
engine_projects_ISoundEngine.__name__ = true;
var engine_projects_IGraphicEngine = function() { };
engine_projects_IGraphicEngine.__name__ = true;
engine_projects_IGraphicEngine.prototype = {
	__class__: engine_projects_IGraphicEngine
};
var engine_projects_IPhysicsEngine = function() { };
engine_projects_IPhysicsEngine.__name__ = true;
var engine_projects_Events = { __ename__ : true, __constructs__ : ["UPDATE","RENDER","DEPTH"] };
engine_projects_Events.UPDATE = ["UPDATE",0];
engine_projects_Events.UPDATE.toString = $estr;
engine_projects_Events.UPDATE.__enum__ = engine_projects_Events;
engine_projects_Events.RENDER = ["RENDER",1];
engine_projects_Events.RENDER.toString = $estr;
engine_projects_Events.RENDER.__enum__ = engine_projects_Events;
engine_projects_Events.DEPTH = ["DEPTH",2];
engine_projects_Events.DEPTH.toString = $estr;
engine_projects_Events.DEPTH.__enum__ = engine_projects_Events;
var engine_projects_IEventDispatcher = function() { };
engine_projects_IEventDispatcher.__name__ = true;
engine_projects_IEventDispatcher.prototype = {
	__class__: engine_projects_IEventDispatcher
};
var engine_projects_IResourceManager = function() { };
engine_projects_IResourceManager.__name__ = true;
engine_projects_IResourceManager.prototype = {
	__class__: engine_projects_IResourceManager
};
var engine_projects_IEvent = function() { };
engine_projects_IEvent.__name__ = true;
engine_projects_IEvent.prototype = {
	__class__: engine_projects_IEvent
};
var engine_projects_EventDispatcher = function() {
	this.listeners = new haxe_ds_EnumValueMap();
};
engine_projects_EventDispatcher.__name__ = true;
engine_projects_EventDispatcher.__interfaces__ = [engine_projects_IEventDispatcher,engine_projects_IService];
engine_projects_EventDispatcher.prototype = {
	init: function() {
	}
	,destroy: function() {
		this.removeAll();
	}
	,removeAll: function() {
	}
	,addListener: function(name,listener) {
		if(!this.listeners.exists(name)) {
			var value = [];
			this.listeners.set(name,value);
		}
		this.listeners.get(name).push(listener);
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
	,__class__: engine_projects_EventDispatcher
};
var engine_projects_IDepthSortingEventListener = function() { };
engine_projects_IDepthSortingEventListener.__name__ = true;
engine_projects_IDepthSortingEventListener.prototype = {
	__class__: engine_projects_IDepthSortingEventListener
};
var engine_projects_DepthSortingEvent = function() {
};
engine_projects_DepthSortingEvent.__name__ = true;
engine_projects_DepthSortingEvent.__interfaces__ = [engine_projects_IEvent];
engine_projects_DepthSortingEvent.prototype = {
	notify: function(listener) {
		listener.depthSorting();
	}
	,__class__: engine_projects_DepthSortingEvent
};
var engine_projects_IUpdateEventListener = function() { };
engine_projects_IUpdateEventListener.__name__ = true;
engine_projects_IUpdateEventListener.prototype = {
	__class__: engine_projects_IUpdateEventListener
};
var engine_projects_UpdateEvent = function(dt) {
	this.dt = dt;
};
engine_projects_UpdateEvent.__name__ = true;
engine_projects_UpdateEvent.__interfaces__ = [engine_projects_IEvent];
engine_projects_UpdateEvent.prototype = {
	notify: function(listener) {
		listener.update(this.dt);
	}
	,__class__: engine_projects_UpdateEvent
};
var engine_projects_UserInput = function() {
	this.MOVE_RIGHT = 39;
	this.MOVE_LEFT = 37;
	this.key_map = new haxe_ds_IntMap();
};
engine_projects_UserInput.__name__ = true;
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
var engine_projects_GraphicsEngine = function(width,height) {
	this.scr_height = 0.0;
	this.scr_width = 0.0;
	this.scr_width = width;
	this.scr_height = height;
};
engine_projects_GraphicsEngine.__name__ = true;
engine_projects_GraphicsEngine.__interfaces__ = [engine_projects_IGraphicEngine,engine_projects_IService];
engine_projects_GraphicsEngine.prototype = {
	init: function() {
		var options = { };
		options.antialias = false;
		options.resolution = window.devicePixelRatio;
		this.internal_renderer = PIXI.autoDetectRenderer(this.scr_width,this.scr_height,options);
		this.internal_renderer.view.id = "canvas";
		window.document.body.appendChild(this.internal_renderer.view);
	}
	,destroy: function() {
		this.internal_renderer.destroy(true);
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
var engine_projects_PhysicsEngine = function() {
};
engine_projects_PhysicsEngine.__name__ = true;
engine_projects_PhysicsEngine.__interfaces__ = [engine_projects_IPhysicsEngine,engine_projects_IService];
engine_projects_PhysicsEngine.prototype = {
	init: function() {
	}
	,destroy: function() {
	}
	,__class__: engine_projects_PhysicsEngine
};
var engine_projects_AudioEngine = function() {
};
engine_projects_AudioEngine.__name__ = true;
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
engine_projects_ResourceManager.__name__ = true;
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
engine_projects_ILoader.__name__ = true;
engine_projects_ILoader.prototype = {
	__class__: engine_projects_ILoader
};
var engine_projects_ResourceLoader = function() {
	this.internal_loader = new PIXI.loaders.Loader();
};
engine_projects_ResourceLoader.__name__ = true;
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
	if(speed == null) speed = 11.0;
	PIXI.Sprite.call(this);
	this.cacheAsBitmap = false;
	this.play_speed = speed;
	this.frames_array = [];
	this.reset();
};
engine_projects_Animation.__name__ = true;
engine_projects_Animation.__interfaces__ = [engine_projects_IUpdateEventListener,engine_projects_IGameObject];
engine_projects_Animation.__super__ = PIXI.Sprite;
engine_projects_Animation.prototype = $extend(PIXI.Sprite.prototype,{
	init: function(game) {
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
engine_projects_AnimationList.__name__ = true;
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
	this.redrawButton(-256);
};
engine_projects_TouchButton.__name__ = true;
engine_projects_TouchButton.__interfaces__ = [engine_projects_IGameObject];
engine_projects_TouchButton.__super__ = PIXI.Graphics;
engine_projects_TouchButton.prototype = $extend(PIXI.Graphics.prototype,{
	init: function(game) {
		var _g = this;
		this.interactive = true;
		var user_input;
		user_input = js_Boot.__cast(game.locator.getService("UserInput") , engine_projects_IUserInput);
		this.touchStartMethod = function() {
			_g.redrawButton(-65536);
			var event_params = { bubbles : true, keyCode : _g.key_code, code : "ArrowRight"};
			var keyboard_event = new KeyboardEvent("keydown",event_params);
			user_input.onKeyDown(keyboard_event,_g.key_code);
		};
		this.touchEndMethod = function() {
			_g.redrawButton(-256);
			var event_params1 = { bubbles : true, keyCode : _g.key_code, code : "ArrowRight"};
			var keyboard_event1 = new KeyboardEvent("keyup",event_params1);
			user_input.onKeyUp(keyboard_event1,_g.key_code);
		};
		this.on("touchstart",this.touchStartMethod);
		this.on("touchend",this.touchEndMethod);
		this.on("touchendoutside",this.touchEndMethod);
	}
	,redrawButton: function(color) {
		this.clear();
		this.beginFill(color);
		this.lineStyle(1,0);
		this.drawRect(0,0,96,96);
		this.endFill();
	}
	,get_depth: function() {
		return 1.0;
	}
	,__class__: engine_projects_TouchButton
});
var engine_projects_ScrollingBackground = function() {
	this.game = null;
	this.x_position = 0.0;
	this.scroll_speed = 10.0;
	this.scroll_direction = 0;
	PIXI.Sprite.call(this);
	this.object_list = [];
};
engine_projects_ScrollingBackground.__name__ = true;
engine_projects_ScrollingBackground.__interfaces__ = [engine_projects_IUpdateEventListener,engine_projects_IGameObject];
engine_projects_ScrollingBackground.__super__ = PIXI.Sprite;
engine_projects_ScrollingBackground.prototype = $extend(PIXI.Sprite.prototype,{
	init: function(game) {
		this.game = game;
		var asssets;
		asssets = js_Boot.__cast(game.locator.getService("ResourceManager") , engine_projects_IResourceManager);
		var _g = 0;
		var _g1 = ["street_background","street_buildings"];
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			var sprite = new PIXI.extras.TilingSprite(asssets.getTexture("" + item + ".png"),256,160);
			this.object_list.push(sprite);
			this.addChild(sprite);
		}
		var dispatcher;
		dispatcher = js_Boot.__cast(game.locator.getService("EventDispatcher") , engine_projects_IEventDispatcher);
		dispatcher.addListener(engine_projects_Events.UPDATE,this);
	}
	,update: function(dt) {
		this.handleUserInput(this.game);
		var counter = 0;
		var _g = 0;
		var _g1 = this.object_list;
		while(_g < _g1.length) {
			var object = _g1[_g];
			++_g;
			counter += 1;
			this.x_position += this.scroll_direction * this.scroll_speed * dt;
			object.tilePosition.x = Math.floor(this.x_position);
		}
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
	PIXI.Sprite.call(this);
};
engine_projects_FPSMeter.__name__ = true;
engine_projects_FPSMeter.__interfaces__ = [engine_projects_IUpdateEventListener,engine_projects_IGameObject];
engine_projects_FPSMeter.__super__ = PIXI.Sprite;
engine_projects_FPSMeter.prototype = $extend(PIXI.Sprite.prototype,{
	init: function(game) {
		var text_style = { font : "14px BlissProBold", align : "left", tint : 16711680};
		this.text_field = new PIXI.extras.BitmapText("0",text_style);
		this.text_field.x = this.text_field.y = 3;
		this.addChild(this.text_field);
		var dispatcher;
		dispatcher = js_Boot.__cast(game.locator.getService("EventDispatcher") , engine_projects_IEventDispatcher);
		dispatcher.addListener(engine_projects_Events.UPDATE,this);
	}
	,get_depth: function() {
		return 3;
	}
	,update: function(dt) {
		this.text_field.text = "FPS: " + (1.0 / dt | 0);
	}
	,__class__: engine_projects_FPSMeter
});
var engine_projects_GameScreenMask = function() {
	PIXI.Graphics.call(this);
	this.beginFill();
	this.drawRect(0,0,256,244);
	this.endFill();
};
engine_projects_GameScreenMask.__name__ = true;
engine_projects_GameScreenMask.__interfaces__ = [engine_projects_IGameObject];
engine_projects_GameScreenMask.__super__ = PIXI.Graphics;
engine_projects_GameScreenMask.prototype = $extend(PIXI.Graphics.prototype,{
	init: function(game) {
	}
	,get_depth: function() {
		return 1;
	}
	,__class__: engine_projects_GameScreenMask
});
var engine_projects_PoliceCar = function() {
	this.x_position = 0.0;
	this.move_speed = 40;
	PIXI.Sprite.call(this);
	this.animation = new engine_projects_Animation();
};
engine_projects_PoliceCar.__name__ = true;
engine_projects_PoliceCar.__interfaces__ = [engine_projects_IDepthSortingEventListener,engine_projects_IUpdateEventListener,engine_projects_IGameObject];
engine_projects_PoliceCar.__super__ = PIXI.Sprite;
engine_projects_PoliceCar.prototype = $extend(PIXI.Sprite.prototype,{
	init: function(game) {
		this.y = 136;
		this.addChild(this.animation);
		var asssets;
		asssets = js_Boot.__cast(game.locator.getService("ResourceManager") , engine_projects_IResourceManager);
		this.animation.pushFrame(asssets.getTexture("police_car-1.png"));
		this.animation.pushFrame(asssets.getTexture("police_car-2.png"));
		var dispatcher;
		dispatcher = js_Boot.__cast(game.locator.getService("EventDispatcher") , engine_projects_IEventDispatcher);
		dispatcher.addListener(engine_projects_Events.UPDATE,this);
		dispatcher.addListener(engine_projects_Events.DEPTH,this);
	}
	,update: function(dt) {
		this.animation.update(dt);
		this.x_position -= this.move_speed * dt;
		this.x = Math.floor(this.x_position);
		if(this.x < -300) this.x_position = 255;
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
	this.game = null;
	this.x_position = 0.0;
	this.move_speed = 0.0;
	this.move_direction = 0;
	PIXI.Graphics.call(this);
	this.character_animation = new engine_projects_AnimationList();
	this.x = 100;
	this.y = 96;
};
engine_projects_Urban.__name__ = true;
engine_projects_Urban.__interfaces__ = [engine_projects_IUpdateEventListener,engine_projects_IGameObject];
engine_projects_Urban.__super__ = PIXI.Graphics;
engine_projects_Urban.prototype = $extend(PIXI.Graphics.prototype,{
	init: function(game) {
		var _g = this;
		this.game = game;
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
		dispatcher.addListener(engine_projects_Events.UPDATE,this);
		dispatcher.addListener(engine_projects_Events.RENDER,this);
	}
	,get_depth: function() {
		return 1;
	}
	,update: function(dt) {
		this.handleUserInput(this.game);
		this.character_animation.update(dt);
		this.x_position += this.move_direction * this.move_speed * dt;
		this.x += Math.floor(this.x_position);
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
var engine_projects_GameScreen = function(x,y) {
	if(y == null) y = 10;
	if(x == null) x = 128;
	PIXI.Container.call(this);
	this.x = x;
	this.y = y;
};
engine_projects_GameScreen.__name__ = true;
engine_projects_GameScreen.__interfaces__ = [engine_projects_IGameObject];
engine_projects_GameScreen.__super__ = PIXI.Container;
engine_projects_GameScreen.prototype = $extend(PIXI.Container.prototype,{
	init: function(game) {
		this.addChild(new engine_projects_ScrollingBackground());
		this.addChild(new engine_projects_Urban());
		this.addChild(new engine_projects_FPSMeter());
		this.addChild(new engine_projects_PoliceCar());
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			(js_Boot.__cast(entity , engine_projects_IGameObject)).init(game);
		}
		var mask = new engine_projects_GameScreenMask();
		this.mask = mask;
		this.addChild(js_Boot.__cast(mask , PIXI.Graphics));
	}
	,get_depth: function() {
		return 1;
	}
	,__class__: engine_projects_GameScreen
});
var engine_projects_VirtualJoystick = function(x,y,w,h) {
	if(h == null) h = 180;
	if(w == null) w = 512;
	if(y == null) y = 0.0;
	if(x == null) x = 0.0;
	this.is_pressed = false;
	PIXI.Container.call(this);
	this.x = x;
	this.y = y;
	this.border = new PIXI.Graphics();
	this.stick = new PIXI.Graphics();
	this.addChild(this.border);
	this.addChild(this.stick);
	this.hitArea = new PIXI.Rectangle(x,y,w,h);
};
engine_projects_VirtualJoystick.__name__ = true;
engine_projects_VirtualJoystick.__interfaces__ = [engine_projects_IGameObject];
engine_projects_VirtualJoystick.__super__ = PIXI.Container;
engine_projects_VirtualJoystick.prototype = $extend(PIXI.Container.prototype,{
	init: function(game) {
		this.interactive = true;
		this.buttonMode = true;
		this.on("touchstart",$bind(this,this.touchStartEventHandler));
		this.on("touchend",$bind(this,this.touchEndEventHandler));
		this.on("touchendoutside",$bind(this,this.touchEndEventHandler));
		this.on("mousemove",$bind(this,this.touchMoveEventHandler));
		this.on("mousedown",$bind(this,this.touchStartEventHandler));
		this.on("mouseup",$bind(this,this.touchEndEventHandler));
	}
	,touchStartEventHandler: function(e) {
		this.is_pressed = true;
		var position = e.data.getLocalPosition(this.parent);
		this.drawObject(this.border,position.x,position.y,30,-65536);
		this.drawObject(this.stick,position.x,position.y,10,-16711936);
	}
	,touchEndEventHandler: function(e) {
		this.is_pressed = false;
		this.clearObject(this.border);
		this.clearObject(this.stick);
	}
	,touchMoveEventHandler: function(e) {
		if(this.is_pressed) {
			var position = e.data.getLocalPosition(this.parent);
			this.drawObject(this.stick,position.x,position.y,10,-16711936);
		}
	}
	,clearObject: function(object) {
		object.clear();
	}
	,drawObject: function(object,x,y,radius,color) {
		object.clear();
		object.beginFill(color);
		object.drawCircle(x,y,radius);
		object.endFill();
	}
	,get_depth: function() {
		return 1;
	}
	,__class__: engine_projects_VirtualJoystick
});
var engine_projects_GameScene = function() {
	this.game = null;
	PIXI.Container.call(this);
};
engine_projects_GameScene.__name__ = true;
engine_projects_GameScene.__interfaces__ = [engine_projects_IScene];
engine_projects_GameScene.__super__ = PIXI.Container;
engine_projects_GameScene.prototype = $extend(PIXI.Container.prototype,{
	init: function(game) {
		this.game = game;
		this.addChild(new engine_projects_GameScreen());
		var user_input;
		user_input = js_Boot.__cast(game.locator.getService("UserInput") , engine_projects_IUserInput);
		this.addChild(new engine_projects_TouchButton(user_input.MOVE_LEFT,20.0,10.0,128,160));
		this.addChild(new engine_projects_TouchButton(user_input.MOVE_RIGHT,400,10.0,128,160));
		var virtual_joystick = new engine_projects_VirtualJoystick();
		virtual_joystick.init(this.game);
		this.addChild(virtual_joystick);
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
	,update: function(dt) {
		var update_event = new engine_projects_UpdateEvent(dt);
		this.dispatcher.dispatch(engine_projects_Events.UPDATE,update_event);
		this.dispatcher.dispatch(engine_projects_Events.DEPTH,new engine_projects_DepthSortingEvent());
		(js_Boot.__cast(this.game.locator.getService("GraphicEngine") , engine_projects_IGraphicEngine)).render(this);
	}
	,__class__: engine_projects_GameScene
});
var engine_projects_SceneManager = function() {
	this.scene_list = new haxe_ds_StringMap();
	this.current_scene = "undefined";
};
engine_projects_SceneManager.__name__ = true;
engine_projects_SceneManager.prototype = {
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
	,__class__: engine_projects_SceneManager
};
var engine_projects_UrbanChampion = function(width,height) {
	if(height == null) height = 180.0;
	if(width == null) width = 512.0;
	this.window_width = width;
	this.window_height = height;
	this.scene_manager = new engine_projects_SceneManager();
	this.locator = new engine_projects_ServiceLocator();
	window.addEventListener("resize",$bind(this,this.resize),false);
	window.addEventListener("onbeforeunload",$bind(this,this.destroy),false);
};
engine_projects_UrbanChampion.__name__ = true;
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
		this.locator.register("PhysicsEngine",new engine_projects_PhysicsEngine());
		this.locator.register("UserInput",new engine_projects_UserInput());
		this.locator.register("ResourceManager",new engine_projects_ResourceManager(_resources));
		this.locator.getService("EventDispatcher").init();
		this.locator.getService("AudioSystem").init();
		this.locator.getService("GraphicEngine").init();
		this.locator.getService("PhysicsEngine").init();
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
		window.removeEventListener("resize",$bind(this,this.resize),false);
		window.removeEventListener("onbeforeunload",$bind(this,this.destroy),false);
	}
	,resize: function() {
		var actual_width = window.innerWidth;
		var actual_height = window.innerHeight;
		var ratio_scale = Math.min(actual_width / this.window_width,actual_height / this.window_height);
		(js_Boot.__cast(this.locator.getService("GraphicEngine") , engine_projects_IGraphicEngine)).resize(this.window_width * ratio_scale,this.window_height * ratio_scale);
	}
	,resume: function() {
		engine_projects_TickManager.instance.pushBack(($_=this.scene_manager,$bind($_,$_.update)));
	}
	,__class__: engine_projects_UrbanChampion
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_ds_BalancedTree = function() {
};
haxe_ds_BalancedTree.__name__ = true;
haxe_ds_BalancedTree.prototype = {
	set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return node.value;
			if(c < 0) node = node.left; else node = node.right;
		}
		return null;
	}
	,exists: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return true; else if(c < 0) node = node.left; else node = node.right;
		}
		return false;
	}
	,setLoop: function(k,v,node) {
		if(node == null) return new haxe_ds_TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		if(c == 0) return new haxe_ds_TreeNode(node.left,k,v,node.right,node == null?0:node._height); else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,balance: function(l,k,v,r) {
		var hl;
		if(l == null) hl = 0; else hl = l._height;
		var hr;
		if(r == null) hr = 0; else hr = r._height;
		if(hl > hr + 2) {
			if((function($this) {
				var $r;
				var _this = l.left;
				$r = _this == null?0:_this._height;
				return $r;
			}(this)) >= (function($this) {
				var $r;
				var _this1 = l.right;
				$r = _this1 == null?0:_this1._height;
				return $r;
			}(this))) return new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r)); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
		} else if(hr > hl + 2) {
			if((function($this) {
				var $r;
				var _this2 = r.right;
				$r = _this2 == null?0:_this2._height;
				return $r;
			}(this)) > (function($this) {
				var $r;
				var _this3 = r.left;
				$r = _this3 == null?0:_this3._height;
				return $r;
			}(this))) return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
		} else return new haxe_ds_TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe_ds_BalancedTree
};
var haxe_ds_TreeNode = function(l,k,v,r,h) {
	if(h == null) h = -1;
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) this._height = ((function($this) {
		var $r;
		var _this = $this.left;
		$r = _this == null?0:_this._height;
		return $r;
	}(this)) > (function($this) {
		var $r;
		var _this1 = $this.right;
		$r = _this1 == null?0:_this1._height;
		return $r;
	}(this))?(function($this) {
		var $r;
		var _this2 = $this.left;
		$r = _this2 == null?0:_this2._height;
		return $r;
	}(this)):(function($this) {
		var $r;
		var _this3 = $this.right;
		$r = _this3 == null?0:_this3._height;
		return $r;
	}(this))) + 1; else this._height = h;
};
haxe_ds_TreeNode.__name__ = true;
haxe_ds_TreeNode.prototype = {
	__class__: haxe_ds_TreeNode
};
var haxe_ds_EnumValueMap = function() {
	haxe_ds_BalancedTree.call(this);
};
haxe_ds_EnumValueMap.__name__ = true;
haxe_ds_EnumValueMap.__interfaces__ = [haxe_IMap];
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
haxe_ds_EnumValueMap.prototype = $extend(haxe_ds_BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1[1] - k2[1];
		if(d != 0) return d;
		var p1 = k1.slice(2);
		var p2 = k2.slice(2);
		if(p1.length == 0 && p2.length == 0) return 0;
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) return ld;
		var _g1 = 0;
		var _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) return d;
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) return this.compare(v1,v2); else if((v1 instanceof Array) && v1.__enum__ == null && ((v2 instanceof Array) && v2.__enum__ == null)) return this.compareArgs(v1,v2); else return Reflect.compare(v1,v2);
	}
	,__class__: haxe_ds_EnumValueMap
});
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = true;
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
haxe_ds__$StringMap_StringMapIterator.__name__ = true;
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
haxe_ds_StringMap.__name__ = true;
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
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
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
String.__name__ = true;
Array.__name__ = true;
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
