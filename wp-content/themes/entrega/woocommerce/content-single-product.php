<?php

defined( 'ABSPATH' ) || exit;

global $product;

do_action( 'woocommerce_before_single_product' );

?>
<section class="product">
    <div class="container">
        <div class="">
            <div id="product-<?php the_ID(); ?>" <?php wc_product_class( 'product__wrap', $product ); ?>>
                <div class="product__content">
	                <?php woocommerce_show_product_sale_flash();
	                do_action( 'woocommerce_single_product_summary' ); ?>
                </div> <!-- ./product__content -->
                <div class="product__pic">
					<?php
					$product_img_id = $product->get_image_id();
					if ( $product_img_id ) {
						$main_img = wp_get_attachment_url( $product_img_id );
					} else {
						$main_img = wc_placeholder_img_src( 'full' );
					}
					?>

                    <img src="<?php echo $main_img; ?>" alt="<?php echo $product->get_title(); ?>">
                </div> <!-- ./product__pic -->


            </div>
        </div>
    </div>
</section>

<?php do_action( 'woocommerce_after_single_product' ); ?>
