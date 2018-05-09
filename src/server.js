//third party modules
const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const fs = require('fs');

//koa middleware
const app = new Koa();
const router = new Router();

//api requests
const kitsu = require('./anime.js');

//home route
router.get('/', (ctx, next) => {
   ctx.body = "hello";
});

router.get('/search', (ctx, next) => {
   let params = {};
   params.content = ctx.request.query.content || "anime";
   params.genre = ctx.request.query.genre || "default";
   params.title = ctx.request.query.title || "default";
   kitsu.search_anime(params.content ,params.genre, params.title, (err, results) => {
     if(err) console.log(err);
     else {
       let output = {
         title_en: results.data[0].attributes.titles.en,
         title_en_jp: results.data[0].attributes.titles.en_js,
         title_ja_jp: results.data[0].attributes.titles.ja_jp,
         canonicalTitle: results.data[0].attributes.canonicalTitle,
         popularityRank: results.data[0].attributes.popularityRank,
         status: results.data[0].attributes.status,
         episodeCount: results.data[0].attributes.episodeCount
       };
       console.log(output);
     }
   })
});



//router middleware
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
