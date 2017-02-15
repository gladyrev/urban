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
var src_TickManager = function() {
	this.update_list = [];
	this.delta_time = 0.0;
	this.prev_frame_time = 0.0;
	this.lag = 0.0;
	this.MS_PER_UPDATE = 0.0;
	this.MAX_FRAME_TIME = 0.3;
	this.MS_PER_UPDATE = 0.0166666666666666664;
	this.loop(0.0);
};
src_TickManager.__name__ = true;
src_TickManager.prototype = {
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
	,__class__: src_TickManager
};
var src_IService = function() { };
src_IService.__name__ = true;
src_IService.prototype = {
	__class__: src_IService
};
var src_ServiceLocator = function() {
	this.services = new haxe_ds_StringMap();
};
src_ServiceLocator.__name__ = true;
src_ServiceLocator.prototype = {
	provide: function(name,service) {
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
	,__class__: src_ServiceLocator
};
var src_IGame = function() { };
src_IGame.__name__ = true;
src_IGame.prototype = {
	__class__: src_IGame
};
var src_ISortableObject = function() { };
src_ISortableObject.__name__ = true;
src_ISortableObject.prototype = {
	__class__: src_ISortableObject
};
var src_IGameObject = function() { };
src_IGameObject.__name__ = true;
src_IGameObject.__interfaces__ = [src_ISortableObject];
src_IGameObject.prototype = {
	__class__: src_IGameObject
};
var src_IScene = function() { };
src_IScene.__name__ = true;
src_IScene.prototype = {
	__class__: src_IScene
};
var src_IUserInput = function() { };
src_IUserInput.__name__ = true;
src_IUserInput.prototype = {
	__class__: src_IUserInput
};
var src_ISoundEngine = function() { };
src_ISoundEngine.__name__ = true;
var src_IGraphicEngine = function() { };
src_IGraphicEngine.__name__ = true;
src_IGraphicEngine.prototype = {
	__class__: src_IGraphicEngine
};
var src_IPhysicsEngine = function() { };
src_IPhysicsEngine.__name__ = true;
var src_IResourceManager = function() { };
src_IResourceManager.__name__ = true;
src_IResourceManager.prototype = {
	__class__: src_IResourceManager
};
var src_Events = { __ename__ : true, __constructs__ : ["UPDATE","RENDER","DEPTH"] };
src_Events.UPDATE = ["UPDATE",0];
src_Events.UPDATE.toString = $estr;
src_Events.UPDATE.__enum__ = src_Events;
src_Events.RENDER = ["RENDER",1];
src_Events.RENDER.toString = $estr;
src_Events.RENDER.__enum__ = src_Events;
src_Events.DEPTH = ["DEPTH",2];
src_Events.DEPTH.toString = $estr;
src_Events.DEPTH.__enum__ = src_Events;
var src_IEventDispatcher = function() { };
src_IEventDispatcher.__name__ = true;
src_IEventDispatcher.prototype = {
	__class__: src_IEventDispatcher
};
var src_IEvent = function() { };
src_IEvent.__name__ = true;
src_IEvent.prototype = {
	__class__: src_IEvent
};
var src_EventDispatcher = function() {
	this.listeners = new haxe_ds_EnumValueMap();
};
src_EventDispatcher.__name__ = true;
src_EventDispatcher.__interfaces__ = [src_IEventDispatcher,src_IService];
src_EventDispatcher.prototype = {
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
	,__class__: src_EventDispatcher
};
var src_IDepthSortingEventListener = function() { };
src_IDepthSortingEventListener.__name__ = true;
src_IDepthSortingEventListener.prototype = {
	__class__: src_IDepthSortingEventListener
};
var src_DepthSortingEvent = function() {
};
src_DepthSortingEvent.__name__ = true;
src_DepthSortingEvent.__interfaces__ = [src_IEvent];
src_DepthSortingEvent.prototype = {
	notify: function(listener) {
		listener.depthSorting();
	}
	,__class__: src_DepthSortingEvent
};
var src_IUpdateEventListener = function() { };
src_IUpdateEventListener.__name__ = true;
src_IUpdateEventListener.prototype = {
	__class__: src_IUpdateEventListener
};
var src_UpdateEvent = function(dt) {
	this.dt = dt;
};
src_UpdateEvent.__name__ = true;
src_UpdateEvent.__interfaces__ = [src_IEvent];
src_UpdateEvent.prototype = {
	notify: function(listener) {
		listener.update(this.dt);
	}
	,__class__: src_UpdateEvent
};
var src_UserInput = function() {
	this.STRONG_HIT = 90;
	this.EASY_HIT = 88;
	this.MOVE_DOWN = 40;
	this.MOVE_RIGHT = 39;
	this.MOVE_UP = 38;
	this.MOVE_LEFT = 37;
	this.key_map = new haxe_ds_IntMap();
};
src_UserInput.__name__ = true;
src_UserInput.__interfaces__ = [src_IUserInput,src_IService];
src_UserInput.prototype = {
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
	,__class__: src_UserInput
};
var src_GraphicsEngine = function(width,height) {
	this.device_pixel_ratio = 1.0;
	this.scr_height = 0.0;
	this.scr_width = 0.0;
	this.scr_width = width;
	this.scr_height = height;
};
src_GraphicsEngine.__name__ = true;
src_GraphicsEngine.__interfaces__ = [src_IGraphicEngine,src_IService];
src_GraphicsEngine.prototype = {
	init: function() {
		this.device_pixel_ratio = window.devicePixelRatio;
		var options = { };
		options.antialias = false;
		options.transparent = false;
		options.resolution = this.device_pixel_ratio;
		this.internal_renderer = PIXI.autoDetectRenderer(this.scr_width,this.scr_height,options);
		this.internal_renderer.view.id = "canvas";
		window.document.body.appendChild(this.internal_renderer.view);
	}
	,destroy: function() {
		this.internal_renderer.destroy(true);
	}
	,resize: function(width,height) {
		this.internal_renderer.resize(width,height);
		if(this.device_pixel_ratio > 1.0) {
			console.log("use browser scaling");
			this.internal_renderer.view.style.width = width + "px";
			this.internal_renderer.view.style.height = height + "px";
		}
	}
	,render: function(scene) {
		this.internal_renderer.render(js_Boot.__cast(scene , PIXI.DisplayObject));
	}
	,__class__: src_GraphicsEngine
};
var src_PhysicsEngine = function() {
};
src_PhysicsEngine.__name__ = true;
src_PhysicsEngine.__interfaces__ = [src_IPhysicsEngine,src_IService];
src_PhysicsEngine.prototype = {
	init: function() {
	}
	,destroy: function() {
	}
	,__class__: src_PhysicsEngine
};
var src_AudioEngine = function() {
};
src_AudioEngine.__name__ = true;
src_AudioEngine.__interfaces__ = [src_ISoundEngine,src_IService];
src_AudioEngine.prototype = {
	init: function() {
	}
	,destroy: function() {
	}
	,__class__: src_AudioEngine
};
var src_ResourceManager = function(resources) {
	this.resource_list = resources;
};
src_ResourceManager.__name__ = true;
src_ResourceManager.__interfaces__ = [src_IResourceManager,src_IService];
src_ResourceManager.prototype = {
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
	,__class__: src_ResourceManager
};
var src_ILoader = function() { };
src_ILoader.__name__ = true;
src_ILoader.prototype = {
	__class__: src_ILoader
};
var src_ResourceLoader = function() {
	this.internal_loader = new PIXI.loaders.Loader();
};
src_ResourceLoader.__name__ = true;
src_ResourceLoader.__interfaces__ = [src_ILoader];
src_ResourceLoader.prototype = {
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
	,__class__: src_ResourceLoader
};
var src_Animation = function(speed) {
	if(speed == null) speed = 11.0;
	PIXI.Sprite.call(this);
	this.cacheAsBitmap = false;
	this.play_speed = speed;
	this.frames_array = [];
	this.reset();
};
src_Animation.__name__ = true;
src_Animation.__interfaces__ = [src_IUpdateEventListener,src_IGameObject];
src_Animation.__super__ = PIXI.Sprite;
src_Animation.prototype = $extend(PIXI.Sprite.prototype,{
	init: function(game) {
	}
	,reset: function() {
		this.delta_frame = this.current_frame_index = 0;
	}
	,update: function(dt) {
		this.delta_frame += this.play_speed * dt;
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
	,get_depth: function() {
		return 1.0;
	}
	,__class__: src_Animation
});
var src_AnimationList = function() {
	this.current_state = null;
	PIXI.Container.call(this);
	this.animation_list = new haxe_ds_StringMap();
	this.current_state = "undefined";
};
src_AnimationList.__name__ = true;
src_AnimationList.__interfaces__ = [src_IGameObject];
src_AnimationList.__super__ = PIXI.Container;
src_AnimationList.prototype = $extend(PIXI.Container.prototype,{
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
	,__class__: src_AnimationList
});
var src_ScrollingBackground = function() {
	this.game = null;
	this.scroll_speed = 12.0;
	this.scroll_direction = 0;
	PIXI.Sprite.call(this);
	this.object_list = [];
};
src_ScrollingBackground.__name__ = true;
src_ScrollingBackground.__interfaces__ = [src_IUpdateEventListener,src_IGameObject];
src_ScrollingBackground.__super__ = PIXI.Sprite;
src_ScrollingBackground.prototype = $extend(PIXI.Sprite.prototype,{
	init: function(game) {
		this.game = game;
		var asssets;
		asssets = js_Boot.__cast(game.locator.getService("ResourceManager") , src_IResourceManager);
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
		dispatcher = js_Boot.__cast(game.locator.getService("EventDispatcher") , src_IEventDispatcher);
		dispatcher.addListener(src_Events.UPDATE,this);
	}
	,update: function(dt) {
		this.handleUserInput(this.game);
		var _g1 = 0;
		var _g = this.object_list.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.object_list[i].tilePosition.x += this.scroll_direction * (this.scroll_speed / (this.object_list.length - i)) * dt;
		}
	}
	,get_depth: function() {
		return 3;
	}
	,handleUserInput: function(game) {
		var user_input;
		user_input = js_Boot.__cast(game.locator.getService("UserInput") , src_IUserInput);
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
src_Label.__name__ = true;
src_Label.__interfaces__ = [src_IGameObject];
src_Label.__super__ = PIXI.Sprite;
src_Label.prototype = $extend(PIXI.Sprite.prototype,{
	init: function(game) {
	}
	,get_depth: function() {
		return 3;
	}
	,update: function(text) {
		this.text_field.text = text;
	}
	,__class__: src_Label
});
var src_FPSMeter = function() {
	PIXI.Sprite.call(this);
};
src_FPSMeter.__name__ = true;
src_FPSMeter.__interfaces__ = [src_IUpdateEventListener,src_IGameObject];
src_FPSMeter.__super__ = PIXI.Sprite;
src_FPSMeter.prototype = $extend(PIXI.Sprite.prototype,{
	init: function(game) {
		this.label = new src_Label(3,3,"",{ tint : 16711680});
		this.addChild(this.label);
		var dispatcher;
		dispatcher = js_Boot.__cast(game.locator.getService("EventDispatcher") , src_IEventDispatcher);
		dispatcher.addListener(src_Events.UPDATE,this);
	}
	,get_depth: function() {
		return 3;
	}
	,update: function(dt) {
		this.label.update("FPS: " + (1.0 / dt | 0));
	}
	,__class__: src_FPSMeter
});
var src_GameScreenMask = function() {
	PIXI.Graphics.call(this);
	this.beginFill();
	this.drawRect(0,0,256,244);
	this.endFill();
};
src_GameScreenMask.__name__ = true;
src_GameScreenMask.__interfaces__ = [src_IGameObject];
src_GameScreenMask.__super__ = PIXI.Graphics;
src_GameScreenMask.prototype = $extend(PIXI.Graphics.prototype,{
	init: function(game) {
	}
	,get_depth: function() {
		return 1;
	}
	,__class__: src_GameScreenMask
});
var src_PoliceCar = function() {
	this.move_speed = 40;
	PIXI.Sprite.call(this);
	this.animation = new src_Animation();
};
src_PoliceCar.__name__ = true;
src_PoliceCar.__interfaces__ = [src_IDepthSortingEventListener,src_IUpdateEventListener,src_IGameObject];
src_PoliceCar.__super__ = PIXI.Sprite;
src_PoliceCar.prototype = $extend(PIXI.Sprite.prototype,{
	init: function(game) {
		this.y = 136;
		this.addChild(this.animation);
		var asssets;
		asssets = js_Boot.__cast(game.locator.getService("ResourceManager") , src_IResourceManager);
		this.animation.pushFrame(asssets.getTexture("police_car-1.png"));
		this.animation.pushFrame(asssets.getTexture("police_car-2.png"));
		var dispatcher;
		dispatcher = js_Boot.__cast(game.locator.getService("EventDispatcher") , src_IEventDispatcher);
		dispatcher.addListener(src_Events.UPDATE,this);
		dispatcher.addListener(src_Events.DEPTH,this);
	}
	,update: function(dt) {
		this.animation.update(dt);
		this.x -= this.move_speed * dt;
		if(this.x < -300) this.x = 255;
	}
	,get_depth: function() {
		return 3;
	}
	,zAxisSorting: function(a,b) {
		if((js_Boot.__cast(a , src_ISortableObject)).get_depth() > (js_Boot.__cast(b , src_ISortableObject)).get_depth()) return -1; else return 1;
	}
	,depthSorting: function() {
		(js_Boot.__cast(this , PIXI.Container)).children.sort($bind(this,this.zAxisSorting));
	}
	,__class__: src_PoliceCar
});
var src_Urban = function() {
	this.game = null;
	this.move_speed = 0.0;
	this.move_direction = 0;
	PIXI.Graphics.call(this);
	this.character_animation = new src_AnimationList();
	this.x = 100;
	this.y = 96;
};
src_Urban.__name__ = true;
src_Urban.__interfaces__ = [src_IUpdateEventListener,src_IGameObject];
src_Urban.__super__ = PIXI.Graphics;
src_Urban.prototype = $extend(PIXI.Graphics.prototype,{
	init: function(game) {
		var _g = this;
		this.game = game;
		var asssets;
		asssets = js_Boot.__cast(game.locator.getService("ResourceManager") , src_IResourceManager);
		this.addChild(this.character_animation);
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
		initializeAnimation(null,"uppercut",2);
		var dispatcher;
		dispatcher = js_Boot.__cast(game.locator.getService("EventDispatcher") , src_IEventDispatcher);
		dispatcher.addListener(src_Events.UPDATE,this);
		dispatcher.addListener(src_Events.RENDER,this);
	}
	,get_depth: function() {
		return 1;
	}
	,update: function(dt) {
		this.handleUserInput(this.game);
		this.character_animation.update(dt);
		this.x += this.move_direction * this.move_speed * dt;
	}
	,handleUserInput: function(game) {
		var audio;
		audio = js_Boot.__cast(game.locator.getService("AudioSystem") , src_ISoundEngine);
		var user_input;
		user_input = js_Boot.__cast(game.locator.getService("UserInput") , src_IUserInput);
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
var src_GameScreen = function(x,y) {
	if(y == null) y = 10;
	if(x == null) x = 128;
	PIXI.Container.call(this);
	this.x = x;
	this.y = y;
};
src_GameScreen.__name__ = true;
src_GameScreen.__interfaces__ = [src_IGameObject];
src_GameScreen.__super__ = PIXI.Container;
src_GameScreen.prototype = $extend(PIXI.Container.prototype,{
	init: function(game) {
		this.addChild(new src_ScrollingBackground());
		this.addChild(new src_Urban());
		this.addChild(new src_PoliceCar());
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
	}
	,get_depth: function() {
		return 1;
	}
	,__class__: src_GameScreen
});
var src_UIScreen = function() {
	PIXI.Container.call(this);
};
src_UIScreen.__name__ = true;
src_UIScreen.__interfaces__ = [src_IGameObject];
src_UIScreen.__super__ = PIXI.Container;
src_UIScreen.prototype = $extend(PIXI.Container.prototype,{
	init: function(game) {
		var user_input;
		user_input = js_Boot.__cast(game.locator.getService("UserInput") , src_IUserInput);
		this.addChild(new src_TouchButton(user_input.EASY_HIT,390,20,110,60));
		this.addChild(new src_TouchButton(user_input.STRONG_HIT,390,100,110,60));
		var virtual_joystick = new src_VirtualJoystick(5,40,120,130);
		this.addChild(virtual_joystick);
		var label = new src_Label(17,14,"TOUCH INSIDE\nTHE BOX TO ACCESS\nTHE JOYSTICK");
		this.addChild(label);
		this.addChild(new src_FPSMeter());
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			(js_Boot.__cast(entity , src_IGameObject)).init(game);
		}
	}
	,get_depth: function() {
		return 1.0;
	}
	,__class__: src_UIScreen
});
var src_TouchButton = function(key_code,x,y,w,h) {
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
src_TouchButton.__name__ = true;
src_TouchButton.__interfaces__ = [src_IGameObject];
src_TouchButton.__super__ = PIXI.Graphics;
src_TouchButton.prototype = $extend(PIXI.Graphics.prototype,{
	init: function(game) {
		this.interactive = true;
		this.buttonMode = true;
		this.user_input = js_Boot.__cast(game.locator.getService("UserInput") , src_IUserInput);
		this.on("touchstart",$bind(this,this.touchStartEventHandler));
		this.on("touchend",$bind(this,this.touchEndEventHandler));
		this.on("touchendoutside",$bind(this,this.touchEndEventHandler));
		this.on("mousedown",$bind(this,this.touchStartEventHandler));
		this.on("mouseup",$bind(this,this.touchEndEventHandler));
		this.on("mouseupoutside",$bind(this,this.touchEndEventHandler));
	}
	,isValidTouch: function(e) {
		return this.is_enabled && this.touch_identifier == src_utils_Utils.getTouchIdentifier(e);
	}
	,touchStartEventHandler: function(e) {
		if(!this.is_enabled) {
			this.is_enabled = true;
			this.touch_identifier = src_utils_Utils.getTouchIdentifier(e);
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
	,get_depth: function() {
		return 1.0;
	}
	,__class__: src_TouchButton
});
var src_VirtualJoystick = function(x,y,w,h) {
	if(h == null) h = 180;
	if(w == null) w = 512;
	if(y == null) y = 0.0;
	if(x == null) x = 0.0;
	this.touch_identifier = null;
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
src_VirtualJoystick.__name__ = true;
src_VirtualJoystick.__interfaces__ = [src_IGameObject];
src_VirtualJoystick.__super__ = PIXI.Graphics;
src_VirtualJoystick.prototype = $extend(PIXI.Graphics.prototype,{
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
		this.user_input = js_Boot.__cast(game.locator.getService("UserInput") , src_IUserInput);
	}
	,isValidTouch: function(e) {
		return this.is_enabled && this.touch_identifier == src_utils_Utils.getTouchIdentifier(e);
	}
	,touchStartEventHandler: function(e) {
		if(!this.is_enabled) {
			this.is_enabled = true;
			this.touch_identifier = src_utils_Utils.getTouchIdentifier(e);
			var position = e.data.getLocalPosition(this);
			this.start_position_x = position.x;
			this.start_position_y = position.y;
			this.drawObject(this.border,position.x,position.y,30,-65536);
			this.drawObject(this.stick,position.x,position.y,25,-16711936);
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
		}
	}
	,drawObject: function(object,x,y,radius,color) {
		object.beginFill(color);
		object.lineStyle(1,-1);
		object.drawCircle(x,y,radius);
		object.endFill();
	}
	,get_depth: function() {
		return 1;
	}
	,__class__: src_VirtualJoystick
});
var src_GameScene = function() {
	this.game = null;
	PIXI.Container.call(this);
};
src_GameScene.__name__ = true;
src_GameScene.__interfaces__ = [src_IScene];
src_GameScene.__super__ = PIXI.Container;
src_GameScene.prototype = $extend(PIXI.Container.prototype,{
	init: function(game) {
		this.game = game;
		this.addChild(new src_GameScreen());
		this.addChild(new src_UIScreen());
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			(js_Boot.__cast(entity , src_IGameObject)).init(game);
		}
		this.dispatcher = js_Boot.__cast(game.locator.getService("EventDispatcher") , src_IEventDispatcher);
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
		var update_event = new src_UpdateEvent(dt);
		this.dispatcher.dispatch(src_Events.UPDATE,update_event);
		this.dispatcher.dispatch(src_Events.DEPTH,new src_DepthSortingEvent());
		(js_Boot.__cast(this.game.locator.getService("GraphicEngine") , src_IGraphicEngine)).render(this);
	}
	,__class__: src_GameScene
});
var src_SceneManager = function() {
	this.scene_list = new haxe_ds_StringMap();
	this.current_scene = "undefined";
};
src_SceneManager.__name__ = true;
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
var src_Game = function(width,height) {
	if(height == null) height = 180.0;
	if(width == null) width = 512.0;
	this.window_width = width;
	this.window_height = height;
	this.scene_manager = new src_SceneManager();
	this.locator = new src_ServiceLocator();
	window.addEventListener("resize",$bind(this,this.resize),false);
	window.addEventListener("onbeforeunload",$bind(this,this.destroy),false);
};
src_Game.__name__ = true;
src_Game.__interfaces__ = [src_IGame];
src_Game.main = function() {
	var custom_loader = null;
	var preloader = new src_ResourceLoader();
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
		this.locator.provide("EventDispatcher",new src_EventDispatcher());
		this.locator.provide("AudioSystem",new src_AudioEngine());
		this.locator.provide("GraphicEngine",new src_GraphicsEngine(this.window_width,this.window_height));
		this.locator.provide("PhysicsEngine",new src_PhysicsEngine());
		this.locator.provide("UserInput",new src_UserInput());
		this.locator.provide("ResourceManager",new src_ResourceManager(_resources));
		this.locator.getService("EventDispatcher").init();
		this.locator.getService("AudioSystem").init();
		this.locator.getService("GraphicEngine").init();
		this.locator.getService("PhysicsEngine").init();
		this.locator.getService("UserInput").init();
		this.locator.getService("ResourceManager").init();
		this.scene_manager.pushScene("Intro",new src_GameScene());
		this.scene_manager.pushScene("MainMenu",new src_GameScene());
		this.scene_manager.pushScene("Intro",new src_GameScene());
		this.scene_manager.pushScene("Intro",new src_GameScene());
		this.scene_manager.setScene("Intro");
		this.scene_manager.getScene().init(this);
	}
	,destroy: function() {
		this.scene_manager.destroyScene(this);
		this.locator.destroyAll();
		window.removeEventListener("resize",$bind(this,this.resize),false);
		window.removeEventListener("deviceOrientation",$bind(this,this.resize),false);
		window.removeEventListener("onbeforeunload",$bind(this,this.destroy),false);
	}
	,resize: function() {
		var actual_width = window.innerWidth;
		var actual_height = window.innerHeight;
		var ratio_scale = Math.min(actual_width / this.window_width,actual_height / this.window_height);
		ratio_scale = Math.floor(ratio_scale * 0.8);
		if(ratio_scale == 0.0) ratio_scale = 1.0;
		this.scene_manager.scaleScene(ratio_scale);
		(js_Boot.__cast(this.locator.getService("GraphicEngine") , src_IGraphicEngine)).resize(this.window_width * ratio_scale,this.window_height * ratio_scale);
		window.scrollTo(0,0);
	}
	,resume: function() {
		src_TickManager.instance.pushBack(($_=this.scene_manager,$bind($_,$_.update)));
	}
	,__class__: src_Game
};
var src_math_SimpleMath = function() { };
src_math_SimpleMath.__name__ = true;
src_math_SimpleMath.isPositive = function(value) {
	if(value > 0.0) return true; else return false;
};
src_math_SimpleMath.isNegative = function(value) {
	if(value < 0.0) return true; else return false;
};
var src_utils_Utils = function() { };
src_utils_Utils.__name__ = true;
src_utils_Utils.getTouchIdentifier = function(e) {
	var touch_identifier = Reflect.field(e.data,"identifier");
	if(e.type == "touch") {
		var changed_touches = Reflect.field(e.data.originalEvent,"changedTouches");
		touch_identifier = Reflect.field(changed_touches[touch_identifier],"identifier");
	}
	return touch_identifier;
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
js_Boot.__toStr = {}.toString;
src_TickManager.instance = new src_TickManager();
src_Game.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
