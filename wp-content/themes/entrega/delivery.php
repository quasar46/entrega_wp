<?php
/*
Template Name: Доставка
*/
?>

<?php get_header(); ?>
    <section class="first-section">
        <div class="container">
			<?php
			if ( function_exists( 'yoast_breadcrumb' ) ) {
				yoast_breadcrumb( '<div class = "woocommerce-breadcrumb" >', '</div>' );
			};
			?>
            <h1 class="title"><?php the_title(); ?></h1></div>
    </section>
    <section class="delivery --light">
        <div class="container">

            <div class="delivery__wrap">
                <div class="delivery__block"><h2 class="title">Безналичный расчёт</h2>
                    <div class="delivery__content"><p>Оплата товара производится по безналичному расчету
                            юридическими лицами на основании выставленного счета на оплату.</p>
                        <p>Выставляем счёт после оформления заказа и обсуждения всех условий доставки с
                            менеджером.</p></div>
                </div>
                <div class="delivery__block">
                    <h2 class="title">Доставка и самовывоз</h2>
                    <div class="delivery__content">
                        <div class="delivery__item"><h5>Доставка по адресу</h5>
                            <p>Стоимость доставки транспортными компаниями до вашего склада/терминала ТК в вашем
                                городе можно рассчитать нашем сайте.</p></div>
                        <div class="delivery__item"><h5>Самовывоз</h5>
                            <p>адресу склада МО, г. Химки, Вашутинское шоссе 24Б</p></div>
                    </div>

                </div>
            </div>
            <div class="contacts__map">
                <div id="map"></div>
            </div>
        </div>
    </section>
    <script src="https://api-maps.yandex.ru/2.1/?apikey=&lt;ваш API-ключ&gt;&amp;lang=ru_RU"></script>
<?php get_footer(); ?>