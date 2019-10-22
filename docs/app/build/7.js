webpackJsonp([7], {
  682: function(n, l, t) {
    'use strict';
    function u(n) {
      return m._22(
        0,
        [
          (n()(), m.Z(0, 0, null, null, 2, 'p', [['class', 'empty']], null, null, null, null, null)),
          (n()(), m._20(1, null, ['\n    ', '\n  '])),
          m._14(131072, U.a, [L.a, m.g]),
        ],
        null,
        function(n, l) {
          n(l, 1, 0, m._21(l, 1, 0, m._13(l, 2).transform('STORYLIST_EMPTY')));
        },
      );
    }
    function o(n) {
      return m._22(
        0,
        [
          (n()(),
          m.Z(
            0,
            0,
            null,
            null,
            1,
            'story-list-item',
            [],
            null,
            [[null, 'onDeleteBySwiping']],
            function(n, l, t) {
              var u = !0;
              if ('onDeleteBySwiping' === l) {
                u = !1 !== n.component.onDeleteBySwiping.emit(t) && u;
              }
              return u;
            },
            E.c,
            E.a,
          )),
          m.Y(
            1,
            49152,
            null,
            0,
            B.a,
            [D.a, R.a, V.a, H.a],
            { story: [0, 'story'], ishistory: [1, 'ishistory'] },
            { onDeleteBySwiping: 'onDeleteBySwiping' },
          ),
        ],
        function(n, l) {
          n(l, 1, 0, l.context.$implicit, l.component.ishistory);
        },
        null,
      );
    }
    function e(n) {
      return m._22(
        0,
        [
          (n()(),
          m.Z(
            0,
            0,
            null,
            null,
            5,
            'ion-infinite-scroll',
            [],
            null,
            [[null, 'ionInfinite']],
            function(n, l, t) {
              var u = !0;
              if ('ionInfinite' === l) {
                u = !1 !== n.component.loadMore(t) && u;
              }
              return u;
            },
            null,
            null,
          )),
          m.Y(1, 1196032, null, 0, N.a, [$.a, m.u, m.j, W.a], { enabled: [0, 'enabled'] }, { ionInfinite: 'ionInfinite' }),
          (n()(), m._20(-1, null, ['\n      '])),
          (n()(), m.Z(3, 0, null, null, 1, 'ion-infinite-scroll-content', [], [[1, 'state', 0]], null, null, X.b, X.a)),
          m.Y(4, 114688, null, 0, q.a, [N.a, G.a], null, null),
          (n()(), m._20(-1, null, ['\n  '])),
        ],
        function(n, l) {
          n(l, 1, 0, l.component.enableInfinite), n(l, 4, 0);
        },
        function(n, l) {
          n(l, 3, 0, m._13(l, 4).inf.state);
        },
      );
    }
    function i(n) {
      return m._22(
        0,
        [
          (n()(), m._20(-1, null, ['\n'])),
          (n()(), m.Z(1, 0, null, null, 14, 'div', [['style', 'height: 100%; width: 100%']], null, null, null, null, null)),
          (n()(), m._20(-1, null, ['\n  '])),
          (n()(), m.U(16777216, null, null, 1, null, u)),
          m.Y(4, 16384, null, 0, K.j, [m.I, m.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), m._20(-1, null, ['\n\n  '])),
          (n()(), m.Z(6, 0, null, null, 5, 'ion-list', [], null, null, null, null, null)),
          m.Y(7, 16384, null, 0, J.a, [G.a, m.j, m.z, Q.a, nn.l, W.a], { sliding: [0, 'sliding'] }, null),
          (n()(), m._20(-1, null, ['\n\n    '])),
          (n()(), m.U(16777216, null, null, 1, null, o)),
          m.Y(10, 802816, null, 0, K.i, [m.I, m.F, m.p], { ngForOf: [0, 'ngForOf'] }, null),
          (n()(), m._20(-1, null, ['\n\n  '])),
          (n()(), m._20(-1, null, ['\n\n  '])),
          (n()(), m.U(16777216, null, null, 1, null, e)),
          m.Y(14, 16384, null, 0, K.j, [m.I, m.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), m._20(-1, null, ['\n'])),
          (n()(), m._20(-1, null, ['\n'])),
        ],
        function(n, l) {
          var t = l.component;
          n(l, 4, 0, !(null != t.stories && t.stories.length));
          n(l, 7, 0, t.ishistory);
          n(l, 10, 0, t.stories);
          n(l, 14, 0, t.infinite && (null == t.stories ? null : t.stories.length) > 9);
        },
        null,
      );
    }
    function r(n) {
      return m._22(
        0,
        [m._12(null, 0), (n()(), m.Z(1, 0, null, null, 0, 'div', [['class', 'button-effect']], null, null, null, null, null))],
        null,
        null,
      );
    }
    function a(n) {
      return m._22(
        0,
        [
          (n()(),
          m.Z(
            0,
            0,
            null,
            null,
            7,
            'button',
            [['event', 'press'], ['icon-only', ''], ['ion-button', ''], ['navTooltip', '']],
            null,
            [[null, 'click'], [null, 'press'], [null, 'mouseenter'], [null, 'mouseleave']],
            function(n, l, t) {
              var u = !0,
                o = n.component;
              if ('click' === l) {
                u = !1 !== m._13(n, 2).onClick() && u;
              }
              if ('press' === l) {
                u = !1 !== m._13(n, 2).onPress() && u;
              }
              if ('mouseenter' === l) {
                u = !1 !== m._13(n, 2).onMouseEnter() && u;
              }
              if ('mouseleave' === l) {
                u = !1 !== m._13(n, 2).onMouseLeave() && u;
              }
              if ('click' === l) {
                u = !1 !== o.followToggle() && u;
              }
              return u;
            },
            un.b,
            un.a,
          )),
          m.Y(1, 1097728, [[2, 4]], 0, on.a, [[8, ''], G.a, m.j, m.z], null, null),
          m.Y(
            2,
            4210688,
            null,
            0,
            en.a,
            [m.j, m.f, Q.a, m.i],
            { tooltip: [0, 'tooltip'], event: [1, 'event'], navTooltip: [2, 'navTooltip'] },
            null,
          ),
          m._14(131072, U.a, [L.a, m.g]),
          (n()(), m._20(-1, 0, ['\n        '])),
          (n()(), m.Z(5, 0, null, 0, 1, 'ion-icon', [['role', 'img']], [[2, 'hide', null]], null, null, null, null)),
          m.Y(6, 147456, null, 0, rn.a, [G.a, m.j, m.z], { name: [0, 'name'] }, null),
          (n()(), m._20(-1, 0, ['\n      '])),
        ],
        function(n, l) {
          var t = l.component;
          n(l, 2, 0, m._21(l, 2, 0, m._13(l, 3).transform('AUTHOR_TOOLTIP_FOLLOW')), 'press', '');
          n(l, 6, 0, null != t.author && t.author.following ? 'remove-circle' : 'person-add');
        },
        function(n, l) {
          n(l, 5, 0, m._13(l, 6)._hidden);
        },
      );
    }
    function s(n) {
      return m._22(
        0,
        [
          (n()(), m.Z(0, 0, null, null, 3, 'p', [], null, null, null, null, null)),
          (n()(), m._20(1, null, ['', ': ', ''])),
          m._14(131072, U.a, [L.a, m.g]),
          m._16(3, 1),
        ],
        null,
        function(n, l) {
          var t = l.component;
          n(
            l,
            1,
            0,
            m._21(l, 1, 0, m._13(l, 2).transform('AUTHOR_JOINDATE')),
            m._21(l, 1, 1, n(l, 3, 0, m._13(l.parent, 0), 1e3 * (null == t.author ? null : t.author.jointimestamp))),
          );
        },
      );
    }
    function c(n) {
      return m._22(
        0,
        [
          (n()(), m.Z(0, 0, null, null, 3, 'p', [], null, null, null, null, null)),
          (n()(), m._20(1, null, ['', ': ', ''])),
          m._14(131072, U.a, [L.a, m.g]),
          m._16(3, 1),
        ],
        null,
        function(n, l) {
          var t = l.component;
          n(
            l,
            1,
            0,
            m._21(l, 1, 0, m._13(l, 2).transform('AUTHOR_UPDATEDATE')),
            m._21(l, 1, 1, n(l, 3, 0, m._13(l.parent, 0), 1e3 * (null == t.author ? null : t.author.updatetimestamp))),
          );
        },
      );
    }
    function f(n) {
      return m._22(
        0,
        [
          (n()(), m.Z(0, 0, null, null, 4, 'div', [['class', 'arrow']], null, null, null, null, null)),
          (n()(), m._20(-1, null, ['\n      '])),
          (n()(),
          m.Z(2, 0, null, null, 1, 'ion-icon', [['name', 'arrow-down'], ['role', 'img']], [[2, 'hide', null]], null, null, null, null)),
          m.Y(3, 147456, null, 0, rn.a, [G.a, m.j, m.z], { name: [0, 'name'] }, null),
          (n()(), m._20(-1, null, ['\n    '])),
        ],
        function(n, l) {
          n(l, 3, 0, 'arrow-down');
        },
        function(n, l) {
          n(l, 2, 0, m._13(l, 3)._hidden);
        },
      );
    }
    function p(n) {
      return m._22(
        0,
        [(n()(), m.Z(0, 0, null, null, 1, null, null, null, null, null, null, null)), (n()(), m._20(1, null, ['(', ')']))],
        null,
        function(n, l) {
          var t = l.component;
          n(l, 1, 0, null == t.author ? null : t.author.favs.length);
        },
      );
    }
    function _(n) {
      return m._22(
        0,
        [
          (n()(),
          m.Z(
            0,
            0,
            null,
            null,
            1,
            'story-list-normal',
            [['infinite', 'true']],
            null,
            [[null, 'ionInfinite']],
            function(n, l, t) {
              var u = !0;
              if ('ionInfinite' === l) {
                u = !1 !== n.component.loadMoreSubmissions(t) && u;
              }
              return u;
            },
            i,
            ln,
          )),
          m.Y(1, 49152, null, 0, w, [D.a], { stories: [0, 'stories'], infinite: [1, 'infinite'] }, { ionInfinite: 'ionInfinite' }),
        ],
        function(n, l) {
          var t = l.component;
          n(l, 1, 0, null == t.author ? null : t.author.stories, 'true');
        },
        null,
      );
    }
    function h(n) {
      return m._22(
        0,
        [
          (n()(),
          m.Z(
            0,
            0,
            null,
            null,
            1,
            'story-list-normal',
            [['infinite', 'true']],
            null,
            [[null, 'ionInfinite']],
            function(n, l, t) {
              var u = !0;
              if ('ionInfinite' === l) {
                u = !1 !== n.component.loadMoreFavs(t) && u;
              }
              return u;
            },
            i,
            ln,
          )),
          m.Y(1, 49152, null, 0, w, [D.a], { stories: [0, 'stories'], infinite: [1, 'infinite'] }, { ionInfinite: 'ionInfinite' }),
        ],
        function(n, l) {
          var t = l.component;
          n(l, 1, 0, null == t.author ? null : t.author.favs, 'true');
        },
        null,
      );
    }
    function d(n) {
      return m._22(
        0,
        [
          m._14(0, K.d, [m.r]),
          m._18(402653184, 1, { biotext: 0 }),
          (n()(), m.Z(2, 0, null, null, 27, 'ion-header', [], null, null, null, null, null)),
          m.Y(3, 16384, null, 0, an.a, [G.a, m.j, m.z, [2, sn.a]], null, null),
          (n()(), m._20(-1, null, ['\n\n  '])),
          (n()(),
          m.Z(
            5,
            0,
            null,
            null,
            23,
            'ion-navbar',
            [['class', 'toolbar']],
            [[8, 'hidden', 0], [2, 'statusbar-padding', null]],
            null,
            null,
            cn.b,
            cn.a,
          )),
          m.Y(6, 49152, null, 0, fn.a, [pn.a, [2, sn.a], [2, D.a], G.a, m.j, m.z], null, null),
          (n()(), m._20(-1, 3, ['\n    '])),
          (n()(), m.Z(8, 0, null, 3, 2, 'ion-title', [], null, null, null, _n.b, _n.a)),
          m.Y(9, 49152, null, 0, hn.a, [G.a, m.j, m.z, [2, dn.a], [2, fn.a]], null, null),
          (n()(), m._20(10, 0, ['', ''])),
          (n()(), m._20(-1, 3, ['\n    '])),
          (n()(), m.Z(12, 0, null, 2, 15, 'ion-buttons', [['end', '']], null, null, null, null, null)),
          m.Y(13, 16384, null, 1, mn.a, [G.a, m.j, m.z, [2, dn.a], [2, fn.a]], null, null),
          m._18(603979776, 2, { _buttons: 1 }),
          (n()(), m._20(-1, null, ['\n      \n      '])),
          (n()(),
          m.Z(
            16,
            0,
            null,
            null,
            7,
            'button',
            [['event', 'press'], ['icon-only', ''], ['ion-button', ''], ['navTooltip', '']],
            null,
            [[null, 'click'], [null, 'press'], [null, 'mouseenter'], [null, 'mouseleave']],
            function(n, l, t) {
              var u = !0,
                o = n.component;
              if ('click' === l) {
                u = !1 !== m._13(n, 18).onClick() && u;
              }
              if ('press' === l) {
                u = !1 !== m._13(n, 18).onPress() && u;
              }
              if ('mouseenter' === l) {
                u = !1 !== m._13(n, 18).onMouseEnter() && u;
              }
              if ('mouseleave' === l) {
                u = !1 !== m._13(n, 18).onMouseLeave() && u;
              }
              if ('click' === l) {
                u = !1 !== o.share() && u;
              }
              return u;
            },
            un.b,
            un.a,
          )),
          m.Y(17, 1097728, [[2, 4]], 0, on.a, [[8, ''], G.a, m.j, m.z], null, null),
          m.Y(
            18,
            4210688,
            null,
            0,
            en.a,
            [m.j, m.f, Q.a, m.i],
            { tooltip: [0, 'tooltip'], event: [1, 'event'], navTooltip: [2, 'navTooltip'] },
            null,
          ),
          m._14(131072, U.a, [L.a, m.g]),
          (n()(), m._20(-1, 0, ['\n        '])),
          (n()(), m.Z(21, 0, null, 0, 1, 'ion-icon', [['name', 'share'], ['role', 'img']], [[2, 'hide', null]], null, null, null, null)),
          m.Y(22, 147456, null, 0, rn.a, [G.a, m.j, m.z], { name: [0, 'name'] }, null),
          (n()(), m._20(-1, 0, ['\n      '])),
          (n()(), m._20(-1, null, ['\n\n      '])),
          (n()(), m.U(16777216, null, null, 1, null, a)),
          m.Y(26, 16384, null, 0, K.j, [m.I, m.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), m._20(-1, null, ['\n\n    '])),
          (n()(), m._20(-1, 3, ['\n  '])),
          (n()(), m._20(-1, null, ['\n\n'])),
          (n()(), m._20(-1, null, ['\n\n\n'])),
          (n()(),
          m.Z(
            31,
            0,
            null,
            null,
            46,
            'ion-content',
            [['padding', '']],
            [[2, 'statusbar-padding', null], [2, 'has-refresher', null]],
            null,
            null,
            gn.b,
            gn.a,
          )),
          m.Y(32, 4374528, null, 0, $.a, [G.a, Q.a, W.a, m.j, m.z, pn.a, bn.a, m.u, [2, sn.a], [2, D.a]], null, null),
          (n()(), m._20(-1, 1, ['\n\n  '])),
          (n()(), m.Z(34, 0, null, 1, 1, 'ion-img', [], null, null, null, vn.b, vn.a)),
          m.Y(35, 1228800, null, 0, yn.a, [m.j, m.z, Q.a, [2, $.a], W.a], { src: [0, 'src'] }, null),
          (n()(), m._20(-1, 1, ['\n  '])),
          (n()(), m.U(16777216, null, 1, 1, null, s)),
          m.Y(38, 16384, null, 0, K.j, [m.I, m.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), m._20(-1, 1, ['\n  '])),
          (n()(), m.U(16777216, null, 1, 1, null, c)),
          m.Y(41, 16384, null, 0, K.j, [m.I, m.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), m._20(-1, 1, ['\n\n  '])),
          (n()(), m.Z(43, 0, null, 1, 6, 'div', [['class', 'bio']], null, null, null, null, null)),
          (n()(), m._20(-1, null, ['\n    '])),
          (n()(), m.Z(45, 0, [[1, 0], ['biotext', 1]], null, 0, 'p', [], [[8, 'innerHTML', 1]], null, null, null, null)),
          (n()(), m._20(-1, null, ['\n    '])),
          (n()(), m.U(16777216, null, null, 1, null, f)),
          m.Y(48, 16384, null, 0, K.j, [m.I, m.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), m._20(-1, null, ['\n  '])),
          (n()(), m._20(-1, 1, ['\n\n\n  '])),
          (n()(),
          m.Z(
            51,
            0,
            null,
            1,
            19,
            'ion-segment',
            [],
            [
              [2, 'ng-untouched', null],
              [2, 'ng-touched', null],
              [2, 'ng-pristine', null],
              [2, 'ng-dirty', null],
              [2, 'ng-valid', null],
              [2, 'ng-invalid', null],
              [2, 'ng-pending', null],
              [2, 'segment-disabled', null],
            ],
            [[null, 'ngModelChange']],
            function(n, l, t) {
              var u = !0;
              if ('ngModelChange' === l) {
                u = !1 !== (n.component.openSegment = t) && u;
              }
              return u;
            },
            null,
            null,
          )),
          m.Y(
            52,
            671744,
            null,
            0,
            wn.m,
            [[8, null], [8, null], [8, null], [8, null]],
            { model: [0, 'model'] },
            { update: 'ngModelChange' },
          ),
          m._17(2048, null, wn.i, null, [wn.m]),
          m.Y(54, 16384, null, 0, wn.j, [wn.i], null, null),
          m.Y(55, 1196032, null, 1, In.a, [G.a, m.j, m.z, [2, wn.i]], null, null),
          m._18(603979776, 3, { _buttons: 1 }),
          (n()(), m._20(-1, null, ['\n    '])),
          (n()(),
          m.Z(
            58,
            0,
            null,
            null,
            3,
            'ion-segment-button',
            [['class', 'segment-button'], ['role', 'button'], ['tappable', ''], ['value', 'stories']],
            [[2, 'segment-button-disabled', null], [2, 'segment-activated', null], [1, 'aria-pressed', 0]],
            [[null, 'click']],
            function(n, l, t) {
              var u = !0,
                o = n.component;
              if ('click' === l) {
                u = !1 !== m._13(n, 59).onClick() && u;
              }
              if ('click' === l) {
                u = !1 !== o.loadSubmissions() && u;
              }
              return u;
            },
            r,
            Tn,
          )),
          m.Y(59, 114688, [[3, 4]], 0, Yn.a, [], { value: [0, 'value'] }, null),
          (n()(), m._20(60, 0, ['\n      ', ' (', ')\n    '])),
          m._14(131072, U.a, [L.a, m.g]),
          (n()(), m._20(-1, null, ['\n    '])),
          (n()(),
          m.Z(
            63,
            0,
            null,
            null,
            6,
            'ion-segment-button',
            [['class', 'segment-button'], ['role', 'button'], ['tappable', ''], ['value', 'favs']],
            [[2, 'segment-button-disabled', null], [2, 'segment-activated', null], [1, 'aria-pressed', 0]],
            [[null, 'click']],
            function(n, l, t) {
              var u = !0,
                o = n.component;
              if ('click' === l) {
                u = !1 !== m._13(n, 64).onClick() && u;
              }
              if ('click' === l) {
                u = !1 !== o.loadFavs() && u;
              }
              return u;
            },
            r,
            Tn,
          )),
          m.Y(64, 114688, [[3, 4]], 0, Yn.a, [], { value: [0, 'value'] }, null),
          (n()(), m._20(65, 0, ['\n      ', ' '])),
          m._14(131072, U.a, [L.a, m.g]),
          (n()(), m.U(16777216, null, 0, 1, null, p)),
          m.Y(68, 16384, null, 0, K.j, [m.I, m.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), m._20(-1, 0, ['\n    '])),
          (n()(), m._20(-1, null, ['\n  '])),
          (n()(), m._20(-1, 1, ['\n\n  '])),
          (n()(), m.U(16777216, null, 1, 1, null, _)),
          m.Y(73, 16384, null, 0, K.j, [m.I, m.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), m._20(-1, 1, ['\n\n\t'])),
          (n()(), m.U(16777216, null, 1, 1, null, h)),
          m.Y(76, 16384, null, 0, K.j, [m.I, m.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), m._20(-1, 1, ['\n\n'])),
          (n()(), m._20(-1, null, ['\n'])),
        ],
        function(n, l) {
          var t = l.component;
          n(l, 18, 0, m._21(l, 18, 0, m._13(l, 19).transform('SHARE_BUTTON')), 'press', '');
          n(l, 22, 0, 'share');
          n(l, 26, 0, t.user.isLoggedIn());
          n(l, 35, 0, (null == t.author ? null : t.author.picture) + '');
          n(l, 38, 0, null == t.author ? null : t.author.jointimestamp);
          n(l, 41, 0, null == t.author ? null : t.author.updatetimestamp);
          n(l, 48, 0, t.showArrow);
          n(l, 52, 0, t.openSegment);
          n(l, 59, 0, 'stories');
          n(l, 64, 0, 'favs');
          n(l, 68, 0, null == t.author ? null : t.author.favs);
          n(l, 73, 0, 'stories' == t.openSegment);
          n(l, 76, 0, 'favs' == t.openSegment);
        },
        function(n, l) {
          var t = l.component;
          n(l, 5, 0, m._13(l, 6)._hidden, m._13(l, 6)._sbPadding);
          n(l, 10, 0, null == t.author ? null : t.author.name);
          n(l, 21, 0, m._13(l, 22)._hidden);
          n(l, 31, 0, m._13(l, 32).statusbarPadding, m._13(l, 32)._hasRefresher);
          n(l, 45, 0, null == t.author ? null : t.author.bio);
          n(
            l,
            51,
            0,
            m._13(l, 54).ngClassUntouched,
            m._13(l, 54).ngClassTouched,
            m._13(l, 54).ngClassPristine,
            m._13(l, 54).ngClassDirty,
            m._13(l, 54).ngClassValid,
            m._13(l, 54).ngClassInvalid,
            m._13(l, 54).ngClassPending,
            m._13(l, 55)._disabled,
          );
          n(l, 58, 0, m._13(l, 59)._disabled, m._13(l, 59).isActive, m._13(l, 59).isActive);
          n(l, 60, 0, m._21(l, 60, 0, m._13(l, 61).transform('SUBMISSIONS')), null == t.author ? null : t.author.storycount);
          n(l, 63, 0, m._13(l, 64)._disabled, m._13(l, 64).isActive, m._13(l, 64).isActive);
          n(l, 65, 0, m._21(l, 65, 0, m._13(l, 66).transform('FAVORITES')));
        },
      );
    }
    Object.defineProperty(l, '__esModule', { value: !0 });
    var m = t(1),
      g = (t(0), t(57), t(50)),
      b = (t(706), t(204)),
      v = (t(190), t(395)),
      y = (function() {
        function n(n, l, t, u, o, e, i) {
          var r = this;
          (this.socialSharing = n),
            (this.navCtrl = l),
            (this.navParams = t),
            (this.translate = u),
            (this.s = o),
            (this.a = e),
            (this.user = i),
            (this.showArrow = !1),
            (this.loaded = !1),
            (this.openSegment = ''),
            (this.currentSubmissionsPage = 1),
            (this.currentFavsPage = 1);
          var a = t.get('author');
          this.a.getDetails(a.id).subscribe(function(n) {
            (r.author = n), (r.loaded = !0);
          });
        }
        return (
          (n.prototype.ionViewDidEnter = function() {
            var n = this,
              l = setInterval(function() {
                n.loaded && ((n.showArrow = n.biotext.nativeElement.scrollHeight > n.biotext.nativeElement.clientHeight), clearInterval(l));
              }, 50);
          }),
          (n.prototype.loadSubmissions = function() {
            var n = this;
            this.author.stories ||
              this.s.getAuthorStories(this.author.id).subscribe(function(l) {
                n.author.stories = l[0];
              });
          }),
          (n.prototype.loadFavs = function() {
            var n = this;
            this.author.favs ||
              this.s.getAuthorFavs(this.author.id).subscribe(function(l) {
                n.author.favs = l[0];
              });
          }),
          (n.prototype.loadMoreSubmissions = function(n) {
            var l = this;
            (!this.author.storycount || this.author.storycount < 11) && n.enable(!1),
              (this.currentSubmissionsPage += 1),
              this.s.getAuthorStories(this.author.id, this.currentSubmissionsPage).subscribe(function(t) {
                t[0].length
                  ? (t[0].forEach(function(n) {
                      return l.author.stories.push(n);
                    }),
                    n.complete())
                  : n.enable(!1);
              });
          }),
          (n.prototype.loadMoreFavs = function(n) {
            var l = this;
            (this.currentFavsPage += 1),
              this.s.getAuthorFavs(this.author.id, this.currentFavsPage).subscribe(function(t) {
                t[0].length
                  ? (t[0].forEach(function(n) {
                      return l.author.favs.push(n);
                    }),
                    n.complete())
                  : n.enable(!1);
              });
          }),
          (n.prototype.followToggle = function() {
            this.author.following ? this.a.unfollow(this.author) : this.a.follow(this.author);
          }),
          (n.prototype.share = function() {
            var n = this,
              l = 'https://www.literotica.com/stories/memberpage.php?uid=' + this.author.id;
            this.socialSharing.share(null, null, null, l).catch(function(t) {
              return Object(v.a)(t, function() {
                n.translate.get('COPYPROMPT_MSG').subscribe(function(n) {
                  return prompt(n, l);
                });
              });
            });
          }),
          n
        );
      })(),
      w = (function() {
        function n(n) {
          (this.navCtrl = n),
            (this.Math = Math),
            (this.ishistory = !1),
            (this.infinite = !1),
            (this.onDeleteBySwiping = new m.l()),
            (this.ionInfinite = new m.l()),
            (this.enableInfinite = !0);
        }
        return (
          (n.prototype.enableInfinity = function() {
            this.enableInfinite = !0;
          }),
          (n.prototype.loadMore = function(n) {
            this.infinite && this.ionInfinite.emit(n);
          }),
          n
        );
      })(),
      I = t(713),
      Y = t(708),
      T = (function() {
        return function() {};
      })(),
      j = (function() {
        return function() {};
      })(),
      k = t(381),
      Z = t(382),
      S = t(383),
      C = t(384),
      x = t(385),
      F = t(386),
      P = t(387),
      O = t(388),
      A = t(389),
      M = t(712),
      z = t(716),
      E = t(714),
      U = t(125),
      L = t(39),
      B = t(711),
      D = t(30),
      R = t(127),
      V = t(131),
      H = t(52),
      N = t(129),
      $ = t(31),
      W = t(12),
      X = t(720),
      q = t(194),
      G = t(3),
      K = t(18),
      J = t(64),
      Q = t(6),
      nn = t(10),
      ln = m.X({ encapsulation: 2, styles: [], data: {} }),
      tn = m.V(
        'story-list-normal',
        w,
        function(n) {
          return m._22(
            0,
            [
              (n()(), m.Z(0, 0, null, null, 1, 'story-list-normal', [], null, null, null, i, ln)),
              m.Y(1, 49152, null, 0, w, [D.a], null, null),
            ],
            null,
            null,
          );
        },
        { stories: 'stories', ishistory: 'ishistory', infinite: 'infinite' },
        { onDeleteBySwiping: 'onDeleteBySwiping', ionInfinite: 'ionInfinite' },
        [],
      ),
      un = t(62),
      on = t(29),
      en = t(704),
      rn = t(63),
      an = t(128),
      sn = t(7),
      cn = t(709),
      fn = t(51),
      pn = t(13),
      _n = t(390),
      hn = t(90),
      dn = t(53),
      mn = t(195),
      gn = t(391),
      bn = t(36),
      vn = t(725),
      yn = t(201),
      wn = t(28),
      In = t(228),
      Yn = t(144),
      Tn = m.X({ encapsulation: 2, styles: [], data: {} }),
      jn = t(16),
      kn = t(66),
      Zn = t(94),
      Sn = m.X({ encapsulation: 2, styles: [], data: {} }),
      Cn = m.V(
        'page-author',
        y,
        function(n) {
          return m._22(
            0,
            [
              (n()(), m.Z(0, 0, null, null, 1, 'page-author', [], null, null, null, d, Sn)),
              m.Y(1, 49152, null, 0, y, [b.a, D.a, jn.a, L.a, kn.a, Zn.a, H.a], null, null),
            ],
            null,
            null,
          );
        },
        {},
        {},
        [],
      ),
      xn = t(86),
      Fn = t(87),
      Pn = t(89),
      On = t(88),
      An = t(126),
      Mn = t(191),
      zn = t(707),
      En = t(703),
      Un = t(59);
    t.d(l, 'AuthorPageModuleNgFactory', function() {
      return Ln;
    });
    var Ln = m.W(j, [], function(n) {
      return m._10([
        m._11(512, m.i, m.S, [[8, [k.a, Z.a, S.a, C.a, x.a, F.a, P.a, O.a, A.a, M.a, z.a, E.b, tn, Cn]], [3, m.i], m.s]),
        m._11(4608, K.l, K.k, [m.r, [2, K.t]]),
        m._11(4608, wn.r, wn.r, []),
        m._11(4608, wn.d, wn.d, []),
        m._11(4608, xn.b, xn.a, []),
        m._11(4608, Fn.a, Fn.b, []),
        m._11(4608, Pn.b, Pn.a, []),
        m._11(4608, On.b, On.a, []),
        m._11(4608, L.a, L.a, [An.a, xn.b, Fn.a, Pn.b, On.b, L.b, L.c]),
        m._11(512, K.b, K.b, []),
        m._11(512, wn.p, wn.p, []),
        m._11(512, wn.g, wn.g, []),
        m._11(512, wn.n, wn.n, []),
        m._11(512, Mn.a, Mn.a, []),
        m._11(512, Mn.b, Mn.b, []),
        m._11(512, g.a, g.a, []),
        m._11(512, zn.a, zn.a, []),
        m._11(512, En.a, En.a, []),
        m._11(512, En.f, En.f, []),
        m._11(512, En.c, En.c, []),
        m._11(512, En.b, En.b, []),
        m._11(512, En.d, En.d, []),
        m._11(512, En.e, En.e, []),
        m._11(512, Y.a, Y.a, []),
        m._11(512, I.a, I.a, []),
        m._11(512, T, T, []),
        m._11(512, j, j, []),
        m._11(256, Un.a, y, []),
        m._11(256, L.c, void 0, []),
        m._11(256, L.b, void 0, []),
      ]);
    });
  },
  703: function(n, l, t) {
    'use strict';
    function u(n) {
      return void 0 === n;
    }
    function o(n) {
      return 'string' == typeof n;
    }
    function e(n, l) {
      var t = l.split('.'),
        o = t.shift();
      return t.reduce(function(n, l) {
        return u(n) || u(n[l]) ? void 0 : n[l];
      }, n[o || '']);
    }
    t.d(l, 'e', function() {
      return h;
    }),
      t.d(l, 'a', function() {
        return a;
      }),
      t.d(l, 'g', function() {
        return r;
      }),
      t.d(l, 'd', function() {
        return s;
      }),
      t.d(l, 'f', function() {
        return f;
      }),
      t.d(l, 'h', function() {
        return c;
      }),
      t.d(l, 'c', function() {
        return p;
      }),
      t.d(l, 'b', function() {
        return _;
      });
    var i = t(0),
      r = (function() {
        function n() {}
        return (
          (n.prototype.transform = function(l, t) {
            if (!Array.isArray(l)) return l;
            var u = Object(i.__spread)(l);
            if (Array.isArray(t))
              return u.sort(function(l, u) {
                for (var o = t.length, e = 0; e < o; ++e) {
                  var r = Object(i.__read)(n.extractFromConfig(t[e]), 2),
                    a = n.orderCompare(r[0], r[1], l, u);
                  if (0 !== a) return a;
                }
                return 0;
              });
            if (o(t)) {
              var e = Object(i.__read)(n.extractFromConfig(t), 3),
                r = e[0],
                a = e[1];
              if (1 === t.length)
                switch (e[2]) {
                  case '+':
                    return u.sort(n.simpleSort.bind(this));
                  case '-':
                    return u.sort(n.simpleSort.bind(this)).reverse();
                }
              return u.sort(n.orderCompare.bind(this, r, a));
            }
            return u.sort(n.simpleSort.bind(this));
          }),
          (n.simpleSort = function(n, l) {
            return o(n) && o(l) ? n.toLowerCase().localeCompare(l.toLowerCase()) : n - l;
          }),
          (n.orderCompare = function(n, l, t, i) {
            var r = e(t, n),
              a = e(i, n);
            if (r === a) return 0;
            if (u(r) || '' === r) return 1;
            if (u(a) || '' === a) return -1;
            if (o(r) && o(a)) {
              var s = r.toLowerCase().localeCompare(a.toLowerCase());
              return l ? s : -s;
            }
            return l ? r - a : a - r;
          }),
          (n.extractFromConfig = function(n) {
            var l = n.substr(0, 1);
            return [n.replace(/^[-+]/, ''), '-' !== l, l];
          }),
          n
        );
      })(),
      a = (function() {
        return function() {};
      })(),
      s = (function() {
        return function() {};
      })(),
      c = (function() {
        function n() {}
        return (
          (n.prototype.transform = function(n, l, t) {
            if ((void 0 === l && (l = 1), void 0 === t && (t = ''), l <= 0)) throw new RangeError();
            return 1 === l ? n : this.repeat(n, l - 1, t);
          }),
          (n.prototype.repeat = function(n, l, t) {
            return o(n) ? (0 === l ? n : n + t + this.repeat(n, l - 1, t)) : n;
          }),
          n
        );
      })(),
      f = (function() {
        return function() {};
      })(),
      p = (function() {
        return function() {};
      })(),
      _ = (function() {
        return function() {};
      })(),
      h = (function() {
        return function() {};
      })();
  },
  704: function(n, l, t) {
    'use strict';
    t.d(l, 'a', function() {
      return o;
    });
    t(57);
    var u = t(705),
      o = (function() {
        function n(n, l, t, u) {
          (this.el = n),
            (this.appRef = l),
            (this.platform = t),
            (this._componentFactoryResolver = u),
            (this.event = 'click'),
            (this.duration = 3e3),
            (this._arrow = !1),
            (this._navTooltip = !1),
            (this._canShow = !0),
            (this._active = !1);
        }
        return (
          Object.defineProperty(n.prototype, 'navTooltip', {
            get: function() {
              return this._navTooltip;
            },
            set: function(n) {
              this._navTooltip = 'boolean' != typeof n || !1 !== n;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'arrow', {
            get: function() {
              return this._arrow;
            },
            set: function(n) {
              this._arrow = 'boolean' != typeof n || !1 !== n;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'active', {
            get: function() {
              return this._active;
            },
            set: function(n) {
              (this._active = 'boolean' != typeof n || !1 !== n), this._active ? this.canShow && this.showTooltip() : this._removeTooltip();
            },
            enumerable: !0,
            configurable: !0,
          }),
          (n.prototype.ngAfterViewInit = function() {
            this._active && this.trigger();
          }),
          Object.defineProperty(n.prototype, 'canShow', {
            get: function() {
              return this._canShow && '' !== this.tooltip;
            },
            set: function(n) {
              this._canShow = n;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (n.prototype.trigger = function() {
            this.canShow && (this.tooltipElement ? this._resetTimer() : this.showTooltip());
          }),
          (n.prototype.showTooltip = function() {
            var n = this;
            this._createTooltipComponent();
            var l = this.tooltipElement.instance;
            (l.text = this.tooltip),
              l.init.then(function() {
                var t = n._getTooltipPosition();
                if (((l.posLeft = t.left), (l.posTop = t.top), (l.fadeState = 'visible'), n.arrow)) {
                  l.arrow = 'top' === n.positionV ? 'bottom' : 'bottom' === n.positionV ? 'top' : 'left' === n.positionH ? 'right' : 'left';
                }
                n._active || (n.tooltipTimeout = setTimeout(n._removeTooltip.bind(n), n.duration));
              });
          }),
          (n.prototype.onClick = function() {
            'click' === this.event && this.trigger();
          }),
          (n.prototype.onPress = function() {
            'press' === this.event && this.trigger();
          }),
          (n.prototype.onMouseEnter = function() {
            'hover' === this.event && (this.active = !0);
          }),
          (n.prototype.onMouseLeave = function() {
            'hover' === this.event && (this.active = !1);
          }),
          (n.prototype._createTooltipComponent = function() {
            var n = this.appRef.components[0]._component._viewport,
              l = this._componentFactoryResolver.resolveComponentFactory(u.a);
            this.tooltipElement = n.createComponent(l);
          }),
          (n.prototype._getTooltipPosition = function() {
            var n,
              l,
              t = this.tooltipElement.instance.getNativeElement(),
              u = this.el.nativeElement,
              o = u.getBoundingClientRect(),
              e = 10;
            return (
              this.navTooltip && ((this.positionV = 'bottom'), (this.arrow = !1), (e = 20)),
              (n =
                'right' === this.positionH
                  ? o.right + e
                  : 'left' === this.positionH
                  ? o.left - e - t.offsetWidth
                  : this.navTooltip
                  ? o.left + u.offsetWidth / 2
                  : o.left),
              (l =
                'top' === this.positionV
                  ? o.top - e - t.offsetHeight
                  : 'bottom' === this.positionV
                  ? o.bottom + e
                  : o.top + u.offsetHeight / 2 - t.offsetHeight / 2),
              n + t.offsetWidth + e > this.platform.width()
                ? (n = this.platform.width() - t.offsetWidth - e)
                : n + t.offsetWidth - e < 0 && (n = e),
              { left: n, top: l }
            );
          }),
          (n.prototype._removeTooltip = function() {
            var n = this;
            if (!this.tooltipElement) return (this.tooltipElement = void 0), void (this.tooltipTimeout = void 0);
            (this.tooltipElement.instance.fadeState = 'invisible'),
              (this.canShow = !1),
              setTimeout(function() {
                n.tooltipElement && 'function' == typeof n.tooltipElement.destroy && n.tooltipElement.destroy(),
                  (n.tooltipElement = n.tooltipTimeout = void 0),
                  (n.canShow = !0);
              }, 300);
          }),
          (n.prototype._resetTimer = function() {
            (this.active = !1),
              clearTimeout(this.tooltipTimeout),
              (this.tooltipTimeout = setTimeout(this._removeTooltip.bind(this), this.duration));
          }),
          n
        );
      })();
  },
  705: function(n, l, t) {
    'use strict';
    t.d(l, 'a', function() {
      return u;
    });
    t(132);
    var u = (function() {
      function n(n, l) {
        var t = this;
        (this.elementRef = n),
          (this.rnd = l),
          (this.fadeState = 'invisible'),
          (this.init = new Promise(function(n) {
            t.initResolve = n;
          }));
      }
      return (
        Object.defineProperty(n.prototype, 'arrow', {
          set: function(n) {
            this.rnd.setAttribute(this.getNativeElement(), 'class', 'has-arrow arrow-' + n);
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, 'posTop', {
          set: function(n) {
            this.rnd.setStyle(this.getNativeElement(), 'top', n + 'px');
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, 'posLeft', {
          set: function(n) {
            this.rnd.setStyle(this.getNativeElement(), 'left', n + 'px');
          },
          enumerable: !0,
          configurable: !0,
        }),
        (n.prototype.getNativeElement = function() {
          return this.elementRef.nativeElement;
        }),
        (n.prototype.ngAfterViewInit = function() {
          this.initResolve();
        }),
        n
      );
    })();
  },
  706: function(n, l, t) {
    'use strict';
    t(704), t(707);
  },
  707: function(n, l, t) {
    'use strict';
    t.d(l, 'a', function() {
      return u;
    });
    t(57), t(704);
    var u = (function() {
      return function() {};
    })();
  },
  708: function(n, l, t) {
    'use strict';
    t.d(l, 'a', function() {
      return u;
    });
    t(0), t(57), t(50), t(706);
    var u = (function() {
      return function() {};
    })();
  },
  709: function(n, l, t) {
    'use strict';
    function u(n) {
      return o._22(
        0,
        [
          (n()(), o.Z(0, 0, null, null, 1, 'div', [['class', 'toolbar-background']], null, null, null, null, null)),
          o.Y(1, 278528, null, 0, e.h, [o.p, o.q, o.j, o.A], { klass: [0, 'klass'], ngClass: [1, 'ngClass'] }, null),
          (n()(),
          o.Z(
            2,
            0,
            null,
            null,
            8,
            'button',
            [['class', 'back-button'], ['ion-button', 'bar-button']],
            [[8, 'hidden', 0]],
            [[null, 'click']],
            function(n, l, t) {
              var u = !0;
              if ('click' === l) {
                u = !1 !== n.component.backButtonClick(t) && u;
              }
              return u;
            },
            i.b,
            i.a,
          )),
          o.Y(3, 278528, null, 0, e.h, [o.p, o.q, o.j, o.A], { klass: [0, 'klass'], ngClass: [1, 'ngClass'] }, null),
          o.Y(4, 1097728, null, 0, r.a, [[8, 'bar-button'], a.a, o.j, o.z], null, null),
          (n()(),
          o.Z(5, 0, null, 0, 2, 'ion-icon', [['class', 'back-button-icon'], ['role', 'img']], [[2, 'hide', null]], null, null, null, null)),
          o.Y(6, 278528, null, 0, e.h, [o.p, o.q, o.j, o.A], { klass: [0, 'klass'], ngClass: [1, 'ngClass'] }, null),
          o.Y(7, 147456, null, 0, s.a, [a.a, o.j, o.z], { name: [0, 'name'] }, null),
          (n()(), o.Z(8, 0, null, 0, 2, 'span', [['class', 'back-button-text']], null, null, null, null, null)),
          o.Y(9, 278528, null, 0, e.h, [o.p, o.q, o.j, o.A], { klass: [0, 'klass'], ngClass: [1, 'ngClass'] }, null),
          (n()(), o._20(10, null, ['', ''])),
          o._12(null, 0),
          o._12(null, 1),
          o._12(null, 2),
          (n()(), o.Z(14, 0, null, null, 2, 'div', [['class', 'toolbar-content']], null, null, null, null, null)),
          o.Y(15, 278528, null, 0, e.h, [o.p, o.q, o.j, o.A], { klass: [0, 'klass'], ngClass: [1, 'ngClass'] }, null),
          o._12(null, 3),
        ],
        function(n, l) {
          var t = l.component;
          n(l, 1, 0, 'toolbar-background', 'toolbar-background-' + t._mode);
          n(l, 3, 0, 'back-button', 'back-button-' + t._mode);
          n(l, 6, 0, 'back-button-icon', 'back-button-icon-' + t._mode);
          n(l, 7, 0, t._bbIcon);
          n(l, 9, 0, 'back-button-text', 'back-button-text-' + t._mode);
          n(l, 15, 0, 'toolbar-content', 'toolbar-content-' + t._mode);
        },
        function(n, l) {
          var t = l.component;
          n(l, 2, 0, t._hideBb);
          n(l, 5, 0, o._13(l, 7)._hidden);
          n(l, 10, 0, t._backText);
        },
      );
    }
    t.d(l, 'a', function() {
      return c;
    }),
      (l.b = u);
    var o = t(1),
      e = t(18),
      i = t(62),
      r = t(29),
      a = t(3),
      s = t(63),
      c = (t(7), t(30), o.X({ encapsulation: 2, styles: [], data: {} }));
  },
  710: function(n, l, t) {
    'use strict';
    t.d(l, 'a', function() {
      return u;
    });
    t(0), t(57), t(190);
    var u = (function() {
      function n(n, l, t, u) {
        var o = this;
        (this.platform = l),
          (this.viewCtrl = t),
          (this.l = u),
          (this.story = n.get('story')),
          this.l.onReady().then(function() {
            o.l.query().subscribe(function(n) {
              n && (o.alllists = n);
            });
          });
      }
      return (
        (n.prototype.ionViewDidEnter = function() {
          var n = this;
          this.unregister = this.platform.registerBackButtonAction(function() {
            n.viewCtrl.dismiss(), n.unregister();
          });
        }),
        (n.prototype.ionViewDidLeave = function() {
          this.unregister();
        }),
        (n.prototype.toggleFromList = function(n) {
          n.stories
            ? n.stories.indexOf(this.story) > -1
              ? this.l.removeStory(n, this.story)
              : this.l.addStory(n, this.story)
            : this.l.getById(n.urlname).subscribe();
        }),
        n
      );
    })();
  },
  711: function(n, l, t) {
    'use strict';
    t.d(l, 'a', function() {
      return o;
    });
    t(0);
    var u = t(1),
      o =
        (t(57),
        t(190),
        t(393),
        (function() {
          function n(n, l, t, o) {
            (this.navCtrl = n),
              (this.popoverCtrl = l),
              (this.loadingCtrl = t),
              (this.user = o),
              (this.Math = Math),
              (this.ishistory = !1),
              (this.onDeleteBySwiping = new u.l()),
              (this.onDownloadBySwiping = new u.l());
          }
          return (
            (n.prototype.handlePress = function(n, l) {
              var t = this;
              clearTimeout(this.pressTimer),
                (this.pressTimer = setTimeout(function() {
                  t.openStoryDetail(n);
                }, 750));
            }),
            (n.prototype.handleClick = function(n, l) {
              clearTimeout(this.pressTimer), this.openStory(n);
            }),
            (n.prototype.openStory = function(n) {
              var l,
                t = this;
              n.length > 35 && (l = this.loadingCtrl.create({ spinner: 'crescent' })).present(),
                setTimeout(
                  function() {
                    t.navCtrl.push('StoryViewPage', { story: n, loader: l });
                  },
                  n.length > 35 ? 100 : 0,
                );
            }),
            (n.prototype.openStoryDetail = function(n) {
              this.navCtrl.push('StoryDetailPage', { story: n });
            }),
            (n.prototype.showAuthor = function(n, l) {
              l.stopPropagation(), this.navCtrl.push('AuthorPage', { author: n });
            }),
            (n.prototype.openListPicker = function(n, l) {
              l.stopPropagation();
              this.popoverCtrl.create('BookmarkPopover', { story: n }).present({ ev: l });
            }),
            (n.prototype.delete = function(n, l) {
              l.close(), this.onDeleteBySwiping.emit(n);
            }),
            (n.prototype.download = function(n, l) {
              l.close(), this.onDownloadBySwiping.emit(n);
            }),
            n
          );
        })());
  },
  712: function(n, l, t) {
    'use strict';
    function u(n) {
      return o._22(2, [(n()(), o._20(0, null, ['', '']))], null, function(n, l) {
        n(l, 0, 0, l.component.text);
      });
    }
    t.d(l, 'a', function() {
      return r;
    });
    var o = t(1),
      e = t(705),
      i = o.X({
        encapsulation: 0,
        styles: [
          '[_nghost-%COMP%] {\n              background-color: rgba(0,0,0,0.8);\n              color: white;\n              display: inline-block;\n              position: fixed;\n              padding: 15px 25px;\n              font-size: 15px;\n          }',
          ".has-arrow[_nghost-%COMP%]:before {\n              content: '';\n              border: 5px solid transparent;\n              position: absolute;\n              width: 0;\n              height: 0;\n          }",
          '.has-arrow.arrow-top[_nghost-%COMP%]:before { border-bottom: 5px solid rgba(0,0,0,0.8); top: -10px; }',
          '.has-arrow.arrow-left[_nghost-%COMP%]:before { border-right: 5px solid rgba(0,0,0,0.8); left: -10px; }',
          '.has-arrow.arrow-right[_nghost-%COMP%]:before { border-left: 5px solid rgba(0,0,0,0.8); right: -10px; }',
          '.has-arrow.arrow-bottom[_nghost-%COMP%]:before { border-top: 5px solid rgba(0,0,0,0.8); bottom: -10px; }',
        ],
        data: {
          animation: [
            {
              type: 7,
              name: 'fade',
              definitions: [
                { type: 0, name: 'visible', styles: { type: 6, styles: { opacity: 1 }, offset: null }, options: void 0 },
                { type: 0, name: 'invisible', styles: { type: 6, styles: { opacity: 0 }, offset: null }, options: void 0 },
                { type: 1, expr: 'visible <=> invisible', animation: { type: 4, styles: null, timings: '300ms linear' }, options: null },
              ],
              options: {},
            },
          ],
        },
      }),
      r = o.V(
        'tooltip-box',
        e.a,
        function(n) {
          return o._22(
            0,
            [
              (n()(), o.Z(0, 0, null, null, 1, 'tooltip-box', [], [[40, '@fade', 0]], null, null, u, i)),
              o.Y(1, 4243456, null, 0, e.a, [o.j, o.A], null, null),
            ],
            null,
            function(n, l) {
              n(l, 0, 0, o._13(l, 1).fadeState);
            },
          );
        },
        { text: 'text', arrow: 'arrow', posTop: 'posTop', posLeft: 'posLeft' },
        {},
        [],
      );
  },
  713: function(n, l, t) {
    'use strict';
    t.d(l, 'a', function() {
      return u;
    });
    t(0), t(57), t(50), t(706), t(708);
    var u = (function() {
      return function() {};
    })();
  },
  714: function(n, l, t) {
    'use strict';
    function u(n) {
      return h._22(
        0,
        [
          (n()(), h.Z(0, 0, null, null, 1, 'ion-icon', [['name', 'eye'], ['role', 'img']], [[2, 'hide', null]], null, null, null, null)),
          h.Y(1, 147456, [[5, 4]], 0, d.a, [m.a, h.j, h.z], { name: [0, 'name'] }, null),
        ],
        function(n, l) {
          n(l, 1, 0, 'eye');
        },
        function(n, l) {
          n(l, 0, 0, h._13(l, 1)._hidden);
        },
      );
    }
    function o(n) {
      return h._22(
        0,
        [
          (n()(),
          h.Z(0, 0, null, null, 1, 'ion-icon', [['name', 'download'], ['role', 'img']], [[2, 'hide', null]], null, null, null, null)),
          h.Y(1, 147456, [[5, 4]], 0, d.a, [m.a, h.j, h.z], { name: [0, 'name'] }, null),
        ],
        function(n, l) {
          n(l, 1, 0, 'download');
        },
        function(n, l) {
          n(l, 0, 0, h._13(l, 1)._hidden);
        },
      );
    }
    function e(n) {
      return h._22(
        0,
        [
          (n()(), h.Z(0, 0, null, null, 3, 'ion-badge', [['color', 'blue']], null, null, null, null, null)),
          h.Y(1, 16384, null, 0, g.a, [m.a, h.j, h.z], { color: [0, 'color'] }, null),
          (n()(), h._20(2, null, ['', ''])),
          h._14(131072, b.a, [v.a, h.g]),
        ],
        function(n, l) {
          n(l, 1, 0, 'blue');
        },
        function(n, l) {
          n(l, 2, 0, h._21(l, 2, 0, h._13(l, 3).transform('WINNER_TAG')));
        },
      );
    }
    function i(n) {
      return h._22(
        0,
        [
          (n()(), h.Z(0, 0, null, null, 3, 'ion-badge', [['color', 'red']], null, null, null, null, null)),
          h.Y(1, 16384, null, 0, g.a, [m.a, h.j, h.z], { color: [0, 'color'] }, null),
          (n()(), h._20(2, null, ['', ''])),
          h._14(131072, b.a, [v.a, h.g]),
        ],
        function(n, l) {
          n(l, 1, 0, 'red');
        },
        function(n, l) {
          n(l, 2, 0, h._21(l, 2, 0, h._13(l, 3).transform('HOT_TAG')));
        },
      );
    }
    function r(n) {
      return h._22(
        0,
        [
          (n()(), h.Z(0, 0, null, null, 3, 'ion-badge', [['color', 'green']], null, null, null, null, null)),
          h.Y(1, 16384, null, 0, g.a, [m.a, h.j, h.z], { color: [0, 'color'] }, null),
          (n()(), h._20(2, null, ['', ''])),
          h._14(131072, b.a, [v.a, h.g]),
        ],
        function(n, l) {
          n(l, 1, 0, 'green');
        },
        function(n, l) {
          n(l, 2, 0, h._21(l, 2, 0, h._13(l, 3).transform('WRITER_TAG')));
        },
      );
    }
    function a(n) {
      return h._22(
        0,
        [
          (n()(), h.Z(0, 0, null, null, 3, 'ion-badge', [['color', 'yellow']], null, null, null, null, null)),
          h.Y(1, 16384, null, 0, g.a, [m.a, h.j, h.z], { color: [0, 'color'] }, null),
          (n()(), h._20(2, null, ['', ''])),
          h._14(131072, b.a, [v.a, h.g]),
        ],
        function(n, l) {
          n(l, 1, 0, 'yellow');
        },
        function(n, l) {
          n(l, 2, 0, h._21(l, 2, 0, h._13(l, 3).transform('NEW_TAG')));
        },
      );
    }
    function s(n) {
      return h._22(
        0,
        [(n()(), h.Z(0, 0, null, null, 1, null, null, null, null, null, null, null)), (n()(), h._20(1, null, [' (', ')']))],
        null,
        function(n, l) {
          var t = l.component;
          n(l, 1, 0, null == t.story ? null : t.story.lang);
        },
      );
    }
    function c(n) {
      return h._22(
        0,
        [(n()(), h.Z(0, 0, null, null, 1, 'span', [], null, null, null, null, null)), (n()(), h._20(1, null, ['#', ' ']))],
        null,
        function(n, l) {
          n(l, 1, 0, l.context.$implicit);
        },
      );
    }
    function f(n) {
      return h._22(
        0,
        [
          (n()(), h.Z(0, 0, null, null, 11, 'ion-note', [['item-end', '']], null, null, null, null, null)),
          h.Y(1, 16384, null, 0, y.a, [m.a, h.j, h.z], null, null),
          (n()(), h._20(-1, null, ['\n      '])),
          (n()(),
          h.Z(
            3,
            0,
            null,
            null,
            7,
            'button',
            [['clear', 'true'], ['event', 'press'], ['icon-only', ''], ['ion-button', ''], ['navTooltip', '']],
            null,
            [[null, 'click'], [null, 'press'], [null, 'mouseenter'], [null, 'mouseleave']],
            function(n, l, t) {
              var u = !0,
                o = n.component;
              if ('click' === l) {
                u = !1 !== h._13(n, 5).onClick() && u;
              }
              if ('press' === l) {
                u = !1 !== h._13(n, 5).onPress() && u;
              }
              if ('mouseenter' === l) {
                u = !1 !== h._13(n, 5).onMouseEnter() && u;
              }
              if ('mouseleave' === l) {
                u = !1 !== h._13(n, 5).onMouseLeave() && u;
              }
              if ('click' === l) {
                u = !1 !== o.openListPicker(o.story, t) && u;
              }
              return u;
            },
            w.b,
            w.a,
          )),
          h.Y(4, 1097728, null, 0, I.a, [[8, ''], m.a, h.j, h.z], { clear: [0, 'clear'] }, null),
          h.Y(
            5,
            4210688,
            null,
            0,
            Y.a,
            [h.j, h.f, T.a, h.i],
            { tooltip: [0, 'tooltip'], event: [1, 'event'], navTooltip: [2, 'navTooltip'] },
            null,
          ),
          h._14(131072, b.a, [v.a, h.g]),
          (n()(), h._20(-1, 0, ['\n        '])),
          (n()(),
          h.Z(8, 0, null, 0, 1, 'ion-icon', [['name', 'star-outline'], ['role', 'img']], [[2, 'hide', null]], null, null, null, null)),
          h.Y(9, 147456, null, 0, d.a, [m.a, h.j, h.z], { name: [0, 'name'] }, null),
          (n()(), h._20(-1, 0, ['\n      '])),
          (n()(), h._20(-1, null, ['\n    '])),
        ],
        function(n, l) {
          n(l, 4, 0, 'true');
          n(l, 5, 0, h._21(l, 5, 0, h._13(l, 6).transform('BOOKMARK_BUTTON')), 'press', '');
          n(l, 9, 0, 'star-outline');
        },
        function(n, l) {
          n(l, 8, 0, h._13(l, 9)._hidden);
        },
      );
    }
    function p(n) {
      return h._22(
        0,
        [
          (n()(),
          h.Z(
            0,
            0,
            null,
            null,
            6,
            'button',
            [['ion-button', '']],
            null,
            [[null, 'click']],
            function(n, l, t) {
              var u = !0,
                o = n.component;
              if ('click' === l) {
                u = !1 !== o.download(o.story, h._13(n.parent, 4)) && u;
              }
              return u;
            },
            w.b,
            w.a,
          )),
          h.Y(1, 1097728, null, 0, I.a, [[8, ''], m.a, h.j, h.z], null, null),
          (n()(), h._20(-1, 0, ['\n      '])),
          (n()(), h.Z(3, 0, null, 0, 1, 'ion-icon', [['name', 'download'], ['role', 'img']], [[2, 'hide', null]], null, null, null, null)),
          h.Y(4, 147456, null, 0, d.a, [m.a, h.j, h.z], { name: [0, 'name'] }, null),
          (n()(), h._20(5, 0, ['\n      ', '\n    '])),
          h._16(6, 2),
        ],
        function(n, l) {
          n(l, 4, 0, 'download');
        },
        function(n, l) {
          n(l, 3, 0, h._13(l, 4)._hidden);
          n(l, 5, 0, h._21(l, 5, 0, n(l, 6, 0, h._13(l.parent, 1), ' ', 15)));
        },
      );
    }
    function _(n) {
      return h._22(
        0,
        [
          h._14(0, j.d, [h.r]),
          h._14(0, k.h, []),
          (n()(), h._20(-1, null, ['\n'])),
          (n()(), h.Z(3, 0, null, null, 77, 'ion-item-sliding', [['approxItemHeight', '105px']], null, null, null, Z.b, Z.a)),
          h.Y(4, 49152, [['slidingItem', 4]], 2, S.a, [[2, C.a], T.a, h.z, h.j, h.u], null, null),
          h._18(335544320, 1, { item: 0 }),
          h._18(603979776, 2, { _itemOptions: 1 }),
          (n()(), h._20(-1, null, ['\n  '])),
          (n()(),
          h.Z(
            8,
            0,
            null,
            0,
            56,
            'button',
            [['class', 'item item-block'], ['ion-item', '']],
            null,
            [[null, 'press'], [null, 'click']],
            function(n, l, t) {
              var u = !0,
                o = n.component;
              if ('press' === l) {
                u = !1 !== o.handlePress(o.story, t) && u;
              }
              if ('click' === l) {
                u = !1 !== o.handleClick(o.story, t) && u;
              }
              return u;
            },
            x.b,
            x.a,
          )),
          h.Y(9, 1097728, [[1, 4]], 3, F.a, [P.a, m.a, h.j, h.z, [2, O.a]], null, null),
          h._18(335544320, 3, { contentLabel: 0 }),
          h._18(603979776, 4, { _buttons: 1 }),
          h._18(603979776, 5, { _icons: 1 }),
          h.Y(13, 16384, null, 0, A.a, [], null, null),
          (n()(), h._20(-1, 2, ['\n\n    '])),
          (n()(), h.Z(15, 0, null, 2, 19, 'h2', [], null, null, null, null, null)),
          (n()(), h._20(-1, null, ['\n      '])),
          (n()(), h.U(16777216, null, null, 1, null, u)),
          h.Y(18, 16384, null, 0, j.j, [h.I, h.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), h._20(-1, null, ['\n      '])),
          (n()(), h.U(16777216, null, null, 1, null, o)),
          h.Y(21, 16384, null, 0, j.j, [h.I, h.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), h._20(22, null, ['\n      ', '\n      '])),
          (n()(), h.U(16777216, null, null, 1, null, e)),
          h.Y(24, 16384, null, 0, j.j, [h.I, h.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), h._20(-1, null, ['\n      '])),
          (n()(), h.U(16777216, null, null, 1, null, i)),
          h.Y(27, 16384, null, 0, j.j, [h.I, h.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), h._20(-1, null, ['\n      '])),
          (n()(), h.U(16777216, null, null, 1, null, r)),
          h.Y(30, 16384, null, 0, j.j, [h.I, h.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), h._20(-1, null, ['\n      '])),
          (n()(), h.U(16777216, null, null, 1, null, a)),
          h.Y(33, 16384, null, 0, j.j, [h.I, h.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), h._20(-1, null, ['\n    '])),
          (n()(), h._20(-1, 2, ['\n\n    '])),
          (n()(), h.Z(36, 0, null, 2, 3, 'p', [], null, null, null, null, null)),
          (n()(), h._20(37, null, ['', ''])),
          (n()(), h.U(16777216, null, null, 1, null, s)),
          h.Y(39, 16384, null, 0, j.j, [h.I, h.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), h._20(-1, 2, ['\n    '])),
          (n()(), h.Z(41, 0, null, 2, 10, 'p', [], null, null, null, null, null)),
          (n()(), h._20(-1, null, ['\n      '])),
          (n()(), h.Z(43, 0, null, null, 1, 'ion-icon', [['name', 'star'], ['role', 'img']], [[2, 'hide', null]], null, null, null, null)),
          h.Y(44, 147456, [[5, 4]], 0, d.a, [m.a, h.j, h.z], { name: [0, 'name'] }, null),
          (n()(), h._20(45, null, [' ', '\n      (', ')\n      '])),
          (n()(), h.Z(46, 0, null, null, 2, 'em', [], null, null, null, null, null)),
          (n()(), h._20(47, null, [' ', ' ', ''])),
          h._14(131072, b.a, [v.a, h.g]),
          (n()(), h._20(49, null, ['\n      ', ' ', '\n    '])),
          h._14(131072, b.a, [v.a, h.g]),
          h._16(51, 2),
          (n()(), h._20(-1, 2, ['\n\n    '])),
          (n()(), h.Z(53, 0, null, 2, 7, 'p', [['class', 'tags']], null, null, null, null, null)),
          (n()(), h._20(-1, null, ['\n      '])),
          (n()(), h.Z(55, 0, null, null, 1, 'strong', [], null, null, null, null, null)),
          (n()(), h._20(56, null, ['', ''])),
          (n()(), h._20(-1, null, ['\n      '])),
          (n()(), h.U(16777216, null, null, 1, null, c)),
          h.Y(59, 802816, null, 0, j.i, [h.I, h.F, h.p], { ngForOf: [0, 'ngForOf'] }, null),
          (n()(), h._20(-1, null, ['\n    '])),
          (n()(), h._20(-1, 2, ['\n\n    '])),
          (n()(), h.U(16777216, null, 4, 1, null, f)),
          h.Y(63, 16384, null, 0, j.j, [h.I, h.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), h._20(-1, 2, ['\n\n  '])),
          (n()(), h._20(-1, null, ['\n\n  '])),
          (n()(), h.Z(66, 0, null, 1, 13, 'ion-item-options', [], null, null, null, null, null)),
          h.Y(67, 16384, [[2, 4]], 0, M.a, [h.j, T.a], null, null),
          (n()(), h._20(-1, null, ['\n    '])),
          (n()(), h.U(16777216, null, null, 1, null, p)),
          h.Y(70, 16384, null, 0, j.j, [h.I, h.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), h._20(-1, null, ['\n    '])),
          (n()(),
          h.Z(
            72,
            0,
            null,
            null,
            6,
            'button',
            [['color', 'danger'], ['ion-button', '']],
            null,
            [[null, 'click']],
            function(n, l, t) {
              var u = !0,
                o = n.component;
              if ('click' === l) {
                u = !1 !== o.delete(o.story, h._13(n, 4)) && u;
              }
              return u;
            },
            w.b,
            w.a,
          )),
          h.Y(73, 1097728, null, 0, I.a, [[8, ''], m.a, h.j, h.z], { color: [0, 'color'] }, null),
          (n()(), h._20(-1, 0, ['\n      '])),
          (n()(), h.Z(75, 0, null, 0, 1, 'ion-icon', [['name', 'trash'], ['role', 'img']], [[2, 'hide', null]], null, null, null, null)),
          h.Y(76, 147456, null, 0, d.a, [m.a, h.j, h.z], { name: [0, 'name'] }, null),
          (n()(), h._20(77, 0, ['\n      ', '\n    '])),
          h._16(78, 2),
          (n()(), h._20(-1, null, ['\n  '])),
          (n()(), h._20(-1, null, ['\n'])),
          (n()(), h._20(-1, null, ['\n'])),
        ],
        function(n, l) {
          var t = l.component;
          n(l, 18, 0, (null == t.story ? null : t.story.cached) && !(null != t.story && t.story.downloaded) && !t.ishistory);
          n(l, 21, 0, null == t.story ? null : t.story.downloaded);
          n(l, 24, 0, null == t.story ? null : t.story.iscontestwinner);
          n(l, 27, 0, null == t.story ? null : t.story.ishot);
          n(l, 30, 0, null == t.story ? null : t.story.iswriterspick);
          n(l, 33, 0, null == t.story ? null : t.story.isnew);
          n(l, 39, 0, null == t.story ? null : t.story.lang);
          n(l, 44, 0, 'star');
          n(l, 59, 0, null == t.story ? null : t.story.tags);
          n(l, 63, 0, t.user.isLoggedIn());
          n(l, 70, 0, !t.story.downloaded);
          n(l, 73, 0, 'danger');
          n(l, 76, 0, 'trash');
        },
        function(n, l) {
          var t = l.component;
          n(l, 22, 0, null == t.story ? null : t.story.title);
          n(l, 37, 0, null == t.story ? null : t.story.description);
          n(l, 43, 0, h._13(l, 44)._hidden);
          n(
            l,
            45,
            0,
            null == t.story ? null : t.story.rating,
            (null == t.story ? null : t.story.viewcount) > 1e3
              ? t.Math.round((null == t.story ? null : t.story.viewcount) / 1e3) + 'k'
              : null == t.story
              ? null
              : t.story.viewcount,
          );
          n(
            l,
            47,
            0,
            h._21(l, 47, 0, h._13(l, 48).transform('BYAUTHOR')),
            null == t.story ? null : null == t.story.author ? null : t.story.author.name,
          );
          n(
            l,
            49,
            0,
            h._21(l, 49, 0, h._13(l, 50).transform('ONTIMESTAMP')),
            h._21(l, 49, 1, n(l, 51, 0, h._13(l, 0), 1e3 * (null == t.story ? null : t.story.timestamp), 'yyyy-MM-dd')),
          );
          n(l, 56, 0, null == t.story ? null : t.story.category);
          n(l, 75, 0, h._13(l, 76)._hidden);
          n(l, 77, 0, h._21(l, 77, 0, n(l, 78, 0, h._13(l, 1), ' ', 15)));
        },
      );
    }
    t.d(l, 'a', function() {
      return D;
    }),
      (l.c = _),
      t.d(l, 'b', function() {
        return R;
      });
    var h = t(1),
      d = t(63),
      m = t(3),
      g = t(196),
      b = t(125),
      v = t(39),
      y = t(192),
      w = t(62),
      I = t(29),
      Y = t(704),
      T = t(6),
      j = t(18),
      k = t(703),
      Z = t(717),
      S = t(193),
      C = t(64),
      x = t(189),
      F = t(25),
      P = t(22),
      O = t(58),
      A = t(85),
      M = t(134),
      z = t(711),
      E = t(30),
      U = t(127),
      L = t(131),
      B = t(52),
      D = h.X({ encapsulation: 2, styles: [], data: {} }),
      R = h.V(
        'story-list-item',
        z.a,
        function(n) {
          return h._22(
            0,
            [
              (n()(), h.Z(0, 0, null, null, 1, 'story-list-item', [], null, null, null, _, D)),
              h.Y(1, 49152, null, 0, z.a, [E.a, U.a, L.a, B.a], null, null),
            ],
            null,
            null,
          );
        },
        { story: 'story', ishistory: 'ishistory' },
        { onDeleteBySwiping: 'onDeleteBySwiping', onDownloadBySwiping: 'onDownloadBySwiping' },
        [],
      );
  },
  716: function(n, l, t) {
    'use strict';
    function u(n) {
      return r._22(
        0,
        [
          (n()(), r.Z(0, 0, null, null, 1, 'ion-icon', [['name', 'lock'], ['role', 'img']], [[2, 'hide', null]], null, null, null, null)),
          r.Y(1, 147456, [[6, 4]], 0, a.a, [s.a, r.j, r.z], { name: [0, 'name'] }, null),
        ],
        function(n, l) {
          n(l, 1, 0, 'lock');
        },
        function(n, l) {
          n(l, 0, 0, r._13(l, 1)._hidden);
        },
      );
    }
    function o(n) {
      return r._22(
        0,
        [
          (n()(), r.Z(0, 0, null, null, 4, null, null, null, null, null, null, null)),
          (n()(), r._20(-1, null, ['\n          '])),
          (n()(), r.Z(2, 0, null, null, 1, 'ion-icon', [['role', 'img']], [[2, 'hide', null]], null, null, null, null)),
          r.Y(3, 147456, null, 0, a.a, [s.a, r.j, r.z], { name: [0, 'name'] }, null),
          (n()(), r._20(-1, null, ['\n        '])),
        ],
        function(n, l) {
          n(
            l,
            3,
            0,
            (null == l.parent.context.$implicit
              ? null
              : null == l.parent.context.$implicit.stories
              ? null
              : l.parent.context.$implicit.stories.indexOf(l.component.story)) > -1
              ? 'star'
              : 'star-outline',
          );
        },
        function(n, l) {
          n(l, 2, 0, r._13(l, 3)._hidden);
        },
      );
    }
    function e(n) {
      return r._22(
        0,
        [
          (n()(),
          r.Z(
            0,
            0,
            null,
            null,
            24,
            'ion-item',
            [['class', 'item item-block']],
            null,
            [[null, 'click']],
            function(n, l, t) {
              var u = !0;
              if ('click' === l) {
                u = !1 !== n.component.toggleFromList(n.context.$implicit) && u;
              }
              return u;
            },
            c.b,
            c.a,
          )),
          r.Y(1, 1097728, null, 3, f.a, [p.a, s.a, r.j, r.z, [2, _.a]], null, null),
          r._18(335544320, 4, { contentLabel: 0 }),
          r._18(603979776, 5, { _buttons: 1 }),
          r._18(603979776, 6, { _icons: 1 }),
          r.Y(5, 16384, null, 0, h.a, [], null, null),
          (n()(), r._20(-1, 2, ['\n    '])),
          (n()(), r.Z(7, 0, null, 2, 3, 'h2', [], null, null, null, null, null)),
          (n()(), r.U(16777216, null, null, 1, null, u)),
          r.Y(9, 16384, null, 0, d.j, [r.I, r.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), r._20(10, null, [' ', ''])),
          (n()(), r._20(-1, 2, ['\n    '])),
          (n()(), r.Z(12, 0, null, 4, 11, 'ion-note', [['item-end', '']], null, null, null, null, null)),
          r.Y(13, 16384, null, 0, m.a, [s.a, r.j, r.z], null, null),
          (n()(), r._20(-1, null, ['\n      '])),
          (n()(),
          r.Z(
            15,
            0,
            null,
            null,
            7,
            'button',
            [['clear', 'true'], ['event', 'press'], ['icon-only', ''], ['ion-button', ''], ['navTooltip', '']],
            null,
            [[null, 'click'], [null, 'press'], [null, 'mouseenter'], [null, 'mouseleave']],
            function(n, l, t) {
              var u = !0;
              if ('click' === l) {
                u = !1 !== r._13(n, 17).onClick() && u;
              }
              if ('press' === l) {
                u = !1 !== r._13(n, 17).onPress() && u;
              }
              if ('mouseenter' === l) {
                u = !1 !== r._13(n, 17).onMouseEnter() && u;
              }
              if ('mouseleave' === l) {
                u = !1 !== r._13(n, 17).onMouseLeave() && u;
              }
              return u;
            },
            g.b,
            g.a,
          )),
          r.Y(16, 1097728, null, 0, b.a, [[8, ''], s.a, r.j, r.z], { clear: [0, 'clear'] }, null),
          r.Y(
            17,
            4210688,
            null,
            0,
            v.a,
            [r.j, r.f, y.a, r.i],
            { tooltip: [0, 'tooltip'], event: [1, 'event'], navTooltip: [2, 'navTooltip'] },
            null,
          ),
          r._14(131072, w.a, [I.a, r.g]),
          (n()(), r._20(-1, 0, ['\n        '])),
          (n()(), r.U(16777216, null, 0, 1, null, o)),
          r.Y(21, 16384, null, 0, d.j, [r.I, r.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), r._20(-1, 0, ['\n      '])),
          (n()(), r._20(-1, null, ['\n    '])),
          (n()(), r._20(-1, 2, ['\n  '])),
        ],
        function(n, l) {
          n(l, 9, 0, !(null != l.context.$implicit && l.context.$implicit.visibility));
          n(l, 16, 0, 'true');
          n(l, 17, 0, r._21(l, 17, 0, r._13(l, 18).transform('BOOKMARK_BUTTON')), 'press', '');
          n(l, 21, 0, null == l.context.$implicit ? null : l.context.$implicit.stories);
        },
        function(n, l) {
          n(l, 10, 0, null == l.context.$implicit ? null : l.context.$implicit.name);
        },
      );
    }
    function i(n) {
      return r._22(
        0,
        [
          r._14(0, Y.g, []),
          (n()(), r._20(-1, null, ['\n'])),
          (n()(), r.Z(2, 0, null, null, 15, 'ion-list', [['class', 'bookmarks']], null, null, null, null, null)),
          r.Y(3, 16384, null, 0, T.a, [s.a, r.j, r.z, y.a, j.l, k.a], null, null),
          (n()(), r._20(-1, null, ['\n  '])),
          (n()(), r.Z(5, 0, null, null, 7, 'ion-list-header', [['class', 'item']], null, null, null, c.b, c.a)),
          r.Y(6, 1097728, null, 3, f.a, [p.a, s.a, r.j, r.z, [2, _.a]], null, null),
          r._18(335544320, 1, { contentLabel: 0 }),
          r._18(603979776, 2, { _buttons: 1 }),
          r._18(603979776, 3, { _icons: 1 }),
          r.Y(10, 16384, null, 0, Z.a, [s.a, r.z, r.j, [8, null]], null, null),
          (n()(), r._20(11, 2, ['', ''])),
          r._14(131072, w.a, [I.a, r.g]),
          (n()(), r._20(-1, null, ['\n  '])),
          (n()(), r.U(16777216, null, null, 2, null, e)),
          r.Y(15, 802816, null, 0, d.i, [r.I, r.F, r.p], { ngForOf: [0, 'ngForOf'] }, null),
          r._16(16, 2),
          (n()(), r._20(-1, null, ['\n'])),
          (n()(), r._20(-1, null, ['\n'])),
        ],
        function(n, l) {
          var t = l.component;
          n(l, 15, 0, r._21(l, 15, 0, n(l, 16, 0, r._13(l, 0), t.alllists, 'id')));
        },
        function(n, l) {
          n(l, 11, 0, r._21(l, 11, 0, r._13(l, 12).transform('LISTLIST_TITLE')));
        },
      );
    }
    t.d(l, 'a', function() {
      return O;
    });
    var r = t(1),
      a = t(63),
      s = t(3),
      c = t(189),
      f = t(25),
      p = t(22),
      _ = t(58),
      h = t(85),
      d = t(18),
      m = t(192),
      g = t(62),
      b = t(29),
      v = t(704),
      y = t(6),
      w = t(125),
      I = t(39),
      Y = t(703),
      T = t(64),
      j = t(10),
      k = t(12),
      Z = t(130),
      S = t(710),
      C = t(16),
      x = t(7),
      F = t(133),
      P = r.X({ encapsulation: 2, styles: [], data: {} }),
      O = r.V(
        'bookmark-popover',
        S.a,
        function(n) {
          return r._22(
            0,
            [
              (n()(), r.Z(0, 0, null, null, 1, 'bookmark-popover', [], null, null, null, i, P)),
              r.Y(1, 49152, null, 0, S.a, [C.a, y.a, x.a, F.a], null, null),
            ],
            null,
            null,
          );
        },
        {},
        {},
        [],
      );
  },
  717: function(n, l, t) {
    'use strict';
    function u(n) {
      return o._22(
        2,
        [
          (n()(), o._20(-1, null, ['\n    '])),
          o._12(null, 0),
          (n()(), o._20(-1, null, ['\n    '])),
          o._12(null, 1),
          (n()(), o._20(-1, null, ['\n  '])),
        ],
        null,
        null,
      );
    }
    t.d(l, 'a', function() {
      return e;
    }),
      (l.b = u);
    var o = t(1),
      e = (t(6), o.X({ encapsulation: 2, styles: [], data: {} }));
  },
  720: function(n, l, t) {
    'use strict';
    function u(n) {
      return i._22(
        0,
        [
          (n()(), i.Z(0, 0, null, null, 2, 'div', [['class', 'infinite-loading-spinner']], null, null, null, null, null)),
          (n()(), i.Z(1, 0, null, null, 1, 'ion-spinner', [], [[2, 'spinner-paused', null]], null, null, r.b, r.a)),
          i.Y(2, 114688, null, 0, a.a, [s.a, i.j, i.z], { name: [0, 'name'] }, null),
        ],
        function(n, l) {
          n(l, 2, 0, l.component.loadingSpinner);
        },
        function(n, l) {
          n(l, 1, 0, i._13(l, 2)._paused);
        },
      );
    }
    function o(n) {
      return i._22(
        0,
        [(n()(), i.Z(0, 0, null, null, 0, 'div', [['class', 'infinite-loading-text']], [[8, 'innerHTML', 1]], null, null, null, null))],
        null,
        function(n, l) {
          n(l, 0, 0, l.component.loadingText);
        },
      );
    }
    function e(n) {
      return i._22(
        0,
        [
          (n()(), i.Z(0, 0, null, null, 4, 'div', [['class', 'infinite-loading']], null, null, null, null, null)),
          (n()(), i.U(16777216, null, null, 1, null, u)),
          i.Y(2, 16384, null, 0, c.j, [i.I, i.F], { ngIf: [0, 'ngIf'] }, null),
          (n()(), i.U(16777216, null, null, 1, null, o)),
          i.Y(4, 16384, null, 0, c.j, [i.I, i.F], { ngIf: [0, 'ngIf'] }, null),
        ],
        function(n, l) {
          var t = l.component;
          n(l, 2, 0, t.loadingSpinner);
          n(l, 4, 0, t.loadingText);
        },
        null,
      );
    }
    t.d(l, 'a', function() {
      return f;
    }),
      (l.b = e);
    var i = t(1),
      r = t(392),
      a = t(91),
      s = t(3),
      c = t(18),
      f = i.X({ encapsulation: 2, styles: [], data: {} });
  },
  725: function(n, l, t) {
    'use strict';
    function u(n) {
      return o._22(2, [(n()(), o.Z(0, 0, null, null, 0, 'img', [], null, null, null, null, null))], null, null);
    }
    t.d(l, 'a', function() {
      return e;
    }),
      (l.b = u);
    var o = t(1),
      e = (t(6), t(12), o.X({ encapsulation: 2, styles: [], data: {} }));
  },
});
