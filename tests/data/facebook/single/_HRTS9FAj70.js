if (self.CavalryLogger) { CavalryLogger.start_js(["41EmE"]); }

__d('TrendingHovercard',['csx','Banzai','CSS','DOM','Hovercard','LitestandEllipsis','LitestandShareAttachment','Parent','TrendingEvent','$'],(function a(b,c,d,e,f,g,h){var i=100,j={},k={getLinksCurrentPosition:function l(m){var n=c('Parent').bySelector(c('$')(m),"._5my2");if(!n)return 0;return Number(n.getAttribute('data-position'));},registerSubtitleHack:function l(m,n){var o=c('DOM').scry(m,"._6m7")[0];if(!o)return;c('$')(n).onmouseover=function(){var p=function q(){var r=c('LitestandShareAttachment').getNumDescriptionLines(m);if(r&&r>0){c('CSS').show(o);c('LitestandEllipsis').add(o,r*c('LitestandShareAttachment').getDescriptionLineHeight());c('$')(n).onmouseover=null;}};setTimeout(p,c('Hovercard').getHideDelay()+i);setTimeout(p,c('Hovercard').getLoadingDelay()+i);};},setDialog:function l(m,n,o){var p=[n.subscribe('show',function(){c('Banzai').post('trending_hovercard',babelHelpers['extends']({},o,{trending_event:c('TrendingEvent').HOVERCARD_LOAD}));j[m]=Date.now();}),n.subscribe('hide',function(){if(Object.prototype.hasOwnProperty.call(j,m)){var q=Date.now()-j[m];if(q<0)q=0;c('Banzai').post('trending_hovercard',babelHelpers['extends']({},o,{time_spent:q,trending_event:c('TrendingEvent').HOVERCARD_UNLOAD}));delete j[m];}}),n.subscribe('destroy',function(){p.forEach(function(q){return q.unsubscribe();});p=null;})];c('Hovercard').setDialog(m,n);}};f.exports=k;}),null);
__d("XPubcontentTrendingHovercardLoggingController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("\/pubcontent\/trending\/hovercard\/logging\/",{topic_id:{type:"Int",required:true},event:{type:"String",required:true},position:{type:"Int",required:true},source:{type:"String",required:true},query_id:{type:"Int",required:true}});}),null);
__d('TrendingHovercardLogger',['TrendingHovercard','TrendingRHCLogger','XPubcontentTrendingHovercardLoggingController','AsyncRequest'],(function a(b,c,d,e,f,g){function h(j,k,l,m,n){var o=c('XPubcontentTrendingHovercardLoggingController').getURIBuilder().setInt('topic_id',l).setString('source',m).setInt('position',k).setInt('query_id',n).setString('event',j).getURI();new (c('AsyncRequest'))().setURI(o).send();}var i={registerArticleForClickEvent:function j(k,l,m,n,o){k.onclick=function(){var p=String(c('TrendingHovercard').getLinksCurrentPosition(o));if(p>0)c('TrendingRHCLogger').logHovercardArticleClick(p,l);h('hovercard_article_click',p,l,m,n);};},registerFeedLinkForClickEvent:function j(k,l,m,n,o){k.onclick=function(){var p=String(c('TrendingHovercard').getLinksCurrentPosition(o));if(p>0)c('TrendingRHCLogger').logHovercardFeedClick(p,l);h('hovercard_feed_click',p,l,m,n);};},registerHovercardForClickEvent:function j(k,l,m,n,o){k.onclick=function(){var p=String(c('TrendingHovercard').getLinksCurrentPosition(o));if(p>0)c('TrendingRHCLogger').logHovercardFeedClick(p,l);h('hovercard_context_click',p,l,m,n);};},registerShareForClickEvent:function j(k,l,m,n,o){k.onclick=function(){var p=String(c('TrendingHovercard').getLinksCurrentPosition(o));if(p>0)c('TrendingRHCLogger').logHovercardShare(p,l);h('topic_share',p,l,m,n);};},registerPlayOfHovercardVideoEvent:function j(k,l,m,n,o){k.addListener('beginPlayback',function(){h('hovercard_video_played',l,m,n,o);});}};f.exports=i;}),null);