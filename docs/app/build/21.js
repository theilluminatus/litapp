webpackJsonp([21], {
  699: function(l, n, t) {
    'use strict';
    function a(l) {
      return d._22(
        0,
        [
          d._18(402653184, 1, { _vp: 0 }),
          (l()(), d.Z(1, 16777216, [[1, 3], ['viewport', 1]], null, 0, 'div', [], null, null, null, null, null)),
          (l()(), d.Z(2, 0, null, null, 0, 'div', [['class', 'nav-decor']], null, null, null, null, null)),
        ],
        null,
        null,
      );
    }
    function u(l) {
      return d._22(
        0,
        [
          (l()(),
          d.Z(
            0,
            0,
            null,
            null,
            1,
            'ion-icon',
            [['class', 'tab-button-icon'], ['role', 'img']],
            [[2, 'hide', null]],
            null,
            null,
            null,
            null,
          )),
          d.Y(1, 147456, null, 0, z.a, [Y.a, d.j, d.z], { name: [0, 'name'], isActive: [1, 'isActive'] }, null),
        ],
        function(l, n) {
          var t = n.component;
          l(n, 1, 0, t.tab.tabIcon, t.tab.isSelected);
        },
        function(l, n) {
          l(n, 0, 0, d._13(n, 1)._hidden);
        },
      );
    }
    function e(l) {
      return d._22(
        0,
        [
          (l()(), d.Z(0, 0, null, null, 1, 'span', [['class', 'tab-button-text']], null, null, null, null, null)),
          (l()(), d._20(1, null, ['', ''])),
        ],
        null,
        function(l, n) {
          l(n, 1, 0, n.component.tab.tabTitle);
        },
      );
    }
    function i(l) {
      return d._22(
        0,
        [
          (l()(), d.Z(0, 0, null, null, 2, 'ion-badge', [['class', 'tab-badge']], null, null, null, null, null)),
          d.Y(1, 16384, null, 0, U.a, [Y.a, d.j, d.z], { color: [0, 'color'] }, null),
          (l()(), d._20(2, null, ['', ''])),
        ],
        function(l, n) {
          l(n, 1, 0, n.component.tab.tabBadgeStyle);
        },
        function(l, n) {
          l(n, 2, 0, n.component.tab.tabBadge);
        },
      );
    }
    function b(l) {
      return d._22(
        0,
        [
          (l()(), d.U(16777216, null, null, 1, null, u)),
          d.Y(1, 16384, null, 0, R.j, [d.I, d.F], { ngIf: [0, 'ngIf'] }, null),
          (l()(), d.U(16777216, null, null, 1, null, e)),
          d.Y(3, 16384, null, 0, R.j, [d.I, d.F], { ngIf: [0, 'ngIf'] }, null),
          (l()(), d.U(16777216, null, null, 1, null, i)),
          d.Y(5, 16384, null, 0, R.j, [d.I, d.F], { ngIf: [0, 'ngIf'] }, null),
          (l()(), d.Z(6, 0, null, null, 0, 'div', [['class', 'button-effect']], null, null, null, null, null)),
        ],
        function(l, n) {
          var t = n.component;
          l(n, 1, 0, t.tab.tabIcon);
          l(n, 3, 0, t.tab.tabTitle);
          l(n, 5, 0, t.tab.tabBadge);
        },
        null,
      );
    }
    function o(l) {
      return d._22(
        0,
        [
          (l()(),
          d.Z(
            0,
            0,
            null,
            null,
            1,
            'a',
            [['class', 'tab-button'], ['href', '#'], ['role', 'tab']],
            [
              [1, 'id', 0],
              [1, 'aria-controls', 0],
              [1, 'aria-selected', 0],
              [2, 'has-title', null],
              [2, 'has-icon', null],
              [2, 'has-title-only', null],
              [2, 'icon-only', null],
              [2, 'has-badge', null],
              [2, 'disable-hover', null],
              [2, 'tab-disabled', null],
              [2, 'tab-hidden', null],
            ],
            [[null, 'ionSelect'], [null, 'click']],
            function(l, n, t) {
              var a = !0,
                u = l.component;
              if ('click' === n) {
                a = !1 !== d._13(l, 1).onClick() && a;
              }
              if ('ionSelect' === n) {
                a = !1 !== u.select(l.context.$implicit) && a;
              }
              return a;
            },
            b,
            X,
          )),
          d.Y(1, 114688, null, 0, x.a, [Y.a, d.j, d.z], { tab: [0, 'tab'] }, { ionSelect: 'ionSelect' }),
        ],
        function(l, n) {
          l(n, 1, 0, n.context.$implicit);
        },
        function(l, n) {
          l(n, 0, 1, [
            d._13(n, 1).tab._btnId,
            d._13(n, 1).tab._tabId,
            d._13(n, 1).tab.isSelected,
            d._13(n, 1).hasTitle,
            d._13(n, 1).hasIcon,
            d._13(n, 1).hasTitleOnly,
            d._13(n, 1).hasIconOnly,
            d._13(n, 1).hasBadge,
            d._13(n, 1).disHover,
            !d._13(n, 1).tab.enabled,
            !d._13(n, 1).tab.show,
          ]);
        },
      );
    }
    function s(l) {
      return d._22(
        0,
        [
          d._18(402653184, 1, { _highlight: 0 }),
          d._18(402653184, 2, { _tabbar: 0 }),
          d._18(402653184, 3, { portal: 0 }),
          (l()(),
          d.Z(3, 0, [[2, 0], ['tabbar', 1]], null, 4, 'div', [['class', 'tabbar'], ['role', 'tablist']], null, null, null, null, null)),
          (l()(), d.U(16777216, null, null, 1, null, o)),
          d.Y(5, 802816, null, 0, R.i, [d.I, d.F, d.p], { ngForOf: [0, 'ngForOf'] }, null),
          (l()(), d.Z(6, 0, null, null, 1, 'div', [['class', 'tab-highlight']], null, null, null, null, null)),
          d.Y(7, 16384, [[1, 4]], 0, w.a, [d.j, E.a], null, null),
          d._12(null, 0),
          (l()(), d.Z(9, 16777216, [[3, 3], ['portal', 1]], null, 0, 'div', [['tab-portal', '']], null, null, null, null, null)),
        ],
        function(l, n) {
          l(n, 5, 0, n.component._tabs);
        },
        null,
      );
    }
    function c(l) {
      return d._22(
        0,
        [
          (l()(), d.Z(0, 0, null, null, 7, null, null, null, null, null, null, null)),
          (l()(), d._20(-1, null, ['\n      '])),
          (l()(),
          d.Z(
            2,
            0,
            null,
            null,
            1,
            'ion-tab',
            [['role', 'tabpanel'], ['tabIcon', 'filing'], ['tabsHideOnSubPages', 'true']],
            [[1, 'id', 0], [1, 'aria-labelledby', 0]],
            null,
            null,
            a,
            F,
          )),
          d.Y(
            3,
            245760,
            null,
            0,
            m.a,
            [y.a, H.a, Y.a, j.a, d.j, d.u, d.z, d.i, d.g, k.l, L.a, [2, A.a], E.a, d.k],
            {
              root: [0, 'root'],
              tabTitle: [1, 'tabTitle'],
              tabIcon: [2, 'tabIcon'],
              tabBadge: [3, 'tabBadge'],
              tabsHideOnSubPages: [4, 'tabsHideOnSubPages'],
            },
            null,
          ),
          (l()(), d._20(-1, null, ['\n      '])),
          (l()(),
          d.Z(
            5,
            0,
            null,
            null,
            1,
            'ion-tab',
            [['role', 'tabpanel'], ['tabIcon', 'list'], ['tabsHideOnSubPages', 'true']],
            [[1, 'id', 0], [1, 'aria-labelledby', 0]],
            null,
            null,
            a,
            F,
          )),
          d.Y(
            6,
            245760,
            null,
            0,
            m.a,
            [y.a, H.a, Y.a, j.a, d.j, d.u, d.z, d.i, d.g, k.l, L.a, [2, A.a], E.a, d.k],
            { root: [0, 'root'], tabTitle: [1, 'tabTitle'], tabIcon: [2, 'tabIcon'], tabsHideOnSubPages: [3, 'tabsHideOnSubPages'] },
            null,
          ),
          (l()(), d._20(-1, null, ['\n    '])),
        ],
        function(l, n) {
          var t = n.component;
          l(n, 3, 0, t.tab4Root, t.tab4Title, 'filing', '' != t.f.feedbadge && 0 != t.f.feedbadge ? t.f.feedbadge : '', 'true');
          l(n, 6, 0, t.tab5Root, t.tab5Title, 'list', 'true');
        },
        function(l, n) {
          l(n, 2, 0, d._13(n, 3)._tabId, d._13(n, 3)._btnId);
          l(n, 5, 0, d._13(n, 6)._tabId, d._13(n, 6)._btnId);
        },
      );
    }
    function r(l) {
      return d._22(
        0,
        [
          (l()(), d.Z(0, 0, null, null, 10, null, null, null, null, null, null, null)),
          (l()(), d._20(-1, null, ['\n    '])),
          (l()(),
          d.Z(
            2,
            0,
            null,
            null,
            1,
            'ion-tab',
            [['role', 'tabpanel'], ['tabIcon', 'stats'], ['tabsHideOnSubPages', 'true']],
            [[1, 'id', 0], [1, 'aria-labelledby', 0]],
            null,
            null,
            a,
            F,
          )),
          d.Y(
            3,
            245760,
            null,
            0,
            m.a,
            [y.a, H.a, Y.a, j.a, d.j, d.u, d.z, d.i, d.g, k.l, L.a, [2, A.a], E.a, d.k],
            { root: [0, 'root'], tabTitle: [1, 'tabTitle'], tabIcon: [2, 'tabIcon'], tabsHideOnSubPages: [3, 'tabsHideOnSubPages'] },
            null,
          ),
          (l()(), d._20(-1, null, ['\n    '])),
          (l()(),
          d.Z(
            5,
            0,
            null,
            null,
            1,
            'ion-tab',
            [['role', 'tabpanel'], ['tabIcon', 'search'], ['tabsHideOnSubPages', 'true']],
            [[1, 'id', 0], [1, 'aria-labelledby', 0]],
            null,
            null,
            a,
            F,
          )),
          d.Y(
            6,
            245760,
            null,
            0,
            m.a,
            [y.a, H.a, Y.a, j.a, d.j, d.u, d.z, d.i, d.g, k.l, L.a, [2, A.a], E.a, d.k],
            { root: [0, 'root'], tabTitle: [1, 'tabTitle'], tabIcon: [2, 'tabIcon'], tabsHideOnSubPages: [3, 'tabsHideOnSubPages'] },
            null,
          ),
          (l()(), d._20(-1, null, ['\n  \n    '])),
          (l()(), d.U(16777216, null, null, 1, null, c)),
          d.Y(9, 16384, null, 0, R.j, [d.I, d.F], { ngIf: [0, 'ngIf'] }, null),
          (l()(), d._20(-1, null, ['\n\n  '])),
        ],
        function(l, n) {
          var t = n.component;
          l(n, 3, 0, t.tab2Root, t.tab2Title, 'stats', 'true');
          l(n, 6, 0, t.tab3Root, t.tab3Title, 'search', 'true');
          l(n, 9, 0, t.user.isLoggedIn());
        },
        function(l, n) {
          l(n, 2, 0, d._13(n, 3)._tabId, d._13(n, 3)._btnId);
          l(n, 5, 0, d._13(n, 6)._tabId, d._13(n, 6)._btnId);
        },
      );
    }
    function _(l) {
      return d._22(
        0,
        [
          d._18(402653184, 1, { tabs: 0 }),
          (l()(), d.Z(1, 0, null, null, 9, 'ion-tabs', [], null, null, null, s, N)),
          d._17(6144, null, M.a, null, [y.a]),
          d.Y(3, 4374528, [[1, 4], ['tabs', 4]], 0, y.a, [[2, C.a], [2, $.a], H.a, Y.a, d.j, j.a, d.z, A.a, J.a], null, null),
          (l()(), d._20(-1, 0, ['\n  '])),
          (l()(),
          d.Z(
            5,
            0,
            null,
            0,
            1,
            'ion-tab',
            [['role', 'tabpanel'], ['tabIcon', 'book'], ['tabsHideOnSubPages', 'true']],
            [[1, 'id', 0], [1, 'aria-labelledby', 0]],
            null,
            null,
            a,
            F,
          )),
          d.Y(
            6,
            245760,
            null,
            0,
            m.a,
            [y.a, H.a, Y.a, j.a, d.j, d.u, d.z, d.i, d.g, k.l, L.a, [2, A.a], E.a, d.k],
            { root: [0, 'root'], tabTitle: [1, 'tabTitle'], tabIcon: [2, 'tabIcon'], tabsHideOnSubPages: [3, 'tabsHideOnSubPages'] },
            null,
          ),
          (l()(), d._20(-1, 0, ['\n\n  '])),
          (l()(), d.U(16777216, null, 0, 1, null, r)),
          d.Y(9, 16384, null, 0, R.j, [d.I, d.F], { ngIf: [0, 'ngIf'] }, null),
          (l()(), d._20(-1, 0, ['\n'])),
        ],
        function(l, n) {
          var t = n.component;
          l(n, 6, 0, t.tab1Root, t.tab1Title, 'book', 'true');
          l(n, 9, 0, !t.settings.allSettings.offlineMode);
        },
        function(l, n) {
          l(n, 5, 0, d._13(n, 6)._tabId, d._13(n, 6)._btnId);
        },
      );
    }
    Object.defineProperty(n, '__esModule', { value: !0 });
    var d = t(1),
      g = (t(0), t(50)),
      f =
        (t(57),
        t(190),
        (function() {
          return function(l, n, t, a, u, e, i, b) {
            var o = this;
            (this.platform = l),
              (this.app = n),
              (this.navCtrl = t),
              (this.translateService = a),
              (this.api = u),
              (this.user = e),
              (this.settings = i),
              (this.f = b),
              (this.tab1Root = 'HistoryPage'),
              (this.tab2Root = 'ExplorePage'),
              (this.tab3Root = 'SearchPage'),
              (this.tab4Root = 'FeedPage'),
              (this.tab5Root = 'ListListPage'),
              (this.tab1Title = ' '),
              (this.tab2Title = ' '),
              (this.tab3Title = ' '),
              (this.tab4Title = ' '),
              (this.tab5Title = ' '),
              this.platform.registerBackButtonAction(function() {
                o.api.hideLoader(), o.app.goBack();
              }),
              a.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE', 'TAB4_TITLE', 'TAB5_TITLE']).subscribe(function(l) {
                (o.tab1Title = l.TAB1_TITLE),
                  (o.tab2Title = l.TAB2_TITLE),
                  (o.tab3Title = l.TAB3_TITLE),
                  (o.tab4Title = l.TAB4_TITLE),
                  (o.tab5Title = l.TAB5_TITLE);
              });
          };
        })()),
      T = (function() {
        return function() {};
      })(),
      I = t(381),
      h = t(382),
      p = t(383),
      v = t(384),
      S = t(385),
      P = t(386),
      O = t(387),
      B = t(388),
      Z = t(389),
      m = t(220),
      y = t(139),
      H = t(13),
      Y = t(3),
      j = t(6),
      k = t(10),
      L = t(42),
      A = t(23),
      E = t(12),
      F = d.X({ encapsulation: 2, styles: [], data: {} }),
      R = t(18),
      z = t(63),
      U = t(196),
      x = t(221),
      X = d.X({ encapsulation: 2, styles: [], data: {} }),
      w = t(146),
      M = t(43),
      C = t(30),
      $ = t(7),
      J = t(36),
      N = d.X({ encapsulation: 2, styles: [], data: {} }),
      V = t(39),
      W = t(37),
      q = t(52),
      D = t(54),
      G = t(141),
      K = d.X({ encapsulation: 2, styles: [], data: {} }),
      Q = d.V(
        'page-tabs',
        f,
        function(l) {
          return d._22(
            0,
            [
              (l()(), d.Z(0, 0, null, null, 1, 'page-tabs', [], null, null, null, _, K)),
              d.Y(1, 49152, null, 0, f, [j.a, H.a, C.a, V.a, W.a, q.a, D.a, G.a], null, null),
            ],
            null,
            null,
          );
        },
        {},
        {},
        [],
      ),
      ll = t(28),
      nl = t(86),
      tl = t(87),
      al = t(89),
      ul = t(88),
      el = t(126),
      il = t(191),
      bl = t(59);
    t.d(n, 'TabsPageModuleNgFactory', function() {
      return ol;
    });
    var ol = d.W(T, [], function(l) {
      return d._10([
        d._11(512, d.i, d.S, [[8, [I.a, h.a, p.a, v.a, S.a, P.a, O.a, B.a, Z.a, Q]], [3, d.i], d.s]),
        d._11(4608, R.l, R.k, [d.r, [2, R.t]]),
        d._11(4608, ll.r, ll.r, []),
        d._11(4608, ll.d, ll.d, []),
        d._11(4608, nl.b, nl.a, []),
        d._11(4608, tl.a, tl.b, []),
        d._11(4608, al.b, al.a, []),
        d._11(4608, ul.b, ul.a, []),
        d._11(4608, V.a, V.a, [el.a, nl.b, tl.a, al.b, ul.b, V.b, V.c]),
        d._11(512, R.b, R.b, []),
        d._11(512, ll.p, ll.p, []),
        d._11(512, ll.g, ll.g, []),
        d._11(512, ll.n, ll.n, []),
        d._11(512, il.a, il.a, []),
        d._11(512, il.b, il.b, []),
        d._11(512, g.a, g.a, []),
        d._11(512, T, T, []),
        d._11(256, bl.a, f, []),
        d._11(256, V.c, void 0, []),
        d._11(256, V.b, void 0, []),
      ]);
    });
  },
});