<?php
/*
Template Name: Главная
*/
?>
<?php get_header(); ?>

    <section class="main-block">
        <div class="container">
            <div class="main-block__wrap">
                <div class="main-block__content"><h1 class="header__title">Поставки приводной техники для
                        промышленности</h1><span class="header__subtitle">с доставкой в любую точку России и стран Таможенного Союза</span><a
                            class="btn btn--main" href="/shop">Открыть каталог</a></div>
                <img src="/wp-content/uploads/2024/05/main-pic.png" alt=""></div>
        </div>
    </section>
<?php //get_template_part( 'template-parts/content-parallax' ); ?>
    <section class="catalog-block inner-block --dark">
        <div class="container">
            <div class="catalog-block__wrap"><span class="uptitle">Каталог</span>
                <h2 class="title">Выберите подходящую<br>категорию товаров</h2>
                <div class="category-home">
					<?php echo do_shortcode( '[product_categories]' ); ?>
                </div>
                <a class="btn btn--main" href="/shop">Открыть каталог</a>
                <div class="catalog-block__footer"><span>Каталог регулярно дополняется. </span><span>Если вы не нашли подходящий товар,<br>свяжитесь с нами</span><a
                            class="btn btn--second open-modal-feedback">Связаться</a></div>
            </div>
        </div>
    </section>
<?php get_template_part( 'template-parts/content-partners' ); ?>
<?php get_template_part( 'template-parts/content-steps' ); ?>
<?php get_template_part( 'template-parts/content-feedback' ); ?>
    <section class="news-block inner-block --light">
        <div class="container">
            <div class="news-block__wrap"><span class="uptitle">Новости</span>
                <h2 class="title">Последние новости и события<br>в мире приводной техники</h2>
                <div class="swiper news-block__items">
                    <div class="swiper-wrapper">
						<?php
						$result = wp_get_recent_posts( [
							'numberposts'      => 10,
							'offset'           => 0,
							'category'         => 0,
							'orderby'          => 'post_date',
							'order'            => 'DESC',
							'include'          => '',
							'exclude'          => '',
							'meta_key'         => '',
							'meta_value'       => '',
							'post_type'        => 'news',
							'post_status'      => 'draft, publish, future, pending, private',
							'suppress_filters' => true,
						], OBJECT );
						foreach ( $result as $post ) {
							setup_postdata( $post );
							?>
                            <a href="<?php the_permalink(); ?>" class="swiper-slide item">
                                <span class="item__arrow">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
<path d="M13 5H19V11" stroke="url(#paint0_linear_571_3155)" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 5L5 19" stroke="url(#paint1_linear_571_3155)" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_571_3155" x1="19" y1="8" x2="12.9206" y2="7.82949" gradientUnits="userSpaceOnUse">
<stop stop-color="#0A0A0A"/>
<stop stop-color="#0A0A0A"/>
<stop offset="0.495" stop-color="#171717"/>
<stop offset="1" stop-color="#0A0A0A"/>
</linearGradient>
<linearGradient id="paint1_linear_571_3155" x1="19" y1="12" x2="4.81483" y2="11.6021" gradientUnits="userSpaceOnUse">
<stop stop-color="#0A0A0A"/>
<stop stop-color="#0A0A0A"/>
<stop offset="0.495" stop-color="#171717"/>
<stop offset="1" stop-color="#0A0A0A"/>
</linearGradient>
</defs>
</svg>

                                </span>
                                <span class="item__date"><?php the_time( 'F j, Y' );; ?></span>
                                <h3><?php the_title(); ?></h3>
                            </a>

						<?php }
						wp_reset_postdata();
						?>
                    </div>
                </div>
            </div>
        </div>
    </section>

<?php get_footer(); ?>