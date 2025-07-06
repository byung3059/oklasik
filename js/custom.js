$(function () {

    $(window).on('scroll', function () {
        let sct = $(window).scrollTop();
        // console.log(sct);
        if (sct > 1) {
            $('#header').addClass('on')
        } else {
            $('#header').removeClass('on')
        }
    });

    $('#header .gnb').on('mouseover', function () {
        $('#header').addClass('gnb_enter');
    });

    $('#header .gnb').on('mouseleave', function () {
        $('#header').removeClass('gnb_enter');
    });

    $('#header .site_map_btn').on('click', function () {
        $('#sitemap').addClass('on')
    })
    $('#sitemap .site_map_btn button').on('click', function () {
        $('#sitemap').removeClass('on')
    })


    const main_visual_slide = new Swiper('.main_visual_slide', {
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".m_main_visual_slide_arrow .arrow_next",
            prevEl: ".m_main_visual_slide_arrow .arrow_prev",
        },

        on: {
            slideChangeTransitionStart: function () {

                // 페이지네이션 버튼 on/off
                $('.main_visual_slide_nav .slide_btn>ul>li')
                    .eq(this.realIndex)
                    .addClass('on')
                    .siblings()
                    .removeClass('on');

                // 비디오 제어 로직 추가
                const $video = $('.main_visual_slide_box .itm').find('video').get(0); // 첫 번째 비디오 가져오기

                if (this.realIndex === 0) {
                    // 첫 번째 슬라이드일 때 비디오 재생
                    if ($video) {
                        $video.currentTime = 0;
                        $video.play().catch(err => console.log('비디오 자동재생 실패:', err));
                    }
                } else {
                    // 다른 슬라이드에서는 비디오 정지
                    if ($video) {
                        $video.pause();
                        $video.currentTime = 0;
                    }
                }
            }
        },
    });


    $('.main_visual_slide_nav .play_btn>button ').on('click', function () {

        $(this).toggleClass('on');

        if ($(this).hasClass('on')) {
            main_visual_slide.autoplay.stop();  // 정지
        } else {
            main_visual_slide.autoplay.start(); // 재생
        }

    });

    $('.main_visual_slide_nav .slide_btn>ul>li').on('click', function () {
        let idx = $(this).index();

        main_visual_slide.slideToLoop(idx, 400);
    });

    const main_content_slide = new Swiper('.main_content_slide', {


        slidesPerView: 1,
        spaceBetween: 30,
        scrollbar: {
            el: ".main_content_nav_line",
            draggable: true,
        },
        navigation: {
            nextEl: ".main_content_slide_arrow .arrow_next",
            prevEl: ".main_content_slide_arrow .arrow_prev",
        },
        breakpoints: {

            1501: {
                loop: true,
                slidesPerView: 'auto',
                centeredSlides: true,
            },
            769: {
                loop: true,
                centeredSlides: true,
                slidesPerView: 1.4,
            },
            481: { loop: true, }


        }
    });

    const main_review_left_slide = new Swiper('.main_review_left_slide', {

        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        scrollbar: {
            el: ".main_review_nav_line",
            draggable: true,
        },
        slidesPerView: 1,
        spaceBetween: 30,
        allowTouchMove: true,
        breakpoints: {

            561: {
                loop: true,
                allowTouchMove: false,
            },

        },

    });
    const main_review_right_slide = new Swiper('.main_review_right_slide', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 16,
        allowTouchMove: false,
        breakpoints: {

            769: {
                spaceBetween: 30,
            },

        },
    });
    $('.main_review_arrow_box .arrow_next_p>button').on('click', function () {
        main_review_left_slide.slidePrev();
        main_review_right_slide.slidePrev();
    });
    $('.main_review_arrow_box .arrow_prev_p>button').on('click', function () {
        main_review_left_slide.slideNext();
        main_review_right_slide.slideNext();
    });
    const main_event_slide = new Swiper('.main_event_slide', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 30,
        scrollbar: {
            el: ".main_event_nav_line",
            draggable: true,
        },
        breakpoints: {
            481: {
                slidesPerView: 2,
            },
            769: {
                slidesPerView: 3,
            },
            1201: {
                slidesPerView: 4,
            }

        },
    });
    $('#sitemap .gnb>ul>li>a').on('click', function (e) {
        if ($(window).width() <= 1024) {
            $(this).parent().siblings().find('.sub_menu').stop().slideUp(300);
            if ($(this).next().hasClass('sub_menu')) {
                e.preventDefault();
                $(this).next().stop().slideToggle(300);
            }
        };

        if ($(this).hasClass('on')) {
            // 이미 on이 있으면 제거
            $(this).removeClass('on');
        } else {
            // 전체에서 on 제거 후 자신만 추가
            $('#sitemap .gnb > ul > li > a').removeClass('on');
            $(this).addClass('on');
        }


    });

})