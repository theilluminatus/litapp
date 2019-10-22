webpackJsonp(
  [22],
  {
    133: function(t, e, n) {
      'use strict';
      n.d(e, 'a', function() {
        return a;
      });
      n(0);
      var o = n(61),
        r = (n.n(o), n(41), n(399)),
        s = (n(54), n(66), n(52), n(37), n(69)),
        a = (function() {
          function t(t, e, n, o, r) {
            var a = this;
            (this.api = t),
              (this.s = e),
              (this.settings = n),
              (this.user = o),
              (this.storage = r),
              (this.ready = new Promise(function(t, e) {
                Promise.all([a.settings.load(), a.user.onReady(), a.s.onReady(), a.storage.get(s.d)]).then(function(e) {
                  if (!a.settings.allSettings.cachelists || a.settings.allSettings.offlineMode || !a.user.isLoggedIn())
                    return t(), void (e[3] && a.storage.remove(s.d));
                  e[3] && (a.lists = e[3]),
                    a.query(!0).subscribe(function(e) {
                      var n = 0;
                      e.forEach(function(o, r) {
                        a.getById(o.urlname, !0).subscribe(function(o) {
                          (n += 1) === e.length && t();
                        });
                      });
                    });
                });
              }));
          }
          return (
            (t.prototype.onReady = function() {
              return this.ready;
            }),
            (t.prototype.query = function(t) {
              var e = this;
              if (this.lists) return o.Observable.of(this.lists);
              var n;
              return (
                t || (n = this.api.showLoader()),
                this.api
                  .get('3/users/' + this.user.getId() + '/lists')
                  .map(function(t) {
                    return (
                      n && n.dismiss(),
                      t.error
                        ? (e.api.showToast(), [])
                        : ((e.lists = t.map(function(t) {
                            return new r.a({
                              id: t.id,
                              urlname: t.urlname,
                              name: t.title,
                              description: t.description,
                              visibility: !t.is_private,
                              size: t.stories_count,
                              isdeletable: t.is_deletable,
                              createtimestamp: t.created_at,
                              updatetimestamp: t.updated_at,
                            });
                          })),
                          e.storage.set(s.d, e.lists),
                          e.lists)
                    );
                  })
                  .catch(function(t) {
                    return n && n.dismiss(), e.api.showToast(), console.error('lists.query', t), o.Observable.of([]);
                  })
              );
            }),
            (t.prototype.getById = function(t, e) {
              var n = this,
                r = this.lists.find(function(e) {
                  return e.urlname === t;
                });
              if (r.stories) return o.Observable.of(r);
              var a;
              return (
                e || (a = this.api.showLoader()),
                o.Observable.create(function(e) {
                  var o = function(i, l) {
                    n.getListPage(t, a, Object.assign({}, l), i).subscribe(function(t) {
                      if (t)
                        if ((l.stories ? (l.stories = l.stories.concat(t.stories)) : (l = t), t.size > l.stories.length)) {
                          var u = i + 1;
                          n.api.updateLoader(Math.round((l.stories.length / t.size) * 100) + '%'), o(u, l);
                        } else (n.lists[n.lists.indexOf(r)] = l), n.storage.set(s.d, n.lists), a && a.dismiss(), e.next(l), e.complete();
                    });
                  };
                  o(1, r);
                })
              );
            }),
            (t.prototype.getListPage = function(t, e, n, s) {
              var a = this;
              void 0 === s && (s = 1);
              var i = { page: s, sort: 'dateadd' };
              return this.api
                .get('3/users/' + this.user.getId() + '/lists/' + t, { params: JSON.stringify(i) })
                .map(function(t) {
                  return t.works.data
                    ? (n ||
                        (n = new r.a({
                          id: t.list.id,
                          urlname: t.list.urlname,
                          name: t.list.title,
                          description: t.list.description,
                          visibility: !t.list.is_private,
                          size: t.list.stories_count,
                          isdeletable: t.list.is_deletable,
                          createtimestamp: t.list.created_at,
                          updatetimestamp: t.list.updated_at,
                        })),
                      (n.stories = t.works.data.map(function(t) {
                        return a.s.extactFromList(t);
                      })),
                      n)
                    : (a.api.showToast(), null);
                })
                .catch(function(r) {
                  return e && e.dismiss(), a.api.showToast(), console.error('lists.getListPage', [t, n, s], r), o.Observable.of(null);
                });
            }),
            (t.prototype.addStory = function(t, e) {
              var n = this;
              return this.api
                .put('3/stories/' + e.id + '/lists/' + t.id, {})
                .map(function(t) {
                  return t.success || n.api.showToast(), t.success;
                })
                .catch(function(r) {
                  return n.api.showToast(), console.error('lists.addStory', [t, e], r), o.Observable.of(!1);
                })
                .subscribe(function(o) {
                  o && (t.stories || (t.stories = []), t.stories.push(e), (t.size += 1), n.storage.set(s.d, n.lists));
                });
            }),
            (t.prototype.removeStory = function(t, e) {
              var n = this;
              return this.api
                .delete('3/stories/' + e.id + '/lists/' + t.id)
                .map(function(t) {
                  return t.success || n.api.showToast(), t.success;
                })
                .catch(function(r) {
                  return n.api.showToast(), console.error('lists.removeStory', [t, e], r), o.Observable.of(!1);
                })
                .subscribe(function(o) {
                  if (o) {
                    if (!t.stories) return;
                    t.stories.forEach(function(n, o) {
                      n.id === e.id && t.stories.splice(o, 1);
                    }),
                      (t.size = -1),
                      n.storage.set(s.d, n.lists);
                  }
                });
            }),
            (t.prototype.add = function(t) {
              var e = this,
                n = { title: t.name, description: t.description, isPrivate: t.visibility ? 0 : 1 };
              return this.api
                .post('3/users/' + this.user.getId() + '/lists', n, void 0, !1)
                .map(function(t) {
                  return t.success
                    ? (e.lists.push(
                        new r.a({
                          id: t.list.id,
                          urlname: t.list.urlname,
                          name: t.list.title,
                          description: t.list.description,
                          visibility: !t.list.is_private,
                          size: t.list.stories_count,
                          isdeletable: t.list.is_deletable,
                          createtimestamp: t.list.created_at,
                        }),
                      ),
                      e.storage.set(s.d, e.lists),
                      !0)
                    : (e.api.showToast(), !1);
                })
                .catch(function(n) {
                  return e.api.showToast(), console.error('lists.add', [t], n), o.Observable.of(!1);
                });
            }),
            (t.prototype.edit = function(t) {
              var e = this;
              return this.api
                .patch('3/lists/' + t.id, { title: t.name, description: t.description, isPrivate: t.visibility ? 0 : 1 })
                .map(function(n) {
                  return n.success
                    ? (e.lists.forEach(function(e) {
                        e.id === t.id &&
                          ((e.name = n.list.title), (e.description = n.list.description), (e.visibility = !n.list.is_private));
                      }),
                      e.storage.set(s.d, e.lists),
                      !0)
                    : (e.api.showToast(n.error), !1);
                })
                .catch(function(n) {
                  return e.api.showToast(), console.error('lists.edit', [t], n), o.Observable.of(!1);
                });
            }),
            (t.prototype.delete = function(t) {
              var e = this;
              return this.api
                .delete('3/lists/' + t.id)
                .map(function(n) {
                  return n.success
                    ? (e.lists.forEach(function(n, o) {
                        n.urlname === t.urlname && e.lists.splice(o, 1);
                      }),
                      e.storage.set(s.d, e.lists),
                      !0)
                    : (e.api.showToast(n.error), !1);
                })
                .catch(function(n) {
                  return e.api.showToast(), console.error('lists.delete', [t], n), o.Observable.of(!1);
                });
            }),
            (t.prototype.refresh = function() {
              return this.storage.remove(s.d), (this.lists = null), this.query();
            }),
            t
          );
        })();
    },
    140: function(t, e, n) {
      'use strict';
      n.d(e, 'a', function() {
        return r;
      });
      n(0), n(171), n(68);
      var o = n(395),
        r =
          (n(54),
          (function() {
            function t(t, e, n) {
              var r = this;
              (this.g = t),
                (this.settings = e),
                (this.googleAnalytics = n),
                Promise.all([this.settings.load(), this.g.onReady()]).then(function() {
                  if (!r.settings.allSettings.offlineMode)
                    try {
                      Promise.all([
                        r.googleAnalytics.startTrackerWithId('UA-142185587-2', 120),
                        r.googleAnalytics.setAnonymizeIp(!0),
                        r.googleAnalytics.setAllowIDFACollection(!1),
                        r.googleAnalytics.setAppVersion(r.g.getVersion().toString()),
                      ])
                        .then(function() {
                          r.track('Startup');
                        })
                        .catch(function(t) {
                          return Object(o.a)(t);
                        });
                    } catch (t) {
                      Object(o.a)(t);
                    }
                });
            }
            return (
              (t.prototype.track = function(t) {
                console.info('Track', t), this.settings.allSettings.offlineMode || this.googleAnalytics.trackView(t);
              }),
              t
            );
          })());
    },
    141: function(t, e, n) {
      'use strict';
      n(0), n(1);
      var o = n(61),
        r =
          (n(41),
          (function() {
            return function(t) {
              for (var e in t) this[e] = t[e];
            };
          })()),
        s = (n(66), n(94), n(52), n(54), n(69));
      n(37);
      n.d(e, 'a', function() {
        return a;
      });
      var a = (function() {
        function t(t, e, n, o, r, a) {
          var i = this;
          (this.api = t),
            (this.s = e),
            (this.a = n),
            (this.user = o),
            (this.settings = r),
            (this.storage = a),
            (this.timeout = 6e5),
            (this.feedtimeout = new Date().getTime() + this.timeout),
            (this.feedbadge = ''),
            (this.ready = new Promise(function(t, e) {
              Promise.all([i.settings.load(), i.user.onReady()]).then(function() {
                i.settings.allSettings.checkforfeedupdates && !i.settings.allSettings.offlineMode && i.user.isLoggedIn()
                  ? ((i.feedbadge = '·'),
                    i.query().subscribe(function(e) {
                      e
                        ? i.storage.get(s.a).then(function(n) {
                            for (var o = 0; o < e.length; o += 1)
                              if (n === e[o].id) {
                                i.feedbadge = String(o);
                                break;
                              }
                            '' === i.feedbadge && (i.feedbadge = '15+'), t();
                          })
                        : t();
                    }))
                  : t();
              });
            }));
        }
        return (
          (t.prototype.onReady = function() {
            return this.ready;
          }),
          (t.prototype.query = function(t, e, n) {
            var s = this;
            if ((void 0 === n && (n = !1), !n && !t && this.feed && new Date().getTime() < this.feedtimeout))
              return o.Observable.of(this.feed);
            (t && this.feed) || (this.feed = []);
            var a;
            e && (a = this.api.showLoader());
            var i = { chunked: 1, limit: 10 };
            return (
              t && (i.last_id = t),
              this.api
                .get('3/activity/wall?params=' + JSON.stringify(i))
                .map(function(t) {
                  if ((a && a.dismiss(), !t.data)) return s.api.showToast(), [];
                  var e = t.data.map(function(t) {
                    var e = 'published-story' === t.action;
                    try {
                      return new r({
                        id: t.id,
                        timestamp: t.when,
                        author: s.a.extractFromFeed(t.who),
                        text: e ? [] : Array.isArray(t.what) ? t.what : ['their profile'],
                        story: e ? s.s.extractFromFeed(t) : void 0,
                      });
                    } catch (t) {
                      return new r(null);
                    }
                  });
                  return (
                    e.forEach(function(t) {
                      return s.feed.push(t);
                    }),
                    (s.feedtimeout = new Date().getTime() + s.timeout),
                    e
                  );
                })
                .catch(function(e) {
                  return a && a.dismiss(), s.api.showToast(), console.error('feed.query', [t], e), o.Observable.of([]);
                })
            );
          }),
          t
        );
      })();
    },
    190: function(t, e, n) {
      'use strict';
      n(140), n(37), n(66), n(94), n(133), n(141), n(68);
      var o = n(54);
      n(52);
      n.d(e, 'a', function() {
        return o.a;
      });
    },
    242: function(t, e) {
      function n(t) {
        return Promise.resolve().then(function() {
          throw new Error("Cannot find module '" + t + "'.");
        });
      }
      (n.keys = function() {
        return [];
      }),
        (n.resolve = n),
        (t.exports = n),
        (n.id = 242);
    },
    284: function(t, e, n) {
      function o(t) {
        var e = r[t];
        return e
          ? n.e(e[1]).then(function() {
              return n(e[0]);
            })
          : Promise.reject(new Error("Cannot find module '" + t + "'."));
      }
      var r = {
        '../pages/account/account.module.ngfactory': [681, 20],
        '../pages/author/author.module.ngfactory': [682, 7],
        '../pages/explore/explore.module.ngfactory': [683, 17],
        '../pages/feed/feed.module.ngfactory': [684, 6],
        '../pages/following/following.module.ngfactory': [685, 10],
        '../pages/history/history.module.ngfactory': [686, 5],
        '../pages/list-create/list-create.module.ngfactory': [687, 13],
        '../pages/list-list/list-list.module.ngfactory': [688, 12],
        '../pages/list-view/list-view.module.ngfactory': [689, 0],
        '../pages/login/login.module.ngfactory': [690, 19],
        '../pages/search/search-popover.module.ngfactory': [691, 15],
        '../pages/search/search.module.ngfactory': [692, 1],
        '../pages/settings/settings.module.ngfactory': [693, 18],
        '../pages/story-detail/story-detail.module.ngfactory': [694, 9],
        '../pages/story-related/story-related.module.ngfactory': [695, 4],
        '../pages/story-series/story-series.module.ngfactory': [696, 3],
        '../pages/story-view/story-popover.module.ngfactory': [697, 14],
        '../pages/story-view/story-view.module.ngfactory': [698, 8],
        '../pages/tabs/tabs.module.ngfactory': [699, 21],
        '../pages/top-list/top-list.module.ngfactory': [700, 2],
        '../parts/bookmark-popover/bookmark-popover.module.ngfactory': [702, 11],
        '../parts/export-popover/export-popover.module.ngfactory': [701, 16],
      };
      (o.keys = function() {
        return Object.keys(r);
      }),
        (o.id = 284),
        (t.exports = o);
    },
    37: function(t, e, n) {
      'use strict';
      n(0);
      var o = n(152),
        r = (n(1), n(57), n(50), { CORS_PROXY: 'https://litapp-cors.herokuapp.com/' });
      n.d(e, 'a', function() {
        return a;
      });
      var s = function(t, e, n, o) {
          throw (console.info({ url: e, method: o, data: n, type: 'API_Error', name: t.name, message: t.message, stack: t.stack }), t);
        },
        a = (function() {
          function t(t, e, n, o) {
            (this.http = t),
              (this.translate = e),
              (this.loadingCtrl = n),
              (this.toastCtrl = o),
              (this.apikey = '70b3a71911b398a98d3dac695f34cf279c270ea0'),
              (this.appid = '24b7c3f9d904ebd679299b1ce5506bc305a5ab40'),
              (this.corsProxy = r.CORS_PROXY || ''),
              (this.urls = this.getUrls());
            try {
              var s = location.search.substring(1),
                a = JSON.parse(
                  '{"' +
                    decodeURI(s)
                      .replace(/"/g, '\\"')
                      .replace(/&/g, '","')
                      .replace(/=/g, '":"') +
                    '"}',
                );
              a.proxy && ((this.corsProxy = a.proxy), (this.urls = this.getUrls()));
            } catch (t) {}
          }
          return (
            (t.prototype.getUrls = function() {
              return [
                this.corsProxy + 'https://literotica.com/api',
                this.corsProxy + 'https://search.literotica.com/api',
                this.corsProxy + 'https://www.literotica.com',
                this.corsProxy + 'https://raw.githubusercontent.com/theilluminatus/litapp/master',
                this.corsProxy + 'https://literotica.com',
              ];
            }),
            (t.prototype.get = function(t, e, n, r, a) {
              if ((n || (n = { params: new o.g({ encoder: new i() }) }), e)) {
                n.params = new o.g({ encoder: new i() });
                for (var l in e) n.params = n.params.set(l, e[l]);
              }
              (n.withCredentials = !0), (n.params = n.params.set('apikey', this.apikey)), (n.params = n.params.set('appid', this.appid));
              var u = this.urls[r || 0] + '/' + t,
                c = this.http.get(u, n).catch(function(t) {
                  return s(t, u, n.params, 'GET');
                });
              return a ? c.timeout(a) : c;
            }),
            (t.prototype.post = function(t, e, n, o, r) {
              o &&
                (t.indexOf('?') > -1
                  ? (t += '&apikey=' + this.apikey + '&appid=' + this.appid)
                  : (t += '?apikey=' + this.apikey + '&appid=' + this.appid));
              var a = this.urls[r || 0] + '/' + t;
              return this.http.post(a, e, n).catch(function(t) {
                return s(t, a, e, 'POST');
              });
            }),
            (t.prototype.put = function(t, e, n) {
              var o = this.urls[0] + '/' + t;
              return this.http.put(o, e, n).catch(function(t) {
                return s(t, o, e, 'PUT');
              });
            }),
            (t.prototype.delete = function(t, e, n) {
              var o = this.urls[n || 0] + '/' + t;
              return this.http.delete(o, e).catch(function(t) {
                return s(t, o, {}, 'DELETE');
              });
            }),
            (t.prototype.patch = function(t, e, n) {
              var o = this.urls[0] + '/' + t;
              return this.http.patch(o, e, n).catch(function(t) {
                return s(t, o, e, 'PATCH');
              });
            }),
            (t.prototype.showLoader = function() {
              var t = this;
              return this.loader
                ? this.loader
                : ((this.loader = this.loadingCtrl.create({ spinner: 'crescent' })),
                  this.loader.present(),
                  this.loader.onDidDismiss(function() {
                    t.loader = void 0;
                  }),
                  this.loader);
            }),
            (t.prototype.updateLoader = function(t) {
              this.loader && this.loader.setContent(t);
            }),
            (t.prototype.hideLoader = function() {
              this.loader && this.loader.dismiss().catch(function() {});
            }),
            (t.prototype.showToast = function(t, e, n) {
              var o = this;
              return new Promise(function(r) {
                o.translate.get(['LOAD_ERROR', 'CLOSE_BUTTON']).subscribe(function(s) {
                  o.translations = s;
                  var a = o.toastCtrl.create({
                    message: t || o.translations.LOAD_ERROR,
                    showCloseButton: !0,
                    closeButtonText: n || o.translations.CLOSE_BUTTON,
                    duration: e || 3e3,
                  });
                  a.present(),
                    a.onDidDismiss(function(t) {
                      r(a);
                    });
                });
              });
            }),
            t
          );
        })(),
        i = (function() {
          function t() {}
          return (
            (t.prototype.encodeKey = function(t) {
              return encodeURIComponent(t);
            }),
            (t.prototype.encodeValue = function(t) {
              return encodeURIComponent(t);
            }),
            (t.prototype.decodeKey = function(t) {
              return decodeURIComponent(t);
            }),
            (t.prototype.decodeValue = function(t) {
              return decodeURIComponent(t);
            }),
            t
          );
        })();
    },
    393: function(t, e, n) {
      'use strict';
      n.d(e, 'a', function() {
        return o;
      });
      var o = (function() {
        return function(t) {
          for (var e in t) this[e] = t[e];
        };
      })();
    },
    395: function(t, e, n) {
      'use strict';
      n.d(e, 'a', function() {
        return o;
      });
      var o = function(t, e) {
        if ('cordova_not_available' !== t) throw t;
        e && e(t);
      };
    },
    399: function(t, e, n) {
      'use strict';
      n.d(e, 'a', function() {
        return o;
      });
      var o = (function() {
        return function(t) {
          for (var e in t) this[e] = t[e];
        };
      })();
    },
    403: function(t, e, n) {
      'use strict';
      function o(t) {
        return new T.a(t, './assets/i18n/', '.json');
      }
      function r(t) {
        return new L.a(t, { checkforfeedupdates: !0, checkforappupdates: !0, cachelists: !0, amoledBlackTheme: !1, offlineMode: !1 });
      }
      function s(t) {
        return u._22(
          0,
          [
            (t()(),
            u.Z(
              0,
              0,
              null,
              null,
              8,
              'button',
              [['class', 'item item-block'], ['ion-item', ''], ['menuClose', '']],
              null,
              [[null, 'click']],
              function(t, e, n) {
                var o = !0,
                  r = t.component;
                if ('click' === e) {
                  o = !1 !== u._13(t, 6).close() && o;
                }
                if ('click' === e) {
                  o = !1 !== r.openLinkDialog() && o;
                }
                return o;
              },
              Y.b,
              Y.a,
            )),
            u.Y(1, 1097728, null, 3, z.a, [G.a, K.a, u.j, u.z, [2, q.a]], null, null),
            u._18(335544320, 7, { contentLabel: 0 }),
            u._18(603979776, 8, { _buttons: 1 }),
            u._18(603979776, 9, { _icons: 1 }),
            u.Y(5, 16384, null, 0, J.a, [], null, null),
            u.Y(6, 16384, null, 0, V.a, [Z.a], { menuClose: [0, 'menuClose'] }, null),
            (t()(), u._20(7, 2, ['\n            ', '\n          '])),
            u._14(131072, W.a, [X.a, u.g]),
          ],
          function(t, e) {
            t(e, 6, 0, '');
          },
          function(t, e) {
            t(e, 7, 0, u._21(e, 7, 0, u._13(e, 8).transform('MENU_OPENLINK')));
          },
        );
      }
      function a(t) {
        return u._22(
          0,
          [
            (t()(),
            u.Z(
              0,
              0,
              null,
              null,
              8,
              'button',
              [['class', 'item item-block'], ['ion-item', ''], ['menuClose', '']],
              null,
              [[null, 'click']],
              function(t, e, n) {
                var o = !0,
                  r = t.component;
                if ('click' === e) {
                  o = !1 !== u._13(t, 6).close() && o;
                }
                if ('click' === e) {
                  o = !1 !== r.openPage('AccountPage') && o;
                }
                return o;
              },
              Y.b,
              Y.a,
            )),
            u.Y(1, 1097728, null, 3, z.a, [G.a, K.a, u.j, u.z, [2, q.a]], null, null),
            u._18(335544320, 10, { contentLabel: 0 }),
            u._18(603979776, 11, { _buttons: 1 }),
            u._18(603979776, 12, { _icons: 1 }),
            u.Y(5, 16384, null, 0, J.a, [], null, null),
            u.Y(6, 16384, null, 0, V.a, [Z.a], { menuClose: [0, 'menuClose'] }, null),
            (t()(), u._20(7, 2, ['\n            ', '\n          '])),
            u._14(131072, W.a, [X.a, u.g]),
          ],
          function(t, e) {
            t(e, 6, 0, '');
          },
          function(t, e) {
            t(e, 7, 0, u._21(e, 7, 0, u._13(e, 8).transform('MENU_ACCOUNT')));
          },
        );
      }
      function i(t) {
        return u._22(
          0,
          [
            u._18(402653184, 1, { nav: 0 }),
            (t()(), u._20(-1, null, ['\n\n\n    '])),
            (t()(), u.Z(2, 0, null, null, 53, 'ion-menu', [['role', 'navigation']], null, null, null, Q.b, Q.a)),
            u._17(6144, null, $.a, null, [tt.a]),
            u.Y(4, 245760, null, 2, tt.a, [Z.a, u.j, K.a, et.a, u.z, nt.a, ot.l, rt.a, st.a], { content: [0, 'content'] }, null),
            u._18(335544320, 2, { menuContent: 0 }),
            u._18(335544320, 3, { menuNav: 0 }),
            (t()(), u._20(-1, 0, ['\n      '])),
            (t()(), u.Z(8, 0, null, 0, 12, 'ion-header', [], null, null, null, null, null)),
            u.Y(9, 16384, null, 0, at.a, [K.a, u.j, u.z, [2, it.a]], null, null),
            (t()(), u._20(-1, null, ['\n        '])),
            (t()(),
            u.Z(11, 0, null, null, 8, 'ion-toolbar', [['class', 'toolbar']], [[2, 'statusbar-padding', null]], null, null, lt.b, lt.a)),
            u.Y(12, 49152, null, 0, ut.a, [K.a, u.j, u.z], null, null),
            (t()(), u._20(-1, 3, ['\n          '])),
            (t()(), u.Z(14, 0, null, 3, 4, 'ion-title', [], null, null, null, ct.b, ct.a)),
            u.Y(15, 49152, null, 0, pt.a, [K.a, u.j, u.z, [2, ut.a], [2, dt.a]], null, null),
            (t()(), u._20(-1, 0, ['Literotica '])),
            (t()(), u.Z(17, 0, null, 0, 1, 'small', [], null, null, null, null, null)),
            (t()(), u._20(-1, null, ['(unofficial)'])),
            (t()(), u._20(-1, 3, ['\n        '])),
            (t()(), u._20(-1, null, ['\n      '])),
            (t()(), u._20(-1, 0, ['\n\n      '])),
            (t()(),
            u.Z(
              22,
              0,
              null,
              0,
              32,
              'ion-content',
              [],
              [[2, 'statusbar-padding', null], [2, 'has-refresher', null]],
              null,
              null,
              ht.b,
              ht.a,
            )),
            u.Y(23, 4374528, [[2, 4]], 0, gt.a, [K.a, et.a, rt.a, u.j, u.z, st.a, nt.a, u.u, [2, it.a], [2, ft.a]], null, null),
            (t()(), u._20(-1, 1, ['\n        '])),
            (t()(), u.Z(25, 0, null, 1, 28, 'ion-list', [], null, null, null, null, null)),
            u.Y(26, 16384, null, 0, mt.a, [K.a, u.j, u.z, et.a, ot.l, rt.a], null, null),
            (t()(), u._20(-1, null, ['\n\n          '])),
            (t()(),
            u.Z(
              28,
              0,
              null,
              null,
              8,
              'button',
              [['class', 'item item-block'], ['ion-item', ''], ['menuClose', '']],
              null,
              [[null, 'click']],
              function(t, e, n) {
                var o = !0,
                  r = t.component;
                if ('click' === e) {
                  o = !1 !== u._13(t, 34).close() && o;
                }
                if ('click' === e) {
                  o = !1 !== r.openPage('TabsPage') && o;
                }
                return o;
              },
              Y.b,
              Y.a,
            )),
            u.Y(29, 1097728, null, 3, z.a, [G.a, K.a, u.j, u.z, [2, q.a]], null, null),
            u._18(335544320, 4, { contentLabel: 0 }),
            u._18(603979776, 5, { _buttons: 1 }),
            u._18(603979776, 6, { _icons: 1 }),
            u.Y(33, 16384, null, 0, J.a, [], null, null),
            u.Y(34, 16384, null, 0, V.a, [Z.a], { menuClose: [0, 'menuClose'] }, null),
            (t()(), u._20(35, 2, ['\n            ', '\n          '])),
            u._14(131072, W.a, [X.a, u.g]),
            (t()(), u._20(-1, null, ['\n\n          '])),
            (t()(), u.U(16777216, null, null, 1, null, s)),
            u.Y(39, 16384, null, 0, yt.j, [u.I, u.F], { ngIf: [0, 'ngIf'] }, null),
            (t()(), u._20(-1, null, ['\n\n          '])),
            (t()(), u.U(16777216, null, null, 1, null, a)),
            u.Y(42, 16384, null, 0, yt.j, [u.I, u.F], { ngIf: [0, 'ngIf'] }, null),
            (t()(), u._20(-1, null, ['\n\n          '])),
            (t()(),
            u.Z(
              44,
              0,
              null,
              null,
              8,
              'button',
              [['class', 'item item-block'], ['ion-item', ''], ['menuClose', '']],
              null,
              [[null, 'click']],
              function(t, e, n) {
                var o = !0,
                  r = t.component;
                if ('click' === e) {
                  o = !1 !== u._13(t, 50).close() && o;
                }
                if ('click' === e) {
                  o = !1 !== r.openPage('SettingsPage') && o;
                }
                return o;
              },
              Y.b,
              Y.a,
            )),
            u.Y(45, 1097728, null, 3, z.a, [G.a, K.a, u.j, u.z, [2, q.a]], null, null),
            u._18(335544320, 13, { contentLabel: 0 }),
            u._18(603979776, 14, { _buttons: 1 }),
            u._18(603979776, 15, { _icons: 1 }),
            u.Y(49, 16384, null, 0, J.a, [], null, null),
            u.Y(50, 16384, null, 0, V.a, [Z.a], { menuClose: [0, 'menuClose'] }, null),
            (t()(), u._20(51, 2, ['\n            ', '\n          '])),
            u._14(131072, W.a, [X.a, u.g]),
            (t()(), u._20(-1, null, ['\n\n        '])),
            (t()(), u._20(-1, 1, ['\n      '])),
            (t()(), u._20(-1, 0, ['\n\n    '])),
            (t()(), u._20(-1, null, ['\n    '])),
            (t()(), u.Z(57, 0, null, null, 2, 'ion-nav', [['root', 'TabsPage']], null, null, null, _t.b, _t.a)),
            u._17(6144, null, $.a, null, [vt.a]),
            u.Y(
              59,
              4374528,
              [[1, 4], ['content', 4]],
              0,
              vt.a,
              [[2, it.a], [2, ft.a], st.a, K.a, et.a, u.j, u.u, u.z, u.i, ot.l, bt.a, [2, wt.a], rt.a, u.k],
              { root: [0, 'root'] },
              null,
            ),
            (t()(), u._20(-1, null, ['\n\n\n  '])),
          ],
          function(t, e) {
            var n = e.component;
            t(e, 4, 0, u._13(e, 59));
            t(e, 34, 0, '');
            t(e, 39, 0, !n.settings.allSettings.offlineMode);
            t(e, 42, 0, !n.settings.allSettings.offlineMode);
            t(e, 50, 0, '');
            t(e, 59, 0, 'TabsPage');
          },
          function(t, e) {
            t(e, 11, 0, u._13(e, 12)._sbPadding);
            t(e, 22, 0, u._13(e, 23).statusbarPadding, u._13(e, 23)._hasRefresher);
            t(e, 35, 0, u._21(e, 35, 0, u._13(e, 36).transform('MENU_HOME')));
            t(e, 51, 0, u._21(e, 51, 0, u._13(e, 52).transform('MENU_SETTINGS')));
          },
        );
      }
      Object.defineProperty(e, '__esModule', { value: !0 });
      var l = n(44),
        u = n(1),
        c = (n(0), n(152)),
        p = n(245),
        d = n(213),
        h = n(137),
        g = n(204),
        f = n(214),
        m = n(215),
        y = n(249),
        _ = n(250),
        v = n(251),
        b = n(41),
        w = n(50),
        T = n(416),
        S = (n(57), n(198)),
        O = n(222),
        P = n(223),
        N = n(124),
        C = n(171),
        k = n(224),
        L = n(190),
        E = (function() {
          function t(t, e, n, o, r, s, a, i, l, u, c, p, d, h) {
            var g = this;
            (this.platform = t),
              (this.app = e),
              (this.translate = n),
              (this.webIntent = o),
              (this.config = r),
              (this.alertCtrl = s),
              (this.toastCtrl = a),
              (this.settings = i),
              (this.analytics = l),
              (this.api = u),
              (this.g = c),
              (this.s = p),
              (this.l = d),
              (this.f = h),
              this.initTranslate(),
              this.settings.load().then(function() {
                if (
                  (g.settings.allSettings.checkforappupdates && !g.settings.allSettings.offlineMode && g.g.checkForUpdates(),
                  g.settings.allSettings.amoledBlackTheme)
                ) {
                  var t = document.createElement('link');
                  t.setAttribute('href', './assets/black-theme.css'), t.setAttribute('rel', 'stylesheet'), document.head.appendChild(t);
                }
              }),
              this.catchShareIntent(),
              this.platform.resume.subscribe(function() {
                g.catchShareIntent();
              });
          }
          return (
            (t.prototype.catchShareIntent = function() {
              var t = this;
              this.platform.is('cordova') &&
                this.webIntent.getIntent().then(function(e) {
                  'android.intent.action.SEND' === e.action && e.extras && t.openURL(e.extras['android.intent.extra.TEXT']);
                });
            }),
            (t.prototype.initTranslate = function() {
              var t = this;
              this.translate.setDefaultLang('en');
              var e = this.translate.getBrowserLang();
              if (e)
                if ('zh' === e) {
                  var n = this.translate.getBrowserCultureLang();
                  n.match(/-CN|CHS|Hans/i)
                    ? this.translate.use('zh-cmn-Hans')
                    : n.match(/-TW|CHT|Hant/i) && this.translate.use('zh-cmn-Hant');
                } else this.translate.use(this.translate.getBrowserLang());
              else this.translate.use('en');
              this.translate.get(['BACK_BUTTON_TEXT']).subscribe(function(e) {
                t.config.set('ios', 'backButtonText', e.BACK_BUTTON_TEXT);
              });
            }),
            (t.prototype.openPage = function(t) {
              'TabsPage' === t.title ? this.nav.setRoot(t) : this.nav.push(t);
            }),
            (t.prototype.openLinkDialog = function(t) {
              var e = this;
              this.translate.get(['MENU_OPENLINK', 'OPENLINK_DESCRIPTION', 'OK_BUTTON', 'CANCEL_BUTTON']).subscribe(function(t) {
                e.alertCtrl
                  .create({
                    title: t.MENU_OPENLINK,
                    message: t.OPENLINK_DESCRIPTION,
                    inputs: [{ name: 'url', placeholder: 'https://www.literotica.com/...' }],
                    buttons: [
                      {
                        text: t.OK_BUTTON,
                        handler: function(t) {
                          e.openURL(t.url);
                        },
                      },
                      { text: t.CANCEL_BUTTON },
                    ],
                  })
                  .present();
              });
            }),
            (t.prototype.openURL = function(t) {
              var e = this,
                n = /literotica\.com\/s\/([-a-zA-Z0-9._+]*)/g.exec(t);
              if (n)
                return (
                  this.nav.push('SearchPage', { storyurl: n[1] }),
                  void this.translate.get(['OPENLINK_STORYWARNING']).subscribe(function(t) {
                    e.toastCtrl.create({ message: t.OPENLINK_STORYWARNING, duration: 2e3, position: 'bottom' }).present();
                  })
                );
              var o = /literotica\.com\/stories\/memberpage\.php\?.*uid=([0-9]*)/g.exec(t);
              if (o) {
                this.nav.push('AuthorPage', { author: { id: o[1] } });
              } else
                this.translate.get(['OPENLINK_UNSUPPORTED']).subscribe(function(t) {
                  e.toastCtrl.create({ message: t.OPENLINK_UNSUPPORTED, duration: 2e3, position: 'bottom' }).present();
                });
            }),
            t
          );
        })(),
        I = (function() {
          return function() {};
        })(),
        F = n(78),
        M = n(381),
        x = n(382),
        A = n(383),
        U = n(384),
        D = n(385),
        R = n(386),
        B = n(387),
        H = n(388),
        j = n(389),
        Y = n(189),
        z = n(25),
        G = n(22),
        K = n(3),
        q = n(58),
        J = n(85),
        V = n(169),
        Z = n(33),
        W = n(125),
        X = n(39),
        Q = n(402),
        $ = n(43),
        tt = n(96),
        et = n(6),
        nt = n(36),
        ot = n(10),
        rt = n(12),
        st = n(13),
        at = n(128),
        it = n(7),
        lt = n(400),
        ut = n(53),
        ct = n(390),
        pt = n(90),
        dt = n(51),
        ht = n(391),
        gt = n(31),
        ft = n(30),
        mt = n(64),
        yt = n(18),
        _t = n(401),
        vt = n(70),
        bt = n(42),
        wt = n(23),
        Tt = n(93),
        St = n(95),
        Ot = n(54),
        Pt = n(140),
        Nt = n(37),
        Ct = n(68),
        kt = n(66),
        Lt = n(133),
        Et = n(141),
        It = u.X({ encapsulation: 2, styles: [], data: {} }),
        Ft = u.V(
          'ng-component',
          E,
          function(t) {
            return u._22(
              0,
              [
                (t()(), u.Z(0, 0, null, null, 1, 'ng-component', [], null, null, null, i, It)),
                u.Y(1, 49152, null, 0, E, [et.a, st.a, X.a, N.a, K.a, Tt.a, St.a, Ot.a, Pt.a, Nt.a, Ct.a, kt.a, Lt.a, Et.a], null, null),
              ],
              null,
              null,
            );
          },
          {},
          {},
          [],
        ),
        Mt = n(179),
        xt = n(246),
        At = n(132),
        Ut = n(28),
        Dt = n(86),
        Rt = n(87),
        Bt = n(89),
        Ht = n(88),
        jt = n(126),
        Yt = n(165),
        zt = n(178),
        Gt = n(40),
        Kt = n(131),
        qt = n(191),
        Jt = n(80),
        Vt = n(59),
        Zt = n(183),
        Wt = n(108),
        Xt = n(127),
        Qt = n(181),
        $t = n(203),
        te = n(52),
        ee = n(94),
        ne = n(380),
        oe = n(180),
        re = n(170),
        se = n(182),
        ae = u.W(I, [F.b], function(t) {
          return u._10([
            u._11(512, u.i, u.S, [[8, [M.a, x.a, A.a, U.a, D.a, R.a, B.a, H.a, j.a, Ft]], [3, u.i], u.s]),
            u._11(5120, u.r, u._9, [[3, u.r]]),
            u._11(4608, yt.l, yt.k, [u.r, [2, yt.t]]),
            u._11(5120, u.b, u._0, []),
            u._11(5120, u.p, u._6, []),
            u._11(5120, u.q, u._7, []),
            u._11(4608, l.c, l.q, [yt.c]),
            u._11(6144, u.D, null, [l.c]),
            u._11(4608, l.f, Mt.a, []),
            u._11(
              5120,
              l.d,
              function(t, e, n, o, r) {
                return [new l.k(t, e), new l.o(n), new l.n(o, r)];
              },
              [yt.c, u.u, yt.c, yt.c, l.f],
            ),
            u._11(4608, l.e, l.e, [l.d, u.u]),
            u._11(135680, l.m, l.m, [yt.c]),
            u._11(4608, l.l, l.l, [l.e, l.m]),
            u._11(5120, xt.a, p.d, []),
            u._11(5120, xt.c, p.e, []),
            u._11(4608, xt.b, p.c, [xt.a, xt.c]),
            u._11(5120, u.B, p.f, [l.l, xt.b, u.u]),
            u._11(6144, l.p, null, [l.m]),
            u._11(4608, u.G, u.G, [u.u]),
            u._11(4608, l.h, l.h, [yt.c]),
            u._11(4608, l.i, l.i, [yt.c]),
            u._11(4608, At.b, p.b, [u.B, l.b]),
            u._11(4608, c.i, c.n, [yt.c, u.w, c.l]),
            u._11(4608, c.o, c.o, [c.i, c.m]),
            u._11(
              5120,
              c.a,
              function(t) {
                return [t];
              },
              [c.o],
            ),
            u._11(4608, c.k, c.k, []),
            u._11(6144, c.j, null, [c.k]),
            u._11(4608, c.h, c.h, [c.j]),
            u._11(6144, c.b, null, [c.h]),
            u._11(5120, c.f, c.p, [c.b, [2, c.a]]),
            u._11(4608, c.c, c.c, [c.f]),
            u._11(4608, Ut.r, Ut.r, []),
            u._11(4608, Ut.d, Ut.d, []),
            u._11(5120, Dt.b, o, [c.c]),
            u._11(4608, Rt.a, Rt.b, []),
            u._11(4608, Bt.b, Bt.a, []),
            u._11(4608, Ht.b, Ht.a, []),
            u._11(4608, jt.a, jt.a, []),
            u._11(4608, X.a, X.a, [jt.a, Dt.b, Rt.a, Bt.b, Ht.b, X.b, X.c]),
            u._11(4608, Yt.a, Yt.a, [st.a, K.a]),
            u._11(4608, Tt.a, Tt.a, [st.a, K.a]),
            u._11(4608, zt.a, zt.a, []),
            u._11(4608, G.a, G.a, []),
            u._11(4608, Gt.a, Gt.a, [et.a]),
            u._11(4608, nt.a, nt.a, [K.a, et.a, u.u, rt.a]),
            u._11(4608, Kt.a, Kt.a, [st.a, K.a]),
            u._11(5120, yt.g, qt.c, [yt.r, [2, yt.a], K.a]),
            u._11(4608, yt.f, yt.f, [yt.g]),
            u._11(5120, Jt.b, Jt.d, [st.a, Jt.a]),
            u._11(5120, wt.a, wt.b, [st.a, Jt.b, yt.f, Vt.b, u.i]),
            u._11(4608, Zt.a, Zt.a, [st.a, K.a, wt.a]),
            u._11(4608, Wt.a, Wt.a, [st.a, K.a]),
            u._11(4608, Xt.a, Xt.a, [st.a, K.a, wt.a]),
            u._11(4608, Qt.a, Qt.a, [K.a, et.a, rt.a, st.a, ot.l]),
            u._11(4608, St.a, St.a, [st.a, K.a]),
            u._11(4608, bt.a, bt.a, [et.a, K.a]),
            u._11(5120, $t.a, $t.c, [$t.b]),
            u._11(4608, Nt.a, Nt.a, [c.c, X.a, Kt.a, St.a]),
            u._11(5120, Ot.a, r, [$t.a]),
            u._11(4608, te.a, te.a, [Nt.a, Ot.a, $t.a, X.a, St.a]),
            u._11(4608, h.a, h.a, []),
            u._11(4608, Ct.a, Ct.a, [Nt.a, te.a, $t.a, X.a, h.a, St.a]),
            u._11(4608, C.a, C.a, []),
            u._11(4608, Pt.a, Pt.a, [Ct.a, Ot.a, C.a]),
            u._11(4608, ee.a, ee.a, [Nt.a, te.a, Kt.a, St.a]),
            u._11(4608, kt.a, kt.a, [Nt.a, ee.a, te.a, Ct.a, $t.a, X.a]),
            u._11(4608, Lt.a, Lt.a, [Nt.a, kt.a, Ot.a, te.a, $t.a]),
            u._11(4608, Et.a, Et.a, [Nt.a, kt.a, ee.a, te.a, Ot.a, $t.a]),
            u._11(4608, d.a, d.a, []),
            u._11(4608, g.a, g.a, []),
            u._11(4608, f.a, f.a, []),
            u._11(4608, m.a, m.a, []),
            u._11(4608, y.a, y.a, []),
            u._11(4608, _.a, _.a, []),
            u._11(4608, v.a, v.a, []),
            u._11(4608, S.a, S.a, []),
            u._11(4608, O.a, O.a, []),
            u._11(4608, P.a, P.a, []),
            u._11(4608, N.a, N.a, []),
            u._11(4608, k.a, k.a, []),
            u._11(512, yt.b, yt.b, []),
            u._11(512, u.k, ne.a, []),
            u._11(256, K.b, { preloadModules: !0 }, []),
            u._11(1024, oe.a, oe.b, []),
            u._11(1024, et.a, et.b, [l.b, oe.a, u.u]),
            u._11(1024, K.a, K.c, [K.b, et.a]),
            u._11(512, rt.a, rt.a, [et.a]),
            u._11(512, Z.a, Z.a, []),
            u._11(512, st.a, st.a, [K.a, et.a, [2, Z.a]]),
            u._11(512, ot.l, ot.l, [st.a]),
            u._11(
              256,
              Jt.a,
              {
                links: [
                  {
                    loadChildren: '../pages/account/account.module.ngfactory#AccountPageModuleNgFactory',
                    name: 'AccountPage',
                    segment: 'account',
                    priority: 'low',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/author/author.module.ngfactory#AuthorPageModuleNgFactory',
                    name: 'AuthorPage',
                    segment: 'author',
                    priority: 'low',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/explore/explore.module.ngfactory#ExplorePageModuleNgFactory',
                    name: 'ExplorePage',
                    segment: 'explore',
                    priority: 'high',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/feed/feed.module.ngfactory#FeedPageModuleNgFactory',
                    name: 'FeedPage',
                    segment: 'feed',
                    priority: 'high',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/following/following.module.ngfactory#FollowingPageModuleNgFactory',
                    name: 'FollowingPage',
                    segment: 'following',
                    priority: 'low',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/history/history.module.ngfactory#HistoryPageModuleNgFactory',
                    name: 'HistoryPage',
                    segment: 'history',
                    priority: 'high',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/list-create/list-create.module.ngfactory#ListCreatePageModuleNgFactory',
                    name: 'ListCreatePage',
                    segment: 'list-create',
                    priority: 'low',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/list-list/list-list.module.ngfactory#ListListPageModuleNgFactory',
                    name: 'ListListPage',
                    segment: 'list-list',
                    priority: 'high',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/list-view/list-view.module.ngfactory#ListViewPageModuleNgFactory',
                    name: 'ListViewPage',
                    segment: 'list-view',
                    priority: 'low',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/login/login.module.ngfactory#LoginPageModuleNgFactory',
                    name: 'LoginPage',
                    segment: 'login',
                    priority: 'low',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/search/search-popover.module.ngfactory#SearchPopoverModuleNgFactory',
                    name: 'SearchPopover',
                    segment: 'search-popover',
                    priority: 'low',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/search/search.module.ngfactory#SearchPageModuleNgFactory',
                    name: 'SearchPage',
                    segment: 'search',
                    priority: 'high',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/settings/settings.module.ngfactory#SettingsPageModuleNgFactory',
                    name: 'SettingsPage',
                    segment: 'settings',
                    priority: 'low',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/story-detail/story-detail.module.ngfactory#StoryDetailPageModuleNgFactory',
                    name: 'StoryDetailPage',
                    segment: 'story-detail',
                    priority: 'low',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/story-related/story-related.module.ngfactory#StoryRelatedPageModuleNgFactory',
                    name: 'StoryRelatedPage',
                    segment: 'story-related',
                    priority: 'low',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/story-series/story-series.module.ngfactory#StorySeriesPageModuleNgFactory',
                    name: 'StorySeriesPage',
                    segment: 'story-series',
                    priority: 'low',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/story-view/story-popover.module.ngfactory#StoryPopoverModuleNgFactory',
                    name: 'StoryPopover',
                    segment: 'story-popover',
                    priority: 'low',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/story-view/story-view.module.ngfactory#StoryViewPageModuleNgFactory',
                    name: 'StoryViewPage',
                    segment: 'story-view',
                    priority: 'low',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/tabs/tabs.module.ngfactory#TabsPageModuleNgFactory',
                    name: 'TabsPage',
                    segment: 'tabs',
                    priority: 'high',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../pages/top-list/top-list.module.ngfactory#TopListPageModuleNgFactory',
                    name: 'TopListPage',
                    segment: 'top-list',
                    priority: 'low',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../parts/export-popover/export-popover.module.ngfactory#ExportPopoverModuleNgFactory',
                    name: 'ExportPopover',
                    segment: 'export-popover',
                    priority: 'low',
                    defaultHistory: [],
                  },
                  {
                    loadChildren: '../parts/bookmark-popover/bookmark-popover.module.ngfactory#BookmarkPopoverModuleNgFactory',
                    name: 'BookmarkPopover',
                    segment: 'bookmark-popover',
                    priority: 'low',
                    defaultHistory: [],
                  },
                ],
              },
              [],
            ),
            u._11(512, u.h, u.h, []),
            u._11(512, re.a, re.a, [u.h]),
            u._11(1024, Vt.b, Vt.c, [re.a, u.o]),
            u._11(
              1024,
              u.c,
              function(t, e, n, o, r, s, a, i, u, c, p, d, h) {
                return [l.s(t), se.a(e), zt.b(n, o), Qt.b(r, s, a, i, u), Vt.d(c, p, d, h)];
              },
              [[2, u.t], K.a, et.a, rt.a, K.a, et.a, rt.a, st.a, ot.l, K.a, Jt.a, Vt.b, u.u],
            ),
            u._11(512, u.d, u.d, [[2, u.c]]),
            u._11(131584, u.f, u.f, [u.u, u.T, u.o, u.k, u.i, u.d]),
            u._11(512, u.e, u.e, [u.f]),
            u._11(512, l.a, l.a, [[3, l.a]]),
            u._11(512, p.a, p.a, []),
            u._11(512, c.e, c.e, []),
            u._11(512, c.d, c.d, []),
            u._11(512, w.a, w.a, []),
            u._11(512, Ut.p, Ut.p, []),
            u._11(512, Ut.g, Ut.g, []),
            u._11(512, Ut.n, Ut.n, []),
            u._11(512, qt.a, qt.a, []),
            u._11(512, b.a, b.a, []),
            u._11(512, I, I, []),
            u._11(256, c.l, 'XSRF-TOKEN', []),
            u._11(256, c.m, 'X-XSRF-TOKEN', []),
            u._11(256, X.c, void 0, []),
            u._11(256, X.b, void 0, []),
            u._11(256, F.a, E, []),
            u._11(256, yt.a, '/', []),
            u._11(256, $t.b, null, []),
          ]);
        }),
        ie = this;
      (window.consoleLog = []),
        (console = new Proxy(console, {
          get: function(t, e) {
            var n = t[e];
            return function() {
              for (var t = [], o = 0; o < arguments.length; o++) t[o] = arguments[o];
              var r = n.apply(ie, t);
              try {
                window.consoleLog.push(JSON.parse(JSON.stringify({ prop: e, args: t }))),
                  window.consoleLog.length > 75 && window.consoleLog.shift();
              } catch (t) {}
              return r;
            };
          },
        })),
        Object(u.M)(),
        Object(l.j)().bootstrapModuleFactory(ae);
    },
    52: function(t, e, n) {
      'use strict';
      n.d(e, 'a', function() {
        return i;
      });
      n(0);
      var o = n(61),
        r = (n.n(o), n(358)),
        s = (n.n(r), n(680)),
        a = (n.n(s), n(41), n(57), n(50), n(69)),
        i =
          (n(37),
          n(54),
          (function() {
            function t(t, e, n, o, r) {
              var s = this;
              (this.api = t),
                (this.settings = e),
                (this.storage = n),
                (this.translate = o),
                (this.toastCtrl = r),
                (this.ready = new Promise(function(t, e) {
                  Promise.all([s.settings.load(), s.storage.get(a.i)]).then(function(e) {
                    !s.settings.allSettings.offlineMode &&
                      e[1] &&
                      ((s.user = e[1]),
                      s.user.date + 31104e6 < new Date().getTime() &&
                        setTimeout(function() {
                          s.translate.get(['SESSIONTIMEOUT_MSG', 'CLOSE_BUTTON']).subscribe(function(t) {
                            s.toastCtrl
                              .create({
                                message: t.SESSIONTIMEOUT_MSG,
                                showCloseButton: !0,
                                closeButtonText: t.CLOSE_BUTTON,
                                duration: 15e3,
                              })
                              .present(),
                              s.removeStoredUser();
                          });
                        }, 2e3)),
                      t();
                  });
                }));
            }
            return (
              (t.prototype.onReady = function() {
                return this.ready;
              }),
              (t.prototype.login = function(t) {
                var e = this,
                  n = this.api.showLoader(),
                  r = new FormData();
                return (
                  r.append('username', t.username),
                  r.append('password', String(s.Md5.hashStr(t.password))),
                  this.api.post('2/auth/login', r, void 0, !0).map(function(r) {
                    if (!r.success) throw (n && n.dismiss(), o.Observable.throw(r));
                    e.processAndGetMoreInfo(r, t), n && n.dismiss();
                  })
                );
              }),
              (t.prototype.processAndGetMoreInfo = function(t, e) {
                (this.user = {
                  id: t.login.user.user_id,
                  username: t.login.user.username,
                  session: t.login.session_id,
                  date: new Date().getTime(),
                }),
                  this.storage.set(a.i, this.user);
                var n = new FormData();
                n.append('command', 'Login'),
                  n.append('uname', e.username),
                  n.append('pwd', e.password),
                  this.api.post('members/login.php', n, { withCredentials: !0 }, void 0, 2).subscribe();
              }),
              (t.prototype.isLoggedIn = function() {
                return this.user && !this.settings.allSettings.offlineMode;
              }),
              (t.prototype.getId = function() {
                return this.user.id;
              }),
              (t.prototype.getName = function() {
                return this.user.username;
              }),
              (t.prototype.getSession = function() {
                return this.user.session;
              }),
              (t.prototype.getDetails = function() {
                return this.user;
              }),
              (t.prototype.checkIfEverythingIsFucked = function() {
                var t = this;
                return new Promise(function(e) {
                  t.storage.get(a.i).then(function(n) {
                    JSON.stringify(t.user) !== JSON.stringify(n) ? e(!0) : e(!1);
                  });
                });
              }),
              (t.prototype.removeStoredUser = function() {
                this.storage.remove(a.i), this.storage.remove(a.a);
              }),
              (t.prototype.logout = function() {
                (this.user = null), this.removeStoredUser(), window.location.reload();
              }),
              t
            );
          })());
    },
    54: function(t, e, n) {
      'use strict';
      n.d(e, 'a', function() {
        return o;
      });
      n(0), n(41);
      var o = (function() {
        function t(t, e) {
          (this.storage = t), (this.SETTINGS_KEY = '_settings'), (this.settings = {}), (this._defaults = e);
        }
        return (
          (t.prototype.load = function() {
            var t = this;
            return this.storage.get(this.SETTINGS_KEY).then(function(e) {
              return e
                ? ((t.settings = e), t._mergeDefaults(t._defaults))
                : t.setAll(t._defaults).then(function(e) {
                    t.settings = e;
                  });
            });
          }),
          (t.prototype._mergeDefaults = function(t) {
            for (var e in t) e in this.settings || (this.settings[e] = t[e]);
            return this.setAll(this.settings);
          }),
          (t.prototype.merge = function(t) {
            for (var e in t) this.settings[e] = t[e];
            return this.save();
          }),
          (t.prototype.setValue = function(t, e) {
            return (this.settings[t] = e), this.storage.set(this.SETTINGS_KEY, this.settings);
          }),
          (t.prototype.setAll = function(t) {
            return this.storage.set(this.SETTINGS_KEY, t);
          }),
          (t.prototype.getValue = function(t) {
            return this.storage.get(this.SETTINGS_KEY).then(function(e) {
              return e[t];
            });
          }),
          (t.prototype.save = function() {
            return this.setAll(this.settings);
          }),
          Object.defineProperty(t.prototype, 'allSettings', {
            get: function() {
              return this.settings;
            },
            enumerable: !0,
            configurable: !0,
          }),
          t
        );
      })();
    },
    66: function(t, e, n) {
      'use strict';
      n.d(e, 'a', function() {
        return l;
      });
      n(0);
      var o = n(61),
        r = (n.n(o), n(41), n(50), n(393)),
        s = n(69),
        a =
          (n(94),
          n(52),
          n(68),
          n(37),
          (this && this.__assign) ||
            Object.assign ||
            function(t) {
              for (var e, n = 1, o = arguments.length; n < o; n++) {
                e = arguments[n];
                for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
              }
              return t;
            }),
        i = function(t) {
          var e = document.createElement('textarea');
          e.innerHTML = t;
          return e.value;
        },
        l = (function() {
          function t(t, e, n, o, r, a) {
            var i = this;
            (this.api = t),
              (this.a = e),
              (this.user = n),
              (this.g = o),
              (this.storage = r),
              (this.translate = a),
              (this.stories = new Map()),
              (this.ready = new Promise(function(t, e) {
                i.storage.keys().then(function(e) {
                  if (e.length < 1) t();
                  else {
                    var n = e.length - 1;
                    i.storage.forEach(function(e, o, r) {
                      0 === o.indexOf(s.h) && i.stories.set(e.id, e), r === n && t();
                    });
                  }
                });
              }));
          }
          return (
            (t.prototype.onReady = function() {
              return this.ready;
            }),
            (t.prototype.searchStory = function(t, e, n, o) {
              var r = a({ q: t }, e);
              return e.astags ? this.tagsearch(r, n) : this.newsearch(r, n);
            }),
            (t.prototype.getSeries = function(t) {
              var e = [{ property: 'series_id', value: parseInt(t) }];
              return this.search(e);
            }),
            (t.prototype.getRelated = function(t) {
              var e = [{ property: 'related_id', value: parseInt(t) }];
              return this.search(e);
            }),
            (t.prototype.getAuthorStories = function(t, e) {
              var n = [{ property: 'user_id', value: parseInt(t) }, { property: 'type', value: 'story' }];
              return this.search(n, e, null, null, '1/user-submissions');
            }),
            (t.prototype.getAuthorFavs = function(t, e) {
              var n = [{ property: 'user_id', value: parseInt(t) }, { property: 'type', value: 'story' }];
              return this.search(n, e, null, null, '1/user-favorites');
            }),
            (t.prototype.getTop = function(t, e) {
              var n = [{ property: 'type', value: 'story' }];
              return t && n.push({ property: 'category_id', value: parseInt(t) }), this.search(n, e, null, null, '1/top');
            }),
            (t.prototype.getNew = function(t, e) {
              var n = [{ property: 'type', value: 'story' }, { property: 'newonly', value: 'yes' }];
              return t && n.push({ property: 'category_id', value: parseInt(t) }), this.search(n, e);
            }),
            (t.prototype.getById = function(t, e, n) {
              var s = this;
              void 0 === e && (e = !1), void 0 === n && (n = !1);
              var a = this.stories.get(t);
              if (a && !e && a.length) return o.Observable.of(a);
              var i = [{ property: 'submission_id', value: parseInt(t) }],
                l = { filter: JSON.stringify(i).trim() },
                u = this.api.showLoader();
              return this.api
                .get('2/submissions/pages', l)
                .map(function(t) {
                  if ((u && !n && u.dismiss(), !t.success)) return s.api.showToast(), null;
                  a
                    ? e && ((a.title = t.pages[0].name), (a.url = t.pages[0].url), (a.ratingenabled = t.pages[0].allow_vote))
                    : (a = new r.a({
                        id: t.pages[0].submission_id,
                        title: t.pages[0].name,
                        url: t.pages[0].url,
                        ratingenabled: t.pages[0].allow_vote,
                      }));
                  var o = t.pages[0].tags
                    ? t.pages[0].tags
                        .sort(function(t, e) {
                          return e.submission_count - t.submission_count;
                        })
                        .map(function(t) {
                          return t.name;
                        })
                    : [];
                  return (
                    (a.series = t.pages[0].series_id),
                    (a.lang = t.pages[0].lang),
                    (a.length = t.total),
                    (a.tags = o),
                    (a.content = t.pages.map(function(t) {
                      return t.content;
                    })),
                    s.stories.set(a.id, a),
                    a
                  );
                })
                .catch(function(e) {
                  return u && u.dismiss(), s.api.showToast(), console.error('stories.getById', [t], e), o.Observable.of(null);
                });
            }),
            (t.prototype.rate = function(t, e) {
              var n = this,
                r = [{ property: 'submission_id', value: parseInt(t.id) }],
                s = new FormData();
              s.append('user_id', this.user.getId()),
                s.append('session_id', this.user.getSession()),
                s.append('vote', String(e)),
                s.append('filter', JSON.stringify(r)),
                this.api
                  .post('2/submissions/vote', s, void 0, !0)
                  .catch(function(n) {
                    return console.error('stories.rate', [t, e], n), o.Observable.throw(n);
                  })
                  .subscribe(function(o) {
                    o.success ? (t.myrating = e) : o.error ? n.api.showToast(o.error) : n.api.showToast();
                  });
            }),
            (t.prototype.downloadSeries = function(t) {
              var e = this;
              return (
                this.api.showLoader(),
                new Promise(function(n) {
                  var o = function(r) {
                    if (r >= t.length) return e.api.hideLoader(), void n();
                    t[r].cached
                      ? (e.download(t[r]), e.api.updateLoader(Math.round(r + (1 / t.length) * 100) + '%'), o(r + 1))
                      : e.getById(t[r].id, !1, !0).subscribe(function(n) {
                          if (!n)
                            return (
                              e.translate.get(['SERIES_DOWNLOAD_ERROR']).subscribe(function(t) {
                                e.api.showToast(t.SERIES_DOWNLOAD_ERROR);
                              }),
                              void e.api.hideLoader()
                            );
                          e.download(n), e.api.updateLoader(Math.round(r + (1 / t.length) * 100) + '%'), o(r + 1);
                        });
                  };
                  o(0);
                })
              );
            }),
            (t.prototype.search = function(t, e, n, r, s) {
              var a,
                i = this,
                l = { page: e || 1, filter: JSON.stringify(t) };
              return (
                (!e || e < 2) && (a = this.api.showLoader()),
                this.api
                  .get(s || '1/submissions', l, null, r)
                  .map(function(t) {
                    return (
                      a && a.dismiss(),
                      t.success || t.submissions
                        ? [
                            t.submissions
                              ? t.submissions.map(function(t) {
                                  return i.extractFromSearch(t);
                                })
                              : [],
                            t.total,
                          ]
                        : (t.hasOwnProperty('total') || i.api.showToast(), [[], 0])
                    );
                  })
                  .catch(function(r) {
                    return a && a.dismiss(), i.api.showToast(), console.error('stories.search', [t, e, n], r), o.Observable.of([[], 0]);
                  })
              );
            }),
            (t.prototype.newsearch = function(t, e, n, r, s) {
              var i = this;
              void 0 === s && (s = !1),
                s
                  ? Array.isArray(t.category) && (t.category = parseInt(t.category[0]))
                  : (t.category &&
                      (t.categories = t.category.map(function(t) {
                        return parseInt(t);
                      })),
                    delete t.category);
              var l,
                u = { params: JSON.stringify(a({ page: e || 1 }, t)) };
              return (
                (!e || e < 2) && (l = this.api.showLoader()),
                this.api
                  .get(r || '3/search/stories', u, null, n)
                  .map(function(t) {
                    l && l.dismiss();
                    var e = s ? t.submissions : t.data,
                      n = s ? t.meta.submissions_count : t.meta.total;
                    return e
                      ? [
                          e.map(function(t) {
                            return i.extractFromNewSearch(t);
                          }),
                          n,
                        ]
                      : (n || i.api.showToast(), [[], 0]);
                  })
                  .catch(function(n) {
                    return l && l.dismiss(), i.api.showToast(), console.error('stories.newsearch', [t, e, s], n), o.Observable.of([[], 0]);
                  })
              );
            }),
            (t.prototype.tagsearch = function(t, e, n, o) {
              var r = this,
                s = {
                  params: JSON.stringify({
                    tags: t.q.split(',').map(function(t) {
                      return t.trim();
                    }),
                  }),
                };
              return (
                delete t.q,
                (!e || e < 2) && this.api.showLoader(),
                this.api
                  .get(o || '3/tagsportal/by-name', s, null, n)
                  .map(function(t) {
                    return t.map(function(t) {
                      return t.id;
                    });
                  })
                  .mergeMap(function(n) {
                    var o = a({ tags: n, sort_by: t.sort }, t);
                    return r.newsearch(o, e, 0, '3/tagsportal/stories', !0);
                  })
              );
            }),
            (t.prototype.download = function(t) {
              (t.downloaded = !0), (t.downloadedtimestamp = new Date()), (t.cached = !0), this.storage.set(s.h + '_' + t.id, t);
            }),
            (t.prototype.undownload = function(t) {
              (t.downloaded = !1),
                (t.downloadedtimestamp = null),
                t.cached ? this.storage.set(s.h + '_' + t.id, t) : this.storage.remove(s.h + '_' + t.id);
            }),
            (t.prototype.cache = function(t) {
              (t.cached = !0), this.storage.set(s.h + '_' + t.id, t);
            }),
            (t.prototype.uncache = function(t) {
              (t.cached = !1), (t.downloaded = !1), this.storage.remove(s.h + '_' + t.id);
            }),
            (t.prototype.extractFromFeed = function(t) {
              var e = this.stories.get(t.what.id);
              if (e) return e;
              var n = this.a.extractFromFeed(t.who),
                o = new r.a({
                  author: n,
                  id: t.what.id.toString(),
                  title: t.what.title,
                  description: t.what.description,
                  category: i(t.what.category_info.name),
                  lang: this.g.getLanguage(t.what.language),
                  timestamp: t.when,
                  rating: t.what.rate_all,
                  viewcount: t.what.view_count,
                  url: t.what.url,
                  tags: t.what.tags
                    ? t.what.tags.map(function(t) {
                        return t.tag;
                      })
                    : [],
                  ishot: t.what.is_hot,
                  isnew: t.what.is_new,
                  iswriterspick: t.what.writers_pick,
                  iscontestwinner: t.what.contest_winner,
                  commentsenabled: t.what.enable_comments,
                  ratingenabled: t.what.allow_vote,
                });
              return this.stories.set(o.id, o), o;
            }),
            (t.prototype.extactFromList = function(t) {
              var e = this.stories.get(t.id);
              if (e) return e;
              var n = this.a.extractFromFeed(t.author),
                o = new r.a({
                  author: n,
                  id: t.id.toString(),
                  title: t.title,
                  description: t.description,
                  category: i(t.category_info.name),
                  lang: this.g.getLanguage(t.language),
                  timestamp: Math.round(Date.parse(t.date_added) / 1e3),
                  rating: t.rate_all,
                  viewcount: t.view_count,
                  url: t.url,
                  tags: t.tags
                    ? t.tags.map(function(t) {
                        return t.tag;
                      })
                    : [],
                  ishot: t.is_hot,
                  isnew: t.is_new,
                  iswriterspick: t.writers_pick,
                  iscontestwinner: t.contest_winner,
                  commentsenabled: t.enable_comments > 0,
                  ratingenabled: t.allow_vote,
                });
              return this.stories.set(o.id, o), o;
            }),
            (t.prototype.extractFromSearch = function(t) {
              var e = this.stories.get(t.id);
              if (e) return e;
              var n = this.a.extractFromSearch(t.user),
                o = new r.a({
                  author: n,
                  id: t.id.toString(),
                  title: t.name,
                  description: t.description,
                  category: t.category.name,
                  lang: t.lang,
                  timestamp: t.timestamp_published,
                  rating: t.rate,
                  viewcount: t.view_count,
                  url: t.url,
                  ishot: 'no' !== t.is_hot,
                  isnew: 'no' !== t.is_new,
                  iswriterspick: 'no' !== t.writers_pick,
                  iscontestwinner: 'no' !== t.contest_winner,
                  commentsenabled: t.enable_comments > 0,
                  ratingenabled: t.allow_vote > 0,
                });
              return this.stories.set(o.id, o), o;
            }),
            (t.prototype.extractFromNewSearch = function(t) {
              var e = this.stories.get(t.id);
              if (e) return e;
              var n = t.date_approve.split('/'),
                o = this.a.extractFromNewSearch(t.author),
                s = new r.a({
                  author: o,
                  id: t.id.toString(),
                  title: t.title,
                  description: t.description,
                  category: i(t.category_info.name),
                  lang: this.g.getLanguage(t.language),
                  timestamp: Math.round(Date.parse(n[2] + '-' + n[0] + '-' + n[1] + 'T00:00:00') / 1e3),
                  rating: t.rate_all,
                  viewcount: t.view_count,
                  url: t.url,
                  ishot: t.is_hot,
                  isnew: t.is_new,
                  iswriterspick: t.writers_pick,
                  iscontestwinner: t.contest_winner > 0,
                  commentsenabled: t.enable_comments > 0,
                  ratingenabled: t.allow_vote > 0,
                });
              return this.stories.set(s.id, s), s;
            }),
            t
          );
        })();
    },
    68: function(t, e, n) {
      'use strict';
      n.d(e, 'a', function() {
        return s;
      });
      n(0);
      var o = n(61),
        r = (n.n(o), n(41), n(50), n(137), n(37), n(52), n(69)),
        s =
          (n(57),
          (function() {
            function t(t, e, n, o, s, a) {
              var i = this;
              (this.api = t),
                (this.user = e),
                (this.storage = n),
                (this.translate = o),
                (this.browser = s),
                (this.toastCtrl = a),
                (this.version = 14),
                this.storage.get(r.j).then(function(t) {
                  t &&
                    t !== i.version &&
                    setTimeout(function() {
                      i.translate.get(['UPDATED_MSG', 'CLOSE_BUTTON']).subscribe(function(t) {
                        i.toastCtrl
                          .create({ message: t.UPDATED_MSG, showCloseButton: !0, closeButtonText: t.CLOSE_BUTTON, duration: 15e3 })
                          .present(),
                          i.user.removeStoredUser();
                      });
                    }, 2e3),
                    i.storage.set(r.j, i.version);
                }),
                (this.ready = new Promise(function(t, e) {
                  i.storage.get(r.b).then(function(e) {
                    e
                      ? ((i.globals = e), t())
                      : i.query().subscribe(function() {
                          t();
                        });
                  });
                }));
            }
            return (
              (t.prototype.onReady = function() {
                return this.ready;
              }),
              (t.prototype.getCategories = function() {
                return [
                  { id: '37', name: 'Anal' },
                  { id: '31', name: 'BDSM' },
                  { id: '27', name: 'Celebrities & Fan Fiction' },
                  { id: '28', name: 'Chain Stories' },
                  { id: '2', name: 'Erotic Couplings' },
                  { id: '51', name: 'Erotic Horror' },
                  { id: '4', name: 'Exhibitionist & Voyeur' },
                  { id: '5', name: 'Fetish' },
                  { id: '40', name: 'First Time' },
                  { id: '6', name: 'Gay Male' },
                  { id: '7', name: 'Group Sex' },
                  { id: '8', name: 'How To' },
                  { id: '34', name: 'Humor & Satire' },
                  { id: '45', name: 'Illustrated' },
                  { id: '9', name: 'Incest/Taboo' },
                  { id: '10', name: 'Interracial Love' },
                  { id: '11', name: 'Lesbian Sex' },
                  { id: '53', name: 'Letters & Transcripts' },
                  { id: '12', name: 'Loving Wives' },
                  { id: '26', name: 'Mature' },
                  { id: '29', name: 'Mind Control' },
                  { id: '32', name: 'Non-English' },
                  { id: '35', name: 'Non-Erotic' },
                  { id: '13', name: 'NonConsent/Reluctance' },
                  { id: '14', name: 'NonHuman' },
                  { id: '33', name: 'Novels and Novellas' },
                  { id: '3', name: 'Reviews & Essays' },
                  { id: '15', name: 'Romance' },
                  { id: '38', name: 'Sci-Fi & Fantasy' },
                  { id: '39', name: 'Text With Audio' },
                  { id: '16', name: 'Toys & Masturbation' },
                  { id: '48', name: 'Transsexuals & Crossdressers' },
                ];
              }),
              (t.prototype.getLanguage = function(t) {
                var e = this;
                return this.globals.languages
                  ? Object.keys(this.globals.languages).filter(function(n) {
                      var o = e.globals.languages[n];
                      if (parseInt(o.id) === t) return o.shortname;
                    })[0]
                  : null;
              }),
              (t.prototype.getPopularTags = function() {
                return this.api.get('3/tagsportal/top', { limit: 100, periodCheck: !1, period: 'all' });
              }),
              (t.prototype.getVersion = function() {
                return this.version;
              }),
              (t.prototype.checkForUpdates = function() {
                var t = this;
                this.api
                  .get('app.json', void 0, void 0, 3)
                  .catch(function(t) {
                    return console.error('globals.checkForUpdates', t), o.Observable.of(!1);
                  })
                  .subscribe(function(e) {
                    t.translate.get(['UPDATE_FAILEDMSG', 'UPDATE_MSG', 'DOWNLOAD_BUTTON']).subscribe(function(n) {
                      e
                        ? (e.appid !== t.api.appid && (t.api.appid = e.appid),
                          e.apikey !== t.api.apikey && (t.api.apikey = e.apikey),
                          e.version > t.version &&
                            t.api.showToast(n.UPDATE_MSG, 15e3, n.DOWNLOAD_BUTTON).then(function(n) {
                              t.browser.openUrl(e.updatelink || 'https://theilluminatus.github.io/litapp');
                            }))
                        : t.api.showToast(n.UPDATE_FAILEDMSG);
                    });
                  });
              }),
              (t.prototype.query = function() {
                var t = this;
                if (this.globals) return o.Observable.of(this.globals);
                var e = this.api.showLoader();
                return this.api
                  .get('3/constants', null, null, null, 1e4)
                  .map(function(n) {
                    return e && e.dismiss(), n ? ((t.globals = n), t.storage.set(r.b, t.globals), t.globals) : (t.api.showToast(), null);
                  })
                  .catch(function(n) {
                    return e && e.dismiss(), t.api.showToast(), console.error('globals.query', n), o.Observable.of(null);
                  });
              }),
              t
            );
          })());
    },
    69: function(t, e, n) {
      'use strict';
      n.d(e, 'f', function() {
        return o;
      }),
        n.d(e, 'e', function() {
          return r;
        }),
        n.d(e, 'g', function() {
          return s;
        }),
        n.d(e, 'c', function() {
          return a;
        }),
        n.d(e, 'h', function() {
          return i;
        }),
        n.d(e, 'i', function() {
          return l;
        }),
        n.d(e, 'a', function() {
          return u;
        }),
        n.d(e, 'd', function() {
          return c;
        }),
        n.d(e, 'b', function() {
          return p;
        }),
        n.d(e, 'j', function() {
          return d;
        });
      var o = '_queries',
        r = '_recentqueries',
        s = '_storystyle',
        a = '_history',
        i = '_story',
        l = '_user',
        u = '_feed',
        c = '_list',
        p = '_globals',
        d = '_version';
    },
    94: function(t, e, n) {
      'use strict';
      n(0), n(1), n(57);
      var o = n(61),
        r = (function() {
          return function(t) {
            for (var e in t) this[e] = t[e];
          };
        })();
      n(52), n(37);
      n.d(e, 'a', function() {
        return s;
      });
      var s = (function() {
        function t(t, e, n, o) {
          (this.api = t), (this.user = e), (this.loadingCtrl = n), (this.toastCtrl = o), (this.authors = new Map());
        }
        return (
          (t.prototype.getDetails = function(t) {
            var e = this,
              n = [{ property: 'user_id', value: t }],
              s = { filter: JSON.stringify(n).trim() },
              a = this.authors.get(t);
            if (a && a.bio) return o.Observable.of(a);
            var i = this.api.showLoader();
            return this.api
              .get('1/user-bio', s)
              .map(function(t) {
                return (
                  i && i.dismiss(),
                  t.success
                    ? (a || (a = new r({ id: t.user.profile.id, picture: t.user.profile.userpic, name: t.user.profile.username })),
                      (a.storycount = t.user.profile.submissions_count),
                      (a.bio = t.user.profile.description),
                      e.authors.set(a.id, a),
                      a)
                    : (e.api.showToast(), null)
                );
              })
              .catch(function(n) {
                return i && i.dismiss(), e.api.showToast(), console.error('author.getDetails', [t], n), o.Observable.of(null);
              });
          }),
          (t.prototype.getFollowing = function() {
            var t = this,
              e = this.api.showLoader();
            return this.api
              .get('3/users/' + this.user.getId() + '/favorite/authors?params={%22nocache%22:true}')
              .map(function(n) {
                return (
                  e && e.dismiss(),
                  n.length
                    ? n.map(function(e) {
                        return t.extractFromFeed(e);
                      })
                    : (t.api.showToast(), [])
                );
              })
              .catch(function(n) {
                return e && e.dismiss(), t.api.showToast(), console.error('author.getFollowing', n), o.Observable.of([]);
              });
          }),
          (t.prototype.follow = function(t) {
            var e = this,
              n = new FormData();
            return (
              n.append('type', 'member'),
              n.append('id', t.id),
              this.api
                .post('3/users/follow/' + t.id, {})
                .map(function(t) {
                  return t.success || e.api.showToast(), t.success;
                })
                .catch(function(n) {
                  return e.api.showToast(), console.error('author.follow', [t], n), o.Observable.of(!1);
                })
                .subscribe(function(n) {
                  n ? (t.following = !0) : e.api.showToast();
                })
            );
          }),
          (t.prototype.unfollow = function(t) {
            var e = this;
            return this.api
              .delete('3/users/follow/' + t.id)
              .map(function(t) {
                return t.success || e.api.showToast(), t.success;
              })
              .catch(function(n) {
                return e.api.showToast(), console.error('author.unfollow', [t], n), o.Observable.of(!1);
              })
              .subscribe(function(e) {
                e && (t.following = !1);
              });
          }),
          (t.prototype.extractFromFeed = function(t) {
            var e = this.authors.get(t.id);
            return e && e.updatetimestamp
              ? e
              : (e || (e = new r({ id: t.userid, name: t.username, picture: t.userpic })),
                (e.jointimestamp = t.joindate),
                (e.following = !0),
                this.authors.set(e.id, e),
                e);
          }),
          (t.prototype.extractFromSearch = function(t) {
            var e = this.authors.get(t.id);
            if (e) return e;
            var n = new r({ id: t.id, name: t.username, picture: t.userpic });
            return this.authors.set(n.id, n), n;
          }),
          (t.prototype.extractFromNewSearch = function(t) {
            var e = this.authors.get(t.userid);
            if (e) return e;
            var n = new r({ id: t.userid, name: t.username, picture: t.userpic });
            return this.authors.set(n.id, n), n;
          }),
          t
        );
      })();
    },
  },
  [403],
);
