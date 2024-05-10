<?php get_header(); ?>
<?php do_action( 'woocommerce_before_main_content' ); ?>
    <section class="first-section">
        <h1 class="title"><?php woocommerce_page_title(); ?></h1>
    </section>
    <section class="catalog">
        <div class="container">
			<?php
			do_action( 'woocommerce_sidebar' );
			woocommerce_output_all_notices();
			?>
			<?php
			if ( woocommerce_product_loop() ) {

				woocommerce_product_loop_start();

				if ( wc_get_loop_prop( 'total' ) ) {
					while ( have_posts() ) {
						the_post();

						/**
						 * Hook: woocommerce_shop_loop.
						 */
						do_action( 'woocommerce_shop_loop' );

						wc_get_template_part( 'content', 'product' );
					}
				}

				woocommerce_product_loop_end();

				/**
				 * Hook: woocommerce_after_shop_loop.
				 *
				 * @hooked woocommerce_pagination - 10
				 */
				do_action( 'woocommerce_after_shop_loop' );
			} else {
				/**
				 * Hook: woocommerce_no_products_found.
				 *
				 * @hooked wc_no_products_found - 10
				 */
				do_action( 'woocommerce_no_products_found' );
			}
			?>
        </div> <!-- /container -->
    </section>
<?php get_template_part( 'template-parts/content-feedback' ); ?>

<?php do_action( 'woocommerce_after_main_content' ); ?>

<?php get_footer(); ?>