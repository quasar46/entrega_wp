<?php

defined( 'ABSPATH' ) || exit;

global $product;

do_action( 'woocommerce_before_single_product' );

?>
<section class="product">
    <div class="container">
        <div class="">
            <div id="product-<?php the_ID(); ?>" <?php wc_product_class( 'product__wrap', $product ); ?>>
				<?php
				do_action( 'woocommerce_before_single_product_summary' );
				?>

                <div class="summary entry-summary">
					<?php
					do_action( 'woocommerce_single_product_summary' );
					?>
                </div>

				<?php
				do_action( 'woocommerce_after_single_product_summary' );
				?>
            </div>
        </div>
    </div>
</section>

<?php do_action( 'woocommerce_after_single_product' ); ?>
