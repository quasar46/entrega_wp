<?php
/*
Template Name: О компании
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
        <div class="about__wrap"><h1 class="title"><?php the_title();?></h1></div>
    </div>
</section>
<section class="about --light">
    <div class="container">
        <div class="about__wrap">
            <h2 class="title">Мы - эксперты в поставках<br>приводной технике</h2>
            <div class="swiper about__items">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="item"><h3><span>в наличии</span> стандартные серии</h3>
                            <p>Доставка в регионы Москвы и близлежащие районы всего за 2 дня. В другие регионы —
                                в зависимости от местоположения. Самовывоз — получить ваш заказ
                                в тот же день,</p></div>
                    </div>
                    <div class="swiper-slide">
                        <div class="item"><h3>товары <span>под заказ</span></h3>
                            <p>Возможность заказать товары напрямую от производителя с гарантированной доставкой
                                в кратчайшие сроки. *Срок оставки заказа составляет от 30 дней,</p></div>
                    </div>
                    <div class="swiper-slide">
                        <div class="item"><h3><span>Гарантия</span> от 1 года</h3>
                            <p>Действует на товары всех производителей.</p></div>
                    </div>
                    <div class="swiper-slide">
                        <div class="item"><h3><span>ВЫБОР</span> ДОСТАВКИ</h3>
                            <div class="item__delivery"><img src="/wp-content/uploads/2024/05/d1.png" alt=""><img
                                        src="/wp-content/uploads/2024/05/d2.png" alt=""><img src="/wp-content/uploads/2024/05/d3.png" alt=""></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<?php get_template_part( 'template-parts/content-partners' ); ?>
<?php get_footer(); ?>
