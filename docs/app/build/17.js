webpackJsonp([17], {
  683: function(n, l, u) {
    'use strict';
    function t(n) {
      return e._22(
        0,
        [
          (n()(), e.Z(0, 0, null, null, 20, 'button', [['class', 'item item-block'], ['ion-item', '']], null, null, null, C.b, C.a)),
          e.Y(1, 1097728, null, 3, Y.a, [j.a, Z.a, e.j, e.z, [2, z.a]], null, null),
          e._18(335544320, 2, { contentLabel: 0 }),
          e._18(603979776, 3, { _buttons: 1 }),
          e._18(603979776, 4, { _icons: 1 }),
          e.Y(5, 16384, null, 0, T.a, [], null, null),
          (n()(), e._20(-1, 2, ['\n\t\t\t\t\t'])),
          (n()(),
          e.Z(
            7,
            0,
            null,
            4,
            2,
            'button',
            [['ion-button', ''], ['item-end', ''], ['outline', '']],
            null,
            [[null, 'click']],
            function(n, l, u) {
              var t = !0;
              if ('click' === l) {
                t = !1 !== n.component.openCategory(n.context.$implicit, 'top') && t;
              }
              return t;
            },
            y.b,
            y.a,
          )),
          e.Y(8, 1097728, [[3, 4]], 0, L.a, [[8, ''], Z.a, e.j, e.z], { outline: [0, 'outline'] }, null),
          (n()(), e._20(-1, 0, ['Top'])),
          (n()(), e._20(-1, 2, ['\n\t\t\t\t\t'])),
          (n()(),
          e.Z(
            11,
            0,
            null,
            4,
            2,
            'button',
            [['ion-button', ''], ['item-end', ''], ['outline', '']],
            null,
            [[null, 'click']],
            function(n, l, u) {
              var t = !0;
              if ('click' === l) {
                t = !1 !== n.component.openCategory(n.context.$implicit, 'new') && t;
              }
              return t;
            },
            y.b,
            y.a,
          )),
          e.Y(12, 1097728, [[3, 4]], 0, L.a, [[8, ''], Z.a, e.j, e.z], { outline: [0, 'outline'] }, null),
          (n()(), e._20(-1, 0, ['New'])),
          (n()(), e._20(-1, 2, ['\n\n\t\t\t\t\t'])),
          (n()(), e.Z(15, 0, null, 2, 1, 'h2', [], null, null, null, null, null)),
          (n()(), e._20(16, null, ['', ''])),
          (n()(), e._20(-1, 2, ['\n\t\t\t\t\t'])),
          (n()(), e.Z(18, 0, null, 2, 1, 'p', [], null, null, null, null, null)),
          (n()(), e._20(19, null, ['', ''])),
          (n()(), e._20(-1, 2, ['\n\n\t\t\t\t'])),
        ],
        function(n, l) {
          n(l, 8, 0, '');
          n(l, 12, 0, '');
        },
        function(n, l) {
          n(l, 16, 0, l.context.$implicit.name);
          n(l, 19, 0, l.context.$implicit.description);
        },
      );
    }
    function a(n) {
      return e._22(
        0,
        [
          (n()(), e.Z(0, 0, null, null, 1, 'ion-spinner', [['name', 'crescent']], [[2, 'spinner-paused', null]], null, null, x.b, x.a)),
          e.Y(1, 114688, null, 0, A.a, [Z.a, e.j, e.z], { name: [0, 'name'] }, null),
        ],
        function(n, l) {
          n(l, 1, 0, 'crescent');
        },
        function(n, l) {
          n(l, 0, 0, e._13(l, 1)._paused);
        },
      );
    }
    function o(n) {
      return e._22(
        0,
        [
          (n()(),
          e.Z(
            0,
            0,
            null,
            null,
            11,
            'button',
            [['class', 'item item-block'], ['ion-item', '']],
            null,
            [[null, 'click']],
            function(n, l, u) {
              var t = !0;
              if ('click' === l) {
                t = !1 !== n.component.openTag(n.context.$implicit.tag) && t;
              }
              return t;
            },
            C.b,
            C.a,
          )),
          e.Y(1, 1097728, null, 3, Y.a, [j.a, Z.a, e.j, e.z, [2, z.a]], null, null),
          e._18(335544320, 5, { contentLabel: 0 }),
          e._18(603979776, 6, { _buttons: 1 }),
          e._18(603979776, 7, { _icons: 1 }),
          e.Y(5, 16384, null, 0, T.a, [], null, null),
          (n()(), e._20(-1, 2, ['\n\n\t\t\t\t\t'])),
          (n()(), e.Z(7, 0, null, 2, 3, 'h2', [], null, null, null, null, null)),
          (n()(), e._20(8, null, ['', ' '])),
          (n()(), e.Z(9, 0, null, null, 1, 'small', [], null, null, null, null, null)),
          (n()(), e._20(10, null, ['(', ')'])),
          (n()(), e._20(-1, 2, ['\n\n\t\t\t\t'])),
        ],
        null,
        function(n, l) {
          n(l, 8, 0, l.context.$implicit.tag);
          n(l, 10, 0, l.context.$implicit.cnt);
        },
      );
    }
    function r(n) {
      return e._22(
        0,
        [
          e._14(0, c.g, []),
          (n()(), e.Z(1, 0, null, null, 21, 'ion-header', [], null, null, null, null, null)),
          e.Y(2, 16384, null, 0, w.a, [Z.a, e.j, e.z, [2, E.a]], null, null),
          (n()(), e._20(-1, null, ['\n\t'])),
          (n()(),
          e.Z(
            4,
            0,
            null,
            null,
            17,
            'ion-navbar',
            [['class', 'toolbar']],
            [[8, 'hidden', 0], [2, 'statusbar-padding', null]],
            null,
            null,
            O.b,
            O.a,
          )),
          e.Y(5, 49152, null, 0, P.a, [F.a, [2, E.a], [2, R.a], Z.a, e.j, e.z], null, null),
          (n()(), e._20(-1, 3, ['\n\t\t'])),
          (n()(),
          e.Z(
            7,
            0,
            null,
            0,
            8,
            'button',
            [['icon-only', ''], ['ion-button', ''], ['menuToggle', '']],
            [[8, 'hidden', 0]],
            [[null, 'click']],
            function(n, l, u) {
              var t = !0;
              if ('click' === l) {
                t = !1 !== e._13(n, 9).toggle() && t;
              }
              return t;
            },
            y.b,
            y.a,
          )),
          e.Y(8, 1097728, [[1, 4]], 0, L.a, [[8, ''], Z.a, e.j, e.z], null, null),
          e.Y(9, 1064960, null, 0, S.a, [I.a, [2, E.a], [2, L.a], [2, P.a]], { menuToggle: [0, 'menuToggle'] }, null),
          e.Y(10, 16384, null, 1, X.a, [Z.a, e.j, e.z, [2, $.a], [2, P.a]], null, null),
          e._18(603979776, 1, { _buttons: 1 }),
          (n()(), e._20(-1, 0, ['\n\t\t\t'])),
          (n()(), e.Z(13, 0, null, 0, 1, 'ion-icon', [['name', 'menu'], ['role', 'img']], [[2, 'hide', null]], null, null, null, null)),
          e.Y(14, 147456, null, 0, q.a, [Z.a, e.j, e.z], { name: [0, 'name'] }, null),
          (n()(), e._20(-1, 0, ['\n\t\t'])),
          (n()(), e._20(-1, 3, ['\n\t\t'])),
          (n()(), e.Z(17, 0, null, 3, 3, 'ion-title', [], null, null, null, U.b, U.a)),
          e.Y(18, 49152, null, 0, B.a, [Z.a, e.j, e.z, [2, $.a], [2, P.a]], null, null),
          (n()(), e._20(19, 0, ['', ''])),
          e._14(131072, G.a, [M.a, e.g]),
          (n()(), e._20(-1, 3, ['\n\t'])),
          (n()(), e._20(-1, null, ['\n'])),
          (n()(), e._20(-1, null, ['\n\n\n'])),
          (n()(),
          e.Z(
            24,
            0,
            null,
            null,
            52,
            'ion-content',
            [['padding', '']],
            [[2, 'statusbar-padding', null], [2, 'has-refresher', null]],
            null,
            null,
            N.b,
            N.a,
          )),
          e.Y(25, 4374528, null, 0, D.a, [Z.a, H.a, J.a, e.j, e.z, F.a, V.a, e.u, [2, E.a], [2, R.a]], null, null),
          (n()(), e._20(-1, 1, ['\n\n\t'])),
          (n()(), e.Z(27, 0, null, 1, 22, 'ion-card', [], null, null, null, null, null)),
          e.Y(28, 16384, null, 0, W.a, [Z.a, e.j, e.z], null, null),
          (n()(), e._20(-1, null, ['\n\t\t'])),
          (n()(),
          e.Z(
            30,
            0,
            null,
            null,
            6,
            'ion-card-header',
            [],
            null,
            [[null, 'click']],
            function(n, l, u) {
              var t = !0,
                a = n.component;
              if ('click' === l) {
                t = !1 != (a.foldCats = !a.foldCats) && t;
              }
              return t;
            },
            null,
            null,
          )),
          e.Y(31, 16384, null, 0, K.a, [Z.a, e.j, e.z], null, null),
          (n()(), e._20(-1, null, ['\n\t\t\t'])),
          (n()(), e.Z(33, 0, null, null, 1, 'ion-icon', [['role', 'img']], [[2, 'hide', null]], null, null, null, null)),
          e.Y(34, 147456, null, 0, q.a, [Z.a, e.j, e.z], { name: [0, 'name'] }, null),
          (n()(), e._20(35, null, ['\n\t\t\t', '\n\t\t'])),
          e._14(131072, G.a, [M.a, e.g]),
          (n()(), e._20(-1, null, ['\n\n\t\t'])),
          (n()(), e.Z(38, 0, null, null, 10, 'ion-card-content', [], null, null, null, null, null)),
          e.Y(39, 16384, null, 0, Q.a, [Z.a, e.j, e.z], null, null),
          (n()(), e._20(-1, null, ['\n\t\t\t'])),
          (n()(), e.Z(41, 0, null, null, 6, 'ion-list', [], [[2, 'folded', null]], null, null, null, null)),
          e.Y(42, 16384, null, 0, nn.a, [Z.a, e.j, e.z, H.a, ln.l, J.a], null, null),
          (n()(), e._20(-1, null, ['\n\t\t\t\t'])),
          (n()(), e.U(16777216, null, null, 2, null, t)),
          e.Y(45, 802816, null, 0, un.i, [e.I, e.F, e.p], { ngForOf: [0, 'ngForOf'] }, null),
          e._16(46, 2),
          (n()(), e._20(-1, null, ['\n\t\t\t'])),
          (n()(), e._20(-1, null, ['\n\t\t'])),
          (n()(), e._20(-1, null, ['\n\t'])),
          (n()(), e._20(-1, 1, ['\n\n\t'])),
          (n()(), e.Z(51, 0, null, 1, 24, 'ion-card', [], null, null, null, null, null)),
          e.Y(52, 16384, null, 0, W.a, [Z.a, e.j, e.z], null, null),
          (n()(), e._20(-1, null, ['\n\n\t\t'])),
          (n()(),
          e.Z(
            54,
            0,
            null,
            null,
            6,
            'ion-card-header',
            [],
            null,
            [[null, 'click']],
            function(n, l, u) {
              var t = !0,
                a = n.component;
              if ('click' === l) {
                t = !1 != (a.foldTags = !a.foldTags) && t;
              }
              return t;
            },
            null,
            null,
          )),
          e.Y(55, 16384, null, 0, K.a, [Z.a, e.j, e.z], null, null),
          (n()(), e._20(-1, null, ['\n\t\t\t'])),
          (n()(), e.Z(57, 0, null, null, 1, 'ion-icon', [['role', 'img']], [[2, 'hide', null]], null, null, null, null)),
          e.Y(58, 147456, null, 0, q.a, [Z.a, e.j, e.z], { name: [0, 'name'] }, null),
          (n()(), e._20(59, null, ['\n\t\t\t', '\n\t\t'])),
          e._14(131072, G.a, [M.a, e.g]),
          (n()(), e._20(-1, null, ['\n\n\t\t'])),
          (n()(), e.Z(62, 0, null, null, 12, 'ion-card-content', [], null, null, null, null, null)),
          e.Y(63, 16384, null, 0, Q.a, [Z.a, e.j, e.z], null, null),
          (n()(), e._20(-1, null, ['\n\n\t\t\t'])),
          (n()(), e.U(16777216, null, null, 1, null, a)),
          e.Y(66, 16384, null, 0, un.j, [e.I, e.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), e._20(-1, null, ['\n\n\t\t\t'])),
          (n()(), e.Z(68, 0, null, null, 5, 'ion-list', [], [[2, 'folded', null]], null, null, null, null)),
          e.Y(69, 16384, null, 0, nn.a, [Z.a, e.j, e.z, H.a, ln.l, J.a], null, null),
          (n()(), e._20(-1, null, ['\n\t\t\t\t'])),
          (n()(), e.U(16777216, null, null, 1, null, o)),
          e.Y(72, 802816, null, 0, un.i, [e.I, e.F, e.p], { ngForOf: [0, 'ngForOf'] }, null),
          (n()(), e._20(-1, null, ['\n\t\t\t'])),
          (n()(), e._20(-1, null, ['\n\t\t'])),
          (n()(), e._20(-1, null, ['\n\t'])),
          (n()(), e._20(-1, 1, ['\n'])),
        ],
        function(n, l) {
          var u = l.component;
          n(l, 9, 0, '');
          n(l, 14, 0, 'menu');
          n(l, 34, 0, u.foldCats ? 'arrow-dropright' : 'arrow-dropdown');
          n(l, 45, 0, e._21(l, 45, 0, n(l, 46, 0, e._13(l, 0), u.categories, 'name')));
          n(l, 58, 0, u.foldTags ? 'arrow-dropright' : 'arrow-dropdown');
          n(l, 66, 0, !u.popularTags.length);
          n(l, 72, 0, u.popularTags);
        },
        function(n, l) {
          var u = l.component;
          n(l, 4, 0, e._13(l, 5)._hidden, e._13(l, 5)._sbPadding);
          n(l, 7, 0, e._13(l, 9).isHidden);
          n(l, 13, 0, e._13(l, 14)._hidden);
          n(l, 19, 0, e._21(l, 19, 0, e._13(l, 20).transform('EXPLORE')));
          n(l, 24, 0, e._13(l, 25).statusbarPadding, e._13(l, 25)._hasRefresher);
          n(l, 33, 0, e._13(l, 34)._hidden);
          n(l, 35, 0, e._21(l, 35, 0, e._13(l, 36).transform('CATEGORIES')));
          n(l, 41, 0, u.foldCats);
          n(l, 57, 0, e._13(l, 58)._hidden);
          n(l, 59, 0, e._21(l, 59, 0, e._13(l, 60).transform('EXPLORE_TOPTAGS')));
          n(l, 68, 0, u.foldTags);
        },
      );
    }
    Object.defineProperty(l, '__esModule', { value: !0 });
    var e = u(1),
      i = (u(0), u(57), u(50)),
      c = u(703),
      s =
        (u(190),
        (function() {
          function n(n, l, u, t) {
            var a = this;
            (this.translate = n),
              (this.navCtrl = l),
              (this.navParams = u),
              (this.g = t),
              (this.categories = []),
              (this.popularTags = []),
              (this.foldCats = !0),
              (this.foldTags = !0),
              this.translate.get(['EXPLORE_ALLCAT', 'EXPLORE_ALLCATDESCR']).subscribe(function(n) {
                a.g.onReady().then(function() {
                  (a.categories = a.g.getCategories()),
                    a.categories.unshift({ id: 0, name: n.EXPLORE_ALLCAT }),
                    a.g.getPopularTags().subscribe(function(n) {
                      n && (a.popularTags = n);
                    });
                });
              });
          }
          return (
            (n.prototype.openCategory = function(n, l) {
              void 0 === l && (l = 'top'), this.navCtrl.push('TopListPage', { order: l, category: n });
            }),
            (n.prototype.openTag = function(n) {
              this.navCtrl.push('SearchPage', { query: n });
            }),
            n
          );
        })()),
      _ = (function() {
        return function() {};
      })(),
      f = u(381),
      d = u(382),
      b = u(383),
      p = u(384),
      g = u(385),
      m = u(386),
      h = u(387),
      k = u(388),
      v = u(389),
      C = u(189),
      Y = u(25),
      j = u(22),
      Z = u(3),
      z = u(58),
      T = u(85),
      y = u(62),
      L = u(29),
      x = u(392),
      A = u(91),
      w = u(128),
      E = u(7),
      O = u(709),
      P = u(51),
      F = u(13),
      R = u(30),
      S = u(200),
      I = u(33),
      X = u(195),
      $ = u(53),
      q = u(63),
      U = u(390),
      B = u(90),
      G = u(125),
      M = u(39),
      N = u(391),
      D = u(31),
      H = u(6),
      J = u(12),
      V = u(36),
      W = u(225),
      K = u(227),
      Q = u(226),
      nn = u(64),
      ln = u(10),
      un = u(18),
      tn = u(16),
      an = u(68),
      on = e.X({ encapsulation: 2, styles: [], data: {} }),
      rn = e.V(
        'page-explore',
        s,
        function(n) {
          return e._22(
            0,
            [
              (n()(), e.Z(0, 0, null, null, 1, 'page-explore', [], null, null, null, r, on)),
              e.Y(1, 49152, null, 0, s, [M.a, R.a, tn.a, an.a], null, null),
            ],
            null,
            null,
          );
        },
        {},
        {},
        [],
      ),
      en = u(28),
      cn = u(86),
      sn = u(87),
      _n = u(89),
      fn = u(88),
      dn = u(126),
      bn = u(191),
      pn = u(59);
    u.d(l, 'ExplorePageModuleNgFactory', function() {
      return gn;
    });
    var gn = e.W(_, [], function(n) {
      return e._10([
        e._11(512, e.i, e.S, [[8, [f.a, d.a, b.a, p.a, g.a, m.a, h.a, k.a, v.a, rn]], [3, e.i], e.s]),
        e._11(4608, un.l, un.k, [e.r, [2, un.t]]),
        e._11(4608, en.r, en.r, []),
        e._11(4608, en.d, en.d, []),
        e._11(4608, cn.b, cn.a, []),
        e._11(4608, sn.a, sn.b, []),
        e._11(4608, _n.b, _n.a, []),
        e._11(4608, fn.b, fn.a, []),
        e._11(4608, M.a, M.a, [dn.a, cn.b, sn.a, _n.b, fn.b, M.b, M.c]),
        e._11(512, un.b, un.b, []),
        e._11(512, en.p, en.p, []),
        e._11(512, en.g, en.g, []),
        e._11(512, en.n, en.n, []),
        e._11(512, bn.a, bn.a, []),
        e._11(512, bn.b, bn.b, []),
        e._11(512, i.a, i.a, []),
        e._11(512, c.a, c.a, []),
        e._11(512, c.f, c.f, []),
        e._11(512, c.c, c.c, []),
        e._11(512, c.b, c.b, []),
        e._11(512, c.d, c.d, []),
        e._11(512, c.e, c.e, []),
        e._11(512, _, _, []),
        e._11(256, pn.a, s, []),
        e._11(256, M.c, void 0, []),
        e._11(256, M.b, void 0, []),
      ]);
    });
  },
  703: function(n, l, u) {
    'use strict';
    function t(n) {
      return void 0 === n;
    }
    function a(n) {
      return 'string' == typeof n;
    }
    function o(n, l) {
      var u = l.split('.'),
        a = u.shift();
      return u.reduce(function(n, l) {
        return t(n) || t(n[l]) ? void 0 : n[l];
      }, n[a || '']);
    }
    u.d(l, 'e', function() {
      return b;
    }),
      u.d(l, 'a', function() {
        return i;
      }),
      u.d(l, 'g', function() {
        return e;
      }),
      u.d(l, 'd', function() {
        return c;
      }),
      u.d(l, 'f', function() {
        return _;
      }),
      u.d(l, 'h', function() {
        return s;
      }),
      u.d(l, 'c', function() {
        return f;
      }),
      u.d(l, 'b', function() {
        return d;
      });
    var r = u(0),
      e = (function() {
        function n() {}
        return (
          (n.prototype.transform = function(l, u) {
            if (!Array.isArray(l)) return l;
            var t = Object(r.__spread)(l);
            if (Array.isArray(u))
              return t.sort(function(l, t) {
                for (var a = u.length, o = 0; o < a; ++o) {
                  var e = Object(r.__read)(n.extractFromConfig(u[o]), 2),
                    i = n.orderCompare(e[0], e[1], l, t);
                  if (0 !== i) return i;
                }
                return 0;
              });
            if (a(u)) {
              var o = Object(r.__read)(n.extractFromConfig(u), 3),
                e = o[0],
                i = o[1];
              if (1 === u.length)
                switch (o[2]) {
                  case '+':
                    return t.sort(n.simpleSort.bind(this));
                  case '-':
                    return t.sort(n.simpleSort.bind(this)).reverse();
                }
              return t.sort(n.orderCompare.bind(this, e, i));
            }
            return t.sort(n.simpleSort.bind(this));
          }),
          (n.simpleSort = function(n, l) {
            return a(n) && a(l) ? n.toLowerCase().localeCompare(l.toLowerCase()) : n - l;
          }),
          (n.orderCompare = function(n, l, u, r) {
            var e = o(u, n),
              i = o(r, n);
            if (e === i) return 0;
            if (t(e) || '' === e) return 1;
            if (t(i) || '' === i) return -1;
            if (a(e) && a(i)) {
              var c = e.toLowerCase().localeCompare(i.toLowerCase());
              return l ? c : -c;
            }
            return l ? e - i : i - e;
          }),
          (n.extractFromConfig = function(n) {
            var l = n.substr(0, 1);
            return [n.replace(/^[-+]/, ''), '-' !== l, l];
          }),
          n
        );
      })(),
      i = (function() {
        return function() {};
      })(),
      c = (function() {
        return function() {};
      })(),
      s = (function() {
        function n() {}
        return (
          (n.prototype.transform = function(n, l, u) {
            if ((void 0 === l && (l = 1), void 0 === u && (u = ''), l <= 0)) throw new RangeError();
            return 1 === l ? n : this.repeat(n, l - 1, u);
          }),
          (n.prototype.repeat = function(n, l, u) {
            return a(n) ? (0 === l ? n : n + u + this.repeat(n, l - 1, u)) : n;
          }),
          n
        );
      })(),
      _ = (function() {
        return function() {};
      })(),
      f = (function() {
        return function() {};
      })(),
      d = (function() {
        return function() {};
      })(),
      b = (function() {
        return function() {};
      })();
  },
  709: function(n, l, u) {
    'use strict';
    function t(n) {
      return a._22(
        0,
        [
          (n()(), a.Z(0, 0, null, null, 1, 'div', [['class', 'toolbar-background']], null, null, null, null, null)),
          a.Y(1, 278528, null, 0, o.h, [a.p, a.q, a.j, a.A], { klass: [0, 'klass'], ngClass: [1, 'ngClass'] }, null),
          (n()(),
          a.Z(
            2,
            0,
            null,
            null,
            8,
            'button',
            [['class', 'back-button'], ['ion-button', 'bar-button']],
            [[8, 'hidden', 0]],
            [[null, 'click']],
            function(n, l, u) {
              var t = !0;
              if ('click' === l) {
                t = !1 !== n.component.backButtonClick(u) && t;
              }
              return t;
            },
            r.b,
            r.a,
          )),
          a.Y(3, 278528, null, 0, o.h, [a.p, a.q, a.j, a.A], { klass: [0, 'klass'], ngClass: [1, 'ngClass'] }, null),
          a.Y(4, 1097728, null, 0, e.a, [[8, 'bar-button'], i.a, a.j, a.z], null, null),
          (n()(),
          a.Z(5, 0, null, 0, 2, 'ion-icon', [['class', 'back-button-icon'], ['role', 'img']], [[2, 'hide', null]], null, null, null, null)),
          a.Y(6, 278528, null, 0, o.h, [a.p, a.q, a.j, a.A], { klass: [0, 'klass'], ngClass: [1, 'ngClass'] }, null),
          a.Y(7, 147456, null, 0, c.a, [i.a, a.j, a.z], { name: [0, 'name'] }, null),
          (n()(), a.Z(8, 0, null, 0, 2, 'span', [['class', 'back-button-text']], null, null, null, null, null)),
          a.Y(9, 278528, null, 0, o.h, [a.p, a.q, a.j, a.A], { klass: [0, 'klass'], ngClass: [1, 'ngClass'] }, null),
          (n()(), a._20(10, null, ['', ''])),
          a._12(null, 0),
          a._12(null, 1),
          a._12(null, 2),
          (n()(), a.Z(14, 0, null, null, 2, 'div', [['class', 'toolbar-content']], null, null, null, null, null)),
          a.Y(15, 278528, null, 0, o.h, [a.p, a.q, a.j, a.A], { klass: [0, 'klass'], ngClass: [1, 'ngClass'] }, null),
          a._12(null, 3),
        ],
        function(n, l) {
          var u = l.component;
          n(l, 1, 0, 'toolbar-background', 'toolbar-background-' + u._mode);
          n(l, 3, 0, 'back-button', 'back-button-' + u._mode);
          n(l, 6, 0, 'back-button-icon', 'back-button-icon-' + u._mode);
          n(l, 7, 0, u._bbIcon);
          n(l, 9, 0, 'back-button-text', 'back-button-text-' + u._mode);
          n(l, 15, 0, 'toolbar-content', 'toolbar-content-' + u._mode);
        },
        function(n, l) {
          var u = l.component;
          n(l, 2, 0, u._hideBb);
          n(l, 5, 0, a._13(l, 7)._hidden);
          n(l, 10, 0, u._backText);
        },
      );
    }
    u.d(l, 'a', function() {
      return s;
    }),
      (l.b = t);
    var a = u(1),
      o = u(18),
      r = u(62),
      e = u(29),
      i = u(3),
      c = u(63),
      s = (u(7), u(30), a.X({ encapsulation: 2, styles: [], data: {} }));
  },
});
