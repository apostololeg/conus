define(
    [
        'jquery',
        'core/menu',
        'core/conus'
    ],
    function($, Menu, Conus) {

        // $(document).on('deviceready', function() {
        //     console.log('deviceready');

            var menu = new Menu($('.menu')),
                conus = new Conus($('.conus'));



            conus.add('light', [
                [0,0],
                [25,15],
                [35,33, '#409dc0'],
                [62,46],
                [83,112],
                [120,140, '#7c5cc0'],
                [203,176]
            ]);
            conus.add('light2', [
                [0,0],
                [20,20],
                [40,25, '#409dc0'],
                [60,40],
                [80,120],
                [120,140, '#7c5cc0'],
                [200,180],
                [410,193]
            ]);
            conus.add('light3', [
                [0,0],
                [20,20],
                [40,25, '#409dc0'],
                [60,40],
                [80,120],
                [120,140, '#7c5cc0'],
                [200,180]
            ]);
            conus.add('light4', [
                [0,0],
                [20,20],
                [40,25, '#409dc0'],
                [60,40],
                [80,120],
                [120,140, '#7c5cc0'],
                [200,180]
            ]);
            conus.add('light5', [
                [0,0],
                [20,20],
                [40,25, '#409dc0'],
                [60,40],
                [80,120],
                [120,140, '#7c5cc0'],
                [200,180]
            ]);

        // });

    }
);
