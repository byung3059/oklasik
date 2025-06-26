$(function () {

    const main_visual_slide = new Swiper('.main_visual_slide_box', {
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


})