<?php
/*
Template Name: Контакты
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
        <div class="about__wrap"><h1 class="title"><?php the_title(); ?></h1></div>
    </div>
</section>
<section class="contacts">
    <div class="container">
        <div class="contacts__wrap">
            <div class="contacts__block">
                <div class="item"><h4>Телефон</h4><a href="tel:+79660717555">+7 (966) 07-17-555</a></div>
                <div class="item"><h4>Почта</h4><a href="mailto:info@entrega-in.com">info@entrega-in.com</a>
                </div>
                <div class="item"><h4>Адрес</h4><span>МО, г. Химки, Вашутинское<br>шоссе 24Б</span></div>
            </div>
            <div class="contacts__map">
                <div id="map"></div>
            </div>
        </div>
    </div>
</section>
<?php get_template_part( 'template - parts / content - partners' ); ?>
<script src="https://api-maps.yandex.ru/2.1/?apikey=&lt;ваш API-ключ&gt;&amp;lang=ru_RU"></script>
<?php get_footer(); ?>

