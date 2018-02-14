if (self.CavalryLogger) { CavalryLogger.start_js(["HXdd9"]); }

__d("FullViewType",[],(function a(b,c,d,e,f,g){f.exports={ENTIRE_UNIT:1};}),null);
__d("VisibilityUnitType",[],(function a(b,c,d,e,f,g){f.exports={FEED_UNIT:"feed_unit",VIEWPORT:"viewport"};}),null);
__d('ViewableImpressionUtils',['csx','cx','CSS'],(function a(b,c,d,e,f,g,h,i){var j={isHorizontallyOffscreen:function k(l,m,n){var o=Math.max(m.x,0),p=Math.min(m.x+m.width,n.width);return p-o<m.width||c('CSS').matchesSelector(l,".desktop_hscroll_offscreen");}};f.exports=j;}),null);
__d('FullViewLogger',['Banzai','ScriptPath','SubscriptionsHandler','URI'],(function a(b,c,d,e,f,g){h.logFromViewableImpressionTracker=function(i){'use strict';var j=new h();j.subscribeToTrackerEvents(i);};h.prototype.subscribeToTrackerEvents=function(i){'use strict';this.subscriptionsHandler=new (c('SubscriptionsHandler'))();this.subscriptionsHandler.addSubscriptions(i.addListener('full_view',this.onFullView,this));};h.prototype.onFullView=function(i){'use strict';if(this.$FullViewLogger1())this.$FullViewLogger2(i);var j={token:i.token,fullViewType:i.fullViewType,scriptPath:c('ScriptPath').getTopViewEndpoint()};c('Banzai').post('xtrackable:full_view',j);if(this.$FullViewLogger1())this.$FullViewLogger3(j);};h.prototype.$FullViewLogger1=function(){'use strict';return 0;};h.prototype.$FullViewLogger2=function(i){'use strict';};h.prototype.$FullViewLogger3=function(i){'use strict';};function h(){'use strict';}f.exports=h;}),null);
__d("PercentVisible",[],(function a(b,c,d,e,f,g){f.exports={NO_VISIBLE:-1,VISIBLE_0_PCT:0,VISIBLE_50_PCT:50,VISIBLE_100_PCT:100};}),null);
__d('VisibilityState',[],(function a(b,c,d,e,f,g){'use strict';f.exports={TOP:'TOP',BOTTOM:'BOTTOM',FULL:'FULL',NULL:'NULL'};}),null);
__d('ViewableImpressionTracker',['AdImpressionLoggingConfig','Banzai','BrowseClientEventLogger','DataAttributeUtils','DOM','FullViewType','NonBlockingIFrame','PercentVisible','Style','URI','ViewableImpressionUtils','Visibility','VisibilityState','WebSpeedExperiments','getElementPosition','getViewportDimensions','mixInEventEmitter'],(function a(b,c,d,e,f,g){function h(i,j,k){'use strict';this.id=i;this.element=j;this.config=k;this.iframe=null;this.viewableTimeout=null;this.clearSubsequentTimeout=null;this.waitForSubsequent=false;this.waitForLogged=false;this.isNonViewableLogged=false;this.isVisible=false;this.iframeLogged=false;this.banzaiLogged=false;this.topLeftInViewport=false;this.bottomRightInViewport=false;}h.prototype.getID=function(){'use strict';return this.id;};h.prototype.getConfig=function(){'use strict';return this.config;};h.prototype.getPercentInViewport=function(){'use strict';var i=c('getViewportDimensions')(),j=c('getElementPosition')(this.element);return this.$ViewableImpressionTracker1(i,j);};h.prototype.$ViewableImpressionTracker2=function(i,j){'use strict';if(j.x<i.width&&j.x+j.width>0&&j.y<i.height&&j.y+j.height>0&&c('Style').get(this.element,'visibility')!=='hidden'&&c('Style').get(this.element,'opacity')!=='0'){var k=Math.max(j.x,0),l=Math.min(j.x+j.width,i.width),m=Math.max(j.y,0),n=Math.min(j.y+j.height,i.height);if(j.height*j.width===0)return 100;var o=100*(l-k)*(n-m)/(j.height*j.width);return o;}return 0;};h.prototype.$ViewableImpressionTracker1=function(i,j){'use strict';if(this.config.require_horizontally_onscreen&&c('ViewableImpressionUtils').isHorizontallyOffscreen(this.element,j,i))return 0;return this.$ViewableImpressionTracker2(i,j);};h.prototype.$ViewableImpressionTracker3=function(i,j){'use strict';var k=this.$ViewableImpressionTracker2(i,j);if(k===0){return c('PercentVisible').NO_VISIBLE;}else if(k<50){return c('PercentVisible').VISIBLE_0_PCT;}else if(k<100){return c('PercentVisible').VISIBLE_50_PCT;}else return c('PercentVisible').VISIBLE_100_PCT;};h.prototype.$ViewableImpressionTracker4=function(i,j){'use strict';var k=Math.max(j.y,0),l=Math.min(j.y+j.height,i.height),m=100*(l-k)/i.height;if(m<50){return c('PercentVisible').VISIBLE_0_PCT;}else if(m<100){return c('PercentVisible').VISIBLE_50_PCT;}else return c('PercentVisible').VISIBLE_100_PCT;};h.prototype.$ViewableImpressionTracker5=function(i,j){'use strict';var k=this.$ViewableImpressionTracker3(i,j);switch(k){case c('PercentVisible').VISIBLE_0_PCT:case c('PercentVisible').VISIBLE_50_PCT:case c('PercentVisible').VISIBLE_100_PCT:this.emit('viewability',{tracker:this,id:this.getID(),token:this.getToken(),percentVisible:k});break;default:this.emit('hidden',{id:this.getID(),token:this.getToken()});break;}if(this.config.should_log_viewport_duration){var l=this.$ViewableImpressionTracker4(i,j);switch(l){default:this.emit('viewport_viewability',{tracker:this,id:this.getID(),token:this.getToken(),percentVisible:l});break;}}};h.prototype.$ViewableImpressionTracker6=function(i,j){'use strict';if(c('Style').get(this.element,'visibility')==='hidden'||c('Style').get(this.element,'opacity')==='0')return false;var k=j.x,l=j.y,m=j.x+j.width,n=j.y+j.height;this.topLeftInViewport=this.topLeftInViewport||k>=0&&k<=i.width&&l>=0&&l<=i.height;this.bottomRightInViewport=this.bottomRightInViewport||m>=0&&m<=i.width&&n>=0&&n<=i.height;return this.topLeftInViewport&&this.bottomRightInViewport;};h.prototype.$ViewableImpressionTracker7=function(i,j){'use strict';if(this.hasEmittedFullViewEvent)return;if(this.$ViewableImpressionTracker6(i,j)){this.emit('full_view',{tracker:this,id:this.getID(),token:this.getToken(),fullViewType:c('FullViewType').ENTIRE_UNIT});this.hasEmittedFullViewEvent=true;}};h.prototype.$ViewableImpressionTracker8=function(i,j){'use strict';var k=j.y,l=j.y+j.height,m=k>=0&&k<=i.height,n=l>=0&&l<=i.height,o=void 0;if(m&&n){o=c('VisibilityState').FULL;}else if(m){o=c('VisibilityState').TOP;}else if(n){o=c('VisibilityState').BOTTOM;}else o=c('VisibilityState').NULL;this.emit('viewability_debug',{tracker:this,id:this.getID(),token:this.getToken(),visibleState:o});};h.prototype.$ViewableImpressionTracker9=function(event){'use strict';return !!event&&!!this.config.is_instream_story&&event.cause!=='CommercialBreak/AdsLoaded';};h.prototype.onVisible=function(event){'use strict';this.isVisible=true;var i=c('getViewportDimensions')(),j=c('getElementPosition')(this.element),k=this.$ViewableImpressionTracker1(i,j),l=k>this.config.pixel_in_percentage;this.emit('visible',{tracker:this,id:this.getID(),token:this.getToken(),percentInViewport:k});if(this.config.should_log_viewability_duration)this.$ViewableImpressionTracker5(i,j);if(this.config.should_log_debug_duration)this.$ViewableImpressionTracker8(i,j);this.$ViewableImpressionTracker7(i,j);if(!l){this.$ViewableImpressionTracker10();return;}if(this.isLogged()){this.$ViewableImpressionTracker11();}else this.$ViewableImpressionTracker12();if(!this.waitForLogged&&!this.isLogged()&&!(c('AdImpressionLoggingConfig').blockInvisible&&c('Visibility').isHidden())){this.waitForLogged=true;this.viewableTimeout=setTimeout(function(){this.waitForLogged=false;if(c('AdImpressionLoggingConfig').blockInvisible&&c('Visibility').isHidden())return;var m=this.getPercentInViewport(),n=m>this.config.pixel_in_percentage;if(!n){this.$ViewableImpressionTracker13();return;}if(!this.$ViewableImpressionTracker9(event))this.logImpression(1,{});this.$ViewableImpressionTracker11();}.bind(this),this.config.duration_in_ms);}};h.prototype.onHidden=function(){'use strict';this.emit('hidden',{id:this.getID(),token:this.getToken()});if(this.config.log_initial_nonviewable&&!this.isLogged()&&!this.isNonViewableLogged){this.logNonViewableImpression();}else if(!this.config.log_initial_nonviewable&&!this.isLogged()&&this.isVisible)this.logNonViewableImpression();this.isVisible=false;if(this.waitForLogged){this.waitForLogged=false;clearTimeout(this.viewableTimeout);}if(this.isLogged()&&!this.waitForSubsequent&&this.config.subsequent_gap_in_ms>=0){this.waitForSubsequent=true;this.clearSubsequentTimeout=setTimeout(function(){this.waitForSubsequent=false;this.reset();if(this.isVisible)this.onVisible();}.bind(this),this.config.subsequent_gap_in_ms);}this.$ViewableImpressionTracker13();};h.prototype.onRemoved=function(){'use strict';this.isVisible=false;};h.prototype.getToken=function(){'use strict';return c('DataAttributeUtils').getDataAttribute(this.element,'data-xt');};h.prototype.logImpression=function(i,j){'use strict';if(this.isLogged())return;var k=this.getToken(),l=Math.floor(Date.now()/1000),m={xt:k,isv:i,cts:l};if(c('Banzai').isEnabled('xtrackable_clientview_batch')&&this.config.should_batch||this.config.vital_mode_for_ss||this.config.signal_mode_for_ss){var n=this.config.vital_mode_for_ss?c('Banzai').VITAL:{};n.signal=this.config.signal_mode_for_ss;this.logWithBanzai(m,n);}else this.logWithIFrame(Object.assign(m,j));};h.prototype.logNonViewableImpression=function(){'use strict';if(this.config.nonviewableEnabled){var i=this.getToken();c('Banzai').post('xtrackable:nonviewable',{xt:i});}this.isNonViewableLogged=true;};h.prototype.isLogged=function(){'use strict';return this.iframeLogged||this.banzaiLogged;};h.prototype.reset=function(){'use strict';if(this.iframeLogged)this.iframeLogged=false;if(this.iframe){c('DOM').remove(this.iframe);this.iframe=null;}if(this.banzaiLogged)this.banzaiLogged=false;this.isNonViewableLogged=false;this.isVisible=false;this.waitForLogged=false;this.waitForSubsequent=false;};h.prototype.logWithBanzai=function(i,j){'use strict';this.banzaiLogged=true;c('BrowseClientEventLogger').maybeLogClientViewEvent(i);c('Banzai').post('xtrackable:clientview_batch',i,j);};h.prototype.logWithIFrame=function(i){'use strict';this.iframeLogged=true;if(c('WebSpeedExperiments').non_blocking_tracker){c('NonBlockingIFrame').loadIFrame(new (c('URI'))(this.config.impressionURL).addQueryData(i).toString());}else{this.iframe=c('DOM').create('iframe',{src:new (c('URI'))(this.config.impressionURL).addQueryData(i),width:0,height:0,frameborder:0,scrolling:'no',className:'fbEmuTracking'});this.iframe.setAttribute('aria-hidden','true');c('DOM').appendContent(this.element,this.iframe);}};h.prototype.$ViewableImpressionTracker14=function(){'use strict';return 0;};h.prototype.$ViewableImpressionTracker10=function(){'use strict';if(this.$ViewableImpressionTracker14()){c('Style').set(this.element,'background-color','#abab9a');c('Style').set(this.element,'outline','3px solid #abab9a');}};h.prototype.$ViewableImpressionTracker12=function(){'use strict';if(this.$ViewableImpressionTracker14()){c('Style').set(this.element,'background-color','#e4f70a');c('Style').set(this.element,'outline','3px solid #e4f70a');}};h.prototype.$ViewableImpressionTracker13=function(){'use strict';if(this.$ViewableImpressionTracker14()){c('Style').set(this.element,'background-color',null);c('Style').set(this.element,'outline',null);}};h.prototype.$ViewableImpressionTracker11=function(){'use strict';if(this.$ViewableImpressionTracker14()){c('Style').set(this.element,'background-color','#047515');c('Style').set(this.element,'outline','3px solid #047515');}};c('mixInEventEmitter')(h,{visible:true,hidden:true,full_view:true,viewability:true,viewport_viewability:true,viewability_debug:true});f.exports=h;}),null);
__d('ViewabilityDebugLogger',['Banzai','Map','ViewableImpressionTracker','VisibilityState','keyMirror'],(function a(b,c,d,e,f,g){'use strict';var h=c('keyMirror')({top_enter_viewport:null,top_exit_viewport:null,bottom_enter_viewport:null,bottom_exit_viewport:null});i.logFromViewableImpressionTracker=function(j){var k=new i();k.subscribeToTrackerEvents(j);};function i(){this.$ViewabilityDebugLogger1=new (c('Map'))();this.$ViewabilityDebugLogger2=new (c('Map'))();this.$ViewabilityDebugLogger3=new (c('Map'))();}i.prototype.subscribeToTrackerEvents=function(j){j.addListener('viewability_debug',this.onView.bind(this));j.addListener('hidden',this.onHidden.bind(this));};i.prototype.onView=function(event){var j=event.id,k=event.visibleState,l=Date.now(),m=this.$ViewabilityDebugLogger1.get(j),n=this.$ViewabilityDebugLogger2.get(j);switch(k){case c('VisibilityState').TOP:if(!this.$ViewabilityDebugLogger1.has(j))this.$ViewabilityDebugLogger4(event,l,c('VisibilityState').TOP);if(n){var o={token:n.token,start_ts:n.start_ts,event_type:h.bottom_exit_viewport,event_time:l};this.$ViewabilityDebugLogger5(o,j,c('VisibilityState').BOTTOM);}break;case c('VisibilityState').FULL:if(!this.$ViewabilityDebugLogger3.has(j))this.$ViewabilityDebugLogger4(event,l,c('VisibilityState').FULL);break;case c('VisibilityState').BOTTOM:if(!this.$ViewabilityDebugLogger2.has(j))this.$ViewabilityDebugLogger4(event,l,c('VisibilityState').BOTTOM);if(m){var p={token:m.token,start_ts:m.start_ts,event_type:h.top_exit_viewport,event_time:l};this.$ViewabilityDebugLogger5(p,j,c('VisibilityState').TOP);}break;case c('VisibilityState').NULL:if(m){var q={token:m.token,start_ts:m.start_ts,event_type:h.top_exit_viewport,event_time:l};this.$ViewabilityDebugLogger5(q,j,c('VisibilityState').TOP);}if(n){var r={token:n.token,start_ts:n.start_ts,event_type:h.bottom_exit_viewport,event_time:l};this.$ViewabilityDebugLogger5(r,j,c('VisibilityState').BOTTOM);}}};i.prototype.onHidden=function(event){var j=event.id,k=Date.now(),l=this.$ViewabilityDebugLogger1.get(j),m=this.$ViewabilityDebugLogger2.get(j);if(l){var n={token:l.token,start_ts:l.start_ts,event_type:h.top_exit_viewport,event_time:k};this.$ViewabilityDebugLogger5(n,j,c('VisibilityState').TOP);}if(m){var o={token:m.token,start_ts:m.start_ts,event_type:h.bottom_exit_viewport,event_time:k};this.$ViewabilityDebugLogger5(o,j,c('VisibilityState').BOTTOM);}};i.prototype.$ViewabilityDebugLogger4=function(event,j,k){var l={token:event.token,start_ts:j,event_time:j};switch(k){case c('VisibilityState').TOP:l.event_type=h.top_enter_viewport;this.$ViewabilityDebugLogger1.set(event.id,l);this.$ViewabilityDebugLogger6(l);break;case c('VisibilityState').BOTTOM:l.event_type=h.bottom_enter_viewport;this.$ViewabilityDebugLogger2.set(event.id,l);this.$ViewabilityDebugLogger6(l);break;case c('VisibilityState').FULL:this.$ViewabilityDebugLogger3.set(event.id,l);if(!this.$ViewabilityDebugLogger1.has(event.id)){var m={token:l.token,start_ts:j,event_time:j,event_type:h.top_enter_viewport};this.$ViewabilityDebugLogger1.set(event.id,m);this.$ViewabilityDebugLogger6(m);}if(!this.$ViewabilityDebugLogger2.has(event.id)){var n={token:l.token,start_ts:j,event_time:j,event_type:h.bottom_enter_viewport};this.$ViewabilityDebugLogger2.set(event.id,n);this.$ViewabilityDebugLogger6(n);}break;}};i.prototype.$ViewabilityDebugLogger6=function(j){c('Banzai').post('xtrackable:viewability_debug',j);};i.prototype.$ViewabilityDebugLogger5=function(j,k,l){c('Banzai').post('xtrackable:viewability_debug',j);switch(l){case c('VisibilityState').BOTTOM:this.$ViewabilityDebugLogger2['delete'](k);break;case c('VisibilityState').TOP:this.$ViewabilityDebugLogger1['delete'](k);break;}this.$ViewabilityDebugLogger3['delete'](k);};f.exports=i;}),null);
__d('ViewabilityDurationSegmentLogger',['Banzai','Map','PercentVisible','ViewableImpressionTracker','VisibilityUnitType'],(function a(b,c,d,e,f,g){'use strict';var h=8000;i.logFromViewableImpressionTracker=function(j){var k=new i();k.subscribeToTrackerEvents(j);};function i(){this.$ViewabilityDurationSegmentLogger1=new (c('Map'))();this.$ViewabilityDurationSegmentLogger2=new (c('Map'))();this.$ViewabilityDurationSegmentLogger3=new (c('Map'))();}i.prototype.subscribeToTrackerEvents=function(j){j.addListener('viewability',this.onViewable.bind(this));j.addListener('hidden',this.onHidden.bind(this));};i.prototype.onViewable=function(event){var j=event.id,k=event.percentVisible,l=Date.now(),m=void 0,n=void 0;switch(k){case c('PercentVisible').VISIBLE_0_PCT:m=this.$ViewabilityDurationSegmentLogger1.get(j);if(!m){this.$ViewabilityDurationSegmentLogger4(event,c('PercentVisible').VISIBLE_0_PCT,l,c('VisibilityUnitType').FEED_UNIT);}else this.$ViewabilityDurationSegmentLogger5(m,j,l);m=this.$ViewabilityDurationSegmentLogger2.get(j);if(m){n=this.$ViewabilityDurationSegmentLogger6(m,j,l,true);this.$ViewabilityDurationSegmentLogger7(n,j);}m=this.$ViewabilityDurationSegmentLogger3.get(j);if(m){n=this.$ViewabilityDurationSegmentLogger6(m,j,l,true);this.$ViewabilityDurationSegmentLogger7(n,j);}break;case c('PercentVisible').VISIBLE_50_PCT:m=this.$ViewabilityDurationSegmentLogger1.get(j);if(!m){this.$ViewabilityDurationSegmentLogger4(event,c('PercentVisible').VISIBLE_0_PCT,l,c('VisibilityUnitType').FEED_UNIT);}else this.$ViewabilityDurationSegmentLogger5(m,j,l);m=this.$ViewabilityDurationSegmentLogger2.get(j);if(!m){this.$ViewabilityDurationSegmentLogger4(event,c('PercentVisible').VISIBLE_50_PCT,l,c('VisibilityUnitType').FEED_UNIT);}else this.$ViewabilityDurationSegmentLogger5(m,j,l);m=this.$ViewabilityDurationSegmentLogger3.get(j);if(m){n=this.$ViewabilityDurationSegmentLogger6(m,j,l,true);this.$ViewabilityDurationSegmentLogger7(n,j);}break;case c('PercentVisible').VISIBLE_100_PCT:m=this.$ViewabilityDurationSegmentLogger1.get(j);if(!m){this.$ViewabilityDurationSegmentLogger4(event,c('PercentVisible').VISIBLE_0_PCT,l,c('VisibilityUnitType').FEED_UNIT);}else this.$ViewabilityDurationSegmentLogger5(m,j,l);m=this.$ViewabilityDurationSegmentLogger2.get(j);if(!m){this.$ViewabilityDurationSegmentLogger4(event,c('PercentVisible').VISIBLE_50_PCT,l,c('VisibilityUnitType').FEED_UNIT);}else this.$ViewabilityDurationSegmentLogger5(m,j,l);m=this.$ViewabilityDurationSegmentLogger3.get(j);if(!m){this.$ViewabilityDurationSegmentLogger4(event,c('PercentVisible').VISIBLE_100_PCT,l,c('VisibilityUnitType').FEED_UNIT);}else this.$ViewabilityDurationSegmentLogger5(m,j,l);break;}};i.prototype.onHidden=function(event){var j=event.id,k=Date.now(),l=this.$ViewabilityDurationSegmentLogger1.get(j),m=this.$ViewabilityDurationSegmentLogger2.get(j),n=this.$ViewabilityDurationSegmentLogger3.get(j);if(l)this.$ViewabilityDurationSegmentLogger7(this.$ViewabilityDurationSegmentLogger6(l,j,k,true),j);if(m)this.$ViewabilityDurationSegmentLogger7(this.$ViewabilityDurationSegmentLogger6(m,j,k,true),j);if(n)this.$ViewabilityDurationSegmentLogger7(this.$ViewabilityDurationSegmentLogger6(n,j,k,true),j);};i.prototype.$ViewabilityDurationSegmentLogger4=function(event,j,k,l){var m={token:event.token,startedTrackingTS:k,percentVisible:j,visibilityUnit:l,intervalMs:0,cumulativeMs:0,segmentIdx:0};switch(j){case c('PercentVisible').VISIBLE_0_PCT:this.$ViewabilityDurationSegmentLogger1.set(event.id,m);break;case c('PercentVisible').VISIBLE_50_PCT:this.$ViewabilityDurationSegmentLogger2.set(event.id,m);break;case c('PercentVisible').VISIBLE_100_PCT:this.$ViewabilityDurationSegmentLogger3.set(event.id,m);break;}};i.prototype.$ViewabilityDurationSegmentLogger6=function(j,k,l,m){var n=l-j.startedTrackingTS,o=n-j.cumulativeMs,p=j.percentVisible,q={token:j.token,startedTrackingTS:j.startedTrackingTS,percentVisible:p,visibilityUnit:j.visibilityUnit,intervalMs:o,cumulativeMs:n,segmentIdx:++j.segmentIdx};if(m)q.duration=n;switch(p){case c('PercentVisible').VISIBLE_0_PCT:this.$ViewabilityDurationSegmentLogger1.set(k,q);break;case c('PercentVisible').VISIBLE_50_PCT:this.$ViewabilityDurationSegmentLogger2.set(k,q);break;case c('PercentVisible').VISIBLE_100_PCT:this.$ViewabilityDurationSegmentLogger3.set(k,q);break;}return q;};i.prototype.$ViewabilityDurationSegmentLogger5=function(j,k,l){var m=j.intervalMs,n=l-j.startedTrackingTS-j.cumulativeMs;if(this.$ViewabilityDurationSegmentLogger8(m,n)){var o=this.$ViewabilityDurationSegmentLogger6(j,k,l,false);c('Banzai').post('xtrackable:viewability',o,c('Banzai').VITAL);}};i.prototype.$ViewabilityDurationSegmentLogger8=function(j,k){if(j>=h)return false;if(j==0)return true;if(j<1000)return k>=1000;var l=0;l=j/1000;var m=k/1000;return m>=2*l;};i.prototype.$ViewabilityDurationSegmentLogger7=function(j,k){var l=j.percentVisible;switch(l){case c('PercentVisible').VISIBLE_0_PCT:this.$ViewabilityDurationSegmentLogger1['delete'](k);break;case c('PercentVisible').VISIBLE_50_PCT:this.$ViewabilityDurationSegmentLogger2['delete'](k);break;case c('PercentVisible').VISIBLE_100_PCT:this.$ViewabilityDurationSegmentLogger3['delete'](k);break;}c('Banzai').post('xtrackable:viewability',j,c('Banzai').VITAL);};f.exports=i;}),null);
__d('ViewableImpressionDurationLogger',['Banzai','Map'],(function a(b,c,d,e,f,g){'use strict';h.logFromViewableImpressionTracker=function(i){var j=new h();j.subscribeToTrackerEvents(i);};function h(){this.$ViewableImpressionDurationLogger1=new (c('Map'))();}h.prototype.subscribeToTrackerEvents=function(i){i.addListener('visible',this.onElementVisible.bind(this));i.addListener('hidden',this.onElementHidden.bind(this));};h.prototype.onElementVisible=function(event){if(this.$ViewableImpressionDurationLogger1.get(event.id))return null;var i={token:event.token,startedTrackingTS:this.getTimeNow()};this.$ViewableImpressionDurationLogger1.set(event.id,i);return i;};h.prototype.onElementHidden=function(event){var i=this.$ViewableImpressionDurationLogger1.get(event.id);if(!i)return false;i.trackingDuration=this.getTimeNow()-i.startedTrackingTS;return this.sendLog(event.id);};h.prototype.sendLog=function(i){var j=this.$ViewableImpressionDurationLogger1.get(i);if(!j||!j.trackingDuration)return false;c('Banzai').post('xtrackable:duration',j);this.$ViewableImpressionDurationLogger1['delete'](i);return true;};h.prototype.getTimeNow=function(){return parseFloat((Date.now()/1000).toFixed(2));};f.exports=h;}),null);
__d('ViewableImpressionHeatmapLogger',['Banzai'],(function a(b,c,d,e,f,g){h.logFromViewableImpressionTracker=function(i,j){'use strict';var k=new h(j);k.subscribeToTrackerEvents(i);};function h(i){'use strict';this.loggingDurationMS=i;this.trackingEntries={};}h.prototype.subscribeToTrackerEvents=function(i){'use strict';this.visibleSubscription=i.addListener('visible',this.onElementVisible,this);this.hiddenSubscription=i.addListener('hidden',this.onElementHidden,this);};h.prototype.onElementVisible=function(i){'use strict';var j=this.getCurrentTimestamp(),k=this.trackingEntries[i.id];if(!k){k=this.createTrackingEntry(i);this.beginTracking(i.id,k);j=k.startedTrackingTS;}k.viewportProgressEvents.push({timestamp:j,percentInViewport:i.percentInViewport.toFixed(2)});};h.prototype.onElementHidden=function(i){'use strict';var j=this.getCurrentTimestamp(),k=this.trackingEntries[i.id];if(!k)return;k.viewportProgressEvents.push({timestamp:j,percentInViewport:0});};h.prototype.onTrackingCompleted=function(i){'use strict';var j=this.trackingEntries[i];j.viewportProgressEvents.push({timestamp:this.getCurrentTimestamp(),percentInViewport:j.tracker.getPercentInViewport().toFixed(2)});if(this.$ViewableImpressionHeatmapLogger1())this.$ViewableImpressionHeatmapLogger2(i,j);this.logToServer(j);delete this.trackingEntries[i];};h.prototype.logToServer=function(i){'use strict';var j=i;delete j.tracker;c('Banzai').post('xtrackable:heatmap',j);};h.prototype.beginTracking=function(i,j){'use strict';this.trackingEntries[i]=j;setTimeout(function(){return this.onTrackingCompleted(i);}.bind(this),this.loggingDurationMS);};h.prototype.createTrackingEntry=function(i){'use strict';return {tracker:i.tracker,token:i.token,startedTrackingTS:this.getCurrentTimestamp(),viewportProgressEvents:[]};};h.prototype.getCurrentTimestamp=function(){'use strict';return (Date.now()/1000).toFixed(2);};h.prototype.$ViewableImpressionHeatmapLogger1=function(){'use strict';return 0;};h.prototype.$ViewableImpressionHeatmapLogger2=function(i,j){'use strict';var k='Completed tracking for id '+i+' token='+j.token+' startedTrackingTS='+j.startedTrackingTS+'\n';j.viewportProgressEvents.forEach(function(l){k+='% in view: '+l.percentInViewport+' timestamp='+l.timestamp+'\n';});};f.exports=h;}),null);
__d('ViewableImpressionEventHandler',['DataAttributeUtils','FullViewLogger','ViewabilityDebugLogger','ViewabilityDurationSegmentLogger','ViewableImpressionDurationLogger','ViewableImpressionHeatmapLogger','ViewableImpressionTracker','VisibilityTracking'],(function a(b,c,d,e,f,g){'use strict';var h,i,j=1;h=babelHelpers.inherits(k,c('VisibilityTracking'));i=h&&h.prototype;k.prototype.extraInit=function(){this.impressionTrackers={};};k.prototype.getDataFromConfig=function(l){i.getDataFromConfig.call(this,l);this.doHeatmapLogging=l.doHeatmapLogging;this.heatmapLoggingDurationMS=l.heatmapLoggingDurationMS;l.impressionURL=l.impressionURL!==undefined?l.impressionURL:'/xti.php';l.nonviewableEnabled=l.nonviewableEnabled!==undefined?l.nonviewableEnabled:false;};k.prototype.getImpressionTracking=function(l){var m=this.getElementID(l),n=this.impressionTrackers[m];if(!n){var o=babelHelpers['extends']({},this.getConfigFromElement(l),this.config);n=new (c('ViewableImpressionTracker'))(m,l,o);this.impressionTrackers[m]=n;if(o.log_impression_duration)c('ViewableImpressionDurationLogger').logFromViewableImpressionTracker(n);if(this.doHeatmapLogging)c('ViewableImpressionHeatmapLogger').logFromViewableImpressionTracker(n,this.heatmapLoggingDurationMS);if(o.should_log_full_views)c('FullViewLogger').logFromViewableImpressionTracker(n);if(o.should_log_viewability_duration)c('ViewabilityDurationSegmentLogger').logFromViewableImpressionTracker(n);if(o.should_log_debug_duration)c('ViewabilityDebugLogger').logFromViewableImpressionTracker(n);}return n;};k.prototype.handleEvent=function(l,event){var m=this.getImpressionTracking(l);if(!m)return;if(event.name===c('VisibilityTracking').EVENT.VISIBLE){m.onVisible(event);if(!this.visibleElementInfo[m.getID()])this.visibleElementInfo[m.getID()]={elem:l};}else if(event.name===c('VisibilityTracking').EVENT.HIDDEN){var n=m.getConfig();if(event.cause===c('VisibilityTracking').CAUSE.DEFAULT||n.log_visibility_hidden_when_browser_inactive&&event.cause===c('VisibilityTracking').CAUSE.BROWSER){m.onHidden();delete this.visibleElementInfo[m.getID()];}else if(event.cause===c('VisibilityTracking').CAUSE.REMOVED){m.onRemoved();delete this.visibleElementInfo[m.getID()];delete this.impressionTrackers[m.getID()];}}};k.prototype.getConfigFromElement=function(l){return JSON.parse(c('DataAttributeUtils').getDataAttribute(l,'data-xt-vimp'));};k.prototype.getElementID=function(l){if(!l.getAttribute('id'))l.setAttribute('id','xt_uniq_'+j++);return l.getAttribute('id');};function k(){h.apply(this,arguments);}f.exports=k;}),null);
__d('ViewableImpressionTracking',['Arbiter','DesktopHscrollUnitEventConstants','ErrorUtils','LitestandMessages','Run','ViewableImpressionEventHandler','ViewableImpressionConfig'],(function a(b,c,d,e,f,g){var h={init:function i(){if(c('ViewableImpressionEventHandler').instance===undefined){c('ViewableImpressionEventHandler').instance=new (c('ViewableImpressionEventHandler'))(c('ViewableImpressionConfig'));c('ViewableImpressionEventHandler').instance.listeners.addSubscriptions(c('Arbiter').subscribe([c('LitestandMessages').STORIES_INSERTED,'AdsRefreshHandler/AdsLoaded','MPPInsights/ChartView','PhotoSnowliftAds/displayUnits','WebMessengerAdsControl/adjustAds',c('DesktopHscrollUnitEventConstants').HSCROLL_ITEM_INSERTED_EVENT,'WebVideoChannelAds/AdsLoaded','CommercialBreak/AdsLoaded'],c('ErrorUtils').guard(function(event){c('ViewableImpressionEventHandler').instance.refreshAndFireEvent(event);},'ViewableImpressionTracking')));}c('Run').onLoad(function(){c('ViewableImpressionEventHandler').instance.refreshAndFireEvent();});}};f.exports=h;}),null);
__d('SelectorDeprecated',['Arbiter','Button','ContextualLayer','CSS','DataStore','DOM','Event','Focus','HTML','Keys','MenuDeprecated','Parent','Style','Toggler','TooltipData','URI','Vector','arrayContains','emptyFunction','getDocumentScrollElement'],(function a(b,c,d,e,f,g){var h,i,j=[],k;function l(w){return c('Parent').byClass(w,'uiSelector');}function m(w){return c('Parent').byClass(w,'uiSelectorButton');}function n(){if(!i){i=new (c('ContextualLayer'))({position:'below'},c('DOM').create('div'));c('CSS').addClass(i.getRoot(),'uiSelectorContextualLayer');}return i;}function o(w){return c('DOM').scry(w,'select')[0];}function p(w){return c('DOM').find(w,'div.uiSelectorMenuWrapper');}var q=function w(){q=c('emptyFunction');c('MenuDeprecated').subscribe('select',function(x,y){if(!h||!y||y.menu!==v.getSelectorMenu(h))return;var z=r(h),aa=s(y.item);if(aa){var ba=h,ca=v.isOptionSelected(y.item),da=v.inform('select',{selector:ba,option:y.item,clone:k});if(da===false)return;if(z||!ca){v.setSelected(ba,v.getOptionValue(y.item),!ca);v.inform('toggle',{selector:ba,option:y.item});v.inform('change',{selector:ba});c('Arbiter').inform('Form/change',{node:ba});if(t(ba))c('DataStore').set(ba,'dirty',true);}}if(!z||!aa)h&&v.toggle(h);});};function r(w){return !!w.getAttribute('data-multiple');}function s(w){return c('CSS').hasClass(w,'uiSelectorOption');}function t(w){return !!w.getAttribute('data-autosubmit');}var u=function w(){u=c('emptyFunction');var x={keydown:function y(event){var z=event.getTarget();if(c('DOM').isInputNode(z))return;switch(c('Event').getKeyCode(event)){case c('Keys').DOWN:case c('Keys').SPACE:case c('Keys').UP:if(m(z)){var aa=l(z);v.toggle(aa);return false;}break;case c('Keys').ESC:if(h){var ba=v.getSelectorButton(h);v.toggle(h);ba&&c('Focus').set(ba);return false;}break;}},mouseover:function y(event){var z=c('Parent').byAttribute(event.getTarget(),'ajaxify');if(z&&c('CSS').hasClass(z,'uiSelectorButton'))v.loadMenu(l(z));}};c('Event').listen(document.body,x);};c('Toggler').subscribe(['show','hide'],function(w,x){var y=l(x.getActive());if(y){u();q();var z=v.getSelectorButton(y),aa=v.getSelectorMenu(y),ba=w==='show';z.setAttribute('aria-expanded',ba?'true':'false');if(ba){h=y;if(c('CSS').hasClass(z,'uiButtonDisabled')){v.setEnabled(y,false);return false;}aa=aa||v.loadMenu(y);var ca=c('Style').getScrollParent(y),da=ca!==window&&ca!==c('getDocumentScrollElement')();if(da||c('CSS').hasClass(y,'uiSelectorUseLayer')){if(da)j.push(c('Event').listen(ca,'scroll',function(){x.hide();}));k=c('DOM').create('div',{className:y.className});c('CSS').addClass(k,'invisible_elem');c('Vector').getElementDimensions(y).setElementDimensions(k);c('DOM').replace(y,k);var ea=c('CSS').hasClass(y,'uiSelectorRight'),fa=c('CSS').hasClass(y,'uiSelectorBottomUp');n().setContext(k).setContent(y).setPosition(fa?'above':'below').setAlignment(ea?'right':'left').show();}c('MenuDeprecated').register(aa);var ga=c('MenuDeprecated').getCheckedItems(aa);if(!ga.length)ga=c('MenuDeprecated').getEnabledItems(aa);if(ga.length)c('MenuDeprecated').focusItem(ga[0]);}else{h=null;if(k){while(j.length)j.pop().remove();c('DOM').replace(k,y);n().hide();k=null;}aa&&c('MenuDeprecated').unregister(aa);if(t(y)&&c('DataStore').get(y,'dirty')){var ha=c('DOM').scry(y,'input.submitButton')[0];ha&&ha.click();c('DataStore').remove(y,'dirty');}}c('CSS').conditionClass(v.getSelectorButton(y),'selected',ba);v.inform(ba?'open':'close',{selector:y,clone:k});}});var v=Object.assign(new (c('Arbiter'))(),{attachMenu:function w(x,y,z){x=l(x);if(x){h&&c('MenuDeprecated').unregister(v.getSelectorMenu(h));c('DOM').setContent(p(x),y);h&&c('MenuDeprecated').register(v.getSelectorMenu(x));k&&n().updatePosition();if(z){var aa=x.getAttribute('data-name');aa&&z.setAttribute('name',aa);if(!r(x))z.setAttribute('multiple',false);var ba=o(x);if(ba){c('DOM').replace(ba,z);}else c('DOM').insertAfter(x.firstChild,z);}return true;}},getOption:function w(x,y){var z=v.getOptions(x),aa=z.length;while(aa--)if(y===v.getOptionValue(z[aa]))return z[aa];return null;},getOptions:function w(x){var y=c('MenuDeprecated').getItems(v.getSelectorMenu(x));return y.filter(s);},getEnabledOptions:function w(x){var y=c('MenuDeprecated').getEnabledItems(v.getSelectorMenu(x));return y.filter(s);},getSelectedOptions:function w(x){return c('MenuDeprecated').getCheckedItems(v.getSelectorMenu(x));},getOptionText:function w(x){return c('MenuDeprecated').getItemLabel(x);},getOptionValue:function w(x){var y=l(x),z=o(y),aa=v.getOptions(y).indexOf(x);return aa>=0?z.options[aa+1].value:'';},getSelectorButton:function w(x){return c('DOM').find(x,'a.uiSelectorButton');},getSelectorMenu:function w(x){return c('DOM').scry(x,'div.uiSelectorMenu')[0];},getValue:function w(x){var y=o(x);if(!y)return null;if(!r(x))return y.value;var z=[],aa=y.options;for(var ba=1,ca=aa.length;ba<ca;ba++)if(aa[ba].selected)z.push(aa[ba].value);return z;},isOptionSelected:function w(x){return c('MenuDeprecated').isItemChecked(x);},listen:function w(x,y,z){return this.subscribe(y,function(aa,ba){if(ba.selector===x)return z(ba,aa);});},loadMenu:function w(x,y){var z=v.getSelectorMenu(x);if(!z){var aa=v.getSelectorButton(x),ba=aa.getAttribute('ajaxify');if(ba){e(['AsyncRequest'],function(da){var ea=new (c('URI'))(ba),fa=ea.getQueryData();ea.setQueryData({});var ga=new da(ea).setData(fa).setNectarModuleDataSafe(aa).setRelativeTo(aa);y&&ga.setFinallyHandler(function(){setTimeout(y,0);});ga.send();}.bind(this));var ca=c('HTML')('<div class="uiSelectorMenuWrapper uiToggleFlyout">'+'<div class="uiMenu uiSelectorMenu loading">'+'<ul class="uiMenuInner">'+'<li><span></span></li>'+'</ul>'+'</div>'+'</div>');c('DOM').appendContent(aa.parentNode,ca);z=v.getSelectorMenu(x);aa.removeAttribute('onmouseover');}}else y&&y();return z;},setButtonLabel:function w(x,y){var z=v.getSelectorButton(x),aa=parseInt(z.getAttribute('data-length'),10);y=y||z.getAttribute('data-label')||'';c('Button').setLabel(z,y);if(typeof y==='string')if(aa&&y.length>aa){z.setAttribute('title',y);}else z.removeAttribute('title');},setButtonTooltip:function w(x,y){var z=v.getSelectorButton(x),aa=c('Parent').byTag(z,'a');aa&&c('TooltipData').set(aa,y||z.getAttribute('data-tooltip')||'');},setEnabled:function w(x,y){if(!y&&h&&l(x)===h)v.toggle(x);c('Button').setEnabled(v.getSelectorButton(x),y);},setOptionEnabled:function w(x,y){c('MenuDeprecated').setItemEnabled(x,y);},setSelected:function w(x,y,z){z=z!==false;var aa=v.getOption(x,y);if(!aa)return;var ba=v.isOptionSelected(aa);if(z!==ba){if(!r(x)&&!ba){var ca=v.getSelectedOptions(x)[0];ca&&c('MenuDeprecated').toggleItem(ca);}c('MenuDeprecated').toggleItem(aa);}v.updateSelector(x);},toggle:function w(x){c('Toggler').toggle(c('DOM').scry(l(x),'div.wrap')[0]);},updateSelector:function w(x){var y=v.getOptions(x),z=v.getSelectedOptions(x),aa=o(x).options,ba=[],ca=[];for(var da=0,ea=y.length;da<ea;da++){var fa=c('arrayContains')(z,y[da]);aa[da+1].selected=fa;if(fa){var ga=v.getOptionText(y[da]);ba.push(ga);ca.push(y[da].getAttribute('data-tooltip')||ga);}}aa[0].selected=!z.length;var ha=c('CSS').hasClass(x,'uiSelectorDynamicLabel'),ia=c('CSS').hasClass(x,'uiSelectorDynamicTooltip');if(ha||ia){var ja='';if(r(x)){var ka=v.getSelectorButton(x);ja=ka.getAttribute('data-delimiter')||', ';}ba=ba.join(ja);ca=ca.join(ja);ha&&v.setButtonLabel(x,ba);ia&&v.setButtonTooltip(x,ca);}}});f.exports=v;}),null);
__d('AdBlockerDetectorLogging',['Banzai','DataAttributeUtils','ErrorUtils','hasAdblock','Parent','Run','getElementPosition'],(function a(b,c,d,e,f,g){var h=1,i=2,j=3,k='swank',l={doAdBlockCheck:function m(n,o){c('Run').onAfterLoad(function(){c('ErrorUtils').applyWithGuard(function(){this._doAdBlockImgCheck(n,o.token||o,0);}.bind(this),this);}.bind(this));},gatherImageHiddenStyleDebugData:function m(n,o){c('Run').onAfterLoad(function(){c('ErrorUtils').applyWithGuard(function(){this._gatherImageHiddenStyleDebugData(n,o.token||o);}.bind(this),this);}.bind(this));},_gatherImageHiddenStyleDebugData:function m(n,o){if(!o||!n)return;var p=n.querySelectorAll('img'),q=[];if(p.length>0)for(var r=0;r<p.length;r++){var s=p[r],t=c('getElementPosition')(s);if(window.getComputedStyle(s).visibility==='hidden'){var u={w:t.width,h:t.height,ii:r,ic:p.length};q.push(u);}}if(q.length>0){var v=n,w=0;while(v!==null){if(w++>50)break;if(v.classList.contains('hidden_elem')||v.classList.contains('holdoutAdStory')||v.classList.contains('ego_ads_holdout'))return;v=v.parentElement;}for(r=0;r<q.length;r++)c('Banzai').post('xtrackable:'+k,{token:o,event_code:3,debug:q[r]});}},checkImageLoadStatus:function m(n){var o=this;c('ErrorUtils').applyWithGuard(function(){setTimeout(function(){o._checkImageLoadStatus(n);},10000);},o);},_doAdBlockImgCheck:function m(n,o,p){if(!o||!n)return;var q=n.querySelectorAll('img');if(q.length>0){var r=false,s=0;for(var t=0;t<q.length;t++){var u=q[t],v=c('getElementPosition')(u);if(v.width>0||v.height>0){if(window.getComputedStyle(u).visibility==='hidden')s++;r=true;}}if(!r||s>0){var w=n,x=0;while(w!==null){if(x++>50)break;if(w.classList.contains('hidden_elem')||w.classList.contains('holdoutAdStory')||w.classList.contains('ego_ads_holdout'))return;w=w.parentElement;}if(s>0)c('Banzai').post('xtrackable:'+k,{token:o,event_code:2});if(!r)c('Banzai').post('xtrackable:'+k,{token:o});}}else if(q.length===0&&o.startsWith('7.'))if(++p<5)setTimeout(function(){this._doAdBlockImgCheck(n,o,p);}.bind(this).bind(this),2500);},_checkImageLoadStatus:function m(n){var o=n.querySelector('img');if(o&&(!o.complete||!o.naturalWidth)){var p=this._findParentImpressionToken(n);c('Banzai').post('xtrackable:'+k,{token:p,event_code:1});}},_findParentImpressionToken:function m(n){var o=c('DataAttributeUtils').getParentByAttributeOrDataStoreKey(n,'data-xt','data-xt');return o?c('DataAttributeUtils').getDataAttribute(o,'data-xt'):null;},doHasAdBlockCheck:function m(){c('hasAdblock')(function(n){var o={};o[j]=n;c('Banzai').post('search_check',o);});},doBrowserExtensionCheck:function m(n,o){try{var q=document.getElementsByTagName('head')[0],r=document.documentElement.shadowRoot,s=[];if(r)s=Array.prototype.slice.call(r.querySelectorAll('style'));var t=Array.prototype.slice.call(q.querySelectorAll('style')).filter(function(v){return v&&v.textContent.length==0;}),u={};u[h]=s.length>0;u[i]=t.length>0;if(n)s.forEach(function(v){v.disabled=true;});if(o)t.forEach(function(v){v.disabled=true;});c('Banzai').post('search_check',u);}catch(p){}}};f.exports=l;}),null);