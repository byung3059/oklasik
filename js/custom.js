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
        loop: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        spaceBetween: 30,
        navigation: {
            nextEl: ".main_content_slide_arrow .arrow_next",
            prevEl: ".main_content_slide_arrow .arrow_prev",
        },
    });

    const main_review_left_slide = new Swiper('.main_review_left_slide', {
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        slidesPerView: 1,
        spaceBetween: 30,
        allowTouchMove: false,
    });
    const main_review_right_slide = new Swiper('.main_review_right_slide', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 30,
        allowTouchMove: false,
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
        slidesPerView: 4,
        spaceBetween: 30,
        scrollbar: {
            el: ".main_event_nav_line",
            draggable: true,
        },
    });


})