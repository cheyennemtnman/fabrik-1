AdvancedSearch=new Class({Implements:[Options,Events],options:{},initialize:function(a){this.setOptions(a);this.trs=$A([]);if(document.id("advanced-search-add")){document.id("advanced-search-add").addEvent("click",this.addRow.bindWithEvent(this));document.id("advancedFilterTable-clearall").addEvent("click",this.resetForm.bindWithEvent(this));this.trs.each(function(b){b.inject(document.id("advanced-search-table").getElements("tr").getLast(),"after")}.bind(this))}this.watchDelete();this.watchElementList()},watchDelete:function(){$$(".advanced-search-remove-row").removeEvents();$$(".advanced-search-remove-row").addEvent("click",this.removeRow.bindWithEvent(this))},watchElementList:function(){$$("select.key").removeEvents();$$("select.key").addEvent("change",this.updateValueInput.bindWithEvent(this))},updateValueInput:function(d){var f=d.target.getParent("tr");Fabrik.loader.start(f);var a=d.target.get("value");var g=d.target.getParent().getParent().getElements("td")[3];if(a===""){g.set("html","");return}var b=Fabrik.liveSite+"index.php?option=com_fabrik&task=list.elementFilter&format=raw";var c=this.options.elementMap[a];new Request.HTML({url:b,update:g,data:{element:a,id:this.options.listid,elid:c.id,plugin:c.plugin,counter:this.options.counter},onComplete:function(){Fabrik.loader.stop(f)}}).send()},addRow:function(c){this.options.counter++;c.stop();var b=document.id("advanced-search-table").getElement("tbody").getElements("tr").getLast();var d=b.clone();d.inject(b,"after");d.getElement("td").empty().set("html",this.options.conditionList);var a=d.getElements("td");a[1].empty().set("html",this.options.elementList);a[1].adopt([new Element("input",{type:"hidden",name:"fabrik___filter[list_"+this.options.listref+"][search_type][]",value:"advanced"}),new Element("input",{type:"hidden",name:"fabrik___filter[list_"+this.options.listref+"][grouped_to_previous][]",value:"0"})]);a[2].empty().set("html",this.options.statementList);a[3].empty();this.watchDelete();this.watchElementList()},removeRow:function(c){c.stop();if($$(".advanced-search-remove-row").length>1){this.options.counter--;var b=c.target.findUp("tr");var a=new Fx.Morph(b,{duration:800,transition:Fx.Transitions.Quart.easeOut,onComplete:function(){b.dispose()}});a.start({height:0,opacity:0})}},resetForm:function(){var a=document.id("advanced-search-table");if(!a){return}a.getElements("tbody tr").each(function(c,b){if(b>=1){c.dispose()}if(b===0){c.getElements(".inputbox").each(function(d){d.selectedIndex=0});c.getElements("input").each(function(d){d.value=""})}});this.watchDelete();this.watchElementList()},deleteFilterOption:function(c){event.target.removeEvent("click",this.deleteFilterOption.bindWithEvent(this));var b=event.target.parentNode.parentNode;var a=b.parentNode;a.removeChild(b);c.stop()}});