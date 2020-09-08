(function ($) {

    $('.skillContainer').hide()

    function openNav() {
        $('#header').toggleClass('on')
        if ($('#header').hasClass('on')) {
            $('.nav').css({
                display: 'block'
            }).animate({
                right: '0px'
            }, 500)
        } else {
            $('.nav').animate({
                right: '-320px'
            }, 500, function () {
                $(this).css({
                    display: 'none'
                })
            })
        }
        $('.outlayer').toggleClass('on')
    }
    $('.open-gnb').on('click', openNav)
    $('.outlayer').on('click', openNav)

    var winWidth, winHeight;

    function init() {
        winWidth = $(window).innerWidth()
        winHeight = $(window).height()
        if (winWidth > 800 && !$('html').hasClass('pc')) {
            $('#header').removeClass('on')
            $('.outlayer').removeClass('on')
            $('.nav').css({
                display: 'block',
                right: '0px'
            })
            $('html').addClass('pc').removeClass('mobile')
        } else if (winWidth < 800 && !$('html').hasClass('mobile')) {
            $('#header').removeClass('on')
            $('.nav').css({
                display: 'none',
                right: '-320px'
            })
            $('html').addClass('mobile').removeClass('pc')
        }
    }

    init()



    $(window).resize(function () {
        init()
    })


    // 메인슬라이드 : 슬릭슬라이더 연결
    $('.slide-inner').slick({
        autoplay: true,
        dots: true,
        autoplaySpeed: 4000,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
        pauseOnDotsHover: false,
        pauseOnFocus: false,
        cssEase: 'ease',
        draggable: true,
        fade: false,
        arrows: true,
        prevArrow: '<button class="prevArrow marrow"><i class="fas fa-angle-left"></i></button>',
        nextArrow: '<button class="nextArrow marrow"><i class="fas fa-angle-right"></i></button>',
        responsive: [{
            breakpoint: 801,
            settings: {
                arrows: false,
                fade: true,
            }
        }]

    })

    $(".plpa").toggle(
        function () {
            $(this).find('i').removeClass('fa-pause')
                .addClass('fa-play')
            $(".slide-inner").slick("slickPause")
        },
        function () {
            $(this).find('i').removeClass('fa-play')
                .addClass('fa-pause')
            $(".slide-inner").slick("slickPlay")
        }
    )


    // 포트폴리오 갤러리 이미지 클릭시 팝업박스
    var href, src, alt, lieq;
    $('.gallery > li > a').on('click', function (e) {
        e.preventDefault();
        lieq = $(this).parent().index()
        $('.galleryPopup').addClass('on')
        href = $(this).attr('href')
        src = $(this).find('img').attr('src')
        alt = $(this).find('img').attr('alt')
        $('.popupList > div > a').attr('href', href)
        $('.popupList > div > a > img').attr({
            'src': src,
            'alt': alt
        })
    })


    $('.galleryPopup .close, .galleryPopup').on('click', function () {
        $('.galleryPopup').removeClass('on')
    })

    $('.popupList').on('click', function (e) {
        e.stopPropagation();
    })


    function changeList(ind) {
        href = $('.gallery > li').eq(ind).find('a').attr('href')
        src = $('.gallery > li').eq(ind).find('img').attr('src')
        alt = $('.gallery > li').eq(ind).find('img').attr('alt')
        $('.popupList > div > a').attr('href', href)
        $('.popupList > div > a > img').attr({
            'src': src,
            'alt': alt
        }).css({
            opacity: '0.5'
        }).stop().animate({
            opacity: '1'
        }, 500)
    }


    $('.popupList .prev').on('click', function () {
        --lieq;
        if (lieq < 0) {
            lieq = 7;
        }
        changeList(lieq)
    })

    $('.popupList .next').on('click', function () {
        ++lieq;
        if (lieq > 7) {
            lieq = 0;
        }
        changeList(lieq)
    })

    var sct = 0;
    $(window).scroll(function () {
        sct = $(this).scrollTop();
        if (sct >= winHeight) {
            $(".header-outer").css({
                background: 'rgba(0,0,0,1)'
            });

        } else {
            $(".header-outer").css({
                background: 'rgba(0,0,0,0.5)'
            });
        }

        if (sct > 100) {
            $('.gotop').addClass('on').stop().animate({
                opacity: '1'
            }, 500)
        } else {
            $('.gotop').removeClass('on').stop().animate({
                opacity: '0'
            }, 500)
        }

        if (sct >= $('#skills').offset().top) {
            $('.skillContainer').stop().fadeIn(300)
        }
    });

    $('.gotop').on('click', function () {
        $('body,html').stop().animate({
            scrollTop: 0
        }, 800, 'linear')
        $('.nav .depth1 > li').eq(0).addClass('on')
        $('.nav .depth1 > li').eq(0).siblings().removeClass('on')
    })

    $('.nav .depth1 > li > a').on('click', function (e) {
        e.preventDefault();
        $(this).parent().addClass('on')
        $(this).parent().siblings().removeClass('on')
        var index = $(this).parent().index()
        $('body, html').animate({
            scrollTop: index * winHeight
        }, 800)
        return false;
    })

    $(".section").on("mousewheel", function (e, wh) {
        var index = $(this).index()

        if (wh > 0) {

            var prev = $(this).prev().offset().top;
            $('.depth1 li').eq(index - 1).addClass('on')
            $('.depth1 li').eq(index - 1).siblings().removeClass('on')
            $("html,body").stop().animate({
                scrollTop: prev
            }, 800, "linear");

        } else if (wh < 0) {

            var next = $(this).next().offset().top;
            $('.depth1 li').eq(index + 1).addClass('on')
            $('.depth1 li').eq(index + 1).siblings().removeClass('on')
            $("html,body").stop().animate({
                scrollTop: next
            }, 800, "linear");
        }

    });




})(jQuery)