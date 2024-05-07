<?php get_header(); ?>

    <section class="first-section">
        <div class="container">
	        <?php
	        if ( function_exists( 'yoast_breadcrumb' ) ) {
		        yoast_breadcrumb( '<div class = "woocommerce-breadcrumb" >', '</div>' );
	        };
	        ?>
            <h1 class="title">Новости</h1></div>
    </section>
    <section class="news --light">
        <div class="container">
            <div class="news-block__items">
				<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
                    <a href="<?php the_permalink(); ?>">
                        <div class="item">
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
                            <span class="item__date"><?php the_time( 'F j, Y' ); ?> </span>
                            <h3><?php the_title(); ?></h3>
                        </div>
                    </a>
				<?php endwhile; else: ?>
                    <p><?php _e( 'Sorry, no posts matched your criteria.' ); ?></p>
				<?php endif; ?>
            </div>
        </div>
    </section>

<?php get_footer(); ?>