function fn_xs_fixed_view_col_init(_selector) {
    // data
    var viewCol = 2;
    var table = $(_selector).find('table');
    var th = $(_selector).find('table thead tr th');
    var btnBack = '<a class="btnBackCol"><i class="icon-ios-arrow-back"></i></a>';
    var btnNext = '<a class="btnNextCol"><i class="icon-ios-arrow-forward"></i></a>';
    var btnBackDisable = '<a class="btnBackColDisable"><i class="icon-ios-arrow-back"></i></a>';
    var btnNextDisable = '<a class="btnNextColDisable"><i class="icon-ios-arrow-forward"></i></a>';

    // view
    th.each(function(key, ele) {
        if (key > 0) {
            if (key == 1) {
                $(ele).prepend(btnBackDisable).append(btnNext);
            } else if (key == th.length - 1) {
                $(ele).prepend(btnBack).append(btnNextDisable);
            } else {
                $(ele).prepend(btnBack).append(btnNext);
            }
        }
    });
    table.addClass('viewCol-' + viewCol);

    // ctrl
    $(_selector).find('.btnBackCol').click(function(e) {
        e.preventDefault();
        table.removeClass('viewCol-' + viewCol);

        viewCol -= 1;

        table.addClass('viewCol-' + viewCol);
    });
    $(_selector).find('.btnNextCol').click(function(e) {
        e.preventDefault();
        table.removeClass('viewCol-' + viewCol);

        viewCol += 1;

        table.addClass('viewCol-' + viewCol);
    });

}

function fn_toggle_acc_menu() {
    if ($('.boxAccGroup .btnToggleAccMenu').hasClass('action')) {
        $('.boxAccGroup .btnToggleAccMenu').removeClass('action');
        $('.boxAccGroup .boxListQuickAcc').removeClass('action');
    } else {
        $('.boxAccGroup .btnToggleAccMenu').addClass('action');
        $('.boxAccGroup .boxListQuickAcc').addClass('action');
    }
}

function fn_acc_table_init(_selector) {
    // data
    var accView = 0;
    var accTable = $(_selector + ' .oneAccTable');
    var accTitle = $(_selector + ' .oneTitleAccTable');

    // view
    accTable.eq(accView).addClass('action');

    // ctrl
    accTitle.click(function(e) {
        e.preventDefault();

        if ($(this).parents('.oneAccTable').hasClass('action')) {
            $(this).parents('.oneAccTable').removeClass('action');
        } else {
            $(this).parents('.oneAccTable').addClass('action');
        }
    });
}

/*function fn_toggle_main_menu(){
	if($('.boxHeaderMenu .btnMobileMainMenu').hasClass('action')){
		$('.boxHeaderMenu .btnMobileMainMenu').removeClass('action');
		$('.boxHeaderMenu .boxMobilePageName').removeClass('action');
	}else {
		$('.boxHeaderMenu .btnMobileMainMenu').addClass('action');
		$('.boxHeaderMenu .boxMobilePageName').addClass('action');
	}
}*/

function fn_graph_blue_red_init() {
    // data
    var percent = $('.boxGraphBlueRed').data('percent') == undefined ? (0) : ($('.boxGraphBlueRed').data('percent'));
    var invertPercent = 100 - percent;
    var fixClass = "percent_";
    if (percent == 100) {
        fixClass += "100";
    } else {
        if (percent >= 95) {
            fixClass += "95";
        } else if ((percent) % 5 != 0) {
            fixClass += ((percent - (percent) % 5) + 5);
        } else {
            fixClass += (percent - (percent) % 5);
        }
    }
    var htmlType1 = $('.boxGraphBlueRed .boxType1 .boxTypePercent span');
    var htmlType2 = $('.boxGraphBlueRed .boxType2 .boxTypePercent span');

    // view 
    $('.boxGraphBlueRed .boxPercent').addClass(fixClass);
    htmlType1.html(percent);
    htmlType2.html(invertPercent);
}

function fn_graph_blue_darkblue_init(_data) {
    // data
    var oneGraphWidth = 50;
    var totalWidth = _data.data.length * oneGraphWidth;
    var getMaxValue = 0;

    // view
    $.each(_data.data, function(key, value) { $.each(value.graph, function(key2, value2) { if (getMaxValue < value2) { getMaxValue = value2; } }); });
    if (getMaxValue % 10 != 0) {
        getMaxValue = (getMaxValue - (getMaxValue % 10)) + 10;
    }

    $('.boxGraphBlueDarkBlue .boxBarLeft .boxPercent_100').html(getMaxValue);
    $('.boxGraphBlueDarkBlue .boxBarLeft .boxPercent_80').html(Math.round(getMaxValue * 0.8));
    $('.boxGraphBlueDarkBlue .boxBarLeft .boxPercent_60').html(Math.round(getMaxValue * 0.6));
    $('.boxGraphBlueDarkBlue .boxBarLeft .boxPercent_40').html(Math.round(getMaxValue * 0.4));
    $('.boxGraphBlueDarkBlue .boxBarLeft .boxPercent_20').html(Math.round(getMaxValue * 0.2));
    $('.boxGraphBlueDarkBlue .boxBarLeft .boxPercent_0').html(0);

    $('.boxGraphBlueDarkBlue .boxBarCommentTop').html('');
    $.each(_data.title_graph, function(key, value) {
        $('.boxGraphBlueDarkBlue .boxBarCommentTop').append('<div class="oneGraphComment">' + value + '</div>');
    });

    $('.boxGraphBlueDarkBlue .boxListGraph').html('');
    $.each(_data.data, function(key, value) {
        var percent1 = ((value.graph[0] / getMaxValue) * 100) == 0 ? (1) : ((value.graph[0] / getMaxValue) * 100);
        var percent2 = ((value.graph[1] / getMaxValue) * 100) == 0 ? (1) : ((value.graph[1] / getMaxValue) * 100);
        var mark = value.mark ? (' mark') : ('');

        $('.boxGraphBlueDarkBlue .boxListGraph').append('<div class="oneGraph' + mark + '"><div class="graph_1"><div class="bgGraph" style="height:' + percent1 + '%;"><span>' + value.graph[0] + '</span></div></div><div class="graph_2"><div class="bgGraph" style="height:' + percent2 + '%;"><span>' + value.graph[1] + '</span></div></div><div class="titleGraph">' + value.month + '</div></div>');
    });
    $('.boxGraphBlueDarkBlue .boxListGraph').width(totalWidth);

    // ctrl
    $('.boxGraphBlueDarkBlue .scrollbar-inner').scrollbar();

    // max scrollLeft
    $('.boxGraphBlueDarkBlue .scrollbar-inner').scrollLeft(totalWidth - $('.boxGraphBlueDarkBlue .scrollbar-inner').width());

    // resize

}

function fn_open_new_update(_url) {
    $.fancybox({
        href: _url,
        type: 'ajax',
        padding: 0,
        margin: 0,
        fitToView: false
    });
}

function fn_refresh_paginate_button() {
    $('.dataTables_paginate .paginate_button').each(function(key, ele) {
        var eleHtml = $(ele).html();

        if ($(ele).find('span').length == 0) {
            $(ele).html('<span>' + eleHtml + '</span>');
        }
    });

    $('.dataTables_paginate .ellipsis').html(' ••• ');
}

function fn_table_style1_init(_selector) {
    $(_selector).on('page.dt', function() {
        // set paginate add span
        setTimeout(function() { fn_refresh_paginate_button(); }, 10);
    }).on('length.dt', function() {
        // set paginate add span
        setTimeout(function() { fn_refresh_paginate_button(); }, 10);
    }).on('order.dt', function() {
        // set paginate add span
        setTimeout(function() { fn_refresh_paginate_button(); }, 10);
    }).DataTable({
        "lengthMenu": [
            [5, 10, 25, -1],
            [5, 10, 25, "All"]
        ],
        "dom": 't<"ctrlBottom1"lp>',
        "language": {
            "lengthMenu": '<div class="form-group hasSelect">_MENU_</div>',
            "paginate": { 'next': '<span>ถัดไป <i class="icon-android-arrow-forward"></i></span>', 'previous': '<span><i class="icon-android-arrow-back"></i> ย้อนกลับ</span>' }
        },
        "initComplete": function(settings, json) {
            // set paginate add span
            fn_refresh_paginate_button();
        }
    });
}

/*function fn_fixed_menu_init() {
    $(window).scroll(function(e) {
        if ($(window).scrollTop() < $('#header .boxHeaderTop').height()) {
            if ($('body').hasClass('header-menu-fix-top')) { $('body').removeClass('header-menu-fix-top'); }
        } else {
            if (!$('body').hasClass('header-menu-fix-top')) { $('body').addClass('header-menu-fix-top'); }
        }
    });
}*/

function fn_fixed_sub_menu_init(_selector) {
    // view
    $(_selector).addClass('targetdSubMenu');
    $('<div class="' + $(_selector).attr('data-spaceclass') + '" style="height:' + $(_selector).height() + 'px;"></div>').insertAfter(_selector);

    // ctrl
    $(window).scroll(function(e) {
        var selectorTop = $(_selector).offset().top;
        var chkFixedMenu = $('body').hasClass('header-menu-fix-top') ? ($('#header .boxHeaderMenu').height()) : (0);
        var chkScroll = $(window).scrollTop() + chkFixedMenu;

        if ($('body').hasClass('sub-menu-fix-top')) {
            selectorTop = $('.' + $(_selector).attr('data-spaceclass')).offset().top;
        } else {
            selectorTop = $(_selector).offset().top;
        }

        if (chkScroll < selectorTop) {
            if ($('body').hasClass('sub-menu-fix-top')) { $('body').removeClass('sub-menu-fix-top'); }
        } else {
            if (!$('body').hasClass('sub-menu-fix-top')) { $('body').addClass('sub-menu-fix-top'); }
        }
    });
}

function fn_fixed_jump_menu_init(_selector, _selector_content) {
    // data
    var boxListFixJumpMenu = $(_selector).find('.boxListFixJumpMenu a');
    var viewJumpMenu = 0;

    // view
    boxListFixJumpMenu.addClass('down');
    boxListFixJumpMenu.eq(viewJumpMenu).removeClass('down up').addClass('action');

    // ctrl
    boxListFixJumpMenu.click(function(e) {
        e.preventDefault();

        var selectorHeight = $(_selector).height();
        $(_selector).parent().css({ 'padding-top': '0px', 'height': selectorHeight });

        var chkHasMenu = ($('#header .boxHeaderMenu').length > 0);
        var chkHasSubMenu = ($('.targetdSubMenu').length > 0);
        var chkFixedMenu = chkHasMenu ? ($('#header .boxHeaderMenu').height()) : (0);
        var chkFixedSubMenu = chkHasSubMenu ? ($('.targetdSubMenu').height()) : (0);
        var offsetTopContent = $(_selector_content).find('.oneJumpContent').eq($(this).index()).offset().top;
        var jumpTo = offsetTopContent - (chkFixedMenu + chkFixedSubMenu + selectorHeight);

        $(window).scrollTop(jumpTo);

        // recheck
        /*
        setTimeout(function(){
        	var reChkFixedMenu = $('body').hasClass('header-menu-fix-top') ? ($('#header .boxHeaderMenu').height()):(0);
        	var reChkFixedSubMenu = $('body').hasClass('sub-menu-fix-top') ? ($('.targetdSubMenu').height()):(0);
        	var reJumpTo = offsetTopContent - (reChkFixedMenu + reChkFixedSubMenu + selectorHeight);
        	
        	if(chkFixedMenu != reChkFixedMenu || chkFixedSubMenu != reChkFixedSubMenu){
        		$(window).scrollTop(reJumpTo);
        	}
        }, 50);
        */
    });

    $(window).scroll(function(e) {
        var selectorTop = $(_selector).parent().offset().top;
        var selectorHeight = $(_selector).height();
        $(_selector).parent().css({ 'padding-top': '0px', 'height': selectorHeight });

        var chkFixedMenu = $('body').hasClass('header-menu-fix-top') ? ($('#header .boxHeaderMenu').height()) : (0);
        var chkFixedSubMenu = $('body').hasClass('sub-menu-fix-top') ? ($('.targetdSubMenu').height()) : (0);
        var chkScroll = $(window).scrollTop() + chkFixedMenu + chkFixedSubMenu;

        var selector_content = $(_selector_content).find('.oneJumpContent');
        var selector_content_top = new Array();
        var iconStyle = 'up';

        boxListFixJumpMenu.removeClass('down up action')
        selector_content.each(function(index, element) {
            selector_content_top.push($(element).offset().top);
        });

        if (chkScroll < selectorTop) {
            $(_selector).css({ 'top': 0 });

            viewJumpMenu = 0;
            boxListFixJumpMenu.addClass('down');
        } else {
            $(_selector).css({ 'top': (chkScroll - selectorTop) });

            $.each(selector_content_top, function(key, value) {
                if (key <= (selector_content_top.length - 2)) {
                    if ((chkScroll + selectorHeight) >= selector_content_top[key] && (chkScroll + selectorHeight) < selector_content_top[key + 1]) {
                        viewJumpMenu = key;
                        iconStyle = 'down';
                    }
                } else {
                    if ((chkScroll + selectorHeight) >= value) {
                        viewJumpMenu = key;
                        iconStyle = 'down';
                    }
                }

                boxListFixJumpMenu.eq(key).addClass(iconStyle);
            });
        }
        boxListFixJumpMenu.eq(viewJumpMenu).removeClass('down up').addClass('action');
    });
}

function fn_fixed_footer_menu_relation(_selector, _relation_selector) {
    var selector = $(_selector);
    var relation = $(_relation_selector);

    $(window).scroll(function(e) {
        var wh = $(window).height();
        var chkScroll = $(window).scrollTop() + (wh - selector.height());

        if (chkScroll < relation.offset().top) {
            selector.show();
        } else {
            selector.hide();
        }
    });

}

function fn_quick_acc_init(_selector) {
    $(_selector).each(function(index, element) {
        // data
        var titleQuickAcc = $(element).find('.boxTitleListQuickAcc');
        var listQuickAcc = $(element).find('.boxListQuickAcc');
        var oneAcc = $(element).find('.boxListAcc .oneAcc');
        var titleAcc = $(element).find('.boxListAcc .oneAcc .titleAcc');
        var contentAcc = $(element).find('.boxListAcc .oneAcc .contentAcc');
        var viewAcc = $(element).find('.boxListAcc .oneAcc.action').length > 0 ? ($(element).find('.boxListAcc .oneAcc.action').index()) : (0);

        // view
        listQuickAcc.html('');
        oneAcc.each(function(key, ele) {
            var titleAccHtml = ($(ele).find('.titleAcc').data('title_quick') != undefined && $(ele).find('.titleAcc').data('title_quick') != '') ? ($(ele).find('.titleAcc').data('title_quick')) : ($(ele).find('.titleAcc').html());

            if (key == viewAcc) {
                listQuickAcc.append('<a class="action">' + titleAccHtml + '</a>');
            } else if ($(ele).hasClass('disable')) {
                listQuickAcc.append('<a class="disable">' + titleAccHtml + '</a>');
            } else {
                listQuickAcc.append('<a>' + titleAccHtml + '</a>');
            }
        });
        oneAcc.hide();
        oneAcc.eq(viewAcc).show();

        // ctlr
        var oneQuickAcc = $(element).find('.boxListQuickAcc a');
        oneQuickAcc.click(function(e) {
            e.preventDefault();

            if (!$(this).hasClass('action') && !$(this).hasClass('disable')) {
                $(element).find('.btnToggleAccMenu').removeClass('action');
                $(element).find('.boxListQuickAcc').removeClass('action');
                oneAcc.removeClass('action');

                oneQuickAcc.removeClass('action');
                $(this).addClass('action');

                viewAcc = $(this).index();

                oneAcc.hide();
                oneAcc.eq(viewAcc).addClass('action').show();
            }
        });

        titleAcc.click(function(e) {
            e.preventDefault();

            if (!($(this).parent().hasClass('action') || $(this).parent().hasClass('disable'))) {
                oneQuickAcc.removeClass('action');
                oneAcc.removeClass('action').hide();

                viewAcc = $(this).parent().index();

                oneQuickAcc.eq(viewAcc).addClass('action');
                oneAcc.eq(viewAcc).addClass('action').show();

                setTimeout(function() {
                    var specTop = 0;

                    if ($('body').hasClass('header-menu-fix-top')) {
                        specTop += $('.boxHeaderMenu').height();
                    }
                    if ($('body').hasClass('sub-menu-fix-top')) {
                        specTop += $('#boxFixedSubMenu').height();
                    }

                    $(window).scrollTop(oneAcc.eq(viewAcc).offset().top - specTop);
                }, 30);
            }
        });
    });
}

function fn_tab_init(_selector, _view) {
    // data
    var oneTab = $(_selector).find('.oneTab');
    var oneContentTab = $($(_selector).attr('data-target') + ' .oneContentTab');

    // view
    oneTab.eq(0).addClass('action');
    oneContentTab.hide();
    oneContentTab.eq(0).show();

    // ctrl
    oneTab.click(function(e) {
        e.preventDefault();

        oneTab.removeClass('action');
        oneContentTab.hide();

        $(this).addClass('action');
        oneContentTab.eq($(this).index()).show();
    });
}

function fn_tab_has_select_init(_selector, _view) {
    // data
    var oneTab = $(_selector).find('.oneTab');
    var oneContentTab = $($(_selector).attr('data-target') + ' .oneContentTab');

    // view
    $(_selector).append('<a class="btnShowSelect">' + oneTab.eq(0).html() + '</a>');
    oneTab.eq(0).addClass('action');
    oneContentTab.hide();
    oneContentTab.eq(0).show();

    // ctrl
    $(_selector).find('.btnShowSelect').click(function(e) {
        e.preventDefault();

        if ($(_selector).hasClass('showSelect')) {
            $(_selector).removeClass('showSelect');
        } else {
            $(_selector).addClass('showSelect');
        }
    });
    oneTab.click(function(e) {
        e.preventDefault();

        $(_selector).removeClass('showSelect');

        oneTab.removeClass('action');
        oneContentTab.hide();

        $(this).addClass('action');
        $(_selector).find('.btnShowSelect').html($(this).html());
        oneContentTab.eq($(this).index()).show();
    });
}

function fn_select_plan_init(_selector) {
    // data
    var listOption = $(_selector).find('.listOption');
    var oneOption = $(_selector).find('.oneOption');
    var txtView = $(_selector).find('.txtView');
    var classNameSelected = 'selected';
    var classNameFavorite = 'mark';
    var optionSelect = listOption.find('.' + classNameSelected);
    var btnFavorite = $(_selector).find('.btnFavorite');

    // view
    if (optionSelect.length == 0) {
        optionSelect = oneOption.eq(0);
        optionSelect.addClass(classNameSelected);
    }
    txtView.html(optionSelect.html()).attr({ 'data-value': optionSelect.attr('data-value') });
    if (optionSelect.hasClass(classNameFavorite)) {
        btnFavorite.addClass(classNameFavorite);
    } else {
        btnFavorite.removeClass(classNameFavorite);
    }
    listOption.hide();

    // ctrl
    txtView.unbind('click');
    txtView.bind('click', function(e) {
        e.preventDefault();

        if (listOption.is(':hidden')) {
            listOption.show();
        } else {
            listOption.hide();
        }
    });
    oneOption.unbind('click');
    oneOption.bind('click', function(e) {
        e.preventDefault();

        oneOption.removeClass(classNameSelected);
        fn_set_selected($(this));

        listOption.hide();
    });
    btnFavorite.unbind('click');
    btnFavorite.bind('click', function(e) {
        e.preventDefault();

        if ($(this).hasClass(classNameFavorite)) {
            $(this).removeClass(classNameFavorite);
            optionSelect.removeClass(classNameFavorite);

            // ajax to remove Favorite
        } else {
            $(this).addClass(classNameFavorite);
            optionSelect.addClass(classNameFavorite);

            // ajax to add Favorite
        }
    });

    function fn_set_selected(_mc) {
        optionSelect = _mc;
        optionSelect.addClass(classNameSelected);

        txtView.html(optionSelect.html()).attr({ 'data-value': optionSelect.attr('data-value') });

        if (optionSelect.hasClass(classNameFavorite)) {
            btnFavorite.addClass(classNameFavorite);
        } else {
            btnFavorite.removeClass(classNameFavorite);
        }
    }
}

function fn_input_search_plan_init(_selector) {
    // data
    var listOption = $(_selector).find('.listOption');
    var oneOption, optionSelect;
    var txtView = $(_selector).find('.txtView');
    var classNameSelected = 'selected';
    var classNameFavorite = 'mark';
    var btnFavorite = $(_selector).find('.btnFavorite');
    var txtMark = '';

    // view
    listOption.hide();

    // ctrl
    txtView.unbind('keyup');
    txtView.bind('keyup', function(e) {
        e.preventDefault();

        if ($(this).val().length >= 3) {
            $.fancybox.showLoading();
            $.post($(_selector).attr('data-url'), { "q": $(this).val() }, function(data_json) {
                if (data_json.status) {
                    // html
                    listOption.html('');
                    $.each(data_json.items, function(key, value) {
                        txtMark = value.mark_status ? (' ' + classNameFavorite) : ('');
                        listOption.append('<a class="oneOption' + txtMark + '" data-value="' + value.value + '">' + value.html + '</a>');
                    });

                    // event
                    oneOption = $(_selector).find('.oneOption');

                    oneOption.unbind('click');
                    oneOption.bind('click', function(e) {
                        e.preventDefault();

                        fn_set_selected($(this));

                        listOption.hide();
                    });
                } else {
                    alert(status.error_message);
                }
            }, 'json');

            $.fancybox.hideLoading();
            listOption.show();
        } else {
            $.fancybox.hideLoading();
            listOption.hide();
        }
    });

    btnFavorite.unbind('click');
    btnFavorite.bind('click', function(e) {
        e.preventDefault();

        if ($(this).hasClass(classNameFavorite)) {
            $(this).removeClass(classNameFavorite);

            // ajax to remove Favorite
        } else {
            $(this).addClass(classNameFavorite);

            // ajax to add Favorite
        }
    });

    function fn_set_selected(_mc) {
        optionSelect = _mc;

        txtView.val(optionSelect.html()).attr({ 'data-value': optionSelect.attr('data-value') });

        if (optionSelect.hasClass(classNameFavorite)) {
            btnFavorite.addClass(classNameFavorite);
        } else {
            btnFavorite.removeClass(classNameFavorite);
        }
    }
}