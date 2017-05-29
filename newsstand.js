naver.main = naver.main || {},
naver.main.Newsstand = $Class({
    $init: function(e) {
        this._initVars(e),
        this._updateVars(e),
        this._initComponent(),
        this._attachEvent(),
        this._start()
    },
    _initVars: function(e) {
        this._elBase = $$.getSingle(".area_newsstand"),
        this._elThumbViewerBase = $$.getSingle("._PM_newsstand_thumb", this._elBase),
        this._elListViewerBase = $$.getSingle("._PM_newsstand_list", this._elBase),
        this._elInfoViewerBase = $$.getSingle("._PM_newsstand_info", this._elBase),
        this._elOptionBtnBase = $$.getSingle(".an_menulist_section2", this._elBase),
        this._elTotalCategory = $$.getSingle("[data-tab=total]", this._elBase),
        this._elMyCategory = $$.getSingle("[data-tab=my]", this._elBase),
        this._welPrevMouseoverItem,
        this._htPressInfo,
        this._sTplSubscribe = ['<div class="_PM_newsstand_add_layer api_popup_add {=positionClass}" role="alertdialog">', '<p class="api_pa_words">MY뉴스에 추가되었습니다.</p>', "</div>"].join(""),
        this._sTplUnsubscribe = ['<div class="api_popup_cancel {=positionClass} _PM_newsstand_unsubscribe_popup" role="alertdialog" style="display:block">', '<p class="api_pc_words"><span class="api_pc_name">{=htPress.name}</span>을(를)<br>구독해지 하시겠습니까?</p>', '<a href="#" class="api_pc_btn _PM_newsstand_unsubscribe_ok" role="button" data-pid={=htPress.pid} data-custom-clk="nsd_myn*a.usdone">확인</a> ', '<a href="#" class="api_pc_btn _PM_newsstand_unsubscribe_no" role="button" data-custom-clk="nsd_myn*a.uscancel">취소</a>', '<a href="#" class="api_btn_close _PM_newsstand_unsubscribe_no" role="button" data-custom-clk="nsd_myn*a.usclose"><span class="blind">구독해지 닫기</span><span class="api_ico_close"></span></a>', "</div>"].join(""),
        this._sTplPressListNavi = '<b class="aplc_current">{=currentPage}</b>/<b class="aplc_total">{=lastPage}</b>',
        this._sTplCategory = '<li class="aplc_item"><a class="aplc_link" href="#" data-pid="{=htPress.pid}" ><span class="aplc_name">{=htPress.name}</span></a></li>',
        this._htOption = e,
        this._htTotalCategoryPressPid = {},
        this._aTotalPress = [],
        this._aThumbViewerTotalPress = [],
        this._sUserInfoURL = e.userInfoURL,
        this._sNewsStandURL = e.newsStandURL,
        this._sNewsPaperURL = e.newspaperURL,
        this._bAbleMouseover = !0,
        this._htViewerStatus = {
            category: "total",
            mode: "thumb",
            index: 0
        },
        this._htMySubscribe = {
            aPress: [],
            bNewsstand: !1,
            bNewscast: !1
        },
        this._oDataManager,
        this._oThumbViewer,
        this._oListViewer,
        this._oThumbFlicking,
        this._oListFlicking
    },
    _updateVars: function(e) {
        var t;
        isLogin ? this._htMySubscribe.bNewscast = !0 : this._htMySubscribe.bNewsstand = !0,
        e.newsCastInfo ? t = e.newsCastInfo.split("@") : e.newsStandInfo && !isLogin && (t = e.newsStandInfo.split("@")),
        t && (this._htMySubscribe.aPress = t[4].split("|"),
        this._htViewerStatus.mode = "list",
        this._htViewerStatus.category = "my")
    },
    _initComponent: function() {
        new naver.main.AutoRolling($$.getSingle("._PM_newsstand_rolling")),
        this._oDataManager = new naver.main.NewsstandDataManager({
            headlineList: this._htOption.headlineList,
            rcode: this._htOption.rcode
        }),
        this._oThumbViewer = new naver.main.NewsstandThumbViewer({
            newsStandUrl: this._sNewsStandURL,
            newspaperUrl: this._sNewsPaperURL
        }),
        this._oListViewer = new naver.main.NewsstandListViewer
    },
    _attachEvent: function() {
        $Element(this._elBase).delegate("click", "[data-custom-clk]", $Fn(this._onClickLink, this).bind()),
        $Element(this._elBase).delegate("click", "._PM_newsstand_total_type", $Fn(this._onClickTotalType, this).bind()),
        $Element(this._elBase).delegate("click", "._PM_newsstand_my_type", $Fn(this._onClickMyType, this).bind()),
        $Element(this._elBase).delegate("click", "._PM_newsstand_thumb_type", $Fn(this._onClickThumbType, this).bind()),
        $Element(this._elBase).delegate("click", "._PM_newsstand_list_type", $Fn(this._onClickListType, this).bind()),
        $Element(this._elBase).delegate("click", "._PM_newsstand_prev", $Fn(this._onClickPrev, this).bind()),
        $Element(this._elBase).delegate("click", "._PM_newsstand_next", $Fn(this._onClickNext, this).bind()),
        this._htOption.isSupportedFlicking || ($Element(this._elThumbViewerBase).delegate("mouseover", ".api_item", $Fn(this._onMouseoverItemInList, this).bind()),
        $Element(this._elThumbViewerBase).delegate("mouseleave", ".api_item", $Fn(this._onMouseleaveItemInList, this).bind())),
        $Element(this._elBase).delegate("click", "._PM_newsstand_subscribe", $Fn(this._onClickSubscribe, this).bind()),
        $Element(this._elBase).delegate("click", "._PM_newsstand_unsubscribe", $Fn(this._onClickUnsubscribe, this).bind()),
        $Element(this._elBase).delegate("click", "._PM_newsstand_unsubscribe_ok", $Fn(this._onClickUnsubscribeOk, this).bind()),
        $Element(this._elBase).delegate("click", "._PM_newsstand_unsubscribe_no", $Fn(this._onClickUnsubscribeNo, this).bind()),
        $Element(this._elTotalCategory).delegate("click", "[data-category]", $Fn(this._onClickTotalCategory, this).bind()),
        $Element(this._elMyCategory).delegate("click", "[data-pid]", $Fn(this._onClickMyCategory, this).bind())
    },
    _onClickLink: function(e) {
        var t = e.element
          , i = $Element(t)
          , n = i.attr("data-custom-clk");
        clickcr(t, n, "", "", "")
    },
    _start: function() {
        var e = 0 !== this._htMySubscribe.aPress.length;
        this._oDataManager.requestPressInfo(e, $Fn(function(e) {
            this._aTotalPress = e.aPressList,
            this._htTotalCategoryPressPid = e.htTotalPress;
            var t = Math.ceil(this._htTotalCategoryPressPid.ct1.length / 12);
            if (this._aThumbViewerTotalPress = this._aTotalPress.slice(0, 18 * t),
            "total" === this._htViewerStatus.category)
                this._oThumbViewer.setPressData(this._aThumbViewerTotalPress),
                this._oListViewer.setPressData({
                    data: e.htTotalPress,
                    category: "total"
                }),
                this._htOption.isSupportedFlicking && this._initThumbFlicking();
            else {
                this._htMySubscribe.aPress = this._getValidatedPidList(this._htMySubscribe.aPress),
                this._updateViewerPressData();
                var i = this._oListViewer.getCurrentPageStatus();
                this._drawListViewerCategory({
                    nIndex: i.nIndex,
                    nLastIndex: i.nLastIndex,
                    sCategory: i.sType
                }),
                this._htOption.isSupportedFlicking && this._initListFlicking()
            }
            this._updateSubscribeStatus(),
            this._updateClickLogStatus()
        }, this).bind())
    },
    _initThumbFlicking: function() {
        if (!this._oThumbFlicking) {
            var e = $Element($$.getSingle(".flick-container", this._elThumbViewerBase));
            e.append('<div class="flick-panel" style="position:absolute;top:0;left:0;width:100%;height:100%"></div>'),
            e.prepend('<div class="flick-panel" style="position:absolute;top:0;left:0;width:100%;height:100%"></div>');
            var t, i = this;
            this._oThumbFlicking = new jindo.m.Flicking($$.getSingle(".flick-view", this._elThumbViewerBase),{
                nDuration: 300,
                nTotalContents: 3,
                nDefaultIndex: 1,
                bUseDiagonalTouch: !0,
                sClassPrefix: "flick-",
                sContentClass: "panel",
                bUseCircular: !0,
                bAutoSize: !0
            }).attach({
                afterFlicking: function(e) {
                    t = e.bLeft ? i._oThumbViewer.getNextPage({
                        index: i._htViewerStatus.index
                    }) : i._oThumbViewer.getPrevPage({
                        index: i._htViewerStatus.index
                    }),
                    i._htViewerStatus.index = t.index,
                    i._drawSideThumbPanel({
                        htNext: i._oThumbViewer.getNextPage({
                            index: i._htViewerStatus.index
                        }),
                        htPrev: i._oThumbViewer.getPrevPage({
                            index: i._htViewerStatus.index
                        })
                    })
                }
            })
        }
        "my" === this._htViewerStatus.category && this._htMySubscribe.aPress.length <= 18 ? this._oThumbFlicking.deactivate() : this._oThumbFlicking.activate(),
        this._drawSideThumbPanel({
            htNext: this._oThumbViewer.getNextPage({
                index: this._htViewerStatus.index
            }),
            htPrev: this._oThumbViewer.getPrevPage({
                index: this._htViewerStatus.index
            })
        })
    },
    _drawSideThumbPanel: function(e) {
        this._destroyUnsubscribeLayer(),
        this._oThumbFlicking.getNextElement().html('<ul class="api_list">' + e.htNext.html + "</ul>"),
        this._oThumbFlicking.getPrevElement().html('<ul class="api_list">' + e.htPrev.html + "</ul>")
    },
    _initListFlicking: function() {
        if (!this._oListFlicking) {
            var e = $Element($$.getSingle(".flick-container", this._elListViewerBase));
            e.append('<div class="flick-panel" style="position:absolute;top:0;left:0;width:100%;height:100%"></div>'),
            e.prepend('<div class="flick-panel" style="position:absolute;top:0;left:0;width:100%;height:100%"></div>');
            var t = this;
            this._oListFlicking = new jindo.m.Flicking($$.getSingle(".flick-view", this._elListViewerBase),{
                nDuration: 300,
                nTotalContents: 3,
                nDefaultIndex: 1,
                bUseDiagonalTouch: !0,
                sClassPrefix: "flick-",
                sContentClass: "panel",
                bUseCircular: !0,
                bAutoSize: !0
            }).attach({
                afterFlicking: function(e) {
                    var i;
                    i = e.bLeft ? t._oListViewer.getNextPageStatus() : t._oListViewer.getPrevPageStatus(),
                    t._oListViewer.setPageStatus({
                        nIndex: i.nIndex,
                        sType: i.sType
                    }),
                    t._drawListViewerCategory({
                        bFocus: !0,
                        nIndex: i.nIndex,
                        nLastIndex: i.nLastIndex,
                        sCategory: i.sType
                    }),
                    t._drawSideListPanel()
                }
            })
        }
        this._drawSideListPanel(),
        "my" === this._htViewerStatus.category && this._htMySubscribe.aPress.length <= 1 ? this._oListFlicking.deactivate() : this._oListFlicking.activate()
    },
    _drawSideListPanel: function() {
        this._destroyUnsubscribeLayer();
        var e = this._oListViewer.getPrevPageStatus();
        this._oListViewer.requestPage({
            nIndex: e.nIndex,
            sType: e.sType,
            onload: $Fn(function(e) {
                this._drawListFlickingContentsViewer({
                    response: e,
                    elTarget: this._oListFlicking.getPrevElement()
                })
            }, this).bind()
        });
        var t = this._oListViewer.getNextPageStatus();
        this._oListViewer.requestPage({
            nIndex: t.nIndex,
            sType: t.sType,
            onload: $Fn(function(e) {
                this._drawListFlickingContentsViewer({
                    response: e,
                    elTarget: this._oListFlicking.getNextElement()
                })
            }, this).bind()
        })
    },
    _drawListFlickingContentsViewer: function(e) {
        var t = e.response
          , i = e.elTarget
          , n = e.htCategory;
        "my" === this._htViewerStatus.category && this._htMySubscribe.aPress.length < 1 ? ($Element(this._elListViewerBase).hide(),
        $Element(this._elOptionBtnBase).hide(),
        $Element(this._elInfoViewerBase).show()) : ($Element(i).html(t.html),
        $Element(this._elThumbViewerBase).hide(),
        $Element(this._elInfoViewerBase).hide(),
        $Element(this._elListViewerBase).show(),
        $Element(this._elOptionBtnBase).show(),
        this._updateSubscribeStatus(),
        this._updateClickLogStatus(),
        n && this._drawListViewerCategory(n))
    },
    _drawListViewerCategory: function(e) {
        var t = e.bFocus
          , i = e.nIndex
          , n = e.nLastIndex
          , s = e.sCategory;
        "total" === this._htViewerStatus.category ? ($A($ElementList($$("[data-category]")).removeClass("is_selected").$value()).forEach($Fn(function(e) {
            var t = "";
            $Element(e).attr("data-category") === s && ($Element(e).addClass("is_selected"),
            t = $Template(this._sTplPressListNavi).process({
                currentPage: i + 1,
                lastPage: n + 1
            })),
            $Element($$.getSingle(".aplc_paging", e)).html(t)
        }, this).bind()),
        $Element(this._elTotalCategory).show(),
        $Element(this._elMyCategory).hide()) : ($Element(this._elMyCategory).html(this._getMyCategoryHTML()),
        $Element(this._elMyCategory).child()[i].query("[data-pid]").addClass("is_selected"),
        t && ($$.getSingle(".is_selected", this._elMyCategory),
        this._updateScrollFocus($$.getSingle(".is_selected", this._elMyCategory))),
        $Element(this._elTotalCategory).hide(),
        $Element(this._elMyCategory).show())
    },
    _updateScrollFocus: function(e) {
        var t = $Element(e).parent().$value()
          , i = $$.getSingle("! [data-tab]", t)
          , n = i.scrollTop
          , s = t.offsetTop
          , a = $Element(i).height()
          , l = $Element(t).height();
        n > s ? i.scrollTop = s : s - n > a - l && (i.scrollTop = s - a + l)
    },
    _getFirstPagePid: function() {
        var e = [];
        return $A($$("._PM_newsstand_subscribe")).forEach(function(t) {
            e.push($Element(t).attr("data-pid"))
        }),
        e
    },
    _onMouseoverItemInList: function(e) {
        if (this._bAbleMouseover) {
            this._welPrevMouseoverItem && this._welPrevMouseoverItem.removeClass("is_selected");
            var t = $Element(e.element);
            this._welPrevMouseoverItem = t,
            t.addClass("is_selected")
        }
    },
    _onMouseleaveItemInList: function(e) {
        this._bAbleMouseover && this._welPrevMouseoverItem && this._welPrevMouseoverItem.removeClass("is_selected")
    },
    _onClickSubscribe: function(e) {
        e.stopDefault();
        var t = e.element
          , i = $Element(t).attr("data-pid");
        this._subscribePress(i, t)
    },
    _onClickUnsubscribe: function(e) {
        e.stopDefault(),
        this._bAbleMouseover = !1;
        var t = e.element
          , i = $Element(t).attr("data-pid");
        this._showUnsubscribeLayer(i, t)
    },
    _onClickUnsubscribeOk: function(e) {
        e.stopDefault(),
        this._bAbleMouseover = !0;
        var t = e.element
          , i = $Element(t).attr("data-pid");
        this._unsubscribePress(i, t)
    },
    _onClickUnsubscribeNo: function(e) {
        e.stopDefault(),
        this._bAbleMouseover = !0,
        this._destroyUnsubscribeLayer()
    },
    _onClickTotalType: function(e) {
        if (e.stopDefault(),
        "total" !== this._htViewerStatus.category) {
            this._htViewerStatus.category = "total",
            this._htViewerStatus.mode = "thumb",
            $Element($$.getSingle("._PM_newsstand_total_type")).addClass("is_selected"),
            $Element($$.getSingle("._PM_newsstand_my_type")).removeClass("is_selected"),
            $Element($$.getSingle("._PM_newsstand_thumb_type")).addClass("is_selected"),
            $Element($$.getSingle("._PM_newsstand_list_type")).removeClass("is_selected"),
            this._oThumbViewer.setPressData(this._aThumbViewerTotalPress),
            this._oListViewer.setPressData({
                data: this._htTotalCategoryPressPid,
                category: "total"
            });
            var t = this._oThumbViewer.getInitPage({
                index: this._htViewerStatus.index
            });
            this._htViewerStatus.index = t.index,
            this._drawThumbViewer(t)
        }
    },
    _onClickMyType: function(e) {
        e.stopDefault(),
        "my" !== this._htViewerStatus.category && this._moveMyPressTab(0)
    },
    _onClickThumbType: function(e) {
        if (e.stopDefault(),
        "thumb" !== this._htViewerStatus.mode) {
            this._htViewerStatus.mode = "thumb",
            $Element($$.getSingle("._PM_newsstand_thumb_type")).addClass("is_selected"),
            $Element($$.getSingle("._PM_newsstand_list_type")).removeClass("is_selected");
            var t = this._oThumbViewer.getInitPage({
                index: this._htViewerStatus.index
            });
            this._htViewerStatus.index = t.index,
            this._drawThumbViewer(t)
        }
    },
    _onClickListType: function(e) {
        e.stopDefault(),
        "list" !== this._htViewerStatus.mode && (this._htViewerStatus.mode = "list",
        $Element($$.getSingle("._PM_newsstand_thumb_type")).removeClass("is_selected"),
        $Element($$.getSingle("._PM_newsstand_list_type")).addClass("is_selected"),
        this._oListViewer.requestInitPage({
            index: 0,
            onload: $Fn(this._drawListViewer, this).bind()
        }))
    },
    _onClickPrev: function(e) {
        if (e.stopDefault(),
        "thumb" === this._htViewerStatus.mode)
            if (this._oThumbFlicking)
                this._oThumbFlicking.movePrev(0);
            else {
                var t = this._oThumbViewer.getPrevPage({
                    index: this._htViewerStatus.index
                });
                this._drawThumbViewer(t),
                this._htViewerStatus.index = t.index
            }
        else
            this._oListFlicking ? this._oListFlicking.movePrev(0) : this._oListViewer.requestPrevPage({
                onload: $Fn(function(e) {
                    this._drawListViewer(e, !0)
                }, this).bind()
            })
    },
    _onClickNext: function(e) {
        if (e.stopDefault(),
        "thumb" === this._htViewerStatus.mode)
            if (this._oThumbFlicking)
                this._oThumbFlicking.moveNext(0);
            else {
                var t = this._oThumbViewer.getNextPage({
                    index: this._htViewerStatus.index
                });
                this._drawThumbViewer(t),
                this._htViewerStatus.index = t.index
            }
        else
            this._oListFlicking ? this._oListFlicking.moveNext(0) : this._oListViewer.requestNextPage({
                onload: $Fn(function(e) {
                    this._drawListViewer(e, !0)
                }, this).bind()
            })
    },
    _onClickTotalCategory: function(e) {
        e.stopDefault();
        var t = (e.element,
        $Element(e.element).attr("data-category"));
        this._oListViewer.setPressData({
            data: this._htTotalCategoryPressPid,
            category: t
        }),
        this._oListViewer.requestInitPage({
            index: 0,
            onload: $Fn(this._drawListViewer, this).bind()
        })
    },
    _onClickMyCategory: function(e) {
        e.stopDefault();
        var t = $Element(e.element).attr("data-pid")
          , i = $A(this._htMySubscribe.aPress).indexOf(t);
        this._oListViewer.requestInitPage({
            index: i,
            onload: $Fn(this._drawListViewer, this).bind()
        })
    },
    _drawThumbViewer: function(e) {
        $Element(this._elThumbViewerBase).show(),
        $Element(this._elListViewerBase).hide(),
        $Element(this._elInfoViewerBase).hide(),
        $Element(this._elOptionBtnBase).show();
        var t = $Element($("<div>" + e.html + "</div>"));
        $Element($$.getSingle(".api_list")).html(t.html()),
        this._destroyUnsubscribeLayer(),
        this._updateSubscribeStatus(),
        this._updateClickLogStatus(),
        "my" === this._htViewerStatus.category && this._htMySubscribe.aPress.length < 1 && ($Element(this._elThumbViewerBase).hide(),
        $Element(this._elOptionBtnBase).hide(),
        $Element(this._elInfoViewerBase).show()),
        this._htOption.isSupportedFlicking && this._initThumbFlicking()
    },
    _drawListViewer: function(e, t) {
        $Element($$.getSingle(".flick-panel", this._elListViewerBase)).html(e.html),
        "total" === this._htViewerStatus.category ? ($A($ElementList($$("[data-category]")).removeClass("is_selected").$value()).forEach($Fn(function(t) {
            var i = "";
            $Element(t).attr("data-category") === e.category && ($Element(t).addClass("is_selected"),
            i = $Template(this._sTplPressListNavi).process({
                currentPage: e.index + 1,
                lastPage: e.lastIndex + 1
            })),
            $Element($$.getSingle(".aplc_paging", t)).html(i)
        }, this).bind()),
        $Element(this._elListViewerBase).show(),
        $Element(this._elOptionBtnBase).show(),
        $Element(this._elTotalCategory).show(),
        $Element(this._elMyCategory).hide()) : this._htMySubscribe.aPress.length < 1 ? ($Element(this._elListViewerBase).hide(),
        $Element(this._elInfoViewerBase).show(),
        $Element(this._elOptionBtnBase).hide()) : ($Element(this._elListViewerBase).show(),
        $Element(this._elInfoViewerBase).hide(),
        $Element(this._elOptionBtnBase).show(),
        $Element(this._elTotalCategory).hide(),
        $Element(this._elMyCategory).html(this._getMyCategoryHTML()),
        $Element(this._elMyCategory).child()[e.index].query("[data-pid]").addClass("is_selected"),
        $Element(this._elMyCategory).show(),
        t && ($$.getSingle(".is_selected", this._elMyCategory),
        this._updateScrollFocus($$.getSingle(".is_selected", this._elMyCategory)))),
        this._destroyUnsubscribeLayer(),
        this._updateSubscribeStatus(),
        this._updateClickLogStatus(),
        $Element(this._elThumbViewerBase).hide(),
        this._htOption.isSupportedFlicking && this._initListFlicking()
    },
    _getMyCategoryHTML: function() {
        var e = ""
          , t = this;
        return $A(this._htMySubscribe.aPress).forEach(function(i) {
            var n;
            $A(t._aTotalPress).forEach(function(e) {
                e.pid === i && (n = e,
                $A.Break())
            }),
            n && (e += $Template(t._sTplCategory).process({
                htPress: n
            }))
        }),
        e
    },
    _subscribePress: function(e, t) {
        var i;
        i = this._htMySubscribe.bNewscast ? "http://" + this._sUserInfoURL + "/api/newscast/mynews/add.jsonp?pressId=" + e : "http://" + this._sUserInfoURL + "/api/newsstand/mynews/addPress.jsonp?pressId=" + e;
        var n = this;
        $Ajax(i, {
            type: "jsonp",
            timeout: 5,
            onload: function(i) {
                var s = i.json();
                "success" == s.result ? (n._htMySubscribe.aPress.push(e),
                n._showSubscribeLayer(t),
                setTimeout(function() {
                    $Element($$.getSingle("._PM_newsstand_add_layer")).leave(),
                    n._moveMyPressTab(n._htMySubscribe.aPress.length - 1, !0)
                }, 500)) : JEagleEyeClient.sendError("[NewsStand] Mynews add failed  :" + s.reason)
            },
            onerror: function(e) {
                JEagleEyeClient.sendError("[NewsStand] Mynews add failed(error) : " + e.text())
            },
            ontimeout: function(e) {
                JEagleEyeClient.sendError("[NewsStand] Mynews add failed(timeout)")
            }
        }).request()
    },
    _unsubscribePress: function(e, t) {
        var i;
        i = this._htMySubscribe.bNewscast ? "http://" + this._sUserInfoURL + "/api/newscast/mynews/del.jsonp?pressId=" + e : "http://" + this._sUserInfoURL + "/api/newsstand/mynews/deletePress.jsonp?pressId=" + e;
        var n = this;
        $Ajax(i, {
            type: "jsonp",
            timeout: 5,
            onload: function(t) {
                var i = t.json();
                if ("success" == i.result) {
                    if (n._htMySubscribe.aPress = $A(n._htMySubscribe.aPress).refuse(e).$value(),
                    "my" === n._htViewerStatus.category)
                        if (n._updateViewerPressData(),
                        "thumb" === n._htViewerStatus.mode) {
                            var s = n._oThumbViewer.getInitPage({
                                index: n._htViewerStatus.index
                            });
                            n._drawThumbViewer(s),
                            n._htViewerStatus.index = s.index
                        } else
                            n._oListViewer.requestInitPage({
                                index: 0,
                                onload: $Fn(n._drawListViewer, n).bind()
                            });
                    n._destroyUnsubscribeLayer(),
                    n._updateSubscribeStatus(),
                    n._updateClickLogStatus()
                } else
                    JEagleEyeClient.sendError("[NewsStand] Mynews delete failed  :" + i.reason)
            },
            onerror: function(e) {
                JEagleEyeClient.sendError("[NewsStand] Mynews delete failed(error) : " + e.text())
            },
            ontimeout: function(e) {
                JEagleEyeClient.sendError("[NewsStand] Mynews delete failed(timeout)")
            }
        }).request()
    },
    _showSubscribeLayer: function(e) {
        var t, i = "";
        if ("thumb" === this._htViewerStatus.mode) {
            t = $Element($$.getSingle("! .api_item", e));
            var n = $A($$(".api_item", ".api_list"));
            i = this._getPositionClass(n.indexOf(t.$value()))
        } else
            t = $Element(e).parent();
        sHTML = $Template(this._sTplSubscribe).process({
            positionClass: i
        }),
        t.append(sHTML)
    },
    _showUnsubscribeLayer: function(e, t) {
        var i, n = "";
        if ("thumb" === this._htViewerStatus.mode) {
            i = $Element($$.getSingle("! .api_item", t));
            var s = $A($$(".api_item", ".api_list"));
            n = this._getPositionClass(s.indexOf(i.$value()))
        } else
            i = $Element(t).parent();
        var a;
        $A(this._aTotalPress).forEach(function(t) {
            t.pid === e && (a = t,
            $A.Break())
        }),
        i.append($Template(this._sTplUnsubscribe).process({
            positionClass: n,
            htPress: a
        }))
    },
    _moveMyPressTab: function(e, t) {
        this._htViewerStatus.category = "my",
        this._htViewerStatus.mode = "list",
        $Element($$.getSingle("._PM_newsstand_total_type")).removeClass("is_selected"),
        $Element($$.getSingle("._PM_newsstand_my_type")).addClass("is_selected"),
        $Element($$.getSingle("._PM_newsstand_thumb_type")).removeClass("is_selected"),
        $Element($$.getSingle("._PM_newsstand_list_type")).addClass("is_selected"),
        this._updateViewerPressData(),
        $Element(this._elThumbViewerBase).hide(),
        this._htMySubscribe.aPress.length < 1 ? ($Element(this._elInfoViewerBase).show(),
        $Element(this._elListViewerBase).hide(),
        $Element(this._elOptionBtnBase).hide()) : this._oListViewer.requestInitPage({
            index: e,
            onload: $Fn(function(e) {
                this._drawListViewer(e, t)
            }, this).bind()
        })
    },
    _updateViewerPressData: function() {
        var e = this._htMySubscribe.aPress;
        this._oListViewer.setPressData({
            data: {
                my: e
            },
            category: "my"
        });
        var t = [];
        $A(this._aTotalPress).forEach(function(i) {
            $A(e).indexOf(i.pid) >= 0 && t.push(i)
        }),
        this._oThumbViewer.setPressData(t)
    },
    _getValidatedPidList: function() {
        var e = [];
        $A(this._htMySubscribe.aPress).forEach(function(t) {
            e.push({
                pid: t
            })
        });
        var t = this._oDataManager.getValidatedPidList(e)
          , i = []
          , n = [];
        return $A(this._aTotalPress).forEach(function(e) {
            $A(t).indexOf(e.pid) >= 0 && i.push(e.pid)
        }),
        $A(t).forEach(function(e) {
            $A(i).indexOf(e) >= 0 && n.push(e)
        }),
        n
    },
    _updateSubscribeStatus: function() {
        var e = this;
        $A($$("[data-pid]", this._elBase)).forEach(function(t) {
            var i = $Element(t);
            (i.hasClass("_PM_newsstand_unsubscribe") || i.hasClass("_PM_newsstand_subscribe")) && (i.hide(),
            $A(e._htMySubscribe.aPress).indexOf(i.attr("data-pid")) > -1 ? i.hasClass("_PM_newsstand_unsubscribe") && i.show("inline-block") : i.hasClass("_PM_newsstand_subscribe") && i.show("inline-block"))
        })
    },
    _updateClickLogStatus: function() {
        var e = "data-all-clk"
          , t = "data-my-clk"
          , i = "my" === this._htViewerStatus.category ? t : e;
        $A($$("[" + i + "]", this._elBase)).forEach(function(n) {
            var s = $Element(n);
            s.attr("data-clk", s.attr(i)),
            s.attr(e, null),
            s.attr(t, null)
        })
    },
    _getPositionClass: function(e) {
        var t = "";
        return 0 === e ? t = "position_bottom_left" : e > 0 && e < 5 ? t = "position_bottom_center" : 5 === e ? t = "position_bottom_right" : 12 === e || 6 === e ? t = "position_top_left" : e > 12 && e < 17 || e > 6 && e < 11 ? t = "position_top_center" : 17 !== e && 11 !== e || (t = "position_top_right"),
        t
    },
    _destroyUnsubscribeLayer: function() {
        this._bAbleMouseover = !0;
        var e = $Element($$.getSingle("._PM_newsstand_unsubscribe_popup"));
        e && e.leave()
    }
}),
"undefined" == typeof naver && (naver = {}),
naver.main = naver.main || {},
naver.main.NewsstandThumbViewer = $Class({
    $init: function(e) {
        this._initVars(e)
    },
    _initVars: function(e) {
        this._nLastIndex,
        this._aPressList = [];
        var t = e.newsStandUrl;
        e.newspaperUrl;
        this._sTemplate = ["{for idx:press in pressList}", '{if press.pid != "add"}', '{if press.amigo=="Y"}', '<li id="NS_{=press.pid}" class="api_item">', '<a href="javascript:;" class="api_link" aria-haspopup="true" aria-disabled="ture">', '<img class="api_logo" src="{=press.img}" width="50" height="24" alt="{=press.name}" title="악성코드 발생으로 기사 노출이 제외된 상태입니다.">', '<span class="blind ">{=press.name}</span>', "</a>", "</li>", '{elseif press.viewer == "N"}', '<li id="NS_{=press.pid}" class="api_item">', '<a href="javascript:;" class="api_link" aria-haspopup="true" aria-disabled="ture">', '<img class="api_logo" src="{=press.img}" width="50" height="24" alt="{=press.name}" title="해당 언론사에서 서비스를 준비중입니다.">', '<span class="blind ">{=press.name}</span>', "</a>", "</li>", "{else}", '<li id="NS_{=press.pid}" class="api_item press_{=press.pid}">', '<a href="http://' + t + '/?list={=press.mainCate}&pcode={=press.pid}" class="api_link" aria-haspopup="true" target="_blank">', '<span class="api_logo"></span>', '<span class="blind ">{=press.name}</span>', "</a>", '<div class="api_popup_btn_set" role="alertdialog">', '<div class="api_pbs_inner">', '\n\t<a href="#" class="api_pbs_btn _PM_newsstand_subscribe" role="button" data-pid="{=press.pid}" data-clk="nsd_all*p.sub">구독</a>', '\n\t<a href="#" class="api_pbs_btn _PM_newsstand_unsubscribe" role="button" data-pid="{=press.pid}" data-clk="nsd_myn*p.sub">해지</a>', '\n\t<a href="http://' + t + '/?list={=press.mainCate}&pcode={=press.pid}" class="api_pbs_btn api_pbs_lb" role="button" target="_blank" data-all-clk="nsd_all*p.logo" data-my-clk="nsd_myn*p.logo">기사보기</a>', "</div>", "</div>", "</li>", "{/if}", "{else}", '<li id="_add" class="api_item disabled"></li>', "{/if}", "{/for}"].join("")
    },
    setPressData: function(e) {
        this._aPressList = e,
        this._nLastIndex = Math.ceil(this._aPressList.length / 18) - 1
    },
    getInitPage: function(e) {
        return {
            index: 0,
            html: this._getThumbViewerHTML({
                index: 0
            })
        }
    },
    getPrevPage: function(e) {
        var t, i = e.index;
        i--,
        i < 0 && (i = this._nLastIndex);
        var t = this._getThumbViewerHTML({
            index: i
        });
        return {
            index: i,
            html: t
        }
    },
    getNextPage: function(e) {
        var t, i = e.index;
        i++,
        i > this._nLastIndex && (i = 0);
        var t = this._getThumbViewerHTML({
            index: i
        });
        return {
            index: i,
            html: t
        }
    },
    _getThumbViewerHTML: function(e) {
        for (var t = (e.index + 1,
        18), i = this._aPressList, n = e.index * t, s = Math.min((e.index + 1) * t, i.length), a = [], l = n; l < s; l++)
            a.push(i[l]);
        a.length > t && (a = a.slice(0, t));
        var o = {
            pressList: a
        };
        return $Template(this._sTemplate).process(o)
    }
}),
"undefined" == typeof naver && (naver = {}),
naver.main = naver.main || {},
naver.main.NewsstandListViewer = $Class({
    $init: function() {
        this._initVars()
    },
    _initVars: function() {
        this._sType,
        this._htTotalPress = {},
        this._nIndex,
        this._htCachedPage = {}
    },
    setPressData: function(e) {
        this._htTotalPress = e.data,
        this._nIndex = 0,
        this._sType = "total" === e.category ? $H(this._htTotalPress).keys()[0] : e.category
    },
    setPageStatus: function(e) {
        this._nIndex = e.nIndex,
        this._sType = e.sType
    },
    requestInitPage: function(e) {
        this._nIndex = e.index,
        this._requestPage(e)
    },
    requestNextPage: function(e) {
        this._nIndex < this._htTotalPress[this._sType].length - 1 ? this._nIndex++ : (this._isLastCategory() ? this._sType = $H(this._htTotalPress).keys()[0] : this._sType = this._getNextCategory(),
        this._nIndex = 0),
        this._requestPage(e)
    },
    requestPrevPage: function(e) {
        if (this._nIndex > 0)
            this._nIndex--;
        else {
            if (this._isFirstCategory()) {
                var t = $H(this._htTotalPress).keys();
                this._sType = t[t.length - 1]
            } else
                this._sType = this._getPrevCategory();
            this._nIndex = this._htTotalPress[this._sType].length - 1
        }
        this._requestPage(e)
    },
    getPrevPageStatus: function() {
        var e = this._nIndex
          , t = this._sType;
        if (e > 0)
            e--;
        else {
            if (this._isFirstCategory()) {
                var i = $H(this._htTotalPress).keys();
                t = i[i.length - 1]
            } else
                t = this._getPrevCategory();
            e = this._htTotalPress[t].length - 1
        }
        return {
            nIndex: e,
            sType: t,
            nLastIndex: this._htTotalPress[t].length - 1
        }
    },
    getNextPageStatus: function() {
        var e = this._nIndex
          , t = this._sType;
        return e < this._htTotalPress[t].length - 1 ? e++ : (t = this._isLastCategory() ? $H(this._htTotalPress).keys()[0] : this._getNextCategory(),
        e = 0),
        {
            nIndex: e,
            sType: t,
            nLastIndex: this._htTotalPress[t].length - 1
        }
    },
    getCurrentPageStatus: function() {
        return {
            nIndex: this._nIndex,
            sType: this._sType,
            nLastIndex: this._htTotalPress[this._sType].length - 1
        }
    },
    requestPage: function(e) {
        var t = e.sType ? e.sType : this._sType
          , i = isNaN(e.nIndex) ? this._nIndex : e.nIndex
          , n = this._htTotalPress[t][i];
        if (n)
            if (this._htCachedPage[n])
                e && e.onload({
                    html: this._htCachedPage[n],
                    index: i,
                    lastIndex: this._htTotalPress[t].length - 1,
                    category: t
                });
            else {
                var s = "/nvnewsstand?" + n
                  , a = this
                  , l = $Ajax(s, {
                    timeout: 5,
                    method: "get",
                    onload: function(s) {
                        a._htCachedPage[n] = s.text(),
                        e && e.onload({
                            html: s.text(),
                            index: i,
                            lastIndex: a._htTotalPress[t].length - 1,
                            category: t
                        })
                    },
                    onerror: function() {
                        JEagleEyeClient.sendError("[NEWSSTAND] 언론사 헤드라인 정보 로딩 실패: " + s)
                    },
                    ontimeout: function() {
                        JEagleEyeClient.sendError("[NEWSSTAND] 언론사 헤드라인 정보 로딩 timeout: " + s)
                    }
                });
                l.request()
            }
        else
            e && e.onload({
                html: "",
                index: i,
                lastIndex: this._htTotalPress[t].length - 1,
                category: t
            })
    },
    _requestPage: function(e) {
        var t = this._htTotalPress[this._sType][this._nIndex];
        if (t)
            if (this._htCachedPage[t])
                e && e.onload({
                    html: this._htCachedPage[t],
                    index: this._nIndex,
                    lastIndex: this._htTotalPress[this._sType].length - 1,
                    category: this._sType
                });
            else {
                var i = "/nvnewsstand?" + t
                  , n = this
                  , s = $Ajax(i, {
                    timeout: 5,
                    method: "get",
                    onload: function(i) {
                        n._htCachedPage[t] = i.text(),
                        e && e.onload({
                            html: i.text(),
                            index: n._nIndex,
                            lastIndex: n._htTotalPress[n._sType].length - 1,
                            category: n._sType
                        })
                    },
                    onerror: function() {
                        JEagleEyeClient.sendError("[NEWSSTAND] 언론사 헤드라인 정보 로딩 실패: " + i)
                    },
                    ontimeout: function() {
                        JEagleEyeClient.sendError("[NEWSSTAND] 언론사 헤드라인 정보 로딩 timeout: " + i)
                    }
                });
                s.request()
            }
        else
            e && e.onload({
                html: "",
                index: this._nIndex,
                lastIndex: this._htTotalPress[this._sType].length - 1,
                category: this._sType
            })
    },
    _isLastCategory: function() {
        var e = this._getCategoryAndIndex();
        return e.nTargetIndex === $H(this._htTotalPress).length() - 1
    },
    _isFirstCategory: function() {
        var e = this._getCategoryAndIndex();
        return 0 === e.nTargetIndex
    },
    _getNextCategory: function() {
        var e = this._getCategoryAndIndex();
        return e.aKey[e.nTargetIndex + 1]
    },
    _getPrevCategory: function() {
        var e = this._getCategoryAndIndex();
        return e.aKey[e.nTargetIndex - 1]
    },
    _getCategoryAndIndex: function() {
        var e = $H(this._htTotalPress).keys()
          , t = $A(e).indexOf(this._sType);
        return {
            aKey: e,
            nTargetIndex: t
        }
    }
}),
"undefined" == typeof naver && (naver = {}),
naver.main = naver.main || {},
naver.main.NewsstandDataManager = $Class({
    $init: function(e) {
        this._initVars(e)
    },
    _initVars: function(e) {
        this._htHeadlineList = e.headlineList,
        this._aHeadlinePid = [],
        this._htPressInfo = {},
        this._sRcode = e.rcode,
        this._bHaveMyPress = !1,
        this._aAmigoPressList = [],
        this._aNoViewerPressList = []
    },
    requestPressInfo: function(e, t) {
        this._bHaveMyPress = e;
        var i = this
          , n = $Ajax("/include/newsstand/press_info.json", {
            timeout: 5,
            method: "get",
            onload: function(e) {
                var n = e.json();
                i._htPressInfo = n;
                var s = i._getFirstPressData(n, i._getFirstPagePid())
                  , a = i._getValidatedPress(n);
                t && t({
                    aPressList: s,
                    htTotalPress: a
                })
            },
            onerror: function() {
                JEagleEyeClient.sendError("[NEWSSTAND] 언론사 정보 ajax 실패 : ")
            },
            ontimeout: function() {
                JEagleEyeClient.sendError("[NEWSSTAND] 언론사 정보 로딩 timeout: ")
            }
        });
        n.request()
    },
    _getValidatedPress: function(e) {
        var t = {}
          , i = this;
        return $H(e).forEach(function(e, n) {
            t[n] = i._getValidatedPidList(e)
        }),
        t
    },
    _getValidatedPidList: function(e) {
        for (var t = [], i = 0; i < e.length; i++) {
            var n = e[i].pid;
            this._isHeadlinePress(n) && !this._isHeadlineAmigo(n) && t.push(n)
        }
        return t
    },
    getValidatedPidList: function(e) {
        return this._getValidatedPidList(e)
    },
    _isHeadlinePress: function(e) {
        for (var t = this._htHeadlineList, i = 0; i < t.pid.length; i++)
            if (e == t.pid[i])
                return !0;
        return !1
    },
    _isHeadlineAmigo: function(e) {
        for (var t = this._htHeadlineList, i = 0; i < t.amigo.length; i++)
            if (e == t.amigo[i])
                return !0;
        return !1
    },
    _getFirstPressData: function(e, t) {
        return this._htPressInfo = e,
        this._getEditedPressList(t)
    },
    _getFirstPagePid: function() {
        var e = [];
        return $A($$("._PM_newsstand_subscribe")).forEach(function(t) {
            e.push($Element(t).attr("data-pid"))
        }),
        e
    },
    _getEditedPressList: function(e) {
        for (var t = [], i = e, n = [], s = 0, a = i.length; s < a; s++) {
            var l = i[s];
            n.push(l),
            t.push(this._getPressInfo(l))
        }
        return afterPressList = this._getAfterPressList(n),
        t = t.concat(afterPressList),
        this._getUniquePressList(t)
    },
    _getUniquePressList: function(e) {
        for (var t = [], i = e.length, n = 0; n < i; n++) {
            for (var s = 0; s < t.length && e[n].pid !== t[s].pid; s++)
                ;
            s >= t.length && (t[s] = e[n])
        }
        return t
    },
    _getPressInfo: function(e) {
        var t = this._htPressInfo;
        for (var i in t)
            for (var n = t[i], s = 0, a = n.length; s < a; s++)
                if (n[s].pid == e)
                    return n[s];
        return null
    },
    _getAfterPressList: function(e) {
        var t = this._htPressInfo
          , i = this._sRcode.slice(0, 2)
          , n = this._getEditedPressInfo(t.ct1, e)
          , s = t.ct2.concat(t.ct3, t.ct4, t.ct5, t.ct6, t.ct7)
          , a = this._getEditedPressInfo(s, e)
          , l = this._bHaveMyPress
          , o = $A(t.ct8).filter(function(e) {
            var t = !1;
            return !l && i ? $A(e.local).forEach(function(e) {
                e.code === i && (t = !0,
                $A.Break())
            }) : t = !0,
            t
        }).$value()
          , r = this._getEditedPressInfo(o, e);
        return this._getCombinedPressInfo(n, a, r)
    },
    _getEditedPressInfo: function(e, t) {
        var i = this._validatedPressList(e)
          , n = $A(i).shuffle().filter($Fn(function(e) {
            if (!this._isContains(t, e.pid))
                return !0
        }, this).bind());
        return n.$value()
    },
    _validatedPressList: function(e) {
        for (var t = [], i = 0, n = e.length; i < n; i++) {
            var s = e[i];
            "string" == typeof s && (s = this._getPressInfo(s)),
            "N" == s.amigo && "Y" == s.viewer ? t.push(s) : "Y" == s.amigo ? this._aAmigoPressList.push(s) : "N" == s.viewer && this._aNoViewerPressList.push(s)
        }
        return t
    },
    _isContains: function(e, t) {
        for (var i = 0, n = e.length; i < n; i++)
            if (e[i] == t)
                return !0;
        return !1
    },
    _getCombinedPressInfo: function(e, t, i) {
        for (var n = [], s = Math.ceil((e.length + t.length + i.length) / 12), a = 0; a < s; a++) {
            var l = []
              , o = []
              , r = [];
            if (e.length > 0 && (l = e.splice(0, 12)),
            i.length > 0 && (r = i.splice(0, 2)),
            t.length > 0) {
                var h = 18 - (l.length + r.length);
                o = t.splice(0, h)
            }
            n = n.concat(l, o, r)
        }
        return n
    }
}),
