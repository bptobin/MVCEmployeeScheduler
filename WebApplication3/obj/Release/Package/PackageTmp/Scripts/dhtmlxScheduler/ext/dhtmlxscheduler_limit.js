/*
 dhtmlxScheduler.Net v.3.2.0 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.config.limit_start=null,e.config.limit_end=null,e.config.limit_view=!1,e.config.check_limits=!0,e.config.mark_now=!0,e.config.display_marked_timespans=!0,e._temp_limit_scope=function(){function t(t,i,a,n,s){var r=e,d=[],o={_props:"map_to",matrix:"y_property"};for(var l in o){var _=o[l];if(r[l])for(var h in r[l]){var c=r[l][h],u=c[_];t[u]&&(d=r._add_timespan_zones(d,e._get_blocked_zones(i[h],t[u],a,n,s)))}}return d=r._add_timespan_zones(d,e._get_blocked_zones(i,"global",a,n,s))
}var i=null,a="dhx_time_block",n="default",s=function(e,t,i){return t instanceof Date&&i instanceof Date?(e.start_date=t,e.end_date=i):(e.days=t,e.zones=i),e},r=function(e,t,i){var n="object"==typeof e?e:{days:e};return n.type=a,n.css="",t&&(i&&(n.sections=i),n=s(n,e,t)),n};e.blockTime=function(t,i,a){var n=r(t,i,a);return e.addMarkedTimespan(n)},e.unblockTime=function(t,i,a){i=i||"fullday";var n=r(t,i,a);return e.deleteMarkedTimespan(n)},e.attachEvent("onBeforeViewChange",function(t,i,a,n){function s(t,i){var a=e.config.limit_start,n=e.config.limit_end,s=e.date.add(t,1,i);
return t.valueOf()>n.valueOf()||s<=a.valueOf()}return e.config.limit_view&&(n=n||i,a=a||t,s(n,a)&&i.valueOf()!=n.valueOf())?(setTimeout(function(){var t=s(i,a)?e.config.limit_start:i;e.setCurrentView(s(t,a)?null:t,a)},1),!1):!0}),e.checkInMarkedTimespan=function(i,a,s){a=a||n;for(var r=!0,d=new Date(i.start_date.valueOf()),o=e.date.add(d,1,"day"),l=e._marked_timespans;d<i.end_date;d=e.date.date_part(o),o=e.date.add(d,1,"day")){var _=+e.date.date_part(new Date(d)),h=d.getDay(),c=t(i,l,h,_,a);if(c)for(var u=0;u<c.length;u+=2){var v=e._get_zone_minutes(d),f=i.end_date>o||i.end_date.getDate()!=d.getDate()?1440:e._get_zone_minutes(i.end_date),g=c[u],m=c[u+1];
if(f>g&&m>v&&(r="function"==typeof s?s(i,v,f,g,m):!1,!r))break}}return!r};var d=e.checkLimitViolation=function(t){if(!t)return!0;if(!e.config.check_limits)return!0;var i=e,n=i.config,s=[];if(t.rec_type)for(var r=e.getRecDates(t),d=0;d<r.length;d++){var o=e._copy_event(t);e._lame_copy(o,r[d]),s.push(o)}else s=[t];for(var l=!0,_=0;_<s.length;_++){var h=!0,o=s[_];o._timed=e.isOneDayEvent(o),h=n.limit_start&&n.limit_end?o.start_date.valueOf()>=n.limit_start.valueOf()&&o.end_date.valueOf()<=n.limit_end.valueOf():!0,h&&(h=!e.checkInMarkedTimespan(o,a,function(e,t,a,n,s){var r=!0;
return s>=t&&t>=n&&((1440==s||s>a)&&(r=!1),e._timed&&i._drag_id&&"new-size"==i._drag_mode?(e.start_date.setHours(0),e.start_date.setMinutes(s)):r=!1),(a>=n&&s>a||n>t&&a>s)&&(e._timed&&i._drag_id&&"new-size"==i._drag_mode?(e.end_date.setHours(0),e.end_date.setMinutes(n)):r=!1),r})),h||(h=i.checkEvent("onLimitViolation")?i.callEvent("onLimitViolation",[o.id,o]):h),l=l&&h}return l||(i._drag_id=null,i._drag_mode=null),l};e._get_blocked_zones=function(e,t,i,a,n){var s=[];if(e&&e[t])for(var r=e[t],d=this._get_relevant_blocked_zones(i,a,r,n),o=0;o<d.length;o++)s=this._add_timespan_zones(s,d[o].zones);
return s},e._get_relevant_blocked_zones=function(e,t,i,a){var n=i[t]&&i[t][a]?i[t][a]:i[e]&&i[e][a]?i[e][a]:[];return n},e.attachEvent("onMouseDown",function(e){return!(e==a)}),e.attachEvent("onBeforeDrag",function(t){return t?d(e.getEvent(t)):!0}),e.attachEvent("onClick",function(t){return d(e.getEvent(t))}),e.attachEvent("onBeforeLightbox",function(t){var a=e.getEvent(t);return i=[a.start_date,a.end_date],d(a)}),e.attachEvent("onEventSave",function(t,i){if(!i.start_date||!i.end_date){var a=e.getEvent(t);
i.start_date=new Date(a.start_date),i.end_date=new Date(a.end_date)}if(i.rec_type){var n=e._lame_clone(i);return e._roll_back_dates(n),d(n)}return d(i)}),e.attachEvent("onEventAdded",function(t){if(!t)return!0;var i=e.getEvent(t);return!d(i)&&e.config.limit_start&&e.config.limit_end&&(i.start_date<e.config.limit_start&&(i.start_date=new Date(e.config.limit_start)),i.start_date.valueOf()>=e.config.limit_end.valueOf()&&(i.start_date=this.date.add(e.config.limit_end,-1,"day")),i.end_date<e.config.limit_start&&(i.end_date=new Date(e.config.limit_start)),i.end_date.valueOf()>=e.config.limit_end.valueOf()&&(i.end_date=this.date.add(e.config.limit_end,-1,"day")),i.start_date.valueOf()>=i.end_date.valueOf()&&(i.end_date=this.date.add(i.start_date,this.config.event_duration||this.config.time_step,"minute")),i._timed=this.isOneDayEvent(i)),!0
}),e.attachEvent("onEventChanged",function(t){if(!t)return!0;var a=e.getEvent(t);if(!d(a)){if(!i)return!1;a.start_date=i[0],a.end_date=i[1],a._timed=this.isOneDayEvent(a)}return!0}),e.attachEvent("onBeforeEventChanged",function(e){return d(e)}),e.attachEvent("onBeforeEventCreated",function(t){var i=e.getActionData(t).date,a={_timed:!0,start_date:i,end_date:e.date.add(i,e.config.time_step,"minute")};return d(a)}),e.attachEvent("onViewChange",function(){e._mark_now()}),e.attachEvent("onSchedulerResize",function(){return window.setTimeout(function(){e._mark_now()
},1),!0}),e.attachEvent("onTemplatesReady",function(){e._mark_now_timer=window.setInterval(function(){e._is_initialized()&&e._mark_now()},6e4)}),e._mark_now=function(t){var i="dhx_now_time";this._els[i]||(this._els[i]=[]);var a=e._currentDate(),n=this.config;if(e._remove_mark_now(),!t&&n.mark_now&&a<this._max_date&&a>this._min_date&&a.getHours()>=n.first_hour&&a.getHours()<n.last_hour){var s=this.locate_holder_day(a);this._els[i]=e._append_mark_now(s,a)}},e._append_mark_now=function(t,i){var a="dhx_now_time",n=e._get_zone_minutes(i),s={zones:[n,n+1],css:a,type:a};
if(!this._table_view){if(this._props&&this._props[this._mode]){for(var r=this._els.dhx_cal_data[0].childNodes,d=[],o=0;o<r.length-1;o++){var l=t+o;s.days=l;var _=e._render_marked_timespan(s,null,l)[0];d.push(_)}return d}return s.days=t,e._render_marked_timespan(s,null,t)}return"month"==this._mode?(s.days=+e.date.date_part(i),e._render_marked_timespan(s,null,null)):void 0},e._remove_mark_now=function(){for(var e="dhx_now_time",t=this._els[e],i=0;i<t.length;i++){var a=t[i],n=a.parentNode;n&&n.removeChild(a)
}this._els[e]=[]},e._marked_timespans={global:{}},e._get_zone_minutes=function(e){return 60*e.getHours()+e.getMinutes()},e._prepare_timespan_options=function(t){var i=[],a=[];if("fullweek"==t.days&&(t.days=[0,1,2,3,4,5,6]),t.days instanceof Array){for(var s=t.days.slice(),r=0;r<s.length;r++){var d=e._lame_clone(t);d.days=s[r],i.push.apply(i,e._prepare_timespan_options(d))}return i}if(!t||!(t.start_date&&t.end_date&&t.end_date>t.start_date||void 0!==t.days&&t.zones))return i;var o=0,l=1440;"fullday"==t.zones&&(t.zones=[o,l]),t.zones&&t.invert_zones&&(t.zones=e.invertZones(t.zones)),t.id=e.uid(),t.css=t.css||"",t.type=t.type||n;
var _=t.sections;if(_){for(var h in _)if(_.hasOwnProperty(h)){var c=_[h];c instanceof Array||(c=[c]);for(var r=0;r<c.length;r++){var u=e._lame_copy({},t);u.sections={},u.sections[h]=c[r],a.push(u)}}}else a.push(t);for(var v=0;v<a.length;v++){var f=a[v],g=f.start_date,m=f.end_date;if(g&&m)for(var p=e.date.date_part(new Date(g)),x=e.date.add(p,1,"day");m>p;){var u=e._lame_copy({},f);delete u.start_date,delete u.end_date,u.days=p.valueOf();var y=g>p?e._get_zone_minutes(g):o,b=m>x||m.getDate()!=p.getDate()?l:e._get_zone_minutes(m);
u.zones=[y,b],i.push(u),p=x,x=e.date.add(x,1,"day")}else f.days instanceof Date&&(f.days=e.date.date_part(f.days).valueOf()),f.zones=t.zones.slice(),i.push(f)}return i},e._get_dates_by_index=function(t,i,a){var n=[];i=e.date.date_part(new Date(i||e._min_date)),a=new Date(a||e._max_date);for(var s=i.getDay(),r=t-s>=0?t-s:7-i.getDay()+t,d=e.date.add(i,r,"day");a>d;d=e.date.add(d,1,"week"))n.push(d);return n},e._get_css_classes_by_config=function(e){var t=[];return e.type==a&&(t.push(a),e.css&&t.push(a+"_reset")),t.push("dhx_marked_timespan",e.css),t.join(" ")
},e._get_block_by_config=function(e){var t=document.createElement("DIV");return e.html&&("string"==typeof e.html?t.innerHTML=e.html:t.appendChild(e.html)),t},e._render_marked_timespan=function(t,i,a){var n=[],s=e.config,r=this._min_date,d=this._max_date,o=!1;if(!s.display_marked_timespans)return n;if(!a&&0!==a){if(t.days<7)a=t.days;else{var l=new Date(t.days);if(o=+l,!(+d>+l&&+l>=+r))return n;a=l.getDay()}var _=r.getDay();_>a?a=7-(_-a):a-=_}var h=t.zones,c=e._get_css_classes_by_config(t);if(e._table_view&&"month"==e._mode){var u=[],v=[];
if(i)u.push(i),v.push(a);else{v=o?[o]:e._get_dates_by_index(a);for(var f=0;f<v.length;f++)u.push(this._scales[v[f]])}for(var f=0;f<u.length;f++){i=u[f],a=v[f];var g=Math.floor((this._correct_shift(a,1)-r.valueOf())/(864e5*this._cols.length)),m=this.locate_holder_day(a,!1)%this._cols.length;if(!this._ignores[m]){var p=e._get_block_by_config(t),x=Math.max(i.offsetHeight-1,0),y=Math.max(i.offsetWidth-1,0),b=this._colsS[m],w=this._colsS.heights[g]+(this._colsS.height?this.xy.month_scale_height+2:2)-1;
p.className=c,p.style.top=w+"px",p.style.lineHeight=p.style.height=x+"px";for(var E=0;E<h.length;E+=2){var D=h[f],k=h[f+1];if(D>=k)return[];var L=p.cloneNode(!0);L.style.left=b+Math.round(D/1440*y)+"px",L.style.width=Math.round((k-D)/1440*y)+"px",i.appendChild(L),n.push(L)}}}}else{var N=a;if(this._ignores[this.locate_holder_day(a,!1)])return n;if(this._props&&this._props[this._mode]&&t.sections&&t.sections[this._mode]){var M=this._props[this._mode];N=this._get_section_sday(t.sections[this._mode]),M.size&&N>M.position+M.size&&(N=0)
}i=i?i:e.locate_holder(N);for(var f=0;f<h.length;f+=2){var D=Math.max(h[f],60*s.first_hour),k=Math.min(h[f+1],60*s.last_hour);if(D>=k){if(f+2<h.length)continue;return[]}var L=e._get_block_by_config(t);L.className=c;var O=24*this.config.hour_size_px+1,S=36e5;L.style.top=Math.round((60*D*1e3-this.config.first_hour*S)*this.config.hour_size_px/S)%O+"px",L.style.lineHeight=L.style.height=Math.max(Math.round(60*(k-D)*1e3*this.config.hour_size_px/S)%O,1)+"px",i.appendChild(L),n.push(L)}}return n},e.markTimespan=function(t){var i=e._prepare_timespan_options(t);
if(i.length){for(var a=[],n=0;n<i.length;n++){var s=i[n],r=e._render_marked_timespan(s,null,null);r.length&&a.push.apply(a,r)}return a}},e.unmarkTimespan=function(e){if(e)for(var t=0;t<e.length;t++){var i=e[t];i.parentNode&&i.parentNode.removeChild(i)}},e._marked_timespans_ids={},e.addMarkedTimespan=function(t){var i=e._prepare_timespan_options(t),a="global";if(i.length){var n=i[0].id,s=e._marked_timespans,r=e._marked_timespans_ids;r[n]||(r[n]=[]);for(var d=0;d<i.length;d++){var o=i[d],l=o.days,_=(o.zones,o.css,o.sections),h=o.type;
if(o.id=n,_){for(var c in _)if(_.hasOwnProperty(c)){s[c]||(s[c]={});var u=_[c],v=s[c];v[u]||(v[u]={}),v[u][l]||(v[u][l]={}),v[u][l][h]||(v[u][l][h]=[],e._marked_timespans_types||(e._marked_timespans_types={}),e._marked_timespans_types[h]||(e._marked_timespans_types[h]=!0));var f=v[u][l][h];o._array=f,f.push(o),r[n].push(o)}}else{s[a][l]||(s[a][l]={}),s[a][l][h]||(s[a][l][h]=[]),e._marked_timespans_types||(e._marked_timespans_types={}),e._marked_timespans_types[h]||(e._marked_timespans_types[h]=!0);
var f=s[a][l][h];o._array=f,f.push(o),r[n].push(o)}}return n}},e._add_timespan_zones=function(e,t){var i=e.slice();if(t=t.slice(),!i.length)return t;for(var a=0;a<i.length;a+=2)for(var n=i[a],s=i[a+1],r=a+2==i.length,d=0;d<t.length;d+=2){var o=t[d],l=t[d+1];if(l>s&&s>=o||n>o&&l>=n)i[a]=Math.min(n,o),i[a+1]=Math.max(s,l),a-=2;else{if(!r)continue;var _=n>o?0:2;i.splice(a+_,0,o,l)}t.splice(d--,2);break}return i},e._subtract_timespan_zones=function(e,t){for(var i=e.slice(),a=0;a<i.length;a+=2)for(var n=i[a],s=i[a+1],r=0;r<t.length;r+=2){var d=t[r],o=t[r+1];
if(o>n&&s>d){var l=!1;n>=d&&o>=s&&i.splice(a,2),d>n&&(i.splice(a,2,n,d),l=!0),s>o&&i.splice(l?a+2:a,l?0:2,o,s),a-=2;break}}return i},e.invertZones=function(t){return e._subtract_timespan_zones([0,1440],t.slice())},e._delete_marked_timespan_by_id=function(t){var i=e._marked_timespans_ids[t];if(i)for(var a=0;a<i.length;a++)for(var n=i[a],s=n._array,r=0;r<s.length;r++)if(s[r]==n){s.splice(r,1);break}},e._delete_marked_timespan_by_config=function(t){var i=e._marked_timespans,a=t.sections,s=t.days,r=t.type||n,d=[];
if(a){for(var o in a)if(a.hasOwnProperty(o)&&i[o]){var l=a[o];i[o][l]&&i[o][l][s]&&i[o][l][s][r]&&(d=i[o][l][s][r])}}else i.global[s]&&i.global[s][r]&&(d=i.global[s][r]);for(var _=0;_<d.length;_++){var h=d[_],c=e._subtract_timespan_zones(h.zones,t.zones);if(c.length)h.zones=c;else{d.splice(_,1),_--;for(var u=e._marked_timespans_ids[h.id],v=0;v<u.length;v++)if(u[v]==h){u.splice(v,1);break}}}},e.deleteMarkedTimespan=function(t){if(arguments.length||(e._marked_timespans={global:{}},e._marked_timespans_ids={},e._marked_timespans_types={}),"object"!=typeof t)e._delete_marked_timespan_by_id(t);
else{t.start_date&&t.end_date||(t.days||(t.days="fullweek"),t.zones||(t.zones="fullday"));var i=[];if(t.type)i.push(t.type);else for(var a in e._marked_timespans_types)i.push(a);for(var n=e._prepare_timespan_options(t),s=0;s<n.length;s++)for(var r=n[s],d=0;d<i.length;d++){var o=e._lame_clone(r);o.type=i[d],e._delete_marked_timespan_by_config(o)}}},e._get_types_to_render=function(t,i){var a=t?e._lame_copy({},t):{};for(var n in i||{})i.hasOwnProperty(n)&&(a[n]=i[n]);return a},e._get_configs_to_render=function(e){var t=[];
for(var i in e)e.hasOwnProperty(i)&&t.push.apply(t,e[i]);return t},e.attachEvent("onScaleAdd",function(t,i){if(!e._table_view||"month"==e._mode){var a=i.getDay(),n=i.valueOf(),s=this._mode,r=e._marked_timespans,d=[];if(this._props&&this._props[s]){var o=this._props[s],l=o.options,_=e._get_unit_index(o,i),h=l[_];if(i=e.date.date_part(new Date(this._date)),a=i.getDay(),n=i.valueOf(),r[s]&&r[s][h.key]){var c=r[s][h.key],u=e._get_types_to_render(c[a],c[n]);d.push.apply(d,e._get_configs_to_render(u))}}var v=r.global,f=v[n]||v[a];
d.push.apply(d,e._get_configs_to_render(f));for(var g=0;g<d.length;g++)e._render_marked_timespan(d[g],t,i)}}),e.dblclick_dhx_marked_timespan=function(t,i){e.config.dblclick_create||e.callEvent("onScaleDblClick",[e.getActionData(t).date,i,t]),e.addEventNow(e.getActionData(t).date,null,t)}},e._temp_limit_scope()});