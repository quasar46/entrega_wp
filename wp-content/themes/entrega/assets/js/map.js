document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('#map')) {
        ymaps.ready(init);

        function init() {
            var myMap = new ymaps.Map("map", {
                center: [55.920906, 37.411652],
                zoom: 13,
                controls: []
            });

            myMap.behaviors.disable('scrollZoom');

            myMap.geoObjects.add(new ymaps.Placemark([55.920906, 37.411652], {

            }, {
                preset: 'islands#icon',
                iconColor: '#0095b6'
            }))
        }
    }

})
