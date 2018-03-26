var galleryFeed = new Instafeed({
    accessToken: '7233705723.3f62e2d.ed28d7205f33409387bf8a33e1ee707c',
    after: function () {
        var owl = $(".owl-carousel"),
            owlSlideSpeed = 300;

        $(document).ready(function () {
            owl.owlCarousel({
                loop: true,
                margin: 10,
                responsive: {
                    0: {
                        items: 1
                    },
                    200: {
                        items: 2
                    },
                    400: {
                        items: 3
                    },
                    768: {
                        items: 5
                    }
                }
            });
        });

        $(document.documentElement).keydown(function (event) {
            if (event.keyCode == 37) {
                owl.trigger('prev.owl.carousel', [owlSlideSpeed]);
            }
            else if (event.keyCode == 39) {
                owl.trigger('next.owl.carousel', [owlSlideSpeed]);
            }
        });
    },
    get: 'user',
    limit: 100,
    resolution: "standard_resolution",
    target: "instafeed-gallery-feed",
    template:
        '<a href="{{link}}" target="blank">' +
        '<div class="img-featured-container">' +
        '<div class="img-backdrop"></div>' +
        '<div class="description-container">' +
        '<span class="likes"><i class="icon ion-heart"></i> {{likes}}</span>' +
        '<span class="comments"><i class="icon ion-chatbubble"></i> {{comments}}</span>' +
        '</div>' +
        '<img src="{{image}}" class="img-responsive">' +
        '</div>' +
        '</a>',
    userId: 7233705723
});

galleryFeed.run();