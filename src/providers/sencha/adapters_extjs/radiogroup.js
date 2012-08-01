/*
 * Copyright (C) 2012 by CoNarrative
 */
glu.regAdapter('radiogroup', {
    extend : 'field',
    valueBindings:{
        eventName:'change',
        eventConverter:function (field, newVal) {
            return field.getValue()[field.items.getAt(0).name];
        },
        setComponentProperty:function(value,oldvalue,options,control){
            control.suspendCheckChange++;
			var obj = {};
			obj[control.items.getAt(0).name] = value;
            control.setValue(obj);
            control.lastValue = value;
            control.suspendCheckChange--;
        }
    },
	itemsBindings:{
        custom:function (context) {
            glu.provider.itemsHelper.bindItems(context);
		}
	},
	isChildArray : function(propName, value){
        return propName==='editors' || propName==='items';
    }
});

glu.regAdapter('checkboxgroup', {
    extend : 'field',
    valueBindings:{
        eventName:'change',
        eventConverter:function (control, checked) {
			var checks = [];
			for( var key in checked ){
				if( checked[key] == 'on' ){
					checks.push(key);
				}
			}
			return checks;
        },
		setComponentProperty: function(newValue, oldValue, options, control){
			var obj = {};
			for( var i = 0; i < newValue.length; i++){
				obj[newValue[i]] = true;
			}
			control.setValue(obj);
		}
    },
	itemsBindings:{
        custom:function (context) {
            glu.provider.itemsHelper.bindItems(context);
		}
	},
	isChildArray : function(propName, value){
        return propName==='editors' || propName==='items';
    }
});