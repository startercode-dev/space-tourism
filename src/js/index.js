import $, { css } from 'jquery';
import { data } from './data.js';

$(function () {
    const tech = $('.technology').length;

    const { destinations, crew, technology } = data;

    //DESTINATION
    $('.planet-list .planet-item .planet-link').click((e) => {
        //UI CHANGES
        if (
            $(e.target).hasClass('link-text') ||
            $(e.target).hasClass('planet-link')
        ) {
            $('.planet-list .planet-link').each((i, r) => {
                $(r).removeClass('active');
            });
            $('.planet-list .planet-link .underline').each((i, r) => {
                $(r).removeClass('active');
            });
            $(e.currentTarget).addClass('active');
            $(e.currentTarget).find('.underline').addClass('active');
        }

        //CONTENT CHANGES
        const contentChange = (name) => {
            //CHANGE CONTENT ON HTML
            $(destinations).each((i, r) => {
                if (r.name.toLowerCase() == name.toLowerCase()) {
                    const [nameDiv, imgDiv, descDiv, distDiv, travDiv] = [
                        $('.destination .description-primary'),
                        $('.destination .content-img img'),
                        $('.destination .description-body'),
                        $('.destination .metric--distance'),
                        $('.destination .metric--travel'),
                    ];

                    const { name, images, description, distance, travel } = r;

                    //CONTENT CHANGE
                    nameDiv.text(name);
                    imgDiv.attr('src', images);
                    descDiv.text(description);
                    distDiv.text(distance);
                    travDiv.text(travel);
                }
            });
        };
        const name = $(e.target).hasClass('link-text')
            ? $(e.target).text()
            : $(e.target).hasClass('planet-link')
            ? $(e.target).find('.link-text').text()
            : $(e.target).hasClass('underline')
            ? $(e.target.parentElement).find('.link-text').text()
            : '';
        contentChange(name);
    });

    //CREW
    $('.slider-dots .dot').click((e) => {
        //UI CHANGES
        $('.slider-dots .dot').each((i, r) => {
            if ($(r).hasClass('active')) {
                $(r).removeClass('active');
            }
        });
        $(e.currentTarget).addClass('active');

        //CONTENT CHANGES
        const index = $(e.target)[0].dataset.index;
        const { name, images, role, bio } = crew[index];
        $('.crew .description-position').text(role);
        $('.crew .description-name').text(name);
        $('.crew .description-body').text(bio);
        $('.crew .content-img img').attr('src', images);
    });

    //TECHNOLOGY
    let screen;
    const loadTechImg = () => {
        let index;
        $('.technology .select-btn').each((i, r) => {
            if ($(r).hasClass('active')) {
                index = $(r)[0].dataset.index;
            }
        });
        const { images } = technology[index];
        screen = $(window).width() <= 936 ? 'landscape' : 'portrait';
        console.log(images[screen]);
        $('.technology .content-img img').attr('src', images[screen]);
    };
    tech == 1 ? loadTechImg() : '';
    $('.technology .select-btn').click((e) => {
        //UI CHANGES
        $('.technology .select-btn').each((i, r) => {
            $(r).removeClass('active');
        });
        $(e.currentTarget).addClass('active');

        const screen = $(window).width() <= 936 ? 'landscape' : 'portrait';
        const { index } = $(e.target)[0].dataset;
        const { name, description } = technology[index];
        $('.technology .description-primary').text(name);
        $('.technology .description-body').text(description);
        loadTechImg();
    });
    $(window).resize(() => {
        if (
            ($(window).width() >= 944 && screen == 'landscape') ||
            ($(window).width() <= 944 && screen == 'portrait')
        ) {
            loadTechImg();
        }

        if (
            $('.nav-menu').css('display') == 'block' &&
            $(window).width() <= 656
        ) {
            $('.nav-menu').css({ display: 'none' });
        } else if (
            $('.nav-menu').css('display') == 'none' &&
            $(window).width() >= 656
        ) {
            $('.nav-menu').css({ display: 'block' });
        }
    });

    //NAV MENU
    $('.menu-icon i').click((e) => {
        if ($(e.currentTarget).hasClass('ph-list')) {
            //TOGGLE ICON
            $(e.currentTarget).removeClass('ph-list');
            $(e.currentTarget).addClass('ph-x');

            //TOGGLE MENU
            const display = $('.nav-menu').hasClass('hide');
            if ($('.nav-menu').css('display') == 'none') {
                $('.nav-menu').css({ display: 'block' });
            }
            if (display == true) {
                $('.nav-menu').toggleClass('hide');
            }
        } else if ($(e.currentTarget).hasClass('ph-x')) {
            //TOGGLE ICON
            $(e.currentTarget).removeClass('ph-x');
            $(e.currentTarget).addClass('ph-list');

            //TOGGLE MENU
            const display = $('.nav-menu').hasClass('hide');
            if (display == false) {
                $('.nav-menu').toggleClass('hide');
            }
        }
    });
});
