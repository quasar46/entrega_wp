<?php

defined( 'ABSPATH' ) || exit;

global $product; ?>
<div class="container">
	<?php
	do_action( 'woocommerce_before_single_product' );
	?>
</div>
<section class="product">
    <div id="product-<?php the_ID(); ?>" <?php wc_product_class( 'product__wrap container', $product ); ?>>
		<?php the_title( '<h1 class="product__title-mobile">', '</h1>' ); ?>
        <div class="product__content">
			<?php
			woocommerce_show_product_sale_flash();
			do_action( 'woocommerce_single_product_summary' );
			?>
            <div class="product__order">
				<?php
				woocommerce_template_single_price();
				woocommerce_template_single_add_to_cart();
				?>
            </div>
			<?php

			do_action( 'woocommerce_product_additional_information', $product );
			?>
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
    </div> <!-- ./product__wrap -->

    <div class="product__description --light">
        <div class="container">
            <span class="uptitle">Описание товара</span>
            <h2 class="title"><?php the_title(); ?></h2>
			<?php the_content(); ?>
        </div>
    </div> <!-- ./product__description -->
	<?php get_template_part( 'template-parts/content-about-us' ); ?>
	<?php get_template_part( 'template-parts/content-partners' ); ?>
</section> <!--  ./product -->

<?php do_action( 'woocommerce_after_single_product' ); ?>
